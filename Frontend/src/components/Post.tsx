import { connect, useDispatch, useSelector } from "react-redux";
import { deletePost } from "../actions/PostActions";

const Post = (props) => {
	const post = useSelector((state: any) => {
		// console.log(state)
		const posts = state.posts as [any];
		return posts.find((post) => post.id == props.match.params.id);
	});
	// console.log(post);

	const dispatch = useDispatch();

	const onDeleteButtonClick = (e) => {
		dispatch(deletePost(post.id));
		props.history.push("/");
	};

	return post !== undefined ? (
		<div className="container">
			<h2 className="center indigo-text darken-4">{post.title}</h2>
			<div>{post.content}</div>
			<div className="right">
				<div className="btn red center" onClick={onDeleteButtonClick}>
					Delete
				</div>
			</div>
		</div>
	) : null;
};

export { Post };
