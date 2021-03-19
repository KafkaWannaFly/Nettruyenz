import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = (props) => {
	// const { posts } = props;
	const posts = useSelector((state: any) => state.posts);

	const homeDiv = posts.map((item) => {
		return (
			<div className="card" key={item.id}>
				<div className="row">
					<Link to={"/" + item.id}>
						<div className="card-title col indigo-text darken-4">
							{item.title}
						</div>
					</Link>
				</div>
				<div className="card-content">{item.content}</div>
			</div>
		);
	});

	return <div className="container">{homeDiv}</div>;
};

// const mapStateToProps = (state) => {
// 	return {
// 		posts: state.posts,
// 	};
// };

// const home = connect(mapStateToProps)(Home);

// export { home as Home };
