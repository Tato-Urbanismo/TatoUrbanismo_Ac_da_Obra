const CACHE = 'tato-obra-v2';
const FILES = [
  '/TatoUrbanismo_Ac_da_Obra/',
  '/TatoUrbanismo_Ac_da_Obra/index.html'
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
        return caches.match('/TatoUrbanismo_Ac_da_Obra/index.html');
      });
    })
  );
});