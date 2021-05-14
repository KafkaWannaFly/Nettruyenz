import React, { useState } from 'react';
import logo from "./logo.svg";
import {useHistory, BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import { Home } from "./components/Home/Home";
import History from "./components/History";
import Follow from "./components/Follow";
import Post from "./components/Post";
import Footer from "./components/Footer";
import {Categories} from "./components/Categories/Categories";
import UserProfile from "./components/UserProfile";
import { HistoryOutlined } from "@material-ui/icons";
import handleAccount from "./components/Signin";

function App() {
	let [isLogin, setisLogin] = useState();
	// if(!token){
	// 	return <Signin setToken={setToken} />
	// }
	return (
		<>
		<BrowserRouter>
			<>
				<Navbar authentication = {true}></Navbar>
						<div className="App bg-gray-1000 h-full">
						{/* <Route exact path = "/signin" component={handleAccount}></Route> */}
						<Switch>
							<Route exact path="/" component={Home}></Route>
							<Route exact path="/follow" component={Follow}></Route>
							<Route exact path="/categories" component={Categories}></Route>
							<Route exact path="/history" component={History}></Route>
							<Route path="/comic/:id" component={Post}></Route>
							<Route exact path="/user/profile/:id" component={UserProfile}></Route>
						</Switch>
					</div>
				<Footer/>
			</>

		</BrowserRouter>
		</>
	);
}

export default App;
