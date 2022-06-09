import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Button } from "@mui/material";
import "../style.css"
/*
  resources:
  1- https://www.npmjs.com/package/react-owl-carousel
  2- https://github.com/seal789ie/react-owl-carousel
*/

const MyOwlCarousel = () => {
  const options = {
    loop: true,
    margin: 10,
    items: 1,
    autoplay: true,
  };
  return (
    <OwlCarousel className="owl-theme slider" {...options}>
      <div className="item">
        <img
          src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20Shop%20Header.jpg"
          alt="road"
        />
        <div className="carousel-caption d-md-block">
          <p>A Beautiful House_</p>
          <h1>Modern Furniture.</h1>
          <p className="description">
            How employees, surely the a said drops. Bathroom expected that
            systems let place. Her safely been little. Enterprises flows films
            it a fly the of wasn't designer the her thought. Enterprises flows
            films it a fly the of wasn't designer.
          </p>
          <Button variant="contained" disableElevation>
            Shop Now
          </Button>
        </div>
      </div>
      <div className="item">
        <img
          src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20Shop%20Header.jpg"
          alt="sunrise"
        />
        <div className="carousel-caption d-md-block">
          <p>A Beautiful House_</p>
          <h1>Modern Furniture.</h1>
          <p className="description">
            How employees, surely the a said drops. Bathroom expected that
            systems let place. Her safely been little. Enterprises flows films
            it a fly the of wasn't designer the her thought. Enterprises flows
            films it a fly the of wasn't designer.
          </p>
          <Button
            sx={{ borderRadius: "0px" }}
            variant="contained"
            disableElevation
          >
            Shop Now
          </Button>
        </div>
      </div>
      <div className="item">
        <img
          src="https://bazar-react.vercel.app/assets/images/Furniture%20Shop/Furniture%20Shop%20Header.jpg"
          alt="road2"
        />
        <div className="carousel-caption d-md-block">
          <p>A Beautiful House_</p>
          <h1>Modern Furniture.</h1>
          <p className="description">
            How employees, surely the a said drops. Bathroom expected that
            systems let place. Her safely been little. Enterprises flows films
            it a fly the of wasn't designer the her thought. Enterprises flows
            films it a fly the of wasn't designer.
          </p>
          <Button variant="contained" disableElevation>
            Shop Now
          </Button>
        </div>
      </div>
    </OwlCarousel>
  );
};
export default MyOwlCarousel;
