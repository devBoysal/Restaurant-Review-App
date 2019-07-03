const cacheName = "Restaraunt_Reviews_v1";

const cacheAssets = [
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'js/api.js',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js'
];

// Call install event
self.addEventListener('install', event => {
    console.log("Service Worker installed");
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

//Call activate event
self.addEventListener('activate', event => {
    console.log('Service Worker activated');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache!==cacheName) {
                            console.log("Service Worker clearing old cache");
                            return caches.delete(cache);
                        }
                    })
                )
            })
    )
})

//Call fetch event
self.addEventListener('fetch', event => {
    console.log("Service Worker: fetching");
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request)));
});