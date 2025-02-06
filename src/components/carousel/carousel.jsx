import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import HeroOne from "../../assets/Images/Hero-One.jpg";
import HeroTwo from "../../assets/Images/Hero-Two.jpg";
import HeroThree from "../../assets/Images/Hero-Three.jpg";
import "./carousel.css";

const CarouselContainer = () => {
  return (
    <div className="carousel-container">
      <Carousel
        autoplay
        arrows
        dots={false}
        prevArrow={<LeftOutlined className="custom-arrow left-arrow" />}
        nextArrow={<RightOutlined className="custom-arrow right-arrow" />}
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
    </div>
  );
};

export default CarouselContainer;
