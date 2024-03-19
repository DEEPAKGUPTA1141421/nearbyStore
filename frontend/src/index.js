import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { SocketProvider } from "./context/SocketProvider";

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
