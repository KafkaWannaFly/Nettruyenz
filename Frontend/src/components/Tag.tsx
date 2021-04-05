import React from 'react';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors'
const Tag: React.FC = () => {
    return (
        <div className="tag-button">
            <div className="tag-content">Tag</div>
            <div className="remove-tag-icon">
                <CloseIcon fontSize="small"/>
            </div>
        </div>
    );
}

export default Tag