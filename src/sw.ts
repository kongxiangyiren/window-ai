const RUNTIME = 'window-ai';
const HOSTNAME_WHITELIST = [self.location.hostname, 'unpkg.com'];

const getFixedUrl = (req: { url: string | URL }) => {
  const now = Date.now();
  const url = new URL(req.url);

  url.protocol = self.location.protocol;

  if (url.hostname === self.location.hostname) {
    url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
  }
  return url.href;
};

self.addEventListener('activate', event => {
  // @ts-expect-error
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  //   @ts-expect-error
  if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
    //   @ts-expect-error
    const cached = caches.match(event.request);
    //   @ts-expect-error
    const fixedUrl = getFixedUrl(event.request);
    const fetched = fetch(fixedUrl, { cache: 'no-store' });
    const fetchedCopy = fetched.then(resp => resp.clone());

    //       @ts-expect-error
    event.respondWith(
      Promise.race([fetched.catch(_ => cached), cached])
        .then(resp => resp || fetched)
        .catch(_ => {})
    );

    //   @ts-expect-error
    event.waitUntil(
      Promise.all([fetchedCopy, caches.open(RUNTIME)])
        //   @ts-expect-error
        .then(([response, cache]) => response.ok && cache.put(event.request, response))
        .catch(_ => {})
    );
  }
});
