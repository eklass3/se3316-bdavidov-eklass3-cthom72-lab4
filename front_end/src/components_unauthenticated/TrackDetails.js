import React, {useState} from 'react';

function TrackDetails(props) {

    const [count, setCount] = useState(-1);

    let ytLink = `https://www.youtube.com/results?search_query=${props.track.track_title}`;

    if (count === -1) {
        return(
            <button style={{width: 500, height: 100, backgroundColor: 'gray', borderRadius: 15}} onClick={()=>setCount(count*-1)}>
                <p>Title: {props.track.track_title} | Artist: {props.track.artist_name}</p>
            </button>
        )
    } else {
        return(
            <button style={{width: 500, height: 100, backgroundColor: 'gray', borderRadius: 15}} onClick={()=>setCount(count*-1)}>
            <p>Title: {props.track.track_title} | Artist: {props.track.artist_name}</p>
            <p>Language: {props.track.track_language_code}, Play-time: {props.track.track_duration} Year: {props.track.track_date_recorded}</p>
            <div style={{backgroundColor: 'green', borderRadius: 15}}>
                <p><a href={ytLink} target="_blank">Play</a></p>
            </div>
            </button>
        )
    }
}

export default TrackDetails;