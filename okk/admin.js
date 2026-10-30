import { ADMIN_EMAIL } from './firebase-config.js';
import { auth, db, authState, login, logout, productsRef, categoriesRef, productDoc, categoryDoc, onSnapshot, addDoc, setDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from './firebase.js';
import { doc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const $=id=>document.getElementById(id), app=$('app');let products=[],cats=[];const msg=t=>$('msg').textContent=t;const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$('loginForm').addEventListener('submit',async e=>{e.preventDefault();$('loginMsg').textContent='Giriş yoxlanılır...';try{await login($('email').value.trim(),$('password').value);$('loginMsg').textContent='';}catch(err){$('loginMsg').textContent='Giriş alınmadı: '+err.message;}});
authState(auth,user=>{if(user&&user.email?.toLowerCase()===ADMIN_EMAIL.toLowerCase()){ $('loginBox').style.display='none';app.style.display='block';$('who').textContent='  · '+user.email;subscribe();}else{app.style.display='none';$('loginBox').style.display='block';if(user)logout();}});
$('logout').onclick=()=>logout();
function subscribe(){onSnapshot(categoriesRef,s=>{cats=s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.sortOrder??999999)-(b.sortOrder??999999));$('cats').innerHTML=cats.map(c=>`<div class="item"><div class="grow">${esc(c.name)}</div><button class="danger" data-delcat="${esc(c.id)}">Sil</button></div>`).join('');$('categoryId').innerHTML='<option value="">Kateqoriya seçin</option>'+cats.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');},e=>msg(e.message));onSnapshot(productsRef,s=>{products=s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(a.sortOrder??999999)-(b.sortOrder??999999)||String(a.title||'').localeCompare(String(b.title||''),'az'));renderProducts();},e=>msg(e.message));}
$('catForm').onsubmit=async e=>{e.preventDefault();try{await addDoc(categoriesRef,{name:$('catName').value.trim(),sortOrder:cats.length,createdAt:serverTimestamp()});$('catName').value='';msg('Kateqoriya əlavə edildi.');}catch(err){msg(err.message)}};
$('cats').onclick=async e=>{let id=e.target.dataset.delcat;if(!id)return;if(!confirm('Kateqoriya silinsin? Məhsullar silinməyəcək.'))return;try{await deleteDoc(categoryDoc(id));msg('Kateqoriya silindi.');}catch(err){msg(err.message)}};
$('productForm').onsubmit=async e=>{e.preventDefault();let id=$('pid').value||('manual-'+crypto.randomUUID());let old=products.find(p=>p.id===id);let data={title:$('title').value.trim(),code:$('code').value.trim(),price:$('price').value===''?null:Number($('price').value),size:$('size').value.trim(),categoryId:$('categoryId').value,image:$('image').value.trim(),shortDescription:$('shortDescription').value.trim(),description:$('description').value,visible:$('visible').checked,sortOrder:old?.sortOrder??products.length,updatedAt:serverTimestamp(),source:old?.source||'manual'};try{await setDoc(productDoc(id),data,{merge:true});msg('Məhsul yadda saxlanıldı.');$('productForm').reset();$('pid').value='';$('visible').checked=true;}catch(err){msg(err.message)}};
function renderProducts(){let q=$('filter').value.toLocaleLowerCase('az');$('products').innerHTML=products.filter(p=>(p.title+' '+p.code).toLocaleLowerCase('az').includes(q)).map(p=>`<div class="item"><img src="${esc(p.image||'')}" onerror="this.style.display='none'"><div class="grow"><b>${esc(p.title)}</b><div class="small">${esc(p.code||p.id)} · ${p.visible===false?'Gizlidir':'Aktivdir'} · ${esc(p.price??'—')} AZN</div></div><button data-edit="${esc(p.id)}">Redaktə</button><button class="gray" data-toggle="${esc(p.id)}">${p.visible===false?'Göstər':'Gizlət'}</button><button class="gray" data-up="${esc(p.id)}">↑</button><button class="gray" data-down="${esc(p.id)}">↓</button><button class="danger" data-del="${esc(p.id)}">Sil</button></div>`).join('');}
$('filter').oninput=renderProducts;
$('products').onclick=async e=>{let el=e.target,p=products.find(x=>x.id===(el.dataset.edit||el.dataset.toggle||el.dataset.del||el.dataset.up||el.dataset.down));if(!p)return;try{if(el.dataset.edit){$('pid').value=p.id;for(let k of ['title','code','price','size','categoryId','image','shortDescription','description'])$(k).value=p[k]??'';$('visible').checked=p.visible!==false;window.scrollTo({top:0,behavior:'smooth'});}else if(el.dataset.toggle){await updateDoc(productDoc(p.id),{visible:p.visible===false,updatedAt:serverTimestamp()});}else if(el.dataset.del){if(confirm('Məhsul tam silinsin?'))await deleteDoc(productDoc(p.id));}else{let i=products.findIndex(x=>x.id===p.id),j=el.dataset.up?i-1:i+1;if(j<0||j>=products.length)return;let a=products[i].sortOrder??i,b=products[j].sortOrder??j;await Promise.all([updateDoc(productDoc(products[i].id),{sortOrder:b}),updateDoc(productDoc(products[j].id),{sortOrder:a})]);}}catch(err){msg(err.message)}};
$('reset').onclick=()=>{$('productForm').reset();$('pid').value='';$('visible').checked=true;};


// Shopify public catalog importer. Triggered manually by the signed-in admin.
const SHOPIFY_PRODUCTS_URL = 'https://decorconcept.az/products.json?limit=250&page=';
$('shopifySync').addEventListener('click', async () => {
  const btn = $('shopifySync'), out = $('syncStatus');
  btn.disabled = true; out.textContent = ' Shopify məhsulları yoxlanılır...';
  try {
    let imported = 0, page = 1, seen = 0;
    const existing = new Map(products.map(p => [String(p.id), p]));
    while (page <= 20) {
      const response = await fetch(SHOPIFY_PRODUCTS_URL + page, { headers: { 'Accept': 'application/json' } });
      if (!response.ok) throw new Error(`Shopify cavabı: HTTP ${response.status}`);
      const payload = await response.json();
      const batch = Array.isArray(payload.products) ? payload.products : [];
      if (!batch.length) break;
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
          categoryId: old.categoryId || '',
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
      if (batch.length < 250) break;
      page++;
    }
    out.textContent = ` Tamamlandı: ${imported} Shopify məhsulu Firebase-ə əlavə edildi/yeniləndi.`;
    msg('Shopify sinxronizasiyası tamamlandı.');
  } catch (err) {
    console.error(err);
    out.textContent = ' İdxal alınmadı: ' + (err.message || err) + '. Əgər CORS xətasıdırsa, server tərəfli GitHub Actions sinxronizasiyası qurulmalıdır.';
  } finally { btn.disabled = false; }
});
