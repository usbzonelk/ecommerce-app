import React from "react";
import LatestProductsSlider from "./LatestProductsSlider";
import { Provider } from "react-redux";
import store from "../redux/store";

const LatestProducts = () => {
  return (
    <div className="products">
      <div className="container">
        <div className="title">
          <h5>Latest Dell Laptops</h5>
        </div>
        <>
          <Provider store={store}>
            <LatestProductsSlider />
          </Provider>
        </>
      </div>
    </div>
  );
};

export default LatestProducts;
