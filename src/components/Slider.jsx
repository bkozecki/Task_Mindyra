import React, { useState, useEffect } from "react";

import "./Slider.style.scss";

const usernames = [
  "gaearon",
  "acdlite",
  "yyx990803",
  "unclebob",
  "martinfowler",
];

const Slider = () => {
  const [currentImg, setCurrentImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex > 4) {
      setCurrentIndex(0);
    }
    if (currentIndex < 0) {
      setCurrentIndex(4);
    }
    fetch(`https://api.github.com/users/${usernames[currentIndex]}`)
      .then((res) => res.json())
      .then((data) => setCurrentImg(data.avatar_url));
  }, [currentImg, currentIndex]);

  const nextImg = () => {
    setCurrentIndex((prevState) => prevState + 1);
  };

  const prevImg = () => {
    setCurrentIndex((prevState) => prevState - 1);
  };

  return (
    <div className="slider">
      <button className="slider_button" onClick={prevImg}>
        Previous
      </button>
      <div className="slider_img_wrapper">
        <img
          src={currentImg}
          className="slider_img_content"
          alt="programmer's avatars"
        />
        {!currentImg && <p>Loading...</p>}
      </div>
      <button className="slider_button" onClick={nextImg}>
        Next
      </button>
    </div>
  );
};

export default Slider;
