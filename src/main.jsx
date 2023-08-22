import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Snack from "./pages/Admin/products/Snack.jsx";
import Drink from "./pages/Admin/products/Drink.jsx";
import Ice from "./pages/Admin/products/Ice.jsx";
import History from "./pages/Admin/History.jsx";

var isAuthentication = false

const getSession = localStorage.getItem('isLogin')
if(getSession){
  isAuthentication = true
}


const requireAuthentication = (element) => {
  return isAuthentication ? element : <Navigate to={'/login'} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: isAuthentication ? <Navigate to={'/dashboard'} /> : <Login />,
  },
  {
    path: "/dashboard",
    element: requireAuthentication(<Dashboard />),
  },
  {
    path: "/products/snack",
    element: requireAuthentication(<Snack />),
  },
  {
    path: "/products/drink",
    element: requireAuthentication(<Drink />),
  },
  {
    path: "/products/icecream",
    element: requireAuthentication(<Ice />),
  },
  {
    path: "/history",
    element: requireAuthentication(<History />),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
