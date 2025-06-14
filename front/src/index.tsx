import * as React from "react";
import { createRoot } from 'react-dom/client'
import './global.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Scaffold from "./components/Scaffold";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

root.render(
  <React.StrictMode>
    <Scaffold>
      <RouterProvider router={router} />
    </Scaffold>
  </React.StrictMode>
)
