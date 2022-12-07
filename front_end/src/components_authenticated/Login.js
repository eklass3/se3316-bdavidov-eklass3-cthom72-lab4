import React, { useMemo } from "react";
import {Link} from 'react-router-dom'
import './Sidebar.css'

import queryString from "query-string";
let i = 0;
const Login = ({ location }) => {
    const { code } = queryString.parse(location.search);
    //fetches the token and stores it in a session container
    useMemo(async ()=>{
        console.log('In memo' + i);
        i++;
        await fetch(`/auth?code=${code}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
            })
            .then(res => res.json())
            .then(async res => {
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
            console.log('test')
            window.location.replace('http://localhost:3000/home/authenticated'); //reroutes the response from localhost:3000/challenges
    },[code])
    return(<></>)
}

export default Login;
