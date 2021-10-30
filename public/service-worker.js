const CACHE_NAME = "sw-cache";
const toCache = [
  "/",
  "/index.html",
  "/login.html",
  "/signup.html",
  "/chat.html",
  "/map.html",
  "/emotion_detect.html",
  "/home.html",
  "/diagnosis.html",
  "/diagnosis-home.html",
  "/js/main.js",
  "css/main.css",
  "css/nav.css",
  "css/button.css",
  "css/diagnosis.css",
  "js/button.js",
  "js/diagnosis.js",
  "js/ml.js",
  "models/facemo.json",
  "models/facemo.weights.bin",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Removing old cache", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
