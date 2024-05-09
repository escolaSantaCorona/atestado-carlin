import { useState, ChangeEvent, useEffect } from "react";
import {
    Container,
    TextField,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    Table,
    styled,
    tableCellClasses,
    TableCell,
  } from "@mui/material";
  import { CreatePdf } from "./generateDoc";
  import {AtestadoEscolaridadeInputsProps} from "../../interfaces/Interface"
import { useData } from "@/context/Context";
  export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  export const AlunosAtestado=()=>{
    const { data} = useData();
    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState<AtestadoEscolaridadeInputsProps[]>([]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    useEffect(() => {
      const filtered = data.filter(
        (aluno) =>
          aluno.nome_do_aluno &&
          aluno.nome_do_aluno.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredData(filtered);
      console.log(filteredData)
    }, [inputValue, data]);

    return (
      <Container>
        <TextField
          label="Digite aqui o nome do aluno que deseja pesquisar"
          value={inputValue}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
  
        {inputValue ? (
          filteredData.length > 0 ? (
            <TableContainer style={{ marginTop: "16px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Nome</StyledTableCell>
                    <StyledTableCell align="center">Turma</StyledTableCell>
                    <StyledTableCell align="center">
                     Turno
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    Atestado
                    </StyledTableCell>
                 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((aluno, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {aluno.nome_do_aluno}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {aluno.turma_em_2024}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {String(aluno.turno)}
                      </StyledTableCell>
                     
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => CreatePdf(aluno)}
                        >
                          Gerar atestado
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginTop: "16px", color: "#000000" }}
            >
              Nenhum aluno encontrado.
            </Typography>
          )
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ marginTop: "16px", color: "#000000", textAlign: "center" }}
          >
            Nenhum registro pesquisado.
          </Typography>
        )}
      </Container>
    );



  }
