import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../Product/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";

const HomePage = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <Container>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomePage;
