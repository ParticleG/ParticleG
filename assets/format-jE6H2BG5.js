const i={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},o=Object.keys(i);i.all=!0;function a(e){const t={};for(const r of o)e[r]===!0&&(t[r]=!0);return Object.keys(t).length===0?i:(t.horizontal===!0?t.left=t.right=!0:t.left===!0&&t.right===!0&&(t.horizontal=!0),t.vertical===!0?t.up=t.down=!0:t.up===!0&&t.down===!0&&(t.vertical=!0),t.horizontal===!0&&t.vertical===!0&&(t.all=!0),t)}const u=["INPUT","TEXTAREA"];function l(e,t){return t.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof t.handler=="function"&&u.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(t.uid)===-1)}const n=["B","KB","MB","GB","TB","PB"];function s(e,t=1){let r=0;for(;parseInt(e,10)>=1024&&r<n.length-1;)e/=1024,++r;return`${e.toFixed(t)}${n[r]}`}function d(e,t,r){return r<=t?t:Math.min(r,Math.max(t,e))}export{d as b,a as g,s as h,l as s};