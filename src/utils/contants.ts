import { StyledTableCellProps } from "@/components/StudentTable/TableComponents";
import { styled, tableCellClasses, TableCell, TableRow, Link, Typography, PaginationProps, IconButton, Tooltip } from "@mui/material";
const turmas = [
  "Educação Infantil-Turma de 4 e 5 anos",
  "Educação Infantil-Turma de 5 anos",
  "1º ANO A",
  "1º ANO B",
  "2º ANO A",
  "3º ANO A",
  "3º ANO B",
  "4º ANO A",
  "4º ANO B",
  "5º ANO A",
  "6º ANO A",
  "6º ANO B",
  "7º ANO A",
  "7º ANO B",
  "8º ANO A",
  "8º ANO B",
  "9º ANO A",
  "9º ANO B",
];

const anos_escolares = [
  "Educação Infantil-Turma de 4 e 5 anos",
  "Educação Infantil-Turma de 5 anos",
  "1° ano do 1º ciclo do ensino fundamental",
  "2° ano do 1º ciclo do ensino fundamental",
  "3° ano do 1º ciclo do ensino fundamental",
  "4° ano do 2º ciclo do ensino fundamental",
  "5° ano do 2º ciclo do ensino fundamental",
  "6° ano do 3º ciclo do ensino fundamental",
  "7° ano do 3º ciclo do ensino fundamental",
  "8° ano do 4º ciclo do ensino fundamental",
  "9° ano do 4º ciclo do ensino fundamental",
];

export const CamposdeIdentificacao = [
  { label: "ID do Aluno", id: "id" },
  { label: "Nome Completo", id: "nome_do_aluno" },
  { label: "Data de Nascimento", id: "data_de_nascimento" },
  { label: "Documento (Certidão, CPF ou RG)", id: "certidao_cpf_rg" },
];

export const CamposdeDadosPessoais = [
  { label: "Nome da Mãe", id: "mae" },
  { label: "Nome do Pai", id: "pai" },
  { label: "Naturalidade", id: "naturalidade" },
  { label: "Telefone", id: "telefone" },
  {
    label: "Raça ou Cor",
    id: "Raça",
    type: "select",
    options: ["BRANCA", "PRETA", "PARDA", "AMARELA", "INDÍGENA", "NÃO DECLARA"],
  },
];

export const CamposdeEscolarizacao = [
  {
    label: "Turma em 2024",
    id: "turma_em_2024",
    type: "select",
    options: turmas,
  },
  {
    label: "Ano do ensino Fundamental)",
    id: "ano_fundamental",
    type: "select",
    options: anos_escolares,
  },
  { label: "Turno", id: "turno", type: "select", options: ["Manhã", "Tarde"] },
  { label: "Observações Adicionais", id: "observações" },
];

export const CamposdeMovimentacaoEscolar = [
  {
    label: "Tipo de Movimentação do Aluno",
    id: "movimentacao",
    type: "select",
    options: ["A/C"],
  },
  { label: "Data da Matrícula", id: "data_movimento" },
  { label: "Data para planilha origem dos estudantes", id: "data_matricula" },
  {
    label: "Escola de Origem",
    id: "transferencia_escola_destino",
    type: "select",
    options: [
      "Escola Particular de CxSul",
      "Escola Municipal de CxSul",
      "Escola Estadual de CxSul",
      "Escola de Educação Infantil - Gestão Compartilhada de CxSul",
      "Escola de Educação Infantil Particular de CxSul",
      "Vaga paga pelo município em Escola de Educação Infantil Particular de CxSul",
      "Outro Município do RS",
      "Outro Estado",
      "Outro País",
      "Estava em casa(não frequentava outra escola)"
    ]
  },
];

export const CamposdeDadosPessoaistoUpdate = [
  { label: "Nome da Mãe", id: "mae" },
  { label: "Nome do Pai", id: "pai" },
  { label: "Naturalidade", id: "naturalidade" },
  { label: "Telefone", id: "telefone" },
  { label: "Raça ou Cor", id: "Raça" },
];
export const CamposdeEscolarizacaotoUpdate = [
  { label: "Turma em 2024", id: "turma_em_2024" },
  { label: "Ano Escolar (Fundamental)", id: "ano_fundamental" },
  { label: "Turno", id: "turno" },
  { label: "Observações Adicionais", id: "observações" },
];
export const CamposdeMovimentacaoEscolarToUpdate = [
  { label: "Tipo de Movimentação do Aluno", id: "movimentacao" },
 { label: "Data da Transferencia", id: "data_movimento" },
  {
    label: "Escola de Destino",
    id: "transferencia_escola_destino",
  },
];

export function formatDate(isoString: string | null | undefined): string {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    // a data não é válida
    return "";
  }
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export default function getMonthName(monthNumber: number) {
  const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
  ];
  return months[monthNumber];
}

export function isMobileNumber(phoneNumber: string): boolean {
  // Verifique se o número é um celular com base no padrão específico
  return /^\d{5}-\d{4}$/.test(phoneNumber);
}

export function formatInternationalNumber(
  phoneNumber: string,
  defaultAreaCode: string = "54"
): string {
  // Tente encontrar o código de área no número
  const match = phoneNumber.match(/\((\d{2})\)/);
  let areaCode = defaultAreaCode; // Usar código de área padrão se não encontrar um específico

  // Se encontrar um código de área, use-o
  if (match && match[1]) {
    areaCode = match[1];
    phoneNumber = phoneNumber.replace(/\(\d{2}\)/, ""); // Remova o código de área do número
  }

  // Remova qualquer caractere não numérico restante
  const numberWithoutDashes = phoneNumber.replace(/\D/g, "");

  // Retorne o número formatado com o código do país e o código de área
  return "55" + areaCode + numberWithoutDashes;
}



export const BoxStyleCadastro = {
  backgroundColor: "#ffffff",
  border: "10px solid",
  borderImageSlice: "1",
  borderWidth: "9px",
  borderImageSource: "linear-gradient(to left, #FDA188, #FDA188)",
  borderRadius: "3px",
  boxShadow: "0 9px 40px rgba(42, 42, 42)",
  fontSize: "16px",
  maxWidth: "752px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  margin: "72px auto",
  padding: "0.5em 52px",
};

export const TituloDaPagina = {
  marginTop: "1.125rem",
  width: "100%",
  marginBottom: "auto",
  textAlign: "center",
  color: "#000000",
  fontSize: "2em",
  fontWeight: "600",
  lineHeight: "1.45",
};

export const SubtituloDaPagina = {
  color: "#264B67",
  fontSize: "1em",
  fontWeight: "500",
  lineHeight: "1.6",
};

export const ListStyle = {
  borderColor: "#83D0E4",
  borderBottom: "1px solid #83D0E4",
  padding: "14px",
  marginBottom: "auto",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};
export const TituloSecaoStyle = {
  color: "#000000",
  fontSize: "1.25rem",
  marginBottom: "20px",
  fontWeight: "600",
  lineHeight: "1.45",
};

//estilos da tabela

export const StyledDefaultCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    minWidth: 100, // Set a minimum width for the header cells

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minWidth: 100, // Set a minimum width for the body cells
    cursor: 'pointer'
  },
}));

export const StyledEventDateCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    maxWidth: 80, // Set a minimum width for the header cells

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    maxWidth: 80, // Set a minimum width for the body cells
    cursor: 'pointer'
  },
  
}));


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 10,
  },
}));

export const StyledDocumentCell = styled(TableCell)<StyledTableCellProps>(
  ({ theme, contentLength }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      paddingTop: 16,
      paddingLeft: 16,
      paddingBottom: 10,
    },
    // Altere para aplicar a regra de quebra de linha para textos com mais de 11 caracteres
    wordBreak: contentLength > 11 ? 'break-all' : 'normal',
    minWidth: contentLength > 11 ? '150px' : '100px', // Ajuste a largura mínima com base no comprimento do conteúdo
  })
);


