import React, { useEffect, useState } from "react";
import axios from "axios";
import BackEnd from "componets/BackEnd/BackEnd";
import Banner from "componets/Banner/Baner";
import DPersonal from "componets/DesarrolloPersonal/DPersonal";
import Footer from "componets/Footer/Footer";
import FrontEnd from "componets/FrontEnd/FrontEnd";
import Header from "componets/Header/Header";

function Home() {
    const [frontendVideos, setFrontendVideos] = useState([]);
    const [backendVideos, setBackendVideos] = useState([]);
    const [DPVideos, setDPVideos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/videos")
            .then((response) => {
                const videos = response.data;
                setFrontendVideos(videos.filter(video => video.category === "frontend"));
                setBackendVideos(videos.filter(video => video.category === "backend"));
                setDPVideos(videos.filter(video => video.category === "DPersonal"));
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <Header />
            <Banner
                frontendVideo={frontendVideos[0]}
                backendVideo={backendVideos[0]}
                DPVideo={DPVideos[0]}
            />
            <FrontEnd videos={frontendVideos} />
            <BackEnd videos={backendVideos} />
            <DPersonal videos={DPVideos} />
            <Footer />
        </div>
    );
}

export default Home;