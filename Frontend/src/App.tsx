import React, { useState } from 'react';
import logo from "./logo.svg";
import {useHistory, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home/Home";
import History from "./components/History";
import Follow from "./components/Follow";
import Post from "./components/Post";
import Footer from "./components/Footer";
import {Categories} from "./components/Categories/Categories";
import UserProfile from './components/UserProfile';
import readComic from './components/ReadComic';
import manageManga from './components/manageManga';


import { HistoryOutlined } from "@material-ui/icons";
import handleAccount from "./components/Signin";
import { TokenClass } from 'typescript';
import axios from 'axios';
import UploadChapter from './components/UploadChapter';
import UploadManga from './components/UploadManga';

const inter = {
	user: {
		_id: "",
		email: "",
		password: "",
		level: 0,
		createdAt: "",
		updatedAt: "",
		__v: 0
	},
	token: ""
}
function App() {
	const [token, setToken] = useState(inter);
	var authen = false;
	var tokenProps = {
		data: inter
	};
	console.log(token);
	if(token.token == "" && localStorage.getItem("token") != null){
		console.log("come in");
		var getTokenLocal = localStorage.getItem("token");
		var getEmailLocal = localStorage.getItem("email");
		var getPassLocal = localStorage.getItem("password");
		var getlevelLocal = localStorage.getItem("level");

		var dataSignIn = {
			email: getEmailLocal,
			password: getPassLocal
		  }
		console.log(dataSignIn)
		axios
        .post("http://localhost:3000/sign-in", dataSignIn)
        .then(function (response) {
          console.log(response);
          if (response.data.error) {
          }
          else {
			tokenProps = { // make sure all required component's inputs/Props keys&types match
				data: response.data
			}
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
		authen = true;
	}
	else if(token.token != ""){
		console.log("token != null")
		authen = true;
		tokenProps = { // make sure all required component's inputs/Props keys&types match
			data: token
		}
	}
	// console.log(token.user.email);
	return (
		<>
		<BrowserRouter>
			<>
				<Navbar email = {token.user.email} level={token.user.level} authentication = {authen} setToken={setToken}></Navbar>
						<div className="App bg-gray-1000 h-full">
						{/* <Route exact path = "/signin" component={handleAccount}></Route> */}
						<Switch>
							<Route exact path="/categories" component={Categories}></Route>
							<Route exact path="/" component={Home}></Route>
							<Route path="/comic/:id" component={Post}></Route>
							<Route exact path="/:name/:id1/:id2" component={readComic}></Route>
							<Redirect exact from="/:name/:id1/:id2/reload" to="/:name/:id1/:id2" />
							{authen?<Route path="/manage" component={manageManga}></Route>:<div>Vui lòng đăng nhập quyền admin</div>}
							{authen?<Route exact path="/upload/:id" component={UploadChapter}></Route>:<div>Vui lòng đăng nhập quyền admin</div>}
							{authen?<Route exact path = "/manga/upload" component={UploadManga}></Route>:<div>Vui lòng đăng nhập quyền admin</div>}
							{authen?<Route exact path="/follow" component={() => (<Follow {...tokenProps}></Follow>)}></Route>:<div>Vui lòng đăng nhập</div>}
							{authen?<Route exact path="/history" component={() => (<History {...tokenProps}></History>)}></Route>:<div>Vui lòng đăng nhập</div>}
							{authen?<Route exact path="/profile/:email" component={() => (<UserProfile data = {tokenProps.data}></UserProfile>)}></Route>:<div>Vui lòng đăng nhập</div>}
						</Switch>
					</div>
				<Footer/>
			</>

		</BrowserRouter>
		</>
	);
}

export default App;
