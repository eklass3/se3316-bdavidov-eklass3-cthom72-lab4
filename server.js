const express = require('express');
const app = express();

let backend = require('./backend/index');
let frontend = require('./frontend/operations');

app.use(backend, function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
app.use(frontend, function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

//Connect express.
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
