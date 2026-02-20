let data, activeCat, cart=[], catImgs={};
const CURRENCY='lei';

Promise.all([
  fetch('menu.json').then(r=>r.json()),
  fetch('category_images.json').then(r=>r.json()).catch(()=>[])
]).then(([j, imgs])=>{
  data=j;
  activeCat=j.categories[0].id;
  imgs.forEach(i=>catImgs[i.name.toLowerCase()]=i.image);
  document.getElementById('meta').textContent = j.restaurant.description || 'Meniu și prețuri din sursa originală.';
  renderCats(); renderGrid();
  loadCart();
  renderCart();
});

document.getElementById('search').addEventListener('input', renderGrid);
document.getElementById('clearCart').addEventListener('click',()=>{cart=[];persistCart();renderCart();});
document.getElementById('copyOrder').addEventListener('click',copyOrder);

function imageForCategoryName(name){
  const n=(name||'').toLowerCase();
  if(catImgs[n]) return catImgs[n];
  for(const [k,v] of Object.entries(catImgs)) if(n.includes(k) || k.includes(n)) return v;
  return '';
}

function renderCats(){
  const el=document.getElementById('cats');
  el.innerHTML='';
  data.categories.forEach(c=>{
    const b=document.createElement('button');
    b.textContent=c.name;
    if(c.id===activeCat) b.classList.add('active');
    b.onclick=()=>{activeCat=c.id; renderCats(); renderGrid();};
    el.appendChild(b);
  });
}

function renderGrid(){
  const q=(document.getElementById('search').value||'').toLowerCase().trim();
  const cat=data.categories.find(c=>c.id===activeCat);
  const grid=document.getElementById('grid');
  grid.innerHTML='';
  const catImg=imageForCategoryName(cat.name);

  cat.products
    .filter(p=>!q || (p.name||'').toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q))
    .forEach(p=>{
      const d=document.createElement('article'); d.className='card';
      const img=catImg ? `<img class="thumb" src="${catImg}" alt="${cat.name}" loading="lazy"/>` : `<div class="thumb ph">🍽️</div>`;
      d.innerHTML=`${img}
        <h4>${p.name}</h4>
        <p class='desc'>${p.description||''}</p>
        <p class='meta'>${p.gramaj||''}g</p>
        <p class='price'>${Number(p.price).toFixed(2)} ${CURRENCY}</p>
        <div class='actions'>
          <button class='btn add'>Adaugă</button>
          <div class='qty'>
            <button class='dec' type='button'>-</button>
            <span>${qtyOf(p.id)}</span>
            <button class='inc' type='button'>+</button>
          </div>
        </div>`;
      d.querySelector('.add').onclick=()=>{addToCart(p,1); renderGrid();};
      d.querySelector('.inc').onclick=()=>{addToCart(p,1); renderGrid();};
      d.querySelector('.dec').onclick=()=>{addToCart(p,-1); renderGrid();};
      grid.appendChild(d);
    });
}

function qtyOf(id){
  const i=cart.find(x=>x.id===id);
  return i?i.qty:0;
}

function addToCart(p,delta){
  const i=cart.findIndex(x=>x.id===p.id);
  if(i>-1){
    cart[i].qty += delta;
    if(cart[i].qty<=0) cart.splice(i,1);
  } else if(delta>0){
    cart.push({id:p.id,name:p.name,price:Number(p.price),qty:1});
  }
  persistCart();
  renderCart();
}

function persistCart(){ localStorage.setItem('cart5003', JSON.stringify(cart)); }
function loadCart(){ try{ cart=JSON.parse(localStorage.getItem('cart5003')||'[]'); }catch{ cart=[]; } }

function renderCart(){
  const el=document.getElementById('cart');
  el.innerHTML='';
  let total=0;
  cart.forEach(i=>{
    total += i.price*i.qty;
    const r=document.createElement('div'); r.className='cartrow';
    r.innerHTML=`<span class='name'>${i.qty}x ${i.name}</span><span>${(i.price*i.qty).toFixed(2)} ${CURRENCY}</span><button class='btn ghost rm' data-id='${i.id}'>Șterge</button>`;
    el.appendChild(r);
  });
  el.querySelectorAll('.rm').forEach(b=>b.onclick=()=>{const id=b.dataset.id; cart=cart.filter(x=>x.id!==id); persistCart(); renderGrid(); renderCart();});

  const t=document.createElement('div'); t.className='total'; t.textContent=`Total: ${total.toFixed(2)} ${CURRENCY}`;
  el.appendChild(t);

  const wa=`Bună! Doresc comandă Napoli Centrale:%0A` + cart.map(i=>`- ${i.qty}x ${i.name} (${(i.price*i.qty).toFixed(2)} lei)`).join('%0A') + `%0ATotal: ${total.toFixed(2)} lei`;
  const phone='407264450500';
  const a=document.getElementById('waLink');
  a.href=`https://wa.me/${phone}?text=${wa}`;
}

function buildOrderText(){
  const f=new FormData(document.getElementById('orderForm'));
  const total=cart.reduce((a,b)=>a+b.price*b.qty,0);
  return [
    `Client: ${f.get('name')}`,
    `Telefon: ${f.get('phone')}`,
    `Adresă: ${f.get('address')}`,
    `Observații: ${f.get('notes')||'-'}`,
    'Produse:',
    ...cart.map(i=>`- ${i.qty}x ${i.name} (${(i.price*i.qty).toFixed(2)} lei)`),
    `TOTAL: ${total.toFixed(2)} lei`
  ].join('\n');
}

function copyOrder(){
  const txt=buildOrderText();
  navigator.clipboard.writeText(txt).then(()=>{
    document.getElementById('ok').textContent='✅ Comanda a fost copiată în clipboard.';
  });
}

document.getElementById('orderForm').addEventListener('submit', e=>{
  e.preventDefault();
  if(!cart.length){ document.getElementById('ok').textContent='Adaugă produse în coș înainte de checkout.'; return; }
  const f=new FormData(e.target);
  const total=cart.reduce((a,b)=>a+b.price*b.qty,0);
  const order={
    id:'NC-'+Date.now(),
    customer:{name:f.get('name'), phone:f.get('phone'), address:f.get('address'), notes:f.get('notes')},
    items:cart,
    total,
    createdAt:new Date().toISOString()
  };
  const prev=JSON.parse(localStorage.getItem('orders5003')||'[]');
  prev.push(order);
  localStorage.setItem('orders5003', JSON.stringify(prev));
  document.getElementById('ok').textContent='✅ Comanda a fost înregistrată. ID: '+order.id;
  cart=[]; persistCart(); renderGrid(); renderCart(); e.target.reset();
});