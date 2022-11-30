const express = require('express');
var axios = require("axios");
var oAuth = require("./middleware/oAuth");
var port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const {checkJwt, checkAdmin} = require("./api/api.js");
app.use("/challenges", oAuth);

app.get("/challenges", async (req, res) => {
  var {access_token} = req.oauth;
  const response = await axios({
    method:"get",
    url:'http://localhost:3000/protected',
    headers: { Authorization: `Bearer ${access_token}` },
  });
  console.log("Token: " + req.oauth.access_token);
  res.json(response.data);
});
  app.get('/protected',checkJwt,(req,res)=>{
    res.json('You are in a protected path! See console for token.')
  })
  app.listen(port, () => console.log("Started"));

  module.exports = app;