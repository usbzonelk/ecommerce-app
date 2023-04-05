import { Form, Radio, Slider, Switch } from "antd";
import { useState, useEffect } from "react";
import {
  useGetItemsOnPriceMutation,
  useGetAllBrandsMutation,
} from "../../redux/features/products/itemApiSlice";
import { message } from "antd";
import {
  setIsLoadingItems,
  setItems,
} from "../../redux/features/products/productsSlice";

import { useSelector, useDispatch } from "react-redux";

function SearchControls() {
  const dispatch = useDispatch();
  let productItems = useSelector((state) => state.items.items);

  const [getItemsOnPrice, { isLoading }] = useGetItemsOnPriceMutation();
  const [getAllBrands, { isBrandsLoading }] = useGetAllBrandsMutation();

  let searchItms = [];
  let endResults = [];
  const brands = [
    { label: "Dell", value: "dell" },
    { label: "Acer", value: "acer" },
    { label: "Lenovo", value: "lenovo" },
  ];
  const processors = [
    { label: "i3", value: "i3" },
    { label: "i5", value: "i5" },
  ];
  /* const brandsLoad = getAllBrands().data.forEach((brand) => {
    brands.push(brand.brandName);
  }); */
  const handleSliderChange = (value, name) => {
    console.log(value, name);
    dispatch(setIsLoadingItems(true));
    let endResults1 = [];
    if (productItems.length) {
      endResults1 = productItems.filter((item) => {
        return item[name] >= value[0] && item[name] <= value[1];
      });
    }
    dispatch(setItems(endResults1));
    dispatch(setIsLoadingItems(false));
  };
  const handleChoicesChange = (value, name) => {
    console.log(value.target.value, name);
    dispatch(setIsLoadingItems(true));
    let endResults1 = [];
    if (productItems.length) {
      endResults1 = productItems.filter((item) => {
        return item[name] === value;
      });
    }
    dispatch(setItems(endResults1));
    dispatch(setIsLoadingItems(false));
  };
  const handlePriceSliderChange = async (value) => {
    dispatch(setIsLoadingItems(true));
    try {
      searchItms = await getItemsOnPrice(value);
      if (searchItms.length && productItems.length) {
        endResults = searchItms.filter((item1) =>
          productItems.some(
            (item2) => JSON.stringify(item1) === JSON.stringify(item2)
          )
        );
      } else if (searchItms.length) {
        endResults = searchItms;
      } else if (productItems.length) {
        endResults = productItems;
      }
      dispatch(setItems(endResults));
      dispatch(setIsLoadingItems(false));
    } catch (err) {
      dispatch(setIsLoadingItems(false));

      if (!err?.originalStatus) {
        message.error("Could not connect to server");
      } else if (err.originalStatus === 404) {
        dispatch(setItems([]));
      } else if (err.originalStatus === 401) {
        message.error("Unauthorized");
      } else {
        message.error("Login Failed");
      }
    }
  };

  return (
    <div>
      <Form
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 7,
        }}
        layout="horizontal"
        initialValues={{
          size: 15,
        }}
        size={15}
        style={{
          /*         maxWidth: 800,
           */ padding: "1rem",
          paddingRight: "0rem",
          minWidth: "25vw",
        }}
      >
        <Form.Item label="Price Range">
          <Slider
            range
            min={10000}
            max={800000}
            defaultValue={[0, 800000]}
            onChange={handlePriceSliderChange}
          />
        </Form.Item>
        <Form.Item label="Select Brand">
          <Radio.Group
            options={brands}
            optionType="button"
            buttonStyle="solid"
            mode="multiple"
            onChange={(value) => handleChoicesChange(value, "brand")}
          />{" "}
        </Form.Item>

        <Form.Item label="Select Processor">
          <Radio.Group
            options={processors}
            optionType="button"
            buttonStyle="solid"
            mode="multiple"
            onChange={(value) => handleChoicesChange(value, "processor")}
          />
        </Form.Item>
        <Form.Item label="RAM">
          <Slider
            max={64}
            min={1}
            range
            defaultValue={[1, 64]}
            onChange={(value) => handleSliderChange(value, "ram")}
          />
        </Form.Item>
        <Form.Item label="Screen size ">
          <Slider
            max={50}
            min={10}
            range
            defaultValue={[0, 50]}
            onChange={(value) => handleSliderChange(value, "screenSize")}
          />
        </Form.Item>

        <Form.Item label="HDD Space">
          <Slider
            range
            max={5000}
            min={1}
            defaultValue={[1, 5000]}
            onChange={(value) => handleSliderChange(value, "ssd")}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchControls;
