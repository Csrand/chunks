import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Cidade } from "../type/Cidade";

export const apiGetCidades = async () => {
  const response = await http.get(ROTA.CIDADE.LISTAR);
  return response;
};

export const apiGetCidade = async (idCidade: string) => {
  const response = await http.get(`${ROTA.CIDADE.POR_ID}/${idCidade}`);
  return response;
};

export const apiPostCidade = async (cidade: Cidade) => {
  const response = await http.post(ROTA.CIDADE.CRIAR, cidade);
};

export const apiPutCidade = async (idCidade: string, cidade: Cidade) => {
  const response = await http.put(
    `${ROTA.CIDADE.ATUALIZAR}/${idCidade}`,
    cidade,
  );
};

export const apiDeleteCidade = async (idCidade: string) => {
  const response = await http.delete(`${ROTA.CIDADE.EXCLUIR}/${idCidade}`);
};
