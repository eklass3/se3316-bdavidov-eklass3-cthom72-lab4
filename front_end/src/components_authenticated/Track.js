import React from 'react';
import "./Track.css"

const Track = () => {

    const makeVisible = event => {
        document.querySelectorAll('.popup').style.color = 'red'
    }

    return(
    <div className="track">
        <div className='trackProperty'><span>Name: </span></div>
        <div className='trackProperty'><span>Artist: </span></div>
        <div className='trackProperty'><span>Album: </span></div>
        <div className='trackProperty'><span><button className='expandButton' onClick={makeVisible}>Expand</button></span></div>
    </div>
    )
}

export default Track;