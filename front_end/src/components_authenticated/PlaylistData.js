import React from "react";
import TrackHolder from './TrackHolder'

const PlaylistData = (params) => {
    return (
        <div className="playlist-data">
            <h1>{params.playlistName}</h1>
            <button>Delete</button>
            <TrackHolder/>
        </div>
    )
}

export default PlaylistData;