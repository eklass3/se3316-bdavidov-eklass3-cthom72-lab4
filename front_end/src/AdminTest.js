import "./Home.css";
import {useState, useEffect} from "react";
function AdminTest(){
  const [header, setHeader] = useState("none");
  useEffect(() => {
    fetch(`/admin`, {
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
          <h3>Admin Test</h3>
          <h2>{header}</h2>
    </div>
  );
}

export default AdminTest;
