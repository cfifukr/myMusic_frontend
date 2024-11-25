import React from "react";
import "./BannerHomePage.css"
import yourAdHere from "../../static/images/your_ad_here.png"

function BannerHomePage(){

    return<>
        <div className="banner-container">
            <img src={yourAdHere}/>

        </div>
    </>
}
export default BannerHomePage;