import React from "react";
import "./Genres.css";
import Rock from "../../static/images/rock.jpeg";
import Pop from "../../static/images/pop.webp";
import Rap from "../../static/images/rap.jpeg";
import HipHop from "../../static/images/hiphop.jpeg";
import Classic from "../../static/images/classic.jpeg";
import Country from "../../static/images/country.webp";
import Electronic from "../../static/images/electronic.jpeg";
import K_pop from "../../static/images/k-pop.webp";
import Phonk from "../../static/images/phonk.jpeg";
import Jazz from "../../static/images/jazz.webp";
import Reggae from "../../static/images/reggae.jpeg";
import Metal from "../../static/images/metal.jpeg";
import { useNavigate } from "react-router-dom";

const genres = [
    { name: "ROCK", image: Rock },
    { name: "POP", image: Pop },
    { name: "RAP", image: Rap },
    { name: "HIP-HOP", image: HipHop },
    { name: "METAL", image: Metal },
    { name: "CLASSIC", image: Classic },
    { name: "COUNTRY", image: Country },
    { name: "ELECTRONIC", image: Electronic },
    { name: "K-POP", image: K_pop },
    { name: "PHONK", image: Phonk },
    { name: "JAZZ", image: Jazz },
    { name: "REGGAE", image: Reggae },
];

function Genres() {
    const navigate = useNavigate();

    const redirect = (genre, image) =>{
        const data = {"genre" : genre, "imagePath": image};
        console.log(data)
        navigate("/genres", {state:{data}});
        
    };

    return (
        <div className="row genres-container">
            {genres.map((genre, index) => (
                <div key={index} 
                    onClick={() => redirect(genre.name, genre.image)}
                    className={`col col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 genre-card ${genre.name.toLowerCase().replace(" ", "-")}-genre`}>
                    <img src={genre.image} alt={genre.name} /> 
                    <div className="overlay"></div>
                    <span>{genre.name}</span>
                </div>
            ))}
        </div>
    );
}

export default Genres;
