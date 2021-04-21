import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Select from 'react-select'
const sort_options = [
	{
		label: "View",
		value: "View",
	},
	{
		label: "Rate",
		value: "Rate",
	},
	{
		label: "Bookmark",
		value: "Bookmark",
	},
];

const order_options = [
	{
		label: "Descending",
		value: "Descending",
	},
	{
		label: "Ascending",
		value: "Ascending",
	},
];

const period_options = [
	{
		label: "Weekly",
		value: "Weekly",
	},
	{
		label: "Monthly",
		value: "Monthly",
	},
	{
		label: "All time",
		value: "All time",
	},
];

const selectStyle = {
	option: (provided, state) => ({
		...provided,
		borderColor: "#ffffff",
		border: '1px solid white',
		minHeight: "32px",
		height:"32px",
		minWidth: "224px",
		width: "224px",
		backgroundColor: state.isFocused? '#000000' : '#33343d',
	}),
	control: (provided) => ({
		...provided,
		marginTop: "20px",
		marginBottom: "20px",
		marginLeft: "12px",
		marginRight: "12px"
	})
}
const AdvancedSearchBar = (props) => {
	return (
		<div id="search-bars-container">
			<div className="each-search-bar">
				<div className="form">
					<label className="search-bar-title">Title</label>
					<div className="inpurt-with-icon">
						<div className="search-icon">
							<SearchIcon />
						</div>
						<input
							className="search-field"
							type="text"
							placeholder="Search for title"
							id="title"
						/>
					</div>
				</div>
			</div>
			<div className="each-search-bar">
				<div className="form">
					<label className="search-bar-title">Author</label>
					<div className="input-with-icon">
						<div className="search-icon">
							<SearchIcon />
						</div>
						<input
							className="search-field"
							type="text"
							placeholder="Search for author"
							id="author"
						/>
					</div>
				</div>
			</div>
			<SortSelection/>
			<OrderSelection/>
			<PeriodSelection/>      
		</div>
	);
};

class SortSelection extends React.Component {
	state = {
		selectedOption: null
	  }
	handleChange = (selectedOption) => {
	this.setState({ selectedOption });
	}
	render() {
		return (
			<div className="each-selection">
                <label className="dropdown-title">Sort by</label>
				<Select 
				defaultValue={{label: sort_options[0].label, value: sort_options[0].value}}
				className="select"
				options={sort_options}
				style={selectStyle}/>
            </div>
		)
	}
}

class OrderSelection extends React.Component {
	state = {
		selectedOption: null,
	  }
	handleChange = (selectedOption) => {
	this.setState({ selectedOption });
	}
	render() {
		return (
			<div className="each-selection">
				<label className="dropdown-title">Order</label>
				<Select 
				defaultValue={{label: order_options[0].label, value: order_options[0].value}}
				className="select"
				options={order_options}
				style={selectStyle}/>
			</div>	
		)
	}
}

class PeriodSelection extends React.Component {
	state = {
		selectedOption: null,
	  }
	handleChange = (selectedOption) => {
	this.setState({ selectedOption });
	}
	render() {
		return (
            <div className="each-selection">
                <label className="dropdown-title">Period</label>
                <Select 
				className="select"
				defaultValue={{label: period_options[0].label, value: period_options[0].value}}
				options={period_options}
				style={selectStyle}
				isSearchable={false}/>
            </div>
		)
	}
}
	// state = {
	// 	selectedOption: null
	// };

	// handleChange = selectedOption => {
	// 	this.setState({ selectedOption })	
	// };

	// render() {
	// 	const {selectedOption} = this.state;

	// 	return (
	// 		<Select
	// 		className="each-selection'"
	// 		value = {selectedOption}
	// 		onChange = {this.handleChange}
	// 		options = {sort_options}/>
	// 	)
	// }

// const Dropdown = () => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	return (
// 		<div>
// 			<div className="relative">
// 				<button
// 					onClick={() => setIsOpen(!isOpen)}
// 					className="relative z-10 block border-2 p-2 border-gray-600 overflow-hidden focus:outline-none focus:border-white"
// 				>
// 					Dropdown
// 				</button>

// 				<button
// 					className={
// 						isOpen
// 							? "cursor-default bg-black opacity-50 fixed inset-0 w-full h-full"
// 							: "hidden"
// 					}
// 					onClick={() => setIsOpen(false)}
// 					tabIndex={-1}
// 				/>

// 				<div
// 					className={
// 						isOpen
// 							? "absolute right-0 mt-2 w-48 bg-white rounded-lg py-2 shadow-xl"
// 							: "hidden"
// 					}
// 				>
// 					<div
// 						className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
// 						onClick={() => setIsOpen(false)}
// 					>
// 						ABC
// 					</div>
// 					<div
// 						className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
// 						onClick={() => setIsOpen(false)}
// 					>
// 						XYZ
// 					</div>
// 					<div
// 						className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
// 						onClick={() => setIsOpen(false)}
// 					>
// 						123
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

export default AdvancedSearchBar;
