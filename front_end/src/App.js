import "./App.css";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";

import Sidebar from "./components_authenticated/Sidebar"
import Search from "./components_authenticated/Search"
import Playlist from "./components_authenticated/Playlist"
import TrackHolder from "./components_authenticated/TrackHolder";
import PlaylistContainer from "./components_authenticated/PlaylistContainer";
import Library from "./components_authenticated/Library";
import PlaylistData from "./components_authenticated/PlaylistData";
import Test from "./Test";

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
      </div>
      <Route path="/home" component={Sidebar} />
      <Route path="/home/search" component={Search}/>
      <Route path="/home/search" component={TrackHolder}/>
      <Route path="/home/search" component={PlaylistContainer}/>
      <Route path="/home/library" component={Library}/>
      <Route path="/home/playlist" exact component={Playlist}/>
      <Route path="/home/playlist/id" component={PlaylistData}/>
      <Route path="/test" component={Test}/>
    </div>
  );
}

export default App;
