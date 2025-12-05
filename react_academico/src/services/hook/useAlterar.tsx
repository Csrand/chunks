import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Cidade } from "../cidade/type/Cidade";
import { apiGetCidade, apiPutCidade } from "../cidade/api/api.cidade";

export const useAlterar = () => {
  const { idCidade } = useParams<{ idCidade: string }>();
  const [model, setModel] = useState<Cidade | null>(null);

  useEffect(() => {
    async function getCidade() {
      try {
        if (idCidade) {
          const response = await apiGetCidade(idCidade);
          console.log(response.data.dados);
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

  const handleChangeField = (name: keyof Cidade, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    console.log(model);
  };

  const onSubmitForm = async (e: any) => {
    // não deixa executar o processo normal
    e.preventDefault();

    if (!idCidade || !model) {
      return;
    }

    try {
      const response = apiPutCidade(idCidade, model);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = () => {
    return "form-control app-label mt-2";
  };


  return {
    handleChangeField, 
    onSubmitForm,
    getInputClass,
    model,
  }
}