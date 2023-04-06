import React from "react";
import Banner from "../components/Banner";
import LatestProducts from "../components/LatestProducts";
import Laptops from "../components/Laptops";
import Accessories from "../components/Accessories";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <LatestProducts />
      <Laptops />
      <Accessories />

    </main>
  );
};

export default HomePage;
