import React, { useState, useEffect } from "react";
import { Octokit } from "octokit";

import "./Slider.style.scss";

const octokit = new Octokit({
  auth: "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",
});

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
    fetch(`https://api.github.com/users/${usernames[currentIndex]}`)
      .then((res) => res.json())
      .then((data) => setCurrentImg(data.avatar_url));
  }, [currentImg, currentIndex]);

  const nextImg = () => {
    if (currentIndex !== usernames.length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
    if (currentIndex === usernames.length - 1) {
      setCurrentIndex(0);
    }
  };

  const prevImg = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
    if (currentIndex === 0) {
      setCurrentIndex(usernames.length - 1);
    }
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
