import { Table, Typography, Form, InputNumber, Button } from "antd";
import { useParams } from "react-router-dom";
const { Title, Paragraph } = Typography;
import { useGetItemMutation } from "../redux/features/products/itemApiSlice";

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
  const { data: item, isLoading, isError, error } = useGetItemMutation(id);

  const onFinish = (values) => {
    console.log("Form submitted with values:", values);
    // add to cart logic here
  };
  return (
    <div>
      {error?.response?.status === 404 && <h1>404</h1>}
      {isLoading && <h1>Loading...</h1>}
      {!item ? (
        "404"
      ) : (
        <div style={{ padding: "2rem" }}>
          <Title>{item.data.title}</Title>
          <Paragraph>
            {" "}
            Product is the best learning companion for students of all ages,
            with a tough, innovative design that’s made to last. As well as a
            versatile touchscreen display and stylus1, there’s also a 360° hinge
            and a world-facing camera. It’s packed with clever protective
            features, including an all-round rubber bumper, spill-resistant
            keyboard and ultratough hinge.
          </Paragraph>
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
