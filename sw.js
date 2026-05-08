// Sem cache - sempre busca do servidor para garantir login
self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  // Sempre busca do servidor, sem cache
  e.respondWith(fetch(e.request).catch(function(){
    return new Response('Sem conexão', {status: 503});
  }));
});