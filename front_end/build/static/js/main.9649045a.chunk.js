(this["webpackJsonpdashboard-app"]=this["webpackJsonpdashboard-app"]||[]).push([[0],{17:function(t,e,c){},28:function(t,e,c){},29:function(t,e,c){},50:function(t,e,c){"use strict";c.r(e);var n=c(0),o=c(20),a=c.n(o),r=(c(28),c(29),c(8)),s=c.n(r),i=c(10),u=c(1),p=function(){var t=function(){var t=Object(i.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"dev-dzly2px62k6tkpb1.us.auth0.com","https://www.test-api.com","read:test","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","code","http://localhost:3000/home",t.next=8,fetch("http://".concat("dev-dzly2px62k6tkpb1.us.auth0.com","/authorize?")+"audience=".concat("https://www.test-api.com","&")+"scope=".concat("read:test","&")+"response_type=".concat("code","&")+"client_id=".concat("HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","&")+"redirect_uri=".concat("http://localhost:3000/home"),{redirect:"manual"});case 8:e=t.sent,window.location.replace(e.url);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log In"})},h=function(){var t=function(){var t=Object(i.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"dev-dzly2px62k6tkpb1.us.auth0.com","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","http://localhost:3000",t.next=5,fetch("https://".concat("dev-dzly2px62k6tkpb1.us.auth0.com","/v2/logout?client_id=").concat("HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","&returnTo=").concat("http://localhost:3000"),{redirect:"manual"});case 5:e=t.sent,window.location.replace(e.url);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log out"})},d=c(23),l=(c(17),c(21)),j=c.n(l),b=function(t){var e=t.location,c=j.a.parse(e.search).code,o=Object(n.useState)("none"),a=Object(d.a)(o,2),r=a[0],s=a[1];return Object(n.useEffect)((function(){fetch("/homeapi?code=".concat(c),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(t){s(JSON.stringify(t)),console.log("RES: "+t)}))}),[c]),Object(u.jsxs)("div",{className:"Home-body",children:[Object(u.jsx)("h3",{children:"Homes"}),Object(u.jsx)("h5",{className:"Content",children:r})]})};var m=function(){return Object(u.jsx)("div",{className:"Home-body",children:Object(u.jsx)("h3",{children:"Test"})})},x=c(2);var f=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("header",{className:"App-header",children:Object(u.jsx)("h1",{children:"Dashboard"})}),Object(u.jsxs)("div",{className:"App-body",children:[Object(u.jsxs)("span",{children:[Object(u.jsx)(p,{}),Object(u.jsx)(h,{})]}),Object(u.jsx)(x.a,{path:"/home",component:b}),Object(u.jsx)(x.a,{path:"/test",component:m})]})]})},O=c(14);a.a.render(Object(u.jsx)(O.a,{children:Object(u.jsx)(f,{})}),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.9649045a.chunk.js.map