import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductImage from '../images/banner-img.png';

const products = [
    { id: 1, name: 'Product 1', description: 'Description of Product 1', image: ProductImage },
    { id: 2, name: 'Product 2', description: 'Description of Product 2', image: ProductImage },
    { id: 3, name: 'Product 3', description: 'Description of Product 3', image: ProductImage },
    { id: 4, name: 'Product 4', description: 'Description of Product 4', image: ProductImage },
    { id: 5, name: 'Product 5', description: 'Description of Product 5', image: ProductImage },
    { id: 6, name: 'Product 6', description: 'Description of Product 6', image: ProductImage },
    { id: 7, name: 'Product 7', description: 'Description of Product 7', image: ProductImage },
    { id: 8, name: 'Product 8', description: 'Description of Product 8', image: ProductImage },
    { id: 9, name: 'Product 9', description: 'Description of Product 9', image: ProductImage }
];

const LaptopsSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div className='slider-container'>
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className='slide'>
                        <div className="slide-top">
                            <img src={product.image} alt={product.name} width='120px' />
                        </div>
                        <div className="slide-bottom">
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default LaptopsSlider;