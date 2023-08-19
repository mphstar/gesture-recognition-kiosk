import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Snack from "./pages/Admin/products/Snack.jsx";
import Drink from "./pages/Admin/products/Drink.jsx";
import Ice from "./pages/Admin/products/Ice.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/products/snack",
    element: <Snack />
  },{
    path: "/products/drink",
    element: <Drink />
  },{
    path: "/products/icecream",
    element: <Ice />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
