import { DISCIPLINE, MODULES, SUBMODULES, USERS, QUESTIONS, USER_PROGRESS, ANSWERS, BADGES } from "./constants.system";

export const SERVER = 'http://localhost:8000';
export const CLIENT = 'http://localhost:3000';

const API = 'api/v1';

const CREATE = 'create';
const LIST   = 'list';
const DELETE = 'delete';
const UPDATE = 'update';

function buildRoutes(entity: string, idParam: string) {
  const base = `/${API}/${entity}`;
  return {
    BASE: base,
    CREATE: `/${CREATE}`,
    LIST: `/${LIST}`,
    DELETE: `/${DELETE}/:${idParam}`,
    UPDATE: `/${UPDATE}/:${idParam}`,
    FIND_ONE: `/:${idParam}`,
  };
}

export const ROUTE = {
  DISCIPLINE: buildRoutes(DISCIPLINE, 'disciplineId'),
  MODULES: buildRoutes(MODULES, 'moduleId'),
  SUBMODULES: buildRoutes(SUBMODULES, 'submoduleId'),
  USERS: buildRoutes(USERS, 'userId'),
  QUESTIONS: buildRoutes(QUESTIONS, 'questionId'),
  USER_PROGRESS: buildRoutes(USER_PROGRESS, 'progressId'),
  ANSWERS: buildRoutes(ANSWERS, 'answerId'),
  BADGES: buildRoutes(BADGES, 'badgeId'),
};
