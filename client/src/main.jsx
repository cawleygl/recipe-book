//import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import ManageRecipes from "./pages/ManageRecipes/ManageRecipes";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import ManageIngredients from "./pages/ManageIngredients/ManageIngredients";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
			{
        path: "/ingredients",
        element: <ManageIngredients />,
      },
      {
        path: "/recipes",
        element: <ManageRecipes />,
      },
      {
        path: "/recipes/new",
        element: <CreateRecipe />,
      },
			{
        path: "/recipes/:id",
        element: <RecipeDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);