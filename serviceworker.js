self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache =>{
         return cache.addAll(["./","breif.css","./Gifs/images/global-network (1) (1).png","./Gifs/loader.gif"]);
        })
    );
});

self.addEventListener('fetch', e =>{
     e.respondWith(
              caches.match(e.request).then(response =>{
                return response || fetch(e.request);
              })
     );
});