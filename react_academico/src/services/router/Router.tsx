import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import AlterarCidade from "../../views/cidade/Alterar";
import ConsultarCidade from "../../views/cidade/Consultar";
import CriarCidade from "../../views/cidade/Criar";
import ExcluirCidade from "../../views/cidade/Excluir";
import ListarCidade from "../../views/cidade/Listar";
import { ROTA } from "./url";

//localhost:3000/sistema/cidade/listar

export const routes: RouteObject[] = [
  {
    path: "/sistema",
    element: <Layout />, // componente (pai)
    children: [
      {
        path: "/sistema/dashboard", //url
        element: <Dashboard />, //componente a ser carregado (filho)
      },
      {
        path: ROTA.CIDADE.LISTAR,
        element: <ListarCidade />,
      },
      {
        path: ROTA.CIDADE.CRIAR,
        element: <CriarCidade />,
      },
      {
        path: `${ROTA.CIDADE.ATUALIZAR}/:idCidade`,
        element: <AlterarCidade />,
      },
      {
        path: `${ROTA.CIDADE.EXCLUIR}/:idCidade`,
        element: <ExcluirCidade />,
      },
      {
        path: `${ROTA.CIDADE.POR_ID}/:idCidade`,
        element: <ConsultarCidade />,
      },
    ],
  },
];
