import AddTagButton from "./AddTagButton"
import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close';

function TagSection() {
    function getData() {
        return fetch('http://localhost:3000/tags').then(res => res.json());
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [list, setList] = useState([]);
    useEffect(() => {
        let mounted = true;
        getData()
            .then((result) => {
                if (mounted) {
                    setList(result);
                }
            },
                (error) => {
                    setError(error);
                });
        setIsLoaded(true);
    }, []);


    const [chosenTagList, setChosenTagList] = useState([] as string[]);
    useEffect(() => {
        console.log(chosenTagList);
    })

    function removeTag(tag) {
        setChosenTagList(chosenTagList.filter(each => (each !== tag)));
    }

    function renderTag() {    
        
        const tags = chosenTagList.map((tag, index) => {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return (
                <div>
                    <div className="tag-button" style={{ borderColor: randomColor }} onClick={() => removeTag(tag)}>
                        <div className="tag-content">{tag}</div>
                        <div className="remove-tag-icon" style={{ color: randomColor }}>
                            <CloseIcon fontSize="small" />
                        </div>
                    </div>
                </div>
            )
        });
        return tags;
    }


    function handleChosenTagList(list: string[]) {
        let newList = [...chosenTagList];
        list.map((tag) => {
            if (!newList.includes(tag)) {
                newList.push(tag);
            }
        })
        setChosenTagList(newList);
    }

    return (
        <div id="tag-section">
            <div id="tag-list">
                {renderTag()}
            </div>
            <AddTagButton tagList={list} handleTagListFunction={handleChosenTagList} />
        </div>
    )
}
export default TagSection;