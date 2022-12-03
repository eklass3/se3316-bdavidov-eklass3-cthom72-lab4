
import "./Home.css";
import {useState, useEffect} from "react";
function Test(){
  const [header, setHeader] = useState("none");
  useEffect(() => {
    fetch(`/protected`, {
      method: 'GET',
      headers: {
       Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
      }
    })
    .then(res => res.json())
    .then(res => {
      setHeader(JSON.stringify(res));
    })
  },[]);
  return (
    <div className="Home-body">
          <h3>Protected Test</h3>
          <h2>{header}</h2>
    </div>
  );
}

export default Test;
