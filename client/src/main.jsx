//import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CreateRecipe />,
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