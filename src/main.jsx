import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Details from "./pages/details";
import NotFound from "./pages/not-found";
import EditarHotel from "./components/edit/EditarHotel";
import CadastroHotel from "./components/register/CadastroHotel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detalhes",
    element: <Details />,
  },
  {
    path: "/editar/:id",
    element: <EditarHotel />,
  },
  {
    path: "/cadastro-hotel",
    element: <CadastroHotel />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
