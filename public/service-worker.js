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
  "/emotion.js",
  "/face-api.min.js",
  "css/main.css",
  "css/nav.css",
  "css/chat.css",
  "css/map.css",
  "css/button.css",
  "css/diagnosis.css",
  "js/button.js",
  "js/diagnosis.js",
  "js/ml.js",
  "js/main.js",
  "js/maps.js",
  "js/maps.json",
  "models/face_expression_model-shard1",
  "models/face_expression_model-weights_manifest.json",
  "models/face_landmark_68_model-shard1",
  "models/face_landmark_68_model-weights_manifest.json",
  "models/face_landmark_68_tiny_model-shard1",
  "models/face_landmark_68_tiny_model-weights_manifest.json",
  "models/face_recognition_model-shard1",
  "models/face_recognition_model-shard2",
  "models/face_recognition_model-weights_manifest.json",
  "models/tiny_face_detector_model-shard1",
  "models/tiny_face_detector_model-weights_manifest.json",
  "models-2/facemo.json",
  "models-2/facemo.weights.bin",
  "/example.mp4",
  "/demo.MOV",
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
