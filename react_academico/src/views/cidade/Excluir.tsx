import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  apiDeleteCidade,
  apiGetCidade,
} from "../../services/cidade/api/api.cidade";
import type { Cidade } from "../../services/cidade/type/Cidade";

export default function ExcluirCidade() {
  const { idCidade } = useParams<{ idCidade: string }>();
  const [model, setModel] = useState<Cidade | null>(null);

  useEffect(() => {
    async function getCidade() {
      try {
        if (idCidade) {
          const response = await apiGetCidade(idCidade);
          if (response.data.dados) {
            setModel(response.data.dados);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    getCidade();
  }, [idCidade]);

  const onSubmitForm = async (e: any) => {
    // não deixa executar o processo normal
    e.preventDefault();

    if (!idCidade || !model) {
      return;
    }

    try {
      const response = apiDeleteCidade(idCidade);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <h2>Excluir Cidade</h2>
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div className="mb-2 mt-4">
            <label htmlFor="codCidade" className="app-label">
              Código:
            </label>
            <input
              id="codCidade"
              name="codCidade"
              defaultValue={model?.codCidade}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
            />
          </div>
          <div className="mb-2 mt-4">
            <label htmlFor="nomeCidade" className="app-label">
              Nome:
            </label>
            <input
              id="nomeCidade"
              name="nomeCidade"
              defaultValue={model?.nomeCidade}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
            />
          </div>
          <div className="btn-content mt-4">
            <button
              id="submit"
              type="submit"
              className="btn btn-success"
              title="Cadastrar uma nova cidade"
            >
              <span className="btn-icon">
                <i>
                  <FaSave />
                </i>
              </span>
              Salvar
            </button>
            <button
              id="cancel"
              type="button"
              className="btn btn-cancel"
              title="Cancelar o Cadastro da cidade"
            >
              <span className="btn-icon">
                <i>
                  <MdCancel />
                </i>
              </span>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
