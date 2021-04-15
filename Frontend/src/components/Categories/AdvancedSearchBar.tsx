import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
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
    }
]

const order_options = [
    {
        label:"Descending",
        value:"Descending",
    },
    {
        label:"Ascending",
        value:"Ascending",
    }
]

const period_options = [
    {
        label:"Weekly",
        value:"Weekly",
    },
    {
        label:"Monthly",
        value:"Monthly",
    },
    {
        label:"All time",
        value:"All time",
    }
]
const AdvancedSearchBar = (props) => {
    return (
        <div id="search-bars-container">
            <div className="each-search-bar">
                <div className="form">
                    <label className="search-bar-title">Title</label>
                    <div className="inpurt-with-icon">
                        <div className="search-icon">
                            <SearchIcon/>
                        </div>
                        <input className="search-field" type="text" placeholder="Search for title" id="title"/>
                    </div>
                </div>
            </div>
            <div className="each-search-bar">
                <div className="form">
                    <label className="search-bar-title">Author</label>
                    <div className="input-with-icon">
                        <div className="search-icon">
                            <SearchIcon/>
                        </div>
                        <input className="search-field" type="text" placeholder="Search for author" id="author"/>
                    </div>
                </div>
            </div>
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
        </div>
    )
}

export default AdvancedSearchBar