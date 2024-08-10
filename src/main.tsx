import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Fechamentos from "./pages/Fechamento/Fechamento.tsx";
import Home from "./pages/home/home.tsx";
import ServicosEmAndamentoPage from "./pages/asd/SAPage2.tsx";
import ListaUsuario from "./pages/usuarios/usuario.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/servicosemandamento",
        element: <ServicosEmAndamentoPage />,
      },
      {
        path: "/fechamento",
        element: <Fechamentos />,
      },
      {
        path: "/usuario",
        element: <ListaUsuario />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
