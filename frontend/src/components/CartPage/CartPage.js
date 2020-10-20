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
import {getCartDetail,removeFromCart}    from '../../actions/cartActions'
import Message from '../shared/Message/Message';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  console.log(location);
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cartDetail = useSelector(state=>state.cartDetail);
  const removeFromCartState = useSelector(state=>state.removeFromCart);
  const {loading,success,cartItems} = cartDetail
  const {loading:removeLoading,success:removeSuccess,message} = removeFromCartState
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartDetail())
  },[dispatch,removeSuccess]);
  
  const addToCart=(productId,qty)=>{
    console.log('add');
  }
  const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id));
  }
  return (
    <>
      <Container className="mt-3">
      {cartItems.length==0? (<h2>You Shopping Cart Is Empty</h2>) :(<Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
         
            <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.product.image} alt={item.product.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                  </Col>
                  <Col md={2}>${item.product.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
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
        </Row>)}
        
      </Container>
    </>
  );
};

export default CartPage;
