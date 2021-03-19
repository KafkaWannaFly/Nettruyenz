import React, { Children, Component } from "react";
import logo from "../logos/fox.svg";
import { NavLink, Link, withRouter } from "react-router-dom";

const Navbar = (props: any) => {
	return (
		<nav className="nav-wrapper red lighten-3">
			<div className="container-90">
				<div className="left valign-wrapper">
					<Link to="/">
						<div className="valign-wrapper">
							<img src={logo} alt="" id="logo" />
							<div id="logo-text">NetTruyenZ</div>
						</div>
					</Link>
				</div>

				<div className="right">
					<ul className="">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
						<li>
							<NavLink to="/contact">Contact</NavLink>
						</li>
						<li>
							<NavLink to="/">Search button</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default withRouter(Navbar);
