import { useReducer, useEffect } from 'react';
import {
    REPLACE_CONFIG, REPLACE_GENRES, SET_SEARCH_VALUE
} from './reducerTypes';
import ApiService from '../services/api';

const initialState = {
    config: null,
    genres: null,
    searchValue: '',
    error: {}
};

const reducer = (state, action) => {
    switch (action.type) {
    case SET_SEARCH_VALUE:
        return {
            ...state,
            searchValue: action.payload
        };
    case REPLACE_CONFIG:
        return {
            ...state,
            config: action.payload
        };
    case REPLACE_GENRES:
        return {
            ...state,
            genres: action.payload
        };
    default:
        return state;
    }
};

const useGlobalState = () => {
    const API = new ApiService();
    const [state, dispatch] = useReducer(reducer, initialState);

    const getInitialData = () => {
        API.getConfiguration()
            .then((res) => dispatch({ type: REPLACE_CONFIG, payload: res.data }));
        API.getGenresList()
            .then((res) => dispatch({ type: REPLACE_GENRES, payload: res.data.genres }));
    };

    useEffect(() => {
        getInitialData();
    }, []);
    return { state, API, dispatch };
};

export default useGlobalState;
