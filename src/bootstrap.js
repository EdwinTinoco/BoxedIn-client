import React, { useState, createContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware()(createStore);

import "./style/main.scss";

// export const UserContext = createContext()

// const Index = () => {
//   const [state, setState] = useState({
//     loggedInUser: {}
//   })

//   const actions = {
//     setLoggedInUser: user => setState({ ...state, loggedInUser: user })
//   }

//   return (
//     <UserContext.Provider value={{ ...state, ...actions }}>
//       <App />
//     </UserContext.Provider>
//   )
// }

function main() {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
