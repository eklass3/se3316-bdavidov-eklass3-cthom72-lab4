import React from "react";
import TrackHolder from './TrackHolder'

const PlaylistData = () => {
    return (
        <div className="playlist-data">
            <h1>Playlist Name</h1>
            <button>Delete</button>
            <TrackHolder/>
        </div>
    )
}

export default PlaylistData;