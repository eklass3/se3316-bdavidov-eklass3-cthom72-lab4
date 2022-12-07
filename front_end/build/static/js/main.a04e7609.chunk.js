(this["webpackJsonpdashboard-app"]=this["webpackJsonpdashboard-app"]||[]).push([[0],{18:function(t,e,c){},32:function(t,e,c){},33:function(t,e,c){},36:function(t,e,c){},55:function(t,e,c){},56:function(t,e,c){},57:function(t,e,c){},58:function(t,e,c){},59:function(t,e,c){"use strict";c.r(e);var n=c(1),a=c(23),r=c.n(a),s=(c(32),c(4)),o=c(24),i=(c(33),c(8)),l=c.n(i),u=c(11),j=c(0),h=function(){var t=function(){var t=Object(u.a)(l.a.mark((function t(){var e;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"dev-dzly2px62k6tkpb1.us.auth0.com","https://www.test-api.com","is:admin","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","code","http://localhost:3000/home/authenticated",t.next=8,fetch("http://".concat("dev-dzly2px62k6tkpb1.us.auth0.com","/authorize?")+"audience=".concat("https://www.test-api.com","&")+"scope=".concat("is:admin","&")+"response_type=".concat("code","&")+"client_id=".concat("HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","&")+"redirect_uri=".concat("http://localhost:3000/home/authenticated"),{redirect:"manual"});case 8:e=t.sent,window.location.replace(e.url);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log In"})},d=function(){var t=function(){var t=Object(u.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"dev-dzly2px62k6tkpb1.us.auth0.com","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","http://localhost:3000",window.location.replace("https://dev-dzly2px62k6tkpb1.us.auth0.com/v2/logout?client_id=HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ&returnTo=http://localhost:3000");case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log out"})},b=c(9),p=(c(36),c(25)),O=c.n(p),f=function(t){var e=t.location,c=O.a.parse(e.search).code;return Object(n.useEffect)((function(){fetch("/auth?code=".concat(c),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(t){sessionStorage.setItem("jwt",t),console.log(sessionStorage.getItem("jwt")),fetch("/api/protected/accounts",{method:"POST",headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("jwt"))}}).then((function(t){return t.json()})).then((function(t){console.log(t)}))})),console.log("test")}),[c]),Object(j.jsx)("div",{className:"sidebar",children:Object(j.jsxs)("nav",{children:[Object(j.jsx)("h1",{children:"Navigation"}),Object(j.jsx)(b.b,{to:"/home/authenticated/library?code="+"".concat(c),children:Object(j.jsx)("button",{className:"sidebar-button",children:Object(j.jsx)("span",{children:"Your Library"})})}),Object(j.jsx)(b.b,{to:"/home/authenticated/playlist?code="+"".concat(c),children:Object(j.jsx)("button",{className:"sidebar-button",children:Object(j.jsx)("span",{children:"Create Playlist"})})})]})})},x=(c(18),function(){return Object(j.jsx)("div",{className:"searchBar",children:Object(j.jsx)("input",{placeholder:"Search track by track name, genre, album or artist or search a playlist"})})}),m=(c(55),function(){var t=Object(n.useState)(""),e=Object(s.a)(t,2),c=e[0],a=e[1],r=Object(n.useState)(""),o=Object(s.a)(r,2),i=o[0],h=o[1],d=Object(n.useState)(!0),b=Object(s.a)(d,2),p=b[0],O=b[1],f=function(){var t=Object(u.a)(l.a.mark((function t(){var e;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=p?1:0,fetch("/api/protected/lists",{method:"POST",headers:{"Content-type":"application/json",Accept:"application/json",Authorization:"Bearer ".concat(sessionStorage.getItem("jwt"))},body:JSON.stringify({description:i,public:e,list_name:c})}).then((function(t){return t.json()})).then((function(t){console.log(t)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsxs)("form",{className:"add-playlist",children:[Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("span",{children:"Playlist Name"}),Object(j.jsx)("input",{placeholder:"Name",onChange:function(t){a(t.target.value)}})]}),Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("span",{children:"Descripton"}),Object(j.jsx)("input",{placeholder:"Description",onChange:function(t){h(t.target.value)}})]}),Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("span",{children:"Private Playlist"}),Object(j.jsx)("input",{type:"checkbox",defaultChecked:!0,onChange:function(t){O(t.target.checked)}})]}),Object(j.jsx)("div",{className:"item",children:Object(j.jsx)("button",{id:"add-button",onClick:function(){return f()},children:"Add"})})]})}),y=(c(56),function(){return Object(j.jsxs)("div",{className:"track",children:[Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:"Name: "})}),Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:"Artist: "})}),Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:"Album: "})}),Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:Object(j.jsx)("button",{className:"expandButton",onClick:function(t){document.querySelectorAll(".popup").style.color="red"},children:"Expand"})})})]})}),g=function(){return Object(j.jsxs)("div",{className:"trackHolder",children:[Object(j.jsx)(y,{}),Object(j.jsx)(y,{})]})},k=(c(57),function(t){return Object(j.jsx)(b.b,{to:"/home/playlist/".concat(t.name),children:Object(j.jsxs)("button",{className:"playlist",children:[Object(j.jsx)("div",{className:"playlistProperty",children:Object(j.jsxs)("span",{children:["Name: $",t.name]})}),Object(j.jsx)("div",{className:"playlistProperty",children:Object(j.jsxs)("span",{children:["By: $",t.by]})})]})})}),v=function(t){var e=t.lists.map((function(t){return Object(j.jsx)(k,{name:t.list_name,by:t.creator_id})}));return Object(j.jsxs)("div",{className:"playlistHolder",children:[Object(j.jsx)("h1",{children:"Playlists"}),e]})},w=function(t){var e=Object(n.useState)([]),c=Object(s.a)(e,2),a=c[0],r=c[1];return Object(n.useEffect)((function(){fetch("api/protected/lists/".concat(t)).then((function(t){return t.json()})).then((function(t){r(t)}))})),Object(j.jsx)("div",{className:"library",children:Object(j.jsx)(v,{lists:a})})},N=function(){return Object(j.jsxs)("div",{className:"playlist-data",children:[Object(j.jsx)("h1",{children:"Playlist Name"}),Object(j.jsx)("button",{children:"Delete"}),Object(j.jsx)(g,{})]})};c(58);var S=function(){var t=Object(n.useState)("none"),e=Object(s.a)(t,2),c=e[0],a=e[1];return Object(n.useEffect)((function(){fetch("/protected",{method:"GET",headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("jwt"))}}).then((function(t){return t.json()})).then((function(t){a(JSON.stringify(t))}))}),[]),Object(j.jsxs)("div",{className:"Home-body",children:[Object(j.jsx)("h3",{children:"Protected Test"}),Object(j.jsx)("h2",{children:c})]})},_=c(2),C=function(t){return Object(j.jsx)("div",{children:Object(j.jsx)("input",{placeholder:t.placeholder,onChange:function(e){return t.onChange(e)},style:t.style})})};var P=function(t){var e=Object(n.useState)(-1),c=Object(s.a)(e,2),a=c[0],r=c[1],o="https://www.youtube.com/results?search_query=".concat(t.track.track_title);return-1===a?Object(j.jsx)("button",{style:{width:500,height:100,backgroundColor:"gray",borderRadius:15},onClick:function(){return r(-1*a)},children:Object(j.jsxs)("p",{children:["Title: ",t.track.track_title," | Artist: ",t.track.artist_name]})}):Object(j.jsxs)("button",{style:{width:500,height:100,backgroundColor:"gray",borderRadius:15},onClick:function(){return r(-1*a)},children:[Object(j.jsxs)("p",{children:["Title: ",t.track.track_title," | Artist: ",t.track.artist_name]}),Object(j.jsxs)("p",{children:["Language: ",t.track.track_language_code,", Play-time: ",t.track.track_duration," Year: ",t.track.track_date_recorded]}),Object(j.jsx)("div",{style:{backgroundColor:"green",borderRadius:15},children:Object(j.jsx)("p",{children:Object(j.jsx)("a",{href:o,target:"_blank",children:"Play"})})})]})},A=c(27),T="http://localhost:3000";var E=function(t){var e=Object(n.useState)(-1),c=Object(s.a)(e,2),a=c[0],r=c[1],o=Object(n.useState)([]),i=Object(s.a)(o,2),l=i[0],u=i[1];return Object(n.useEffect)((function(){var e="".concat(T,"/api/public/lists/tracks/").concat(t.playlist.list_name);fetch(e).then((function(t){return t.json()})).then((function(t){console.log(t);for(var e=0;e<t.length;e++){var c="".concat(T,"/api/public/tracks/").concat(t[e].track_id);fetch(c).then((function(t){return t.json()})).then((function(t){console.log(t),u((function(e){return[].concat(Object(A.a)(e),[t])}))})).catch((function(t){}))}})).catch((function(t){}))}),l),-1===a?Object(j.jsx)("button",{style:{width:500,height:100,backgroundColor:"white",borderRadius:15},onClick:function(){return r(-1*a)},children:Object(j.jsxs)("p",{children:["Playlist Name: ",t.playlist.list_name," | Creator id: ",t.playlist.creator_id," | Total play-time: ",t.playlist.total_duration," | Track Count: ",t.playlist.track_count]})}):Object(j.jsxs)("button",{style:{width:500,height:200*l.length},children:[Object(j.jsx)("button",{style:{width:500,height:100,backgroundColor:"white",borderRadius:15},onClick:function(){return r(-1*a)},children:Object(j.jsxs)("p",{children:["Playlist Name: ",t.playlist.list_name," | Creator id: ",t.playlist.creator_id," | Total play-time: ",t.playlist.total_duration," | Track Count: ",t.playlist.track_count]})}),l.map((function(t){return console.log("TRACK: "+JSON.stringify(t)),Object(j.jsx)(P,{track:t[0]})}))]})},B="",R="http://localhost:3000";var J=function(t){Object(o.a)(t);var e=Object(n.useState)([]),c=Object(s.a)(e,2),a=c[0],r=c[1],i=Object(n.useState)([]),l=Object(s.a)(i,2),u=l[0],b=l[1];return Object(n.useEffect)((function(){var t="".concat(R,"/api/public/lists/0");fetch(t).then((function(t){return t.json()})).then((function(t){b(t)})).catch((function(t){}))}),[u]),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("header",{className:"App-header",children:Object(j.jsx)("h1",{children:"Music App"})}),Object(j.jsx)("div",{className:"App-body",children:Object(j.jsxs)("span",{children:[Object(j.jsx)(h,{}),Object(j.jsx)(d,{}),Object(j.jsx)("p",{style:{color:"black"},children:"What this site offers: hundreds of thousands of artists and music across hundreds of genres. Build and review playlists with an account. Login to start."}),Object(j.jsx)(_.a,{path:"/home/authenticated",component:f}),Object(j.jsx)("br",{}),Object(j.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(j.jsx)(C,{onChange:function(t){return function(t){console.log(t.target.value),B=t.target.value}(t)},placeholder:"Search for artist, genre, or track title",style:{width:500}}),Object(j.jsx)("button",{onClick:function(){return function(){console.log("Searching");var t="".concat(R,"/api/public/tracks?search=").concat(B);fetch(t).then((function(t){return t.json()})).then((function(t){r(t)})).catch((function(t){}))}()},children:"Search"})]}),a.map((function(t){return console.log(t),Object(j.jsx)(P,{track:t})})),Object(j.jsx)("h3",{style:{color:"black"},children:"Public Playlists"}),u.map((function(t){return Object(j.jsx)(E,{playlist:t})})),Object(j.jsxs)("p",{style:{color:"black"},children:["View our Privacy Policy ",Object(j.jsx)("a",{target:"_blank",href:"https://docs.google.com/document/d/185wpPyn-yYgTk0jM1wedR7XnTRMPpiRSYPGkB5xdEmY/edit?usp=sharing",children:"here."})]}),Object(j.jsxs)("p",{style:{color:"black"},children:["View our Acceptable Use Policy ",Object(j.jsx)("a",{target:"_blank",href:"https://docs.google.com/document/d/1c5Zeu4AZdyc1UYLKYbTsfP-IwXRqBClBpEWbeKL1OHI/edit?usp=sharing",children:"here."})]}),Object(j.jsxs)("p",{style:{color:"black"},children:["View our DMCA Take Down Policy ",Object(j.jsx)("a",{target:"_blank",href:"https://docs.google.com/document/d/1kABt3cbdyhT62ElTbuTFtq3i1ucOKBDRHBwcfJR-bFY/edit?usp=sharing",children:"here."})]})]})}),Object(j.jsx)(_.a,{path:"/home/search",component:x}),Object(j.jsx)(_.a,{path:"/home/search",component:g}),Object(j.jsx)(_.a,{path:"/home/search",component:v}),Object(j.jsx)(_.a,{path:"/home/authenticated/library",id:"hfasjfkhdakfshfkdfjaks",component:w}),Object(j.jsx)(_.a,{path:"/home/authenticated/playlist",component:m}),Object(j.jsx)(_.a,{path:"/home/playlist/id",component:N}),Object(j.jsx)(_.a,{path:"/test",component:S})]})};r.a.render(Object(j.jsx)(b.a,{children:Object(j.jsx)(J,{})}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.a04e7609.chunk.js.map