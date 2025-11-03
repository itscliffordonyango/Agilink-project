
// AgriLink improved script
const BASE_URL = 'http://localhost:4000/api';
const content = document.getElementById('content');
const templates = {
  dashboard: document.getElementById('dashboard-template').content,
  market: document.getElementById('market-template').content,
  estimator: document.getElementById('estimator-template').content,
  listings: document.getElementById('listings-template').content
};

function clearActiveNav(){ document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active')) }
document.getElementById('nav-dashboard').addEventListener('click', ()=>{
  clearActiveNav(); document.getElementById('nav-dashboard').classList.add('active'); render('dashboard');
});
document.getElementById('nav-market').addEventListener('click', ()=>{
  clearActiveNav(); document.getElementById('nav-market').classList.add('active'); render('market');
});
document.getElementById('nav-estimator').addEventListener('click', ()=>{
  clearActiveNav(); document.getElementById('nav-estimator').classList.add('active'); render('estimator');
});
document.getElementById('nav-listings').addEventListener('click', ()=>{
  clearActiveNav(); document.getElementById('nav-listings').classList.add('active'); render('listings');
});

document.getElementById('cta-get-started').addEventListener('click', ()=> {
  document.getElementById('nav-dashboard').click();
});

async function fetchJSON(url, opts){
  try{
    const res = await fetch(url, opts);
    if(!res.ok) throw new Error('Network response not ok '+res.status);
    return await res.json();
  }catch(err){
    console.warn('fetch failed', url, err);
    throw err;
  }
}

async function render(name){
  content.innerHTML='';
  const node = templates[name].cloneNode(true);
  content.appendChild(node);
  if(name==='dashboard') await dashboardInit();
  if(name==='market') await marketInit();
  if(name==='estimator') estimatorInit();
  if(name==='listings') listingsInit();
}

async function dashboardInit(){
  const expected = document.getElementById('expected-value');
  const marketList = document.getElementById('market-list');
  marketList.innerHTML='<li>Loading...</li>';
  // load cached or fetch
  let data = null;
  try{
    data = await fetchJSON(BASE_URL + '/prices?region=makueni');
    localStorage.setItem('market_cache', JSON.stringify({ts:Date.now(), data}));
  }catch(e){
    const cache = localStorage.getItem('market_cache');
    if(cache) data = JSON.parse(cache).data;
  }
  if(data && data.length){
    expected.textContent = 'KES ' + Math.round(data.reduce((s,i)=>s+(i.current_price*50),0)).toLocaleString();
    marketList.innerHTML = '';
    data.slice(0,4).forEach(it=>{
      const li = document.createElement('li');
      li.innerHTML = `<strong>${it.name}</strong><span>KES ${it.current_price}</span>`;
      marketList.appendChild(li);
    });
  }else{
    marketList.innerHTML = '<li>No market data</li>';
  }
  const alertsBox = document.getElementById('alerts-box');
  try{
    const w = await fetchJSON(BASE_URL + '/weather?lat=-1.8&lon=37.8');
    alertsBox.textContent = w.alert || 'No alerts';
  }catch(e){
    alertsBox.textContent = 'No alerts (offline)';
  }
}

async function marketInit(){
  const list = document.getElementById('market-full');
  const region = document.getElementById('region');
  document.getElementById('refresh-market').addEventListener('click', ()=> render('market'));
  try{
    const data = await fetchJSON(BASE_URL + '/prices?region='+region.value);
    list.innerHTML = '';
    data.forEach(it=>{
      const li = document.createElement('li');
      li.innerHTML = `<div><strong>${it.name}</strong><div class="muted">${it.unit}</div></div><div>KES ${it.current_price}</div>`;
      list.appendChild(li);
    });
  }catch(e){
    const cache = localStorage.getItem('market_cache');
    if(cache){
      const data = JSON.parse(cache).data;
      list.innerHTML = '';
      data.forEach(it=>{
        const li = document.createElement('li');
        li.innerHTML = `<div><strong>${it.name}</strong><div class="muted">${it.unit}</div></div><div>KES ${it.current_price}</div>`;
        list.appendChild(li);
      });
    }else{
      list.innerHTML = '<li>Unable to load market data</li>';
    }
  }
}

function estimatorInit(){
  document.getElementById('calc-estimate').addEventListener('click', ()=>{
    const crop = document.getElementById('crop').value||'Crop';
    const y = Number(document.getElementById('yield').value)||0;
    const p = Number(document.getElementById('price').value)||0;
    const loss = Number(document.getElementById('loss').value)||0;
    const storage = Number(document.getElementById('storage').value)||0;
    const transport = Number(document.getElementById('transport').value)||0;
    const gross = y * p;
    const lost = gross * (loss/100);
    const net = gross - lost - storage - transport;
    document.getElementById('est-result').innerHTML = `<p>Gross: KES ${gross.toFixed(2)}</p><p>Net: KES ${net.toFixed(2)}</p>`;
  });
  document.getElementById('post-estimate').addEventListener('click', async ()=>{
    const body = {
      crop: document.getElementById('crop').value||'Crop',
      yield: Number(document.getElementById('yield').value)||0,
      price: Number(document.getElementById('price').value)||0,
      loss: Number(document.getElementById('loss').value)||0,
      storage: Number(document.getElementById('storage').value)||0,
      transport: Number(document.getElementById('transport').value)||0
    };
    try{
      const res = await fetchJSON(BASE_URL + '/estimates/profit', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
      document.getElementById('est-result').innerHTML = `<pre>${JSON.stringify(res,null,2)}</pre>`;
    }catch(e){
      alert('Server estimate failed (offline?)');
    }
  });
}

function listingsInit(){
  const queuedList = document.getElementById('queued-list');
  function refreshQueued(){
    const items = JSON.parse(localStorage.getItem('queued_listings')||'[]');
    queuedList.innerHTML = '';
    if(items.length===0) queuedList.innerHTML = '<li>No queued listings</li>';
    items.forEach((it,idx)=>{
      const li = document.createElement('li');
      li.innerHTML = `<div><strong>${it.crop}</strong><div class="muted">${it.qty} kg • KES ${it.price}/kg</div></div><div>${it.status}</div>`;
      queuedList.appendChild(li);
    });
  }
  refreshQueued();
  document.getElementById('create-listing').addEventListener('click', ()=>{
    const crop = document.getElementById('list-crop').value||'Crop';
    const qty = Number(document.getElementById('list-qty').value)||0;
    const price = Number(document.getElementById('list-price').value)||0;
    const item = {id:'q_'+Date.now(), crop, qty, price, status:'QUEUED', createdAt:Date.now()};
    const arr = JSON.parse(localStorage.getItem('queued_listings')||'[]');
    arr.unshift(item);
    localStorage.setItem('queued_listings', JSON.stringify(arr));
    refreshQueued();
    alert('Listing created offline and queued. Use Sync Now to push.');
  });
  document.getElementById('sync-listings').addEventListener('click', async ()=>{
    const arr = JSON.parse(localStorage.getItem('queued_listings')||'[]');
    if(arr.length===0){ alert('No queued listings'); return; }
    const toSend = [...arr];
    for(const it of toSend){
      try{
        const res = await fetchJSON(BASE_URL + '/listings', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(it)});
        // mark as synced
        it.status = 'SYNCED';
      }catch(e){
        console.warn('sync failed for', it);
        it.status = 'FAILED';
      }
    }
    localStorage.setItem('queued_listings', JSON.stringify(toSend));
    refreshQueued();
    alert('Sync attempt completed. Check queued list.');
  });
}

// initial render
document.getElementById('nav-dashboard').click();
