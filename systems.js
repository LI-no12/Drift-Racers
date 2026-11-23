/* Drift Racers 3D – systems.js (Reihenfolge der Dateien siehe index.html) */
let cm=me,tod=.12,tdk=-1,envT=0;const SUN=new THREE.Vector3(.49,.81,.32).normalize(),HL=new THREE.SpotLight(0xfff2d0,0,110,.55,.6,1);S.add(HL,HL.target);
function envScale(dk){S.traverse(o=>{const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[];ms.forEach(m=>{if(m.isShaderMaterial||m.envMapIntensity===undefined)return;if(m.userData.e0===undefined)m.userData.e0=m.envMapIntensity;m.envMapIntensity=m.userData.e0*(.12+.88*dk)})})}
function dayUpd(dt){tod=(tod+dt/420)%1;const a=tod*TAU,sy=Math.sin(a),sx=Math.cos(a)*.75,dk=Math.max(0,Math.min(1,(sy+.12)*3)),up=sy>0;
SUN.set(up?sx:-sx,up?sy:-sy,.35).normalize();SKY.uniforms.sd.value.set(sx,sy,.35).normalize();SKY.uniforms.dk.value=dk;
sun.color.setHex(up?0xfff0d8:0x93a8ff);sun.intensity=up?1.7*Math.min(1,sy*3):.22;HEMI.intensity=.1+.35*dk;
S.fog.color.setRGB(.79*dk+.02*(1-dk),.86*dk+.03*(1-dk),.94*dk+.07*(1-dk));S.background.copy(S.fog.color);if(LAMPM)LAMPM.emissiveIntensity=.2+1.8*(1-dk);
HL.intensity=(1-dk)*4;HL.position.set(me.x+Math.sin(me.h)*1.4,1,me.z+Math.cos(me.h)*1.4);HL.target.position.set(me.x+Math.sin(me.h)*30,0,me.z+Math.cos(me.h)*30);HL.target.updateMatrixWorld();
envT-=dt;if(envT<=0||Math.abs(dk-tdk)>.04){tdk=dk;envT=3;envScale(dk)}}
const SKN=500,skm=new THREE.InstancedMesh(new THREE.PlaneGeometry(.32,1.1).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x050505,transparent:true,opacity:.45,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),SKN),sko=new THREE.Object3D();skm.frustumCulled=false;skm.count=0;S.add(skm);let ski=0,skc=0;
function skid(){const ang=Math.atan2(me.vx,me.vz),f=[Math.sin(me.h),Math.cos(me.h)],r=[-Math.cos(me.h),Math.sin(me.h)];for(const sd of[-1,1]){sko.position.set(me.x-f[0]*1.4+r[0]*sd*.92,.075,me.z-f[1]*1.4+r[1]*sd*.92);sko.rotation.set(0,ang,0);sko.updateMatrix();skm.setMatrixAt(ski++%SKN,sko.matrix)}skc=Math.min(SKN,skc+2);skm.count=skc;skm.instanceMatrix.needsUpdate=true}
const pl={x:0,z:0,h:0,w:0},pmesh=new THREE.Group();
{const skn=M(0xf1c9a5),sh=new THREE.MeshStandardMaterial({color:0x2c5ea8,roughness:.8}),pn=M(0x2b2f3a),t=new THREE.Mesh(new THREE.BoxGeometry(.5,.7,.28),sh),hd=new THREE.Mesh(new THREE.SphereGeometry(.16,12,10),skn);t.position.y=1.15;hd.position.y=1.7;
const limb=(x,y,w,l,mat)=>{const g=new THREE.Group(),m=new THREE.Mesh(new THREE.BoxGeometry(w,l,.2),mat);m.position.y=-l/2;g.add(m);g.position.set(x,y,0);return g};
pmesh.userData={ll:limb(-.14,.78,.17,.72,pn),rl:limb(.14,.78,.17,.72,pn),la:limb(-.35,1.45,.13,.6,sh),ra:limb(.35,1.45,.13,.6,sh)};
pmesh.add(t,hd,pmesh.userData.ll,pmesh.userData.rl,pmesh.userData.la,pmesh.userData.ra);pmesh.traverse(o=>{if(o.isMesh)o.castShadow=true});pmesh.visible=false;S.add(pmesh)}
function toggleFoot(){if(shop||lvOpen||wsOpen||mapOpen||polOpen||jovOpen||rcOpen||st==="count"||st==="race")return;
if(!foot){if(Math.hypot(me.vx,me.vz)>4){toast("Erst anhalten, dann aussteigen (X)");return}pl.x=me.x-Math.cos(me.h)*2.4;pl.z=me.z+Math.sin(me.h)*2.4;pl.h=me.h;foot=true;pmesh.visible=true;me.vx=me.vz=0;camNew=true;toast("Zu Fuß unterwegs · Shift: rennen · X am Auto: einsteigen")}
else{if(Math.hypot(pl.x-me.x,pl.z-me.z)>4.5){toast("Zu weit vom Auto entfernt");return}foot=false;pmesh.visible=false;camNew=true}}
function footUpd(dt){if(!foot)return;const ok=!shop&&!lvOpen&&!wsOpen&&!mapOpen&&!polOpen&&!jovOpen&&!rcOpen,fw=ok&&(K.KeyW||K.ArrowUp),bk=ok&&(K.KeyS||K.ArrowDown),lf=ok&&(K.KeyA||K.ArrowLeft),rg=ok&&(K.KeyD||K.ArrowRight),run=ok&&(K.ShiftLeft||K.ShiftRight);
pl.h+=((lf?1:0)-(rg?1:0))*2.4*dt-md.x*.004;md.x=0;const sp=((fw?1:0)-(bk?.6:0))*(run?7.5:3.6);let nx=pl.x+Math.sin(pl.h)*sp*dt,nz=pl.z+Math.cos(pl.h)*sp*dt;
for(const b of blds){if(Math.abs(b.x-nx)>b.hx+2||Math.abs(b.z-nz)>b.hz+2)continue;const cx=Math.max(b.x-b.hx,Math.min(b.x+b.hx,nx)),cz=Math.max(b.z-b.hz,Math.min(b.z+b.hz,nz)),dx=nx-cx,dz=nz-cz,dd=Math.hypot(dx,dz);if(dd<.45){if(dd>.001){nx+=dx/dd*(.45-dd);nz+=dz/dd*(.45-dd)}else nx+=.45}}
if(inDist(nx,nz)||!inDist(pl.x,pl.z)){pl.x=nx;pl.z=nz}pl.w+=Math.abs(sp)*dt*2.2;const sw=Math.sin(pl.w)*Math.min(1,Math.abs(sp)/3)*.7,u=pmesh.userData;
pmesh.position.set(pl.x,0,pl.z);pmesh.rotation.y=pl.h;pmesh.visible=camMode!==1;u.ll.rotation.x=sw;u.rl.rotation.x=-sw;u.la.rotation.x=-sw;u.ra.rotation.x=sw}
function toggleRc(){if(st==="count"||st==="race")return;rcOpen=!rcOpen;$("rc").style.display=rcOpen?"block":"none";if(rcOpen)drawRc()}
function drawRc(){const L=$("rcl");L.innerHTML="";TR.forEach((T,i)=>{const d=document.createElement("div");d.className="card";d.innerHTML=`<b>${T.n}</b><div>Länge ca. ${Math.round(T.sp*N)} m · Prämie ×${T.m}</div><br>`;
[[1,"Sprint (1 Runde)"],[3,"3 Runden"],[5,"Langstrecke (5 Runden)"]].forEach(([lp,tx])=>{const b=document.createElement("button");b.textContent=tx;b.style.margin="2px 4px 2px 0";b.onclick=()=>{toggleRc();startRace(i,0,lp)};d.appendChild(b)});L.appendChild(d)})}
$("rcc").onclick=()=>toggleRc();
