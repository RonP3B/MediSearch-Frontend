// Imports
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form } from "formik";
import SubmitButton from "../custom/Buttons/SubmitButton";
import useLoginFormik from "../../hooks/formiks/useLoginFormik";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import InputField from "../custom/InputFields/InputField";
import PasswordInputField from "../custom/InputFields/PasswordInputField";

const Login = () => {
  // Loading state
  const [loading, setLoading] = useState(false);

  // Using a custom hook to manage formik configuration and submission logic
  const { initialValues, validationSchema, onSubmit } =
    useLoginFormik(setLoading);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginY: 3 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Inicio de Sesión
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <InputField
                name="userName"
                label="Nombre de usuario"
                margin="normal"
                fullWidth
              />
              <PasswordInputField
                name="password"
                label="Contraseña"
                margin="normal"
                fullWidth
              />
              <SubmitButton
                loading={loading}
                text="Iniciar Sesión"
                loadingText="Iniciando Sesión..."
                variant="contained"
                fullWidth
              />
            </Form>
          )}
        </Formik>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={1} mt={2} justifyContent="center">
          <Grid item>
            <Typography align="center">
              <Link component={RouterLink} to="/password-recovery">
                ¿Olvidaste tu contraseña?
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center">
              <Link component={RouterLink} to="/signup">
                ¿No tienes una cuenta?
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
