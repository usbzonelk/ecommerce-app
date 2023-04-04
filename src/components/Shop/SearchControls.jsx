import { Form, Radio, Slider, Switch } from "antd";
import { useState, useEffect } from "react";
import { useGetItemsOnPriceMutation } from "../../redux/features/products/itemApiSlice";
import { message } from "antd";
import {
  setIsLoadingItems,
  setItems,
} from "../../redux/features/products/productsSlice";

import { useSelector, useDispatch } from "react-redux";

function SearchControls() {
  const dispatch = useDispatch();
  const [getItemsOnPrice, { isLoading }] = useGetItemsOnPriceMutation();
  let productItems = useSelector((state) => state.items.items);
  let searchItms = [];

  const brands = [
    { label: "Dell", value: "dell" },
    { label: "Acer", value: "acer" },
    { label: "Lenovo", value: "lenovo" },
  ];
  const handleSliderChange = (value) => {
    console.log(value);
  };
  const handlePriceSliderChange = async (value) => {
    dispatch(setIsLoadingItems(true));
    try {
      searchItms = await getItemsOnPrice(value);
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
          />{" "}
        </Form.Item>

        <Form.Item label="Select Processor">
          <Radio.Group
            options={brands}
            optionType="button"
            buttonStyle="solid"
            mode="multiple"
          />
        </Form.Item>
        <Form.Item label="RAM">
          <Slider
            max={64}
            min={1}
            range
            defaultValue={[1, 64]}
            onChange={handleSliderChange}
          />
        </Form.Item>
        <Form.Item label="Screen size ">
          <Slider
            max={50}
            min={10}
            range
            defaultValue={[0, 50]}
            onChange={handleSliderChange}
          />
        </Form.Item>

        <Form.Item label="HDD Space">
          <Slider
            range
            max={5000}
            min={1}
            defaultValue={[1, 5000]}
            onChange={handleSliderChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default SearchControls;
