import "./App.css";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import Home from "./Home";
import Test from "./Test";

import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <div className="App-body">
        <span>
          <LoginButton />
          <LogoutButton />
        </span>
        <Route path="/home" component={Home} />
        <Route path="/test" component={Test} />
      </div>
    </div>
  );
}

export default App;
