const cacheVersion = 'pwa-test';

const filesToCache = 
	[
	'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
	'pwa/public/index.php'
	];

self.addEventListener('install', function(event) {
	console.info('Event: Install');
	event.waitUntil(
		caches.open(cacheVersion)
			.then(function(cache) {
				return cache.addAll(filesToCache)
			})
	)
});

self.addEventListener('fetch', function(event) {
	console.info('Event: Fetch');
	event.respondWith(
		caches.open(cacheVersion).then(function(cache) {
			return cache.match(event.request).then(function (response) {
				return response || fetch(event.request).then(function(response) {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});
