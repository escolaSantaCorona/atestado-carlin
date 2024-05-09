import { Box, Container, List, Typography } from "@mui/material";
import {
  BoxStyleCadastro,
  TituloDaPagina,
  SubtituloDaPagina,
  ListStyle,
} from "../utils/contants";
import  {AlunosAtestado}  from "../components/doc/getAlunosData";


export default function GenerateAtestado () {
  return (
    <Container>
      
      <Box sx={BoxStyleCadastro}>
        <Box sx={{ display: "table", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 -38px",
              padding: "0.5em 52px",
            }}
          >
            <img
              src="https://i.ibb.co/JkFZz7j/carlin.jpg"
              alt=""
              width={90}
              height={90}
            />
            <Typography sx={TituloDaPagina}>Atestado de escolaridade</Typography>
            <Typography sx={SubtituloDaPagina}>EMEF CARLIN FABRIS</Typography>
          </Box>
          <List sx={ListStyle}>
            <AlunosAtestado />
          </List>
        </Box>
      </Box>
    </Container>
  );
};