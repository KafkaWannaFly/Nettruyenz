import React, { Children, Component } from "react";
import logo from "../logos/fox.svg";
import avatar from "../logos/img_avatar.png";
import { NavLink, Link, withRouter, Route } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import HandleAccount from "./Signin";
import {AiOutlineHome} from 'react-icons/ai';
import {BsCardList, BsClockHistory} from 'react-icons/bs';
import {RiChatFollowUpLine} from 'react-icons/ri';
// const setStyleProps = { // make sure all required component's inputs/Props keys&types match
// 	class: "overlay",
// 	setToken: props.setToken,
	
// }
function signOut(){
	localStorage.removeItem("token");
	// localStorage.removeItem("email");
	window.location.reload();
}
function onSignIn() {
	const myElement = document.getElementById("overlay")!;
	myElement.style.display = "block";
}
function onSignUp() {
	const myElement = document.getElementById("overlay")!;
	console.log(myElement);
	myElement.style.display = "block";
}
var prevId = "";
function setNewDiv(id){
	console.log(id);
	var element = document.getElementById(id);
	element?.classList.add('border-b-4', 'text-red-600', 'border-red-600');	
	if(prevId != ""){
		var element2 = document.getElementById(prevId);
		element2?.classList.remove('border-b-4', 'text-red-600', 'border-red-600');
	}
	else if(prevId != id){
		var element2 = document.getElementById(prevId);
		element2?.classList.remove('border-b-4', 'text-red-600', 'border-red-600');
	}
	if(prevId == id){
		var element = document.getElementById(id);
		element?.classList.add('border-b-4', 'text-red-600', 'border-red-600');	
	}
	prevId = id;
}
export default function Navbar(props: any) {
	console.log(props);
	const setStyleProps = {
		class: "overlay",
		setToken: props.setToken,
	}
	var getUrl = window.location.href;
	var splitUrl = getUrl.split("/");
	console.log(splitUrl);
	return (
		<div className="w-full py-3 bg-black text-white">
			<div className="table w-full py-6 px-44">
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
						<div className="rounded-full h-14 border-2 px-5 bg-black flex items-center">
							<input className="rounded-full" type="search" name="search" placeholder="Tìm kiếm" />
							<FiSearch className="h-8 w-8"></FiSearch>
						</div>
					</div>
					{
						props.authentication
							?
							(<div className="table-cell w-20 text-sm align-middle">
								<div className="right">
									{/* <Link to="/profile/email">
										<div className="">
											<img src={avatar} alt="" id="avatar" className="rounded-full h-14 w-14 flex items-center justify-center" />
										</div>
									</Link> */}
									<div className="dropdown-nav inline-block">
										<img src={avatar} alt="" id="avatar" className="rounded-full h-14 w-14 flex items-center justify-center" />
										<ul className="dropdown-menu-nav rounded-lg border-gray-1100 border-2 bg-black-100 hidden absolute text-white text-sm-custom">
											<li className="rounded-b hover:bg-gray-1000 py-2 px-4 block whitespace-no-wrap"><Link to={"/profile/"+props.email}>Trang cá nhân</Link></li>
											<li className=" hover:bg-gray-1000 py-2 px-4 block whitespace-no-wrap"><a  href="#">Đăng truyện</a></li>
											<li className="rounded-b hover:bg-gray-1000 py-2 px-4 block whitespace-no-wrap"><a  onClick={() => signOut()}>Đăng xuất</a></li>
										</ul>
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
			<div className="table w-full px-48 pb-9 pt-4 font-mono text-custom-xl">
				<div className="table-row center ">
					<div className="table-cell w-1/4 ">
						<a onClick={() => setNewDiv("home")} id="home" className="inline-flex border-b-4 border-black hover:text-red-600 hover:border-red-600">
							<AiOutlineHome className="my-auto mr-2" style={{fontSize: "1.3em"}}></AiOutlineHome>
							<NavLink to="/" className="mt-1">TRANG CHỦ</NavLink>
						</a>
					</div>
					<div className="table-cell w-1/4 ">
						<a onClick={() => setNewDiv("categories")} id="categories" className="inline-flex border-b-4 border-black hover:text-red-600 hover:border-red-600">
							<BsCardList className="my-auto mr-2" style={{fontSize: "1.3em" }}></BsCardList>
							<NavLink to="/categories" className="mt-1">DANH SÁCH</NavLink>
						</a>
					</div>
					<div className="table-cell w-1/4 ">
						<a onClick={() => setNewDiv("follow")} id="follow" className="inline-flex border-b-4 border-black hover:text-red-600 hover:border-red-600">
							<RiChatFollowUpLine className="my-auto mr-2" style={{fontSize: "1.3em" }}></RiChatFollowUpLine>
							<NavLink to="/follow" className="mt-1">THEO DÕI</NavLink>
						</a>
					</div>
					<div className="table-cell w-1/4 ">
						<a onClick={() => setNewDiv("history")} id="history" className="inline-flex border-b-4 border-black hover:text-red-600 hover:border-red-600">
							<BsClockHistory className="my-auto mr-2" style={{fontSize: "1.3em" }}></BsClockHistory>
							<NavLink to="/history" className="mt-1">LỊCH SỬ</NavLink>
						</a>
					</div>

				</div>
			</div>
		</div>
	);
};
