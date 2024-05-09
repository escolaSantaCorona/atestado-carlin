import { ChangeEvent } from "react";

export interface FormDataAlunos {
    id: string;
    nome_do_aluno: string;
    data_de_nascimento: string;
    certidao_cpf_rg: string;
    folha: string;
    livro: string;
    mae: string;
    pai: string;
    turma_em_2024: string;
    ano_do_ensino_fundamental: string;
    turno: string;
    movimentacao: string;
    data_matricula:string;
    data_movimento: string;
    transferencia_escola_destino:string;
    naturalidade: string;
    telefone:string;
    Raça: string;
    observações: string;
   
  }

export interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface StudentTableProps {
  items: FormDataAlunos[];
}

export type AtestadoEscolaridadeInputsProps = {
  id: string;
  nome_do_aluno: string;
  ano_do_ensino_fundamental: string;
  turno: string;
  turma_em_2024?:string
};


export interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export function formatDate(isoString: string | null | undefined): string {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "";
  }
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const normalizeString = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const searchFilter = (item: FormDataAlunos, searchTerm: string) =>
  Object.values(item).some((value) =>
    typeof value === 'string' && normalizeString(value).includes(normalizeString(searchTerm))
  );



