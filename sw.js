self.addEventListener("install", function (event) {
    event.waitUntil(preLoad());
});

var preLoad = function () {
    console.log("Installing web app");
    return caches.open("offline").then(function (cache) {
        console.log("caching index and important routes");
        return cache.addAll([
            "/index.html",
            "/css/main.css",
            "/sem6/ica.html",
            "/sem6/syllabus.html",
            "/sem6/notes.html",
            "/sem6/books.html",
            "/css/pages.css",
            "/javascript/accordion.js",
            "/javascript/outline.js",
            "/offline.html",
            "/download.html",
            "/css/download.css",
            "/quickaccess.html",
            "/css/ica.css",
        ]);
    });
};

self.addEventListener("fetch", function (event) {
    event.respondWith(
        checkResponse(event.request).catch(function () {
            return returnFromCache(event.request);
        })
    );
    event.waitUntil(addToCache(event.request));
});

var checkResponse = function (request) {
    return new Promise(function (fulfill, reject) {
        fetch(request).then(function (response) {
            if (response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

var addToCache = function (request) {
    return caches.open("offline").then(function (cache) {
        return fetch(request).then(function (response) {
            console.log(response.url + " was cached");
            return cache.put(request, response);
        });
    });
};

var returnFromCache = function (request) {
    return caches.open("offline").then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status == 404) {
                return cache.match("offline.html");
            } else {
                return matching;
            }
        });
    });
};
