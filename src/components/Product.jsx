import { Table, Typography, Form, InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetItemInfoMutation } from "../redux/features/products/itemApiSlice";
import NotFound from "./NotFound";
import ProductLoadingScreen from "./ProductLoadingScreen";
import { useAddItemToCartMutation } from "../redux/features/cart/cartApiSlice";
import Cookies from "js-cookie";

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

const Product = () => {
  const { id } = useParams();
  const [addItemToCart, { data, isAddingCart, errorAddingCart }] =
    useAddItemToCartMutation();
  const [getItemInfo, { data: item, isLoading, error }] =
    useGetItemInfoMutation();
  const [dataPg, setDataPg] = useState([
    {
      key: "0",
      component: "Brand",
      value: "Dell",
    },
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
  ]);

  const onFinish = (values) => {
    const uID = Cookies.get("user");
    if (uID === undefined || !uID) {
      alert("Please login to add items to cart");
      return;
    }
    const payload = {
      discountPercentage: values.discountPercentage,
      itemId: id,
      quantity: values.quantity,
      unitPrice: values.unitPrice,
      userId: uID,
    };
    addItemToCart(payload);
  };

  useEffect(() => {
    getItemInfo(id);
  }, [id]);

  useEffect(() => {
    if (item) {
      if ("data" in item) {
        setDataPg([
          {
            key: "0",
            component: "Brand",
            value: item.data.brand,
          },
          {
            key: "1",
            component: "Processor",
            value: item.data.processor,
          },
          {
            key: "2",
            component: "Hard Disk",
            value: item.data.ssd,
          },
          {
            key: "3",
            component: "RAM",
            value: item.data.ram,
          },
          {
            key: "4",
            component: "Display",
            value: item.data.screenSize,
          },
        ]);
      }
    }
  }, [item]);

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
          <Table columns={columns} dataSource={dataPg} pagination={false} />

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
              <Form.Item
                name="discountPercentage"
                label=""
                style={{ display: "none" }}
                initialValue={item.data.disPrecentage}
              >
                <Input type="hidden" />
              </Form.Item>
              <Form.Item
                name="unitPrice"
                label=""
                style={{ display: "none" }}
                initialValue={item.data.unitPrice}
              >
                <Input type="hidden" />
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
