const CACHE='aashirwaad-pos-v35';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(['./','./index.html','./manifest.json']))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('aashirwaad-pos-')&&key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>event.respondWith(caches.open(CACHE).then(async cache=>{try{const response=await fetch(event.request);if(event.request.method==='GET'&&new URL(event.request.url).origin===self.location.origin)cache.put(event.request,response.clone());return response}catch(error){return (await cache.match(event.request))||Response.error()}})));
