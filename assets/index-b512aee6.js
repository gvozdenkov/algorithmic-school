var A=Object.defineProperty;var F=(s,t,i)=>t in s?A(s,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[t]=i;var c=(s,t,i)=>(F(s,typeof t!="symbol"?t+"":t,i),i);import{r as l,j as n,I as H,c as I}from"./index-fef9e21c.js";import{S as P,B as m,s as b,a as E}from"./sleep-2d836259.js";import{H as N}from"./element-captions-6dbe28ed.js";import{u as V,C as $}from"./use-fucus-fee32e23.js";class B{constructor(t){c(this,"stack",[]);c(this,"size",0);c(this,"getSize",()=>this.stack.length);c(this,"getStack",()=>this.stack);c(this,"clearStack",()=>this.stack=[]);c(this,"push",t=>this.getSize()<this.size?this.stack.push(t):null);c(this,"pop",()=>this.getSize()?this.stack.pop():void 0);c(this,"peak",()=>this.stack[this.getSize()-1]||null);this.size=t}}const M="_form_16k91_1",O="_form__input_16k91_10",Y="_resultList_16k91_15",q="_circle_invisible_16k91_24",G="_clearBtn_16k91_28",J="_addBtn_16k91_32",K="_deleteBtn_16k91_36",r={form:M,form__input:O,resultList:Y,circle_invisible:q,clearBtn:G,addBtn:J,deleteBtn:K},g=10,st=()=>{const[s,t]=l.useState(""),[i,u]=l.useState([]),[v,d]=l.useState([]),[C,j]=l.useState(!1),[S,k]=l.useState("idle"),[R,h]=V(),o=l.useRef(new B(g)).current,e=l.useRef(new B(g)).current,_=o.getStack().length,f=S!=="idle",L=!s||_>=g,x=f||_===0,z=a=>{t(a.currentTarget.value)},T=async a=>{a.preventDefault(),k("addToHead"),j(!0),o.push(s),e.push("changing"),u(o.getStack()),d(e.getStack()),t(""),await b(E),u(o.getStack()),e.pop(),e.push("default"),d(e.getStack()),k("idle"),h()},w=async()=>{k("removeFromTail"),u(o.getStack()),e.pop(),e.push("changing"),d(e.getStack()),await b(300),o.pop(),e.pop(),d(e.getStack()),u(o.getStack()),k("idle"),h()},y=()=>{o.clearStack(),e.clearStack(),u([]),d([]),h()},D=a=>a===_-1&&N;return n.jsxs(P,{title:"Стек",children:[n.jsxs("form",{className:r.form,onSubmit:a=>void T(a),children:[n.jsx(H,{value:s,maxLength:3,isLimitText:!0,onChange:z,disabled:f,extraClass:r.form__input,autoComplete:"off",ref:R,autoFocus:!0,"data-test":"input"}),n.jsx(m,{text:"Добавить",isLoader:S==="addToHead",disabled:L,type:"submit",extraClass:r.addBtn,"data-test":"add-btn"}),n.jsx(m,{text:"Удалить",isLoader:S==="removeFromTail",onClick:()=>void w(),disabled:x,type:"button",extraClass:r.deleteBtn,"data-test":"remove-btn"}),n.jsx(m,{text:"Очистить",type:"button",onClick:y,disabled:x,extraClass:r.clearBtn,"data-test":"clear-btn"})]}),C&&n.jsx("ul",{className:I(r.resultList),children:i.map((a,p)=>n.jsx("li",{children:n.jsx($,{letter:a,index:p,state:v[p],head:D(p),"data-test":`circle-${p}`})},p))})]})};export{st as StackPage};
