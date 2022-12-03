const express = require('express');
var axios = require("axios");
var oAuth = require("./middleware/oAuth");
var port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const {checkJwt, checkAdmin} = require("./api/api.js");
app.use("/auth", oAuth);

app.get("/auth", async (req, res) => {
  var {access_token} = req.oauth;
  /*const response = await axios({
    method:"get",
    url:'http://localhost:3000/protected',
    headers: { Authorization: `Bearer ${access_token}` },
  });*/
  console.log("Token: " + req.oauth.access_token);
  res.json(access_token);
});
  app.get('/protected',checkJwt,(req,res)=>{
    res.json('You are in a protected path! See console for token.')
  })
  app.get('/admin',checkJwt,checkAdmin,(req,res)=>{
    res.json('You are in an administrative path! ... Fancy!')
  })
  app.listen(port, () => console.log("Started"));

  module.exports = app;