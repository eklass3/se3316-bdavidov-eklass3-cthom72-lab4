import React from 'react';
import "./Playlist.css"

const Playlist = () => {
    return(
    <form className="add-playlist">
        <div className="item"><span>Playlist Name</span><input placeholder="Name"></input></div>
        <div className="item"><span>Descripton</span><input placeholder="Description"></input></div>
        <div className="item"><span>Private Playlist</span><input type="checkbox" defaultChecked={true}></input></div>
        <div className='item'><button id='add-button'>Add</button></div>
    </form>
    )
}

export default Playlist;