/* Drift Racers 3D – game.js (Reihenfolge der Dateien siehe index.html) */
const me={x:0,z:30,h:Math.PI,vx:0,vz:0,cum:0,ix:0,off:false,dr:false,ch:0,bo:0,dt:0,fin:false,ct:0,cs:0,av:0,cd:0,nt:100,nn:false};let myMesh,trk=-1;
function setCar(){if(myMesh)S.remove(myMesh);const c=CARS[save.sel];myMesh=makeCar(c.c,c.s,save.sel);const sh=MOD[save.sel],y=sh?(.32+sh[2]+sh[3]+.14):1.25;myMesh.userData.lb=[[0xff2020,-.35],[0x2060ff,.35]].map(([col,x])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.5,.14,.28),new THREE.MeshBasicMaterial({color:col}));m.position.set(x,y,0);m.visible=false;myMesh.add(m);return m});S.add(myMesh);const nd=Math.round((100-dur())/9);for(let i=0;i<nd;i++){const a=Math.random()*6.28;dentCar(myMesh,Math.cos(a)*.95,Math.sin(a)*2.2,.25)}}
const BC=[0xe11d48,0x14b8a6,0xfacc15,0xf97316,0x84cc16,0xec4899];const bots=[0,1,2,3,4,5].map(i=>{const m=makeCar(BC[i],1);m.visible=false;S.add(m);return{m,slot:i+1,i,cum:0,fin:false,t0:0}});
function toStart(){const T=TR[trk],p=at(T,N-4,3);Object.assign(me,{x:p.x,z:p.z,h:p.h,vx:0,vz:0,cum:0,ix:N-4,off:false,ch:0,bo:0,dt:0,dr:false,fin:false});
bots.forEach(b=>{b.cum=0;b.fin=false;b.t0=N-4-3*b.slot;const q=at(T,b.t0,b.slot%2?-3:3);b.m.position.set(q.x,0,q.z);b.m.rotation.y=q.h;b.m.visible=b.i<nb})}
function goHub(){foot=false;pmesh.visible=false;st="idle";trk=-1;Object.assign(me,{x:0,z:30,h:Math.PI,vx:0,vz:0,fin:false,off:false,dr:false,bo:0,ch:0});bots.forEach(b=>b.m.visible=false);$("msg").innerHTML="";camNew=true}
setCar();

let camYaw=0,camPitch=0,camZoom=1,camIdle=0;const md={x:0,down:false};const K={};let st="idle",cnt=0,raceT=0,shop=false,camMode=0,camNew=true,msgT=0,online=1;
const CN=["Verfolger","Cockpit","Von oben","Seitlich","Tief hinten"];
function padNear(){if(Math.hypot((foot?pl.x:me.x)-45,(foot?pl.z:me.z)-45)<9)return -3;if(Math.hypot((foot?pl.x:me.x)-SHOPPAD[0],(foot?pl.z:me.z)-SHOPPAD[1])<9)return -2;if(Math.hypot((foot?pl.x:me.x)-WORKPAD[0],(foot?pl.z:me.z)-WORKPAD[1])<9)return -4;if(Math.hypot((foot?pl.x:me.x)-POLPAD[0],(foot?pl.z:me.z)-POLPAD[1])<9)return -5;if(Math.hypot((foot?pl.x:me.x)-FIREPAD[0],(foot?pl.z:me.z)-FIREPAD[1])<9)return -6;if(Math.hypot((foot?pl.x:me.x)-RCPAD[0],(foot?pl.z:me.z)-RCPAD[1])<9)return -7;for(let i=0;i<TR.length;i++)if(TR[i].pad&&Math.hypot((foot?pl.x:me.x)-TR[i].pad[0],(foot?pl.z:me.z)-TR[i].pad[1])<9)return i;return -1}
addEventListener("keydown",e=>{const c=e.code;if(/^(Arrow|Space)/.test(c))e.preventDefault();K[c]=1;if(e.repeat)return;
if(c==="KeyC"){camMode=(camMode+1)%5;camNew=true}if(/^Digit[1-5]$/.test(c)){camMode=+c[5]-1;camNew=true}
if(c==="KeyO"&&mapOpen&&REAL.ok){OSMV.on=!OSMV.on;if(OSMV.on&&typeof loadOsmTiles==="function")loadOsmTiles()}if(c==="KeyG")applyQuality((quality+1)%3,true);if(c==="KeyX")toggleFoot();if(c==="KeyJ")toggleJov();if(c==="KeyF")arrest();if(c==="KeyM"&&!shop&&!lvOpen&&!wsOpen&&!polOpen)toggleMap();if(c==="KeyH"&&!shop&&!lvOpen&&!wsOpen&&!mapOpen)goHub();
if(c==="KeyL"&&!shop&&(st==="idle"||st==="done"))toggleLv();
if(c==="KeyR"&&!shop&&!lvOpen&&st==="done")startRace(trk,lvl,laps);
if(c==="KeyR"&&!shop&&st==="idle"){const k=padNear();if(k>=0)startRace(k)}
if(c==="Enter"){if(rcOpen)toggleRc();else if(jovOpen)toggleJov();else if(polOpen)togglePol();else if(wsOpen)toggleWs();else if(lvOpen)toggleLv();else if(shop)toggleShop();else if(st==="idle"){const k=padNear();if(k>=0)startRace(k);else if(k===-2)toggleShop();else if(k===-3)toggleLv();else if(k===-4)toggleWs();else if(k===-5)togglePol("p");else if(k===-6)togglePol("f");else if(k===-7)toggleRc()}else if(st==="done")toggleShop()}
if(c==="Escape"&&shop)toggleShop();if(c==="Escape"&&lvOpen)toggleLv();if(c==="Escape"&&wsOpen)toggleWs();if(c==="Escape"&&mapOpen)toggleMap();if(c==="Escape"&&polOpen)togglePol();if(c==="Escape"&&jovOpen)toggleJov();if(c==="Escape"&&rcOpen)toggleRc()});
addEventListener("keyup",e=>K[e.code]=0);addEventListener("blur",()=>{for(const k in K)K[k]=0;md.down=false});
R.domElement.addEventListener("mousedown",()=>{md.down=true;camIdle=0});addEventListener("mouseup",()=>{md.down=false});
addEventListener("mousemove",e=>{if(!md.down)return;camIdle=0;if(foot)md.x+=e.movementX;else{camYaw-=e.movementX*.005;camPitch=Math.max(-3,Math.min(12,camPitch+e.movementY*.03))}});
R.domElement.addEventListener("wheel",e=>{camZoom=Math.max(.5,Math.min(2.5,camZoom*(1+e.deltaY*.001)));e.preventDefault()},{passive:false});
R.domElement.addEventListener("contextmenu",e=>e.preventDefault());
$("shopbtn").onclick=()=>toggleShop();$("close").onclick=()=>toggleShop();
function toggleShop(){if(st==="count"||st==="race")return;shop=!shop;$("shop").style.display=shop?"block":"none";if(shop)drawShop()}
function drawShop(){$("mon").textContent="Dein Geld: €"+save.money;const L=$("list");L.innerHTML="";
CARS.forEach((c,i)=>{const own=save.owned.includes(i),d=document.createElement("div");d.className="card"+(save.sel===i?" sel":"");
const bar=(l,v,mx)=>`<div>${l}</div><div class=bar><i style="width:${v/mx*100}%"></i></div>`;
d.innerHTML=`<div class=sw style="background:#${c.c.toString(16).padStart(6,"0")}"></div><b>${c.n}</b>`+bar("Tempo",c.m,100)+bar("Beschleunigung",c.a,60)+bar("Handling",c.h,1.45);
const b=document.createElement("button");
if(save.sel===i){b.textContent="Gewählt";b.disabled=true}else if(own){b.textContent="Fahren";b.onclick=()=>{save.sel=i;persist();setCar();drawShop()}}
else{b.textContent="Kaufen €"+c.p;b.disabled=save.money<c.p;b.onclick=()=>{save.money-=c.p;save.owned.push(i);save.sel=i;persist();setCar();drawShop()}}
d.appendChild(b);L.appendChild(d)})}

let lvOpen=false;
function toggleLv(){if(st==="count"||st==="race")return;lvOpen=!lvOpen;$("lvl").style.display=lvOpen?"block":"none";if(lvOpen)drawLv()}
function drawLv(){$("lm").textContent=`Freigeschaltet bis Level ${Math.min(20,save.lvl+1)} · Top 3 schaltet das nächste Level frei · jedes Level: schwerere Strecke, mehr und bessere Gegner, mehr Preisgeld`;const L=$("lg");L.innerHTML="";
for(let i=1;i<=20;i++){const b=document.createElement("button"),l=2+(i>7)+(i>14);b.innerHTML=`${i<=save.lvl?"✅ ":i>save.lvl+1?"🔒 ":"▶ "}Level ${i}<br><small>${TR[tf(i)].n} · ${l} Runden<br>Gegner ${"★".repeat(Math.ceil(i/4))}</small>`;b.disabled=i>save.lvl+1;b.onclick=()=>{toggleLv();startRace(tf(i),i)};L.appendChild(b)}}
$("lc").onclick=()=>toggleLv();
function toggleWs(){if(st==="count"||st==="race")return;wsOpen=!wsOpen;$("ws").style.display=wsOpen?"block":"none";if(wsOpen)drawWs()}
function drawWs(){const c=CARS[save.sel],t=tn(save.sel),dp=dur(),cost=lv=>Math.round((150+c.p*.12)*(lv+1)),rep=Math.ceil((100-dp)*(4+c.p/2500));
$("wm").textContent=`${c.n} · Geld €${save.money} · Zustand ${Math.round(dp)}%`;const L=$("wl");L.innerHTML="";
[["m","Motor","+3% Höchsttempo, +4% Beschleunigung"],["r","Fahrwerk & Reifen","+4% Handling"],["n","Nitro-Tank","+25% Tankgröße"],["a","Verstärkte Karosserie","−12% Unfallschaden"]].forEach(([k,n,ds])=>{const lv=t[k],d=document.createElement("div");d.className="card";d.innerHTML=`<b>${n}</b><div>Stufe ${lv}/5</div><small>${ds}</small><br>`;const b=document.createElement("button");
if(lv>=5){b.textContent="Max";b.disabled=true}else{const p=cost(lv);b.textContent="Tunen €"+p;b.disabled=save.money<p;b.onclick=()=>{save.money-=p;t[k]++;persist();drawWs()}}d.appendChild(b);L.appendChild(d)});
const d=document.createElement("div");d.className="card";d.innerHTML=`<b>Reparatur</b><div>Zustand ${Math.round(dp)}%</div><small>Unfälle senken Haltbarkeit und Leistung</small><br>`;const b=document.createElement("button");b.textContent=dp>=99.5?"Intakt":"Reparieren €"+rep;b.disabled=dp>=99.5||save.money<rep;b.onclick=()=>{save.money-=rep;save.dur[save.sel]=100;persist();setCar();drawWs()};d.appendChild(b);L.appendChild(d)}
$("wc").onclick=()=>toggleWs();
const job={on:false,w:0,type:"p"};let sus=null,polOpen=false,stType="p",fire=null;
function togglePol(t){if(st==="count"||st==="race")return;if(t)stType=t;polOpen=!polOpen;$("pol").style.display=polOpen?"block":"none";if(polOpen)drawPol()}
function drawPol(){const p=stType==="p",a=p?save.cop.a:save.fd.a,rk=Math.floor(a/3),rw=Math.round((p?90:110)*(1+rk*.15));$("pt").textContent=p?"🚓 Polizeirevier":"🚒 Feuerwache";
$("pm").innerHTML=(p?`<b>Kommissar Brandt:</b> „Willkommen im Revier! Verdächtige flüchten mit schnellen Wagen durch die Stadt. Hol sie ein, fahr auf unter 10 Meter heran und nimm sie mit <b>F</b> fest. Je mehr Festnahmen, desto schneller die Täter – und desto höher die Prämie.“`:`<b>Einsatzleiter Weiß:</b> „Willkommen auf der Wache! In der Stadt brennt es. Fahr zum Brandort, halte <b>F</b> gedrückt und lösche das Feuer, solange du unter 35 Metern entfernt bist. Je mehr Brände du löschst, desto höher Rang und Prämie.“`)+`<br><br>Rang ${rk} · ${p?"Festnahmen":"Gelöschte Brände"}: ${a} · Prämie pro Einsatz: €${rw} · Status: ${job.on?(job.type==="p"?"im Dienst (Polizei)":"im Dienst (Feuerwehr)"):"nicht im Dienst"}<br>Während des Jobs öffnet <b>J</b> die Job-Übersicht, dort kannst du aufhören.`;
const L=$("pl");L.innerHTML="";const b=document.createElement("button"),same=job.on&&job.type===stType;b.textContent=same?"Dienst beenden":"Job annehmen: "+(p?"Verbrecherjagd":"Brandbekämpfung");b.onclick=()=>{if(job.on)endJob();if(!same)startJob();togglePol()};L.appendChild(b)}
function startJob(){job.on=true;job.type=stType;job.w=3;toast(stType==="p"?"🚓 Dienst begonnen – gleich kommt der erste Einsatz!":"🚒 Dienst begonnen – gleich kommt der erste Brand!")}
function endJob(){job.on=false;if(sus){S.remove(sus.m);sus=null}fire=null;toast("Dienst beendet")}
$("pc").onclick=()=>togglePol();
function spawnSus(){if(OSMC)return spawnSusG();const rk=Math.floor(save.cop.a/3),m=makeCar(0x151515,1+Math.floor(Math.random()*6)),g=label("GESUCHT","#ef4444",9,2.2);g.position.y=3.4;m.add(g);S.add(m);let ax,k,p,i=0;
do{ax=Math.random()<.5?0:1;k=(Math.floor(Math.random()*15)-7)*120;p=(Math.random()-.5)*1600;i++}while(i<30&&Math.hypot(ax?p-me.x:k-me.x,ax?k-me.z:p-me.z)<250);
sus={m,ax,k,p,d:Math.random()<.5?1:-1,v:Math.min(34,18+rk*1.5),hold:0,t:100,dist:999};toast("🚨 Verdächtiger flüchtet! Hol ihn ein!")}
function susUpd(dt){if(!job.on||!sus)return;if(OSMC)return susUpdG(dt);const s=sus;
if(s.hold>0)s.hold-=dt;else{const pp=s.p;s.p+=s.d*s.v*dt;if(Math.floor(pp/120)!==Math.floor(s.p/120)&&Math.abs(s.p)<840&&Math.random()<.5){const m=Math.round(s.p/120)*120,ok=s.k;s.ax=1-s.ax;s.k=m;s.p=ok;s.d=Math.random()<.5?1:-1}if(Math.abs(s.p)>840){s.d=-s.d;s.p=Math.max(-840,Math.min(840,s.p))}}
const x=s.ax?s.p:s.k-3*s.d,z=s.ax?s.k+3*s.d:s.p;s.m.position.set(x,0,z);s.m.rotation.y=s.ax?(s.d>0?Math.PI/2:-Math.PI/2):(s.d>0?0:Math.PI);
s.t-=dt;const dx=me.x-x,dz=me.z-z,dd=Math.hypot(dx,dz);s.dist=dd;
if(dd<3.6&&dd>.001){const imp=Math.hypot(me.vx,me.vz);me.x+=dx/dd*(3.6-dd);me.z+=dz/dd*(3.6-dd);crash(imp*.8,dx/dd,dz/dd);me.vx*=.7;me.vz*=.7;s.hold=.8}
if(s.t<=0){toast("Der Verdächtige ist entkommen!");S.remove(s.m);sus=null;job.w=4}}
function arrest(){if(!job.on||job.type!=="p"||st==="count"||st==="race"||shop||lvOpen||wsOpen||polOpen||mapOpen)return;if(!sus){toast("Gerade kein Verdächtiger im Einsatz");return}
if(sus.dist<10){const cp=save.cop,rw=Math.round(90*(1+Math.floor(cp.a/3)*.15));cp.a++;save.money+=rw;persist();burst(sus.m.position.x,sus.m.position.z,24);toast(`🚔 Festgenommen! +€${rw}`);S.remove(sus.m);sus=null;job.w=4}else toast("Zu weit weg – näher ran (unter 10 m)!")}
function jobHud(){const j=$("job"),ph=Math.floor(tm*5)%2,lb=myMesh.userData.lb;if(lb){lb[0].visible=job.on&&ph===0;lb[1].visible=job.on&&ph===1;lb[1].material.color.setHex(job.type==="f"?0xff2020:0x2060ff)}
if(!job.on){j.style.display="none";return}j.style.display="block";const p=job.type==="p",tg=p?(sus&&{x:sus.m.position.x,z:sus.m.position.z,d:sus.dist,t:sus.t}):(fire&&{x:fire.x,z:fire.z,d:fire.dist,t:fire.t}),
hd=p?`🚓 Polizei · Festnahmen: ${save.cop.a} · J: Übersicht`:`🚒 Feuerwehr · Gelöscht: ${save.fd.a} · J: Übersicht`;
if(tg){const dx=tg.x-me.x,dz=tg.z-me.z,f=dx*Math.sin(me.h)+dz*Math.cos(me.h),r=-dx*Math.cos(me.h)+dz*Math.sin(me.h);
j.innerHTML=`${hd}<br>${p?"Verdächtiger":"Brand"}: ${Math.round(tg.d||0)} m <span id="ja" style="transform:rotate(${Math.round(Math.atan2(r,f)*180/Math.PI)}deg)">⬆</span> · Zeit ${Math.max(0,Math.ceil(tg.t))} s<br>${p?"F: festnehmen (unter 10 m)":"F halten: löschen (unter 35 m) · Feuer "+Math.round(fire.hp)+"%"}`}
else j.innerHTML=`${hd}<br>Nächster Einsatz wird gesucht …`}
function startRace(k,l,lp){l=l|0;lvl=l;laps=l?2+(l>7)+(l>14):(lp||3);nb=l?Math.min(6,2+Math.ceil(l/4)):3;const ti=l?Math.min(4,Math.floor((l-1)/4)):1;bots.forEach(b=>{S.remove(b.m);b.m=makeCar(BC[b.i],ti);b.m.visible=false;S.add(b.m)});trk=k;toStart();st="count";cnt=3.99;raceT=0;camNew=true;$("msg").innerHTML=""}
function finish(){st="done";const T=TR[trk],pos=1+bots.filter(b=>b.fin).length+[...peers.values()].filter(o=>o.f&&o.k===trk).length,pz=Math.round(([220,130,70][pos-1]||25)*T.m*(lvl?1+lvl*.1:laps/3)),db=Math.round(me.dt*6),ok=lvl&&pos<=3,nw=ok&&lvl>save.lvl;if(nw)save.lvl=lvl;
save.money+=pz+db;persist();$("msg").innerHTML=`Platz ${pos}<small>${lvl?(ok?`Level ${lvl} geschafft!${nw&&lvl<20?` Level ${lvl+1} frei.`:""} `:`Level ${lvl} nicht geschafft (Top 3 nötig). `):""}${T.n}: €${pz} + Drift-Bonus €${db} · R: nochmal · H: Treffpunkt · L: Level-Auswahl · Enter: Autohaus</small>`}

function step(dt){const car=eff(),can=(st==="race"||st==="idle"||st==="done")&&!shop&&!lvOpen&&!wsOpen&&!mapOpen&&!polOpen&&!jovOpen&&!rcOpen&&!foot;
const up=can&&(K.KeyW||K.ArrowUp),dn=can&&(K.KeyS||K.ArrowDown),lf=can&&(K.KeyA||K.ArrowLeft),rg=can&&(K.KeyD||K.ArrowRight),e=can&&K.KeyE;
const fx=Math.sin(me.h),fz=Math.cos(me.h),rx=-Math.cos(me.h),rz=Math.sin(me.h);let sp=Math.hypot(me.vx,me.vz);const fs=me.vx*fx+me.vz*fz;
me.dr=!!e&&sp>(me.dr?8:14);me.nn=!!(can&&K.KeyQ&&me.nt>0&&(up||fs>3));if(me.nn)me.nt=Math.max(0,me.nt-28*dt);else me.nt=Math.min(car.nt,me.nt+4*dt);me.cd-=dt;
const turn=car.h*(me.dr?2.6:1.9)*Math.max(-1,Math.min(1,fs/12))*(1-Math.min(.35,sp/car.m*.3));me.h+=((lf?1:0)-(rg?1:0))*turn*dt;
const mu=(me.bo>0?1.35:1)*(me.nn?1.4:1);if(up||me.nn){const ka=car.a*mu*(me.nn?1.5:1);me.vx+=fx*ka*dt;me.vz+=fz*ka*dt}
if(dn){const k=fs>1?-34:-car.a*.5;me.vx+=fx*k*dt;me.vz+=fz*k*dt}
const lat=me.vx*rx+me.vz*rz,g=Math.min(1,(me.dr?1.5:8)*dt);me.vx-=rx*lat*g;me.vz-=rz*lat*g;
const d=me.off?1.8:.12+(up?0:.5);me.vx*=Math.max(0,1-d*dt);me.vz*=Math.max(0,1-d*dt);
sp=Math.hypot(me.vx,me.vz);const mx=car.m*mu*(me.off?.55:1);if(sp>mx){const k=1-Math.min(1,4*dt)*(1-mx/sp);me.vx*=k;me.vz*=k}
if(me.dr){me.ch+=dt;me.dt+=dt}else{if(me.ch>1.2)me.bo=.9+Math.min(me.ch,3)*.3;me.ch=0}me.bo=Math.max(0,me.bo-dt);
{const nx=me.x+me.vx*dt,nz=me.z+me.vz*dt;if(inDist(nx,nz)||!inDist(me.x,me.z)){me.x=nx;me.z=nz}else{me.vx*=-.3;me.vz*=-.3;if(!(me.bw>0)){me.bw=2.5;toast("Landkreisgrenze – hier geht es nicht weiter")}}me.bw=Math.max(0,(me.bw||0)-dt)}
for(const b of blds){if(Math.abs(b.x-me.x)>30||Math.abs(b.z-me.z)>30)continue;const cx=Math.max(b.x-b.hx,Math.min(b.x+b.hx,me.x)),cz=Math.max(b.z-b.hz,Math.min(b.z+b.hz,me.z)),dx=me.x-cx,dz=me.z-cz,dd=Math.hypot(dx,dz);if(dd<1.7){const imp=Math.hypot(me.vx,me.vz);if(dd>.001){me.x+=dx/dd*(1.7-dd);me.z+=dz/dd*(1.7-dd)}else me.x+=1.7;crash(imp,dd>.001?dx/dd:1,dd>.001?dz/dd:0);me.vx*=.5;me.vz*=.5}}
if(!OSMC&&Math.abs(me.x)<850&&Math.abs(me.z)<850&&Math.hypot(me.x,me.z)>112){const gx=Math.max(-840,Math.min(840,Math.round(me.x/120)*120)),gz=Math.max(-840,Math.min(840,Math.round(me.z/120)*120)),ux=me.x-gx,uz=me.z-gz,ax=Math.abs(ux),az=Math.abs(uz);
const onsw=(ax>7.7&&ax<12.3&&az>12)||(az>7.7&&az<12.3&&ax>12);if(onsw){me.vx*=Math.max(0,1-.5*dt);me.vz*=Math.max(0,1-.5*dt);if(!me.onsw&&Math.hypot(me.vx,me.vz)>10){me.ct=.3;me.cs=.2}}me.onsw=onsw}
if(trk>=0&&st!=="idle"){const T=TR[trk];let bj=me.ix,bd=1e18;for(let o=-10;o<=10;o++){const j=(me.ix+o+N)%N,p=T.P[j],q=(p.x-me.x)**2+(p.z-me.z)**2;if(q<bd){bd=q;bj=j}}
me.off=Math.sqrt(bd)>T.w/2+.9;if(st==="race"){me.cum+=((bj-me.ix+N+N/2)%N)-N/2}me.ix=bj;
if(st==="race"&&me.cum>=laps*N&&!me.fin){me.fin=true;finish()}}else me.off=false;
if(me.ct>0){me.ct-=dt;me.h+=me.av*dt;me.av*=Math.max(0,1-3*dt)}const ca=Math.max(0,me.ct/.9)*me.cs;myMesh.position.set(me.x,Math.abs(Math.sin(me.ct*16))*.6*ca,me.z);myMesh.rotation.set(Math.cos(me.ct*22)*.15*ca,me.h+(me.dr?(lf?.35:rg?-.35:0):0),Math.sin(me.ct*28)*.3*ca,"YXZ");myMesh.visible=camMode!==1;
return sp}

