import React, { useState, useEffect } from "react";
import "./Home.css";

import queryString from "query-string";

const Home = ({ location }) => {
  const { code } = queryString.parse(location.search);
  const [homeData, setHomeData] = useState("none");
  
  useEffect(() => {
    fetch(`/homeapi?code=${code}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(res => {
      setHomeData(JSON.stringify(res))
      console.log("RES: " + res);
    })
  }, [code]);

  return (
    <div className="Home-body">
      <h3>Homes</h3>
      <h5 className="Content">{homeData}</h5>
    </div>
  );
};

export default Home;
