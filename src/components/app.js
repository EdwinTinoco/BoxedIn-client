import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faBox, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";


import NavigationContainer from "./navigation-footer/navigation-container"
import FooterContainer from "./navigation-footer/footer-container"
import Home from "./pages/home";
import Login from "./pages/login";
import CartDetail from "./pages/cart-detail";
import About from "./pages/about";
import Products from "./pages/products";
import ProductDetail from "./products/product-detail";

library.add(faTrash, faSignOutAlt, faBox, faUser, faShoppingCart);

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <div>
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <Route path="/products" component={Products} />

              <Route
                exact path="/product/:slug"
                component={ProductDetail}
              />

              <Route
                exact path="/cart-items/user/:slug"
                component={CartDetail}
              />
            </Switch>
            <FooterContainer />
          </div>
        </Router>
      </div>
    );
  }
}
