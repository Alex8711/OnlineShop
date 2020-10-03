import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3">
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
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
