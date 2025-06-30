import * as React from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Scaffold from "./components/Scaffold";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Components from "./pages/components/Components";
import Compatibility from "./pages/compatibility/Compatibility";
import { CotizacionProvider } from "./hooks/useCotizacionCookie";
import Details from "./pages/details/Details";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

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
  {
    path: "/compatibility",
    element: <Compatibility />,
  },
  {
    path: "/components",
    element: <Components />
  },
    {
    path: "/components/component",
    element: <Details />
  }
]);

root.render(
  <React.StrictMode>
    <CotizacionProvider>
      <Scaffold>
        <RouterProvider router={router} />
      </Scaffold>
    </CotizacionProvider>
  </React.StrictMode>
);
