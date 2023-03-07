import React from 'react';
import ProductList from './ProductList';

const Shop = () => {
    return (
        <section className='shop'>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h5>Categories</h5>
                        <ul className='categories-list'>
                            <li>HP</li>
                            <li>Dell</li>
                            <li>Acer</li>
                            <li>Accessories</li>
                        </ul>
                    </div>

                    <div className="col-8">
                        <h5>Products</h5>
                        <ProductList/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Shop
