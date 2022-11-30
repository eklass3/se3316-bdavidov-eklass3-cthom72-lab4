var axios = require("axios");

const tokenEndpoint = "https://dev-dzly2px62k6tkpb1.us.auth0.com/oauth/token";

 oAuth = (req, res, next) => {
  var code = req.query.code;
  console.log(code);
  if(!code) {
    res.status(401).send("Missing authorization code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ");
  params.append("client_secret", "Ini5aTh2-9x_C5PrjifHGVvpn9l2fGpDApoEKyqC3oemvOTw78Eyp7FD0I40iWZc")
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/challengesFront");

  axios.post(tokenEndpoint, params)
  .then(response => {
    req.oauth = response.data;
    console.log('Token: ' + req.oauth);
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(403).json(`Reason: ${err.message}`);
  })
}

module.exports = oAuth;