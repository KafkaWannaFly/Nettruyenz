import React from 'react';

const AdvancedSearchBar: React.FC = () => {
    return (
        <div id="search-bars-container">
            <div className="each-search-bar" id="search-title">
                <div className="search-bar-text">Title</div>
                <input type="text" placeholder="Search on NettruyenZ..." className="search-area"/>
            </div>
        </div>
    )
}

export default AdvancedSearchBar