import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import MusicList from "./MusicList";
import "./GenreMusic.css"; 

function GenresMusic({currentMusicId, setCurrentMusicId, isPlayed, setIsPlayed}) {
    const location = useLocation();
    const genre = location.state?.data?.genre;
    const headerImage = location.state?.data?.imagePath;

    const size = 30;
    const [page, setPage] = useState(0);
    const [musicDto, setMusicDto] = useState({});

    useEffect(() => {
        getMusicByGenre();
    }, [page]);

    const getMusicByGenre = async () => {
        try {
            const response = await api.get(`genres?genre=${genre}&pageNumber=${page}&pageSize=${size}`);
            setMusicDto(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            
            <MusicList musicList={musicDto?.list} 
                currentMusicId={currentMusicId} 
                setCurrentMusicId={setCurrentMusicId} 
                isPlayed={isPlayed} 
                setIsPlayed = {setIsPlayed} />
            
        </>
    );
}

export default GenresMusic;
