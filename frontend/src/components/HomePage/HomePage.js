import React from "react";
import products from "../../products";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../Product/Product";

const HomePage = () => {
  return (
    <>
      <Container>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
