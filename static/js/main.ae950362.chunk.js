(this["webpackJsonpgeolonia-pwa"]=this["webpackJsonpgeolonia-pwa"]||[]).push([[0],{125:function(e){e.exports=JSON.parse('{"title":"\u901a\u5b66\u8def\u5b89\u5168\u30de\u30c3\u30d7 ","description":"\u901a\u5b66\u8def\u5b89\u5168\u30de\u30c3\u30d7\u306e\u8aac\u660e","form_url":"","logo_image_url":"https://raw.githubusercontent.com/watsuyo/school-route-safety-map/master/public/logo.jpg","background_image_url":"","primary_color":"#f5b041","orderby":"distance"}')},203:function(e,t,n){},210:function(e,t,n){},211:function(e,t,n){},232:function(e,t,n){},233:function(e,t,n){},234:function(e,t,n){},247:function(e,t,n){},248:function(e,t,n){},249:function(e,t,n){},253:function(e,t,n){},276:function(e,t,n){},277:function(e,t,n){},278:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(36),s=n.n(c),o=n(35),i=n(50),u=n(7),l=n(31),d=n(25),p=n.n(d),j=n(23),b=(n(203),n(152)),h=n.n(b),f=function(e){var t={type:"FeatureCollection",features:[]};for(var n in e){var a=e[n];if(!a["\u7d4c\u5ea6"]||!a["\u7def\u5ea6"]||!a["\u30b9\u30dd\u30c3\u30c8\u540d"])return;for(var r={type:"Feature",geometry:{type:"Point",coordinates:[Number(a["\u7d4c\u5ea6"]),Number(a["\u7def\u5ea6"])]},properties:{_id:n}},c=0;c<Object.keys(a).length;c++){var s=Object.keys(a)[c];r.properties[s]=a[s]}t.features.push(r)}return t},x=function(e){e.addLayer({id:"clusters",type:"circle",source:"shops",filter:["has","point_count"],paint:{"circle-radius":20,"circle-color":"#FF0000","circle-opacity":1}}),e.addLayer({id:"cluster-count",type:"symbol",source:"shops",filter:["has","point_count"],paint:{"text-color":"#FFFFFF"},layout:{"text-field":"{point_count_abbreviated} \u4ef6","text-size":12,"text-font":["Noto Sans Regular"]}}),e.on("click","clusters",(function(t){var n=e.queryRenderedFeatures(t.point,{layers:["clusters"]}),a=n[0].properties.cluster_id;e.getSource("shops").getClusterExpansionZoom(a,(function(t,a){t||e.easeTo({center:n[0].geometry.coordinates,zoom:a})}))})),e.on("mouseenter","clusters",(function(){e.getCanvas().style.cursor="pointer"})),e.on("mouseleave","clusters",(function(){e.getCanvas().style.cursor=""}))},m=(n(210),function(e){var t="";return"number"!==typeof e||Number.isNaN(e)||(t=e>1e3?Math.round(e/1e3)+" km":Math.round(e)+" m"),t}),O=(n(211),n(3)),v=function(){return Object(O.jsx)("div",{className:"head",children:Object(O.jsx)("p",{children:"\u901a\u5b66\u8def\u5b89\u5168\u30de\u30c3\u30d7"})})},g=n(63),w=n.n(g),y="https://script.googleapis.com/v1/scripts/".concat("AKfycbwnv-EH1C95J6wSjfRpV28c3D-WE80NR2KVD-edX7zJauR0AYVZN95wXZfNxOsopZWq",":run"),k=function(){var e=Object(l.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N();case 2:return t=e.sent,e.abrupt("return",{Authorization:"Bearer ".concat(t)});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(l.a)(p.a.mark((function e(){var t,n,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={client_id:"430416577043-vaudgfur0pdk5qqc1bmrfchuuf5cgkcv.apps.googleusercontent.com",client_secret:"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",refresh_token:"1//0ejQEdwBJDx_uCgYIARAAGA4SNwF-L9Irw8w44X-7S4kYaW84_Ra2ae7t8f0KdwmOsVUB9QjOCpJZWxaPaIp7bsfkio69JR0ebFA",grant_type:"refresh_token"},e.next=3,w.a.post("https://oauth2.googleapis.com/token",t);case 3:if(200===(n=e.sent).status&&n.data){e.next=6;break}throw new Error("Failed to get access token.");case 6:return a=n.data.access_token,e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(l.a)(p.a.mark((function e(t,n){var a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={function:"postUserPost",parameters:t},e.next=4,k();case 4:return r=e.sent,e.next=7,w.a.create({headers:r});case 7:return c=e.sent,e.next=10,c.post(y,a);case 10:if(!e.sent.data.response["@type"].includes("error")){e.next=15;break}throw new Error;case 15:n("/?success");case 16:e.next=22;break;case 18:throw e.prev=18,e.t0=e.catch(0),console.error(e.t0),e.t0;case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t,n){return e.apply(this,arguments)}}(),F=function(){var e=Object(l.a)(p.a.mark((function e(){var t,n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={function:"getSafetyData"},e.next=4,k();case 4:return n=e.sent,e.next=7,w.a.create({headers:n});case 7:return a=e.sent,e.next=10,a.post(y,t);case 10:if(!(r=e.sent).data.response["@type"].includes("error")){e.next=15;break}throw new Error;case 15:return e.abrupt("return",r.data.response.result);case 16:e.next=22;break;case 18:throw e.prev=18,e.t0=e.catch(0),console.error(e.t0),e.t0;case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(l.a)(p.a.mark((function e(t){var n,a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={function:"postLike",parameters:t},e.next=4,k();case 4:return a=e.sent,e.next=7,w.a.create({headers:a});case 7:return r=e.sent,e.next=10,r.post(y,n);case 10:if(!(c=e.sent).data.response["@type"].includes("error")){e.next=15;break}throw new Error;case 15:return e.abrupt("return",c.data.response.result);case 16:e.next=22;break;case 18:throw e.prev=18,e.t0=e.catch(0),console.error(e.t0),e.t0;case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t){return e.apply(this,arguments)}}(),_=function(){var e=Object(l.a)(p.a.mark((function e(t){var n,a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={function:"postUnlike",parameters:t},e.next=4,k();case 4:return a=e.sent,e.next=7,w.a.create({headers:a});case 7:return r=e.sent,e.next=10,r.post(y,n);case 10:if(!(c=e.sent).data.response["@type"].includes("error")){e.next=15;break}throw new Error;case 15:return e.abrupt("return",c.data.response.result);case 16:e.next=22;break;case 18:throw e.prev=18,e.t0=e.catch(0),console.error(e.t0),e.t0;case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t){return e.apply(this,arguments)}}(),E=n(394),M=function(e){var t=Object(a.useRef)(null),n=Object(a.useState)(null),r=Object(u.a)(n,2),c=r[0],s=r[1],i=Object(a.useState)(0),d=Object(u.a)(i,2),j=d[0],b=d[1],h=Object(a.useState)(!1),f=Object(u.a)(h,2),x=f[0],g=f[1],w=Object(a.useState)(!1),y=Object(u.a)(w,2),k=y[0],N=y[1],S=e.shop,F=function(){e.close(),t.current&&(t.current.remove(),c.remove())};Object(a.useEffect)((function(){if(t.current){var e=new window.geolonia.Map({container:t.current,interactive:!1,zoom:14,style:"geolonia/gsi"});s(e),g(!!localStorage.getItem("like:".concat(S.index)))}}),[S,t]);var M,L=m(S.distance),P=S["\u30ab\u30c6\u30b4\u30ea"],W=S["\u7d39\u4ecb\u6587"],A=function(){var e=Object(l.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N(!0),e.next=3,C({index:S.index});case 3:t=e.sent,b(t),localStorage.setItem("like:".concat(S.index),"true"),g(!0),N(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=function(){var e=Object(l.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N(!0),e.next=3,_({index:S.index});case 3:t=e.sent,b(t),localStorage.removeItem("like:".concat(S.index)),g(!1),N(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:"shop-single",children:[Object(O.jsx)(v,{}),Object(O.jsxs)("div",{className:"shop-container",children:[Object(O.jsx)("div",{className:"back",children:Object(O.jsx)("button",{onClick:F,children:"< \u623b\u308b"})}),S?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("h2",{children:S["\u30b9\u30dd\u30c3\u30c8\u540d"]}),Object(O.jsxs)("div",{style:{margin:"0 0 12px 0"},children:[Object(O.jsx)("span",{className:"nowrap",children:Object(O.jsx)(o.b,{to:"/list?category=".concat(P),children:Object(O.jsx)("span",{onClick:F,className:"category",children:P})})}),Object(O.jsx)("span",{className:"nowrap",children:L&&Object(O.jsxs)("span",{className:"distance",children:["\u73fe\u5728\u4f4d\u7f6e\u304b\u3089 ",L]})})]}),0===S["\u3044\u3044\u306d\u6570"]||S["\u3044\u3044\u306d\u6570"]>0?Object(O.jsxs)("div",{style:{display:"flex"},children:[k?Object(O.jsx)(E.a,{}):Object(O.jsx)("img",{src:x?"thumb-up.png":"thumb-up-outline.png",alt:"\u3044\u3044\u306d",width:"28px",className:"like-button",onClick:x?R:A}),Object(O.jsx)("p",{style:{margin:"2px"},children:j||S["\u3044\u3044\u306d\u6570"]})]}):Object(O.jsx)(O.Fragment,{}),Object(O.jsx)("p",{style:{margin:"24px 0",wordBreak:"break-all"},children:(M=W,M.split(/(\r\n)|(\n)|(\r)/g).map((function(e,t){var n="";return"\r\n"===e||"\n"===e||"\r"===e?n=Object(O.jsx)("br",{},t):void 0!==e&&(n=e),n})))}),Object(O.jsx)("div",{ref:t,style:{width:"100%",height:"200px",marginTop:"24px"},"data-lat":S["\u7def\u5ea6"],"data-lng":S["\u7d4c\u5ea6"],"data-navigation-control":"off"})]}):Object(O.jsx)(O.Fragment,{})]})]})},L={width:"100%",height:"100%",position:"relative"},P=function(e){for(var t=["poi","poi-primary","poi-r0-r9","poi-r10-r24","poi-r25","poi-bus","poi-entrance"],n=0;n<t.length;n++){var a=t[n];e.setLayoutProperty(a,"visibility","none")}},W=function(e){var t=(e||window.location).hash.substring(2);return new URLSearchParams(t)},A=function(e){var t=r.a.useRef(null),n=r.a.useState(),a=Object(u.a)(n,2),c=a[0],s=a[1],o=r.a.useState(void 0),i=Object(u.a)(o,2),l=i[0],d=i[1],p=Object(u.a)(e.useZLatLngString,2),j=p[0],b=p[1];r.a.useEffect((function(){!function(e,t){e&&t&&e.on("render",(function(){if(!e.getSource("shops")){P(e);var n=f(t);e.addSource("shops",{type:"geojson",data:n,cluster:!0,clusterMaxZoom:14,clusterRadius:25}),e.addLayer({id:"shop-points",type:"circle",source:"shops",filter:["all",["==","$type","Point"]],paint:{"circle-radius":13,"circle-color":"#FF0000","circle-opacity":.4,"circle-stroke-width":2,"circle-stroke-color":"#FFFFFF","circle-stroke-opacity":1}}),e.addLayer({id:"shop-symbol",type:"symbol",source:"shops",filter:["all",["==","$type","Point"]],paint:{"text-color":"#000000","text-halo-color":"#FFFFFF","text-halo-width":2},layout:{"text-field":"{\u30b9\u30dd\u30c3\u30c8\u540d}","text-font":["Noto Sans Regular"],"text-variable-anchor":["top","bottom","left","right"],"text-radial-offset":.5,"text-justify":"auto","text-size":12,"text-anchor":"top","text-max-width":12,"text-allow-overlap":!1}}),e.on("mouseenter","shop-points",(function(){e.getCanvas().style.cursor="pointer"})),e.on("mouseleave","shop-points",(function(){e.getCanvas().style.cursor=""})),e.on("mouseenter","shop-symbol",(function(){e.getCanvas().style.cursor="pointer"})),e.on("mouseleave","shop-symbol",(function(){e.getCanvas().style.cursor=""})),e.on("click","shop-points",(function(e){e.features[0].properties.cluster||d(e.features[0].properties)})),e.on("click","shop-symbol",(function(e){e.features[0].properties.cluster||d(e.features[0].properties)})),x(e)}}))}(c,e.data)}),[c,e.data]),r.a.useEffect((function(){var e,t=W();j&&t.set("map",j),(e=t).toString()&&(window.location.hash="#/?".concat(e.toString().replace(/%2F/g,"/")))}),[j]),r.a.useEffect((function(){if(t.current&&!c){var n=window.geolonia,a=f(e.data),r=h()(a),o=new n.Map({container:t.current,style:"geolonia/gsi",bounds:r,fitBoundsOptions:{padding:50}}),i=W();if(i&&i.get("map")){var u=(i.get("map")||"").split("/"),l=u[0],d=u[1],p=u[2];o.flyTo({center:[p,d],zoom:l})}else r&&o.fitBounds(r,{padding:50});var j=function(){P(o),s(o),o.on("moveend",(function(){var e=o.getCenter(),t=o.getZoom(),n=Math.round(100*t)/100,a=Math.ceil((n*Math.LN2+Math.log(512/360/.5))/Math.LN10),r=Math.pow(10,a),c=Math.round(e.lng*r)/r,s=Math.round(e.lat*r)/r,i=Math.ceil(n);b("".concat(i,"/").concat(s,"/").concat(c))}))},x=function(){o.resize()};return o.on("load",j),window.addEventListener("orientationchange",x),function(){window.removeEventListener("orientationchange",x),o.off("load",j)}}}));return Object(O.jsxs)("div",{style:L,children:[Object(O.jsx)(v,{}),Object(O.jsx)("div",{ref:t,style:L,"data-geolocate-control":"on","data-marker":"on","data-gesture-handling":"on"}),l?Object(O.jsx)(M,{shop:l,close:function(){d(void 0)}}):Object(O.jsx)(O.Fragment,{})]})},R=(n(232),n(384)),D=Object(a.lazy)((function(){return(e=1e3,new Promise((function(t){return setTimeout(t,e)}))).then((function(){return Promise.all([n.e(3),n.e(4)]).then(n.bind(null,404))}));var e})),B=function(e){var t=Object(j.e)(),n=r.a.useState(""),c=r.a.useState(!1),s=Object(u.a)(c,2),i=s[0],l=s[1];return Object(O.jsxs)("div",{className:"home-container",children:[Object(O.jsx)(o.b,{to:"/post?".concat(n[0]),children:i?Object(O.jsx)(R.a,{className:"center",title:"\u3053\u306e\u4f4d\u7f6e\u306b\u8981\u671b\u3092\u6295\u7a3f",placement:"top",arrow:!0,open:!0,children:Object(O.jsx)("div",{children:Object(O.jsx)("img",{src:"map-pin.png",alt:"map pin",className:"map-pin"})})}):""}),Object(O.jsx)(A,{data:e.data,useZLatLngString:n}),Object(O.jsx)("button",{className:"map-pin-button",onClick:function(){return l(!i)},children:Object(O.jsx)("img",{className:"map-pin-button__plus-math",src:"".concat(i?"multiply":"plus-math",".png"),alt:"plus math"})}),Object(O.jsx)(a.Suspense,{fallback:"",children:t.search.includes("success")?Object(O.jsx)(D,{}):""})]})},Y=n(18),z=n(155),J=(n(233),function(e){var t=function(){e.popupHandler(e.data)},n=m(e.data.distance),a=e.data["\u30ab\u30c6\u30b4\u30ea"];return Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)("div",{className:"shop-link",children:[Object(O.jsx)("h2",{className:"shop-title",style:{wordBreak:"break-all"},onClick:t,children:e.data["\u30b9\u30dd\u30c3\u30c8\u540d"]}),Object(O.jsxs)("div",{className:"tag-box",children:[Object(O.jsx)("span",{className:"nowrap",children:Object(O.jsx)(o.b,{to:"/list?category=".concat(a),children:Object(O.jsx)("span",{className:"category",children:a})})}),Object(O.jsx)("span",{className:"nowrap",children:n&&Object(O.jsxs)("span",{className:"distance",children:["\u73fe\u5728\u4f4d\u7f6e\u304b\u3089 ",n]})})]}),Object(O.jsx)("div",{style:{margin:"10px 10px 10px 0"}}),Object(O.jsx)("div",{className:"right",onClick:t,children:Object(O.jsx)(z.a,{size:"40px",color:"#CCCCCC"})})]})})}),T=(n(234),n(156)),I=n(110),Z=n(164),H=function(){var e=Object(l.a)(p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,t){window.navigator.geolocation&&window.navigator.geolocation.getCurrentPosition||e(null),window.navigator.geolocation.getCurrentPosition((function(t){var n=t.coords.latitude,a=t.coords.longitude;e([a,n])}),(function(t){e(null)}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})}));case 2:if(!(n=e.sent)){e.next=10;break}return a=I.point(n),(r=t.map((function(e){var t=parseFloat(e["\u7d4c\u5ea6"]),n=parseFloat(e["\u7def\u5ea6"]);if(Number.isNaN(t)||Number.isNaN(n))return e;var r=I.point([t,n]),c=I.distance(a,r,{units:"meters"});return Object(i.a)(Object(i.a)({},e),{},{distance:c})}))).sort((function(e,t){return"number"!==typeof e.distance||Number.isNaN(e.distance)?1:"number"!==typeof t.distance||Number.isNaN(t.distance)?-1:e.distance-t.distance})),e.abrupt("return",r);case 10:return e.abrupt("return",t);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(e){var t=Object(j.f)(),n=r.a.useState(),a=Object(u.a)(n,2),c=a[0],s=a[1],i=r.a.useState(e.data),l=Object(u.a)(i,2),d=l[0],p=l[1],b=r.a.useState([]),h=Object(u.a)(b,2),f=h[0],x=h[1],m=r.a.useState(10),g=Object(u.a)(m,2),w=g[0],y=g[1],k=r.a.useState(!0),N=Object(u.a)(k,2),S=N[0],F=N[1],C=r.a.useState([]),_=Object(u.a)(C,2),E=_[0],L=_[1],P=Object(o.c)(),W=Object(u.a)(P,1)[0].get("category");r.a.useEffect((function(){for(var t=[],n=0;n<e.data.length;n++){var a=e.data[n];-1===t.indexOf(a["\u30ab\u30c6\u30b4\u30ea"])&&t.push(a["\u30ab\u30c6\u30b4\u30ea"])}L(t);var r=e.data;W&&(r=e.data.filter((function(e){return e["\u30ab\u30c6\u30b4\u30ea"]===W})));var c=!0;if(c){H(r).then((function(e){c&&(x(e.slice(0,w)),p(e))}))}return function(){c=!1}}),[e.data,W,w]);var A=function(e){e&&s(e)},R=Object(O.jsx)("div",{className:"loader",style:{width:"100%",height:"200px",textAlign:"center",position:"relative",top:"100px"},children:"\u5834\u6240\u4e00\u89a7\u3092\u8aad\u307f\u8fbc\u307f\u4e2d\u3067\u3059..."},0);return Object(O.jsxs)("div",{id:"shop-list",className:"shop-list",children:[Object(O.jsx)(v,{}),Object(O.jsx)("div",{className:"category-item",children:Object(O.jsxs)("div",{className:"category-container",children:[Object(O.jsx)("label",{htmlFor:"category-select",children:"\u30ab\u30c6\u30b4\u30ea\u304b\u3089\u9078\u3076"}),Object(O.jsx)(Z.a,{onChange:function(e){e&&t("/list?category=".concat(e.value))},options:E.map((function(e){return{value:e,label:e}}))})]})}),Object(O.jsx)(T.a,{dataLength:f.length,next:function(){f.length>=d.length?F(!1):(x([].concat(Object(Y.a)(f),Object(Y.a)(d.slice(w,w+10)))),y(w+10))},hasMore:S,loader:R,scrollableTarget:"shop-list",children:f.map((function(e,t){return Object(O.jsx)("div",{className:"shop",children:Object(O.jsx)(J,{data:e,popupHandler:A})},t)}))}),c?Object(O.jsx)(M,{shop:c,close:function(){s(void 0)}}):Object(O.jsx)(O.Fragment,{})]})},X=(n(247),n(123)),q=function(){return Object(O.jsx)("div",{className:"tabbar",children:Object(O.jsxs)("ul",{children:[Object(O.jsx)("li",{children:Object(O.jsxs)(o.b,{to:"/",children:[Object(O.jsx)("div",{className:"icon",children:Object(O.jsx)(X.a,{})}),Object(O.jsx)("div",{className:"text",children:"\u30db\u30fc\u30e0"})]})}),Object(O.jsx)("li",{children:Object(O.jsxs)(o.b,{to:"/list",children:[Object(O.jsx)("div",{className:"icon",children:Object(O.jsx)(X.b,{})}),Object(O.jsx)("div",{className:"text",children:"\u4e00\u89a7"})]})})]})})},K=(n(248),n(4)),V=n(392),$=n(389),G=n(390),Q=n(381),ee=n(385),te=n(393),ne=n(166),ae=n(165),re=n(382),ce=n(371),se=n(379),oe=n(65),ie=n.n(oe),ue=n(395);function le(){return Object(O.jsx)(ue.a,{sx:{display:"flex",justifyContent:"center"},children:Object(O.jsx)(E.a,{})})}n(249);var de=window.location.hash.split("/"),pe=de[2],je=de[3],be=function(){var e=Object(a.useState)({title:"",category:"\u4f4f\u6c11\u8981\u671b",latitude:pe,longitude:je,timestamp:ie()().format("YYYY-MM-DDTHH:mm:ss"),spot:"",introduction:""}),t=Object(u.a)(e,2),n=t[0],r=t[1],c=function(e){var t,n,a=null===(t=e.target)||void 0===t?void 0:t.name,c=a?null===(n=e.target)||void 0===n?void 0:n.value:ie()(e).format("YYYY-MM-DDTHH:mm:ss");r((function(e){return Object(i.a)(Object(i.a)({},e),{},Object(K.a)({},a||"timestamp",c))}))},s=Object(a.useState)(!1),o=Object(u.a)(s,2),d=o[0],b=o[1],h=Object(j.f)(),f=function(){var e=Object(l.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.next=3,S(n,h);case 3:b(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=Object(a.useState)(""),m=Object(u.a)(x,2),g=m[0],y=m[1];return Object(a.useEffect)((function(){Object(l.a)(p.a.mark((function e(){var t,n,a,r,c,s,o,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window.location.hash.split("/"),n=t[2],a=t[3],!n||!a){e.next=11;break}return e.next=6,w.a.get("https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?json",{params:{lat:n,lon:a}});case 6:r=e.sent,c=r.data.result,s=c.prefecture.pname,o=c.municipality.mname,i=c.local[0].section,y(s+o+i);case 11:case"end":return e.stop()}}),e)})))()})),Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(v,{}),Object(O.jsxs)("div",{className:"form-container",children:[Object(O.jsx)(V.a,{variant:"h5",gutterBottom:!0,margin:"normal",children:"\u8981\u671b\u3092\u6295\u7a3f"}),Object(O.jsx)(V.a,{variant:"h6",gutterBottom:!0,sx:{mb:2},children:g?g+" \u4ed8\u8fd1":""}),Object(O.jsxs)($.a,{fullWidth:!0,children:[Object(O.jsx)(ne.a,{dateAdapter:ae.a,children:Object(O.jsx)(ce.a,{spacing:3,sx:{mb:2},children:Object(O.jsx)(se.a,{renderInput:function(e){return Object(O.jsx)(re.a,Object(i.a)({},e))},label:"\u65e5\u6642",value:n.timestamp,onChange:c})})}),Object(O.jsxs)($.a,{fullWidth:!0,children:[Object(O.jsx)(G.a,{children:"\u30b9\u30dd\u30c3\u30c8"}),Object(O.jsxs)(Q.a,{name:"spot",value:n.spot,onChange:c,sx:{mb:2},children:[Object(O.jsx)(ee.a,{value:"\u8eca\u4e21\u4ea4\u901a\u91cf",children:"\u8eca\u4e21\u4ea4\u901a\u91cf"}),Object(O.jsx)(ee.a,{value:"\u9053\u5e45",children:"\u9053\u5e45"}),Object(O.jsx)(ee.a,{value:"\u6b69\u9053",children:"\u6b69\u9053"}),Object(O.jsx)(ee.a,{value:"\u6a2a\u65ad\u6b69\u9053",children:"\u6a2a\u65ad\u6b69\u9053"}),Object(O.jsx)(ee.a,{value:"\u7acb\u54e8\u30fb\u898b\u5b88\u308a",children:"\u7acb\u54e8\u30fb\u898b\u5b88\u308a"}),Object(O.jsx)(ee.a,{value:"\u30ab\u30fc\u30d6\u30df\u30e9\u30fc",children:"\u30ab\u30fc\u30d6\u30df\u30e9\u30fc"}),Object(O.jsx)(ee.a,{value:"\u4fe1\u53f7\u6a5f",children:"\u4fe1\u53f7\u6a5f"}),Object(O.jsx)(ee.a,{value:"\u898b\u901a\u3057",children:"\u898b\u901a\u3057"})]})]}),Object(O.jsx)(re.a,{label:"\u5185\u5bb9",name:"introduction",multiline:!0,rows:4,value:n.introduction,onChange:c,sx:{mb:2}})]}),Object(O.jsx)(te.a,{variant:"contained",onClick:f,disabled:d,fullWidth:!0,sx:{margin:"24px 0"},children:"\u6295\u7a3f"}),d&&Object(O.jsx)(le,{})]})]})},he=function(){return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(be,{})})},fe=function(){var e=Object(l.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t.sort((function(e,t){return Date.parse(t["\u30bf\u30a4\u30e0\u30b9\u30bf\u30f3\u30d7"])-Date.parse(e["\u30bf\u30a4\u30e0\u30b9\u30bf\u30f3\u30d7"])})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),xe=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(!0),s=Object(u.a)(c,2),o=s[0],d=s[1];return Object(a.useEffect)((function(){fetch("".concat(".","/data.json?timestamp=").concat((new Date).getTime())).then((function(e){return e.ok?e.text():Promise.reject(e.status)})).then((function(e){if("values"in JSON.parse(e)===!1)return console.log("No Data Found at Spreadsheet"),void r([]);Object(l.a)(p.a.mark((function e(){var t,n,a,c,s,o,u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F();case 2:if(t=e.sent,n=JSON.parse(t),d(!1),!n.length){e.next=25;break}a=[],c=0;case 8:if(!(c<n.length)){e.next=25;break}if((s=n[c])["\u7def\u5ea6"]&&s["\u7d4c\u5ea6"]&&s["\u30b9\u30dd\u30c3\u30c8\u540d"]){e.next=12;break}return e.abrupt("continue",22);case 12:if((o=/^-?[0-9]+(\.[0-9]+)?$/).test(s["\u7def\u5ea6"])){e.next=16;break}return console.log("\u7def\u5ea6\u304c\u4e0d\u6b63\u3067\u3059"),e.abrupt("continue",22);case 16:if(o.test(s["\u7d4c\u5ea6"])){e.next=19;break}return console.log("\u7d4c\u5ea6\u304c\u4e0d\u6b63\u3067\u3059"),e.abrupt("continue",22);case 19:u=Object(i.a)(Object(i.a)({},s),{},{index:c}),a.push(u),fe(a).then((function(e){r(e)}));case 22:c++,e.next=8;break;case 25:case"end":return e.stop()}}),e)})))()}))}),[]),Object(O.jsx)(O.Fragment,{children:o?"":Object(O.jsxs)("div",{className:"app",children:[Object(O.jsx)("div",{className:"app-body",children:Object(O.jsxs)(j.c,{children:[Object(O.jsx)(j.a,{path:"/",element:Object(O.jsx)(B,{data:n})}),Object(O.jsx)(j.a,{path:"/post",element:Object(O.jsx)(he,{})}),Object(O.jsx)(j.a,{path:"/list",element:Object(O.jsx)(U,{data:n})})]})}),Object(O.jsx)("div",{className:"app-footer",children:Object(O.jsx)(q,{})})]})})},me=(n(253),n(162));var Oe=function(e){var t=e.url,n=Object(me.a)().Canvas;return Object(O.jsx)(n,{text:t,options:{type:"image/png",margin:0,width:128}})},ve=n(125),ge=function(){var e=ve.logo_image_url||"".concat(".","/logo.svg");return Object(O.jsxs)("div",{className:"about",children:[Object(O.jsx)("div",{className:"branding",children:Object(O.jsx)("img",{className:"image",src:e,alt:""})}),Object(O.jsx)("div",{className:"title",children:ve.title}),Object(O.jsx)("div",{className:"description",children:"\u30b9\u30de\u30db\u3067\u78ba\u8a8d\u304c\u3067\u304d\u307e\u3059 \ud83d\udc47"}),Object(O.jsx)("div",{className:"qrcode",children:Object(O.jsx)(Oe,{url:window.location.href})})]})};n(276);var we=function(){return Object(O.jsx)("div",{className:"outer-container",children:Object(O.jsxs)("div",{className:"inner-container",children:[Object(O.jsx)(ge,{}),Object(O.jsx)(xe,{})]})})},ye=(n(277),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function ke(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(o.a,{children:Object(O.jsx)(we,{})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");ye?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ke(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):ke(t,e)}))}}()}},[[278,1,2]]]);
//# sourceMappingURL=main.ae950362.chunk.js.map