import { USER, DISCIPLINE, MODULE } from './constants.sistema';

export const SERVIDOR = 'https://localhost:8000';
export const CLIENTE = 'https://localhost:3000';

const ROTA_SISTEMA = 'rest/sistema';

const LIST = 'list';
const CREATE = 'create';
const BY_ID = 'find';
const UPDATE = 'update';
const DELETE = 'delete';
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
  MODULE: gerarRotasSistema(MODULE),
  USER: gerarRotasSistema(USER),
};

//criar rotas de forma dinâmica para os endpoints
//recurso, URLs, URI....
// concatenar = '/rest/sistema/cidade/buscar/:id'
