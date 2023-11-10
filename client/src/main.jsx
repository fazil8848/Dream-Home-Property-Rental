import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import "./index.css";
import MainRouter from "./Routes/MainRoute.jsx";

const root = document.getElementById("root");
const reactRoot = createRoot(root);

reactRoot.render(
  <Provider store={store}>
    <Router>
      <MainRouter />
    </Router>
  </Provider>
);
