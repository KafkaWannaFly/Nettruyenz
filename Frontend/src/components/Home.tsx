import React, { Component } from 'react';
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Slideshow} from "./Slideshow";
import img1 from "../logos/img1.jpg";
import img2 from "../logos/img2.jpg";
import img3 from "../logos/img3.jpg";
import img4 from "../logos/img4.jpg";
import img5 from "../logos/img5.jpg";


export const Home = (props) => {
	const posts = useSelector((state: any) => state.posts);
	const homeDiv = posts.map((item) => {
		return (
			// <div className="card" key={item.id}>
			// 	<div className="row">
			// 		<Link to={"/" + item.id}>
			// 			<div className="card-title col indigo-text darken-4">
			// 				{item.title}
			// 			</div>
			// 		</Link>
			// 	</div>
			// 	<div className="card-content">{item.content}</div>
			// </div>
			<>
			</>
		);
	});
	return (
		<>
			<div className="max-w-full max-h-full bg-white">
				<Slideshow></Slideshow>
				{/* {homeDiv} */}
				<section className="pt-20 pb-48 px-0 mx-0">
					<div className="mx-0">
						<div className="flex flex-wrap mb-8 w-full px-20 justify-center">
							<div className="text-center mr-auto">
								<h2 className="text-4xl font-semibold">
									Most Viewed &gt;
								</h2>
							</div>
							<div className="flex w-81">
								<div className="lg:w-1/3  text-center">
									<button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
										Weekly
									</button>
								</div>
								<div className="lg:w-1/3 ">
									<button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
										Monthly
									</button>
								</div>
								<div className="lg:w-1/3  text-center">
									<button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
										All Time
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap justify-center px-20">
							<div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-2">
								<div className="max-w-sm rounded overflow-hidden shadow-lg">
									<img className="w-full h-64" src={img2} alt="Sunset in the mountains"></img>
									<div className="px-6">
										<div className="font-bold text-xl pt-2">The Coldest Sunset</div>
										<p className="text-gray-700 text-base">
											Chapter
								</p>
									</div>
									<div className="px-6 pb-2">
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
									</div>
								</div>
							</div>
							<div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-2">
								<div className="max-w-sm rounded overflow-hidden shadow-lg">
									<img className="w-full h-64" src={img3} alt="Sunset in the mountains"></img>
									<div className="px-6">
										<div className="font-bold text-xl pt-2">The Coldest Sunset</div>
										<p className="text-gray-700 text-base">
											Chapter
								</p>
									</div>
									<div className="px-6 pb-2">
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
									</div>
								</div>
							</div>
							<div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-2">
								<div className="max-w-sm rounded overflow-hidden shadow-lg">
									<img className="w-full h-64" src={img4} alt="Sunset in the mountains"></img>
									<div className="px-6">
										<div className="font-bold text-xl pt-2">The Coldest Sunset</div>
										<p className="text-gray-700 text-base">
											Chapter
								</p>
									</div>
									<div className="px-6 pb-2">
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
									</div>
								</div>
							</div>
							<div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-2">
								<div className="max-w-sm rounded overflow-hidden shadow-lg">
									<img className="w-full h-64" src={img5} alt="Sunset in the mountains"></img>
									<div className="px-6">
										<div className="font-bold text-xl pt-2">The Coldest Sunset</div>
										<p className="text-gray-700 text-base">
											Chapter
								</p>
									</div>
									<div className="px-6 pb-2">
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
									</div>
								</div>
							</div>
							<div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-2">
								<div className="max-w-sm rounded overflow-hidden shadow-lg">
									<img className="w-full h-64" src={img1} alt="Sunset in the mountains"></img>
									<div className="px-6">
										<div className="font-bold text-xl pt-2">The Coldest Sunset</div>
										<p className="text-gray-700 text-base">
											Chapter
								</p>
									</div>
									<div className="px-6 pb-2">
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
										<span className="inline-block bg-gray-200 rounded-full px-2 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);

};
