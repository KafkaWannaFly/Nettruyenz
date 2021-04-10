import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const color = generateColor();

function generateColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
}

const Tag: React.FC = () => {
    return (
        <div id="tags-container">
            <div className="tag-button" style={{borderColor: color}}>
                <div className="tag-content">LMAOOOOOOOOOOOOO</div>
                <div className="remove-tag-icon" style={{color: color}}>
                    <CloseIcon fontSize="small"/>
                </div>
            </div>
        </div>
    );
}

export default Tag