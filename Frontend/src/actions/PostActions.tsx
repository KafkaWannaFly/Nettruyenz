const deletePost = (id) => {
	return {
		type: "DELETE_POST",
		id,
	};
};

export { deletePost };
