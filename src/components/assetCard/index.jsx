import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const posterSizeIndex = 3;

export default function AssetCard({
    poster_path, id, config, isSeries
}) {
    const history = useHistory();
    const handleClick = () => history.push(`/browse/${isSeries ? 'series' : 'movie'}/${id}`);

    const { images: { base_url, poster_sizes } } = config;
    const style = poster_path
        ? { backgroundImage: `url('${base_url + poster_sizes[posterSizeIndex] + poster_path}')` }
        : { backgroundColor: '#5c5252' };
    return (
        <div className="assetCard" style={style} role="presentation" onClick={handleClick} />
    );
}

AssetCard.propTypes = {
    poster_path: PropTypes.string,
    id: (PropTypes.number || PropTypes.string).isRequired,
    config: PropTypes.oneOfType([PropTypes.object]).isRequired,
    isSeries: PropTypes.bool.isRequired
};
AssetCard.defaultProps = {
    poster_path: null
};
