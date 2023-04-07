import React from 'react';
import LatestProductsSlider from './LatestProductsSlider';

const LatestProducts = () => {
    return (
        <div className='products'>
            <div className="container">
                <div className="title">
                    <h5>Latest Products</h5>
                </div>

                <LatestProductsSlider/>
            </div>
        </div>
    )
}

export default LatestProducts
