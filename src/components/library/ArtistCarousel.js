import React, { useState } from 'react';
import './LibraryPage';
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";


const ArtistCarousel = ({ artistList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5;

  const handleNext = () => {
    if (currentIndex < artistList.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return <>
    <h2 className='title-library'>Saved artists</h2>

    <div className="carousel">
    <RiArrowLeftWideFill onClick={handlePrev} size={100}/>
      <div className="carousel-content">
        {artistList?.slice(currentIndex, currentIndex + itemsToShow).map((artist) => (
          <div className="artist" key={artist.id}>
            <img src={artist.logoLink} alt={artist.name} />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    <RiArrowRightWideFill onClick={handleNext} size={100} />
    </div>
  </>;
};

export default ArtistCarousel;
