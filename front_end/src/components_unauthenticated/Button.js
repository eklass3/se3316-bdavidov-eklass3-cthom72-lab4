import React from 'react';

const Button = (props) => {
    return(
        <button onclick={()=>props.onClick()} style={props.style}>{props.text}</button>
    )
}

export default Button;