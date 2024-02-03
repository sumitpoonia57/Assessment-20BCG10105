import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import storeConfig from "./store/configureStore";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = storeConfig();
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster toastOptions={{ className: "react-hot-toast" }} />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
