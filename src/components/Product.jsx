import React from "react";
import laptop from '../images/laptop.png';
import '../styles/Product.css';

const Product = () => {
    return (
        <div class="container">
            <div class="box">
                <div class="images">
                    <div class="img-holder active">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div class="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div class="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div class="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>

                    <div class="img-holder">
                        <img src={laptop} alt=""></img>
                    </div>
                </div>
            
                <div class="basic-info">
                    <h1>Product</h1>
                
                    <span>Rs. 250000</span>
            
                </div>
                    
                <div class="description">
                    <p>Product is the best learning companion for students of all ages, with a tough, innovative design that’s made to last.
As well as a versatile touchscreen display and stylus1, there’s also a 360° hinge and a world-facing camera. It’s packed with clever protective features, including an all-round
rubber bumper, spill-resistant keyboard and ultratough hinge.</p>
                    
                    <ul class="features" >
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
                            <input class="input" default="1" type="number" min="1" max="100" placeholder="1"/>
                            &nbsp;
                            <button class="button">Add to Cart</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product