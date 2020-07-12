import React from 'react';
import PropTypes from 'prop-types';
import useGlobalState from './useGlobalState';
import Context from './context';

const GlobalStateProvider = ({ children }) => {
    const globalState = useGlobalState();
    const { state } = globalState;
    if (!state.config || !state.genres) {
        return <p>Loading...</p>;
    }
    return (
        <Context.Provider value={globalState}>
            {children}
        </Context.Provider>
    );
};

GlobalStateProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default GlobalStateProvider;
