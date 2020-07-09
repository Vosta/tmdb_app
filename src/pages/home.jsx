import React, { Component } from 'react';

const sectionTypes = Object.freeze({
    popularMovies: Symbol("popularMovies"),
    popularSeries: Symbol("popularSeries"),
    family: Symbol("family"),
    documentary: Symbol("documentary")
});

// eslint-disable-next-line no-unused-vars
const sectionDisplayOptions = {
    [sectionTypes.popularMovies]: {
        title: 'Popular movies',
        fetchUrl: ''
    }
}

export default class HomePage extends Component {
    state = {
        sections: {}
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="homePage">
                <h2>Streaming Service</h2>
                <div className="sectionsWrapper">

                </div>
            </div>
        );
    }
}
