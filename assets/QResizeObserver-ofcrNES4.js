import{E as g,F as y,o as c,c as z,g as w,n as f,a as v,d as O,l as b,G as x}from"./index-CaKHaXKD.js";function E(){const o=g(!y.value);return o.value===!1&&c(()=>{o.value=!0}),{isHydrated:o}}const m=typeof ResizeObserver<"u",h=m===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"},L=z({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(o,{emit:p}){let i=null,t,s={width:-1,height:-1};function u(e){e===!0||o.debounce===0||o.debounce==="0"?l():i===null&&(i=setTimeout(l,o.debounce))}function l(){if(i!==null&&(clearTimeout(i),i=null),t){const{offsetWidth:e,offsetHeight:n}=t;(e!==s.width||n!==s.height)&&(s={width:e,height:n},p("resize",s))}}const{proxy:a}=w();if(a.trigger=u,m===!0){let e;const n=d=>{t=a.$el.parentNode,t?(e=new ResizeObserver(u),e.observe(t),l()):d!==!0&&f(()=>{n(!0)})};return c(()=>{n()}),v(()=>{i!==null&&clearTimeout(i),e!==void 0&&(e.disconnect!==void 0?e.disconnect():t&&e.unobserve(t))}),O}else{let e=function(){i!==null&&(clearTimeout(i),i=null),r!==void 0&&(r.removeEventListener!==void 0&&r.removeEventListener("resize",u,b.passive),r=void 0)},n=function(){e(),t&&t.contentDocument&&(r=t.contentDocument.defaultView,r.addEventListener("resize",u,b.passive),l())};const{isHydrated:d}=E();let r;return c(()=>{f(()=>{t=a.$el,t&&n()})}),v(e),()=>{if(d.value===!0)return x("object",{class:"q--avoid-card-border",style:h.style,tabindex:-1,type:"text/html",data:h.url,"aria-hidden":"true",onLoad:n})}}}});export{L as Q};
