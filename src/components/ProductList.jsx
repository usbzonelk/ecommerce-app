import React from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
    const products = {
        id: 1, id: 2, id: 3
    }
    
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
