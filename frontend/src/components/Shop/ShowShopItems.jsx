import { Tag, Card, Row, Col } from "antd";

const products = [
  {
    id: 1,
    name: "Product 1",
    priceCategory: "Category 1",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 2,
    name: "Product 2",
    priceCategory: "Category 2",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 3,
    name: "Product 3",
    priceCategory: "Category 3",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  // Add more products as needed
];

const ShowShopItems = () => (
  <div style={{ padding: "16px" }}>
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
          <Card hoverable cover={<img alt="example" src={product.imageUrl} />}>
            <div style={{ marginBottom: "16px" }}>
              <Tag color="green">{product.priceCategory}</Tag>
            </div>
            <Card.Meta title={product.name} />
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);
export default ShowShopItems;
