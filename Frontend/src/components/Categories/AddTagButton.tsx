import React from 'react'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import {PopUpTagWindow} from "./PopUpTagWindow"

export class AddTagButton extends React.Component<{}, {isOpened:boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        }

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.setState(state => ({
          isOpened: !state.isOpened
        }));
      }
    render() {
        return (
            <div>
                <div id="add-tag-button" onClick={this.handleClick}>
                    <AddCircleOutlineRoundedIcon fontSize="large"/>
                </div>
                {this.state.isOpened && <PopUpTagWindow closePopUpTagWindowFunction={() => this.handleClick()}/>}
            </div>
        )
    }
}