import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import SectionCarusel from '../components/sectionCarusel';
import GlobalState from '../store/context';
import './home.scss';
import Detail from './detail';

const genreTypes = {
    family: 'family',
    documentary: 'documentary',
};

const HomePage = () => {
    const { state: { genres, searchValue, config }, API } = useContext(GlobalState);

    const getGenreID = (genreType) => {
        const genre = genres.find((item) => item.name.toLowerCase() === genreType);
        return genre ? genre.id : null;
    };

    const sectionKeys = [
        {
            title: 'Popular Movies',
            fetchData: {
                action: (params) => API.getMovies(params),
                params: { sort_by: 'popularity.asc' },
            },
        },
        {
            title: 'Popular Series',
            fetchData: {
                action: (params) => API.getSeries(params),
                params: { sort_by: 'popularity.asc' },
            }
        },
        {
            title: 'Family',
            fetchData: {
                action: (params) => API.getMovies(params),
                params: { with_genres: getGenreID(genreTypes.family) },
            },
        },
        {
            title: 'Documentary',
            fetchData: {
                action: (params) => API.getMovies(params),
                params: { with_genres: getGenreID(genreTypes.documentary) },
            },
        },
    ];
    return (
        <div className="homePage">
            <h2 className="appTitle">Streaming Service</h2>
            {searchValue
                ? (
                    <SectionCarusel
                        fetchData={{ action: (params) => API.search(params), params: { query: searchValue } }}
                        title="Search results"
                        config={config}
                    />
                )
                : (
                    <div className="sectionsWrapper">
                        {sectionKeys.map((section) => (
                            <SectionCarusel
                                key={section.title}
                                fetchData={section.fetchData}
                                title={section.title}
                                config={config}
                            />
                        ))}
                    </div>
                )}
            <Route path="/browse/:assetType/:assetID" component={Detail} />
        </div>
    );
};
export default HomePage;
