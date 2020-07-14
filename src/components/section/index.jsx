import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Carusel from '../carusel';

export default function Section({ fetchData, title, config }) {
    const [sectionData, setSectionData] = useState([]);
    const handleSectionData = (data) => {
        const results = [...data.results].splice(0, 50);
        setSectionData(results);
    };
    const handleSectionDataError = () => {
    };

    useEffect(() => {
        const { action, params } = fetchData;
        action(params)
            .then((res) => handleSectionData(res.data))
            .catch((error) => handleSectionDataError(error));
    }, [fetchData]);

    return (
        <div className="sectionWrapper">
            <h2>{title}</h2>
            <Carusel sectionData={sectionData} config={config} />
        </div>
    );
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    fetchData: PropTypes.oneOfType([PropTypes.object]).isRequired,
    config: PropTypes.oneOfType([PropTypes.object]).isRequired
};
