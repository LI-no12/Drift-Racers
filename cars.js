/* Drift Racers 3D – cars.js (Reihenfolge der Dateien siehe index.html) */
S.traverse(o=>{if(o.isMesh)o.receiveShadow=true});
const PLT=(()=>{const cv=document.createElement("canvas");cv.width=128;cv.height=32;const x=cv.getContext("2d");x.fillStyle="#f4f4f0";x.fillRect(0,0,128,32);x.fillStyle="#1d4ed8";x.fillRect(0,0,12,32);x.fillStyle="#111";x.font="bold 20px sans-serif";x.textAlign="center";x.fillText("CO · GT 421",72,23);return new THREE.CanvasTexture(cv)})(),PLM=new THREE.MeshBasicMaterial({map:PLT});
const MOD=[[4.28,1.8,.52,.56,.66,.10,.50,.17,{g:"slim",h:"led",t:"hatch",q:2,r:.33,n:5,rd:0xdc2626}],
[3.95,1.8,.52,.54,.65,.10,.49,.18,{g:"wide",h:"led",t:"hatch",q:1,r:.34,n:6,f:1,k:1,w:1}],
[4.8,1.9,.52,.5,.64,.27,.5,.33,{g:"kidney",h:"led",t:"bar",q:4,r:.35,n:5,w:1}],
[4.75,1.92,.52,.5,.64,.27,.5,.33,{g:"vslat",h:"led",t:"bar",q:4,r:.35,n:7,w:1}],
[4.8,1.92,.5,.42,.6,.30,.48,.33,{g:"wide",h:"quad",t:"three",q:4,r:.36,n:5,s:0xf1f5f9,k:1}],
[4.55,1.9,.46,.46,.62,.14,.46,.20,{g:"slim",h:"round",t:"bar",q:2,r:.37,n:5,w:3,f:1,c:0xfacc15}],
[5.0,2.0,.68,.6,.7,.10,.62,.15,{g:"hex",h:"led",t:"bar",q:4,r:.4,n:5}],
[4.7,1.95,.5,.45,.6,.22,.46,.27,{g:"vslat",h:"led",t:"round",q:4,r:.37,n:6,w:3}],
[4.57,1.95,.42,.38,.58,.2,.44,.2,{g:"none",h:"led",t:"round",q:2,r:.36,n:5,v:1,w:1,c:0xfacc15}],
[4.52,1.94,.4,.37,.57,.2,.46,.2,{g:"none",h:"led",t:"y",q:2,r:.36,n:5,v:1,w:1}],
[4.54,1.95,.4,.4,.58,.22,.46,.2,{g:"none",h:"eye",t:"bar",q:2,r:.36,n:5,v:1,w:4}],
[4.55,2.05,.45,.4,.58,.22,.46,.21,{g:"c",h:"led",t:"bar",q:1,r:.38,n:8,v:1,w:4}]],SHM=[0,2,5,9,11,6,4];
function makeCar(c,t,mi){if(t===7)return makeF1(c);const lo=mi===undefined,[L,W,bh,ch,wf,wr,rf,rr,F]=MOD[lo?SHM[t]:mi]||MOD[2],g=new THREE.Group(),y0=.32,bt=y0+bh,zz=u=>(u-.5)*L,
paint=new THREE.MeshPhysicalMaterial({color:c,metalness:.7,roughness:.22,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.4}),
glass=new THREE.MeshPhysicalMaterial({color:0x121b27,metalness:.85,roughness:.04,clearcoat:1,envMapIntensity:1.8,transparent:!lo,opacity:lo?1:.6}),
dark=M(0x14161a),chrome=new THREE.MeshStandardMaterial({color:0xd0d4da,metalness:1,roughness:.18,envMapIntensity:1.4}),
add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);g.add(m);return m},B=(x,y,z)=>new THREE.BoxGeometry(x,y,z),Cy=(a,b,h,s)=>new THREE.CylinderGeometry(a,b,h,s||16),sy=f=>[-1,1].forEach(f),
ex=(pts,w,mat,bev)=>{const s=new THREE.Shape();s.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++){const p=pts[i];if(p.length===4)s.quadraticCurveTo(p[0],p[1],p[2],p[3]);else s.lineTo(p[0],p[1])}
const geo=new THREE.ExtrudeGeometry(s,{depth:w,bevelEnabled:true,bevelThickness:bev,bevelSize:bev,bevelSegments:3,curveSegments:10});geo.translate(0,0,-w/2);geo.rotateY(-Math.PI/2);const m=new THREE.Mesh(geo,mat);g.add(m);return m};
ex([[zz(0),y0+.1],[zz(1),y0+.1],[zz(1)+.02,y0+bh*.6],[zz(1)-.1,bt+.02,zz(wf+.12),bt],[zz(wr-.03),bt],[zz(0)+.05,bt+.02,zz(0),bt-bh*.35]],W-.1,paint,.06);
ex([[zz(wr),bt-.02],[zz(wf),bt-.02],[zz(rf),bt+ch],[zz(rr),bt+ch]],W-.34,glass,.03);
add(B(W-.42,.05,zz(rf)-zz(rr)),paint,0,bt+ch+.03,(zz(rf)+zz(rr))/2);
const hlm=new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xfff4cc,emissiveIntensity:2.2}),tlm=new THREE.MeshStandardMaterial({color:0x550000,emissive:0xff1111,emissiveIntensity:1.8}),zf=zz(1)+.1,zr=zz(0)-.1,R=F.r||.34,Q=Math.PI/2;
if(lo){sy(s=>{add(B(.5,.09,.07),hlm,s*(W/2-.42),bt-.1,zf);add(B(.4,.08,.06),tlm,s*(W/2-.4),bt-.1,zr)});
const tg=Cy(.45,.45,.34,18),rg=Cy(.31,.31,.36,10);[[-1,.31],[1,.31],[-1,-.31],[1,-.31]].forEach(([s,u])=>{const x=s*(W/2-.02),zw=L*u;add(tg,dark,x,.45,zw).rotation.z=Q;add(rg,chrome,x+s*.01,.45,zw).rotation.z=Q})}
else{
sy(s=>{
if(F.h==="round"){add(Cy(.15,.15,.05,18),dark,s*(W/2-.5),bt-.1,zf-.02).rotation.x=Q;add(Cy(.12,.12,.06,18),hlm,s*(W/2-.5),bt-.1,zf+.01).rotation.x=Q}
else if(F.h==="quad"){for(const dy of[-.04,.05])for(const dx of[-.1,.1])add(Cy(.05,.05,.06,12),hlm,s*(W/2-.5)+dx,bt-.1+dy,zf).rotation.x=Q}
else if(F.h==="eye")add(B(.55,.07,.07),hlm,s*(W/2-.45),bt-.1,zf).rotation.z=-s*.18;
else{add(B(.5,.07,.07),hlm,s*(W/2-.42),bt-.09,zf);add(B(.5,.02,.07),hlm,s*(W/2-.42),bt-.17,zf)}
if(F.t==="round"){for(const dx of[-.1,.1])add(Cy(.085,.085,.05,16),tlm,s*(W/2-.45)+dx,bt-.1,zr).rotation.x=Q}
else if(F.t==="three"){for(let i=0;i<3;i++)add(B(.07,.15,.05),tlm,s*(W/2-.3-i*.13),bt-.1,zr)}
else if(F.t==="y"){add(B(.4,.05,.05),tlm,s*(W/2-.4),bt-.07,zr).rotation.z=s*.4;add(B(.3,.05,.05),tlm,s*(W/2-.5),bt-.17,zr).rotation.z=-s*.4}
else if(F.t==="hatch")add(B(.1,.3,.05),tlm,s*(W/2-.13),bt-.02,zr);
else add(B(W/2-.2,.07,.05),tlm,s*(W/4+.02),bt-.1,zr);
add(B(.07,.06,.1),dark,s*(W/2+.02),bt+.04,zz(wf)-.1);add(B(.2,.13,.11),paint,s*(W/2+.13),bt+.09,zz(wf)-.12);
add(B(.02,.03,.16),chrome,s*(W/2+.03),bt-.04,zz((wf+wr)/2+.08));add(B(.05,.1,L*.5),dark,s*(W/2),y0+.18,0);
add(B(.5,.14,.06),dark,s*(W/2-.5),y0+.26,zf);
[.5,.3].forEach(u=>add(B(.01,bh*.75,.015),dark,s*(W/2+.03),y0+bh*.55,zz(u)));
if(F.v)add(B(.06,.2,.8),dark,s*(W/2+.02),bt-.13,zz(.33));
if(F.f)add(B(.14,.3,1.2),paint,s*(W/2),y0+.34,-L*.31)});
const gy=y0+.34;
if(F.g==="kidney")sy(s=>{add(B(.36,.26,.04),chrome,s*.2,gy,zf);add(B(.31,.21,.05),dark,s*.2,gy,zf+.01)});
else if(F.g==="hex"){const a=add(Cy(.42,.42,.05,6),chrome,0,gy,zf),b=add(Cy(.37,.37,.06,6),dark,0,gy,zf+.01);a.rotation.x=b.rotation.x=Q;a.scale.set(1,1,.55);b.scale.set(1,1,.55)}
else if(F.g==="vslat"){add(B(.95,.2,.04),dark,0,gy,zf);for(let i=-4;i<=4;i++)add(B(.02,.18,.05),chrome,i*.1,gy,zf+.01)}
else if(F.g==="wide"){add(B(1,.22,.04),dark,0,gy,zf);add(B(1.02,.02,.05),chrome,0,gy+.12,zf)}
else if(F.g==="slim"){add(B(.9,.1,.04),dark,0,gy+.02,zf);add(B(.9,.015,.05),new THREE.MeshStandardMaterial({color:F.rd||0xdddddd,emissive:F.rd||0,emissiveIntensity:.3}),0,gy+.08,zf)}
else if(F.g==="c")add(new THREE.TorusGeometry(.2,.025,6,18),chrome,0,gy,zf);
else add(B(.7,.12,.05),dark,0,y0+.22,zf);
add(B(.52,.12,.02),PLM,0,y0+.18,zf+.02);add(B(.52,.12,.02),PLM,0,y0+.2,zr-.01);
add(B(W-.1,.04,.3),dark,0,y0+.1,zz(1)-.05);add(B(W-.5,.1,.3),dark,0,y0+.14,zz(0)+.1);
(F.q===4?[-.7,-.5,.5,.7]:F.q===2?[-.55,.55]:[.5]).forEach(x=>add(Cy(.06,.06,.2,10),chrome,x,y0+.14,zr+.05).rotation.x=Q);
if(F.k)add(B(.5,.06,.6),dark,0,bt+.03,zz(wf+.2));
if(F.s){const sm=new THREE.MeshStandardMaterial({color:F.s,roughness:.4});sy(s=>{add(B(.13,.012,zz(1)-zz(wf+.1)),sm,s*.12,bt+.01,(zz(1)+zz(wf+.1))/2);add(B(.13,.012,zz(rf)-zz(rr)),sm,s*.12,bt+ch+.06,(zz(rf)+zz(rr))/2);add(B(.13,.012,zz(wr-.03)-zz(0)),sm,s*.12,bt+.01,(zz(wr-.03)+zz(0))/2)})}
const seat=new THREE.MeshStandardMaterial({color:0x1b1d22,roughness:.9}),skin=new THREE.MeshStandardMaterial({color:0xf1c9a5,roughness:.6});
add(B(W-.55,.2,.3),seat,0,bt+.12,zz(wf)-.12);sy(s=>{add(B(.42,.18,.45),seat,s*.4,bt+.1,zz(wf)-.62);add(B(.42,.42,.1),seat,s*.4,bt+.28,zz(wf)-.84)});add(B(W-.6,.16,.35),seat,0,bt+.1,zz(wr)+.5);
add(new THREE.TorusGeometry(.15,.02,6,14),dark,.4,bt+.33,zz(wf)-.38).rotation.x=.9;add(new THREE.SphereGeometry(.11,10,8),skin,.4,bt+.62,zz(wf)-.82);add(B(.3,.32,.18),new THREE.MeshStandardMaterial({color:0x2c3a52}),.4,bt+.4,zz(wf)-.78);
add(B(.04,.04,.12),dark,0,bt+ch+.1,zz(rr)+.2);
const tire=new THREE.MeshStandardMaterial({color:0x101114,roughness:.95}),rimD=new THREE.MeshStandardMaterial({color:0x2a2d33,metalness:.8,roughness:.3}),cal=new THREE.MeshStandardMaterial({color:F.c||0xdc2626,roughness:.4}),n=F.n||5;
[[-1,.31],[1,.31],[-1,-.31],[1,-.31]].forEach(([s,u])=>{const x=s*(W/2-.02),zw=L*u,cy=R+.12;
add(Cy(R+.12,R+.12,.3,26),tire,x,cy,zw).rotation.z=Q;add(Cy(R,R,.32,24),chrome,x+s*.01,cy,zw).rotation.z=Q;add(Cy(R*.92,R*.92,.02,24),rimD,x+s*.17,cy,zw).rotation.z=Q;
for(let i=0;i<n;i++)add(B(.04,R*1.8,.07),chrome,x+s*.18,cy,zw).rotation.x=i*Math.PI/n;
add(Cy(.06,.06,.04,10),chrome,x+s*.19,cy,zw).rotation.z=Q;add(Cy(R*.72,R*.72,.04,20),rimD,x-s*.06,cy,zw).rotation.z=Q;add(B(.08,.16,.22),cal,x-s*.02,cy+R*.45,zw);
add(Cy(R+.2,R+.2,.03,22),dark,x+s*.07,cy,zw).rotation.z=Q})}
if(F.w){const hi=[0,.12,.1,.5,.62][F.w],wd=F.w===1?W-.5:W-.1,dp=F.w===2?.35:F.w>=3?.55:.2;add(B(wd,.06,dp),F.w<3?paint:dark,0,bt+hi,zz(0)+dp/2+.05);if(F.w>=3)sy(s=>{add(B(.06,hi,.1),dark,s*(W/2-.4),bt+hi/2,zz(0)+.2);add(B(.05,.2,dp),dark,s*(wd/2),bt+hi+.03,zz(0)+dp/2+.05)})}
g.traverse(o=>{if(o.isMesh)o.castShadow=true});return g}
function makeF1(c){const g=new THREE.Group(),P=new THREE.MeshPhysicalMaterial({color:c,metalness:.6,roughness:.25,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1.3}),D=M(0x111317),Wt=new THREE.MeshStandardMaterial({color:0xf2f2f2,roughness:.4}),
C=new THREE.MeshStandardMaterial({color:0xc9ced6,metalness:1,roughness:.2,envMapIntensity:1.3}),
add=(geo,mat,x,y,z,rx,ry,rz)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);if(rx)m.rotation.x=rx;if(ry)m.rotation.y=ry;if(rz)m.rotation.z=rz;g.add(m);return m},B=(x,y,z)=>new THREE.BoxGeometry(x,y,z);
add(B(1.5,.05,4.2),D,0,.13,.1);add(B(.8,.46,2.7),P,0,.4,.2);add(new THREE.CylinderGeometry(.09,.3,2,14),P,0,.34,2.05,Math.PI/2);
[-1,1].forEach(s=>{add(B(.55,.42,1.9),P,s*.68,.36,-.15);add(B(.3,.2,.8),D,s*.68,.3,.7);add(B(.04,.2,.5),Wt,s*.97,.4,-.1)});
add(B(.55,.5,1.7),P,0,.52,-1.15);add(B(.04,.55,1.5),P,0,.88,-1.3);add(B(.35,.3,.45),D,0,.78,.1);add(B(.14,.02,2.4),Wt,0,.64,.5);
add(new THREE.SphereGeometry(.2,14,12),new THREE.MeshStandardMaterial({color:0xffd400,roughness:.3}),0,.72,.55);
add(new THREE.TorusGeometry(.33,.03,8,18,Math.PI),C,0,.62,.6,0,Math.PI/2);add(B(.05,.3,.05),C,0,.75,.95);
add(B(2.1,.05,.55),D,0,.12,2.75);add(B(1.9,.04,.3),P,0,.2,2.65);[-1,1].forEach(s=>add(B(.04,.2,.6),P,s*1.05,.2,2.75));
add(B(1.15,.06,.5),D,0,.98,-2.1);add(B(1.15,.04,.3),P,0,1.12,-2.05);[-1,1].forEach(s=>add(B(.04,.55,.65),P,s*.58,.9,-2.1));add(B(.08,.5,.12),D,0,.72,-2.0);add(B(1.1,.1,.6),D,0,.18,-2.05);
add(B(.3,.1,.05),new THREE.MeshStandardMaterial({color:0x550000,emissive:0xff1111,emissiveIntensity:2}),0,.45,-2.28);
[-1,1].forEach(s=>{add(B(.5,.03,.03),D,s*.78,.28,1.55);add(B(.5,.03,.03),D,s*.78,.4,1.35);add(B(.5,.03,.03),D,s*.78,.28,-1.45)});
[[1.55,.33,.4],[-1.45,.36,.5]].forEach(([z,r,w])=>[-1,1].forEach(s=>{const R=Math.PI/2;add(new THREE.CylinderGeometry(r,r,w,24),D,s*1.0,r,z,0,0,R);add(new THREE.CylinderGeometry(r*.62,r*.62,w+.02,16),C,s*1.0,r,z,0,0,R);add(new THREE.CylinderGeometry(r*.25,r*.25,w+.04,8),D,s*1.0,r,z,0,0,R)}));
g.traverse(o=>{if(o.isMesh)o.castShadow=true});return g}
function at(T,i,l){i=((i%N)+N)%N;const a=Math.floor(i),f=i-a,b=(a+1)%N,p=T.P[a],q=T.P[b],u=T.Nn[a],v=T.Nn[b];
return{x:p.x+(q.x-p.x)*f+(u.nx+(v.nx-u.nx)*f)*l,z:p.z+(q.z-p.z)*f+(u.nz+(v.nz-u.nz)*f)*l,h:Math.atan2(u.tx+(v.tx-u.tx)*f,u.tz+(v.tz-u.tz)*f)}}

function dentCar(g,lx,lz,amt){g.children.forEach(m=>{const mt=m.material,pa=m.geometry&&m.geometry.attributes.position;if(!mt||!(mt.clearcoatRoughness>0)||!pa||pa.count<40)return;
for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i),z=pa.getZ(i),d=Math.hypot(x-lx,y-.75,z-lz);if(d<1.3){const hh=Math.abs((Math.sin(x*12.9898+y*78.233+z*37.719)*43758.5453)%1),k=amt*(1-d/1.3)*(.5+hh),l=Math.hypot(x,z)||1;pa.setXYZ(i,x-x/l*k,y-k*.25,z-z/l*k)}}
pa.needsUpdate=true;m.geometry.computeVertexNormals()})}
