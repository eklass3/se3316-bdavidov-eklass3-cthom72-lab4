import React from 'react';
import {useEffect, useState} from 'react';
import PlaylistContainer from './PlaylistContainer'

const Library = (id) => {
    const [lists, setLists] = useState([])
    useEffect(() => {
        fetch(`api/protected/lists/${id}`)
        .then(res => res.json())
        .then(data => {
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