const express = require('express');
const app = express();
const cors = require("cors")

let backend = require('./back_end/index');

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(backend, function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.use(express.static("./front_end/build/"));

//catch all brings the user back to the main page
app.get('/*', (req,res)=>{
    res.sendFile('index.html',{ root: './front_end/build/'});
});


//Connect express.
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
