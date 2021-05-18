
// import { Obj } from "@popperjs/core";
import AdvancedSearchBar from "./AdvancedSearchBar";
import MangaPreviewList from "./MangaPreviewList";
import TagSection from "./TagSection"
import {useState, useEffect, useRef} from 'react'
import {NETTRUYENZ_HOST} from '../../configs'
import axios from 'axios'
export function Categories(props) {
	const [all, setAll] = useState([] as object);
    const [mangas, setMangas] = useState([])
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [input, setInput] = useState([] as string[]);

    function getInputFromSearchBar(input : string[]) {
        setInput(input);
        getMangasAsync();
    }

    async function getMangasAsync() {
        const res = await axios.get(`http://localhost:3000/categories`, {params:{tags: tagList, title: input[0], author: input[1], sortBy:input[2], order:input[3], pediod:input[4]}})
            .then((response) => {
                setMangas(response.data);
            })
            .catch(err => setError(err));
    }

    // useEffect(() => {
    //     console.log(input)
    //     async function getMangasAsync() {
    //         const res = await axios.get(`http://localhost:3000/categories`, {params:{title: input[0], author: input[1], sortBy:input[2], order:input[3], pediod:input[4]}})
    //         console.log(res);
    //     }
    //     getMangasAsync();
    // }, [input])


    const [tagList, setTagList] = useState([] as string[]);
    function getTagListFromTagSection(list : string[]) {
        setTagList(list);
        getMangasAsync();
    }


    // useEffect(() => {
    //     console.log(tagList);
    //     async function getMangasAsync() {
    //         const res = await axios.get(`http://localhost:3000/categories`, {params:{tags: tagList}})
    //         console.log(res);
    //     }
    //     getMangasAsync();
    // }, [tagList])

    function getRencentlyUpload() {
        return fetch('http://localhost:3000/recently-uploaded?period=all').then(res => res.json());
    }

    useEffect(() => {
        let mounted = true;
        getRencentlyUpload()
            .then((result) => {
                if (mounted) {
                    setMangas(result);
                }
            },
                (error) => {
                    setError(error);
                });
        setIsLoaded(true);
    }, []);

	return (
        <>
            <div className="h-full">
                <AdvancedSearchBar getInputFromSearchBar={getInputFromSearchBar}></AdvancedSearchBar>
                <TagSection getTagListFromTagSection={getTagListFromTagSection}/>
                {isLoaded && <MangaPreviewList mangaList={mangas} />}
            </div>
        </>
    );
};
