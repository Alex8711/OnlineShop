import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { useEffect } from "react";

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  console.log(location);
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
    }
  });
  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>

            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Image fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/`}>Name</Link>
                  </Col>
                  <Col md={2}>$ Price</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      //   value={item.qty}
                      //   onChange={(e) =>
                      //     dispatch(
                      //       addToCart(item.product, Number(e.target.value))
                      //     )
                      //   }
                    >
                      {/* {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))} */}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      //   onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Subtotal items</h2>$
                  {/* {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)} */}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    // disabled={cartItems.length === 0}
                    // onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
