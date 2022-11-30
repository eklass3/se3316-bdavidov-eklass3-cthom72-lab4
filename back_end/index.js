const express = require('express');
var axios = require("axios");
var oAuth = require("./middleware/oAuth");
var port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const jwtCheck = require("./api/api.js");
app.use("/challenges", oAuth);

app.get("/challenges", async (req, res) => {
  console.log('Challenges accessed..')
    try {
      const { access_token } = req.oauth;
      console.log(access_token);
      /*const response = await axios({
        method: "get",
        url: 'http://localhost:3000/api',
        headers: { Authorization: `Bearer ${access_token}` },
      });*/
      console.log('test')
      res.json(response.data);
    } catch (error) {
      console.log(error);
      if (error.response === 401) {
        res.status(401).json("Unauthorized to access data");
      } else if (error.response === 403) {
        res.status(403).json("Permission denied");
      } else {
        res.status(500).json("Whoops, something went wrong");
      }
    }
  });
  app.get('/api',jwtCheck,(req,res,next)=>{
    next();
  })
  app.listen(port, () => console.log("Started"));

  module.exports = app;