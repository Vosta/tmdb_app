import React from 'react';
import PropTypes from 'prop-types';
import useGlobalState from './useGlobalState';
import Context from './context';
import Loader from '../components/loader';

const GlobalStateProvider = ({ children }) => {
    const globalState = useGlobalState();
    const { state } = globalState;
    if (!state.config || !state.genres) {
        return <Loader />;
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
