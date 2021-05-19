import { connect, useDispatch, useSelector } from "react-redux";
// import { deletePost } from "../actions/PostActions";
import img1 from "../logos/chutich.jpg";
import ReactStars from "react-rating-stars-component";
import {
	BsFileEarmarkText, BsClock, BsChatDots, BsBookmarks, BsCardList
	, BsStar, BsStarHalf, BsStarFill, BsChevronDoubleRight, BsChevronDoubleLeft
} from 'react-icons/bs';
import { Link, Route } from "react-router-dom";
import React from "react";
import { CompletedMangaDto } from "../DTOs/CompletedMangaDto";
import ReactPaginate from 'react-paginate';
import { PostAddSharp } from "@material-ui/icons";

interface AbcState {
	error: any,
	isLoaded: boolean,
	posts: CompletedMangaDto,
	filter: boolean,
	match: any,
	pageCount: number,
	indexComment: number,
	commentsPag: any,
	comments: any
}


class Post extends React.Component<{}, AbcState> {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			posts: {
				names: [],
				tags: [],
				chapters: [],
				comments: []
			},
			comments: [],
			filter: true,
			match: props.match.params.id,
			pageCount: 0,
			indexComment: 1,
			commentsPag: []
		};
	}

	componentDidMount() {
		fetch(`http://localhost:3000/mangas/${this.state.match}`)
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result.briefChapterDtos);
					this.setState({
						isLoaded: true,
						posts: result,
						comments: result.userCommentDtos,
						pageCount: Math.ceil(result.userCommentDtos.length / 5),
						commentsPag: result.userCommentDtos.slice(0, result.userCommentDtos.length < 5 ? result.userCommentDtos.length - 1 : 5)
					});
					console.log(this.state.posts);
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
	componentTag(posts) {
		const tagDiv = posts.tags.map((item) => {
			console.log(item);
			return (
				<span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">{item}</span>

			);
		})
		return tagDiv;
	}
	componentChap(posts) {
		console.log(posts);
		if(posts.briefChapterDtos != undefined){
			const chapDiv = posts.briefChapterDtos.map((item, index) => {
				console.log(item);
				return (
					<tr>
						<Link to={"/" + posts.names[0] + "/" + item.manga + "/" + item.id}>
							<td>Chapter {item.index}</td>
						</Link>
						<td>{item.views}</td>
						<td>{item.createdAt}</td>
						<td>{item.tittle}</td>
					</tr>
				);
			})
			return chapDiv;
		}
	}
	coponentComment(comments) {
		console.log(comments);
		const commentDiv = comments.map((item, index) => {
			console.log(item);
			return (
				<>
					<div className="flex flex-wrap  pb-2" key={index}>
						<div className="lg:w-1/6">
							<Link to="/">
								<div>
									<img src={img1} alt="" id="avatar" className="rounded-full h-10 w-10 flex items-center justify-center" />
								</div>
							</Link>
						</div>
						<div className="lg:w-5/6 text-white">
							<h2 className="font-bold text-lg">{item.email}</h2>
							<p>{item.content}</p>
						</div>
					</div>
					<hr className="w-full py-1"></hr>
				</>
			);
		})
		return commentDiv;
	}
	handlePageClick = (data) => {
		console.log(this.state.comments);
		let selected = data.selected;
		let len = this.state.comments?.length;
		const commentData = this.state.comments;
		console.log(commentData);
		this.setState({
			commentsPag: commentData?.slice(selected * 5, Number(len) - (Number(len) - ((selected + 1) * 5)))
		});
	};
	render() {
		const { error, isLoaded, posts, filter, match } = this.state;
		console.log(posts);
		return (
			<div className="container flex flex-wrap px-10  ">
				<div className="lg:w-3/4 px-3 bg-gray-1000 text-white">
					<section>
						<div className="flex flex-wrap pt-3">
							<div className="lg:w-2/3">
								<h1 className="font-bold text-2xl">{posts.names[0]}</h1>
								<ReactStars
									count={5}
									onChange={this.ratingChanged}
									size={30}
									value={3.4}
									isHalf={true}
									emptyIcon={<BsStar></BsStar>}
									halfIcon={<BsStarHalf></BsStarHalf>}
									fullIcon={<BsStarFill></BsStarFill>}
									activeColor="#ffd700"
								/>
								<div className="flex">
									<p className="font-bold">Đánh giá:</p><p className="pl-2">{posts.averageRate?.toFixed(1)} /5</p>
								</div>
								<div className="flex">
									<p className="font-bold">Tên khác:</p><p className="pl-2">{posts.names[1]}</p>
								</div>
								<div className="flex">
									<p className="font-bold">Tác giả:</p><p className="pl-2">{posts.creators}</p>
								</div>
								<div className="flex">
									<p className="font-bold">Nhóm dịch:</p><p className="pl-2">Nhóm dịch update sau</p>
								</div>
								<div className="flex">
									<p className="font-bold">Tình trạng:</p><p className="pl-2">{posts.averageRate?.toFixed(1)}</p>
								</div>
								<div className="flex">
									<p className="font-bold">Ngày thêm:</p><p className="pl-2">{posts.createdAt}</p>
								</div>
								<div className="flex">
									<p className="font-bold">Tổng lượt xem:</p><p className="pl-2">{posts.views}</p>
								</div>
								<div className="flex">
									<p className="font-bold">Tổng lượt theo dõi:</p><p className="pl-2">{posts.bookmarks}</p>
								</div>
								<div className="pb-2">
									{/* <span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">{posts?.tags != undefined?posts?.tags[0]:""}</span>
									<span className="inline-block bg-black rounded-full px-2 text-sm font-semibold text-white mr-2 mb-2">#Tag2</span> */}
									{this.componentTag(posts)}
								</div>
							</div>
							<div className="lg:w-1/3 h-full">
								<img className="rounded-lg h-60 w-full" src={posts.cover}>
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
						<p>{posts.description}</p>
					</section>
					<section className="pt-2">
						<div className="inline-flex items-center">
							<BsCardList size="20px"></BsCardList>
							<h1 className="text-xl pl-1">CHAPTERS</h1>
						</div>
						<hr className="bg-red-700 h-1 border-none"></hr>
						<div className="px-2">
							<p>{posts.chapters?.length} chapter</p>
							<div className="inline-flex items-center">
								<BsClock></BsClock>
								<p className="pl-1">{posts.createdAt}</p>
							</div>
						</div>
						<div>
							<hr className="bg-red-700 h-1 w-10 border-none"></hr>
							<table className="table-fixed">
								<thead>
									<tr>
										<th className="w-1/5">Chapter</th>
										<th className="w-1/5">Lượt xem</th>
										<th className="w-2/5">Ngày đăng</th>
										<th className="w-1/5">Khác</th>
									</tr>
								</thead>
								<tbody>
									{this.componentChap(posts)}
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
						<div className="flex mx-auto items-center justify-center mt-1 mb-2 max-w-lg">
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
						<div className="flex flex-wrap">
							{this.coponentComment(this.state.commentsPag)}

						</div>
						<div className="items-center text-center">
								<ReactPaginate
									previousLabel={<BsChevronDoubleLeft></BsChevronDoubleLeft>}
									nextLabel={<BsChevronDoubleRight></BsChevronDoubleRight>}
									breakLabel={'...'}
									breakClassName={'break-me'}
									pageCount={this.state.pageCount}
									marginPagesDisplayed={2}
									pageRangeDisplayed={5}
									onPageChange={this.handlePageClick}
									containerClassName={'flex pl-0 rounded list-none flex-wrap  m-auto w-80  justify-center'}
									previousLinkClassName={'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 text-white bg-blueGray-500'}
									activeLinkClassName={'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 text-white bg-black'}
									nextLinkClassName={'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 text-white bg-blueGray-500'}
									pageLinkClassName={'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 text-white bg-blueGray-500'}
								/>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default Post;
function indexComment(comments: import("../DTOs/CommentDto").CommentDto[] | undefined, indexComment: any) {
	throw new Error("Function not implemented.");
}

function i(i: any): any {
	throw new Error("Function not implemented.");
}

