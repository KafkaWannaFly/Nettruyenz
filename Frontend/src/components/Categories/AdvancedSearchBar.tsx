import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
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

			<Dropdown />

			{/*             
            <div className="each-selection">
                <label className="dropdown-title">Sort by</label>
                <select className="select" id="sort" value={sort_options[0].value}>
                    {sort_options.map((option) => (
                        <option value={option.value} className="select-option" id="sort-select-option">{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="each-selection">
                <label className="dropdown-title">Order</label>
                <select className="select" id="order" value={order_options[0].value}>
                    {order_options.map((order) => (
                        <option value={order.value} className="select-option" id="order-select-option">{order.label}</option>
                    ))}
                </select>
            </div>
            <div className="each-selection">
                <label className="dropdown-title">Period</label>
                <select className="select" id="period" value={period_options[0].value}>
                    {period_options.map((period) => (
                        <option value={period.value} className="select-option" id="period-select-option">{period.label}</option>
                    ))}
                </select>
            </div>
         */}
		</div>
	);
};

const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<div className="relative">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="relative z-10 block border-2 p-2 border-gray-600 overflow-hidden focus:outline-none focus:border-white"
				>
					Dropdown
				</button>

				<button
					className={
						isOpen
							? "cursor-default bg-black opacity-50 fixed inset-0 w-full h-full"
							: "hidden"
					}
					onClick={() => setIsOpen(false)}
					tabIndex={-1}
				/>

				<div
					className={
						isOpen
							? "absolute right-0 mt-2 w-48 bg-white rounded-lg py-2 shadow-xl"
							: "hidden"
					}
				>
					<div
						className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
						onClick={() => setIsOpen(false)}
					>
						ABC
					</div>
					<div
						className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
						onClick={() => setIsOpen(false)}
					>
						XYZ
					</div>
					<div
						className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
						onClick={() => setIsOpen(false)}
					>
						123
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdvancedSearchBar;
