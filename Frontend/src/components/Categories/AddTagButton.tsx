import {useState} from 'react'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import PopUpTagWindow from "./PopUpTagWindow"

function AddTagButton(props) {
    const [isOpened, setIsOpened] = useState(false);
    let tagList = props.tagList;

    const handleClick= () => {
        setIsOpened((prevState) => !prevState);
    }

    return (
        <div>
            <div id="add-tag-button" onClick={handleClick}>
                <AddCircleOutlineRoundedIcon fontSize="large"/>
            </div>
            {isOpened && <PopUpTagWindow closePopUpTagWindowFunction={handleClick} tagList={tagList} handleTagListFunction={props.handleTagListFunction}/>}
        </div>
    )
}

export default AddTagButton;