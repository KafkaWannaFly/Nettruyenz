import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Console } from 'node:console';


export const Tag = (props) => {
    const color = generateColor();

    function generateColor() {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randomColor;
}
    console.log(props)
    return (
        <div className="tag-button" style={{borderColor: color}}>
            <div className="tag-content">LMAO</div>
            <div className="remove-tag-icon" style={{color: color}}>
                <CloseIcon fontSize="small"/>
            </div>
        </div>
    );
}
