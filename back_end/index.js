const express = require('express');
var axios = require("axios");
var oAuth = require("./middleware/oAuth");
var port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const challengesAPIEndpoint = "http://localhost:8080/challenges";
app.use("/challenges", oAuth);

app.get("/challenges", async (req, res) => {
  console.log('Challenges accessed..')
    try {
      const { access_token } = req.oauth;
  
      const response = await axios({
        method: "get",
        url: challengesAPIEndpoint,
        headers: { Authorization: `Bearer ${access_token}` },
      });
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
  
  app.listen(port, () => console.log("Started"));

  module.exports = app;