import{c as r,D as l,G as i,I as c,J as d,a as f,n as p,H as m,g as v}from"./index-CaKHaXKD.js";const F=r({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:t}){const o=l(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>i("div",{class:o.value},c(t.default))}});function g(){let e;const t=v();function o(){e=void 0}return d(o),f(o),{removeTick:o,registerTick(n){e=n,p(()=>{e===n&&(m(t)===!1&&e(),e=void 0)})}}}const T=r({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:t}){const o=l(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>i("div",{class:o.value,role:"toolbar"},c(t.default))}});let s=[],a=[];function u(e){a=a.filter(t=>t!==e)}function b(e){u(e),a.push(e)}function k(e){u(e),a.length===0&&s.length!==0&&(s[s.length-1](),s=[])}function Q(e){a.length===0?e():s.push(e)}function q(e){s=s.filter(t=>t!==e)}export{F as Q,b as a,T as b,Q as c,q as d,k as r,g as u};
