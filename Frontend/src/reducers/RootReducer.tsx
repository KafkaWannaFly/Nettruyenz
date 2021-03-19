const initState = {
	posts: [
		{
			id: 1,
			title: "Isekai Ojisan",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ullam repudiandae natus eligendi voluptas dolore, est fugit facere corporis inventore hic dignissimos quis? Repellat dolores assumenda quis perferendis exercitationem qui.",
		},
		{
			id: 2,
			title: "Mushoku Tensei",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ullam repudiandae natus eligendi voluptas dolore, est fugit facere corporis inventore hic dignissimos quis? Repellat dolores assumenda quis perferendis exercitationem qui.",
		},
		{
			id: 3,
			title: "Re:Zero",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ullam repudiandae natus eligendi voluptas dolore, est fugit facere corporis inventore hic dignissimos quis? Repellat dolores assumenda quis perferendis exercitationem qui.",
		},
	],
};

export const RootReducer = (state = initState, action) => {
	if (action.type === "DELETE_POST") {
		let newPosts = state.posts.filter((post) => {
			return post.id !== action.id;
		});

		return {
			...initState,
			posts: newPosts,
		};
	}

	return initState;
};
