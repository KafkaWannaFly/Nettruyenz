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
import UserProfile from './components/UserProfile';
import { HistoryOutlined } from "@material-ui/icons";
import handleAccount from "./components/Signin";
import { TokenClass } from 'typescript';


function App() {
	const [token, setToken] = useState();
	var authen = false;
	var tokenProps = {
		data: undefined
	};
	if(token != null){
		authen = true;
		tokenProps = { // make sure all required component's inputs/Props keys&types match
			data: token
		}
	}
	console.log(token);
	return (
		<>
		<BrowserRouter>
			<>
				<Navbar authentication = {authen} setToken={setToken}></Navbar>
						<div className="App bg-gray-1000 h-full">
						{/* <Route exact path = "/signin" component={handleAccount}></Route> */}
						<Switch>
							<Route exact path="/categories" component={Categories}></Route>
							<Route exact path="/" component={Home}></Route>
							<Route path="/comic/:id" component={Post}></Route>
							{authen?<Route exact path="/follow" component={() => (<Follow {...tokenProps}></Follow>)}></Route>:<div>Vui lòng đăng nhập</div>}
							{authen?<Route exact path="/history" component={() => (<History {...tokenProps}></History>)}></Route>:<div>Vui lòng đăng nhập</div>}
							{authen?<Route exact path="/profile/email" component={() => (<UserProfile data = {token}></UserProfile>)}></Route>:<div>Vui lòng đăng nhập</div>}
						</Switch>
					</div>
				<Footer/>
			</>

		</BrowserRouter>
		</>
	);
}

export default App;
