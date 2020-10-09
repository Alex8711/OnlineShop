import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useHistory } from "react-router-dom";

const ProductPage = ({ match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const { product, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch]);

  const addToCartHandler = () => {
    console.log("add to cart");
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

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
                  {product.countInStock > 0 ? (
                    <ListGroup.Item>
                      <Row>
                        <Col>QTY</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x, index) => (
                                <option key={index} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) : (
                    ""
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
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
