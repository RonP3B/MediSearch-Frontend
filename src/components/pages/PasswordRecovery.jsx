// Imports
import { useState } from "react";
import { Formik, Form } from "formik";
import usePassRecoveryFormik from "../../hooks/formiks/usePassRecoveryFormik";
import PasswordInputField from "../custom/InputFields/PasswordInputField";
import SubmitButton from "../custom/Buttons/SubmitButton";
import InputField from "../custom/InputFields/InputField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Component for the email input field
const EmailInput = () => {
  return (
    <InputField
      name="email"
      label="Correo electrónico del usuario"
      margin="normal"
      fullWidth
    />
  );
};

// Component for the validation code input field
const CodeInput = () => {
  return (
    <InputField
      name="code"
      label="Código de validación"
      margin="normal"
      fullWidth
    />
  );
};

// Component for the new password input fields
const NewPasswordInputs = () => {
  return (
    <>
      <PasswordInputField
        name="newPassword"
        label="Nueva contraseña"
        margin="normal"
        fullWidth
      />
      <PasswordInputField
        name="confirmNewPassword"
        label="Confirmar nueva contraseña"
        margin="normal"
        fullWidth
      />
    </>
  );
};

// Labels for the different steps in the password recovery process
const stepLabels = [
  "Encontrar usuario",
  "Confirmar código",
  "Cambiar contraseña",
];

const PasswordRecovery = () => {
  // State variables to manage the state of password recovery process
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Destructure methods and values from a custom hook (usePassRecoveryFormik)
  const {
    initialValues,
    findUserValidation,
    codeValidation,
    newPassValidation,
    onSubmitFindUser,
    onSubmitCode,
    onSubmitNewPassword,
  } = usePassRecoveryFormik(
    setLoading,
    setEmailSent,
    setCodeValidated,
    setActiveStep
  );

  // Determine the current state of the form based on recovery process state
  const getFormState = () => {
    if (codeValidated) {
      return {
        component: <NewPasswordInputs />,
        buttonText: "Cambiar contraseña",
        loadingText: "Cambiando contraseña...",
        onSubmit: onSubmitNewPassword,
        validationSchema: newPassValidation,
      };
    } else if (emailSent) {
      return {
        component: <CodeInput />,
        buttonText: "Verificar código",
        loadingText: "Verificando código...",
        onSubmit: onSubmitCode,
        validationSchema: codeValidation,
      };
    }
    return {
      component: <EmailInput />,
      buttonText: "Buscar usuario",
      loadingText: "Buscando usuario...",
      onSubmit: onSubmitFindUser,
      validationSchema: findUserValidation,
    };
  };

  // Get the current form state based on the recovery process
  const { component, buttonText, loadingText, onSubmit, validationSchema } =
    getFormState();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginY: 3 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Recuperar contraseña
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ marginTop: 3 }}>
          {stepLabels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              {/* Render the appropriate input fields based on form state */}
              {component}
              <SubmitButton
                loading={loading}
                text={buttonText}
                loadingText={loadingText}
                variant="contained"
                fullWidth
              />
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default PasswordRecovery;
