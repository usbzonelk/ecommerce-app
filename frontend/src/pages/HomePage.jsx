import React from "react";
import Banner from "../components/Banner";
import LatestProducts from "../components/LatestProducts";
import Laptops from "../components/Laptops";
import Accessories from "../components/Accessories";
import SearchPage from "../components/Shop/SearchPage";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <LatestProducts />
      <Laptops />
      <Accessories />

      <SearchPage />
    </main>
  );
};

export default HomePage;
