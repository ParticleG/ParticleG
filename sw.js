if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let f={};const n=e=>a(e,r),o={module:{uri:r},exports:f,require:n};s[r]=Promise.all(i.map((e=>o[e]||n(e)))).then((e=>(c(...e),f)))}}define(["./workbox-8ad27a92"],(function(e){"use strict";e.setCacheNameDetails({prefix:"particleg"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AuroraPage-BCWWiZgg.js",revision:"ff0c77e6d879745eda7589a722fb4bcd"},{url:"assets/axios-DJf3751s.js",revision:"31ecf4bc543f54dbff543ac4fb7fc4df"},{url:"assets/bus-BkowTQJa.js",revision:"1fda9b41c431012f29884bf485937588"},{url:"assets/common-VJl2xMk1.js",revision:"f7c7a5c2a92228c34b737ce228d8b6d5"},{url:"assets/ErrorNotFound-BTM65Shv.js",revision:"26cdc25e3f26e9e44dfd37c71ef0852f"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa-Dr0goTwe.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ-D-x-0Q06.woff2",revision:"a4160421d2605545f69a4cd6cd642902"},{url:"assets/focus-manager-CCCSeSsW.js",revision:"29ec851a67cadfb7bb6d58a8aa8cac73"},{url:"assets/format-jE6H2BG5.js",revision:"f9c6f5abfc72b3bece36609e79bc7e92"},{url:"assets/HomePage-DbaNzK7O.css",revision:"d67470a724694e33bad3a8a09b8a65d7"},{url:"assets/HomePage-LaPAeMq8.js",revision:"d0379ba3109415768fb346256c9d8a99"},{url:"assets/i18n-CXk8qEp8.js",revision:"31a95b7272ecdbd2cd8cf14f5bd90c38"},{url:"assets/index-bnwM7uLw.js",revision:"438af27a225426be699cfe1edceba8fa"},{url:"assets/index-Br0q4W-C.js",revision:"95ce2920d6acc4091137656caea4699c"},{url:"assets/index-CaKHaXKD.js",revision:"8d4101396c66292e29278f56d3f346d0"},{url:"assets/index-D9ZYWQNs.css",revision:"78866eae839407f3f624caadcb9e49b2"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ-Y2mpUUkw.woff",revision:"d93054bf1c6d3002897ac09e0e7b9a6f"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc--ViM7Ag4Q.woff",revision:"30ef7351c99d2cd25159e6fc71e6c6fc"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc--CrFzpgl6.woff",revision:"5001486802025ac686973542fdeeea60"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc--CW3_XjG_.woff",revision:"064a5568b49ac29f2e9ea88a1f25fbc3"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc--Dr8fnyGc.woff",revision:"c2818baea5d2506dd4c2843836b9bff6"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM-DAYh6T4l.woff",revision:"1ac185dda7da331babe18e8d84ec6984"},{url:"assets/LeftMainDrawer-BlEeSLJy.js",revision:"2c21cdd9b06ac8c41a90d6b12326988a"},{url:"assets/MainHeader-Z0WjUgvL.js",revision:"e3b7098b26e74a69bfc60ba106e5add9"},{url:"assets/MainLayout-DeN8nwfs.js",revision:"8e97e24a69d513c54cb8d7f828059344"},{url:"assets/materialdesignicons-webfont-Dp5v-WZN.woff2",revision:"1d7bcee1b302339c3b8db10214dc9ec6"},{url:"assets/materialdesignicons-webfont-PXm3-2wK.woff",revision:"026b7ac9c43c7e04250f00acd510fa49"},{url:"assets/monaco-DMA0lnnz.js",revision:"23d77c750f34096514bf8e179abdfd80"},{url:"assets/OnebotPage-CRqlCho7.js",revision:"57c6e3369fe64b2ead9aa7beaec42f36"},{url:"assets/QImg-Ctm0g5v5.js",revision:"76129bb2bd0ecb63f58a86a50be61c50"},{url:"assets/QPage-CgY4Zp-B.js",revision:"f2a6b326b390391b31d3b5d84b1fbb32"},{url:"assets/QResizeObserver-ofcrNES4.js",revision:"7864dcd993f13c3b7b050cbe8ce4842d"},{url:"assets/QScrollObserver-CTgcT7hy.js",revision:"06c2c5a27d7c76871c3d8abe3c0d62c5"},{url:"assets/scroll-6Rhb909Z.js",revision:"60e793d32407abafaa3bb4ead42d47f8"},{url:"assets/selection-QCqFmV6J.js",revision:"e6b01a11b2277171dc841febe58c1f44"},{url:"assets/TouchPan-Fkbi-DUT.js",revision:"36d99e388775d55063b92c2d72c0da72"},{url:"assets/use-dark-1vSZ-Iov.js",revision:"9f3026f5cfff0d273966671a7fc07163"},{url:"assets/use-model-toggle-Dv4xI7SE.js",revision:"014895680e68d63dd8619cb61bd98165"},{url:"assets/use-quasar-BPyhVuQ8.js",revision:"a8562f637bfb150b42e9d176ae679c31"},{url:"assets/vue-i18n.runtime-DOX5dzGS.js",revision:"be9492be7e679eccaa3e45a5f5f1e119"},{url:"favicon.ico",revision:"f4facfeaed834544d622544acfbb7722"},{url:"icons/apple-icon-120x120.png",revision:"d082235f6e6d2109e84e397f66fa868d"},{url:"icons/apple-icon-152x152.png",revision:"3c728ce3e709b7395be487becf76283a"},{url:"icons/apple-icon-167x167.png",revision:"3fec89672a18e4b402ede58646917c2d"},{url:"icons/apple-icon-180x180.png",revision:"aa47843bd47f34b7ca4b99f65dd25955"},{url:"icons/favicon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"icons/favicon-16x16.png",revision:"e4b046d41e08e6fa06626d6410ab381d"},{url:"icons/favicon-32x32.png",revision:"410858b01fa6d3d66b7bf21447c5f1fc"},{url:"icons/favicon-96x96.png",revision:"db2bde7f824fb4057ffd1c42f6ed756e"},{url:"icons/icon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"icons/icon-192x192.png",revision:"7659f0d3e9602e71811f8b7cf2ce0e8e"},{url:"icons/icon-256x256.png",revision:"cf5ad3498fb6fda43bdafd3c6ce9b824"},{url:"icons/icon-384x384.png",revision:"fdfc1b3612b6833a27a7b260c9990247"},{url:"icons/icon-512x512.png",revision:"2c2dc987945806196bd18cb6028d8bf4"},{url:"icons/ms-icon-144x144.png",revision:"8de1b0e67a62b881cd22d935f102a0e6"},{url:"icons/safari-pinned-tab.svg",revision:"3e4c3730b00c89591de9505efb73afd3"},{url:"index.html",revision:"6ed07cdb4d1cedaecf44aecb1fe8ddb5"},{url:"manifest.json",revision:"e69d7e83ac503ff588a58395944c7c2c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\\.js$/]}))}));
