import React, {useState, useEffect} from "react";
import api from "../../api/axios"
import "./LibraryPage.css"
import { FaPlus } from "react-icons/fa6";




function PlaylistsList({playlistList}){


    return <>
        <h2 className='title-library'>Saved playlists amd musics</h2>

        <div className="playlists-list">

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

export default PlaylistsList;