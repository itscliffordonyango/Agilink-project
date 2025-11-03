const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT||4000;
let listings = [];
const samplePrices = [
  {id:'c1', name:'Maize', unit:'kg', current_price:32},
  {id:'c2', name:'Beans', unit:'kg', current_price:85},
  {id:'c3', name:'Tomato', unit:'kg', current_price:20},
  {id:'c4', name:'Potato', unit:'kg', current_price:40},
  {id:'c5', name:'Kales', unit:'bundle', current_price:25}
];
app.get('/api/prices', (req,res)=> {
  res.json(samplePrices);
});
app.post('/api/estimates/profit', (req,res)=>{
  const b = req.body;
  const gross = (b.yield||0)*(b.price||0);
  const lost = gross * ((b.loss||0)/100);
  const net = gross - lost - (b.storage||0) - (b.transport||0);
  res.json({gross, lost, net, break_even: ((b.storage||0)+(b.transport||0))/(b.yield||1)});
});
app.post('/api/listings', (req,res)=>{
  const it = req.body;
  it.id = 's_'+Date.now();
  it.createdAt = Date.now();
  listings.push(it);
  res.json({ok:true, listing:it});
});
app.get('/api/listings', (req,res)=> res.json(listings));
app.get('/api/weather', (req,res)=> res.json({alert:null, forecast:[]}));
app.post('/api/auth/otp/request', (req,res)=> res.json({requestId:'r_'+Date.now()}));
app.post('/api/auth/otp/verify', (req,res)=> res.json({accessToken:'demo-token', refreshToken:'demo-refresh', farmer:{id:'f1', name:'Demo Farmer'}}));
app.listen(PORT, ()=> console.log('Mock backend running on',PORT));
