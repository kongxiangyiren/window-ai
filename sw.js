if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,t)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let r={};const l=e=>s(e,o),c={module:{uri:o},exports:r,require:l};n[o]=Promise.all(i.map((e=>c[e]||l(e)))).then((e=>(t(...e),r)))}}define(["./workbox-0495e901"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-DoOhH2DU.css",revision:null},{url:"assets/index-DVFswlCh.js",revision:null},{url:"index.html",revision:"b7d0d9e323335f0f49194130163bb1e0"},{url:"manifest.webmanifest",revision:"1211a106b494aab544bd5e0956622471"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*\.(woff2|woff)\?v=\d+\.\d+\.\d+$/,new e.CacheFirst({cacheName:"font-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/.*\.html/,new e.NetworkFirst({cacheName:"html-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:604800})]}),"GET")}));
