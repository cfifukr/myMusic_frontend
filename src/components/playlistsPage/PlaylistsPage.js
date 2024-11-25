import React, {useState, useEffect} from "react";
import api from "../../api/axios"
import "./PlaylistsPage.css"
import { FaPlus } from "react-icons/fa6";




function PlaylistsPage({userId}){
    const [playlistList, setplaylistList] = useState([]);


    const getLibraryData = async() => {
        try{
            const response = await api.get(`/playlist/user/${userId}`);
            console.log(response.data);
            setplaylistList(response.data);

            
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getLibraryData();
    },[userId])


    return <>
        <div className="playlists-container">
            {
                playlistList.map((playlist) => {
                    return <div key={playlist?.id}
                            className="playlist-card">
                                <img src={playlist?.logoLink}/>
                                <span className="title">
                                    {playlist?.name}
                                </span>


                        </div>
                    
                })
            }
            <div className="add-playlist"> 
                <FaPlus size={100}/>
                <h3> Create Playlist</h3>
                <div className="overlay"></div>

            </div>

        </div>
        
    
    </>
}

export default PlaylistsPage;