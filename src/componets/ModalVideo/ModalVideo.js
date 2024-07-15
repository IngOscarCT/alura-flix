// src/components/ModalVideo.js
import React from "react";
import YouTube from "react-youtube";
import styles from "./ModalVideo.module.css";

function ModalVideo({ show, videoUrl, onClose }) {
    if (!show) {
        return null;
    }

    const getYouTubeId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <button className={styles.modalClose} onClick={onClose}>X</button>
                <YouTube videoId={getYouTubeId(videoUrl)} className={styles.youtubePlayer} />
            </div>
        </div>
    );
}

export default ModalVideo;