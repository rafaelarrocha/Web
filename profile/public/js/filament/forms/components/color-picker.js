var c=(e,t=0,r=1)=>e>r?r:e<t?t:e,n=(e,t=0,r=Math.pow(10,t))=>Math.round(r*e)/r;var nt={grad:360/400,turn:360,rad:360/(Math.PI*2)},F=e=>G(b(e)),b=e=>(e[0]==="#"&&(e=e.substr(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:1}:{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:1}),it=(e,t="deg")=>Number(e)*(nt[t]||1),lt=e=>{let r=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?ct({h:it(r[1],r[2]),s:Number(r[3]),l:Number(r[4]),a:r[5]===void 0?1:Number(r[5])/(r[6]?100:1)}):{h:0,s:0,v:0,a:1}},J=lt,ct=({h:e,s:t,l:r,a:o})=>(t*=(r<50?r:100-r)/100,{h:e,s:t>0?2*t/(r+t)*100:0,v:r+t,a:o}),X=e=>pt(A(e)),Y=({h:e,s:t,v:r,a:o})=>{let s=(200-t)*r/100;return{h:n(e),s:n(s>0&&s<200?t*r/100/(s<=100?s:200-s)*100:0),l:n(s/2),a:n(o,2)}};var d=e=>{let{h:t,s:r,l:o}=Y(e);return`hsl(${t}, ${r}%, ${o}%)`},v=e=>{let{h:t,s:r,l:o,a:s}=Y(e);return`hsla(${t}, ${r}%, ${o}%, ${s})`},A=({h:e,s:t,v:r,a:o})=>{e=e/360*6,t=t/100,r=r/100;let s=Math.floor(e),a=r*(1-t),i=r*(1-(e-s)*t),l=r*(1-(1-e+s)*t),N=s%6;return{r:n([r,i,a,a,l,r][N]*255),g:n([l,r,r,i,a,a][N]*255),b:n([a,a,l,r,r,i][N]*255),a:n(o,2)}},B=e=>{let{r:t,g:r,b:o}=A(e);return`rgb(${t}, ${r}, ${o})`},D=e=>{let{r:t,g:r,b:o,a:s}=A(e);return`rgba(${t}, ${r}, ${o}, ${s})`};var L=e=>{let r=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?G({r:Number(r[1])/(r[2]?100/255:1),g:Number(r[3])/(r[4]?100/255:1),b:Number(r[5])/(r[6]?100/255:1),a:r[7]===void 0?1:Number(r[7])/(r[8]?100:1)}):{h:0,s:0,v:0,a:1}},U=L,q=e=>{let t=e.toString(16);return t.length<2?"0"+t:t},pt=({r:e,g:t,b:r})=>"#"+q(e)+q(t)+q(r),G=({r:e,g:t,b:r,a:o})=>{let s=Math.max(e,t,r),a=s-Math.min(e,t,r),i=a?s===e?(t-r)/a:s===t?2+(r-e)/a:4+(e-t)/a:0;return{h:n(60*(i<0?i+6:i)),s:n(s?a/s*100:0),v:n(s/255*100),a:o}};var O=(e,t)=>{if(e===t)return!0;for(let r in e)if(e[r]!==t[r])return!1;return!0},h=(e,t)=>e.replace(/\s/g,"")===t.replace(/\s/g,""),K=(e,t)=>e.toLowerCase()===t.toLowerCase()?!0:O(b(e),b(t));var Q={},$=e=>{let t=Q[e];return t||(t=document.createElement("template"),t.innerHTML=e,Q[e]=t),t},f=(e,t,r)=>{e.dispatchEvent(new CustomEvent(t,{bubbles:!0,detail:r}))};var m=!1,I=e=>"touches"in e,ut=e=>m&&!I(e)?!1:(m||(m=I(e)),!0),W=(e,t)=>{let r=I(t)?t.touches[0]:t,o=e.el.getBoundingClientRect();f(e.el,"move",e.getMove({x:c((r.pageX-(o.left+window.pageXOffset))/o.width),y:c((r.pageY-(o.top+window.pageYOffset))/o.height)}))},dt=(e,t)=>{let r=t.keyCode;r>40||e.xy&&r<37||r<33||(t.preventDefault(),f(e.el,"move",e.getMove({x:r===39?.01:r===37?-.01:r===34?.05:r===33?-.05:r===35?1:r===36?-1:0,y:r===40?.01:r===38?-.01:0},!0)))},u=class{constructor(t,r,o,s){let a=$(`<div role="slider" tabindex="0" part="${r}" ${o}><div part="${r}-pointer"></div></div>`);t.appendChild(a.content.cloneNode(!0));let i=t.querySelector(`[part=${r}]`);i.addEventListener("mousedown",this),i.addEventListener("touchstart",this),i.addEventListener("keydown",this),this.el=i,this.xy=s,this.nodes=[i.firstChild,i]}set dragging(t){let r=t?document.addEventListener:document.removeEventListener;r(m?"touchmove":"mousemove",this),r(m?"touchend":"mouseup",this)}handleEvent(t){switch(t.type){case"mousedown":case"touchstart":if(t.preventDefault(),!ut(t)||!m&&t.button!=0)return;this.el.focus(),W(this,t),this.dragging=!0;break;case"mousemove":case"touchmove":t.preventDefault(),W(this,t);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":dt(this,t);break}}style(t){t.forEach((r,o)=>{for(let s in r)this.nodes[o].style.setProperty(s,r[s])})}};var S=class extends u{constructor(t){super(t,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:t}){this.h=t,this.style([{left:`${t/360*100}%`,color:d({h:t,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${n(t)}`)}getMove(t,r){return{h:r?c(this.h+t.x*360,0,360):360*t.x}}};var H=class extends u{constructor(t){super(t,"saturation",'aria-label="Color"',!0)}update(t){this.hsva=t,this.style([{top:`${100-t.v}%`,left:`${t.s}%`,color:d(t)},{"background-color":d({h:t.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${n(t.s)}%, Brightness ${n(t.v)}%`)}getMove(t,r){return{s:r?c(this.hsva.s+t.x*100,0,100):t.x*100,v:r?c(this.hsva.v-t.y*100,0,100):Math.round(100-t.y*100)}}};var Z=":host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{display:block;content:'';position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}";var tt="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}";var rt="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}";var T=Symbol("same"),et=Symbol("color"),ot=Symbol("hsva"),R=Symbol("change"),_=Symbol("update"),st=Symbol("parts"),g=Symbol("css"),x=Symbol("sliders"),p=class extends HTMLElement{static get observedAttributes(){return["color"]}get[g](){return[Z,tt,rt]}get[x](){return[H,S]}get color(){return this[et]}set color(t){if(!this[T](t)){let r=this.colorModel.toHsva(t);this[_](r),this[R](t)}}constructor(){super();let t=$(`<style>${this[g].join("")}</style>`),r=this.attachShadow({mode:"open"});r.appendChild(t.content.cloneNode(!0)),r.addEventListener("move",this),this[st]=this[x].map(o=>new o(r))}connectedCallback(){if(this.hasOwnProperty("color")){let t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,r,o){let s=this.colorModel.fromAttr(o);this[T](s)||(this.color=s)}handleEvent(t){let r=this[ot],o={...r,...t.detail};this[_](o);let s;!O(o,r)&&!this[T](s=this.colorModel.fromHsva(o))&&this[R](s)}[T](t){return this.color&&this.colorModel.equal(t,this.color)}[_](t){this[ot]=t,this[st].forEach(r=>r.update(t))}[R](t){this[et]=t,f(this,"color-changed",{value:t})}};var ht={defaultColor:"#000",toHsva:F,fromHsva:X,equal:K,fromAttr:e=>e},y=class extends p{get colorModel(){return ht}};var P=class extends y{};customElements.define("hex-color-picker",P);var mt={defaultColor:"hsl(0, 0%, 0%)",toHsva:J,fromHsva:d,equal:h,fromAttr:e=>e},w=class extends p{get colorModel(){return mt}};var z=class extends w{};customElements.define("hsl-string-color-picker",z);var ft={defaultColor:"rgb(0, 0, 0)",toHsva:U,fromHsva:B,equal:h,fromAttr:e=>e},M=class extends p{get colorModel(){return ft}};var V=class extends M{};customElements.define("rgb-string-color-picker",V);var k=class extends u{constructor(t){super(t,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(t){this.hsva=t;let r=v({...t,a:0}),o=v({...t,a:1}),s=t.a*100;this.style([{left:`${s}%`,color:v(t)},{"--gradient":`linear-gradient(90deg, ${r}, ${o}`}]);let a=n(s);this.el.setAttribute("aria-valuenow",`${a}`),this.el.setAttribute("aria-valuetext",`${a}%`)}getMove(t,r){return{a:r?c(this.hsva.a+t.x):t.x}}};var at=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:'';position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;var C=class extends p{get[g](){return[...super[g],at]}get[x](){return[...super[x],k]}};var gt={defaultColor:"rgba(0, 0, 0, 1)",toHsva:L,fromHsva:D,equal:h,fromAttr:e=>e},E=class extends C{get colorModel(){return gt}};var j=class extends E{};customElements.define("rgba-string-color-picker",j);function xt({isAutofocused:e,isDisabled:t,isLive:r,isLiveDebounced:o,isLiveOnBlur:s,liveDebounce:a,state:i}){return{state:i,init:function(){this.state===null||this.state===""||this.setState(this.state),e&&this.togglePanelVisibility(this.$refs.input),this.$refs.input.addEventListener("change",l=>{this.setState(l.target.value)}),this.$refs.panel.addEventListener("color-changed",l=>{this.setState(l.detail.value),!(s||!(r||o))&&setTimeout(()=>{this.state===l.detail.value&&this.commitState()},o?a:250)}),(r||o||s)&&new MutationObserver(()=>this.isOpen()?null:this.commitState()).observe(this.$refs.panel,{attributes:!0,childList:!0})},togglePanelVisibility:function(){t||this.$refs.panel.toggle(this.$refs.input)},setState:function(l){this.state=l,this.$refs.input.value=l,this.$refs.panel.color=l},isOpen:function(){return this.$refs.panel.style.display==="block"},commitState:function(){JSON.stringify(this.$wire.__instance.canonical)!==JSON.stringify(this.$wire.__instance.ephemeral)&&this.$wire.$commit()}}}export{xt as default};
