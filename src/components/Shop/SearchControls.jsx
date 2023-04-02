import { Form, Radio, Slider, Switch } from "antd";
import { useState } from "react";

const brands = [
  { label: "Dell", value: "dell" },
  { label: "Acer", value: "acer" },
  { label: "Lenovo", value: "lenovo" },
];
const handleSliderChange = (value) => {
  console.log(value);
};

const SearchControls = () => (
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
        size: 10,
      }}
      size={10}
      style={{
        maxWidth: 800,
      }}
    >
      <Form.Item label="Price Range">
        <Slider range defaultValue={[20, 50]} onChange={handleSliderChange} />
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
      <Form.Item label="Ram Range">
        <Slider range defaultValue={[20, 50]} onChange={handleSliderChange} />
      </Form.Item>
      <Form.Item label="Screen size Range">
        <Slider range defaultValue={[20, 50]} onChange={handleSliderChange} />
      </Form.Item>
      <Form.Item label="Memory Range">
        <Slider range defaultValue={[20, 50]} onChange={handleSliderChange} />
      </Form.Item>
      <Form.Item label="HDD Space">
        <Slider range defaultValue={[20, 50]} onChange={handleSliderChange} />
      </Form.Item>
    </Form>
  </div>
);

export default SearchControls;
