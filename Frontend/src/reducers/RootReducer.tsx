
//get data from backend
import React from 'react';
const axios = require('axios');
// const response = axios.get('http://localhost:3000/most-view?period=weekly');
//console.log(data);
//convert data to frontend
// let raps;
// data.then(response => response.json()).then((result) => {
// 	console.log(result.data);
// 	raps = result.data;
// });
// console.log(raps);
const initState = {
	categoryHome:[
		{
			id: 1,
			title: "Most Viewed >",
		},
		{
			id: 2,
			title: "Most Followed >",
		},
		{
			id: 3,
			title: "High Rating >",
		},
		{
			id: 4,
			title: "Following >",
		},
		{
			id: 5,
			title: "Recently Updated >",
		},
		{
			id: 6,
			title: "Newly Added >",
		},
		{
			id: 7,
			title: "Maybe You Should Read This >",
		}
	],
	posts: [
		{
			id: 1,
			title: "Isekai Ojisan",
			content:"Chapter",
			imageURL: "../logos/img1.jpg"
		},
		{
			id: 2,
			title: "Mushoku Tensei",
			content:
			"Chapter",
			imageURL: "../logos/img2.jpg"
		},
		{
			id: 3,
			title: "Re:Zero",
			content:
			"Chapter",
			imageURL: "../logos/img3.jpg"
		},
		{
			id: 4,
			title: "Re:Zero",
			content:
			"Chapter",
			imageURL: "../logos/im4.jpg"
		},
		{
			id: 5,
			title: "Re:Zero",
			content:
			"Chapter",
			imageURL: "../logos/img5.jpg"
		},
	],
};

export const RootReducer = (state = initState, action: any) => {
	// if (action.type === "DELETE_POST") {
	// 	let newPosts = state.posts.filter((post) => {
	// 		return post.id !== action.id;
	// 	});

	// 	return {
	// 		...initState,
	// 		posts: newPosts,
	// 	};
	// }
	return initState;
};
