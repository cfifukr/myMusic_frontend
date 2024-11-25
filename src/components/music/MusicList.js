import React, { useState } from "react";
import "./MusicList.css";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from 'react-icons/tb';

function MusicList({ musicList, currentMusicId, setCurrentMusicId, isPlayed, setIsPlayed, isNumereted = false }) {

    const handleMusicClick = (musicId) => {
        if (currentMusicId === musicId) {
            setIsPlayed(!isPlayed);  // Toggle play/pause if it's the same song
        } else {
            setCurrentMusicId(musicId);  // Set the clicked song as the current music
            setIsPlayed(true);  // Start playing the new song
        }
    };

    return (
        <>
            <div className="music-list">
                <div className="header-row">
                    {isNumereted && <div className="header-item">№</div>} {/* Display number if isNumereted is true */}
                    <div className="header-item">Duration</div>
                    <div className="header-item">Title</div>
                    <div className="header-item">Album</div>
                    <div className="header-item">Artist</div>
                </div>
                {musicList?.map((music, index) => (
                    <div key={music?.id}>
                        <div
                            className={music?.id === currentMusicId ? `music-item music-active` : "music-item"}
                            onClick={() => handleMusicClick(music?.id)}
                        >
                            {isNumereted && music?.id !== currentMusicId && <div className="music-number">{index + 1}</div>} 
                            
                            {/* Conditionally render play/pause toggle */}
                            {isNumereted && music?.id === currentMusicId && !isPlayed && <div style={{display:"none"}}>{index + 1}</div>} {/* Show number on paused song */}
                            {music?.id === currentMusicId && ( // Only show play/pause toggle when song is active
                                <div>
                                    {isPlayed ? <TbPlayerPauseFilled size={20} /> : <TbPlayerPlayFilled size={20}/>}
                                </div>
                            )}


                            <div>{`${Math.floor(music?.secondsDuration / 60)}:${(music?.secondsDuration % 60).toString().padStart(2, '0')}`}</div>
                            <div className="music-name">{music?.name}</div>
                            <div>{music?.album}</div>
                            <div className="music-artist">{music?.artist}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MusicList;
