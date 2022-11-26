const express = require('express');
const app = express();

let backend = require('./index');

app.use(backend, function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.use(express.static("frontend/views/"));

//Connect express.
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
