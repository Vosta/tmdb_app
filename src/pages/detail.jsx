import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GlobalState from '../store/context';
import Loader from '../components/loader';

import './detail.scss';
import DetailContent from '../components/detailContent';

export default function Detail() {
    const location = useLocation();
    const history = useHistory();
    const [assetData, setAssetData] = useState(null);
    // const [error, setError] = useState(true);

    const { state: { config }, API } = useContext(GlobalState);
    const currentLocation = location.pathname;
    const isSeries = currentLocation.split('/')[2] === 'series';
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
        setAssetData(null);
        const assetID = currentLocation.split('/')[3];
        const action = isSeries ? 'getSeries' : 'getMovies';
        const params = { append_to_response: 'videos,images,credits,similar' };
        API[action](params, [assetID])
            .then((res) => handleData(res.data));
        /* .catch(() => setError(true)) */
    }, [currentLocation]);
    return (
        <div className="detailWrapper">
            <div className="detailContent hiddenScrollBar">
                <p className="closeIcon" role="presentation" onClick={closeDialog}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </p>
                {(!assetData) ? <Loader />
                    : (
                        <DetailContent
                            handlePlayAsset={handlePlayAsset}
                            assetData={assetData}
                            config={config}
                            isSeries={isSeries}
                        />
                    )}
            </div>
        </div>
    );
}
