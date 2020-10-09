import React from "react";
import Header from "./components/shared/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";
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
        </Switch>
      </Router>
    </>
  );
};

export default App;
