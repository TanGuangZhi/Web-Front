import React from 'react';

export default function FunctionalComp(props){
    console.log(props);
    return(
        <div>Hello World {props.msg}</div>
    )
}
