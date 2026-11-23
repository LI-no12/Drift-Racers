/* Drift Racers 3D – net.js (Reihenfolge der Dateien siehe index.html) */
const myId=Math.random().toString(36).slice(2,9),peers=new Map();let chan=null,live=false;
function recv(d){if(!d||d.id===myId||typeof d.x!=="number")return;let o=peers.get(d.id);
if(!o){o={m:makeCar(d.c||0xffffff,(CARS[d.t]||CARS[0]).s,CARS[d.t]?d.t:0)};o.m.position.set(d.x,0,d.z);o.m.rotation.y=d.h;S.add(o.m);peers.set(d.id,o)}
Object.assign(o,{x:d.x,z:d.z,h:d.h,p:d.p||0,r:d.r,f:d.f,k:d.k,seen:performance.now()})}
try{if(window.supabase&&SB_URL.startsWith("https")){const sb=supabase.createClient(SB_URL,SB_KEY);
chan=sb.channel("drift-welt",{config:{broadcast:{self:false}}});chan.on("broadcast",{event:"p"},m=>recv(m.payload));chan.subscribe(s=>{live=s==="SUBSCRIBED"})}}catch(e){chan=null}
setInterval(()=>{if(chan&&live){try{chan.send({type:"broadcast",event:"p",payload:{id:myId,x:+me.x.toFixed(1),z:+me.z.toFixed(1),h:+me.h.toFixed(2),c:CARS[save.sel].c,t:save.sel,p:me.cum,k:trk,r:st==="race"||st==="count"?1:0,f:me.fin?1:0}})}catch(e){}}},120);
setInterval(()=>{const n=performance.now();peers.forEach((o,k)=>{if(n-o.seen>3500){S.remove(o.m);peers.delete(k)}});online=peers.size+1},1000);

