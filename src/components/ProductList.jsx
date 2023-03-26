import React from 'react';
import ProductCard from './ProductCard';
import LaptopPic from '../images/banner-img.png'

const products = [
    { id: 1, name: 'Product 1', description: 'Description of Product 1', image: LaptopPic },
    { id: 2, name: 'Product 2', description: 'Description of Product 2', image: LaptopPic },
    { id: 3, name: 'Product 3', description: 'Description of Product 3', image: LaptopPic },
    { id: 4, name: 'Product 4', description: 'Description of Product 4', image: LaptopPic },
    { id: 5, name: 'Product 5', description: 'Description of Product 5', image: LaptopPic },
    { id: 6, name: 'Product 6', description: 'Description of Product 6', image: LaptopPic },
    { id: 7, name: 'Product 7', description: 'Description of Product 7', image: LaptopPic },
    { id: 8, name: 'Product 8', description: 'Description of Product 8', image: LaptopPic },
    { id: 9, name: 'Product 9', description: 'Description of Product 9', image: LaptopPic }
];

const ProductList = () => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
