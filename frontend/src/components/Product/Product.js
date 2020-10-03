import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3">
        <LinkContainer to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </LinkContainer>
        <Card.Body>
          <LinkContainer to={`/product/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </LinkContainer>
          <Card.Text>
            {product.rating} from {product.numReviews} reviews
          </Card.Text>
          <Card.Title>$ {product.price}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
