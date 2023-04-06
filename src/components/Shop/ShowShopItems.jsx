import { Tag, Card, Row, Col, Spin, Empty } from "antd";
import { LoadingOutlined, FrownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

const ShowShopItems = () => {
  //let productItems = useSelector((state) => state.items.items);
  let isLoading = useSelector((state) => state.items.isLoadingItms);

  console.log(isLoading);

  const productItems = [
    {
      itemID: 1,
      title: "Product 1",
      unitPrice: "Category 1",
      imageUrl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"],
    },
    {
      itemID: 2,
      name: "Product 2",
      unitPrice: "Category 2",
      imageUrl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"],
    },
    {
      itemID: 3,
      title: "Product 3",
      unitPrice: "Category 3",
      imageUrl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"],
    },
    {
      itemID: 4,
      title: "Product 3",
      unitPrice: "Category 3",
      imageUrl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"],
    },
    {
      itemID: 401,
      title: "Product 3",
      unitPrice: "Category 3",
      imageUrl: ["https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"],
    },
  ];
  console.log(productItems[0]);
  return (
    <div
      style={{
        padding: "16px",
        maxWidth: "60vw",
        marginRight: "0rem",
        paddingRight: "0.5rem",
        position: "relative",
      }}
    >
      {isLoading ? (
        <div style={{ paddingTop: "40%", margin: "50%" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
        </div>
      ) : productItems.length < 1 ? (
        <Empty
          style={{ paddingTop: "40%", marginLeft: "40%" }}
          description={<h1>No items found</h1>}
          image={<FrownOutlined style={{ fontSize: 96 }} />}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {productItems.map((product) => (
            <Col xs={24} sm={12} md={8} lg={8} key={product.itemID}>
              <Link to={`/product/${product.itemID}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src={
                        product.imageUrl.length
                          ? product.imageUrl[0]
                          : "https://ecommerce-app-2ld.pages.dev/static/media/banner-img.f86eb6ad0f0815dcf656.png"
                      }
                    />
                  }
                >
                  <div style={{ marginBottom: "16px" }}>
                    <Tag color="green">{product.unitPrice + " LKR"}</Tag>
                  </div>
                  <Card.Meta title={product.title} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
export default ShowShopItems;
