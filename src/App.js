import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Pages/HomePage";

import "./App.css";
import RootPage from "./Pages/RootPage";
import ProfilePage from "./Pages/Profilepage";
import MovieDetailsPage from "./Pages/MovieDetailsPage";
import CharacterDetailsPage from "./Pages/CharacterDetailsPage";
import SearchResultPage from "./Pages/SearchResultPage";
import SearchDetailsPage from "./Pages/SearchDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "/movies&tv-shows", element: <HomePage /> },
      {
        path: "/movies&tv-shows/:type/:id/:name",
        element: <MovieDetailsPage />,
      },
      { path: "/search-result/result/:name", element: <SearchResultPage /> },
      {
        path: "/search-result-info/:type/:id/:name",
        element: <SearchDetailsPage />,
      },
      {
        path: "people/:id/:name",
        element: <CharacterDetailsPage />,
      },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
