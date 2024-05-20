import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Base } from "./components/Base.jsx";
import { Calandar } from "./routes/Calandar.jsx";
import { Dashboard } from "./routes/Dashboard.jsx";
import { Directory } from "./routes/Directory.jsx";
import { Home } from "./routes/Home.jsx";
import { Login } from "./routes/Login.jsx";
import { Signup } from "./routes/Signup.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/calandar", element: <Calandar /> },
      { path: "/directory", element: <Directory /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
