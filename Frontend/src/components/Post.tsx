import { connect, useDispatch, useSelector } from "react-redux";
import { deletePost } from "../actions/PostActions";
import img1 from "../logos/chutich.jpg";
import ReactStars from "react-rating-stars-component";
import { FaBeer } from 'react-icons/fa';

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

	// return post !== undefined ? (
	// 	<div className="container">
	// 		<h2 className="center indigo-text darken-4">{post.title}</h2>
	// 		<div>{post.content}</div>
	// 		<div className="right">
	// 			<div className="btn red center" onClick={onDeleteButtonClick}>
	// 				Delete
	// 			</div>
	// 		</div>
	// 	</div>
	// ) : null;
	const ratingChanged = (newRating) => {
		console.log(newRating);
	};
	return (
		<div className="container flex flex-wrap px-10">
			<div className="lg:w-3/4 bg-white">
				<section>
					<div className="flex flex-wrap pt-3">
						<div className="lg:w-1/3 h-full">
							<img src={img1}>
							</img>
						</div>
						<div className="lg:w-2/3 pl-4">
							<h1>Name</h1>
								<ReactStars
									count={5}
									onChange={ratingChanged}
									size={30}
									value={3.4}
									isHalf={true}
									activeColor="#ffd700"
								/>
								<p>... Đánh giá</p>
								<p>Tên khác:</p>
								<p>Tác giả:</p>
								<p>Nhóm dịch:</p>
								<p>Tình trạng:</p>
								<p>Ngày thêm:</p>
								<p>Tổng lượt xem:</p>
								<p>Thể loại:</p>
						</div>
					</div>
					<div></div>
				</section>
				<section>
					def
				</section>
			</div>
			<div className="lg:w-1/4 bg-gray-700">cde</div>
		</div>
	)
};

export { Post };
