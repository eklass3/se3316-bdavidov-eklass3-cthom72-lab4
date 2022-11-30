var express = require("express");
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var guard = require('express-jwt-permissions')();
var cors = require('cors');
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-dzly2px62k6tkpb1.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://www.test-api.com',
    issuer: 'https://dev-dzly2px62k6tkpb1.us.auth0.com/',
    algorithms: ['RS256']
});

module.exports = jwtCheck;