/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shaka from 'shaka-player';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './watch.scss';

export default function WatchPage() {
    const history = useHistory();
    const videoComponent = useRef();

    const onErrorEvent = () => {
    };
    const onError = (error, player) => {
        player.destroy().then(() => {
            const video = videoComponent.current;
            if (video) {
                video.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                video.play();
            }
        });
    };
    const closeDialog = () => {
        history.push('/browse');
    };
    useEffect(() => {
        const video = videoComponent.current;
        if (video) {
            const player = new shaka.Player(video);
            player.addEventListener('error', onErrorEvent);

            // Try to load the manifest.
            player.load('https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8').catch((err) => player && onError(err, player));
        }
    }, []);

    return (
        <div className="assetPlayerWrapper">
            <p className="closeIcon" role="presentation" onClick={closeDialog}><FontAwesomeIcon icon={faTimesCircle} /></p>
            <video
                ref={videoComponent}
                controls
                autoPlay
                className="assetPlayer"
            />
        </div>

    );
}
