import React, { Component } from 'react';
import { connect, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { Slideshow } from "../Slideshow";
import img1 from "../../logos/img1.jpg";
import img2 from "../../logos/img2.jpg";
import img3 from "../../logos/img3.jpg";
import img4 from "../../logos/img4.jpg";
import img5 from "../../logos/img5.jpg";

import mostView from "./mostView";
import mostFollow from "./mostFollowed";
import highRating from './highRating';
import Following from './following';
import Recently from './recentlyUpdate';
import newlyAdded from './newlyAdded';
import readThis from './readThis';
export const Home = (props) => {
	return (
		<>
			<div className="max-w-full max-h-full bg-white">
				<Slideshow></Slideshow>
				<Route component={mostView}></Route>
				<Route component={mostFollow}></Route>
				<Route component={highRating}></Route>
				<Route component={Following}></Route>
				<Route component={Recently}></Route>
				<Route component={newlyAdded}></Route>
				<Route component={readThis}></Route>
				{/* {homeDiv} */}

			</div>
		</>
	);
};
