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
import AllCaracterPage from "./Pages/AllCharactersPage";
import Errorpage from "./Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <Errorpage />,
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
        path: "/search-result-info/:type/:id/:name/all-characters",
        element: <AllCaracterPage />,
      },
      {
        path: "people/:id/:name",
        element: <CharacterDetailsPage />,
      },
      { path: "profile", element: <ProfilePage /> },
      {
        path: "/movies&tv-shows/:type/:id/:name/all-characters",
        element: <AllCaracterPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
