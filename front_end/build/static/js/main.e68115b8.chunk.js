(this["webpackJsonpdashboard-app"]=this["webpackJsonpdashboard-app"]||[]).push([[0],{27:function(t,e,n){},28:function(t,e,n){},31:function(t,e,n){},50:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n(19),o=n.n(a),r=(n(27),n(28),n(8)),s=n.n(r),i=n(10),u=n(1),l=function(){var t=function(){var t=Object(i.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"dev-dzly2px62k6tkpb1.us.auth0.com","https://www.test-api.com","read:test","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","code","http://localhost:3000/challengesFront",t.next=8,fetch("http://".concat("dev-dzly2px62k6tkpb1.us.auth0.com","/authorize?")+"audience=".concat("https://www.test-api.com","&")+"scope=".concat("read:test","&")+"response_type=".concat("code","&")+"client_id=".concat("HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","&")+"redirect_uri=".concat("http://localhost:3000/challengesFront"),{redirect:"manual"});case 8:e=t.sent,window.location.replace(e.url);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log In"})},h=function(){var t=function(){var t=Object(i.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"dev-dzly2px62k6tkpb1.us.auth0.com","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","http://localhost:3000",t.next=5,fetch("https://".concat("dev-dzly2px62k6tkpb1.us.auth0.com","/logout?client_id=").concat("HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","&returnTo=").concat("http://localhost:3000"),{redirect:"manual"});case 5:e=t.sent,window.location.replace(e.url);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(u.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log out"})},p=n(22),d=(n(31),n(20)),j=n.n(d),b=function(t){var e=t.location,n=j.a.parse(e.search).code,a=Object(c.useState)("none"),o=Object(p.a)(a,2),r=o[0],s=o[1];return Object(c.useEffect)((function(){fetch("/challenges?code=".concat(n),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(t){s(JSON.stringify(t)),console.log("RES: "+t)}))}),[n]),Object(u.jsxs)("div",{className:"Challenges-body",children:[Object(u.jsx)("h3",{children:"Challenges"}),Object(u.jsx)("h5",{className:"Content",children:r})]})},x=n(2);var f=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("header",{className:"App-header",children:Object(u.jsx)("h1",{children:"Dashboard"})}),Object(u.jsxs)("div",{className:"App-body",children:[Object(u.jsxs)("span",{children:[Object(u.jsx)(l,{}),Object(u.jsx)(h,{})]}),Object(u.jsx)(x.a,{path:"/challengesFront",component:b})]})]})},m=n(14);o.a.render(Object(u.jsx)(m.a,{children:Object(u.jsx)(f,{})}),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.e68115b8.chunk.js.map