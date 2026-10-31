// Builds a static sitemap for GitHub Pages from publicly readable Firestore data.
// No service-account key is needed: Firestore rules intentionally allow public reads
// for products and settings/catalog. Never put admin credentials in this script.
import fs from 'node:fs/promises';

const PROJECT_ID = 'divarpanel-22e07';
const API_KEY = 'AIzaSyDAmS9T49yFpHkgRnyR-TE0v-xtQS-sDQc';
const SITE = 'https://divarpanel.az';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function decodeValue(v) {
  if (!v) return undefined;
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return Number(v.doubleValue);
  if ('timestampValue' in v) return v.timestampValue;
  if ('nullValue' in v) return null;
  if ('mapValue' in v) return decodeFields(v.mapValue.fields || {});
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decodeValue);
  return undefined;
}
function decodeFields(fields = {}) {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)]));
}
function slugify(value) {
  return String(value || '').toLocaleLowerCase('az').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/ə/g, 'e').replace(/ı/g, 'i')
    .replace(/ş/g, 'sh').replace(/ç/g, 'ch').replace(/ğ/g, 'gh')
    .replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
function xml(s) {
  return String(s).replace(/[<>&'\"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
}
function dateOnly(v) {
  if (!v) return '';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}
async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Firestore REST ${response.status}: ${await response.text()}`);
  return response.json();
}
async function getProducts() {
  const all = [];
  let token = '';
  do {
    const u = new URL(`${BASE}/products`);
    u.searchParams.set('pageSize', '1000');
    u.searchParams.set('key', API_KEY);
    if (token) u.searchParams.set('pageToken', token);
    const data = await getJson(u);
    for (const doc of data.documents || []) all.push({ id: doc.name.split('/').pop(), ...decodeFields(doc.fields) });
    token = data.nextPageToken || '';
  } while (token);
  return all;
}
async function getCatalogSettings() {
  const u = new URL(`${BASE}/settings/catalog`);
  u.searchParams.set('key', API_KEY);
  try { const data = await getJson(u); return decodeFields(data.fields); }
  catch (e) { if (String(e.message).includes('404')) return {}; throw e; }
}

const [products, settings] = await Promise.all([getProducts(), getCatalogSettings()]);
const entries = [];
if (settings.catalogSeoEnabled === true) entries.push({ loc: `${SITE}/`, lastmod: dateOnly(settings.updatedAt || settings.createdAt) });
const used = new Set();
for (const p of products) {
  if (p.seoEnabled !== true || p.visible === false) continue;
  const slug = String(p.seoSlug || slugify(p.title || p.name || p.id)).trim();
  if (!slug || used.has(slug)) continue;
  used.add(slug);
  entries.push({ loc: `${SITE}/product.html?slug=${encodeURIComponent(slug)}`, lastmod: dateOnly(p.updatedAt || p.createdAt) });
}
const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(e => `  <url>\n    <loc>${xml(e.loc)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}\n  </url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile('sitemap.xml', body, 'utf8');
console.log(`Generated sitemap.xml with ${entries.length} URL(s) from ${products.length} product(s).`);
