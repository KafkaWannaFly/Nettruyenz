import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {BiChevronDown} from 'react-icons/bi'
const sort_options = [
		"View",
		"Rate",
		"Bookmark",
];

const order_options = [
	"Ascending",
	"Descending"
];

const period_options = [
	"Weekly",
	"Monthly",
	"All time"
];

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
							<SearchIcon onClick={handleTitleChange}/>
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
							<SearchIcon onClick={handleAuthorChange}/>
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
			<Selection setSelection={handleSortSelectionChange} options={sort_options} label="Sort"/>
			<Selection setSelection={handleOrderSelectionChange} options={order_options} label="Order by"/>
			<Selection setSelection={handlePeriodSelectionChange} options={period_options} label="Period"/>
		</form>
	);
};

function Selection(props) {
	const [option, setOption] = useState(props.options[0]);

	
	function handleClick(option) {
		console.log(option);
		props.setSelection(option);
		setOption(option);
	}

	function  renderSelection() {
		const render = props.options.map((option, index) => {
				return  <li onClick={() => handleClick(option)}
							className="selection">{option}
						</li>
			})
		return render
	}

	return (
		<div className="each-dropdown">
			<label className="dropdown-title">{props.label}</label>
			<div className="dropdown">
				<div className="dropdown-display">
					<div className="selected-option">{option}</div>
					<div className="dropdown-icon">
						<BiChevronDown/>
					</div>
				</div>
				<ul className="dropdown-menu">
					{renderSelection()}
				</ul>
			</div>
		</div>
	)
}




export default AdvancedSearchBar;
