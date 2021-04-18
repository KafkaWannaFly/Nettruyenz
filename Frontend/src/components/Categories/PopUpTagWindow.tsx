import React from 'react'
import CloseIcon from '@material-ui/icons/Close';

interface PopUpState {
    isClosed: boolean,
    isInvisibleLayoutClicked: boolean,
}

interface PopUpProps {
    closePopUpTagWindowFunction: any
}
export class PopUpTagWindow extends React.Component<PopUpProps, PopUpState> {
    constructor({props}) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    };

    handleCloseClick() {
        this.props.closePopUpTagWindowFunction()
    }
    render() {
        return (
            <div>
                <div id="invisible-layout" onClick={this.handleCloseClick}></div>
                <div id="tag-window">
                    <div id="tag-window-content">
                        <div id="close-window-button" onClick={this.handleCloseClick}>
                            <CloseIcon fontSize="large" />
                        </div>
                        <input
                            id="search-tag"
                            type="text"
                            placeholder="Enter your tag name here" />
                        <div id="tag-container">
                            <TagInitial />
                        </div>
                        <div id="option-buttons-container">
                            <div id="apply-button" className="button-text">
                                <span >
                                    Apply
                    </span>
                            </div>
                            <div id="cancel-button" className="button-text">
                                <span>
                                    Cancel
                    </span>
                            </div>
                        </div>

                    </div>
                </div>
                
                
            </div>
        )
    }
}

const TagInitial = (props) => {
    const color = generateColor();

    function generateColor() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor;
    }
    return (
        <div className="tag-button-initial" style={{ borderColor: color }}>
            <div className="tag-content">LMAO</div>
        </div>
    )
}