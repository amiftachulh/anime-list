import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AnimeProvider from "./contexts/AnimeContext";
import Anime from "./pages/Anime";
import Root from "./pages/Root";
import { getAnimeById, getCharactersByAnimeId } from "./utils/anime";
import Login from "./pages/Login";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import AnimeError from "./components/AnimeError";

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
          {
            path: "/anime/:id",
            element: <Anime />,
            loader: async ({ params }) => {
              return {
                anime: await getAnimeById(params.id),
                characters: await getCharactersByAnimeId(params.id),
              };
            },
            errorElement: <AnimeError />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/search",
            element: <Search />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <AnimeProvider>
        <RouterProvider router={router} />
      </AnimeProvider>
    </AuthProvider>
  );
}

export default App;
