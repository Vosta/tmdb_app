import React, { useContext, useState, useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import GlobalState from '../../store/context';
import { SET_SEARCH_VALUE } from '../../store/reducerTypes';

import './index.scss';

export default function NavBar() {
    const searchInputRef = useRef();
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { dispatch } = useContext(GlobalState);
    const handleSearchValueChange = (e) => {
        const { value } = e.target;
        dispatch({ type: SET_SEARCH_VALUE, payload: value });
        setSearchValue(value);
    };
    const toggleSearchArea = () => {
        if (!searchStatus) {
            const searchInput = searchInputRef.current;
            if (searchInput) {
                searchInput.focus();
            }
        }
        setSearchStatus(!searchStatus);
    };
    const inputClassName = `searchInputField ${searchStatus ? 'active' : ''}`;
    return (
        <nav className="navBar">
            <h2 className="brandLogo">VS Streaming</h2>
            <Link to="/browse">Home</Link>
            <div className="searchWrapper">
                <input
                    ref={searchInputRef}
                    className={inputClassName}
                    value={searchValue}
                    onChange={handleSearchValueChange}
                />
                <div role="presentation" onClick={toggleSearchArea}>
                    <FontAwesomeIcon icon={faSearch} />
                </div>

            </div>

        </nav>
    );
}
