const C="linecheck-v75",SHELL=["./","index.html","linecheck.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  const page=e.request.mode==="navigate"||/\/(index\.html)?$/.test(u.pathname);
  e.respondWith(fetch(e.request,page?{cache:"no-store"}:{}).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(page?"index.html":e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs){if("focus" in c)return c.focus()}return self.clients.openWindow("./")}))});
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){try{d={body:e.data.text()}}catch(y){}}
  e.waitUntil(self.registration.showNotification(d.title||"Linecheck",{body:d.body||"A ticket won. Open Linecheck to see it.",tag:d.tag||"lc",renotify:true,icon:"icon-192.png",badge:"icon-192.png",data:{url:"./"}}))});
