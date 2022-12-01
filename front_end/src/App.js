import "./App.css";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import Challenges from "./Challenges";

import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard 2</h1>
      </header>
      <div className="App-body">
        <span>
          <LoginButton />
          <LogoutButton />
        </span>
        <Route path="/challengesFront" component={Challenges} />
      </div>
    </div>
  );
}

export default App;
