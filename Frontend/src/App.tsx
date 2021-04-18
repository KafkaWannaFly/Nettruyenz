import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import { Home } from "./components/Home/Home";
import { Contact } from "./components/Contact";
import About from "./components/About";
import { Post } from "./components/Post";
import Footer from "./components/Footer";
import {Categories} from "./components/Categories/Categories";

function App() {
	return (
		<>
		<BrowserRouter>
			<div className="App h-full">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/ranking" component={Contact}></Route>
					<Route exact path="/follow" component={About}></Route>
					<Route exact path="/categories" component={Categories}></Route>
					<Route exact path="/history" component={About}></Route>
					<Route path="/:id" component={Post}></Route>
				</Switch>
				
			</div>
		</BrowserRouter>
		<Footer/>
		</>
	);
}

export default App;
