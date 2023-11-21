import{j as a,s as E,c as M,r as K,L as U}from"./index-aa68e019.js";const V=[{image:"string",route:"/recursion",title:"String"},{image:"fibonacci",route:"/fibonacci",title:"Fibonacci"},{image:"sorting",route:"/sorting",title:"Array sorting"},{image:"stack",route:"/stack",title:"Stack"},{image:"queue",route:"/queue",title:"Queue"},{image:"linked-list",route:"/list",title:"Linked list"}],Y=({title:t="",image:i})=>a.jsxs("div",{className:E.menuCard,children:[a.jsx("h2",{className:M("text text_color_primary text_type_paragraph-m",E.menuCard__title),children:t}),a.jsx("img",{src:`/images/menu/${i}.svg`,className:E.menuCard__image})]});var W={};function F(t){if(!t||typeof window>"u")return;const i=document.createElement("style");return i.setAttribute("type","text/css"),i.innerHTML=t,document.head.appendChild(i),t}Object.defineProperty(W,"__esModule",{value:!0});var e=K;function H(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var s=H(e);F(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), transparent);
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const ee=e.forwardRef(function({style:i={},className:B="",autoFill:u=!1,play:m=!0,pauseOnHover:p=!1,pauseOnClick:w=!1,direction:n="left",speed:_=50,delay:L=0,loop:b=0,gradient:I=!1,gradientColor:R="white",gradientWidth:g=200,onFinish:P,onCycleComplete:X,onMount:S,children:v},D){const[k,O]=e.useState(0),[y,Q]=e.useState(0),[x,C]=e.useState(1),[j,T]=e.useState(!1),Z=e.useRef(null),o=D||Z,f=e.useRef(null),h=e.useCallback(()=>{if(f.current&&o.current){const r=o.current.getBoundingClientRect(),N=f.current.getBoundingClientRect();let l=r.width,c=N.width;(n==="up"||n==="down")&&(l=r.height,c=N.height),C(u&&l&&c&&c<l?Math.ceil(l/c):1),O(l),Q(c)}},[u,o,n]);e.useEffect(()=>{if(j&&(h(),f.current&&o.current)){const r=new ResizeObserver(()=>h());return r.observe(o.current),r.observe(f.current),()=>{r&&r.disconnect()}}},[h,o,j]),e.useEffect(()=>{h()},[h,v]),e.useEffect(()=>{T(!0)},[]),e.useEffect(()=>{typeof S=="function"&&S()},[]);const $=e.useMemo(()=>u?y*x/_:y<k?k/_:y/_,[u,k,y,x,_]),G=e.useMemo(()=>Object.assign(Object.assign({},i),{"--pause-on-hover":!m||p?"paused":"running","--pause-on-click":!m||p&&!w||w?"paused":"running","--width":n==="up"||n==="down"?"100vh":"100%","--transform":n==="up"?"rotate(-90deg)":n==="down"?"rotate(90deg)":"none"}),[i,m,p,w,n]),J=e.useMemo(()=>({"--gradient-color":R,"--gradient-width":typeof g=="number"?`${g}px`:g}),[R,g]),A=e.useMemo(()=>({"--play":m?"running":"paused","--direction":n==="left"?"normal":"reverse","--duration":`${$}s`,"--delay":`${L}s`,"--iteration-count":b?`${b}`:"infinite","--min-width":u?"auto":"100%"}),[m,n,$,L,b,u]),q=e.useMemo(()=>({"--transform":n==="up"?"rotate(90deg)":n==="down"?"rotate(-90deg)":"none"}),[n]),z=e.useCallback(r=>[...Array(Number.isFinite(r)&&r>=0?r:0)].map((N,l)=>s.default.createElement(e.Fragment,{key:l},e.Children.map(v,c=>s.default.createElement("div",{style:q,className:"rfm-child"},c)))),[q,v]);return j?s.default.createElement("div",{ref:o,style:G,className:"rfm-marquee-container "+B},I&&s.default.createElement("div",{style:J,className:"rfm-overlay"}),s.default.createElement("div",{className:"rfm-marquee",style:A,onAnimationIteration:X,onAnimationEnd:P},s.default.createElement("div",{className:"rfm-initial-child-container",ref:f},e.Children.map(v,r=>s.default.createElement("div",{style:q,className:"rfm-child"},r))),z(x-1)),s.default.createElement("div",{className:"rfm-marquee",style:A},z(x))):null});var te=W.default=ee;const ne="_cardList_lsryw_1",re="_cardList__link_lsryw_10",ae="_ticker_lsryw_14",ie="_dot_box_lsryw_21",se="_dot_lsryw_21",d={cardList:ne,cardList__link:re,ticker:ae,dot_box:ie,dot:se},le=()=>a.jsxs(a.Fragment,{children:[a.jsx("ul",{className:M(d.cardList),children:V.map((t,i)=>a.jsx("li",{children:a.jsx(U,{className:d.cardList__link,to:t.route,children:a.jsx(Y,{title:t.title,image:t.image})})},i))}),a.jsxs(te,{className:M("full-width",d.ticker),gradient:!1,speed:200,children:[a.jsx("p",{className:`text text_type_ticker text_color_secondary ${d.ticker_text}`,children:"Вдохновлено школами, в которых не учили алгоритмам"}),a.jsx("div",{className:d.dot_box,children:a.jsx("p",{className:d.dot})})]})]});export{le as MainPage};
