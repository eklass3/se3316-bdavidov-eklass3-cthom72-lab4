var express = require("express");
var app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://www.test-api.com',
  issuerBaseURL: `https://dev-dzly2px62k6tkpb1.us.auth0.com/`,
});
const checkAdmin = requiredScopes('read:test');
module.exports =  {checkJwt, checkAdmin};