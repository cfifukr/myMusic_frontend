import React from "react";
import BannerHomePage from "./BannerHomePage";
import "./Home.css"
import Genres from "./Genres";

function Home(){

    return <>
        <div className="content-container">
            <BannerHomePage/>
            <Genres/>
        </div>
    
    </>
}

export default Home;