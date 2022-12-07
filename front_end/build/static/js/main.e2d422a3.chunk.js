(this["webpackJsonpdashboard-app"]=this["webpackJsonpdashboard-app"]||[]).push([[0],{18:function(t,e,c){},31:function(t,e,c){},32:function(t,e,c){},35:function(t,e,c){},54:function(t,e,c){},55:function(t,e,c){},56:function(t,e,c){},57:function(t,e,c){},58:function(t,e,c){"use strict";c.r(e);var n=c(1),r=c(23),a=c.n(r),s=(c(31),c(7)),o=(c(32),c(9)),i=c.n(o),l=c(11),j=c(0),h=function(){var t=function(){var t=Object(l.a)(i.a.mark((function t(){var e;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"dev-dzly2px62k6tkpb1.us.auth0.com","https://www.test-api.com","is:admin","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","code","http://localhost:3000/home",t.next=8,fetch("http://".concat("dev-dzly2px62k6tkpb1.us.auth0.com","/authorize?")+"audience=".concat("https://www.test-api.com","&")+"scope=".concat("is:admin","&")+"response_type=".concat("code","&")+"client_id=".concat("HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","&")+"redirect_uri=".concat("http://localhost:3000/home"),{redirect:"manual"});case 8:e=t.sent,window.location.replace(e.url);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log In"})},u=function(){var t=function(){var t=Object(l.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"dev-dzly2px62k6tkpb1.us.auth0.com","HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ","http://localhost:3000",window.location.replace("https://dev-dzly2px62k6tkpb1.us.auth0.com/v2/logout?client_id=HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ&returnTo=http://localhost:3000");case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsx)("button",{className:"Login-button",onClick:function(){return t()},children:"Log out"})},d=c(8),b=(c(35),c(24)),p=c.n(b),O=function(t){var e=t.location,c=p.a.parse(e.search).code;return Object(n.useEffect)((function(){fetch("/auth?code=".concat(c),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(t){sessionStorage.setItem("jwt",t),console.log(sessionStorage.getItem("jwt")),fetch("/api/protected/accounts",{method:"POST",headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("jwt"))}}).then((function(t){return t.json()})).then((function(t){console.log(t)}))}))}),[c]),Object(j.jsx)("div",{className:"sidebar",children:Object(j.jsxs)("nav",{children:[Object(j.jsx)("h1",{children:"Navigation"}),Object(j.jsx)(d.b,{to:"/home/search",children:Object(j.jsx)("button",{className:"sidebar-button",children:Object(j.jsx)("span",{children:"Search"})})}),Object(j.jsx)(d.b,{to:"/home/library",children:Object(j.jsx)("button",{className:"sidebar-button",children:Object(j.jsx)("span",{children:"Your Library"})})}),Object(j.jsx)(d.b,{to:"/home/playlist",children:Object(j.jsx)("button",{className:"sidebar-button",children:Object(j.jsx)("span",{children:"Create Playlist"})})})]})})},x=(c(18),function(){return Object(j.jsx)("div",{className:"searchBar",children:Object(j.jsx)("input",{placeholder:"Search track by track name, genre, album or artist or search a playlist"})})}),m=(c(54),function(){var t=function(){var t=Object(l.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:fetch("/api/protected/lists",{method:"POST",headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("jwt"))},body:{description:"test",public:"0",list_name:"sample name"}}).then((function(t){return t.json()})).then((function(t){console.log(t)}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(j.jsxs)("form",{className:"add-playlist",children:[Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("span",{children:"Playlist Name"}),Object(j.jsx)("input",{placeholder:"Name"})]}),Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("span",{children:"Descripton"}),Object(j.jsx)("input",{placeholder:"Description"})]}),Object(j.jsxs)("div",{className:"item",children:[Object(j.jsx)("span",{children:"Private Playlist"}),Object(j.jsx)("input",{type:"checkbox",defaultChecked:!0})]}),Object(j.jsx)("div",{className:"item",children:Object(j.jsx)("button",{id:"add-button",onClick:function(){return t()},children:"Add"})})]})}),f=(c(55),function(){return Object(j.jsxs)("div",{className:"track",children:[Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:"Name: "})}),Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:"Artist: "})}),Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:"Album: "})}),Object(j.jsx)("div",{className:"trackProperty",children:Object(j.jsx)("span",{children:Object(j.jsx)("button",{className:"expandButton",onClick:function(t){document.querySelectorAll(".popup").style.color="red"},children:"Expand"})})})]})}),y=function(){return Object(j.jsxs)("div",{className:"trackHolder",children:[Object(j.jsx)(f,{}),Object(j.jsx)(f,{})]})},g=(c(56),function(){return Object(j.jsx)(d.b,{to:"/home/playlist/id",children:Object(j.jsxs)("button",{className:"playlist",children:[Object(j.jsx)("div",{className:"playlistProperty",children:Object(j.jsx)("span",{children:"Name: "})}),Object(j.jsx)("div",{className:"playlistProperty",children:Object(j.jsx)("span",{children:"By: "})})]})})}),k=function(){return Object(j.jsxs)("div",{className:"playlistHolder",children:[Object(j.jsx)("h1",{children:"Playlists"}),Object(j.jsx)(g,{}),Object(j.jsx)(g,{})]})},v=function(){return Object(j.jsx)("div",{className:"library",children:Object(j.jsx)(k,{})})},w=function(){return Object(j.jsxs)("div",{className:"playlist-data",children:[Object(j.jsx)("h1",{children:"Playlist Name"}),Object(j.jsx)("button",{children:"Delete"}),Object(j.jsx)(y,{})]})};c(57);var N=function(){var t=Object(n.useState)("none"),e=Object(s.a)(t,2),c=e[0],r=e[1];return Object(n.useEffect)((function(){fetch("/protected",{method:"GET",headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("jwt"))}}).then((function(t){return t.json()})).then((function(t){r(JSON.stringify(t))}))}),[]),Object(j.jsxs)("div",{className:"Home-body",children:[Object(j.jsx)("h3",{children:"Protected Test"}),Object(j.jsx)("h2",{children:c})]})},S=c(2),_=function(t){return Object(j.jsx)("div",{children:Object(j.jsx)("input",{placeholder:t.placeholder,onChange:function(e){return t.onChange(e)},style:t.style})})};var P=function(t){var e=Object(n.useState)(-1),c=Object(s.a)(e,2),r=c[0],a=c[1],o="https://www.youtube.com/results?search_query=".concat(t.track.track_title);return-1===r?Object(j.jsx)("button",{style:{width:500,height:100,backgroundColor:"gray",borderRadius:15},onClick:function(){return a(-1*r)},children:Object(j.jsxs)("p",{children:["Title: ",t.track.track_title," | Artist: ",t.track.artist_name]})}):Object(j.jsxs)("button",{style:{width:500,height:100,backgroundColor:"gray",borderRadius:15},onClick:function(){return a(-1*r)},children:[Object(j.jsxs)("p",{children:["Title: ",t.track.track_title," | Artist: ",t.track.artist_name]}),Object(j.jsxs)("p",{children:["Language: ",t.track.track_language_code,", Play-time: ",t.track.track_duration," Year: ",t.track.track_date_recorded]}),Object(j.jsx)("div",{style:{backgroundColor:"green",borderRadius:15},children:Object(j.jsx)("p",{children:Object(j.jsx)("a",{href:o,target:"_blank",children:"Play"})})})]})},C=c(26),A="http://localhost:3000";var T=function(t){var e=Object(n.useState)(-1),c=Object(s.a)(e,2),r=c[0],a=c[1],o=Object(n.useState)([]),i=Object(s.a)(o,2),l=i[0],h=i[1];return Object(n.useEffect)((function(){var e="".concat(A,"/api/public/lists/tracks/").concat(t.playlist.list_name);fetch(e).then((function(t){return t.json()})).then((function(t){console.log(t);for(var e=0;e<t.length;e++){var c="".concat(A,"/api/public/tracks/").concat(t[e].track_id);fetch(c).then((function(t){return t.json()})).then((function(t){console.log(t),h((function(e){return[].concat(Object(C.a)(e),[t])}))})).catch((function(t){}))}})).catch((function(t){}))}),l),-1===r?Object(j.jsx)("button",{style:{width:500,height:100,backgroundColor:"white",borderRadius:15},onClick:function(){return a(-1*r)},children:Object(j.jsxs)("p",{children:["Playlist Name: ",t.playlist.list_name," | Creator id: ",t.playlist.creator_id," | Total play-time: ",t.playlist.total_duration," | Track Count: ",t.playlist.track_count]})}):Object(j.jsxs)("button",{style:{width:500,height:200*l.length},children:[Object(j.jsx)("button",{style:{width:500,height:100,backgroundColor:"white",borderRadius:15},onClick:function(){return a(-1*r)},children:Object(j.jsxs)("p",{children:["Playlist Name: ",t.playlist.list_name," | Creator id: ",t.playlist.creator_id," | Total play-time: ",t.playlist.total_duration," | Track Count: ",t.playlist.track_count]})}),l.map((function(t){return console.log("TRACK: "+JSON.stringify(t)),Object(j.jsx)(P,{track:t[0]})}))]})},E="",B="http://localhost:3000";var R=function(){var t=Object(n.useState)([]),e=Object(s.a)(t,2),c=e[0],r=e[1],a=Object(n.useState)([]),o=Object(s.a)(a,2),i=o[0],l=o[1];return Object(n.useEffect)((function(){console.log("Searching");var t="".concat(B,"/api/public/lists/0");fetch(t).then((function(t){return t.json()})).then((function(t){console.log(t),l(t)})).catch((function(t){}))}),i),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("header",{className:"App-header",children:Object(j.jsx)("h1",{children:"Music App"})}),Object(j.jsx)("div",{className:"App-body",children:Object(j.jsxs)("span",{children:[Object(j.jsx)(h,{}),Object(j.jsx)(u,{}),Object(j.jsx)("p",{style:{color:"black"},children:"What this site offers: hundreds of thousands of artists and music across hundreds of genres. Build and review playlists with an account. Login to start."}),Object(j.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(j.jsx)(_,{onChange:function(t){return function(t){console.log(t.target.value),E=t.target.value}(t)},placeholder:"Search for artist, genre, or track title",style:{width:500}}),Object(j.jsx)("button",{onClick:function(){return function(){console.log("Searching");var t="".concat(B,"/api/public/tracks?search=").concat(E);fetch(t).then((function(t){return t.json()})).then((function(t){console.log(t),r(t)})).catch((function(t){}))}()},children:"Search"})]}),c.map((function(t){return console.log(t),Object(j.jsx)(P,{track:t})})),Object(j.jsx)("h3",{style:{color:"black"},children:"Public Playlists"}),i.map((function(t){return Object(j.jsx)(T,{playlist:t})})),Object(j.jsxs)("p",{style:{color:"black"},children:["View our Privacy Policy ",Object(j.jsx)("a",{target:"_blank",href:"https://docs.google.com/document/d/185wpPyn-yYgTk0jM1wedR7XnTRMPpiRSYPGkB5xdEmY/edit?usp=sharing",children:"here."})]}),Object(j.jsxs)("p",{style:{color:"black"},children:["View our Acceptable Use Policy ",Object(j.jsx)("a",{target:"_blank",href:"https://docs.google.com/document/d/1c5Zeu4AZdyc1UYLKYbTsfP-IwXRqBClBpEWbeKL1OHI/edit?usp=sharing",children:"here."})]}),Object(j.jsxs)("p",{style:{color:"black"},children:["View our DMCA Take Down Policy ",Object(j.jsx)("a",{target:"_blank",href:"https://docs.google.com/document/d/1kABt3cbdyhT62ElTbuTFtq3i1ucOKBDRHBwcfJR-bFY/edit?usp=sharing",children:"here."})]})]})}),Object(j.jsx)(S.a,{path:"/home",component:O}),Object(j.jsx)(S.a,{path:"/home/search",component:x}),Object(j.jsx)(S.a,{path:"/home/search",component:y}),Object(j.jsx)(S.a,{path:"/home/search",component:k}),Object(j.jsx)(S.a,{path:"/home/library",component:v}),Object(j.jsx)(S.a,{path:"/home/playlist",exact:!0,component:m}),Object(j.jsx)(S.a,{path:"/home/playlist/id",component:w}),Object(j.jsx)(S.a,{path:"/test",component:N})]})};a.a.render(Object(j.jsx)(d.a,{children:Object(j.jsx)(R,{})}),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.e2d422a3.chunk.js.map