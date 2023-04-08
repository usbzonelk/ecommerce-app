import { Table, Typography, Form, InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetItemInfoMutation } from "../redux/features/products/itemApiSlice";
import NotFound from "./NotFound";
import ProductLoadingScreen from "./ProductLoadingScreen";

const { Title, Paragraph } = Typography;
const columns = [
  {
    title: "Component",
    dataIndex: "component",
    key: "component",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

const data = [
  {
    key: "1",
    component: "Processor",
    value: "Intel Core i7",
  },
  {
    key: "2",
    component: "Hard Disk",
    value: "512 GB SSD",
  },
  {
    key: "3",
    component: "RAM",
    value: "16 GB",
  },
  {
    key: "4",
    component: "Display",
    value: '14" FHD IPS Touchscreen',
  },
  {
    key: "5",
    component: "Graphic Card",
    value: "NVIDIA GeForce GTX 1650",
  },
  {
    key: "6",
    component: "Battery",
    value: "Up to 12 hours",
  },
  {
    key: "7",
    component: "OS",
    value: "Windows 10 Pro",
  },
];

const Product = () => {
  const { id } = useParams();
  const [getItemInfo, { data: item, isLoading, error }] =
    useGetItemInfoMutation();

  useEffect(() => {
    getItemInfo(id);
  }, [id]);

  return (
    <div>
      {error?.response?.status === 404 && (
        <>
          <NotFound />
        </>
      )}
      {isLoading && (
        <>
          <ProductLoadingScreen />
        </>
      )}
      {!item ? (
        isLoading ? (
          ""
        ) : (
          <>
            <NotFound />
          </>
        )
      ) : (
        <div style={{ padding: "2rem" }}>
          <Title>{item.data.title}</Title>
          <Paragraph>{item.data.description}</Paragraph>
          <Table columns={columns} dataSource={data} pagination={false} />

          <div
            style={{
              margin: "1rem",
              marginTop: "3rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Title style={{ marginRight: "2rem" }}>
              LKR {item.data.unitPrice}
              <sup style={{ color: "blue", fontSize: "2rem" }}>
                {item.data.disPrecentage}% OFF
              </sup>
            </Title>

            <Form
              onFinish={onFinish}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Item
                label="Quantity"
                name="quantity"
                initialValue={1}
                style={{ paddingRight: "4rem" }}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>
              <Form.Item>
                <Button type="dashed" htmlType="submit">
                  Add to Cart
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
