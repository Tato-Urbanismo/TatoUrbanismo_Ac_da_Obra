const CACHE = 'tato-obra-v1';
const FILES = [
  '/dashboard-obra/',
  '/dashboard-obra/index.html'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(FILES); })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).catch(function(){
        return caches.match('/dashboard-obra/index.html');
      });
    })
  );
});