// Interface Genérica -
export interface Result<T> {
  status: number;
  timestamp: string;
  mensagem?: string | null;
  erro?: string | null | unknown;
  dados?: T | null;
  path: string | null;
}

// Classe Genérica - consegue trabalhar com
// qualquer tipo de objeto - Cidade, Usuário, Professor, Disciplina
// Aluno --- etc.

export class Mensagem<T> {
  status: number = 0;
  mensagem: string | null = null;
  erro: string | unknown | null = null;
  dados: T | null = null;
  path: string | null = null;

  constructor(
    status: number,
    mensagem: string | null = null,
    dados: T | null = null,
    path: string | null = null,
    erro: string | unknown | null = null,
  ) {
    this.status = status;
    this.mensagem = mensagem;
    this.dados = dados;
    this.path = path;
    this.erro = erro;
  }

  toJSON(): Result<T> {
    const result: Result<T> = {
      status: this.status,
      timestamp: new Date().toISOString().split('T')[0],
      path: this.path,
    };

    if (this.mensagem !== null && this.mensagem !== undefined) {
      result.mensagem = this.mensagem;
    }

    if (this.dados !== null && this.dados !== undefined) {
      result.dados = this.dados;
    }

    if (this.erro !== null && this.erro !== undefined) {
      result.erro = this.erro;
    }

    return result;
  }
}
