self.addEventListener("install", function(event) {
    // Perform install steps
  });
  let cacheName = "rest-static-v1";
  images = [];
  
    for(let i = 1; i <= 10; i++) {
	images.push("./img/"+ i +".jpg");
    }
  var urls = [
    "/",
    "./index.html",
    "./restaurant.html",
    "./css/styles.css",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js",
    "./data/restaurants.json",
    ...images
  ];

  
  self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
      caches.open(cacheName)
        .then(function (cache) {
          console.log('Opened cache');
          return cache.addAll(urls);
        })
    );
  });
  
  self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request, {ignoreSearch:true}).then(response => {
        return response || fetch(event.request);
      })
      .catch(err => console.log(err, event.request))
    );
  });