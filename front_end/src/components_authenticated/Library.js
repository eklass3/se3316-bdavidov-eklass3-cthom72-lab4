import React from 'react';
import {useEffect, useState} from 'react';
import PlaylistContainer from './PlaylistContainer'

const ROOT = "http://localhost:3000";

const Library = () => {
    const [lists, setLists] = useState([])
    useEffect(() => {
        fetch(`${ROOT}/api/protected/userLists`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}`}
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setLists(data)
        })
    })
    return(
    <div className="library">
        <PlaylistContainer lists={lists}/>
    </div>
    )
}

export default Library;