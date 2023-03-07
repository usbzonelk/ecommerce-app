import React from 'react';
import LaptopPic from '../images/banner-img.png';

const ProductCard = ({product}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={LaptopPic} alt='Laptop' />
      </div>
      <div className="product-details">
        <h2 className="product-title">laptop</h2>
        <p className="product-description">It's a laptop</p>
        <div className="product-price">$2000</div>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
