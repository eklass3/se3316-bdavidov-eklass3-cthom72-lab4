import React from 'react';
import "./Playlist.css"

const Playlist = () => {
    const addPlaylist = async () => {
        fetch(`/api/protected/lists`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
            },
            body: {
                description: `test`,
                public: '0',
                list_name: 'sample name',
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
    }
    return(
    <form className="add-playlist">
        <div className="item"><span>Playlist Name</span><input placeholder="Name"></input></div>
        <div className="item"><span>Descripton</span><input placeholder="Description"></input></div>
        <div className="item"><span>Private Playlist</span><input type="checkbox" defaultChecked={true}></input></div>
        <div className='item'><button id='add-button' onClick={() => addPlaylist()}>Add</button></div>
    </form>
    )
}

export default Playlist;