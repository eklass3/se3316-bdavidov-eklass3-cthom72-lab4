import React from 'react';

const SearchUnauth = (props) => {
    return(
    <div>
       <input placeholder={props.placeholder} onChange={(event) => props.onChange(event)} style={props.style}></input>
    </div>
    )
}

export default SearchUnauth;