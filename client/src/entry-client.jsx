import React from "react";
import ReactDOM from "react-dom/client";
import "../public/main.scss";
import { RouterProvider, BrowserRouter } from "react-router-dom";
import router from "./router";
import Header from "./components/Header";
import Entry from "./entry";

ReactDOM.createRoot(document.getElementById("root")).render(<Entry />);
