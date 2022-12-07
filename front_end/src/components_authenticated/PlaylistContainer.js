import React from 'react';
import "./Search.css"
import PlaylistButton from './PlaylistButton'

const PlaylistContainer = (props) => {
    const lists = props.lists.map((list) => <PlaylistButton name={list.list_name} by={list.creator_id}/>)
    return(
    <div className="playlistHolder">
        <h1>Playlists</h1>
       {
        lists
       }
    </div>
    )
}

export default PlaylistContainer;