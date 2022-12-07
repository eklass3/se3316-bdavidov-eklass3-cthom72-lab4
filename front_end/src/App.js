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
import SearchUnauth from "./components_unauthenticated/SearchUnauth";
import Button from "./components_unauthenticated/Button";
import { useEffect, useState } from "react";
import TrackDetails from "./components_unauthenticated/TrackDetails";
import PlaylistDetails from "./components_unauthenticated/PlaylistDetails";

let search = "";

const ROOT = "http://localhost:3000";

function App({}) {

  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);

function onSearch() {
  console.log("Searching");
  const query = `${ROOT}/api/public/tracks?search=${search}`;
  fetch(query)
  .then((response) => response.json())
  .then((data) => {
      setSearchResults(data);
  })
  .catch(function (error) {

  });
}

useEffect(()=>{
  const query = `${ROOT}/api/public/lists/0`;
  fetch(query)
  .then((response) => response.json())
  .then((data) => {
      setPlaylists(data);
  })
  .catch(function (error) {

  });
}, [playlists])

function onSearchChange(event) {
  console.log(event.target.value);
  search = event.target.value;
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Music App</h1>
      </header>
      <div className="App-body">
        <span>
          <LoginButton />
          <LogoutButton />
          <p style={{color: 'black'}}>What this site offers: hundreds of thousands of artists and music across hundreds of genres. Build and review playlists with an account. Login to start.</p>
          <Route path="/home/authenticated" component={Sidebar} />
          <br/>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <SearchUnauth onChange={(event) => onSearchChange(event)} placeholder={"Search for artist, genre, or track title"} style={{width: 500}}/>
            <button onClick={()=>onSearch()}>Search</button>
          </div>

            {searchResults.map((result) => {
              {console.log(result)}
              return(
                <TrackDetails track={result}/>
              )
            })}


            <h3 style={{color: 'black'}}>Public Playlists</h3>

            {playlists.map((playlist) => {
              return(
                <PlaylistDetails playlist={playlist}/>
              )
            })}
            <p style={{color: 'black'}}>View our Privacy Policy <a target="_blank" href="https://docs.google.com/document/d/185wpPyn-yYgTk0jM1wedR7XnTRMPpiRSYPGkB5xdEmY/edit?usp=sharing">here.</a></p>
            <p style={{color: 'black'}}>View our Acceptable Use Policy <a target="_blank" href="https://docs.google.com/document/d/1c5Zeu4AZdyc1UYLKYbTsfP-IwXRqBClBpEWbeKL1OHI/edit?usp=sharing">here.</a></p>
            <p style={{color: 'black'}}>View our DMCA Take Down Policy <a target="_blank" href="https://docs.google.com/document/d/1kABt3cbdyhT62ElTbuTFtq3i1ucOKBDRHBwcfJR-bFY/edit?usp=sharing">here.</a></p>
        </span>
      </div>
      <Route path="/home/search" component={Search}/>
      <Route path="/home/search" component={TrackHolder}/>
      <Route path="/home/search" component={PlaylistContainer}/>
      <Route path="/home/authenticated/library" id='hfasjfkhdakfshfkdfjaks'component={Library}/>
      <Route path="/home/authenticated/playlist" component={Playlist}/>
      <Route path="/home/playlist/id" component={PlaylistData}/>
      <Route path="/test" component={Test}/>
    </div>
  );
}

export default App;
