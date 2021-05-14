import React, { Children, Component } from "react";
import logo from "../logos/fox.svg";
import avatar from "../logos/img_avatar.png";
import { NavLink, Link, withRouter, Route } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import HandleAccount from "./Signin";

function off() {
	const myElement = document.getElementById("overlay")!;
	myElement.style.display = "none";
}
function onSignIn() {
	const myElement = document.getElementById("overlay")!;
	console.log(myElement);
	myElement.style.display = "block";
}
const setStyleProps = { // make sure all required component's inputs/Props keys&types match
	class: "overlay"
}
export default function Navbar(props: any) {
	return (
		<div className="w-full py-1 bg-black text-white ">

			<HandleAccount {...setStyleProps}></HandleAccount>
			<div className="table w-full py-4 px-44">
				<div className="table-row">
					<div className="table-cell text-sm w-1/3 align-middle">
						<div className="left valign-wrapper">
							<Link to="/">
								<div className="valign-wrapper items-center">
									<img src={logo} alt="" id="logo" />
									<div className="pl-3" id="logo-text">NetTruyenZ</div>
								</div>
							</Link>
						</div>
					</div>
					<div className="table-cell w-4/5 right text-sm">
						<div className="rounded-full border-2 px-5 bg-black flex items-center">
							<input className="" type="search" name="search" placeholder="Tìm kiếm" />
							<FiSearch className="h-8 w-8"></FiSearch>
						</div>
					</div>
					{
						props.authentication
							?
							(<div className="table-cell w-20 text-sm align-middle">
								<div className="right">
									{/* <Link to="/user/profile/:id">
										<div className="">
											<img src={avatar} alt="" id="avatar" className="rounded-full h-14 w-14 flex items-center justify-center" />
										</div>
									</Link> */}
									<div className="relative inline-block text-left">
										<div>
											<button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
											<img src={avatar} alt="" id="avatar" className="rounded-full h-14 w-14 flex items-center justify-center" />
											</button>
										</div>

										<div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
											<div className="py-1" role="none">
												<a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Account settings</a>
												<a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">Support</a>
												<a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">License</a>
												<form method="POST" action="#" role="none">
													<button type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" id="menu-item-3">
														Sign out
													</button>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>)
							:
							(
								<div className="table-cell w-1/5 pl-6 text-sm align-middle">
									<div className="right">
										<div className="flex">
											<button onClick={onSignIn} className="bg-transparent mr-2 focus:bg-red-500 font-semibold text-white py-2 w-28 border-2 border-white rounded">
												<p>ĐĂNG NHẬP</p>

											</button>
											<button className="bg-transparent focus:bg-red-500 bg-red-600 font-semibold text-white py-2 border-2 w-28 border-red-600 rounded">
												<p>ĐĂNG KÍ</p>
											</button>
										</div>
									</div>
								</div>
							)
					}
				</div>
			</div>
			<div className="table w-full px-48 pb-7 pt-4 font-mono text-2xl">
				<div className="table-row center">
					<div className="table-cell w-1/4">
						<NavLink to="/">TRANG CHỦ</NavLink>
					</div>
					<div className="table-cell w-1/4">
						<NavLink to="/categories">DANH SÁCH</NavLink>
					</div>
					<div className="table-cell w-1/4">
						<NavLink to="/follow">THEO DÕI</NavLink>
					</div>
					<div className="table-cell w-1/4">
						<NavLink to="/history">LỊCH SỬ</NavLink>
					</div>

				</div>
			</div>
		</div>
	);
};
