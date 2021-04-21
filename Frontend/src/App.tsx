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
import { HistoryOutlined } from "@material-ui/icons";
import Signin from "./components/Signin";

function App() {
	const [token, setToken] = useState();
	// if(!token){
	// 	return <Signin setToken={setToken} />
	// }
	return (
		<>
		<BrowserRouter>
			<div className="App bg-gray-1000 h-full">
				<Route exact path = "/signin"><Signin setToken={setToken}></Signin></Route>
				{token?(<Navbar setToken={setToken}></Navbar>):<></>}
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/follow" component={Follow}></Route>
					<Route exact path="/categories" component={Categories}></Route>
					<Route exact path="/history" component={History}></Route>
					<Route path="/comic/:id" component={Post}></Route>
				</Switch>
			</div>
		</BrowserRouter>
		<Footer/>
		</>
	);
}

export default App;
