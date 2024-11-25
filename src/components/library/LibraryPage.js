import React, { useEffect, useState } from "react";
import "./LibraryPage.css"
import api from "../../api/axios"
import ArtistCarousel from "./ArtistCarousel";
import PlaylistsList from "./PlaylistsList";

function LibraryPage({userId}){
    const [artistList, setArtistList] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);
    const [musicList, setMusicList] = useState([]);

    const getLibararyData = async() => {
        try{
            const response = await api.get(`/library/${userId}`);
            console.log(response.data);
            setArtistList(response.data?.artistList);
            setPlaylistList(response.data?.playlistList);
            setMusicList(response.data?.musicList);

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getLibararyData();

    },[])

    return <>
        <div className="library-container">
            <ArtistCarousel artistList={artistList}/>
            <PlaylistsList playlistList={playlistList.concat(musicList)}/>
            
        </div>
    </>
}

export default LibraryPage;