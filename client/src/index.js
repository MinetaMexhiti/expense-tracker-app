import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);  // createRoot instead of ReactDOM.render
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
