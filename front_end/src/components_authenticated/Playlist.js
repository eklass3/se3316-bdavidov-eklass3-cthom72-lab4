import React from 'react';
import { useState, useEffect} from 'react';
import "./Playlist.css"

const Playlist = () => {
    const [playlistName, setPlaylistName] = useState('')
    const [description, setDescription] = useState('')
    const [checked, setChecked] = useState(true)

    const addPlaylist = async() => {
        const check = checked ? 1 : 0
        fetch(`/api/protected/lists`, {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            },
            body: {
                description: description,
                public: check,
                list_name: playlistName,
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
    }

    const handlePlaylistName = (e) => {
        setPlaylistName(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleChecked = (e) => {
        setChecked(e.target.checked);
    }

    return(
    <form className="add-playlist">
        <div className="item"><span>Playlist Name</span><input placeholder="Name" onChange={handlePlaylistName}/></div>
        <div className="item"><span>Descripton</span><input placeholder="Description" onChange={handleDescription}/></div>
        <div className="item"><span>Private Playlist</span><input type="checkbox" defaultChecked={true} onChange={handleChecked}/></div>
        <div className='item'><button id='add-button' onClick={() => addPlaylist()}>Add</button></div>
    </form>
    )
}

export default Playlist;