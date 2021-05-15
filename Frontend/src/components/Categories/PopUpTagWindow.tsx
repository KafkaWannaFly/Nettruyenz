import { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';

function PopUpTagWindow(props) {
    let tagList = props.tagList;
    const tagChosenList : string[] = [];

    const handleCloseClick = () => {
        props.closePopUpTagWindowFunction();
    }

    const handleTagAdd = (name: string, [backGroundColor, setBackGroundColor], [textColor, setTextColor]) => {
        if (backGroundColor === "#FFFFFF00") {
            setBackGroundColor("#FFFFFFFF");
            setTextColor("#000000");
            tagChosenList.push(name);
        }
        else {
            setBackGroundColor("#FFFFFF00")
            setTextColor("#FFFFFF");
            tagChosenList.splice(tagChosenList.findIndex(el => el === name), 1);
        }
    }

    function handleTagChosenApply() {
        props.handleTagListFunction(tagChosenList);
        props.closePopUpTagWindowFunction();
    }

    function TagInitial(props) {
        const [borderColor, setBorderColor] = useState(generateColor());
        function generateColor() {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return "#" + randomColor;
        }

        const [backGroundColor, setBackGroundColor] = useState("#FFFFFF00");
        const [textColor, setTextColor] = useState("#FFFFFF");

        return (
            <div className="tag-button-initial" style={{ borderColor: borderColor, backgroundColor: backGroundColor, color: textColor }}
                onClick={() => handleTagAdd(props.name, [backGroundColor, setBackGroundColor], [textColor, setTextColor])}>
                <div className="tag-content">{props.name}</div>
            </div>
        )
    }

    function renderTag(tagList) {
        const render = tagList.map((tag, index) => {
            return <TagInitial key={index} name={tag.name} />
        });
        return render;
    }

    const [searchTagResult, setSearchTagResult] = useState(tagList);
    function handleTagListChange(event) {
        let tempTagList = tagList;
        if(event.key === "Enter") {
            let value : string = event.target.value;
            if(value.length !== 0) {
                setSearchTagResult(tagList.filter((each) => each.name.includes(value) === true))
            }
            else {
                setSearchTagResult(tagList);
            }
        }
    }


    return (
        <div>
            <div id="invisible-layout" onClick={handleCloseClick}></div>
            <div id="tag-window">
                <div id="tag-window-content">
                    <div id="close-window-button" onClick={handleCloseClick}>
                        <CloseIcon fontSize="large" />
                    </div>
                    <input
                        id="search-tag"
                        type="text"
                        placeholder="Enter your tag name here"
                        onKeyPress={e => handleTagListChange(e)} />
                    <div id="tag-container">
                        {renderTag(searchTagResult)}
                    </div>
                    <div id="option-buttons-container">
                        <div id="apply-button" className="button-text" onClick={handleTagChosenApply}>
                            <span>
                                Apply
                            </span>
                        </div>
                        <div id="cancel-button" className="button-text" onClick={handleCloseClick}>
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

export default PopUpTagWindow