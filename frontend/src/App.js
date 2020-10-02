import React from "react";
import Header from "./components/shared/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <HomePage />
        </Switch>
      </Router>
    </>
  );
};

export default App;
