import React, { Children, Component } from "react";
import logo from "../logos/fox.svg";
import avatar from "../logos/img_avatar.png";
import { NavLink, Link, withRouter } from "react-router-dom";

const Navbar = (props: any) => {
	return (
		// <nav className="nav-wrapper red lighten-3">
		// 	<div className="container-90">
		// 		<div className="left valign-wrapper">
		// 			<Link to="/">
		// 				<div className="valign-wrapper">
		// 					<img src={logo} alt="" id="logo" />
		// 					<div id="logo-text">NetTruyenZ</div>
		// 				</div>
		// 			</Link>
		// 		</div>

		// 		<div className="right">
		// 			{/* <ul className="">
		// 				<li>
		// 					<NavLink to="/">Home</NavLink>
		// 				</li>
		// 				<li>
		// 					<NavLink to="/about">About</NavLink>
		// 				</li>
		// 				<li>
		// 					<NavLink to="/contact">Contact</NavLink>
		// 				</li>
		// 				<li>
		// 					<NavLink to="/">Search button</NavLink>
		// 				</li>
		// 			</ul> */}
		// 			<ul className="flex">
		// 			<li className="flex-1 mr-2">
		// 				<a className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#">Active Item</a>
		// 			</li>
		// 			<li className="flex-1 mr-2">
		// 				<a className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" href="#">Nav Item</a>
		// 			</li>
		// 			<li className="text-center flex-1">
		// 				<a className="block py-2 px-4 text-gray-400 cursor-not-allowed" href="#">Disabled Item</a>
		// 			</li>
		// 			</ul>
		// 		</div>
		// 	</div>
		// </nav>
		<div className="w-full bg-black text-white">
			<div className="table w-full">
				<div className="table-row">
					<div className="table-cell pl-20 py-2 text-sm">
						<div className="left valign-wrapper">
							<Link to="/">
								<div className="valign-wrapper">
									<img src={logo} alt="" id="logo" />
									<div id="logo-text">NetTruyenZ</div>
								</div>
							</Link>
						</div>
					</div>
					<div className="table-cell pl-20 py-2 text-sm">
						<div className="right rounded-full h-14 w-3/4 px-4  bg-gray-700">
							<input className=""
							type="search" name="search" placeholder="Search"/>
						</div>
					</div>
					<div className="table-cell pr-20 py-2 text-sm">
						<div className="right">
							<Link to="/">
								<div className="">
									<img src={avatar} alt="" id="avatar" className="rounded-full h-14 w-14 flex items-center justify-center"/>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="table w-full px-60 py-6 font-mono text-lg">
				<div className="table-row text-center">
					<div className="table-cell">
						<NavLink to="/">Home</NavLink>
					</div>
					<div className="table-cell">
						<NavLink to="/ranking">Ranking</NavLink>
					</div>
					<div className="table-cell">
						<NavLink to="/categories">Categoties</NavLink>
					</div>
					<div className="table-cell">
						<NavLink to="/follow">Follow</NavLink>
					</div>
					<div className="table-cel">
						<NavLink to="/history">History</NavLink>
					</div>

				</div>
			</div>
		</div>
	);
};

export default withRouter(Navbar);
