import React, { useState } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import HeroOne from "../../assets/Images/HeroOne.jpg";
import HeroTwo from "../../assets/Images/HeroTwo.jpg";
import HeroThree from "../../assets/Images/HeroThree.png";
import "./carousel.css";

const CarouselContainer = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="carousel-container">
      <Carousel
        autoplay
        dots={true}
        // prevArrow={<LeftOutlined className="custom-arrow " />}
        // nextArrow={<RightOutlined className="custom-arrow " />}
        beforeChange={() => setProgress(0)}
      >
        <div className="carousel-wrap">
          <img src={HeroOne} alt="Hero One" className="carousel-image" />
        </div>
        <div className="carousel-wrap">
          <img src={HeroTwo} alt="Hero Two" className="carousel-image" />
        </div>
        <div className="carousel-wrap">
          <img src={HeroThree} alt="Hero Three" className="carousel-image" />
        </div>
      </Carousel>

      <div className="carousel-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default CarouselContainer;
