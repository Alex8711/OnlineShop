import React from "react";
import { useEffect } from "react";
import { Container, Col, Row, Card, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";

const ProductPage = ({ match }) => {
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <Container>
          <LinkContainer to="/">
            <Button type="button" className="my-3 btn-success">
              GO BACK
            </Button>
          </LinkContainer>
          <Row>
            <Col md={6}>
              <Card className="my-3">
                <Card.Img src={product.image} variant="top" />
              </Card>
            </Col>
            <Col md={3}>
              <ListGroup className="my-3" variant="flush">
                <ListGroup.Item>
                  {" "}
                  <h3>{product.name}</h3>{" "}
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className="my-3">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {" "}
                        <strong>Price:</strong>{" "}
                      </Col>
                      <Col>
                        {" "}
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {" "}
                        <strong>Status:</strong>{" "}
                      </Col>
                      <Col>
                        {" "}
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className="btn-block" type="button">
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductPage;
