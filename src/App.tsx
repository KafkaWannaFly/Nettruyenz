import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import { Post } from "./components/Post";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/contact" component={Contact}></Route>
					<Route exact path="/about" component={About}></Route>
					<Route path="/:id" component={Post}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
