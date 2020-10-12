import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  console.log(location);
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Sign In</h1>
            {error}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                {" "}
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            New Customer? <Link>Register</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
