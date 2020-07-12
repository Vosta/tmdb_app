import React, { useContext } from 'react';
import SectionCarusel from '../components/sectionCarusel';
import GlobalState from '../store/context';
import './home.scss';

const genreTypes = {
    family: 'family',
    documentary: 'documentary',
};

const HomePage = () => {
    const { state: { genres }, API } = useContext(GlobalState);
    const getGenreID = (genreType) => {
        const genre = genres.find((item) => item.name.toLowerCase() === genreType);
        return genre ? genre.id : null;
    };

    const sectionKeys = [
        {
            title: 'Popular Movies',
            fetchData: {
                action: API.getMovies,
                params: { sort_by: 'popularity.asc' },
            },
        },
        {
            title: 'Popular Series',
            fetchData: {
                action: API.getSeries,
                params: { sort_by: 'popularity.asc' },
            },
        },
        {
            title: 'Family',
            fetchData: {
                action: API.getMovies,
                params: { with_genres: getGenreID(genreTypes.family) },
            },
        },
        {
            title: 'Documentary',
            fetchData: {
                action: API.getMovies,
                params: { with_genres: getGenreID(genreTypes.documentary) },
            },
        },
    ];
    return (
        <div className="homePage">
            <h2 className="appTitle">Streaming Service</h2>
            <div className="sectionsWrapper">
                {sectionKeys.map((section) => (
                    <SectionCarusel
                        key={section.title}
                        fetchData={section.fetchData}
                        title={section.title}
                    />
                ))}
            </div>
        </div>
    );
};
export default HomePage;
