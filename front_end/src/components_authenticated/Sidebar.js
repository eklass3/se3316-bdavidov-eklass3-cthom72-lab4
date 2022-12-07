import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import './Sidebar.css'

import queryString from "query-string";

const Sidebar = ({ location }) => {
    const { code } = queryString.parse(location.search);

    //fetches the token and stores it in a session container
    useEffect(() => {
        fetch(`/auth?code=${code}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        })
        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem("jwt", res);
            console.log(sessionStorage.getItem("jwt"));
            fetch(`/api/protected/accounts`, {
                method: 'POST',
                headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
        });
    }, [code]);

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

