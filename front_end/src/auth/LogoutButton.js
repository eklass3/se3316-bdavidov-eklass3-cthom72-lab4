import React from "react";

const LogoutButton = () => {
  const logout = async () => {
    const domain = "dev-dzly2px62k6tkpb1.us.auth0.com";
    const clientId = "HSJA1S6qiFjE8gem8UWix4xjZc8m5eyQ";
    const returnTo = "http://localhost:3000";

    const response = await fetch(
      `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
      { redirect: "manual" }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => logout()}>
      Log out
    </button>
  );
};

export default LogoutButton;
