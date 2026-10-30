import { ADMIN_EMAIL } from './firebase-config.js';
import { auth, db, authState, login, logout, productsRef, categoriesRef, productDoc, categoryDoc, onSnapshot, addDoc, setDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from './firebase.js';
import { doc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const $=id=>document.getElementById(id), app=$('app');let products=[],cats=[];const msg=t=>$('msg').textContent=t;const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$('loginForm').addEventListener('submit',async e=>{e.preventDefault();$('loginMsg').textContent='Giriş yoxlanılır...';try{await login($('email').value.trim(),$('password').value);$('loginMsg').textContent='';}catch(err){$('loginMsg').textContent='Giriş alınmadı: '+err.message;}});
authState(auth,user=>{if(user&&user.email?.toLowerCase()===ADMIN_EMAIL.toLowerCase()){ $('loginBox').style.display='none';app.style.display='block';$('who').textContent='  · '+user.email;subscribe();}else{app.style.display='none';$('loginBox').style.display='block';if(user)logout();}});
$('logout').onclick=()=>logout();
function subscribe(){onSnapshot(categoriesRef,s=>{cats=s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.sortOrder??999999)-(b.sortOrder??999999));$('cats').innerHTML=cats.map(c=>`<div class="item"><div class="grow">${esc(c.name)}</div><button class="danger" data-delcat="${esc(c.id)}">Sil</button></div>`).join('');$('categoryId').innerHTML='<option value="">Kateqoriya seçin</option>'+cats.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join(''); $('bulkCategory').innerHTML='<option value="">Kateqoriya seçin</option>'+cats.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join(''); const oldFilter=$('adminCategoryFilter').value; $('adminCategoryFilter').innerHTML='<option value="">Bütün kateqoriyalar</option>'+cats.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join(''); $('adminCategoryFilter').value=oldFilter;},e=>msg(e.message));onSnapshot(productsRef,s=>{products=s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.sortOrder??999999)-(b.sortOrder??999999)||String(a.title||'').localeCompare(String(b.title||''),'az'));renderProducts();},e=>msg(e.message));}
$('catForm').onsubmit=async e=>{e.preventDefault();try{await addDoc(categoriesRef,{name:$('catName').value.trim(),sortOrder:cats.length,createdAt:serverTimestamp()});$('catName').value='';msg('Kateqoriya əlavə edildi.');}catch(err){msg(err.message)}};
$('cats').onclick=async e=>{let id=e.target.dataset.delcat;if(!id)return;if(!confirm('Kateqoriya silinsin? Məhsullar silinməyəcək.'))return;try{await deleteDoc(categoryDoc(id));msg('Kateqoriya silindi.');}catch(err){msg(err.message)}};
$('productForm').onsubmit=async e=>{e.preventDefault();let id=$('pid').value||('manual-'+crypto.randomUUID());let old=products.find(p=>p.id===id);let data={title:$('title').value.trim(),code:$('code').value.trim(),price:$('price').value===''?null:Number($('price').value),size:$('size').value.trim(),categoryId:$('categoryId').value,image:$('image').value.trim(),shortDescription:$('shortDescription').value.trim(),description:$('description').value,visible:$('visible').checked,sortOrder:old?.sortOrder??products.length,updatedAt:serverTimestamp(),updatedBy:auth.currentUser?.email||'',source:old?.source||'manual'};try{await setDoc(productDoc(id),data,{merge:true});msg('Məhsul yadda saxlanıldı.');$('productForm').reset();$('pid').value='';$('visible').checked=true;}catch(err){msg(err.message)}};
function dateText(v){try{const d=v?.toDate?v.toDate():(v?new Date(v):null);return d&&!isNaN(d)?d.toLocaleString('az-AZ'):'Tarix qeydə alınmayıb';}catch{return 'Tarix qeydə alınmayıb';}}
function filteredProducts(){const q=$('filter').value.trim().toLocaleLowerCase('az'),cf=$('adminCategoryFilter').value,status=$('statusFilter').value,min=$('priceMin').value,max=$('priceMax').value,sort=$('sortFilter').value;let list=products.filter(p=>{const text=(p.title+' '+(p.code||'')+' '+p.id).toLocaleLowerCase('az');const price=Number(p.price);return (!cf||p.categoryId===cf)&&(!q||text.includes(q))&&(!status||(status==='visible'?p.visible!==false:p.visible===false))&&(min===''||price>=Number(min))&&(max===''||price<=Number(max));});list.sort((a,b)=>{if(sort==='priceAsc')return Number(a.price??Infinity)-Number(b.price??Infinity);if(sort==='priceDesc')return Number(b.price??-Infinity)-Number(a.price??-Infinity);if(sort==='newest')return (b.updatedAt?.seconds||0)-(a.updatedAt?.seconds||0);if(sort==='oldest')return (a.updatedAt?.seconds||0)-(b.updatedAt?.seconds||0);return String(a.title||'').localeCompare(String(b.title||''),'az');});return list;}
function updateSelectionCount(){const n=document.querySelectorAll('[data-pick]:checked').length;$('selectedCount').textContent=`${n} məhsul seçilib`;}
function renderProducts(){const list=filteredProducts();$('products').innerHTML=list.map(p=>{let cat=cats.find(c=>c.id===p.categoryId);return `<div class="item"><input type="checkbox" class="pickProduct" data-pick="${esc(p.id)}" style="width:auto;margin:0 4px"><img src="${esc(p.image||'')}" onerror="this.style.display='none'"><div class="grow"><b>${esc(p.title)}</b><div class="small">Kod: ${esc(p.code||p.id)} · ${p.visible===false?'Gizlidir':'Aktivdir'} · ${esc(p.price??'—')} AZN · Kateqoriya: ${esc(cat?.name||'Təyin edilməyib')}</div><div class="small">Son dəyişiklik: ${dateText(p.updatedAt)}${p.updatedBy?' · '+esc(p.updatedBy):''}</div></div><button data-edit="${esc(p.id)}">Redaktə</button><button class="gray" data-toggle="${esc(p.id)}">${p.visible===false?'Göstər':'Gizlət'}</button><button class="gray" data-up="${esc(p.id)}">↑</button><button class="gray" data-down="${esc(p.id)}">↓</button><button class="danger" data-del="${esc(p.id)}">Sil</button></div>`}).join('')||'<p class="small">Filtrə uyğun məhsul tapılmadı.</p>';updateSelectionCount();}

$('filter').oninput=renderProducts; $('adminCategoryFilter').onchange=renderProducts;
async function bulkUpdate(fields,success){const ids=[...document.querySelectorAll('[data-pick]:checked')].map(x=>x.dataset.pick);if(!ids.length){msg('Əvvəlcə məhsul seçin.');return;}try{for(const id of ids)await updateDoc(productDoc(id),{...fields,updatedAt:serverTimestamp(),updatedBy:auth.currentUser?.email||''});msg(`${ids.length} məhsul yeniləndi. ${success}`);renderProducts();}catch(err){msg('Əməliyyat alınmadı: '+err.message);}}
$('bulkAssign').onclick=()=>{const categoryId=$('bulkCategory').value;if(!categoryId){msg('Təyin ediləcək kateqoriyanı seçin.');return;}bulkUpdate({categoryId},'Kateqoriya təyin edildi.');};
$('bulkHide').onclick=()=>bulkUpdate({visible:false},'Seçilənlər gizlədildi.');$('bulkShow').onclick=()=>bulkUpdate({visible:true},'Seçilənlər aktiv edildi.');
$('selectFiltered').onclick=()=>{document.querySelectorAll('[data-pick]').forEach(x=>x.checked=true);updateSelectionCount();};$('clearSelection').onclick=()=>{document.querySelectorAll('[data-pick]').forEach(x=>x.checked=false);updateSelectionCount();};
$('products').addEventListener('change',e=>{if(e.target.matches('[data-pick]'))updateSelectionCount();});
['filter','adminCategoryFilter','statusFilter','priceMin','priceMax','sortFilter'].forEach(id=>{const el=$(id);el.addEventListener(id==='filter'||id==='priceMin'||id==='priceMax'?'input':'change',renderProducts);});
$('resetFilters').onclick=()=>{['filter','priceMin','priceMax'].forEach(id=>$(id).value='');['adminCategoryFilter','statusFilter','sortFilter'].forEach(id=>$(id).value='');renderProducts();};

$('products').onclick=async e=>{let el=e.target,p=products.find(x=>x.id===(el.dataset.edit||el.dataset.toggle||el.dataset.del||el.dataset.up||el.dataset.down));if(!p)return;try{if(el.dataset.edit){$('pid').value=p.id;for(let k of ['title','code','price','size','categoryId','image','shortDescription','description'])$(k).value=p[k]??'';$('visible').checked=p.visible!==false;window.scrollTo({top:0,behavior:'smooth'});}else if(el.dataset.toggle){await updateDoc(productDoc(p.id),{visible:p.visible===false,updatedAt:serverTimestamp(),updatedBy:auth.currentUser?.email||''});}else if(el.dataset.del){if(confirm('Məhsul tam silinsin?'))await deleteDoc(productDoc(p.id));}else{let i=products.findIndex(x=>x.id===p.id),j=el.dataset.up?i-1:i+1;if(j<0||j>=products.length)return;let a=products[i].sortOrder??i,b=products[j].sortOrder??j;await Promise.all([updateDoc(productDoc(products[i].id),{sortOrder:b,updatedAt:serverTimestamp(),updatedBy:auth.currentUser?.email||''}),updateDoc(productDoc(products[j].id),{sortOrder:a,updatedAt:serverTimestamp(),updatedBy:auth.currentUser?.email||''})]);}}catch(err){msg(err.message)}};
$('reset').onclick=()=>{$('productForm').reset();$('pid').value='';$('visible').checked=true;};


// Shopify public catalog importer. Triggered manually by the signed-in admin.
const SHOPIFY_PRODUCTS_URL = 'https://decorconcept.az/products.json?limit=250&page=';
$('shopifySync').addEventListener('click', async () => {
  const btn = $('shopifySync'), out = $('syncStatus');
  btn.disabled = true; out.textContent = ' Shopify məhsulları yoxlanılır...';
  try {
    let imported = 0, page = 1, seen = 0;
    // Same-origin JSON is refreshed by GitHub Actions; avoids Shopify browser CORS.
    const localResponse = await fetch('./products.json?ts=' + Date.now(), {cache:'no-store'});
    if (!localResponse.ok) throw new Error('products.json tapılmadı: HTTP ' + localResponse.status);
    const localPayload = await localResponse.json();
    const localItems = Array.isArray(localPayload.products) ? localPayload.products : [];
    if (!localItems.length) throw new Error('products.json boşdur');
    const existing = new Map(products.map(p => [String(p.id), p]));
    while (page === 1) {
      const batch = localItems;
      for (const item of batch) {
        if (!item || item.id == null) continue;
        const id = `shopify-${item.id}`;
        const old = existing.get(id) || {};
        const variant = item.variants?.[0] || {};
        const image = item.images?.[0]?.src || item.image?.src || '';
        const body = String(item.body_html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const data = {
          title: item.title || 'Adsız məhsul',
          code: variant.sku || String(item.id),
          price: variant.price != null && variant.price !== '' ? Number(variant.price) : null,
          image,
          shortDescription: body.slice(0, 180),
          description: item.body_html || '',
          size: old.size || '',
          categoryId: old.categoryId || (cats.find(c => [item.product_type, ...(item.tags||'').split(',')].filter(Boolean).some(v => v.trim().toLocaleLowerCase('az') === String(c.name||'').trim().toLocaleLowerCase('az')))?.id || ''),
          visible: old.visible !== false,
          sortOrder: old.sortOrder ?? (seen + imported),
          source: 'shopify',
          shopifyId: String(item.id),
          productUrl: item.handle ? `https://decorconcept.az/products/${item.handle}` : '',
          updatedAt: serverTimestamp()
        };
        await setDoc(productDoc(id), data, { merge: true });
        imported++;
      }
      seen += batch.length;
      break;
    }
    out.textContent = ` Tamamlandı: ${imported} məhsul Firestore-a əlavə edildi/yeniləndi. Yeni Shopify məhsullarını gətirmək üçün GitHub Actions yenilənməsini gözlə və idxal düyməsini yenidən bas.`;
    msg('Shopify sinxronizasiyası tamamlandı.');
  } catch (err) {
    console.error(err);
    out.textContent = ' İdxal alınmadı: ' + (err.message || err) + '. Əgər CORS xətasıdırsa, server tərəfli GitHub Actions sinxronizasiyası qurulmalıdır.';
  } finally { btn.disabled = false; }
});
