/* Drift Racers 3D – core.js (Reihenfolge der Dateien siehe index.html) */
let TL=40,laps=3,lvl=0,nb=3,TAU=Math.PI*2,N=500,$=i=>document.getElementById(i);
const CARS=[
{n:"VW Golf GTI",c:0xc62828,m:38,a:18,h:1,p:0,s:0},{n:"Toyota GR Yaris",c:0xe5e7eb,m:41,a:20,h:1.03,p:800,s:0},
{n:"BMW M3",c:0x1c69d4,m:46,a:22,h:1.05,p:1500,s:1},{n:"Mercedes-AMG C 63",c:0x9ca3af,m:49,a:24,h:1.06,p:2500,s:1},
{n:"Ford Mustang GT",c:0xe8590c,m:52,a:26,h:1.08,p:4000,s:6},{n:"Porsche 911 GT3",c:0xf5c400,m:55,a:28,h:1.12,p:6000,s:2},
{n:"Audi RS Q8",c:0x374151,m:57,a:29,h:1.1,p:8000,s:5},{n:"Nissan GT-R",c:0x5b7b9a,m:60,a:31,h:1.14,p:11000,s:2},
{n:"Ferrari 488",c:0xd90429,m:63,a:33,h:1.16,p:15000,s:3},{n:"Lamborghini Huracán",c:0x7bd400,m:66,a:35,h:1.18,p:20000,s:3},
{n:"McLaren 720S",c:0xff7a00,m:69,a:37,h:1.2,p:28000,s:3},{n:"Bugatti Chiron",c:0x0b2a6b,m:74,a:40,h:1.22,p:40000,s:4},{n:"Formel 1 – Ferrari",c:0xd90429,m:96,a:58,h:1.4,p:90000,s:7}];
const SC=(k,a)=>a.map(([x,z])=>[Math.round(x*k),Math.round(z*k)]);const TR=[
{n:"Rundkurs",o:[0,-1060],w:20,c:0x3b82f6,pad:[0,-55],m:1,bf:1,p:Array.from({length:14},(_,i)=>{const t=i/14*TAU;return[150*Math.cos(t),90*Math.sin(t)]})},
{n:"Schlangenpass",o:[950,-100],w:18,c:0xef4444,pad:[55,0],m:1.5,bf:.8,p:[[0,0],[120,-20],[220,40],[300,-40],[380,40],[440,150],[380,260],[280,200],[200,260],[100,300],[0,260],[-60,150]]},
{n:"Haarnadel-Sprint",o:[-200,1000],w:16,c:0x22c55e,pad:[-55,0],m:2.2,bf:.72,p:[[0,0],[150,0],[260,-30],[300,60],[220,110],[300,170],[380,230],[300,310],[150,330],[40,280],[-40,200],[-30,90]]},
{n:"Zickzack-Kanal",o:[-1450,-200],w:15,c:0xf59e0b,pad:null,m:2.6,bf:.66,p:[[0,0],[100,0],[200,20],[260,80],[200,140],[100,120],[40,180],[100,240],[220,230],[300,290],[240,360],[120,350],[0,380],[-80,320],[-60,220],[-120,140],[-80,60]]},
{n:"Schneckenpass",o:[-1550,500],w:14,c:0xa855f7,pad:null,m:3,bf:.62,p:[[0,0],[160,0],[300,10],[380,70],[340,140],[220,130],[120,150],[100,220],[200,260],[330,270],[400,340],[330,420],[180,400],[60,350],[-40,400],[-120,340],[-90,250],[-160,160],[-100,70]]},
{n:"Meisterkurs",o:[-1500,-900],w:12,c:0xef4444,pad:null,m:3.5,bf:.58,p:[[0,0],[140,-10],[260,10],[330,70],[300,130],[230,150],[260,210],[340,240],[400,310],[350,380],[250,360],[200,300],[130,330],[140,400],[60,440],[-40,410],[-60,330],[10,280],[-50,220],[-110,260],[-170,200],[-140,120],[-60,80]]},
{n:"Ringautobahn",o:[800,-1750],w:22,c:0x38bdf8,pad:null,m:1.6,bf:.95,p:SC(.55,[[0,0],[250,-30],[500,0],[600,120],[560,260],[400,330],[200,300],[60,340],[-60,260],[-80,120]])},
{n:"Flughafen-Sprint",o:[1450,250],w:18,c:0xa3e635,pad:null,m:1.3,bf:.9,p:SC(.65,[[0,0],[200,0],[400,0],[500,40],[520,120],[440,160],[300,150],[260,230],[360,280],[500,300],[520,380],[400,420],[200,400],[60,340],[-40,240],[-60,120]])},
{n:"Bergrennen",o:[1550,-750],w:14,c:0xf472b6,pad:null,m:2.8,bf:.64,p:SC(.6,[[0,0],[120,40],[240,0],[360,60],[420,160],[340,240],[220,200],[120,260],[200,340],[320,380],[260,460],[120,440],[20,380],[-60,280],[-40,160]])},
{n:"Stadtkurs",o:[-1000,1400],w:14,c:0xfb923c,pad:null,m:2.4,bf:.6,p:SC(.7,[[0,0],[150,0],[150,100],[300,100],[300,0],[450,0],[450,200],[300,200],[300,300],[450,300],[450,420],[150,420],[150,300],[0,300],[0,200],[100,200],[100,100],[0,100]])}];
const DIF={"Rundkurs":1,"Ringautobahn":2,"Flughafen-Sprint":3,"Schlangenpass":4,"Haarnadel-Sprint":5,"Zickzack-Kanal":6,"Bergrennen":7,"Stadtkurs":8,"Schneckenpass":9,"Meisterkurs":10};TR.forEach(t=>t.d=DIF[t.n]);TR.sort((a,b)=>a.d-b.d);
const tf=l=>Math.floor((l-1)*TR.length/20);const SHOPPAD=[-40,80],WORKPAD=[40,80];let wsOpen=false,mapOpen=false,tt=0,foot=false,rcOpen=false,LAMPM=null;
const tn=i=>save.tune[i]||(save.tune[i]={m:0,r:0,n:0,a:0}),dur=()=>save.dur[save.sel]??100;
function eff(){const c=CARS[save.sel],t=tn(save.sel),d=dur()/100;return{m:c.m*(1+.03*t.m)*(.6+.4*d),a:c.a*(1+.04*t.m)*(.7+.3*d),h:c.h*(1+.04*t.r),nt:100*(1+.25*t.n),ar:1-.12*t.a}}
function toast(s){$("toast").textContent=s;tt=2.2}
function crash(imp,nx,nz){if(me.cd>0||imp<9)return;me.cd=.7;const e=eff(),dm=Math.min(45,(imp-8)*.5)*e.ar;save.dur[save.sel]=Math.max(0,dur()-dm);persist();
me.ct=.9;me.cs=Math.min(1,imp/32);{const dx=-nx,dz=-nz,lz=dx*Math.sin(me.h)+dz*Math.cos(me.h),lx=dx*Math.cos(me.h)-dz*Math.sin(me.h),l=Math.hypot(lx,lz)||1;dentCar(myMesh,lx/l*.95,lz/l*2.2,.15+.3*me.cs)}me.av=(Math.random()<.5?-1:1)*(imp>18?1+me.cs*5:.5);burst(me.x-nx*1.2,me.z-nz*1.2,Math.round(10+imp*.7));
toast(`💥 Unfall! Zustand −${Math.round(dm)}%`+(dur()<=0?" – Totalschaden, ab in die Werkstatt!":""))}
let save={money:0,owned:[0],sel:0};
try{const s=JSON.parse(localStorage.getItem("dr1"));if(s&&s.owned)save=s}catch(e){}
save.lvl=save.lvl|0;save.tune=save.tune||{};save.dur=save.dur||{};save.cop=save.cop||{a:0};save.fd=save.fd||{a:0};if(save.v!==2){const mp=[0,2,5,9,11];save.owned=save.owned.map(i=>mp[i]!==undefined?mp[i]:i);save.sel=mp[save.sel]!==undefined?mp[save.sel]:0;save.v=2}const persist=()=>{try{localStorage.setItem("dr1",JSON.stringify(save))}catch(e){}};

const R=new THREE.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));document.body.appendChild(R.domElement);R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.15;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const S=new THREE.Scene();S.background=new THREE.Color(0xc9dcf0);S.fog=new THREE.Fog(0xc9dcf0,180,950);
const cam=new THREE.PerspectiveCamera(70,1,.1,1200);
function rs(){R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener("resize",rs);rs();
const HEMI=new THREE.HemisphereLight(0xcfe3ff,0x4a5a3a,.45);S.add(HEMI);const sun=new THREE.DirectionalLight(0xfff0d8,1.7);sun.position.set(90,150,60);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
{const c=sun.shadow.camera;c.left=-110;c.right=110;c.top=110;c.bottom=-110;c.near=10;c.far=500}sun.shadow.bias=-.0005;S.add(sun,sun.target);
const SKY=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{sd:{value:new THREE.Vector3(.49,.81,.32)},dk:{value:1}},
vertexShader:"varying vec3 v;void main(){v=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
fragmentShader:"varying vec3 v;uniform vec3 sd;uniform float dk;float hh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float nz(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hh(i),hh(i+vec2(1.,0.)),f.x),mix(hh(i+vec2(0.,1.)),hh(i+vec2(1.,1.)),f.x),f.y);}float fb(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*nz(p);p*=2.;a*=.5;}return s;}void main(){float h=max(v.y,0.);vec3 c=mix(mix(vec3(.02,.03,.07),vec3(.79,.86,.94),dk),mix(vec3(.0,.01,.05),vec3(.16,.36,.72),dk),pow(h,.55));float s=max(dot(v,sd),0.);c+=vec3(1.,.85,.6)*(pow(s,700.)*3.+pow(s,8.)*.22);vec2 uv=v.xz/(v.y+.3)*1.4;float cl=smoothstep(.48,.82,fb(uv));c=mix(c,vec3(.12+.88*dk),cl*.8*smoothstep(0.,.25,v.y));c+=vec3(step(.996,hh(floor(v.xz*220./(v.y+.35))))*(1.-dk)*smoothstep(0.,.2,v.y));gl_FragColor=vec4(c,1.);}"});
const sky=new THREE.Mesh(new THREE.SphereGeometry(1000,32,16),SKY);S.add(sky);
try{const pm=new THREE.PMREMGenerator(R),es=new THREE.Scene();es.add(new THREE.Mesh(new THREE.SphereGeometry(1000,32,16),SKY));S.environment=pm.fromScene(es).texture}catch(e){}
const M=c=>new THREE.MeshStandardMaterial({color:c,roughness:.85,metalness:0,envMapIntensity:.35,side:THREE.DoubleSide});
function ctex(bg,n,pal,dr){const cv=document.createElement("canvas");cv.width=cv.height=256;const x=cv.getContext("2d");x.fillStyle=bg;x.fillRect(0,0,256,256);
for(let i=0;i<n;i++){x.fillStyle=pal();x.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*2,2)}if(dr)dr(x);
const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t}
const rm=new THREE.MeshStandardMaterial({map:ctex("#3b3d42",7000,()=>{const v=70+Math.random()*90|0;return `rgba(${v},${v},${v},.22)`},x=>{x.fillStyle="rgba(255,255,255,.85)";x.fillRect(124,0,8,110)}),roughness:.92,envMapIntensity:.3});
rm.bumpMap=rm.map;rm.bumpScale=.8;const rm2=rm.clone();rm2.polygonOffset=true;rm2.polygonOffsetFactor=-2;rm2.polygonOffsetUnits=-2;
const FB=[30,205,45,0,215,25].map((hu,i)=>{const cv=document.createElement("canvas");cv.width=cv.height=128;const x=cv.getContext("2d");x.fillStyle=`hsl(${hu},12%,${58+i*3}%)`;x.fillRect(0,0,128,128);
for(let a=0;a<4;a++)for(let b=0;b<4;b++){x.fillStyle=Math.random()<.2?"#e9d9a0":"#27384d";x.fillRect(a*32+6,b*32+8,20,18)}
const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t});
{const gt=ctex("#3a7a38",9000,()=>`rgba(${30+Math.random()*50|0},${80+Math.random()*80|0},${30+Math.random()*30|0},.4)`);gt.repeat.set(650,650);const gm=M(0xffffff);gm.map=gt;gm.roughness=1;S.add(new THREE.Mesh(new THREE.PlaneGeometry(5200,5200).rotateX(-Math.PI/2),gm))}

TR.forEach(T=>{const cu=new THREE.CatmullRomCurve3(T.p.map(q=>new THREE.Vector3(q[0]+T.o[0],0,q[1]+T.o[1])),true);
const P=cu.getSpacedPoints(N);P.pop();T.P=P;T.sp=cu.getLength()/N;
T.Nn=P.map((a,i)=>{const b=P[(i+1)%N],c=P[(i+N-1)%N];let tx=b.x-c.x,tz=b.z-c.z;const l=Math.hypot(tx,tz);tx/=l;tz/=l;return{tx,tz,nx:tz,nz:-tx}})});
function strip(T,o0,o1,y,c){const pos=[],idx=[],uv=[];for(let i=0;i<=N;i++){const j=i%N,p=T.P[j],q=T.Nn[j];pos.push(p.x+q.nx*o0,y,p.z+q.nz*o0,p.x+q.nx*o1,y,p.z+q.nz*o1);uv.push(0,i*T.sp/12,1,i*T.sp/12);if(i<N){const k=i*2;idx.push(k,k+2,k+1,k+1,k+2,k+3)}}
const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("uv",new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();S.add(new THREE.Mesh(g,c.isMaterial?c:M(c)))}
function label(t,col,sx,sy){const cv=document.createElement("canvas");cv.width=256;cv.height=64;const x=cv.getContext("2d");x.fillStyle="#000b";x.fillRect(0,0,256,64);x.fillStyle=col;x.font="bold 26px sans-serif";x.textAlign="center";x.fillText(t,128,42);
const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),depthTest:false}));s.scale.set(sx,sy,1);return s}
function pad(x,z,c){const m=new THREE.Mesh(new THREE.CircleGeometry(7,32).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.6}));m.position.set(x,.12,z);S.add(m)}
TR.forEach(T=>{const w=T.w;strip(T,-w/2,w/2,.05,rm);strip(T,-w/2-.9,-w/2,.07,0xf1f5f9);strip(T,w/2,w/2+.9,.07,0xf1f5f9);
const sl=new THREE.Mesh(new THREE.PlaneGeometry(w,2).rotateX(-Math.PI/2),M(0xffffff)),p=T.P[0];sl.position.set(p.x,.09,p.z);sl.rotation.y=Math.atan2(T.Nn[0].tx,T.Nn[0].tz);S.add(sl);
const l=label(T.n,"#fff",24,6);l.position.set(p.x,12,p.z);S.add(l);
if(T.pad){pad(T.pad[0],T.pad[1],T.c);const q=label("Rennen: "+T.n,"#fde047",20,5);q.position.set(T.pad[0],8,T.pad[1]);S.add(q)}});
