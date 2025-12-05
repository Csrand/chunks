import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiGetCidades } from "../../services/cidade/api/api.cidade";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import type { Cidade } from "../../services/cidade/type/Cidade";
import { ROTA } from "../../services/router/url";

const buscarTodasCidades = async (): Promise<Cidade[] | null> => {
  try {
    const response = await apiGetCidades();
    return response.data.dados;
  } catch (error: any) {
    console.log(error);
  }
  return null;
};

export default function ListarCidade() {
  // useState = hook - gancho - função
  // reagir as alterações na variável
  // renderiza -
  const [models, setModels] = useState<Cidade[] | null>(null);

  //hook - função - reagir, quando carregar a página
  //pela primeira vez, quando o array for vázio.
  useEffect(() => {
    async function getCidades() {
      const cidades = await buscarTodasCidades();
      if (cidades) {
        setModels(cidades);
      }
    }
    getCidades();
  }, []);

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{CIDADE.TITULO.LISTA}</h2>
          <Link to="/sistema/cidade/criar" className="btn btn-add">
            <span className="btn-icon">
              <i>
                <FaPlus />
              </i>
            </span>
            Novo
          </Link>
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th>{CIDADE.LABEL.CODIGO}</th>
              <th>{CIDADE.LABEL.NOME}</th>
              <th className="center actions" colSpan={3}>
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {models?.map((model) => (
              <tr key={model.idCidade}>
                <td>{model.codCidade}</td>
                <td>{model.nomeCidade}</td>
                <td className="center actions">
                  <Link
                    to={`${ROTA.CIDADE.ATUALIZAR}/${model.idCidade}`}
                    className="btn btn-edit"
                  >
                    <span className="btn-icon">
                      <i>
                        <BsPencilSquare />
                      </i>
                    </span>
                    Atualizar
                  </Link>
                  <Link
                    to={`${ROTA.CIDADE.EXCLUIR}/${model.idCidade}`}
                    className="btn btn-delete"
                  >
                    <span className="btn-icon">
                      <i>
                        <FaRegTrashAlt />
                      </i>
                    </span>
                    Excluir
                  </Link>
                  <Link
                    to={`${ROTA.CIDADE.POR_ID}/${model.idCidade}`}
                    className="btn btn-info"
                  >
                    <span className="btn-icon">
                      <i>
                        <FaMagnifyingGlass />
                      </i>
                    </span>
                    Consulta
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
