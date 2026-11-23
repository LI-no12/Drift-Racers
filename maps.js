/* Drift Racers 3D – maps.js (Reihenfolge der Dateien siehe index.html) */
const OSMV={on:false};
function loadOsmTiles(){if(!REAL.ok||REAL.tiles)return;const z=12,n=2**z,b=REAL.bb,tx0=Math.floor((b[0]+180)/360*n),tx1=Math.floor((b[2]+180)/360*n),ty=la=>Math.floor((1-Math.log(Math.tan(la*Math.PI/180)+1/Math.cos(la*Math.PI/180))/Math.PI)/2*n),ty0=ty(b[3]),ty1=ty(b[1]);REAL.tiles=[];
for(let x=tx0;x<=tx1;x++)for(let y=ty0;y<=ty1;y++){const img=new Image();img.crossOrigin="anonymous";img.src=`https://tile.openstreetmap.org/${z}/${x}/${y}.png`;REAL.tiles.push({img,x,y,z})}}
const bm=$("bm"),bx=bm.getContext("2d");
function toggleMap(){mapOpen=!mapOpen;$("bmw").style.display=mapOpen?"flex":"none";if(mapOpen)drawBig()}
function drawBig(){const sz=Math.max(300,Math.min(innerWidth,innerHeight)-60);bm.width=bm.height=sz;const s=sz/4700,c=sz/2,P=(wx,wz)=>[c-wx*s,c-wz*s];
bx.fillStyle="#17241d";bx.fillRect(0,0,sz,sz);
bx.beginPath();DIST.forEach((p,i)=>{const q=P(p[0],p[1]);i?bx.lineTo(q[0],q[1]):bx.moveTo(q[0],q[1])});bx.closePath();bx.fillStyle="#4a8a45";bx.fill();bx.strokeStyle="#f1f5f9";bx.lineWidth=3;bx.stroke();
const osm=OSMV.on&&REAL.ok&&REAL.tiles;
if(osm){const T0=REAL.t;REAL.tiles.forEach(t=>{if(!t.img.complete||!t.img.naturalWidth)return;const n=2**t.z,la=y=>Math.atan(Math.sinh(Math.PI*(1-2*y/n)))*180/Math.PI,X=lo=>c+(lo-T0.lon0)*71.2*T0.s2*s,Y=l=>c-(l-T0.lat0)*111.2*T0.s2*s,x0=X(t.x/n*360-180),x1=X((t.x+1)/n*360-180),y0=Y(la(t.y)),y1=Y(la(t.y+1));bx.drawImage(t.img,x0,y0,x1-x0,y1-y0)})}
if(!osm){let q=P(0,0);if(OSMC){bx.drawImage(OSMC.mapCv,c-900*s,c-900*s,1800*s,1800*s)}else{bx.fillStyle="#9aa0a8";bx.beginPath();bx.arc(q[0],q[1],900*s,0,TAU);bx.fill()}
if(!REAL.ok){bx.strokeStyle="#2f6fae";bx.lineWidth=4;bx.beginPath();for(let z=-2000;z<=1700;z+=100){const p=P(862+18*Math.sin(z/250),z);z===-2000?bx.moveTo(p[0],p[1]):bx.lineTo(p[0],p[1])}bx.stroke();
bx.beginPath();RODACH.forEach((r,i)=>{const p=P(r[0],r[1]);i?bx.lineTo(p[0],p[1]):bx.moveTo(p[0],p[1])});bx.stroke();}
if(REAL.ok){bx.lineWidth=3;bx.strokeStyle="#2f6fae";REAL.rv.forEach(l=>{bx.beginPath();l.forEach((p,i)=>{const q=P(p[0],p[1]);i?bx.lineTo(q[0],q[1]):bx.moveTo(q[0],q[1])});bx.stroke()});bx.lineWidth=2.5;bx.strokeStyle="#f4c35a";REAL.rd.forEach(l=>{bx.beginPath();l.forEach((p,i)=>{const q=P(p[0],p[1]);i?bx.lineTo(q[0],q[1]):bx.moveTo(q[0],q[1])});bx.stroke()})}
bx.strokeStyle="#d5d9de";bx.lineWidth=2;bx.beginPath();[[120,-840,150,-1060],[840,-120,950,-100],[-120,840,-200,1000],[-840,-240,-1450,-200],[-840,480,-1550,500],[-840,-840,-1500,-900],[840,240,1450,250],[-720,840,-1000,1400],[840,-480,1550,-750],[600,-840,800,-1750]].concat(VIL.map(v=>[v[3],v[4],v[1],v[2]])).forEach(r=>{const a=P(r[0],r[1]),b=P(r[2],r[3]);bx.moveTo(a[0],a[1]);bx.lineTo(b[0],b[1])});bx.stroke();
bx.font="bold 13px sans-serif";bx.textAlign="center";
TR.forEach(T=>{bx.strokeStyle="#"+T.c.toString(16).padStart(6,"0");bx.lineWidth=3;bx.beginPath();let f=1;T.P.forEach((p,i)=>{if(i%6)return;const a=P(p.x,p.z);f?bx.moveTo(a[0],a[1]):bx.lineTo(a[0],a[1]);f=0});bx.closePath();bx.stroke();const a=P(T.P[0].x,T.P[0].z);bx.fillStyle="#fff";bx.fillText(T.n,a[0],a[1]-8)});
VIL.forEach(v=>{const b=P(v[1],v[2]);bx.fillStyle="#cbd5e1";bx.beginPath();bx.arc(b[0],b[1],5,0,TAU);bx.fill();bx.fillStyle="#fff";bx.fillText(v[0],b[0],b[1]-9)});
{const v=P(400,950);bx.fillStyle="#f5deb3";bx.beginPath();bx.arc(v[0],v[1],5,0,TAU);bx.fill();bx.fillStyle="#fff";bx.fillText("Veste Coburg",v[0],v[1]-9)}
bx.fillStyle="#fff";bx.font="bold 18px sans-serif";bx.fillText("COBURG",q[0],q[1]-4);bx.font="12px sans-serif";bx.fillText("Marktplatz: Autohaus · Werkstatt · Polizei · Feuerwehr",q[0],q[1]+14);
{bx.fillStyle="#7fb2e5";bx.font="bold 13px sans-serif";const r0=P(900,1100),r1=P(1500,1380);bx.fillText("Itz",r0[0],r0[1]);bx.fillText("Rodach",r1[0],r1[1])}
}
bx.fillStyle="#f43f5e";peers.forEach(o=>{const p=P(o.x,o.z);bx.beginPath();bx.arc(p[0],p[1],5,0,TAU);bx.fill()});
if(fire){const p=P(fire.x,fire.z);bx.fillStyle=Math.floor(tm*4)%2?"#f97316":"#fde047";bx.beginPath();bx.arc(p[0],p[1],8,0,TAU);bx.fill()}
if(sus&&job.on){const p=P(sus.m.position.x,sus.m.position.z);bx.fillStyle=Math.floor(tm*4)%2?"#ef4444":"#3b82f6";bx.beginPath();bx.arc(p[0],p[1],8,0,TAU);bx.fill()}
const pp=P(cm.x,cm.z);bx.save();bx.translate(pp[0],pp[1]);bx.rotate(-cm.h);bx.fillStyle="#fde047";bx.strokeStyle="#000";bx.beginPath();bx.moveTo(0,-11);bx.lineTo(7,9);bx.lineTo(-7,9);bx.closePath();bx.fill();bx.stroke();bx.restore();
bx.fillStyle="#fff";bx.textAlign="left";bx.font="bold 14px sans-serif";bx.fillText(REAL.ok?"Karte Landkreis Coburg – © OpenStreetMap-Mitwirkende – M zum Schließen · O: OSM-Kartenbild an/aus":"Karte Landkreis Coburg (ungefähr, stark verkleinert) – M zum Schließen",14,22)}
const mm=$("mm"),mx=mm.getContext("2d");
function drawMM(){const s=.16,c=85,sh=Math.sin(cm.h),ch=Math.cos(cm.h),P=(wx,wz)=>{const dx=wx-cm.x,dz=wz-cm.z;return[c+(-dx*ch+dz*sh)*s,c-(dx*sh+dz*ch)*s]};
mx.clearRect(0,0,170,170);mx.save();mx.beginPath();mx.arc(c,c,c-1,0,TAU);mx.clip();mx.fillStyle="#2f5a35";mx.fillRect(0,0,170,170);
if(OSMC){const k=1200/1800,sk=s/k,u0=(900-cm.x)*k,v0=(900-cm.z)*k;mx.setTransform(sk*ch,sk*sh,-sk*sh,sk*ch,c-sk*(ch*u0-sh*v0),c-sk*(sh*u0+ch*v0));mx.drawImage(OSMC.mapCv,0,0);mx.setTransform(1,0,0,1,0,0)}else{mx.fillStyle="#6b7078";mx.beginPath();[[-850,-850],[850,-850],[850,850],[-850,850]].forEach((q,i)=>{const p=P(q[0],q[1]);i?mx.lineTo(p[0],p[1]):mx.moveTo(p[0],p[1])});mx.fill();
mx.strokeStyle="#d5d9de";mx.lineWidth=1.6;mx.beginPath();for(let k=-840;k<=840;k+=120){let p=P(k,-850),q=P(k,850);mx.moveTo(p[0],p[1]);mx.lineTo(q[0],q[1]);p=P(-850,k);q=P(850,k);mx.moveTo(p[0],p[1]);mx.lineTo(q[0],q[1])}mx.stroke();
}
TR.forEach(T=>{mx.strokeStyle="#"+T.c.toString(16).padStart(6,"0");mx.lineWidth=2;mx.beginPath();let f=1;T.P.forEach((p,i)=>{if(i%12)return;const q=P(p.x,p.z);f?mx.moveTo(q[0],q[1]):mx.lineTo(q[0],q[1]);f=0});mx.closePath();mx.stroke()});
let q=P(0,0);mx.fillStyle="#38bdf8";mx.beginPath();mx.arc(q[0],q[1],4,0,TAU);mx.fill();
mx.fillStyle="#f43f5e";peers.forEach(o=>{const p=P(o.x,o.z);mx.beginPath();mx.arc(p[0],p[1],3,0,TAU);mx.fill()});
if(fire){const p=P(fire.x,fire.z);mx.fillStyle=Math.floor(tm*4)%2?"#f97316":"#fde047";mx.beginPath();mx.arc(p[0],p[1],6,0,TAU);mx.fill()}if(sus&&job.on){const p=P(sus.m.position.x,sus.m.position.z);mx.fillStyle=Math.floor(tm*4)%2?"#ef4444":"#3b82f6";mx.beginPath();mx.arc(p[0],p[1],6,0,TAU);mx.fill()}mx.fillStyle="#fff";mx.beginPath();mx.moveTo(c,c-8);mx.lineTo(c+5,c+6);mx.lineTo(c-5,c+6);mx.fill();mx.restore()}
