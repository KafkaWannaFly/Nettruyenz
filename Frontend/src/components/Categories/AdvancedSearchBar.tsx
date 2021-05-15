import React, { useState, useEffect } from "react";
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
export function AdvancedSearchBar(props) {
	const [input, setInput] = useState(["", "", "", "", ""]);
	function addToInputList(value, index) {
		let temp = input.splice(index, 1, value);
		setInput(input);
		props.getInputFromSearchBar(input);
	}

	const [title, setTitle] = useState("");
	function handleTitleChange(e) {
		if(e.key === "Enter") {
			setTitle(e.target.value);
			addToInputList(e.target.value, 0);
		}
	}

	const [author, setAuthor] = useState("");
	function handleAuthorChange(e) {
		if(e.key === "Enter") {
			setAuthor(e.target.value);
			addToInputList(e.target.value, 1);
		}
		
	}

	const [sortSelection, setSortSelection] = useState("");
	function handleSortSelectionChange(selection) {
		setSortSelection(selection);
		addToInputList(selection, 2);
	}


	const [orderSelection, setOrderSelection] = useState("");
	function handleOrderSelectionChange(selection) {
		setOrderSelection(selection);
		addToInputList(selection, 3);
	}

	const [periodSelection, setPeriodSelection] = useState("");
	function handlePeriodSelectionChange(selection) {
		setPeriodSelection(selection);
		addToInputList(selection, 4);
	}


	return (
		<form id="search-bars-container">
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
							onKeyPress={handleTitleChange}
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
							onKeyPress={handleAuthorChange}
						/>
					</div>
				</div>
			</div>
			<SortSelection setSortSelection={handleSortSelectionChange}/>
			<OrderSelection setOrderSelection={handleOrderSelectionChange}/>
			<PeriodSelection setPeriodSelection={handlePeriodSelectionChange}/>
		</form>
	);
};

function SortSelection(props) {
	function handleChange(e) {
		props.setSortSelection(e.value);
	}

	return (
		<div className="each-selection">
			<label className="dropdown-title">Sort</label>
			<Select 
			className="select"
			options={sort_options}
			style={selectStyle}
			onChange={handleChange}/>
		</div>
	)
}

function OrderSelection(props) {
	function handleChange(e) {
		props.setOrderSelection(e.value);
	}
	return (
		<div className="each-selection">
			<label className="dropdown-title">Order</label>
			<Select 
			className="select"
			options={order_options}
			style={selectStyle}
			onChange={handleChange}/>
		</div>
	)
}

function PeriodSelection(props) {

	function handleChange(e) {
		props.setPeriodSelection(e.value);
	}

	return (
		<div className="each-selection">
			<label className="dropdown-title">Period</label>
			<Select 
			className="select"
			options={period_options}
			style={selectStyle}
			onChange={handleChange}/>
		</div>
	)
}




export default AdvancedSearchBar;
