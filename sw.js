const C="linecheck-v57",SHELL=["./","index.html","linecheck.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  const page=e.request.mode==="navigate"||/\/(index\.html)?$/.test(u.pathname);
  e.respondWith(fetch(e.request,page?{cache:"no-store"}:{}).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(page?"index.html":e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))))});
