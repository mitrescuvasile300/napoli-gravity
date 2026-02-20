let data, activeCat, cart=[], catImgs={};

Promise.all([
  fetch('menu.json').then(r=>r.json()),
  fetch('category_images.json').then(r=>r.json()).catch(()=>[])
]).then(([j, imgs])=>{
  data=j;
  activeCat=j.categories[0].id;
  imgs.forEach(i=>catImgs[i.name.toLowerCase()]=i.image);
  document.getElementById('meta').textContent = j.restaurant.description || 'Meniu și prețuri din sursa originală.';
  renderCats(); renderGrid(); renderCart();
});

function imageForCategoryName(name){
  const n=name.toLowerCase();
  if(catImgs[n]) return catImgs[n];
  const aliases={
    'paste': ['paste făcute în casă','paste'],
    'paste umplute': ['paste umplute făcute în casă'],
    'specialitățile casei':['specialitățile casei'],
    'deserturi':['deserturi'],
    'băuturi':['băuturi']
  };
  for(const [k,arr] of Object.entries(aliases)){
    if(n.includes(k)){
      for(const a of arr){ if(catImgs[a]) return catImgs[a]; }
    }
  }
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
  const cat=data.categories.find(c=>c.id===activeCat);
  const grid=document.getElementById('grid');
  grid.innerHTML='';
  const catImg=imageForCategoryName(cat.name);
  cat.products.forEach(p=>{
    const d=document.createElement('article'); d.className='card';
    const img=catImg ? `<img class="thumb" src="${catImg}" alt="${cat.name}"/>` : `<div class="thumb ph">🍽️</div>`;
    d.innerHTML=`${img}
      <h4>${p.name}</h4>
      <p class='desc'>${p.description||''}</p>
      <p class='meta'>${p.gramaj||''}g</p>
      <p class='price'>${p.price} lei</p>
      <button class='btn'>Adaugă</button>`;
    d.querySelector('button').onclick=()=>addToCart(p);
    grid.appendChild(d);
  });
}

function addToCart(p){
  const i=cart.findIndex(x=>x.id===p.id);
  if(i>-1) cart[i].qty++; else cart.push({id:p.id,name:p.name,price:p.price,qty:1});
  renderCart();
}

function renderCart(){
  const el=document.getElementById('cart');
  if(!el) return;
  el.innerHTML='';
  let total=0;
  cart.forEach(i=>{
    total+=i.price*i.qty;
    const r=document.createElement('div'); r.className='cartrow';
    r.innerHTML=`<span>${i.qty}x ${i.name}</span><span>${(i.price*i.qty).toFixed(2)} lei</span>`;
    el.appendChild(r);
  });
  const t=document.createElement('div'); t.className='total'; t.textContent=`Total: ${total.toFixed(2)} lei`;
  el.appendChild(t);
}

document.getElementById('orderForm').addEventListener('submit', e=>{
  e.preventDefault();
  const f=new FormData(e.target);
  const total=cart.reduce((a,b)=>a+b.price*b.qty,0);
  const order={
    id:'NC-'+Date.now(),
    customer:{name:f.get('name'), phone:f.get('phone'), address:f.get('address'), notes:f.get('notes')},
    items:cart,
    total,
    createdAt:new Date().toISOString()
  };
  const prev=JSON.parse(localStorage.getItem('orders')||'[]');
  prev.push(order);
  localStorage.setItem('orders', JSON.stringify(prev));
  document.getElementById('ok').textContent='✅ Comanda a fost înregistrată. ID: '+order.id;
  cart=[]; renderCart(); e.target.reset();
});