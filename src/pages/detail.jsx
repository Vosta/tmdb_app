import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { faPlay, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GlobalState from '../store/context';
import Loader from '../components/loader';

import './detail.scss';
import Aux from '../components/hoc/aux';

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

export default function Detail() {
    const location = useLocation();
    const history = useHistory();
    const [assetData, setAssetData] = useState(null);
    const [error, setError] = useState(true);
    const { state: { config }, API } = useContext(GlobalState);

    const isSeries = location.pathname.split('/')[2] === 'series';
    const getPosterImage = () => {
        const { base_url, poster_sizes } = config.images;
        const fallbackPoster = assetData.images.posters[0] ? assetData.images.posters[0].file_path : '';
        const posterPath = assetData.backdrop_path || assetData.poster_path || fallbackPoster;
        return `${base_url + poster_sizes[3]}${posterPath}`;
    };
    const handleData = (data) => {
        setAssetData(data);
    };
    const closeDialog = () => {
        history.push('/browse');
    };
    const handlePlayAsset = (id) => {
        history.push(`/watch/${id}`);
    };
    useEffect(() => {
        const assetID = location.pathname.split('/')[3];
        if (isSeries) {
            API.getSingleSeries({ append_to_response: 'videos,images' }, { assetID })
                .then((res) => handleData(res.data))
                .catch(() => setError(true));
            return;
        }
        API.getSingleMovie({ append_to_response: 'videos,images' }, { assetID })
            .then((res) => handleData(res.data))
            .catch(() => setError(true));
    }, []);
    return (
        <div className="detailWrapper">
            <div className="detailContent">
                <p className="closeIcon" role="presentation" onClick={closeDialog}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </p>
                {error && <p>{`Error loading ${isSeries ? 'series' : 'movie'} data.`}</p>}
                {!assetData ? <Loader /> : (
                    <Aux>
                        <div className="detailContentVideoWrapper">

                            {(assetData.videos && !!assetData.videos.results.length)
                                ? (
                                    <div className="iframeWrapper">
                                        <iframe
                                            title="Trailer"
                                            frameBorder="0"
                                            allowFullScreen
                                            allow="autoplay"
                                            src={getYoutubeEmbededLink(assetData.videos.results[0].key)}
                                        />
                                    </div>
                                ) : <img src={getPosterImage()} alt="" />}
                        </div>
                        <div className="detailContentInfo">
                            <p className="title">
                                <span>{isSeries ? assetData.original_name : assetData.title}</span>
                                <button type="button" className="playButton" onClick={() => handlePlayAsset(assetData.id)}>
                                    <span>PLAY</span>
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                            </p>
                            <p className="description">{assetData.overview}</p>
                        </div>
                    </Aux>
                )}
            </div>
        </div>
    );
}
