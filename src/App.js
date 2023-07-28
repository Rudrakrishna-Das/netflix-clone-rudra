import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Pages/HomePage";

import "./App.css";
import RootPage from "./Pages/RootPage";
import ProfilePage from "./Pages/Profilepage";
import MovieDetailsPage from "./Pages/MovieDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "/movies&tv-shows", element: <HomePage /> },
      {
        path: "movies&tv-shows/:type/:id/:name",
        element: <MovieDetailsPage />,
      },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
