import React from "react";
import Header from "./components/shared/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/product/:id" exact component={ProductPage} />
          <Route path="/cart/:id?" exact component={CartPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
