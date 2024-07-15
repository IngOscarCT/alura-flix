import React, { useState, useEffect } from 'react';
import styles from "./Banner.module.css";
import VideoCard from "componets/VideoCards/VideoCard";

function Banner({ frontendVideo, backendVideo, DPVideo }) {
  const videos = [frontendVideo, backendVideo, DPVideo]; // Array de videos
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Estado para la card actual

  // useEffect para cambiar la card cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000); // Cambia cada 8 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [videos.length]);

  const handleScrollToFrontEnd = () => {
    document.getElementById('frontend').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.banner}>
      <button className={styles.buttonCategoria} onClick={handleScrollToFrontEnd}>
        Conocer Categorías
      </button>
      <div className={styles.cardContainer}>
        {/* Renderiza la VideoCard actual */}
        <VideoCard video={videos[currentVideoIndex]} category="Banner" />
      </div>
    </div>
  );
}

export default Banner