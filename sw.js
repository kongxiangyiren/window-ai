if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const l=e=>n(e,r),d={module:{uri:r},exports:o,require:l};s[r]=Promise.all(i.map((e=>d[e]||l(e)))).then((e=>(t(...e),o)))}}define(["./workbox-4aa34959"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-DoOhH2DU.css",revision:null},{url:"assets/index-DVFswlCh.js",revision:null},{url:"index.html",revision:"b7d0d9e323335f0f49194130163bb1e0"},{url:"manifest.webmanifest",revision:"1211a106b494aab544bd5e0956622471"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*\?v=\d+\.\d+\.\d+$/,new e.CacheFirst({cacheName:"cdn-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:604800})]}),"GET")}));
