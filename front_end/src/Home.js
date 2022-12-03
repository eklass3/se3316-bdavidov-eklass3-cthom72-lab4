import React, { useState, useEffect } from "react";
import "./Home.css";

import queryString from "query-string";

const Home = ({ location }) => {
  const { code } = queryString.parse(location.search);
  
  useEffect(() => {
    fetch(`/auth?code=${code}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("jwt", res);
      console.log(sessionStorage.getItem("jwt"));
    })
  }, [code]);
  return (
    <>
    </>
  );
};

export default Home;