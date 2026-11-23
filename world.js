/* Drift Racers 3D – world.js (Reihenfolge der Dateien siehe index.html) */
let GR=null,TFG=[];
function buildOsm(O){const G=new THREE.Group(),wid={motorway:14,trunk:13,primary:11,secondary:10,tertiary:9,residential:8,unclassified:8,living_street:6,service:5,motorway_link:8,trunk_link:8,primary_link:8,secondary_link:7,tertiary_link:7},cls=t=>/^(service|living_street)$/.test(t)?0:/^(residential|unclassified|tertiary|tertiary_link)$/.test(t)?1:2;
const RM=[0,1,2].map(i=>{const m=M([0x45484e,0x3d4046,0x35383e][i]);m.polygonOffset=true;m.polygonOffsetFactor=-(i+2);m.polygonOffsetUnits=-(i+2);return m}),RA=[0,1,2].map(()=>({p:[],i:[],o:0})),RV={p:[],i:[],o:0};
function ribbon(pts,w,y,A){const n=pts.length;if(n<2)return;const nm=[];for(let i=0;i<n-1;i++){const dx=pts[i+1][0]-pts[i][0],dz=pts[i+1][1]-pts[i][1],l=Math.hypot(dx,dz)||1;nm.push([-dz/l,dx/l])}
for(let i=0;i<n;i++){const a=nm[Math.max(0,i-1)],b=nm[Math.min(n-2,i)];let nx=a[0]+b[0],nz=a[1]+b[1];const l=Math.hypot(nx,nz)||1;nx/=l;nz/=l;const k=w/2/Math.max(.5,nx*b[0]+nz*b[1]);A.p.push(pts[i][0]-nx*k,y,pts[i][1]-nz*k,pts[i][0]+nx*k,y,pts[i][1]+nz*k);if(i<n-1){const j=A.o+i*2;A.i.push(j,j+2,j+1,j+1,j+2,j+3)}}A.o+=n*2}
const flat=(A,m)=>{if(!A.p.length)return;const g=new THREE.BufferGeometry(),nn=new Float32Array(A.p.length);for(let k=1;k<nn.length;k+=3)nn[k]=1;g.setAttribute("position",new THREE.Float32BufferAttribute(A.p,3));g.setAttribute("normal",new THREE.BufferAttribute(nn,3));g.setIndex(A.i);const q=new THREE.Mesh(g,m);q.receiveShadow=true;G.add(q)};
O.roads.forEach(r=>ribbon(r.pts,wid[r.t]||7,.04,RA[cls(r.t)]));RA.forEach((A,i)=>flat(A,RM[i]));
const SW={p:[],i:[],o:0},offs=(pts,d)=>{const n=pts.length,nm=[];for(let i=0;i<n-1;i++){const dx=pts[i+1][0]-pts[i][0],dz=pts[i+1][1]-pts[i][1],l=Math.hypot(dx,dz)||1;nm.push([-dz/l,dx/l])}return pts.map((p,i)=>{const a=nm[Math.max(0,i-1)],b=nm[Math.min(n-2,i)];let nx=a[0]+b[0],nz=a[1]+b[1];const l=Math.hypot(nx,nz)||1;nx/=l;nz/=l;const k=d/Math.max(.5,nx*b[0]+nz*b[1]);return[p[0]+nx*k,p[1]+nz*k]})};
O.roads.forEach(r=>{if(cls(r.t)===0||r.pts.length<2)return;const w=(wid[r.t]||7)/2+2.2;ribbon(offs(r.pts,w),3.6,.035,SW);ribbon(offs(r.pts,-w),3.6,.035,SW)});
const SWM=M(0xb4b8bf);SWM.polygonOffset=true;SWM.polygonOffsetFactor=-1;SWM.polygonOffsetUnits=-1;flat(SW,SWM);
const WM=new THREE.MeshStandardMaterial({color:0x2f6fae,roughness:.08,metalness:.4,envMapIntensity:1.4,side:THREE.DoubleSide});
O.water.forEach(p=>{try{const g=new THREE.ShapeGeometry(new THREE.Shape(p.map(q=>new THREE.Vector2(q[0],-q[1]))));g.rotateX(-Math.PI/2);g.translate(0,.03,0);G.add(new THREE.Mesh(g,WM))}catch(e){}});
O.rivers.forEach(p=>ribbon(p,9,.035,RV));flat(RV,WM);
const BM=FB.map(t=>{const c=t.clone();c.needsUpdate=true;c.repeat.set(1/16,1/14);return new THREE.MeshStandardMaterial({map:c,roughness:.7,envMapIntensity:.4,side:THREE.DoubleSide})}),RF=M(0x8a5a4a),SD=BM.map(()=>({p:[],n:[],u:[]})),CP={p:[],n:[]};
O.blds.forEach(b=>{let pts=b.pts;if(pts.length>2&&pts[0][0]===pts[pts.length-1][0]&&pts[0][1]===pts[pts.length-1][1])pts=pts.slice(0,-1);if(pts.length<3||pts.length>90)return;
let a0=1e9,a1=-1e9,b0=1e9,b1=-1e9;pts.forEach(p=>{a0=Math.min(a0,p[0]);a1=Math.max(a1,p[0]);b0=Math.min(b0,p[1]);b1=Math.max(b1,p[1])});
const cx=(a0+a1)/2,cz=(b0+b1)/2,hx=(a1-a0)/2,hz=(b1-b0)/2;if(hx*hz<2||Math.hypot(cx,cz)<130||pts.some(p=>Math.hypot(p[0],p[1])<110))return;
const h=Math.max(5,(b.h||(7+Math.abs(Math.sin(cx*12.9+cz*78.2))*5))*.62);
try{const g=new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(p=>new THREE.Vector2(p[0],-p[1]))),{depth:h,bevelEnabled:false});g.rotateX(-Math.PI/2);
const pa=g.attributes.position.array,na=g.attributes.normal.array,ua=g.attributes.uv.array,vi=Math.floor(Math.abs(Math.sin(cx*7.1+cz*3.3))*6)%6;
g.groups.forEach(gr=>{const T=gr.materialIndex===0?CP:SD[vi];for(let i=gr.start;i<gr.start+gr.count;i++){T.p.push(pa[i*3],pa[i*3+1],pa[i*3+2]);T.n.push(na[i*3],na[i*3+1],na[i*3+2]);if(T.u)T.u.push(ua[i*2],ua[i*2+1])}});
blds.push({x:cx,z:cz,hx,hz,bl:1})}catch(e){}});
const mk=(A,m)=>{if(!A.p.length)return;const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(A.p,3));g.setAttribute("normal",new THREE.Float32BufferAttribute(A.n,3));if(A.u)g.setAttribute("uv",new THREE.Float32BufferAttribute(A.u,2));const q=new THREE.Mesh(g,m);q.castShadow=true;q.receiveShadow=true;G.add(q)};
SD.forEach((A,i)=>mk(A,BM[i]));mk(CP,RF);
const idx=new Map(),N=[],adj=[],W=[],gn=(id,p,w)=>{let k=idx.get(id);if(k===undefined){k=N.length;idx.set(id,k);N.push(p);adj.push([]);W.push(w)}else W[k]=Math.max(W[k],w);return k};
O.roads.forEach(r=>{if(!r.ids||r.ids.length!==r.pts.length)return;const w=wid[r.t]||7,ks=r.pts.map((p,i)=>gn(r.ids[i],p,w));for(let i=0;i<ks.length-1;i++){const a=ks[i],b=ks[i+1];if(a!==b&&!adj[a].includes(b)){adj[a].push(b);adj[b].push(a)}}});
const cvv=document.createElement("canvas");cvv.width=cvv.height=1200;const c2=cvv.getContext("2d"),k=1200/1800,U=x=>(900-x)*k,V=z=>(900-z)*k,poly=p=>{p.forEach((q,i)=>i?c2.lineTo(U(q[0]),V(q[1])):c2.moveTo(U(q[0]),V(q[1])))};
c2.fillStyle="#2f6fae";O.water.forEach(p=>{c2.beginPath();poly(p);c2.fill()});c2.fillStyle="#7d848d";O.blds.forEach(b=>{c2.beginPath();poly(b.pts);c2.fill()});
c2.lineCap="round";c2.lineJoin="round";[[0,"#b9bec6",1.2],[1,"#e5e8ec",1.5],[2,"#f4c35a",1.8]].forEach(([ci,col,m])=>{c2.strokeStyle=col;O.roads.forEach(r=>{if(cls(r.t)!==ci)return;c2.lineWidth=(wid[r.t]||7)*k*m;c2.beginPath();poly(r.pts);c2.stroke()})});
O.rivers.forEach(p=>{c2.strokeStyle="#2f6fae";c2.lineWidth=9*k;c2.beginPath();poly(p);c2.stroke()});
O.mapCv=cvv;S.add(G);GR={N,adj,W}}
function randNode(minD){let n=0,i=0;do{n=Math.floor(Math.random()*GR.N.length);i++}while(i<60&&(!GR.adj[n].length||Math.hypot(GR.N[n][0]-me.x,GR.N[n][1]-me.z)<minD));return n}
function mkAgent(v,minD){const n=randNode(minD||0),j=GR.adj[n][Math.floor(Math.random()*GR.adj[n].length)];return{n0:n,n1:j,t:0,v}}
function gChoose(a,mode){const opts=GR.adj[a.n1].filter(j=>j!==a.n0);if(!opts.length)return a.n0;if(mode==="cop"){let bd=1e18,best=opts[0];for(const j of opts){const q=GR.N[j],d=(q[0]-me.x)**2+(q[1]-me.z)**2+(Math.random()<.05?3e5:0);if(d<bd){bd=d;best=j}}return best}return opts[Math.floor(Math.random()*opts.length)]}
function gStep(a,dt,mode){let rem=a.v*dt,g=0;while(rem>0&&g++<30){const A=GR.N[a.n0],B=GR.N[a.n1],L=Math.hypot(B[0]-A[0],B[1]-A[1])||.01;if(a.t+rem<L){a.t+=rem;rem=0}else{rem-=L-a.t;const nx=gChoose(a,mode);a.n0=a.n1;a.n1=nx;a.t=0}}}
function gPos(a,off){const A=GR.N[a.n0],B=GR.N[a.n1],L=Math.hypot(B[0]-A[0],B[1]-A[1])||.01,dx=(B[0]-A[0])/L,dz=(B[1]-A[1])/L,t=Math.min(1,a.t/L);return{x:A[0]+(B[0]-A[0])*t-dz*off,z:A[1]+(B[1]-A[1])*t+dx*off,h:Math.atan2(dx,dz)}}
function initNpcG(){NP.forEach(n=>{n.a=mkAgent(n.v,0);n.off=(Math.random()<.5?1:-1)*(GR.W[n.a.n0]/2+2.2)})}
function trafficG(dt){if(!TFG.length)for(let i=0;i<40;i++){const m=makeCar(new THREE.Color().setHSL(Math.random(),.5,.45),Math.floor(Math.random()*7));S.add(m);TFG.push({m,a:mkAgent(8+Math.random()*7,0),hold:0})}
TFG.forEach((c,i)=>{if(i>=TL){c.m.visible=false;return}c.m.visible=true;if(c.hold>0)c.hold-=dt;else gStep(c.a,dt,"rnd");const p=gPos(c.a,2.4);c.m.position.set(p.x,0,p.z);c.m.rotation.y=p.h;const dx=me.x-p.x,dz=me.z-p.z,dd=Math.hypot(dx,dz);
if(!foot&&dd<3.6&&dd>.001){const imp=Math.hypot(me.vx,me.vz);me.x+=dx/dd*(3.6-dd);me.z+=dz/dd*(3.6-dd);crash(imp*.8,dx/dd,dz/dd);me.vx*=.7;me.vz*=.7;c.hold=1.5}})}
function spawnSusG(){const rk=Math.floor(save.cop.a/3),m=makeCar(0x151515,1+Math.floor(Math.random()*6)),g=label("GESUCHT","#ef4444",9,2.2);g.position.y=3.4;m.add(g);S.add(m);sus={m,a:mkAgent(Math.min(34,18+rk*1.5),250),hold:0,t:100,dist:999};toast("🚨 Verdächtiger flüchtet! Hol ihn ein!")}
function susUpdG(dt){const s=sus;if(s.hold>0)s.hold-=dt;else gStep(s.a,dt,"sus");const p=gPos(s.a,0);s.m.position.set(p.x,0,p.z);s.m.rotation.y=p.h;s.t-=dt;const dx=me.x-p.x,dz=me.z-p.z,dd=Math.hypot(dx,dz);s.dist=dd;
if(!foot&&dd<3.6&&dd>.001){const imp=Math.hypot(me.vx,me.vz);me.x+=dx/dd*(3.6-dd);me.z+=dz/dd*(3.6-dd);crash(imp*.8,dx/dd,dz/dd);me.vx*=.7;me.vz*=.7;s.hold=.8}
if(s.t<=0){toast("Der Verdächtige ist entkommen!");S.remove(s.m);sus=null;job.w=4}}
function spawnCopG(){const m=makeCar(0xf2f2f2,1),lb=[0xff2020,0x2060ff].map((col,i)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.14,.28),new THREE.MeshBasicMaterial({color:col}));b.position.set(i?.35:-.35,1.55,0);m.add(b);return b});m.userData.lb=lb;S.add(m);cops.push({m,a:mkAgent(26,110),hold:0,dist:999})}
function copUpdG(c,dt){if(c.hold>0)c.hold-=dt;else{c.a.v=(26+5*WL.lvl)*(1+Math.min(.6,Math.max(0,(c.dist-100)/400)));gStep(c.a,dt,"cop")}const p=gPos(c.a,2.4);c.m.position.set(p.x,0,p.z);c.m.rotation.y=p.h;const ph=Math.floor(tm*6)%2;c.m.userData.lb[0].visible=ph===0;c.m.userData.lb[1].visible=ph===1;
const ax=foot?pl.x:me.x,az=foot?pl.z:me.z,dx=ax-p.x,dz=az-p.z,dd=Math.hypot(dx,dz);c.dist=dd;if(!foot&&dd<3.6&&dd>.001){const imp=Math.hypot(me.vx,me.vz);me.x+=dx/dd*(3.6-dd);me.z+=dz/dd*(3.6-dd);crash(Math.max(imp,18)*1.1,dx/dd,dz/dd);me.vx*=.6;me.vz*=.6;c.hold=.3}}
// Stadt
const blds=[];
if(OSMC){try{buildOsm(OSMC)}catch(e){console.warn(e);OSMC=null;GR=null}}
if(!OSMC){const HC=840,cp=new THREE.Mesh(new THREE.PlaneGeometry(HC*2+20,HC*2+20).rotateX(-Math.PI/2),M(0x8a9099));cp.position.y=.01;S.add(cp);
const road=(x1,z1,x2,z2,w,mt)=>{const l=Math.hypot(x2-x1,z2-z1),g=new THREE.PlaneGeometry(w,l).rotateX(-Math.PI/2),uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setY(i,uv.getY(i)*l/12);const m=new THREE.Mesh(g,mt||rm);m.position.set((x1+x2)/2,.04,(z1+z2)/2);m.rotation.y=Math.atan2(x2-x1,z2-z1);S.add(m)};
for(let k=-HC;k<=HC;k+=120){road(k,-HC-10,k,HC+10,16,rm);road(-HC-10,k,HC+10,k,16,rm2)}
road(120,-840,150,-1060,16);road(840,-120,950,-100,16);road(-120,840,-200,1000,16);road(-840,-240,-1450,-200,16);road(-840,480,-1550,500,16);road(-840,-840,-1500,-900,16);
const bg=FB.map(()=>({p:[],n:[],u:[],i:[],o:0})),tgm=new THREE.CylinderGeometry(.4,.5,3,6),cgm=new THREE.ConeGeometry(2.6,7,8),tmm=M(0x6b4423),lmm=M(0x1f6b34);
const addB=(x,z,w,h,d,gi)=>{const g=new THREE.BoxGeometry(w,h,d),u=g.attributes.uv,rv=Math.max(1,Math.round(h/16));for(let i=0;i<u.count;i++)u.setXY(i,u.getX(i)*2,u.getY(i)*rv);g.translate(x,h/2,z);
const G=bg[gi],pa=g.attributes.position.array;G.p.push(...pa);G.n.push(...g.attributes.normal.array);G.u.push(...u.array);for(const k of g.index.array)G.i.push(k+G.o);G.o+=pa.length/3};
for(let cx=-HC+60;cx<HC;cx+=120)for(let cz=-HC+60;cz<HC;cz+=120){
if(Math.hypot(cx,cz)>110&&Math.random()<.08){for(let j=0;j<7;j++){const x=cx+(Math.random()-.5)*90,z=cz+(Math.random()-.5)*90,a=new THREE.Mesh(tgm,tmm),b=new THREE.Mesh(cgm,lmm);a.position.set(x,1.5,z);b.position.set(x,6,z);a.castShadow=b.castShadow=true;S.add(a,b)}continue}
for(const sx of [-26,26])for(const sz of [-26,26]){const x=cx+sx,z=cz+sz,d=Math.hypot(x,z);if(d<105||Math.hypot(x+40,z-105)<45||Math.hypot(x-40,z-105)<45||Math.hypot(x+40,z+102)<45||Math.hypot(x-40,z+102)<45)continue;
const h=10+Math.random()*(12+60*Math.exp(-d/350));addB(x,z,36,h,36,Math.floor(Math.random()*6));blds.push({x,z,hx:18,hz:18})}}
bg.forEach((G,gi)=>{const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(G.p,3));g.setAttribute("normal",new THREE.Float32BufferAttribute(G.n,3));g.setAttribute("uv",new THREE.Float32BufferAttribute(G.u,2));g.setIndex(G.i);
const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({map:FB[gi],roughness:.7,envMapIntensity:.4}));m.castShadow=true;S.add(m)});
blds.push({x:-40,z:105,hx:12.5,hz:7.5});blds.push({x:40,z:105,hx:12.5,hz:7.5})}
if(OSMC)blds.push({x:-40,z:105,hx:12.5,hz:7.5},{x:40,z:105,hx:12.5,hz:7.5});
if(!OSMC){const pm=new THREE.InstancedMesh(new THREE.CylinderGeometry(.12,.15,7,6),M(0x2b2f36),900),hm=new THREE.InstancedMesh(new THREE.BoxGeometry(.9,.2,.5),new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xfff2c0,emissiveIntensity:1.6}),900),o=new THREE.Object3D();let n=0;
for(let k=-840;k<=840;k+=120)for(let q=-780;q<=780;q+=120)for(const[x,z]of[[k+10,q],[q,k+10]]){if(n>=900)break;o.position.set(x,3.5,z);o.updateMatrix();pm.setMatrixAt(n,o.matrix);o.position.set(x,7,z);o.updateMatrix();hm.setMatrixAt(n,o.matrix);n++}
LAMPM=hm.material;pm.count=hm.count=n;pm.frustumCulled=hm.frustumCulled=false;S.add(pm,hm)}
const POLPAD=[-40,-78];
if(!OSMC){const sg=new THREE.InstancedMesh(new THREE.BoxGeometry(1,.16,1),M(0xb4b8bf),900),o=new THREE.Object3D();let n=0;
for(let k=-840;k<=840;k+=120)for(let q=-780;q<=780;q+=120)for(const s of[-1,1])for(const[x,z,w,l]of[[k+s*10,q,4,96],[q,k+s*10,96,4]]){if(Math.hypot(x,z)<110||n>=900)continue;o.position.set(x,.08,z);o.scale.set(w,1,l);o.updateMatrix();sg.setMatrixAt(n++,o.matrix)}
sg.count=n;sg.frustumCulled=false;S.add(sg)}
const NN=450,nbm=new THREE.InstancedMesh(new THREE.CylinderGeometry(.22,.26,.95,8),M(0xffffff),NN),nhm=new THREE.InstancedMesh(new THREE.SphereGeometry(.17,10,8),M(0xf1c9a5),NN),NP=[],od=new THREE.Object3D();
for(let i=0;i<NN;i++){NP.push({ax:Math.random()<.5?0:1,k:(Math.floor(Math.random()*15)-7)*120,s:Math.random()<.5?-1:1,p:(Math.random()-.5)*1600,d:Math.random()<.5?1:-1,v:1+Math.random()*.9,ph:Math.random()*6});nbm.setColorAt(i,new THREE.Color().setHSL(Math.random(),.5,.5))}
nbm.frustumCulled=nhm.frustumCulled=false;nbm.castShadow=nhm.castShadow=true;S.add(nbm,nhm);
function npcUpd(dt){const spd=Math.hypot(me.vx,me.vz);NP.forEach((n,i)=>{if(i>=nbm.count)return;let x,z,ry,ly=0,b=0;
if(n.hit>0){n.hit-=dt;n.hx+=n.vx*dt;n.hz+=n.vz*dt;n.vx*=.94;n.vz*=.94;x=n.hx;z=n.hz;ry=n.ry;ly=1;if(n.hit<=0)n.p=(Math.random()-.5)*1600}
else{if(OSMC){if(!n.a)initNpcG();gStep(n.a,dt,"rnd");const q=gPos(n.a,n.off);x=q.x;z=q.z;ry=q.h}else{n.p+=n.d*n.v*dt;if(Math.abs(n.p)>830)n.d=-n.d;x=n.ax?n.p:n.k+n.s*10;z=n.ax?n.k+n.s*10:n.p;ry=n.ax?(n.d>0?Math.PI/2:-Math.PI/2):(n.d>0?0:Math.PI)}b=Math.abs(Math.sin(tm*6+n.ph))*.06;
const dx=me.x-x,dz=me.z-z;if(spd>5&&dx*dx+dz*dz<2.9){n.hit=3;n.hx=x;n.hz=z;n.vx=me.vx*.5;n.vz=me.vz*.5;n.ry=ry;burst(x,z,8);addStar();ly=1}}
od.position.set(x,ly?.25:.64+b,z);od.rotation.set(ly?-1.45:0,ry,0,"YXZ");od.updateMatrix();nbm.setMatrixAt(i,od.matrix);
od.position.set(x+(ly?Math.sin(ry)*.7:0),ly?.3:1.28+b,z+(ly?Math.cos(ry)*.7:0));od.updateMatrix();nhm.setMatrixAt(i,od.matrix)});nbm.instanceMatrix.needsUpdate=true;nhm.instanceMatrix.needsUpdate=true}
{const w=new THREE.Mesh(new THREE.BoxGeometry(24,9,14),M(0x1e3a8a));w.position.set(-40,4.5,-102);const r=new THREE.Mesh(new THREE.BoxGeometry(25.5,1,15.5),M(0x0f172a));r.position.set(-40,9.5,-102);S.add(w,r);
const gm=new THREE.MeshStandardMaterial({color:0xbfe3ff,metalness:.3,roughness:.05,transparent:true,opacity:.6});for(const dx of[-6,6]){const d=new THREE.Mesh(new THREE.BoxGeometry(10,6,.3),gm);d.position.set(-40+dx,3,-94.9);S.add(d)}
for(const[dx,col]of[[-3,0xff2020],[3,0x2060ff]]){const l=new THREE.Mesh(new THREE.BoxGeometry(2,.6,1),new THREE.MeshBasicMaterial({color:col}));l.position.set(-40+dx,10.3,-102);S.add(l)}
const a=label("POLIZEI","#ffffff",22,5.5);a.position.set(-40,13.5,-102);S.add(a);pad(POLPAD[0],POLPAD[1],0x3b82f6);const q=label("Polizeirevier","#93c5fd",18,4.5);q.position.set(POLPAD[0],8,POLPAD[1]);S.add(q);blds.push({x:-40,z:-102,hx:12.5,hz:7.5})}
const DIST=[[2000,1500],[1800,1800],[1300,1750],[900,1650],[400,1850],[-100,1700],[-600,1750],[-1100,1900],[-1700,1850],[-2100,1600],[-2150,1100],[-1950,500],[-2000,-100],[-2100,-700],[-2150,-1300],[-1900,-1700],[-1300,-1750],[-800,-1900],[-300,-2150],[300,-2250],[700,-2100],[1100,-1750],[1500,-1750],[1950,-1600],[2150,-1100],[1950,-500],[1850,200],[2100,700]];
const RODACH=[[1650,1500],[1520,1400],[1400,1300],[1300,1100],[1250,900],[1150,760],[1000,680],[875,610]];
function inDist(x,z){let c=false;for(let i=0,j=DIST.length-1;i<DIST.length;j=i++){const a=DIST[i],b=DIST[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const FENCE=new THREE.Group(),fmat=new THREE.MeshStandardMaterial({color:0xff7a00,transparent:true,opacity:.4,emissive:0xff4400,emissiveIntensity:.4});S.add(FENCE);
function buildFence(){while(FENCE.children.length)FENCE.remove(FENCE.children[0]);DIST.forEach((a,i)=>{const b=DIST[(i+1)%DIST.length],dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz),m=new THREE.Mesh(new THREE.BoxGeometry(1.5,6,l),fmat);m.position.set((a[0]+b[0])/2,3,(a[1]+b[1])/2);m.rotation.y=Math.atan2(dx,dz);FENCE.add(m)})}buildFence();
{const wm=new THREE.MeshStandardMaterial({color:0x2f6fae,roughness:.08,metalness:.4,envMapIntensity:1.6});RODACH.slice(1).forEach((p,i)=>{const a=RODACH[i],dx=p[0]-a[0],dz=p[1]-a[1],l=Math.hypot(dx,dz)+4,m=new THREE.Mesh(new THREE.PlaneGeometry(8,l).rotateX(-Math.PI/2),wm);m.position.set((a[0]+p[0])/2,.03,(a[1]+p[1])/2);m.rotation.y=Math.atan2(dx,dz);S.add(m)})}
const FIREPAD=[40,-78],RCPAD=[-45,45];pad(RCPAD[0],RCPAD[1],0x22d3ee);{const l=label("Rennzentrale","#67e8f9",20,5);l.position.set(RCPAD[0],8,RCPAD[1]);S.add(l)}
const VIL=[["Ahorn",1000,800,840,840],["Bad Rodach",1650,1500,840,840],["Dörfles-Esbach",-950,880,-840,840],["Rödental",-1000,1150,-840,840],["Neustadt",-1650,1450,-840,840],["Lautertal",450,1500,600,840],["Meeder",1250,-420,840,-360],["Weitramsdorf",1000,-1000,840,-840],["Seßlach",1700,-1250,840,-720],["Untersiemau",500,-1300,480,-840],["Itzgrund",150,-2000,360,-840],["Großheirath",-350,-1550,-360,-840],["Niederfüllbach",-950,-1000,-840,-840],["Weidhausen",-1000,-1350,-720,-840],["Grub a. Forst",-1000,-350,-840,-360],["Ebersdorf",-1450,-330,-840,-480],["Sonnefeld",-1650,-1300,-840,-840]];
{const w=new THREE.Mesh(new THREE.BoxGeometry(24,9,14),M(0xb91c1c));w.position.set(40,4.5,-102);const r=new THREE.Mesh(new THREE.BoxGeometry(25.5,1,15.5),M(0x3f0d0d));r.position.set(40,9.5,-102);S.add(w,r);
const dm=new THREE.MeshStandardMaterial({color:0xf8f8f8,roughness:.5,metalness:.2});for(const dx of[-8,0,8]){const d=new THREE.Mesh(new THREE.BoxGeometry(6,5.5,.3),dm);d.position.set(40+dx,2.75,-94.9);S.add(d)}
const tw=new THREE.Mesh(new THREE.BoxGeometry(5,16,5),M(0xb91c1c));tw.position.set(54,8,-102);S.add(tw);
const a=label("FEUERWEHR","#fde047",22,5.5);a.position.set(40,13.5,-102);S.add(a);pad(FIREPAD[0],FIREPAD[1],0xef4444);const q=label("Feuerwache","#fca5a5",18,4.5);q.position.set(FIREPAD[0],8,FIREPAD[1]);S.add(q);blds.push({x:40,z:-102,hx:12.5,hz:7.5})}
{const sm2=new THREE.MeshStandardMaterial({color:0x8a8f98,metalness:.5,roughness:.4});[[new THREE.CylinderGeometry(2.4,2.8,1.2,16),.6],[new THREE.CylinderGeometry(.8,1,6,12),4.2],[new THREE.CylinderGeometry(.5,.7,2.2,10),8.3],[new THREE.SphereGeometry(.9,12,10),9.8]].forEach(([g,y])=>{const m=new THREE.Mesh(g,sm2);m.position.y=y;m.castShadow=true;S.add(m)});
blds.push({x:0,z:0,hx:2.6,hz:2.6});const cb=label("COBURG","#fde047",30,7.5);cb.position.set(0,26,0);S.add(cb)}
{const road2=(x1,z1,x2,z2,w)=>{const l=Math.hypot(x2-x1,z2-z1),g=new THREE.PlaneGeometry(w,l).rotateX(-Math.PI/2),uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setY(i,uv.getY(i)*l/12);const m=new THREE.Mesh(g,rm);m.position.set((x1+x2)/2,.04,(z1+z2)/2);m.rotation.y=Math.atan2(x2-x1,z2-z1);S.add(m)};
const hm=[0xf1e6d0,0xe8d5b5,0xd9c7a3,0xf4efe6,0xe3c9a8],roof=M(0x9c3b2e),rg=new THREE.ConeGeometry(10,4.5,4).rotateY(Math.PI/4),rg2=new THREE.ConeGeometry(3.6,6,4).rotateY(Math.PI/4);
[[840,240,1450,250],[-720,840,-1000,1400],[840,-480,1550,-750],[600,-840,800,-1750]].forEach(r=>road2(r[0],r[1],r[2],r[3],14));VIL.forEach(([n,x,z,rx,rz])=>{road2(rx,rz,x,z,12);for(let i=0;i<11;i++){const a=Math.random()*TAU,rr=14+Math.random()*52,hx=x+Math.cos(a)*rr,hz=z+Math.sin(a)*rr,w=9+Math.random()*5,d=9+Math.random()*5,h=6+Math.random()*3,
b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(hm[i%5])),rf=new THREE.Mesh(rg,roof);b.position.set(hx,h/2,hz);rf.position.set(hx,h+2.2,hz);rf.scale.set((w+1)/14.14,1,(d+1)/14.14);b.castShadow=rf.castShadow=true;S.add(b,rf);blds.push({x:hx,z:hz,hx:w/2,hz:d/2})}
const ch=new THREE.Mesh(new THREE.BoxGeometry(5,14,5),M(0xe9e2d0)),cr=new THREE.Mesh(rg2,roof);ch.position.set(x,7,z);cr.position.set(x,17,z);S.add(ch,cr);blds.push({x,z,hx:2.6,hz:2.6});
const l=label(n,"#ffffff",22,5.5);l.position.set(x,24,z);S.add(l)})}
{const wm=M(0xd8c9a8),rf=M(0x8a3b2e),hl=new THREE.Mesh(new THREE.SphereGeometry(95,24,12,0,TAU,0,Math.PI/2).scale(1,.42,1),M(0x4f8a4a));hl.position.set(400,0,950);S.add(hl);
const add=(g,m,x,y,z)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;S.add(o);return o};
add(new THREE.BoxGeometry(50,10,30),wm,400,45,950);add(new THREE.BoxGeometry(52,3,32),rf,400,51.5,950);
[[-26,-16],[26,-16],[-26,16],[26,16]].forEach(([dx,dz])=>{add(new THREE.CylinderGeometry(4,4.5,18,10),wm,400+dx,49,950+dz);add(new THREE.ConeGeometry(5,7,10),rf,400+dx,61.5,950+dz)});
add(new THREE.BoxGeometry(14,22,14),wm,400,51,950);add(new THREE.ConeGeometry(11,8,4).rotateY(Math.PI/4),rf,400,66,950);
const l=label("Veste Coburg","#ffffff",24,6);l.position.set(400,85,950);S.add(l);blds.push({x:400,z:950,hx:80,hz:80})}
{const pos=[],idx=[];for(let i=0;i<=40;i++){const z=-2000+i*100,x=862+18*Math.sin(z/250);pos.push(x-7,.03,z,x+7,.03,z);if(i<40){const k=i*2;idx.push(k,k+1,k+2,k+1,k+3,k+2)}}
const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();S.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x2f6fae,roughness:.08,metalness:.4,envMapIntensity:1.6,side:THREE.DoubleSide})))}
[[-600,1950,260],[1000,1950,300],[-1200,2000,280],[2000,-250,280],[-2050,200,260],[1500,-2000,300]].forEach(([x,z,r])=>{const h=new THREE.Mesh(new THREE.SphereGeometry(r,24,10,0,TAU,0,Math.PI/2).scale(1,.22,1),M(0x4f8a4a));h.position.set(x,0,z);S.add(h)});
// Treffpunkt
const plz=new THREE.Mesh(new THREE.CircleGeometry(90,48).rotateX(-Math.PI/2),M(0x6b7280));plz.position.y=OSMC?.06:.03;S.add(plz);
{const t=label("MARKTPLATZ","#38bdf8",36,9);t.position.set(0,16,0);S.add(t);
function bld(x,col,name,tc,sc,dr){const w=new THREE.Mesh(new THREE.BoxGeometry(24,9,14),M(col));w.position.set(x,4.5,105);const r=new THREE.Mesh(new THREE.BoxGeometry(25.5,1,15.5),M(sc));r.position.set(x,9.5,105);S.add(w,r);
const gm=new THREE.MeshStandardMaterial({color:dr.c,metalness:dr.m,roughness:dr.r,transparent:!!dr.t,opacity:dr.o||1,envMapIntensity:1.2});
for(const dx of [-6,6]){const d=new THREE.Mesh(new THREE.BoxGeometry(dr.w,dr.h,.3),gm);d.position.set(x+dx,dr.h/2,97.9);S.add(d)}
const a=label(name,tc,22,5.5);a.position.set(x,13,105);S.add(a)}
bld(-40,0xe5e7eb,"AUTOHAUS","#fde047",0x7f1d1d,{c:0x6fb7ff,m:.3,r:.05,t:1,o:.55,w:10,h:6});
bld(40,0x4b5563,"WERKSTATT","#fdba74",0xea580c,{c:0xf97316,m:.2,r:.6,w:9,h:5.5});
for(let i=0;i<4;i++){const t=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,.5,16),M(0x111111));t.position.set(55,.25+(i%3)*.5,95+(i>2?1.8:0));S.add(t)}
pad(SHOPPAD[0],SHOPPAD[1],0xfde047);pad(WORKPAD[0],WORKPAD[1],0xf97316);const wl=label("Werkstatt","#fdba74",16,4);wl.position.set(WORKPAD[0],8,WORKPAD[1]);S.add(wl);const b=label("Autohaus","#fde047",16,4);b.position.set(SHOPPAD[0],8,SHOPPAD[1]);S.add(b);pad(45,45,0xf97316);const q2=label("Karriere (20 Level)","#fdba74",22,5.5);q2.position.set(45,8,45);S.add(q2)}
function nearT(x,z,m){return TR.some(T=>T.P.some(p=>(p.x-x)**2+(p.z-z)**2<(T.w/2+m)**2))}
{const tg=new THREE.CylinderGeometry(.4,.5,3,6),cg=new THREE.ConeGeometry(2.6,7,8),tm=M(0x6b4423),lm=M(0x1f6b34);
for(let i=0,n=0;i<1500&&n<420;i++){const x=(Math.random()-.5)*4000,z=(Math.random()-.5)*4000;if((Math.abs(x)<870&&Math.abs(z)<870)||nearT(x,z,16))continue;n++;
const a=new THREE.Mesh(tg,tm),b=new THREE.Mesh(cg,lm);a.position.set(x,1.5,z);b.position.set(x,6,z);a.castShadow=b.castShadow=true;S.add(a,b)}}

