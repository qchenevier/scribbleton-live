(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{229:function(e,t,n){var content=n(249);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(45).default)("5aab00b3",content,!0,{sourceMap:!1})},245:function(e,t,n){"use strict";var r=n(5),o=n(26),l=n(27),c=n(144),f=n(78),d=n(9),y=n(57).f,v=n(58).f,m=n(12).f,h=n(246).trim,k="Number",w=r.Number,A=w,E=w.prototype,N=l(n(101)(E))==k,I="trim"in String.prototype,C=function(e){var t=f(e,!1);if("string"==typeof t&&t.length>2){var n,r,o,l=(t=I?t.trim():h(t,3)).charCodeAt(0);if(43===l||45===l){if(88===(n=t.charCodeAt(2))||120===n)return NaN}else if(48===l){switch(t.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+t}for(var code,c=t.slice(2),i=0,d=c.length;i<d;i++)if((code=c.charCodeAt(i))<48||code>o)return NaN;return parseInt(c,r)}}return+t};if(!w(" 0o1")||!w("0b1")||w("+0x1")){w=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof w&&(N?d((function(){E.valueOf.call(n)})):l(n)!=k)?c(new A(C(t)),n,w):C(t)};for(var S,x=n(8)?y(A):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_=0;x.length>_;_++)o(A,S=x[_])&&!o(w,S)&&m(w,S,v(A,S));w.prototype=E,E.constructor=w,n(16)(r,k,w)}},246:function(e,t,n){var r=n(4),o=n(36),l=n(9),c=n(247),f="["+c+"]",d=RegExp("^"+f+f+"*"),y=RegExp(f+f+"*$"),v=function(e,t,n){var o={},f=l((function(){return!!c[e]()||"​"!="​"[e]()})),d=o[e]=f?t(m):c[e];n&&(o[n]=d),r(r.P+r.F*f,"String",o)},m=v.trim=function(e,t){return e=String(o(e)),1&t&&(e=e.replace(d,"")),2&t&&(e=e.replace(y,"")),e};e.exports=v},247:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},248:function(e,t,n){"use strict";n(229)},249:function(e,t,n){var r=n(44)(!1);r.push([e.i,"[data-v-9e573ac2] .box.borderless{box-shadow:unset;margin-left:0;margin-top:0;margin-bottom:0;margin-right:1.5rem;background-color:unset}\n",""]),e.exports=r},256:function(e,t,n){"use strict";n.r(t);var r={components:{KeyPress:n(258).a},props:{isPlaying:{default:!1},isLoading:{default:!1},isAutoReplay:{default:!1},songName:{default:void 0}}},o=(n(248),n(32)),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("div",[t("KeyPress",{attrs:{"key-event":"keydown","key-code":32,modifiers:["shiftKey"]},on:{success:function(t){e.isLoading||e.$emit("toggleVariable","isPlaying")}}}),e._v(" "),t("div",{staticClass:"container is-fluid"},[t("div",{staticClass:"columns",staticStyle:{"margin-bottom":"-1.7rem"}},[t("div",{staticClass:"column is-narrow"},[t("div",{staticClass:"box borderless"},[t("b-tooltip",{attrs:{label:"Song name, used to compute JSON file name when saving.",delay:1e3,type:"is-link",position:"is-bottom",multilined:""}},[t("b-input",{attrs:{value:e.songName,placeholder:"Song name",rounded:""},nativeOn:{change:function(t){return e.$emit("update:songName",t.target.value)}}})],1)],1)]),e._v(" "),t("div",{staticClass:"column is-narrow"},[t("div",{staticClass:"box borderless"},[t("b-tooltip",{staticClass:"custom-tooltip",attrs:{position:"is-bottom",label:"Play/Pause\n(shift+space)",delay:1e3,type:"is-link",multilined:"",size:"is-small"}},[t("b-button",{attrs:{rounded:"",type:this.isPlaying?"is-dark":"is-link",loading:this.isLoading,"icon-left":this.isPlaying?"pause":"play"},on:{click:function(t){return e.$emit("toggleVariable","isPlaying")}}})],1),e._v(" "),t("b-tooltip",{attrs:{position:"is-bottom",label:"Auto-replay audio after being paused for prerendering",delay:1e3,type:"is-link",multilined:"",size:"is-small"}},[t("b-button",{attrs:{rounded:"",type:this.isAutoReplay?"is-link":"",outlined:"","icon-left":"step-forward"},on:{click:function(t){return e.$emit("toggleVariable","isAutoReplay")}}})],1),e._v(" "),t("b-tooltip",{attrs:{label:"Add a new scribbletune channel with a random name",delay:1e3,type:"is-link",position:"is-top",multilined:""}},[t("b-button",{attrs:{rounded:"","icon-left":"plus"},on:{click:function(t){return e.$emit("addChannel")}}},[e._v("\n              Add channel\n            ")])],1)],1)])])])],1)}),[],!1,null,"9e573ac2",null);t.default=component.exports},258:function(e,t,n){"use strict";var r=n(17);n(245),n(38),n(11),n(14),n(21),n(37),n(33),n(34);function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,f=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){f=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(f)throw o}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var c=["altKey","metaKey","ctrlKey","shiftKey"],f={props:{keyEvent:{type:String,default:"keyup"},keyCode:{type:Number,default:null},modifiers:{type:Array,default:function(){return[]}},preventDefault:{type:Boolean},multipleKeys:{type:Array,default:function(){return[]}}},data:function(){return{keyListeners:[]}},mounted:function(){this.setupListeners()},destroyed:function(){var e,t=o(this.keyListeners);try{for(t.s();!(e=t.n()).done;){var n=e.value,r=n.keyEvent,l=n.listener;window.removeEventListener(r,l)}}catch(e){t.e(e)}finally{t.f()}},methods:{setupListeners:function(){var e={keyEvent:this.keyEvent,keyCode:this.keyCode,preventDefault:this.preventDefault,modifiers:this.modifiers,multipleKeys:this.multipleKeys};this.addEventListener(e)},addEventListener:function(e){var t=this.eventHandler(e);window.addEventListener(e.keyEvent,t),this.keyListeners.push({expectedEvent:e,listener:t})},eventHandler:function(e){var t=this;return function(n){var l=function(r,o){t.$emit(r,{event:n,expectedEvent:e,message:o})};l("any","Any key was pressed.");var f=e.multipleKeys.length>0;if(!e.keyCode&&!f)l("success","Any key was pressed.");else{var d=[e];f&&(d=e.multipleKeys);var y,v=o(d);try{var m=function(){var t=y.value;if(!(t.keyCode===n.keyCode))return"continue";if(t.modifiers.length>0&&!c.every((function(e){return n[e]==(-1!==t.modifiers.indexOf(e))})))return"continue";return e.preventDefault&&n.preventDefault(),l("success","Correct key(s) pressed."),{v:void 0}};for(v.s();!(y=v.n()).done;){var h=m();if("continue"!==h&&"object"===Object(r.a)(h))return h.v}}catch(e){v.e(e)}finally{v.f()}l("wrong","Wrong key(s) pressed.")}}}},render:function(){return null}},d=n(32),component=Object(d.a)(f,undefined,undefined,!1,null,null,null);t.a=component.exports}}]);