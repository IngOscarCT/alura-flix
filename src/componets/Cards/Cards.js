// src/Components/Cards.js
import React, { useState, useEffect} from "react";
import VideoCard from "../VideoCards/VideoCard";
import styles from './Cards.module.css'; // Archivo CSS para estilos compartidos

// Componente Cards que toma las props de videos y la categoría
function Cards({ videos, category }) {
    const [localVideos, setLocalVideos] = useState(videos);

    useEffect(() => {
        setLocalVideos(videos);
    }, [videos]);

    const handleEdit = (updatedVideo, id) => {
        if (updatedVideo) {
            setLocalVideos(localVideos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
        }
    };

    const handleDelete = (id) => {
        setLocalVideos(localVideos.filter(video => video.id !== id));
    };

    return (
        <div className={styles.cardsContainer}>
            {/* Mapea a través del array de videos y renderiza una VideoCard para cada uno */}
            {localVideos.map((video) => (
                <VideoCard key={video.id} video={video} category={category} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default Cards;