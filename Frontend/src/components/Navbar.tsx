import React, { Children, Component } from "react";
import logo from "../logos/fox.svg";
import avatar from "../logos/img_avatar.png";
import { NavLink, Link, withRouter, Route } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import HandleAccount from "./Signin";
// const setStyleProps = { // make sure all required component's inputs/Props keys&types match
// 	class: "overlay",
// 	setToken: props.setToken,
	
// }
function onSignIn() {
	const myElement = document.getElementById("overlay")!;
	myElement.style.display = "block";
}
function onSignUp() {
	const myElement = document.getElementById("overlay")!;
	console.log(myElement);
	myElement.style.display = "block";
}
export default function Navbar(props: any) {
	const setStyleProps = {
		class: "overlay",
		setToken: props.setToken,
	}
	return (
		<div className="w-full py-1 bg-black text-white ">
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
									<Link to="/profile/email">
										<div className="">
											<img src={avatar} alt="" id="avatar" className="rounded-full h-14 w-14 flex items-center justify-center" />
										</div>
									</Link>
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
											<button onClick={onSignUp} className="bg-transparent focus:bg-red-500 bg-red-600 font-semibold text-white py-2 border-2 w-28 border-red-600 rounded">
												<p>ĐĂNG KÍ</p>
											</button>
										</div>
									</div>
									<HandleAccount setStyleProps = {setStyleProps}></HandleAccount>
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
