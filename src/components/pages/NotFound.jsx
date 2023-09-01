// Imports
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 5,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: (theme) => theme.spacing(4),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <SentimentVeryDissatisfiedIcon
          sx={{
            fontSize: 240,
            marginBottom: (theme) => theme.spacing(2),
            color: (theme) => theme.palette.primary.main,
          }}
        />
        <Typography variant="h4" gutterBottom>
          Oops! Página no encontrada
        </Typography>
        <Typography variant="body1">
          La página que estás buscando puede que no este disponible o no exista.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 3 }}
        >
          Volver al inicio
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
