import { connect, useDispatch, useSelector } from "react-redux";
import { deletePost } from "../actions/PostActions";
import img1 from "../logos/chutich.jpg";
import ReactStars from "react-rating-stars-component";
import { BsFileEarmarkText, BsClock, BsChatDots, BsBookmarks, BsHeart } from 'react-icons/bs';
import { Link, Route } from "react-router-dom";
import React from "react";


interface AbcState {
	error: any,
	isLoaded: boolean,
	homes: any[],
	filter: boolean,
}


class Post extends React.Component<{}, AbcState> {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			homes: new Array(),
			filter: true,
		};
	}

	componentDidMount() {
		fetch('http://localhost:3000/most-view?period=all')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						homes: result
					});
				},
				// error handler
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}
	ratingChanged = (newRating) => {
		console.log(newRating);
	};
	// const chapTable = () => {
	// 	console.log(posts);
	// 	const chapTb = posts.map((item) => {
	// 		return (
	// 			<>
	// 				<tr>
	// 					<Link to={"/"}>
	// 						<td>{item.content}</td>
	// 					</Link>
	// 					<td>{item.id}</td>
	// 					<td>{item.views}</td>
	// 				</tr>
	// 			</>
	// 		);
	// 	});
	// 	return chapTb;
	// }
	render() {
		return (
			<div className="container flex flex-wrap px-10  ">
				<div className="lg:w-3/4 px-3 bg-gray-1000 text-white">
					<section>
						<div className="flex flex-wrap pt-3">
							<div className="lg:w-2/3">
								<h1 className="font-bold text-2xl">Song Tinh Âm Dương</h1>
								<ReactStars
									count={5}
									onChange={this.ratingChanged}
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
								<div className="pb-2">
									<span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">#Tag1</span>
									<span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">#Tag2</span>
								</div>
							</div>
							<div className="lg:w-1/3 h-full">
								<img className="rounded-lg" src={img1}>
								</img>
								<div className="w-full pt-2">
									<button className="bg-gray-300 pl-28 hover:bg-gray-400 text-gray-800 font-semibold py-2 w-full border-2 border-gray-400 rounded shadow inline-flex items-center">
										<span className="px-2">Follow</span>
										<BsBookmarks className="fa-flag" size="20px"></BsBookmarks>
									</button>
								</div>
							</div>
						</div>
						<div></div>
					</section>
					<section>
						<div className="inline-flex items-center">
							<BsFileEarmarkText size="20px"></BsFileEarmarkText>
							<h1 className="text-xl pl-1">CONTENT</h1>
						</div>
						<hr className="bg-red-700 h-1 border-none"></hr>
						<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore excepturi delectus, vel aperiam sunt nostrum explicabo soluta velit architecto corrupti optio nemo alias in ratione at maiores sint suscipit incidunt.</p>
					</section>
					<section className="pt-2">
						<div className="inline-flex items-center">
							<BsFileEarmarkText size="20px"></BsFileEarmarkText>
							<h1 className="text-xl pl-1">CHAPTERS</h1>
						</div>
							<hr className="bg-red-700 h-1 border-none"></hr>
						<div className="px-2">
							<p>X Chapter</p>
							<div className="inline-flex items-center">
								<BsClock></BsClock>
								<p className="pl-1">18/04/2021 23:15</p>
							</div>
						</div>
						<div>
							<hr className="bg-red-700 h-1 w-10 border-none"></hr>
							<table className="table-fixed">
								<thead>
									<tr>
										<th className="w-1/2">Chapter</th>
										<th className="w-1/4">Author</th>
										<th className="w-1/4">Views</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<Link to={"/"}>
											<td>Chap 1</td>
										</Link>
										<td>Adam</td>
										<td>858</td>
									</tr>
									<tr className="bg-emerald-200">
										<td>Chap 2</td>
										<td>Adam</td>
										<td>112</td>
									</tr>
									<tr>
										<td>Chap 3</td>
										<td>Chris</td>
										<td>1,280</td>
									</tr>

								</tbody>
							</table>
						</div>
					</section>
				</div>
				<div className="lg:w-1/4 bg-gray-1000 px-2">
					<div className="pt-2 inline-flex border-b-2 border-green-700 text-white">
						<BsChatDots size="20px"></BsChatDots>
						<h1 className="text-xl pl-1">CHAT</h1>
						<hr></hr>
					</div>
					<div>
						<div className="flex mx-auto items-center justify-center mt-1 mb-4 max-w-lg">
							<form className="w-full max-w-xl bg-gray-1000 pt-2">
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-full px-3 mb-2 mt-2">
										<textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
									</div>
									<div className="w-full md:w-full flex items-start px-3 ">
										<div className="-mr-1 text-black">
											<input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment'></input>
										</div>
									</div>
								</div>
      						</form>
						</div>
						<div className="inline-flex">
							<div className="lg:w-1/6">
								<Link to="/">
									<div>
										<img src={img1} alt="" id="avatar" className="rounded-full h-10 w-10 flex items-center justify-center"/>
									</div>
								</Link>
							</div>
							<div className="lg:w-5/6 text-white">
								<h2 className="font-bold text-lg">Việt Hoàng</h2>
								<p>Chưa bao giờ đọc bộ truyện nào hay như thế này !!! :)</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default Post ;
