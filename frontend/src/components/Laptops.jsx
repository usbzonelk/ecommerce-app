import React from "react";
import LaptopsSlider from "./LaptopsSlider";
import { Provider } from "react-redux";
import store from "../redux/store";

const Laptops = () => {
  return (
    <div className="products">
      <div className="container">
        <div className="title">
          <h5>Laptops</h5>
        </div>
        <>
          <Provider store={store}>
            <LaptopsSlider />
          </Provider>
        </>
      </div>
    </div>
  );
};

export default Laptops;
