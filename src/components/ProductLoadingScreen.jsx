import React from "react";
import { Skeleton } from "antd";

const ProductLoadingScreen = () => {
  return (
    <div>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </div>
  );
};

export default ProductLoadingScreen;