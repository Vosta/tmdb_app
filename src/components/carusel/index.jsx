import React from 'react';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import AssetCard from '../assetCard';
import Loader from '../loader';

import './index.scss';

const leftType = 'left';
const rightType = 'right';
const minScrollValue = 0;

const handleCaruselMove = (caruselRef, type) => {
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

export default function Carusel({ sectionData, config, style }) {
    const caruselRef = React.useRef();
    return (
        <div className="caruselWrapper" style={style || {}}>
            <div className="caruselArrow left" role="presentation" onClick={() => handleCaruselMove(caruselRef, leftType)}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div className="caruselContent hiddenScrollBar" ref={caruselRef}>
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

            <div className="caruselArrow right" role="presentation" onClick={() => handleCaruselMove(caruselRef, rightType)}>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    );
}

Carusel.propTypes = {
    sectionData: PropTypes.arrayOf(PropTypes.object).isRequired,
    config: PropTypes.oneOfType([PropTypes.object]).isRequired,
    style: PropTypes.oneOfType([PropTypes.object])
};
Carusel.defaultProps = {
    style: {}
};
