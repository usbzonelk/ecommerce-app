import React from "react";
import laptop from '../images/laptop.png';

const Product = () => {
    return (
        <div className="product-view container">
            <div className="box">
                <div className="images">
                    <div className="img-holder active">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div className="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div className="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div className="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div className="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>
                </div>
            
                <div className="basic-info">
                    <h1>Product</h1>
                
                    <span>Rs. 250000</span>
            
                </div>
                    
                <div className="description">
                    <p>Product is the best learning companion for students of all ages, with a tough, innovative design that’s made to last.
As well as a versatile touchscreen display and stylus1, there’s also a 360° hinge and a world-facing camera. It’s packed with clever protective features, including an all-round
rubber bumper, spill-resistant keyboard and ultratough hinge.</p>
                    
                    <ul className="features" >
                        <li> - Processor</li>
                        <li> - Hard Disk</li>
                        <li> - RAM</li>
                        <li> - Display</li>
                        <li> - Graphic Card</li>
                        <li> - Battery</li>
                        <li> - OS</li>
                
                    </ul>
                
                    <div>
                        <form>
                            <input className="input" default="1" type="number" min="1" max="100" placeholder="1"/>
                            &nbsp;
                            <button className="button">Add to Cart</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product