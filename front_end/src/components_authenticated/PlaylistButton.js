import React from 'react';
import {Link} from 'react-router-dom'
import "./PlaylistButton.css"

const PlaylistButton = (props) => {
    return(
    <Link to={`/home/playlist/${props.name}`}>
    <button className="playlist">
        <div className='playlistProperty'><span>Name: ${props.name}</span></div>
        <div className='playlistProperty'><span>By: ${props.by}</span></div>
    </button>
    </Link>
    )
}

export default PlaylistButton;