import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllItemsMutation } from "../redux/features/products/itemApiSlice";
import { useEffect, useState } from "react";

const LaptopsSlider = () => {
  const [getAllItems, { data, isLoading }] = useGetAllItemsMutation();
  const [Products, setProducts] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    getAllItems();
    if (data) {
      if ("data" in data) {
        setProducts(data.data);
      }
    }
  }, []);
  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {Products.length}
      <div className="slider-container">
        <Slider {...settings}>
          {Products.map((product) => (
            <div key={product.itemID} className="slide">
              <div className="slide-top">
                <img
                  src={product.images[0]["url"]}
                  alt={product.title}
                  width="120px"
                />
              </div>
              <div className="slide-bottom">
                <h5>{product.title}</h5>
                <p>{product.unitPrice}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default LaptopsSlider;
