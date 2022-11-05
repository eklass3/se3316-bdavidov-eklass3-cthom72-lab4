const express = require("express");
const app = express();
app.use(express.static("frontend/views/"));

//Boot-up front end server on port 8080
app.listen(8080, function() {
  console.log("server running on 8080");
});



module.exports = app;