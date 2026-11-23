/* Drift Racers 3D – landkreis.js (Reihenfolge der Dateien siehe index.html) */
const REAL={ok:false,rv:[],rd:[]};
async function ovp(q){const r=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",body:"data="+encodeURIComponent(q)});if(!r.ok)throw new Error("overpass");return (await r.json()).elements}
(async()=>{try{const el=await ovp('[out:json][timeout:90];rel["boundary"="administrative"]["admin_level"="6"]["name"="Landkreis Coburg"];out geom;');const rel=el.find(e=>e.type==="relation");if(!rel)return;
let ws=rel.members.filter(m=>m.type==="way"&&m.role!=="inner"&&m.geometry).map(m=>m.geometry.map(p=>[p.lon,p.lat]));if(!ws.length)return;
const same=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])<1e-7;let ring=ws.shift();
for(let g=0;ws.length&&g<999;g++){const e=ring[ring.length-1];let hit=-1,rev=false;for(let i=0;i<ws.length;i++){if(same(ws[i][0],e)){hit=i;break}if(same(ws[i][ws[i].length-1],e)){hit=i;rev=true;break}}if(hit<0)break;let w=ws.splice(hit,1)[0];if(rev)w=w.slice().reverse();ring=ring.concat(w.slice(1))}
const lon0=10.963,lat0=50.262,R2=ring.map(p=>[(p[0]-lon0)*71.2,(p[1]-lat0)*111.2]),ar=a=>{let s=0;for(let i=0;i<a.length;i++){const p=a[i],q=a[(i+1)%a.length];s+=p[0]*q[1]-q[0]*p[1]}return Math.abs(s/2)};
const s2=Math.sqrt(ar(DIST)/ar(R2)),tr=p=>[-(p[0]-lon0)*71.2*s2,(p[1]-lat0)*111.2*s2],pts=[];let last=null;
for(const p of ring){const q=tr(p);if(!last||Math.hypot(q[0]-last[0],q[1]-last[1])>45){pts.push(q);last=q}}
if(pts.length<20)return;REAL.t={lon0,lat0,s2};REAL.bb=[Math.min(...ring.map(p=>p[0])),Math.min(...ring.map(p=>p[1])),Math.max(...ring.map(p=>p[0])),Math.max(...ring.map(p=>p[1]))];DIST.length=0;pts.forEach(p=>DIST.push(p));buildFence();REAL.ok=true;
try{const e2=await ovp('[out:json][timeout:90];area["name"="Landkreis Coburg"]["admin_level"="6"]->.a;(way["waterway"="river"](area.a);way["highway"~"^(motorway|trunk|primary)$"](area.a););out geom qt;');
e2.forEach(w=>{if(!w.geometry)return;const l=w.geometry.map(p=>tr([p.lon,p.lat]));(w.tags&&w.tags.waterway?REAL.rv:REAL.rd).push(l)})}catch(e){}
toast("🗺️ OpenStreetMap-Karte des Landkreises geladen")}catch(e){}})();
