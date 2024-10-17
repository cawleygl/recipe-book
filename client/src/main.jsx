//import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import LandingPage from "./components/LandingPage";
import RecipeDetails from "./components/RecipeDetails";
// import RecipeList from "./components/RecipeList";
// import Recipe from "./components/Recipe";
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
  },
  // {
  //   path: "/edit/:id",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/edit/:id",
  //       element: <Recipe />,
  //     },
  //   ],
  // },
  // {
  //   path: "/create",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "/create",
  //       element: <Recipe />,
  //     },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);