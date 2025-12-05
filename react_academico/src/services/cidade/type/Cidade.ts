export interface Cidade {
  idCidade?: string;
  codCidade?: string;
  nomeCidade?: string;
}

export interface ErrosCidade {
  idCidade?: boolean;
  codCidade?: boolean;
  nomeCidade?: boolean;

  idCidadeMensagem?: string[];
  codCidadeMensagem?: string[];
  nomeCidadeMensagem?: string[];
}
