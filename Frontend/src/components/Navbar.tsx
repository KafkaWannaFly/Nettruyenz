import React, { Children, Component } from "react";
import logo from "../logos/fox.svg";
import avatar from "../logos/img_avatar.png";
import { NavLink, Link, withRouter } from "react-router-dom";

const Navbar = (props: any) => {
	return (
		<div className="w-full bg-black text-white ">
			<div className="table w-full pt-3 px-20">
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
						<div className="right rounded-full h-14 w-full px-4  bg-gray-700">
							<input className=""type="search" name="search" placeholder="Search"/>

						</div>
					</div>
					<div className="table-cell pl-6 py-2 text-sm">
						<div className="left">
							<Link to="/">
								<div className="">
									<img src={avatar} alt="" id="avatar" className="rounded-full h-14 w-14 flex items-center justify-center"/>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="table w-full px-60 pb-6 pt-4 font-mono text-2xl">
				<div className="table-row text-center">
					<div className="table-cell">
						<NavLink to="/">Home</NavLink>
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
