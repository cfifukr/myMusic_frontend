import React, { useEffect, useState } from "react";
import "./ChartPage.css";
import api from "../../api/axios";
import PlaylistsList from "../library/PlaylistsList";
import MusicList from "../music/MusicList";


function ChartPage({ currentMusicId, setCurrentMusicId, isPlayed, setIsPlayed }) {
    const [chartDto, setChartDto] = useState({});
    const [musicList, setMusicList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [periodType, setPeriodType] = useState("WEEK");

    const getChartData = async () => {
        try {
            const response = await api.get(`/chart?date=${date.toISOString().split("T")[0]}&period=${periodType}`);
            console.log(response.data);
            setChartDto(response.data);

            const sortedSongs = Object.keys(response.data?.ranking)
                .sort((a, b) => a - b)
                .map(key => response.data?.ranking[key]);
            setMusicList(sortedSongs);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getChartData();
    }, [date, periodType]);

    const handleDateChange = (e) => {
        const newDate = new Date(e.target.value);
        setDate(newDate);
    };

    const handlePeriodChange = (e) => {
        setPeriodType(e.target.value);
    };

    return (
        <div className="chart-container">
            <div className="chart-header">
            
                <h1>{chartDto?.period?.toUpperCase()} CHARTS ({date.getDay() + " " + date.toLocaleString('default', { month: 'long' })})</h1>
            </div>

            <MusicList
                musicList={musicList}
                isPlayed={isPlayed}
                setIsPlayed={setIsPlayed}
                currentMusicId={currentMusicId}
                setCurrentMusicId={setCurrentMusicId}
                isNumereted={true}
            />


        
        </div>
    );
}

export default ChartPage;
