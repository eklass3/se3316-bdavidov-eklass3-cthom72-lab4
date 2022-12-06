var axios = require("axios").default;

const tokenEndpoint = "https://dev-dzly2px62k6tkpb1.us.auth0.com/oauth/token";

 oAuth = (req, res, next) => {
  var code = req.query.code;
  if(!code) {
    res.status(401).send("Missing authorization code");
  }

  var options = {
    method: 'POST',
    url: 'https://dev-dzly2px62k6tkpb1.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded','Accept-Encoding': 'application/json'},
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: 'HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ',
      client_secret: 'Ini5aTh2-9x_C5PrjifHGVvpn9l2fGpDApoEKyqC3oemvOTw78Eyp7FD0I40iWZc',
      code: code,
      audience: 'https://www.test-api.com',
      redirect_uri: 'http://localhost:3000/home'
    })
  };
  axios.request(options).then(function (response) {
    //console.log('test');
    //console.log(response.data);
    req.oauth=response.data;
    next();
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = oAuth;