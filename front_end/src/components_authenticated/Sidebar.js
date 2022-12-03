import React from "react";
import {Link} from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
    return(
    <div className="sidebar">
        <nav>
            <h1>Navigation</h1>
            <Link to='/home/search'><button className="sidebar-button"><span>Search</span></button></Link>
            <Link to='/home/library'><button className="sidebar-button"><span>Your Library</span></button></Link>
            <Link to='/home/playlist'><button className="sidebar-button"><span>Create Playlist</span></button></Link>
        </nav>
    </div>
    )
}

export default Sidebar

