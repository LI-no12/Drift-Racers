/* Drift Racers 3D – render.js (Reihenfolge der Dateien siehe index.html) */
const look=new THREE.Vector3(),tl=new THREE.Vector3();
function updCam(dt){camIdle+=dt;if(!md.down&&camIdle>2){const rt=Math.min(1,3*dt);camYaw-=camYaw*rt;camPitch-=camPitch*rt}const hy=cm.h+(foot?0:camYaw),fx=Math.sin(hy),fz=Math.cos(hy);let p,l,fv;
if(camMode===0){p=[cm.x-fx*9,4.2,cm.z-fz*9];l=[cm.x+fx*8,1.2,cm.z+fz*8];fv=70}
else if(camMode===1){p=[cm.x+fx*.4,1.4,cm.z+fz*.4];l=[cm.x+fx*25,1.1,cm.z+fz*25];fv=80}
else if(camMode===2){p=[cm.x-fx*10,62,cm.z-fz*10];l=[cm.x,0,cm.z];fv=60}
else if(camMode===3){p=[cm.x-Math.cos(hy)*14-fx*3,3.5,cm.z+Math.sin(hy)*14-fz*3];l=[cm.x+fx*3,1,cm.z+fz*3];fv=65}
else{p=[cm.x-fx*5.5,1.7,cm.z-fz*5.5];l=[cm.x+fx*12,1.2,cm.z+fz*12];fv=78}
if(foot){if(camMode===1){p=[cm.x+fx*.25,1.7,cm.z+fz*.25];l=[cm.x+fx*10,1.55,cm.z+fz*10];fv=70}else{p=[cm.x-fx*4.2,2.5,cm.z-fz*4.2];l=[cm.x+fx*3,1.4,cm.z+fz*3];fv=62}}if(camMode!==1){p=[l[0]+(p[0]-l[0])*camZoom,l[1]+(p[1]-l[1])*camZoom+camPitch,l[2]+(p[2]-l[2])*camZoom]}const k=camMode===1||camNew?1:1-Math.exp(-7*dt);camNew=false;cam.position.x+=(p[0]-cam.position.x)*k;cam.position.y+=(p[1]-cam.position.y)*k;cam.position.z+=(p[2]-cam.position.z)*k;
tl.set(l[0],l[1],l[2]);look.lerp(tl,k);cam.up.set(0,1,0);cam.lookAt(look);fv+=cm.nn?10:0;if(Math.abs(cam.fov-fv)>.1){cam.fov+=(fv-cam.fov)*.2;cam.updateProjectionMatrix()}}

const smT=(()=>{const cv=document.createElement("canvas");cv.width=cv.height=64;const x=cv.getContext("2d"),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,"rgba(255,255,255,.7)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(cv)})();
const sm=[];for(let i=0;i<120;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:smT,transparent:true,depthWrite:false,opacity:0}));s.userData={t:0};s.visible=false;S.add(s);sm.push(s)}let si=0;
function smoke(dt){if(me.dr&&Math.hypot(me.vx,me.vz)>10&&!foot)skid();if(dur()<35&&Math.random()<.4){const s=sm[si++%120];s.material.color.setHex(0x2a2a2a);s.position.set(me.x+Math.sin(me.h)*1.7,1,me.z+Math.cos(me.h)*1.7);s.userData.t=1;s.visible=true}if(me.dr&&Math.hypot(me.vx,me.vz)>10){for(const sd of [-1,1]){const s=sm[si++%120];s.material.color.setHex(0xffffff);s.position.set(me.x-Math.sin(me.h)*1.8-Math.cos(me.h)*sd,.4,me.z-Math.cos(me.h)*1.8+Math.sin(me.h)*sd);s.userData.t=1;s.visible=true}}
sm.forEach(s=>{const u=s.userData;if(u.t>0){u.t-=dt*1.2;s.material.opacity=Math.max(0,u.t)*.5;const k=1.5+(1-u.t)*5;s.scale.set(k,k,1);s.position.y+=dt*1.2}else s.visible=false})}
const sk=[];for(let i=0;i<80;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:smT,color:0xffa030,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}));s.userData={t:0,vx:0,vy:0,vz:0,g:18};s.visible=false;S.add(s);sk.push(s)}let ki=0;
function burst(x,z,n){for(let i=0;i<n;i++){const s=sk[ki++%80],u=s.userData;s.position.set(x,.8,z);u.t=1;u.vx=(Math.random()-.5)*14;u.vz=(Math.random()-.5)*14;u.vy=2+Math.random()*7;u.g=18;s.scale.set(.6,.6,1);s.material.color.setHex(Math.random()<.5?0xffa030:0xffe08a);s.visible=true}}
function flame(){for(const sd of [-.5,.5]){const s=sk[ki++%80],u=s.userData;s.position.set(me.x-Math.sin(me.h)*2.6-Math.cos(me.h)*sd,.55,me.z-Math.cos(me.h)*2.6+Math.sin(me.h)*sd);u.t=.7;u.vx=me.vx*.5;u.vz=me.vz*.5;u.vy=0;u.g=0;s.scale.set(1.2,1.2,1);s.material.color.setHex(0x55b8ff);s.visible=true}}
function sparks(dt){sk.forEach(s=>{const u=s.userData;if(u.t>0){u.t-=dt*1.6;s.position.x+=u.vx*dt;s.position.z+=u.vz*dt;u.vy-=u.g*dt;s.position.y=Math.max(.1,s.position.y+u.vy*dt);s.material.opacity=Math.max(0,u.t)}else s.visible=false})}
