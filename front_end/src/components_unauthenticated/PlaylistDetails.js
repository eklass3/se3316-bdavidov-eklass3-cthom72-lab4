import React, {useState, useEffect } from 'react';
import TrackDetails from "./TrackDetails";

function PlaylistDetails(props) {

    const [count, setCount] = useState(-1);
    const [tracks, setTracks] = useState([]);

    useEffect(()=>{
        const query = `http://localhost:3000/api/public/lists/tracks/${props.playlist.list_name}`;
        fetch(query)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                const query2 = `http://localhost:3000/api/public/tracks/${data[i].track_id}`;
                fetch(query2)
                .then((response) => response.json())
                .then((track_details) => {
                    console.log(track_details);
                    
                    setTracks(current => [...current, track_details]);
                })
                .catch(function (error) {
            
                });
            }
        })
        .catch(function (error) {
      
        });
      }, tracks)

    if (count === -1) {
        return(
            <button style={{width: 500, height: 100, backgroundColor: 'white', borderRadius: 15}} onClick={()=>setCount(count*-1)}>
                <p>Playlist Name: {props.playlist.list_name} | Creator id: {props.playlist.creator_id} | Total play-time: {props.playlist.total_duration} | Track Count: {props.playlist.track_count}</p>
            </button>
        )
    } else {
        return(
            <button style={{width: 500, height: 200*(tracks.length)}}>
            <button style={{width: 500, height: 100, backgroundColor: 'white', borderRadius: 15}} onClick={()=>setCount(count*-1)}>
            <p>Playlist Name: {props.playlist.list_name} | Creator id: {props.playlist.creator_id} | Total play-time: {props.playlist.total_duration} | Track Count: {props.playlist.track_count}</p>
            </button>
                      {tracks.map((track) => {
                        {console.log("TRACK: " + JSON.stringify(track))}
                      return(
                        <TrackDetails track={track[0]}/>
                      )
                    })}
            </button>
        )
    }
}

export default PlaylistDetails;