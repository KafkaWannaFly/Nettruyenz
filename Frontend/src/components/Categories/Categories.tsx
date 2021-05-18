
import { Obj } from "@popperjs/core";
import AdvancedSearchBar from "./AdvancedSearchBar";
import MangaPreviewList from "./MangaPreviewList";
import TagSection from "./TagSection"
import {useState, useEffect} from 'react'
import {NETTRUYENZ_HOST} from '../../configs'
import axios from 'axios'
export function Categories(props) {
	const [all, setAll] = useState([] as object);

    const [input, setInput] = useState([] as string[]);
    function getInputFromSearchBar(input : string[]) {
        setInput(input);
    }

    useEffect(() => {
        async function getMangasAsync() {
            const res = await axios.get(`http://localhost:3000/categories/find-manga`)
            console.log(res);
        }
        getMangasAsync();
    }, [input])



    const [tagList, setTagList] = useState([] as string[]);
    function getTagListFromTagSection(list : string[]) {
        setTagList(list);
    }

	return (
        <>
            <div className="h-full">
                <AdvancedSearchBar getInputFromSearchBar={getInputFromSearchBar}></AdvancedSearchBar>
                <TagSection getTagListFromTagSection={getTagListFromTagSection}/>
                <MangaPreviewList></MangaPreviewList>
            </div>
        </>
    );
};
