import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Section from '../components/section';
import GlobalState from '../store/context';
import './home.scss';
import Detail from './detail';

const genreTypes = {
    family: 'family',
    documentary: 'documentary',
};

const getGenreID = (genres, genreType) => {
    const genre = genres.find((item) => item.name.toLowerCase() === genreType);
    return genre ? genre.id : null;
};

const HomePage = () => {
    const { state: { genres, searchValue, config }, API } = useContext(GlobalState);

    const sections = [
        {
            title: 'Popular Movies',
            fetchData: {
                action: () => API.getMovies(null, ['popular'])
            },
        },
        {
            title: 'Popular Series',
            fetchData: {
                action: () => API.getSeries(null, ['popular'])
            }
        },
        {
            title: 'Family',
            fetchData: {
                action: (params) => API.discoverMovies(params),
                params: { with_genres: getGenreID(genres, genreTypes.family) },
            },
        },
        {
            title: 'Documentary',
            fetchData: {
                action: (params) => API.discoverMovies(params),
                params: { with_genres: getGenreID(genres, genreTypes.documentary) },
            },
        },
    ];
    return (
        <div className="homePage">
            {searchValue
                ? (
                    <Section
                        fetchData={{ action: (params) => API.search(params), params: { query: searchValue, sort_by: 'popularity.desc' } }}
                        title="Search results"
                        config={config}
                    />
                )
                : (
                    <div className="sectionsWrapper">
                        {sections.map((section) => (
                            <Section
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
