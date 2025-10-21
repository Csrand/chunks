import { DISCIPLINE} from './constants.sistema';

export const SERVIDOR = 'http://localhost:8000';
export const CLINTE = 'http://localhost:3000';

const ROTA_SISTEMA = 'rest/sistema';

const LIST = 'listar';
const CREATE = 'criar';
const BY_ID = 'buscar';
const UPDATE = 'alterar';
const DELETE = 'excluir';

function gerarRotasSistema(entity: string) {
  const base = `/${ROTA_SISTEMA}/${entity}`;
  return {
    BASE: base,
    LIST: `/${LIST}`,
    CREATE: `/${CREATE}`,
    BY_ID: `/${BY_ID}/:id`,
    UPDATE: `/${UPDATE}/:id`,
    DELETE: `/${DELETE}/:id`,
  };
}

export const ROTA = {
  DISCIPLINE: gerarRotasSistema(DISCIPLINE),
};

//criar rotas de forma dinâmica para os endpoints
//recurso, URLs, URI....
// concatenar = '/rest/sistema/discipline/buscar/:id'
