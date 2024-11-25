import React from "react";
import "./SidebarCustom.css"
import MusicPlayer from "../music/MusicPlayer";
import { useNavigate } from "react-router-dom";


function SidebarCustom({currentMusicId, setCurrentMusicId, isPlayed, setIsPlayed}){

    return <>
    <div className="sidebar-custom">
        <div className="header">
            <a  href="/">MyMusic</a>
        </div>
        <div className="underline">
        </div>

        <div className="sidebar-buttons">

            <input type="search" 
                class="sidebar-search" 
                placeholder="Search music" 
                aria-label="Search music"></input>
            <br>
            </br>
            <a  href="/library"
                className="sidebar-button">
                Library
            </a>
            <a href="/chart"
                className="sidebar-button">
                Charts
            </a>
            <a href="/playlists"
                className="sidebar-button">
                Playlists
            </a>
            <a className="sidebar-button">
                Saved playlists
            </a>
        </div>

        <MusicPlayer currentMusicId={currentMusicId} 
            setCurrentMusicId={setCurrentMusicId} 
            isPlayed={isPlayed} 
            setIsPlayed={setIsPlayed}/>


    </div>

    
    </>

}
export default SidebarCustom;
