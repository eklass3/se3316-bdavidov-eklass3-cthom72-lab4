import React from "react";

const LogoutButton = () => {
  const logout = async () => {
    const domain = "dev-dzly2px62k6tkpb1.us.auth0.com";
    const clientId = "HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ";
    const returnTo = "http://localhost:3000";
    /*
    const response = await fetch(`https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`, { 
      method: "POST", 
      mode: 
    });*/

    window.location.replace('https://dev-dzly2px62k6tkpb1.us.auth0.com/v2/logout?client_id=HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ&returnTo=http://localhost:3000');
  };

  return (
    <button className="Login-button" onClick={() => logout()}>
      Log out
    </button>
  );
};

export default LogoutButton;
