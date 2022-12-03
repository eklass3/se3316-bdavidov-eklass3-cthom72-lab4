import React from 'react';
import "./Search.css"
import PlaylistButton from './PlaylistButton'

const PlaylistContainer = () => {
    return(
    <div className="playlistHolder">
        <h1>Playlists</h1>
        <PlaylistButton/>
        <PlaylistButton/>
    </div>
    )
}

export default PlaylistContainer;