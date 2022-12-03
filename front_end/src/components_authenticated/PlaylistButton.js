import React from 'react';
import {Link} from 'react-router-dom'
import "./PlaylistButton.css"

const PlaylistButton = () => {
    return(
    <Link to='/home/playlist/id'>
    <button className="playlist">
        <div className='playlistProperty'><span>Name: </span></div>
        <div className='playlistProperty'><span>By: </span></div>
    </button>
    </Link>
    )
}

export default PlaylistButton;