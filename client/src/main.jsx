//import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import LandingPage from "./components/LandingPage";
import RecipeDetails from "./components/RecipeDetails";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/recipes/:id",
    element: <App />,
    children: [
      {
        path: "/recipes/:id",
        element: <RecipeDetails />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);