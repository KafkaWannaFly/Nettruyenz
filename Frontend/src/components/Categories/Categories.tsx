import { Obj } from "@popperjs/core";
import AdvancedSearchBar from "./AdvancedSearchBar";
import MangaPreviewList from "./MangaPreviewList";
import TagSection from "./TagSection";
import { useState, useEffect } from "react";
import { NETTRUYENZ_HOST } from "../../configs";
import axios from "axios";
import { useParams } from "react-router-dom";
import queryString from "query-string";

export function Categories(props) {
	const parsed = queryString.parse(props.location.search);
	const searchKeyword = parsed.searchKeyword;
	console.log(searchKeyword); // Search keyword here

	const [all, setAll] = useState([] as object);
	const [mangas, setMangas] = useState([]);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [input, setInput] = useState([] as string[]);

	function getInputFromSearchBar(input: string[]) {
		console.log(input);
		setInput(input);
		getMangasAsync();
	}

	const [tagList, setTagList] = useState([] as string[]);
	function getTagListFromTagSection(list: string[]) {
		setTagList(list);
		getMangasAsync();
	}

	async function getMangasAsync() {
		const res = await axios
			.get(`http://localhost:3000/categories`, {
				params: {
					tags: tagList,
					title: input[0],
					author: input[1],
					sortBy: input[2],
					order: input[3],
					pediod: input[4],
				},
			})
			.then((response) => {
				console.log(response.data);
				setMangas(response.data);
			})
			.catch((err) => setError(err));
	}

	function getRencentlyUpload() {
		return fetch("http://localhost:3000/recently-uploaded?period=all").then(
			(res) => res.json()
		);
	}

	useEffect(() => {
		let mounted = true;
		getRencentlyUpload().then(
			(result) => {
				if (mounted) {
					console.log(result);
					setMangas(result);
				}
			},
			(error) => {
				setError(error);
			}
		);
		setIsLoaded(true);
	}, []);

	return (
		<>
			<div className="h-full">
				<AdvancedSearchBar
					getInputFromSearchBar={getInputFromSearchBar}
				></AdvancedSearchBar>
				<TagSection getTagListFromTagSection={getTagListFromTagSection} />
				{isLoaded && <MangaPreviewList mangaList={mangas} />}
			</div>
		</>
	);
}
