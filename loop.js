/* Drift Racers 3D – loop.js (Reihenfolge der Dateien siehe index.html) */
const TF=[];for(let i=0;i<(OSMC?0:30);i++){const m=makeCar(new THREE.Color().setHSL(Math.random(),.5,.45),Math.floor(Math.random()*7));S.add(m);TF.push({m,ax:Math.random()<.5?0:1,k:(Math.floor(Math.random()*15)-7)*120,p:(Math.random()-.5)*1600,d:Math.random()<.5?1:-1,v:10+Math.random()*8,hold:0})}
function trafficUpd(dt){if(OSMC)return trafficG(dt);TF.forEach((t,i)=>{if(i>=TL){t.m.visible=false;return}t.m.visible=true;if(t.hold>0)t.hold-=dt;else{const pp=t.p;t.p+=t.d*t.v*dt;
if(Math.floor(pp/120)!==Math.floor(t.p/120)&&Math.abs(t.p)<840){const m=Math.round(t.p/120)*120;if(Math.random()<.35){const ok=t.k;t.ax=1-t.ax;t.k=m;t.p=ok;t.d=Math.random()<.5?1:-1}}
if(Math.abs(t.p)>840){t.d=-t.d;t.p=Math.max(-840,Math.min(840,t.p))}}
const x=t.ax?t.p:t.k-4*t.d,z=t.ax?t.k+4*t.d:t.p;t.m.position.set(x,0,z);t.m.rotation.y=t.ax?(t.d>0?Math.PI/2:-Math.PI/2):(t.d>0?0:Math.PI);
const dx=me.x-x,dz=me.z-z,dd=Math.hypot(dx,dz);if(dd<3.6&&dd>.001){const imp=Math.hypot(me.vx,me.vz);me.x+=dx/dd*(3.6-dd);me.z+=dz/dd*(3.6-dd);crash(imp*.8,dx/dd,dz/dd);me.vx*=.7;me.vz*=.7;t.hold=1.5}})}
let fpsA=60,quality=2;try{const q=Number(localStorage.getItem("dr1q"));if(q>=0&&q<=2&&localStorage.getItem("dr1q")!==null)quality=q}catch(e){}
function applyQuality(q,say){quality=q;try{localStorage.setItem("dr1q",q)}catch(e){}
R.setPixelRatio([1,Math.min(devicePixelRatio,1.5),Math.min(devicePixelRatio,2)][q]);rs();
const sh=q>0;if(R.shadowMap.enabled!==sh){R.shadowMap.enabled=sh;sun.castShadow=sh;S.traverse(o=>{const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];ms.forEach(m=>{m.needsUpdate=true})})}
nbm.count=nhm.count=[80,250,NN][q];TL=[10,25,40][q];if(say)toast("Grafik: "+["Niedrig","Mittel","Hoch"][q]+" (G wechselt)")}
let last=performance.now(),tm=0;
function loop(now){requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000);fpsA=fpsA*.95+Math.min(120,1/Math.max(.001,(now-last)/1000))*.05;last=now;tm+=dt;
if(st==="count"){cnt-=dt;const n=Math.ceil(cnt);if(cnt<=0){st="race";raceT=0;msgT=1;$("msg").textContent="LOS!"}else $("msg").textContent=n}
if(st==="race"){raceT+=dt;if(msgT>0){msgT-=dt;if(msgT<=0)$("msg").textContent=""}}
const sp=step(dt);smoke(dt);sparks(dt);if(me.nn)flame();trafficUpd(dt);susUpd(dt);npcUpd(dt);dayUpd(dt);footUpd(dt);fireUpd(dt);fpUpd(dt);wantedUpd(dt);if(job.on&&!sus&&!fire){job.w-=dt;if(job.w<=0)job.type==="p"?spawnSus():spawnFire()}
if(trk>=0&&(st==="race"||st==="done")){const T=TR[trk],base=(lvl?32+3.2*lvl:30+(CARS[save.sel].m-38)*.8)*T.bf;bots.forEach(b=>{if(b.i>=nb)return;if(b.sl>0)b.sl-=dt;else if(Math.random()<dt*.06*(1-lvl/20))b.sl=.9;if(b.bt>0)b.bt-=dt;else if(Math.random()<dt*.3*(.3+lvl/20))b.bt=1;const gp=(me.cum-b.cum)/N,str=lvl?.55+lvl*.05:.8,rb=1+Math.max(-.03,Math.min(.8*str,gp*4));b.cum+=base*(1.1-b.i*(.04-.03*lvl/20))*rb*(b.sl>0?.6:1)*(b.bt>0?1.3:1)/T.sp*dt;if(b.cum>=laps*N)b.fin=true;
const q=at(T,b.t0+b.cum,(b.i-1)*4+Math.sin(tm*.5+b.i)*1.5);b.m.position.set(q.x,0,q.z);b.m.rotation.y=q.h})}
peers.forEach(o=>{const m=o.m;m.position.x+=(o.x-m.position.x)*Math.min(1,dt*12);m.position.z+=(o.z-m.position.z)*Math.min(1,dt*12);
let dh=o.h-m.rotation.y;dh=Math.atan2(Math.sin(dh),Math.cos(dh));m.rotation.y+=dh*Math.min(1,dt*12)});
cm=foot?pl:me;updCam(dt);if(me.ct>0){const q=me.ct*me.cs*.6;cam.position.x+=(Math.random()-.5)*q;cam.position.y+=(Math.random()-.5)*q;cam.position.z+=(Math.random()-.5)*q}sky.position.copy(cam.position);sun.position.set(cm.x+SUN.x*150,Math.max(25,SUN.y*150),cm.z+SUN.z*150);sun.target.position.set(cm.x,0,cm.z);sun.target.updateMatrixWorld();R.render(S,cam);
let pos=1,tot=1;if(trk>=0){const rp=[...peers.values()].filter(o=>o.r&&o.k===trk);tot=1+nb+rp.length;bots.forEach(b=>{if(b.i<nb&&b.cum>me.cum)pos++});rp.forEach(o=>{if(o.p>me.cum)pos++})}
drawMM();const lap=Math.min(laps,Math.max(0,Math.floor(me.cum/N))+1),pk=padNear();
$("tl").innerHTML=trk>=0?`${lvl?"Level "+lvl+" · ":""}${TR[trk].n}<br>Runde ${lap}/${laps} · Platz ${pos}/${tot}<br>${raceT.toFixed(1)} s${lvl?"<br>Gegner-Stärke "+lvl+"/20":""}`:`Stadt – freie Fahrt auf allen Straßen<br>Rennfelder &amp; Autohaus am Stadtplatz`;
$("tr").innerHTML=`€${save.money}<br>${CARS[save.sel].n}<br>Kamera: ${CN[camMode]}<br>👥 ${online} online<br>${Math.round(fpsA)} FPS`;
$("sp").textContent=Math.round(sp*3.6);$("dl").textContent=me.nn?"NITRO!":me.bo>0?"BOOST!":me.dr?"DRIFT":"\u00a0";$("bar").firstChild.style.width=Math.min(100,me.ch/2*100)+"%";
$("nb").firstChild.style.width=Math.min(100,me.nt/eff().nt*100)+"%";{const dp=dur(),hb=$("hb").firstChild;hb.style.width=dp+"%";hb.style.background=dp<30?"#ef4444":dp<60?"#f59e0b":"#22c55e"}$("fl").style.opacity=Math.max(0,me.ct/.9)*me.cs*.6;if(tt>0){tt-=dt;if(tt<=0)$("toast").textContent=""}if(mapOpen)drawBig();jobHud();
$("pr").textContent=foot&&Math.hypot(pl.x-me.x,pl.z-me.z)<4.5?"X: ins Auto einsteigen":(st==="idle"&&!shop&&!wsOpen&&!mapOpen)?(pk>=0?`Enter: Rennen „${TR[pk].n}“ starten (${laps} Runden)`:pk===-2?"Enter: Autohaus öffnen":pk===-3?"Enter: Karriere (20 Level) öffnen":pk===-4?"Enter: Werkstatt öffnen (Tuning & Reparatur)":pk===-5?"Enter: Polizeirevier betreten (Job annehmen)":pk===-6?"Enter: Feuerwache betreten (Job annehmen)":pk===-7?"Enter: Rennzentrale (alle Strecken, 1/3/5 Runden)":""):""}
applyQuality(quality,false);requestAnimationFrame(loop);
