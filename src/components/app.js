import React, { useState, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faSignOutAlt, faBox, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie'


import NavigationContainer from "./navigation-footer/navigation-container"
import FooterContainer from "./navigation-footer/footer-container"
import Home from "./pages/home";
import Login from "./pages/login";
import About from "./pages/about";
import Products from "./pages/products";
import Dashboard from "./dashboard/dashboard"
import ProductDetail from "./products/product-detail";
import CartDetail from "./pages/cart-detail";

import AuthApi from "./authApi"

library.add(faTrash, faSignOutAlt, faBox, faUser, faShoppingCart);


function App() {
  const [user, setUser] = useState({})

  const readCookie = () => {
    console.log("user object", user)
    const userName = Cookies.get(user.users_first_name)
    if (userName) {
      setUser({
        users_id: user.users_id,
        users_first_name: user.users_first_name,
        users_role: user.users_role
      })
    }
  }

  // useEffect(() => {
  //   readCookie()
  // }, [])  


  return (
    <div className='app'>
      <AuthApi.Provider value={{ user, setUser }}>
        <Router>
          <div>
            <NavigationContainer />
            <Routes />
            <FooterContainer />
          </div>
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

const Routes = () => {
  const Auth = useContext(AuthApi)
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <ProtectedLogin path="/login" user={Auth.user} component={Login} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <ProtectedDashboard path="/dashboard" user={Auth.user} component={Dashboard} />

      <Route
        exact path="/product/:slug"
        component={ProductDetail}
      />

      <Route
        exact path="/cart-items/user/:slug"
        component={CartDetail}
      />
    </Switch>
  )
}

const ProtectedDashboard = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => Object.entries(user).length > 0 ?
        (
          <Component />
        ) :
        (
          <Redirect to="/login" />
        )
      }
    />
  )
}

const ProtectedLogin = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => Object.entries(user).length === 0 ?
        (
          <Component />
        ) :
        (
          <Redirect to="/dashboard" />
        )
      }
    />
  )
}


export default App;
