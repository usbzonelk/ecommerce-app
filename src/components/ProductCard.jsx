import React from 'react';

const ProductCard = ({product}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt='Laptop' />
      </div>

      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="product-price">$2000</div>
        <button className="btn-add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
