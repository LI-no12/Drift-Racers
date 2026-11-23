/* Drift Racers 3D – ai.js (Reihenfolge der Dateien siehe index.html) */
let jovOpen=false;
const WL={lvl:0,s:0,cd:0,bust:0};let cops=[];
function toggleJov(){if(!jovOpen){if(!job.on){toast("Du hast keinen Job – Polizei und Feuerwehr am Stadtplatz");return}if(st==="count"||st==="race"||shop||lvOpen||wsOpen||polOpen||mapOpen)return}jovOpen=!jovOpen;$("jov").style.display=jovOpen?"block":"none";if(jovOpen)drawJov()}
function drawJov(){const p=job.type==="p",a=p?save.cop.a:save.fd.a,rk=Math.floor(a/3),rw=Math.round((p?90:110)*(1+rk*.15));
$("jm").innerHTML=`<b>${p?"🚓 Polizei – Verbrecherjagd":"🚒 Feuerwehr – Brandeinsatz"}</b><br>Rang ${rk} · ${p?"Festnahmen":"Gelöschte Brände"}: ${a} · Prämie pro Einsatz: €${rw}<br>Aktuell: ${p?(sus?"Verdächtiger flüchtet ("+Math.round(sus.dist)+" m entfernt, noch "+Math.ceil(sus.t)+" s)":"warte auf Einsatz"):(fire?"Brand "+Math.round(fire.dist)+" m entfernt ("+Math.round(fire.hp)+"% Feuer, noch "+Math.ceil(fire.t)+" s)":"warte auf Einsatz")}<br>Fahndung: ${WL.lvl?"★".repeat(WL.lvl):"keine"}`;
const L=$("jl");L.innerHTML="";const b=document.createElement("button");b.textContent="Job beenden";b.onclick=()=>{endJob();toggleJov()};L.appendChild(b);const c=document.createElement("button");c.style.marginLeft="10px";c.textContent="Weiterarbeiten (J)";c.onclick=()=>toggleJov();L.appendChild(c)}
const fp=[];for(let i=0;i<140;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:smT,color:0xff7a18,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}));s.userData={t:0,vy:0};s.visible=false;S.add(s);fp.push(s)}let fi=0;
function spawnFire(){const c=blds.filter(b=>(b.hx===18||b.bl)&&Math.hypot(b.x-me.x,b.z-me.z)>250);if(!c.length){job.w=3;return}const b=c[Math.floor(Math.random()*c.length)];fire={x:b.x,z:b.z,hp:100,t:100,dist:999,hx:b.hx,hz:b.hz};toast("🚨 Brand gemeldet! Zum Einsatzort!")}
function fireUpd(dt){if(!fire)return;const f=fire,dd=Math.hypot(me.x-f.x,me.z-f.z),HX=(f.hx||18)+1,HZ=(f.hz||18)+1;f.dist=Math.max(0,dd-Math.max(HX,HZ)-2);f.t-=dt;
for(let i=0,n=Math.ceil(4*f.hp/100);i<n;i++){const s=fp[fi++%140],side=Math.random()<.5;s.position.set(side?f.x+(Math.random()<.5?-HX:HX):f.x+(Math.random()-.5)*2*HX,3+Math.random()*12,side?f.z+(Math.random()-.5)*2*HZ:f.z+(Math.random()<.5?-HZ:HZ));s.userData.t=1;s.userData.vy=3+Math.random()*3;s.scale.set(5,5,1);s.visible=true}
if(Math.random()<.3){const s=sm[si++%120];s.material.color.setHex(0x333333);s.position.set(f.x+(Math.random()-.5)*20,14,f.z+(Math.random()-.5)*20);s.userData.t=1;s.visible=true}
const ok=!shop&&!lvOpen&&!wsOpen&&!mapOpen&&!polOpen&&!jovOpen&&(st==="idle"||st==="done");
if(ok&&K.KeyF&&f.dist<35){f.hp-=18*dt;for(let i=0;i<3;i++){const s=sk[ki++%80],u=s.userData,a=Math.atan2(f.x-me.x,f.z-me.z)+(Math.random()-.5)*.15;s.position.set(me.x+Math.sin(me.h)*2,1.3,me.z+Math.cos(me.h)*2);u.t=.9;u.vx=Math.sin(a)*26;u.vz=Math.cos(a)*26;u.vy=3+Math.random()*3;u.g=12;s.scale.set(.5,.5,1);s.material.color.setHex(0x6ec6ff);s.visible=true}}
if(f.hp<=0){const rw=Math.round(110*(1+Math.floor(save.fd.a/3)*.15));save.fd.a++;save.money+=rw;persist();toast(`🧯 Brand gelöscht! +€${rw}`);fire=null;job.w=4}else if(f.t<=0){toast("Das Gebäude ist abgebrannt …");fire=null;job.w=4}}
function fpUpd(dt){fp.forEach(s=>{const u=s.userData;if(u.t>0){u.t-=dt*1.4;s.position.y+=u.vy*dt;s.material.opacity=Math.max(0,u.t)*.9;const k=5+(1-u.t)*3;s.scale.set(k,k,1)}else s.visible=false})}
function addStar(){if(WL.cd>0)return;WL.cd=1.2;WL.lvl=Math.min(5,WL.lvl+1);WL.s=22;toast(`⭐ Fahndungsstufe ${WL.lvl}`)}
function spawnCop(){if(OSMC)return spawnCopG();const m=makeCar(0xf2f2f2,1),lb=[0xff2020,0x2060ff].map((col,i)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.14,.28),new THREE.MeshBasicMaterial({color:col}));b.position.set(i?.35:-.35,1.55,0);m.add(b);return b});m.userData.lb=lb;S.add(m);
const gx=Math.max(-840,Math.min(840,Math.round(me.x/120)*120)),p=Math.max(-840,Math.min(840,me.z+(Math.random()<.5?-1:1)*(120+Math.random()*100)));cops.push({m,ax:0,k:gx,p,d:Math.random()<.5?1:-1,v:20,hold:0,dist:999})}
function copUpd(c,dt){if(OSMC)return copUpdG(c,dt);if(c.hold>0)c.hold-=dt;else{c.v=(26+5*WL.lvl)*(1+Math.min(.6,Math.max(0,(c.dist-100)/400)));const pp=c.p;c.p+=c.d*c.v*dt;
if(Math.floor(pp/120)!==Math.floor(c.p/120)&&Math.abs(c.p)<840){const ig=Math.round(c.p/120)*120,gx=c.ax?ig:c.k,gz=c.ax?c.k:ig;let best=null,bd=1e18;
for(const[a,d]of[[0,1],[0,-1],[1,1],[1,-1]]){const nx=a?gx+d*120:gx,nz=a?gz:gz+d*120;if(Math.abs(nx)>840||Math.abs(nz)>840)continue;const q=(nx-me.x)**2+(nz-me.z)**2+(Math.random()<.05?4e5:0);if(q<bd){bd=q;best=[a,d]}}
if(best){c.ax=best[0];c.d=best[1];c.k=best[0]?gz:gx;c.p=best[0]?gx:gz}}if(Math.abs(c.p)>840){c.d=-c.d;c.p=Math.max(-840,Math.min(840,c.p))}}
const x=c.ax?c.p:c.k-3*c.d,z=c.ax?c.k+3*c.d:c.p;c.m.position.set(x,0,z);c.m.rotation.y=c.ax?(c.d>0?Math.PI/2:-Math.PI/2):(c.d>0?0:Math.PI);
const ph=Math.floor(tm*6)%2;c.m.userData.lb[0].visible=ph===0;c.m.userData.lb[1].visible=ph===1;
const ax=foot?pl.x:me.x,az=foot?pl.z:me.z,dx=ax-x,dz=az-z,dd=Math.hypot(dx,dz);c.dist=dd;if(!foot&&dd<3.6&&dd>.001){const imp=Math.hypot(me.vx,me.vz);me.x+=dx/dd*(3.6-dd);me.z+=dz/dd*(3.6-dd);crash(Math.max(imp,18)*1.1,dx/dd,dz/dd);me.vx*=.6;me.vz*=.6;c.hold=.3}}
function busted(){const loss=Math.min(save.money,Math.round(save.money*.12));save.money-=loss;persist();WL.lvl=0;WL.bust=0;WL.s=0;cops.forEach(c=>S.remove(c.m));cops=[];toast(`🚔 Festgenommen! Strafe −€${loss}`);goHub()}
function wantedUpd(dt){WL.cd-=dt;const want=[0,2,3,5,7,9][WL.lvl];while(cops.length<want)spawnCop();while(cops.length>want){S.remove(cops.pop().m)}
let near=1e9;cops.forEach(c=>{copUpd(c,dt);near=Math.min(near,c.dist)});
if(WL.lvl>0){if(near<220)WL.s=22;else{WL.s-=dt;if(WL.s<=0){WL.lvl=0;toast("Fahndung beendet")}}
if(near<10&&(foot||Math.hypot(me.vx,me.vz)<9)){WL.bust+=dt;if(WL.bust>1.5)busted()}else WL.bust=Math.max(0,WL.bust-dt)}
const el=$("stars");if(WL.lvl>0){el.style.opacity=near>=220&&Math.floor(tm*4)%2?.25:1;el.textContent="★".repeat(WL.lvl)+"☆".repeat(5-WL.lvl)}else el.textContent=""}
