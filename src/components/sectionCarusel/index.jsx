import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import AssetCard from '../assetCard';
import Loader from '../loader';
import './index.scss';

const leftType = 'left';
const rightType = 'right';
const minScrollValue = 0;

export default function SectionCarusel({
    fetchData, title, config
}) {
    const [sectionData, setSectionData] = useState([]);
    const caruselRef = React.useRef();

    const handleSectionData = (data) => {
        const results = [...data.results].splice(0, 50);
        setSectionData(results);
    };
    const handleSectionDataError = () => {
    };
    const handleCaruselMove = (type) => {
        const carusel = caruselRef.current;
        if (carusel) {
            const caruselScrollLeft = carusel.scrollLeft;
            const maxScrollLeft = carusel.scrollWidth - carusel.clientWidth;
            const scrollValue = carusel.offsetWidth - 100;
            let newScrollValue = type === rightType ? caruselScrollLeft + scrollValue : caruselScrollLeft - scrollValue;

            if (newScrollValue > maxScrollLeft) {
                newScrollValue = maxScrollLeft;
            } else if (newScrollValue < minScrollValue) {
                newScrollValue = minScrollValue;
            }
            carusel.scroll({
                left: newScrollValue,
                top: 0,
                behavior: 'smooth'
            });
        }
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
            <div className="caruselWrapper">
                <div className="caruselArrow left" role="presentation" onClick={() => handleCaruselMove(leftType)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="caruselContent" ref={caruselRef}>
                    {sectionData.length ? sectionData.map((card) => (
                        <AssetCard
                            key={card.id}
                            id={card.id}
                            poster_path={card.poster_path}
                            config={config}
                            isSeries={!!card.name}
                        />
                    )) : <Loader /> }
                </div>

                <div className="caruselArrow right" role="presentation" onClick={() => handleCaruselMove(rightType)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
            </div>
        </div>
    );
}

SectionCarusel.propTypes = {
    title: PropTypes.string.isRequired,
    fetchData: PropTypes.oneOfType([PropTypes.object]).isRequired,
    config: PropTypes.oneOfType([PropTypes.object]).isRequired
};
