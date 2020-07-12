import axios from 'axios';
import apiEndpoints from './apiRequestTypes';

export default class Api {
    constructor() {
        this.init();
    }

    init() {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = process.env.REACT_APP_API_URL;
        if (apiKey && apiUrl) {
            this.apiUrl = apiUrl;
            this.apiKey = apiKey;
            return;
        }
        throw Error('Please provide api key (REACT_APP_API_KEY) and api url (REACT_APP_API_URL) as env');
    }

    combineParams(params) {
        return { ...(params || {}), api_key: this.apiKey };
    }

    actionGet(endpoint, params) {
        const url = this.apiUrl + (endpoint || '');
        const options = {
            params: this.combineParams(params)
        };
        return axios.get(url, options);
    }

    getMovies(params) {
        const endpoint = apiEndpoints.discoverMovies;
        return this.actionGet(endpoint, params);
    }

    getSeries(params) {
        const endpoint = apiEndpoints.discoverSeries;
        return this.actionGet(endpoint, params);
    }

    getConfiguration() {
        const endpoint = apiEndpoints.configuration;
        return this.actionGet(endpoint);
    }

    getGenresList() {
        const endpoint = apiEndpoints.genres;
        return this.actionGet(endpoint);
    }

    getSingleMovie(params, data) {
        const { assetID } = data;
        if (assetID) {
            const endpoint = `${apiEndpoints.movie}/${assetID}`;
            return this.actionGet(endpoint, params);
        }
        return null;
    }

    getSingleSeries(params, data) {
        const { assetID } = data;
        if (assetID) {
            const endpoint = `${apiEndpoints.series}/${assetID}`;
            return this.actionGet(endpoint, params);
        }
        return null;
    }

    search(params) {
        const endpoint = apiEndpoints.search;
        return this.actionGet(endpoint, params);
    }
}
