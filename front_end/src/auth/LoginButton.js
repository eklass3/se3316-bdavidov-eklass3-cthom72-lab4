import React from "react";

const LoginButton = () => {
  const login = async () => {
    const domain = "dev-dzly2px62k6tkpb1.us.auth0.com";
    const audience = "https://www.test-api.com";
    const scope = "read:test";
    const clientId = "HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ";
    const responseType = "code";
    const redirectUri = "http://localhost:3000/home";

      const response = await fetch(
        `http://${domain}/authorize?` + 
        `audience=${audience}&` + 
        `scope=${scope}&` +
        `response_type=${responseType}&` +
        `client_id=${clientId}&` +
        `redirect_uri=${redirectUri}`, {
          redirect: "manual"
        }
      );
      window.location.replace(response.url); //reroutes the response from localhost:3000/challenges
  };

  return (
    <button className="Login-button" onClick={() => login()}>
      Log In
    </button>
  );
};

export default LoginButton;
