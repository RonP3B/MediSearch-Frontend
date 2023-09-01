// Imports
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserForm from "../custom/Forms/UserForm";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import Link from "@mui/material/Link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CompanyForm from "../custom/Forms/CompanyForm";

const Signup = () => {
  // State to keep track of the selected registration type
  const [registrationType, setRegistrationType] = useState("");

  // Function to dynamically set the title of the form
  const setFormTitle = () => {
    let title = "Tipo de Registro";

    if (registrationType === "user") {
      title = "Registro de Usuario";
    }

    if (registrationType === "company") {
      title = "Registro de Empresa";
    }

    return title;
  };

  return (
    <Container maxWidth={registrationType ? "md" : "sm"}>
      <Paper elevation={3} sx={{ padding: 2, marginY: 3 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          {setFormTitle()}
        </Typography>
        {registrationType ? (
          <>
            <Typography sx={{ marginTop: 2 }}>
              <Button
                startIcon={<KeyboardBackspaceIcon />}
                onClick={() => setRegistrationType("")}
              >
                tipo de registro
              </Button>
            </Typography>
            {registrationType === "user" ? <UserForm /> : <CompanyForm />}
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexDirection: "row",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexBasis: { xs: "50%" },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "200px",
                    maxWidth: "200px",
                    "@media (max-width: 380px)": {
                      maxWidth: "120px",
                      height: "120px",
                    },
                  }}
                  onClick={() => setRegistrationType("company")}
                >
                  <BusinessIcon sx={{ fontSize: 100 }} />
                </Button>
                <Chip
                  label="Registro Empresa"
                  color="primary"
                  size="small"
                  sx={{ marginTop: 1 }}
                />
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexBasis: { xs: "50%" },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "200px",
                    maxWidth: "200px",
                    "@media (max-width: 380px)": {
                      maxWidth: "120px",
                      height: "120px",
                    },
                  }}
                  onClick={() => setRegistrationType("user")}
                >
                  <PersonIcon sx={{ fontSize: 100 }} />
                </Button>
                <Chip
                  label="Registro Usuario"
                  color="primary"
                  size="small"
                  sx={{ marginTop: 1 }}
                />
              </Box>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Typography align="center">
              <Link component={RouterLink} to="/login">
                ¿Ya tienes una cuenta?
              </Link>
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Signup;
