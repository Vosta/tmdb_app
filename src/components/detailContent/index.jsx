import React from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './index.scss';
import moment from 'moment';
import Carusel from '../carusel';

const castDisplayNumber = 5;

// youtube trailer support
/*
    const embededControls = {
        autoplay: 1,
        controls: 0,
        loop: 1,
        rel: 0,
        disablekb: 1,
        modestbranding: 1
    };
    const getYoutubeEmbededLink = (id) => {
        const params = Object.keys(embededControls)
            .reduce((res, currentKey) => ([...res, `${currentKey}=${embededControls[currentKey]}`]), []).join('&');
        return `https://www.youtube.com/embed/${id}?${params}`;
    };
 */
const getAirTime = (assetData) => {
    const firstAirDate = moment(assetData.first_air_date).format('YYYY');
    const lastAirDate = assetData.status === 'Ended' ? moment(assetData.last_air_date).format('YY') : '';
    return `${firstAirDate}-${lastAirDate}`;
};
const getPosterImage = (imageConfig, assetData) => {
    const { base_url, poster_sizes, backdrop_sizes } = imageConfig;
    const fallbackPoster = assetData.images.posters[0] ? assetData.images.posters[0].file_path : '';
    // handle cases when backdrop_path is not provided
    const posterPath = (assetData.backdrop_path && backdrop_sizes[3] + assetData.backdrop_path)
        || (assetData.poster_path && poster_sizes[3] + assetData.poster_path)
        || fallbackPoster;
    return `${base_url}${posterPath}`;
};

const shortenText = (text, maximumLetters) => {
    const shortText = text.slice(0, maximumLetters);
    // cut the shorten text on the end of the last sentence
    return `${shortText.slice(0, shortText.lastIndexOf('.'))}.`;
};

export default function DetailContent({
    handlePlayAsset, assetData, config, isSeries
}) {
    const backgroundImage = getPosterImage(config.images, assetData);
    const overview = assetData.overview.length > 550 ? shortenText(assetData.overview, 550) : assetData.overview;
    return (
        <div>
            <div className="detailContentHeader" style={{ backgroundImage: `url('${backgroundImage}')` }}>
                <div role="presentation" className="detailContentHeaderPlayButton positionCenterXY" onClick={() => handlePlayAsset(assetData.id)}>
                    <FontAwesomeIcon icon={faPlay} className="positionCenterXY" />
                </div>
            </div>
            <div className="detailContentInfo">
                <p className="title">
                    <span>{isSeries ? assetData.name : assetData.title}</span>
                </p>
                <div className="detailsWrapper">
                    <p className="description">{overview}</p>
                    <div className="details">
                        {(assetData.credits && !!assetData.credits.cast.length) && (
                            <div className="detailGroup">
                                <p className="detailGroupTitle">Cast:</p>
                                <p className="detailGroupValue">
                                    {assetData.credits.cast.splice(0, castDisplayNumber).map((item, itemIndex) => (
                                        <span key={`cast${item.name}`}>
                                            {item.name}
                                            {itemIndex !== castDisplayNumber - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                        <div className="detailGroup">
                            <p className="detailGroupTitle">Genres:</p>
                            <p className="detailGroupValue">{assetData.genres.reduce((res, current) => [...res, current.name], []).join(', ')}</p>
                        </div>
                        {assetData.release_date && (
                            <div className="detailGroup">
                                <p className="detailGroupTitle">Release date:</p>
                                <p className="detailGroupValue">{assetData.release_date}</p>
                            </div>
                        )}
                        {assetData.first_air_date && (
                            <div className="detailGroup">
                                <p className="detailGroupTitle">Air time:</p>
                                <p className="detailGroupValue">
                                    {getAirTime(assetData)}
                                </p>
                            </div>
                        )}
                        {assetData.runtime !== undefined && (
                            <div className="detailGroup">
                                <p className="detailGroupTitle">Runtime:</p>
                                <p className="detailGroupValue">{`${assetData.runtime} min`}</p>
                            </div>
                        )}
                    </div>
                </div>

                {(assetData.similar && !!assetData.similar.results.length) && (
                    <div className="similarSection">
                        <p>More Like This</p>
                        <Carusel sectionData={assetData.similar.results} config={config} />
                    </div>
                )}
            </div>
        </div>
    );
}

DetailContent.propTypes = {
    handlePlayAsset: PropTypes.func.isRequired,
    isSeries: PropTypes.bool.isRequired,
    assetData: PropTypes.oneOfType([PropTypes.object]).isRequired,
    config: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
