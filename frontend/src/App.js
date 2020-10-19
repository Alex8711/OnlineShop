import React from "react";
import Header from "./components/shared/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ShippingPage from "./components/ShippingPage/ShippingPage";
import UserListPage from './components/UserListPage/UserListPage';
import AdminProductListPage from './components/AdminProductListPage/AdminProductListPage';
import ProductCreatePage from './components/ProductCreatePage/ProductCreatePage';
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
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/shipping" exact component={ShippingPage} />
          <Route path="/admin/userlist" exact component={UserListPage} />
          <Route path="/admin/productlist" exact component={AdminProductListPage} />
          <Route path="/admin/product/:id/edit" exact component={ProductCreatePage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
