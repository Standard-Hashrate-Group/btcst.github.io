(this.webpackJsonp=this.webpackJsonp||[]).push([[5],{1215:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(4),i=n(20),c=n(39);t.a=function(e){var t=Object(c.a)().border;return r.a.createElement(o.a,{style:{height:1,width:"100%",backgroundColor:t,marginTop:e.small?i.g.tiny:i.g.small,marginBottom:e.small?i.g.tiny:i.g.small+i.g.tiny}})}},1216:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(37),i=n(52),c=n(4),l=n(50),s=n(164),u=n(20),d=n(245),m=n(8),b=n.n(m),f=n(10),p=function(e){return r.a.createElement(c.a,b()({},e,{style:[{width:"100%",marginTop:e.noTopMargin?0:"web"===f.a.OS?u.g.large:u.g.normal},e.style]}))},g=n(108),h=n(100),x=n(49),v=n(39),y=function(e){var t=Object(a.useContext)(x.a).darkMode,n=Object(v.a)(),o=n.background,i=n.textLight;return r.a.createElement(h.d,b()({},e,{light:!t,iconColor:t?"white":void 0,style:{backgroundColor:o,borderWidth:1,borderColor:t?"white":i}}))},O=function(){var e=Object(a.useContext)(x.a).darkMode,t=Object(v.a)(),n=t.background,o=t.textLight,i=Object(d.a)("http://twitter.com/BTCST2020","","_blank"),c=Object(d.a)("https://github.com/Standard-Hashrate-Group","","_blank"),l=Object(d.a)("https://btcst.medium.com/","","_blank"),s=Object(d.a)("https://t.me/BTCSTCommunity","","_blank"),u=Object(d.a)("https://discord.com/channels/791170396316893255/791170396765945886","","_blank");return r.a.createElement(g.a,{style:{width:"100%",justifyContent:"center"}},r.a.createElement(y,{type:"github-alt",onPress:c}),r.a.createElement(y,{type:"twitter",onPress:i}),r.a.createElement(y,{type:"medium",onPress:l}),r.a.createElement(y,{type:"telegram",onPress:s}),r.a.createElement(h.b,{type:"material-community",name:"discord",raised:!0,reverse:!0,color:n,reverseColor:e?"white":"#7289da",style:{backgroundColor:n},containerStyle:{borderWidth:1,borderColor:e?"white":o},onPress:u}))},j=n(85),w={us:n(422),uk:n(423),cn:n(424),kr:n(425)},k=function(e){var t=e.name,n=e.locale,a=Object(l.g)(),c=Object(l.h)();return r.a.createElement(i.a,{onPress:function(){a.push(c.pathname+"?locale="+n)},style:{marginHorizontal:4}},r.a.createElement(o.a,{source:w[t],style:{width:30,height:20}}))};t.a=function(){var e=Object(d.a)("https://certik.foundation/","","_blank");return r.a.createElement(p,{noTopMargin:!0},r.a.createElement(c.a,{style:{width:"100%",padding:u.g.normal,alignItems:"center"}},r.a.createElement(i.a,{onPress:e},r.a.createElement(o.a,{source:n(715),style:{width:168,height:40,marginTop:u.g.tiny}})),r.a.createElement(O,null),r.a.createElement(j.a,{note:!0,style:{marginTop:u.g.tiny}},"Built with \u2764\ufe0f by Standard Hashrate (v",s.a.manifest.version,")"),r.a.createElement(g.a,{style:{marginTop:u.g.small}},r.a.createElement(k,{name:"uk",locale:"en"}),r.a.createElement(k,{name:"cn",locale:"zh"}))))}},1217:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(20),i=n(39),c=n(162),l=n(108),s=n(85);t.a=function(e){var t=Object(i.a)().accent;return r.a.createElement(l.a,{style:{alignItems:"flex-end",height:32,marginBottom:e.disabled?0:o.g.small}},r.a.createElement(s.a,{medium:!0,fontWeight:e.fontWeight||"bold",disabled:e.disabled,style:[{flex:1,fontSize:o.d?24:18,paddingBottom:o.g.tiny},e.style]},e.text),e.buttonText&&r.a.createElement(c.a,{type:"clear",size:"small",title:e.buttonText,onPress:e.onPressButton,color:t,buttonStyle:{paddingHorizontal:o.g.tiny}}))}},1218:function(e,t,n){"use strict";n.d(t,"e",(function(){return s})),n.d(t,"d",(function(){return u})),n.d(t,"j",(function(){return d})),n.d(t,"h",(function(){return m})),n.d(t,"g",(function(){return b})),n.d(t,"o",(function(){return f})),n.d(t,"i",(function(){return p})),n.d(t,"n",(function(){return g})),n.d(t,"l",(function(){return h})),n.d(t,"b",(function(){return x})),n.d(t,"c",(function(){return v})),n.d(t,"f",(function(){return y})),n.d(t,"m",(function(){return O})),n.d(t,"a",(function(){return j})),n.d(t,"k",(function(){return w}));var a=n(7),r=n.n(a),o=n(0),i=n(163),c=n(429),l=n(211),s=function(e){var t,n;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,e),a.next=3,r.a.awrap(t.viewAllTimeTotalMined());case 3:return n=a.sent,a.abrupt("return",n);case 5:case"end":return a.stop()}}),null,null,null,Promise)},u=function(e){var t,n;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=Object(l.g)("IBEP20",i.b,e),a.next=3,r.a.awrap(t.balanceOf(i.c));case 3:return n=a.sent,a.abrupt("return",n);case 5:case"end":return a.stop()}}),null,null,null,Promise)},d=function(e){var t,n;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=Object(l.g)("IBEP20",i.b,e),a.next=3,r.a.awrap(t.totalSupply());case 3:return n=a.sent,a.abrupt("return",n);case 5:case"end":return a.stop()}}),null,null,null,Promise)},m=function(e){var t,n;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=Object(l.g)("ISTokenERC20",i.b,e),a.next=3,r.a.awrap(t.getTotalRemainingSupplyLocked());case 3:return n=a.sent,a.abrupt("return",n);case 5:case"end":return a.stop()}}),null,null,null,Promise)},b=function(e,t){var n,a;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n=Object(l.g)("ISTokenERC20",i.b,t),o.next=3,r.a.awrap(n.getFreeToTransferAmount(e));case 3:return a=o.sent,o.abrupt("return",a);case 5:case"end":return o.stop()}}),null,null,null,Promise)},f=function(e,t){var n,a;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,t),o.next=3,r.a.awrap(n.viewUserInfo(e));case 3:return a=o.sent,o.abrupt("return",a);case 5:case"end":return o.stop()}}),null,null,null,Promise)},p=function(){return{enter:Object(o.useCallback)((function(e,t){var n,a,o;return r.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return n=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,t),console.log("before gas limit:"+e),s.next=4,r.a.awrap(n.estimateGas.apiDepositToMining(e));case 4:return a=s.sent,s.t0=console,s.next=8,r.a.awrap(a.toString());case 8:return s.t1=s.sent,s.t2=s.t1+" gas limit",s.t0.log.call(s.t0,s.t2),s.next=13,r.a.awrap(n.apiDepositToMining(e,{gasLimit:a.mul(105).div(100)}));case 13:return o=s.sent,s.abrupt("return",Object(c.a)(o,"stakeActions.enter()",e.toString()));case 15:case"end":return s.stop()}}),null,null,null,Promise)}),[]),leave:Object(o.useCallback)((function(e,t){var n,a,o;return r.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return n=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,t),console.log("before gas limit:"+e),s.next=4,r.a.awrap(n.estimateGas.apiWithdrawLatestSToken(e));case 4:return a=s.sent,s.t0=console,s.next=8,r.a.awrap(a.toString());case 8:return s.t1=s.sent,s.t2=s.t1+" gas limit",s.t0.log.call(s.t0,s.t2),s.next=13,r.a.awrap(n.apiWithdrawLatestSToken(e,{gasLimit:a.mul(105).div(100)}));case 13:return o=s.sent,s.abrupt("return",Object(c.a)(o,"stakeActions.leave()",e.toString()));case 15:case"end":return s.stop()}}),null,null,null,Promise)}),[])}},g=function(e,t){var n,a;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,t),o.next=3,r.a.awrap(n.viewTotalClaimedRewardFrom(e));case 3:return a=o.sent,o.abrupt("return",a);case 5:case"end":return o.stop()}}),null,null,null,Promise)},h=function(e,t){var n,a;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,t),o.next=3,r.a.awrap(n.viewGetTotalRewardBalanceInPool(e));case 3:return a=o.sent,o.abrupt("return",a);case 5:case"end":return o.stop()}}),null,null,null,Promise)},x=function(e,t,n,a){var o,s,u;return r.a.async((function(d){for(;;)switch(d.prev=d.next){case 0:return o=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,a),d.next=3,r.a.awrap(o.estimateGas.apiClaimAmountOfReward(e,t,n));case 3:return s=d.sent,d.next=6,r.a.awrap(o.apiClaimAmountOfReward(e,t,n,{gasLimit:s.mul(120).div(100)}));case 6:return u=d.sent,d.abrupt("return",Object(c.a)(u,"farmActions.apiClaimAmountOfReward()",t.toString()));case 8:case"end":return d.stop()}}),null,null,null,Promise)},v=function(){var e,t,n,a;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,r.a.awrap(fetch("https://584xqc7ik2.execute-api.us-east-2.amazonaws.com/beta/bp-relay"));case 2:return e=o.sent,o.next=5,r.a.awrap(e.json());case 5:if(0==(t=o.sent).code){o.next=8;break}return o.abrupt("return",{code:t.code,msg:t.msg});case 8:return n=t.data.dayList,a=t.data.hourList,o.abrupt("return",{code:0,dayList:n,hourList:a});case 11:case"end":return o.stop()}}),null,null,null,Promise)};function y(){var e,t,n,a,o,i;return r.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,r.a.awrap(fetch("https://584xqc7ik2.execute-api.us-east-2.amazonaws.com/beta/gp-replay"));case 2:return a=c.sent,c.next=5,r.a.awrap(a.json());case 5:return o=c.sent,i=((null==o||null==(e=o.data)?void 0:e.market_pairs)||[]).find((function(e){var t;return e&&"BTCST/USDT"===e.market_pair&&"Binance"===(null==(t=e.exchange)?void 0:t.name)})),c.abrupt("return",(null==i||null==(t=i.quote)||null==(n=t.USD)?void 0:n.price)||0);case 8:case"end":return c.stop()}}),null,null,null,Promise)}var O=function(e,t){var n,a;return r.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,t),o.next=3,r.a.awrap(n.viewRoundSlot(e));case 3:return a=o.sent,o.abrupt("return",a);case 5:case"end":return o.stop()}}),null,null,null,Promise)},j=function(e,t,n){var a,o;return r.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return a=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,n),c.next=3,r.a.awrap(a._roundSlotsReward(e,t));case 3:return o=c.sent,c.abrupt("return",o);case 5:case"end":return c.stop()}}),null,null,null,Promise)},w=function(e){var t,n;return r.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=Object(l.g)("V2FarmWithApiWithUpgrade",i.c,e),console.log(t),a.next=4,r.a.awrap(Promise.all(["_farmStartedTime","_miniStakePeriodInSeconds","_farmDescription"].map((function(e){try{return t.callStatic[e]()}catch(n){return console.log(n),""}}))));case 4:return n=a.sent,a.abrupt("return",{started:n[0],stakePeriod:n[1],desc:n[2]});case 6:case"end":return a.stop()}}),null,null,null,Promise)}},1219:function(e,t,n){"use strict";var a=n(8),r=n.n(a),o=n(9),i=n.n(o),c=n(0),l=n.n(c),s=n(4),u=n(20),d=n(49),m=n(39),b=n(428);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.a=function(e){var t=Object(c.useContext)(d.a).darkMode,n=Object(m.a)(),a=n.backgroundLight,o=n.borderDark,i=Object(b.a)().border;return l.a.createElement(s.a,r()({},e,{style:[p(p({},i({color:t?o:a})),{},{backgroundColor:a,marginTop:u.g.normal+u.g.small,padding:u.g.small+u.g.tiny}),e.style]}))}},1220:function(e,t,n){"use strict";var a=n(9),r=n.n(a),o=n(0),i=n.n(o),c=n(10),l=n(4),s=n(59),u=n(20),d=n(39),m=n(428),b=n(211),f=n(162),p=n(1217),g=n(8),h=n.n(g),x=n(100),v=function(e){var t=Object(d.a)(),n=t.textDark,a=t.textMedium,r=t.textLight,l=e.size||"normal",s=e.color||n,u="small"===l?16:"large"===l?24:20,m=Object(o.useCallback)((function(t){null==e.onChangeText||e.onChangeText(t),null==e.onError||e.onError("");var n=[];""!==t&&e.forbidden&&e.forbidden.forEach((function(e){t.match(e.regexp)&&n.push(e.error)})),""!==t&&e.allowed&&e.allowed.forEach((function(e){t.match(e.regexp)||n.push(e.error)})),n.length>0&&(null==e.onError||e.onError(n.join("\n")))}),[e.onChangeText,e.onError,e.forbidden,e.allowed]);return i.a.createElement(x.c,h()({},e,{inputStyle:[{fontSize:u,fontFamily:"regular",paddingBottom:4,color:s,marginTop:0,minHeight:32},"web"===c.a.OS?{outline:"none"}:{},e.inputStyle],labelStyle:[{color:a},e.labelStyle],placeholderTextColor:e.placeholderTextColor||r,errorStyle:e.onError?{height:0}:e.errorStyle,containerStyle:[{paddingHorizontal:0},e.containerStyle],onChangeText:m}))};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=function(e){var t=Object(d.a)().accent,n=Object(o.useCallback)((function(){if(e.token){var t=e.token.balance;if(Object(b.h)(e.token)){var n=Object(b.k)(16);t=t.gt(n)?t.sub(n):s.ethers.constants.Zero}e.updateAmount(Object(b.d)(t,e.token.decimals))}}),[e.token,e.updateAmount]);return i.a.createElement(l.a,{style:{position:"absolute",right:12,bottom:"web"===c.a.OS?12:24}},i.a.createElement(f.a,{type:"clear",size:"small",color:t,title:e.maxButtonText||(u.d?"MAX "+e.token.symbol:"MAX"),fontWeight:"bold",onPress:n,buttonStyle:{paddingHorizontal:u.g.tiny}}))};t.a=function(e){var t,n,a=Object(m.a)().border,r=Object(o.useCallback)((function(t){if(e.token&&e.onAmountChanged)try{Object(b.j)(t,e.token.decimals),e.onAmountChanged(t)}catch(n){t.endsWith(".")&&t.indexOf(".")===t.length-1&&e.onAmountChanged(t)}}),[e.token,e.onAmountChanged]);return i.a.createElement(l.a,null,e.title&&i.a.createElement(p.a,{text:e.title}),i.a.createElement(l.a,null,i.a.createElement(v,{label:e.label,value:e.amount,onChangeText:r,placeholder:"0.0",keyboardType:"decimal-pad",autoFocus:e.autoFocus||!1,inputStyle:{marginHorizontal:u.g.tiny},inputContainerStyle:{borderBottomWidth:0},labelStyle:{fontFamily:"light",height:e.label?"auto":0},containerStyle:O(O({},a()),{},{paddingHorizontal:u.g.tiny,paddingTop:15,paddingBottom:2})}),(null==(t=e.token)||null==(n=t.balance)?void 0:n.gt(0))&&!e.hideMaxButton&&i.a.createElement(j,{token:e.token,maxButtonText:e.maxButtonText,updateAmount:e.onAmountChanged})))}},1226:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(20),i=n(39),c=n(245),l=n(108),s=n(85);t.a=function(e){var t=Object(i.a)(),n=t.textMedium,a=t.textLight,u=t.placeholder,d=Object(c.a)(e.url||"","","_blank"),m=e.disabled?"N/A":e.text?e.text+(e.suffix?" "+e.suffix:""):"Fetching\u2026";return r.a.createElement(l.a,{style:{justifyContent:"space-between",marginTop:4}},r.a.createElement(s.a,{note:!o.d,fontWeight:"bold",style:{color:e.disabled?u:n}},e.label),r.a.createElement(s.a,{note:!o.d,onPress:e.url?d:void 0,style:{color:e.disabled?u:e.text?n:a,textDecorationLine:e.url?"underline":"none"}},m))}},1234:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(247),i=n(10),c=n(4),l=n(427),s=n(420),u=n(421),d=n(19),m=n.n(d),b=n(51),f=n(1217),p=function(e){var t=Object(b.a)(),n=Object(a.useState)(!0),o=m()(n,2),i=o[0],l=o[1],s=e.expanded&&i,u=s?void 0:t("change");return r.a.createElement(c.a,{style:e.style},r.a.createElement(f.a,{text:e.title,buttonText:u,onPressButton:function(){l(!0),null==e.onExpand||e.onExpand()}}),r.a.createElement(c.a,{style:{display:s?"flex":"none"}},e.children))},g=n(108),h=n(1219),x=n(431),v=n(1226),y=n(85),O=n(143),j=n(1216),w=n(20),k=n(426),S=n(8),E=n.n(S),T=n(7),P=n.n(T),C=n(59),A=n(246),F=n.n(A),B=n(75),L=n(1218),N=n(211),W=n(163),U=C.BigNumber.from(1e8).pow(C.BigNumber.from(4)),M=function(){var e=Object(a.useContext)(B.a),t=e.provider,n=e.signer,r=e.address,o=Object(a.useState)(),i=m()(o,2),c=i[0],l=i[1],s=Object(a.useState)(!0),u=m()(s,2),d=u[0],b=u[1],f=Object(a.useState)(),p=m()(f,2),g=p[0],h=p[1],x=Object(a.useState)(!0),v=m()(x,2),y=v[0],O=v[1],j=Object(a.useState)(),w=m()(j,2),k=w[0],S=w[1],T=Object(a.useState)(!0),A=m()(T,2),M=A[0],I=A[1],D=Object(a.useState)(),z=m()(D,2),R=z[0],H=z[1],_=Object(a.useState)(!0),V=m()(_,2),K=V[0],G=V[1],X=Object(a.useState)(),q=m()(X,2),J=q[0],Z=q[1],$=Object(a.useState)(!0),Y=m()($,2),Q=Y[0],ee=Y[1],te=Object(a.useState)(),ne=m()(te,2),ae=ne[0],re=ne[1],oe=Object(a.useState)(!0),ie=m()(oe,2),ce=ie[0],le=ie[1],se=Object(a.useState)(!0),ue=m()(se,2),de=ue[0],me=ue[1],be=Object(a.useState)(),fe=m()(be,2),pe=fe[0],ge=fe[1],he=Object(a.useState)(""),xe=m()(he,2),ve=xe[0],ye=xe[1],Oe=Object(a.useState)(),je=m()(Oe,2),we=je[0],ke=je[1],Se=Object(a.useState)(),Ee=m()(Se,2),Te=Ee[0],Pe=Ee[1],Ce=Object(a.useState)(),Ae=m()(Ce,2),Fe=Ae[0],Be=Ae[1],Le=Object(a.useState)(!0),Ne=m()(Le,2),We=Ne[0],Ue=Ne[1],Me=Object(a.useState)(),Ie=m()(Me,2),De=Ie[0],ze=Ie[1],Re=Object(a.useState)(),He=m()(Re,2),_e=He[0],Ve=He[1],Ke=Object(a.useState)(),Ge=m()(Ke,2),Xe=Ge[0],qe=Ge[1],Je=Object(a.useState)(!1),Ze=m()(Je,2),$e=Ze[0],Ye=Ze[1],Qe=Object(a.useState)(0),et=m()(Qe,2),tt=et[0],nt=et[1],at={name:"Standard BTC Hashrate Token",address:W.b,decimals:18,symbol:"BTCST",logoURI:"",balance:C.ethers.BigNumber.from(0)};function rt(e,t,n){if(e<t)throw new Error("time < farm started time");var a=Math.round(e-t),r=t+Math.round(a/n)*n;return r<e?r+n:r}return Object(a.useEffect)((function(){ke(at),l(void 0),b(!0),Z(void 0),ee(!0),re(void 0),le(!0),O(!0),I(!0),G(!0),me(!0),ye(""),Ue(!0),ze(void 0),Ve(void 0)}),[r]),F()((function(){var e;return P.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!t||!n){a.next=9;break}return a.prev=1,a.next=4,P.a.awrap(Object(L.k)(t));case 4:e=a.sent,ze({started:e.started.toNumber(),stakePeriod:e.stakePeriod.toNumber(),desc:e.desc}),Ve(rt(Date.now()/1e3,e.started,e.stakePeriod));case 7:return a.prev=7,a.finish(7);case 9:case"end":return a.stop()}}),null,null,[[1,,7,9]],Promise)}),[t,n]),F()((function(){var e,a,r,o,i,c,l,s,u,d;return P.a.async((function(m){for(;;)switch(m.prev=m.next){case 0:if(!(t&&n&&De&&_e)){m.next=46;break}Ue(!0),console.log("farminfo",De),m.prev=3,e=[],a=Date.now()/1e3,Xe&&Xe<a&&Xe>De.started&&(a=Xe-De.stakePeriod),r=0;case 8:if(!(r<5)){m.next=18;break}if(!((o=a-r*De.stakePeriod)<=De.started)){m.next=13;break}return m.abrupt("break",18);case 13:i=rt(o,De.started,De.stakePeriod),e.push(i);case 15:r++,m.next=8;break;case 18:return m.next=20,P.a.awrap(Promise.all(e.map((function(e){try{return Object(L.m)(e,t)}catch(n){return""}}))));case 20:c=m.sent,l=0;case 22:if(!(l<e.length)){m.next=35;break}return c[l]=E()({},c[l],{timeKey:e[l]}),m.next=26,P.a.awrap(Object(L.a)(e[l],W.a,t));case 26:s=m.sent,u=s.rAmount,d=s.rAccumulateAmount,s.rAmount&&(u=s.rAmount.div(U)),s.rAccumulateAmount&&(d=s.rAccumulateAmount.div(U)),c[l]={rewardLastSubmiter:c[l].rewardLastSubmiter,rewardAmount:u,rewardAccumulateAmount:d,totalStaked:c[l].totalStaked,stakedLowestWaterMark:c[l].stakedLowestWaterMark,totalStakedInSlot:c[l].totalStakedInSlot,stakedAddresses:c[l].stakedAddresses,timeKey:e[l]};case 32:l++,m.next=22;break;case 35:Te&&Te.length>0&&(c=Te.concat(c)),e.length>0&&qe(e[e.length-1]),Pe(c),m.next=43;break;case 40:m.prev=40,m.t0=m.catch(3),console.log(m.t0);case 43:return m.prev=43,Ue(!1),m.finish(43);case 46:case"end":return m.stop()}}),null,null,[[3,40,43,46]],Promise)}),[t,n,De,_e]),F()((function(){var e;return P.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return Ye(!0),t.prev=1,t.next=4,P.a.awrap(Object(L.f)());case 4:e=t.sent,nt(e);case 6:return t.prev=6,Ye(!1),t.finish(6);case 9:case"end":return t.stop()}}),null,null,[[1,,6,9]],Promise)}),[]),F()((function(){var e;return P.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(me(!0),!t||!n){a.next=10;break}return a.prev=2,a.next=5,P.a.awrap(Object(L.c)());case 5:0==(e=a.sent).code&&e.dayList&&ge(e.dayList);case 7:return a.prev=7,me(!1),a.finish(7);case 10:case"end":return a.stop()}}),null,null,[[2,,7,10]],Promise)}),[t,n]),F()((function(){var e;return P.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!t||!n){a.next=14;break}return b(!0),a.next=4,P.a.awrap(Object(L.e)(t));case 4:return e=a.sent,a.prev=5,a.t0=l,a.next=9,P.a.awrap(e);case 9:a.t1=a.sent,(0,a.t0)(a.t1);case 11:return a.prev=11,b(!1),a.finish(11);case 14:case"end":return a.stop()}}),null,null,[[5,,11,14]],Promise)}),[t,n]),F()((function(){var e,a;return P.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t||!n){r.next=24;break}return O(!0),I(!0),r.next=5,P.a.awrap(Object(L.j)(t));case 5:return e=r.sent,r.next=8,P.a.awrap(Object(L.h)(t));case 8:return a=r.sent,r.prev=9,r.t0=h,r.next=13,P.a.awrap(e);case 13:return r.t1=r.sent,(0,r.t0)(r.t1),r.t2=S,r.next=18,P.a.awrap(a);case 18:r.t3=r.sent,(0,r.t2)(r.t3);case 20:return r.prev=20,O(!1),I(!1),r.finish(20);case 24:case"end":return r.stop()}}),null,null,[[9,,20,24]],Promise)}),[t,n]),F()((function(){var e,a;return P.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t||!n){r.next=24;break}return O(!0),I(!0),r.next=5,P.a.awrap(Object(L.j)(t));case 5:return e=r.sent,r.next=8,P.a.awrap(Object(L.h)(t));case 8:return a=r.sent,r.prev=9,r.t0=h,r.next=13,P.a.awrap(e);case 13:return r.t1=r.sent,(0,r.t0)(r.t1),r.t2=S,r.next=18,P.a.awrap(a);case 18:r.t3=r.sent,(0,r.t2)(r.t3);case 20:return r.prev=20,O(!1),I(!1),r.finish(20);case 24:case"end":return r.stop()}}),null,null,[[9,,20,24]],Promise)}),[t,n]),F()((function(){var e;return P.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!t||!n){a.next=12;break}return ee(!0),a.prev=2,e=Object(N.g)("ERC20",W.a,n),a.t0=Z,a.next=7,P.a.awrap(e.balanceOf(W.c));case 7:a.t1=a.sent,(0,a.t0)(a.t1);case 9:return a.prev=9,ee(!1),a.finish(9);case 12:case"end":return a.stop()}}),null,null,[[2,,9,12]],Promise)}),[t,n]),F()((function(){var e;return P.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!t||!n){a.next=14;break}return G(!0),a.next=4,P.a.awrap(Object(L.d)(t));case 4:return e=a.sent,a.prev=5,a.t0=H,a.next=9,P.a.awrap(e);case 9:a.t1=a.sent,(0,a.t0)(a.t1);case 11:return a.prev=11,G(!1),a.finish(11);case 14:case"end":return a.stop()}}),null,null,[[5,,11,14]],Promise)}),[t,n]),{totalMinedBTC:c,loadingTotalMined:d,btcInpool:J,loadingBTCInpool:Q,totalStokenSupply:g,loadingTotalStokenSupply:y,totalStokenLocked:k,loadingTotalStokenLocked:M,totalStakedBTCST:R,loadingTotalStaked:K,dayMiningList:pe,loadingMiningStatList:de,yourMiningPower:ae,loadingYourMiningPower:ce,stoken:we,amount:ve,setAmount:ye,loadingDailyRecord:We,selectedRecord:Fe,setSelectedRecord:Be,records:Te,btcstPrice:tt,getPriceLoading:$e}},I=n(1220),D=n(1215),z=function(e){var t,n,a,o,i,c=e.state,l=Object(b.a)(),s=c.totalMinedBTC,u=c.loadingTotalMined,d=c.totalStokenSupply,m=c.totalStokenLocked,f=c.totalStakedBTCST,p=c.btcInpool,g=c.loadingMiningStatList||c.loadingTotalStaked||c.getPriceLoading;if(void 0!=(g||void 0==f?void 0:C.FixedNumber.fromString(Object(N.d)(f.div(C.BigNumber.from(10)),18,8)+"").mulUnsafe(C.FixedNumber.from(c.dayMiningList[0].eachHaveCoin)))&&void 0!=d&&void 0!=f){var x=C.FixedNumber.fromString(Object(N.d)(f.div(C.BigNumber.from(10)),18,8)+""),y=x,j=C.FixedNumber.from(f).divUnsafe(C.FixedNumber.from(d)).subUnsafe(C.FixedNumber.from("0.6"));i=C.FixedNumber.from("1.0"),j.toUnsafeFloat()<0&&(!1,i=(y=C.FixedNumber.from("0.6").mulUnsafe(C.FixedNumber.fromString(Object(N.d)(d.div(C.BigNumber.from(10)),18,8)+""))).divUnsafe(x));var k=C.FixedNumber.from(c.dayMiningList[0].eachHaveCoin),S=C.FixedNumber.from(c.dayMiningList[0].price);console.log("calculate netreward using pric:"+S+" daily btc per TH:"+k+" hashrate:"+y);var E=Object(N.a)(y,k,S),T=E.btc;t=E.usd,a=(n=T).divUnsafe(x).divUnsafe(C.FixedNumber.from(10)),o=t.divUnsafe(x).divUnsafe(C.FixedNumber.from(10))}return r.a.createElement(h.a,null,r.a.createElement(O.a,{text:l("total-mined"),style:{flex:1,fontSize:28,textAlign:"center"}}),r.a.createElement(O.a,{text:u||void 0==s?l("fetching"):Object(N.d)(s,18,8),fontWeight:"light",disabled:u,style:{fontSize:w.d?32:24,textAlign:"center"}}),r.a.createElement(v.a,{label:l("total-btc-still-in-pool"),text:c.loadingBTCInpool||void 0==d?l("fetching"):Object(N.d)(p,18,8),suffix:"",disabled:c.loadingBTCInpool}),r.a.createElement(v.a,{label:l("stoken-total-supply"),text:c.loadingTotalStokenSupply||void 0==d?l("fetching"):Object(N.d)(d,18,8),suffix:"",disabled:c.loadingTotalStokenSupply}),r.a.createElement(v.a,{label:l("stoken-total-locked"),text:c.loadingTotalStokenLocked||void 0==d?l("fetching"):Object(N.d)(m,18,8),suffix:"",disabled:c.loadingTotalStokenLocked}),r.a.createElement(v.a,{label:l("total-staked-btcst"),text:c.loadingTotalStaked||void 0==f?l("fetching"):Object(N.d)(f,18,2),suffix:c.loadingTotalStaked||void 0==f?"":"="+Object(N.d)(f.div(C.BigNumber.from(10)),18,2)+" TH/s",disabled:c.loadingTotalStaked}),r.a.createElement(v.a,{label:l("current-eta-daily-reward"),text:g||void 0==n?l("fetching"):Object(N.d)(n,18,8)+" BTC",suffix:g||void 0==t?l("fetching"):" \u2248 $ "+Object(N.d)(t,18,2),disabled:g}),r.a.createElement(v.a,{label:l("current-eta-daily-boost"),text:g||void 0==i?l("fetching"):Object(N.d)(i,18,2)+" X",suffix:"",disabled:g}),r.a.createElement(v.a,{label:l("current-eta-daily-reward-per-token-btc"),text:g||void 0==a?l("fetching"):Object(N.d)(a,18,8)+" BTC",suffix:"",disabled:g}),r.a.createElement(v.a,{label:l("current-eta-daily-reward-per-token-usd"),text:g||void 0==o?l("fetching"):"$ "+Object(N.d)(o,18,4),suffix:"",disabled:g}),r.a.createElement(v.a,{label:l("apy"),text:g||void 0==o?l("fetching"):0===c.btcstPrice?"-":Object(N.c)(o,C.FixedNumber.fromString(String(c.btcstPrice)))+"%",suffix:"",disabled:g}))},R=function(e){var t,n,a,o=e.state,i=Object(b.a)(),l=o.totalStokenSupply,s=o.totalStakedBTCST,u=void 0==o.amount||""==o.amount||C.FixedNumber.from(o.amount).isZero()||o.loadingMiningStatList;if(!u&&void 0!=l&&void 0!=s){var d=C.FixedNumber.fromString(o.amount).divUnsafe(C.FixedNumber.from(10)),m=!0,p=C.FixedNumber.from(Object(N.d)(s,18,8)+"").addUnsafe(C.FixedNumber.from(o.amount)),g=p.divUnsafe(C.FixedNumber.from(Object(N.d)(l,18,8)+"")).subUnsafe(C.FixedNumber.from("0.6"));a=C.FixedNumber.from("1.0"),g.toUnsafeFloat()<0&&(d=C.FixedNumber.from("0.6").mulUnsafe(C.FixedNumber.fromString(Object(N.d)(l.div(C.BigNumber.from(10)),18,8)+"")),m=!1,console.log("compare:"+p+" hashrate:"+d),a=d.mulUnsafe(C.FixedNumber.from(10)).divUnsafe(p));var x=C.FixedNumber.from(o.dayMiningList[0].eachHaveCoin),O=C.FixedNumber.from(o.dayMiningList[0].price),j=Object(N.a)(d,x,O),k=j.btc,S=j.usd;m?(n=k,t=S):(n=k.divUnsafe(p).mulUnsafe(C.FixedNumber.from(o.amount)),t=S.divUnsafe(p).mulUnsafe(C.FixedNumber.from(o.amount)))}return r.a.createElement(c.a,{style:{marginTop:w.g.large}},r.a.createElement(f.a,{text:i("stake-amount-to-estimates"),style:{marginBottom:0}}),r.a.createElement(y.a,{light:!0,style:{marginTop:0,marginBottom:w.g.tiny}},i("estimate-desc")),r.a.createElement(I.a,{token:o.stoken,amount:o.amount,onAmountChanged:o.setAmount,autoFocus:w.d}),r.a.createElement(h.a,{style:{marginTop:w.g.tiny}},r.a.createElement(v.a,{label:i("estimated-reward-in-btc"),text:u?i("n/a"):Object(N.d)(n,18,8),suffix:"BTC",disabled:u}),r.a.createElement(v.a,{label:i("estimated-reward-in-usd"),text:u?i("n/a"):Object(N.d)(t,18,2),suffix:"USD",disabled:u}),r.a.createElement(v.a,{label:i("estimated-boost-times"),text:u?i("n/a"):Object(N.d)(a,18,2),suffix:"X",disabled:u})))},H=function(){var e=M(),t=Object(b.a)();return r.a.createElement(c.a,{style:{marginTop:w.g.large}},r.a.createElement(p,{title:t("pool-daily-mined-history"),expanded:!0,onExpand:function(){}},r.a.createElement(_,{loadingDailyRecord:e.loadingDailyRecord,records:e.records,recordItem:K})))},_=function(e){var t=Object(b.a)(),n=Object(a.useCallback)((function(t){var n=t.item;return r.a.createElement(e.recordItem,{key:n.timeKey,record:n})}),[]),i=Object(a.useMemo)((function(){return(e.records||[]).sort((function(e,t){return(t.timeKey||0)-(e.timeKey||0)}))}),[e.records]);return e.loadingDailyRecord||!e.records?r.a.createElement(x.a,null):0===i.length?r.a.createElement(V,null):r.a.createElement(c.a,null,r.a.createElement(g.a,{style:{alignItems:"center",paddingHorizontal:w.g.tiny,paddingVertical:4}},r.a.createElement(c.a,{style:{flex:1,alignItems:"flex-start"}},r.a.createElement(y.a,{caption:!0,numberOfLines:1,fontWeight:"light"},t("deposited-rewards"))),r.a.createElement(c.a,null,r.a.createElement(y.a,{caption:!0,numberOfLines:1,style:{marginLeft:w.g.small}},t("staked-btcsts"))),r.a.createElement(c.a,{style:{flex:1,alignItems:"flex-end"}},r.a.createElement(y.a,{caption:!0,fontWeight:"light"},t("date")))),r.a.createElement(o.a,{keyExtractor:function(e){return e.timeKey.toString()},data:i,renderItem:n,ItemSeparatorComponent:function(){return r.a.createElement(D.a,{small:!0})}}))},V=function(){var e=Object(b.a)();return r.a.createElement(c.a,{style:{margin:w.g.normal}},r.a.createElement(y.a,{disabled:!0,style:{textAlign:"center",width:"100%"}},e("empty-staking-records")))},K=function(e){var t=e.record,n=t.rewardAmount,a=t.stakedLowestWaterMark;return r.a.createElement(g.a,{style:{alignItems:"center",paddingHorizontal:w.g.tiny,paddingVertical:4}},r.a.createElement(c.a,{style:{flex:1,alignItems:"flex-start"}},r.a.createElement(y.a,{caption:!0,numberOfLines:1,fontWeight:"light",disabled:!1},n.gt(C.BigNumber.from(0))?Object(N.d)(n||0):"N/A")),r.a.createElement(c.a,null,r.a.createElement(y.a,{caption:!0,numberOfLines:1,style:{marginLeft:w.g.small},disabled:!1},a.gt(C.BigNumber.from(0))?Object(N.d)(a||0,18,2):"N/A")),r.a.createElement(c.a,{style:{flex:1,alignItems:"flex-end"}},r.a.createElement(y.a,{caption:!0,fontWeight:"light",disabled:!1},Object(N.f)(t.timeKey))))};t.default=function(){var e=Object(b.a)(),t=M();return r.a.createElement(k.a,null,r.a.createElement(s.a,null,r.a.createElement(l.a,null),r.a.createElement(u.a,null,r.a.createElement(O.a,{text:e("farm-stats")}),r.a.createElement(y.a,{light:!0},e("pool-history-desc")),r.a.createElement(z,{state:t}),r.a.createElement(R,{state:t}),r.a.createElement(H,null)),"web"===i.a.OS&&r.a.createElement(j.a,null)))}}}]);
//# sourceMappingURL=5.5c356f34.chunk.js.map