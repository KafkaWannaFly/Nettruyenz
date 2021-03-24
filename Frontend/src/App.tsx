import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="bg-gray-200 flex items-center justify-center h-screen">
				<button className="p-3 rounded-sm bg-blue-500 hover:bg-blue-700">
					ToggleABC
				</button>
				<form>
					<input className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..." />
					<button className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ...">
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
