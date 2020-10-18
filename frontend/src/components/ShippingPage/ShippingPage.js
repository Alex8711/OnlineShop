import React from "react";
import { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ShippingPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Postal Code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                {" "}
                Continue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShippingPage;
