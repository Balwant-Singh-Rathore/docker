!function(){"use strict";const
t="marpitSVGPolyfill:setZoomFactor,",e=Symbol();let r,o;function
n(n){const i="object"==typeof
n&&n.target||document,a="object"==typeof
n?n.zoom:n;window[e]||(Object.defineProperty(window,e,{configurable:!0,value:!0}),window.addEventListener("message",(({data:e,origin:r})=>{if(r===window.origin)try{if(e&&"string"==typeof
e&&e.startsWith(t)){const[,t]=e.split(","),r=Number.parseFloat(t);Number.isNaN(r)||(o=r)}}catch(t){console.error(t)}})));let
l=!1;Array.from(i.querySelectorAll("svg[data-marpit-svg]"),(t=>{var
e,n,i,s;t.style.transform||(t.style.transform="translateZ(0)");const
c=a||o||t.currentScale||1;r!==c&&(r=c,l=c);const
d=t.getBoundingClientRect(),{length:u}=t.children;for(let
r=0;r<u;r+=1){const o=t.children[r],a=o.getScreenCTM();if(a){const
t=null!==(n=null===(e=o.x)||void 0===e?void 0:e.baseVal.value)&&void
0!==n?n:0,r=null!==(s=null===(i=o.y)||void 0===i?void
0:i.baseVal.value)&&void
0!==s?s:0,l=o.firstElementChild,{style:u}=l;u.transformOrigin||(u.transformOrigin=`${-t}px
${-r}px`),u.transform=`scale(${c}) matrix(${a.a}, ${a.b}, ${a.c},
${a.d}, ${a.e-d.left}, ${a.f-d.top})
translateZ(0.0001px)`}}})),!1!==l&&Array.from(i.querySelectorAll("iframe"),(({contentWindow:e})=>{null==e||e.postMessage(`${t}${l}`,"null"===window.origin?"*":window.origin)}))}r=1,o=void
0;const i=(t,e,r)=>{if(t.getAttribute(e)!==r)return
t.setAttribute(e,r),!0};function
a({once:t=!1,target:e=document}={}){const r="Apple Computer,
Inc."===navigator.vendor?[n]:[];let o=!t;const a=()=>{for(const t of
r)t({target:e});!function(t=document){Array.from(t.querySelectorAll('svg[data-marp-fitting="svg"]'),(t=>{var
e;const
r=t.firstChild,o=r.firstChild,{scrollWidth:n,scrollHeight:a}=o;let
l,s=1;if(t.hasAttribute("data-marp-fitting-code")&&(l=null===(e=t.parentElement)||void
0===e?void
0:e.parentElement),t.hasAttribute("data-marp-fitting-math")&&(l=t.parentElement),l){const
t=getComputedStyle(l),e=Math.ceil(l.clientWidth-parseFloat(t.paddingLeft||"0")-parseFloat(t.paddingRight||"0"));e&&(s=e)}const
c=Math.max(n,s),d=Math.max(a,1),u=`0 0 ${c}
${d}`;i(r,"width",`${c}`),i(r,"height",`${d}`),i(t,"preserveAspectRatio",getComputedStyle(t).getPropertyValue("--preserve-aspect-ratio")||"xMinYMin
meet"),i(t,"viewBox",u)&&t.classList.toggle("__reflow__")}))}(e),o&&window.requestAnimationFrame(a)};return
a(),()=>{o=!1}}const
l=Symbol(),s=document.currentScript;((t=document)=>{if("undefined"==typeof
window)throw new Error("Marp Core's browser script is valid only in
browser context.");if(t[l])return t[l];const
e=a({target:t}),r=()=>{e(),delete
t[l]};Object.defineProperty(t,l,{configurable:!0,value:r})})(s?s.getRootNode():document)}();