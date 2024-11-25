import React, { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import api from "../../api/axios";
import ProgressBar from './ProgressBar'; 

const MusicPlayer = ({ currentMusicId, setCurrentMusicId, isPlayed, setIsPlayed}) => {
    const [musicDto, setMusicDto] = useState({});
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((err) => {
                console.error('Error trying to play the audio:', err);
                setError('Failed to play audio');
            });
            setIsPlayed(true);
        }
    };

    useEffect(()=>{
        if (audioRef.current && !isPlayed) {
            audioRef.current.pause();
            setIsPlayed(false);
        }

    }, [isPlayed]);

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlayed(false);
        }
    };

    const getMusicDto = async (id) => {
        try {
            const response = await api.get(`music/${id}`);
            setMusicDto(response.data);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch music details');
        }
    };

    const getNextMusic = () => {
        const nextMusicId = musicDto?.nextMusicId || currentMusicId + 1;
        setMusicDto({...musicDto, logoLink: null})
        setCurrentMusicId(nextMusicId);
    };

    const getPrevMusic = () => {
        const prevMusicId = musicDto?.prevMusicId || currentMusicId - 1;
        setMusicDto({...musicDto, logoLink: null})
        setCurrentMusicId(prevMusicId);
    };

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            if (audio) {
                setProgress(audio.currentTime);
                setDuration(audio.duration || 0);
            }
        };

        if (audio) {
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
            });
            audio.addEventListener('ended', () => {
                setIsPlayed(false);
                setProgress(0);
            });

            return () => {
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('loadedmetadata', () => {
                    setDuration(audio.duration);
                });
                audio.removeEventListener('ended', () => {
                    setIsPlayed(false);
                    setProgress(0);
                });
            };
        }
    }, []);

    useEffect(() => {
        getMusicDto(currentMusicId);
        const audio = audioRef.current;

        if (audio) {
            handlePause(); 
        }

        getMusicDto(currentMusicId);

        if (audio) {
            audio.src = `http://localhost:8080/api/v1/music/stream/${currentMusicId}`;
            audio.load();
            handlePlay(); 
        }

    }, [currentMusicId]);

    const handleProgressChange = (newProgress) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newProgress;
            setProgress(newProgress);
        }
    };

    const defaultImageUrl = 'https://play-lh.googleusercontent.com/54v1qfGwv6CsspWLRjCUEfVwg4UX248awdm_ad7eoHFst6pDwPNgWlBb4lRsAbjZhA=w480-h960';

    return (
        <div className='player-container'>
            <div className='music-image'>
                <img 
                    src={musicDto.logoLink || defaultImageUrl} 
                    alt='Album Cover'
                    onError={(e) => e.target.src = defaultImageUrl} 
                />
            </div>
            <div className='music-title'>
                <p className='title'>{musicDto.name || 'Unknown Title'}</p>
            </div>
            <ProgressBar
                progress={progress}
                duration={duration}
                onChange={handleProgressChange}
            />
            <div className='music-menu'>
                <div className='menu-item'>
                    <TbPlayerTrackPrevFilled size={50} onClick={getPrevMusic}/>
                </div>
                <div className='menu-item'>
                    {isPlayed ? 
                        <TbPlayerPauseFilled size={50} onClick={handlePause} /> : 
                        <TbPlayerPlayFilled size={50} onClick={handlePlay} />}
                </div>
                <div className='menu-item'>
                    <TbPlayerTrackNextFilled size={50} onClick={getNextMusic}/>
                </div>
            </div>
            <div>
                <audio className='audio' ref={audioRef} />
            </div>
        </div>
    );
};

export default MusicPlayer;
