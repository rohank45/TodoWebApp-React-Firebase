import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      <ToastContainer className="foo" style={{ fontWeight: "bold" }} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
