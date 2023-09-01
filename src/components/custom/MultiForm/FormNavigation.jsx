// Imports
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SubmitButton from "../Buttons/SubmitButton";

const FormNavigation = (props) => {
  return (
    <Box
      sx={{ display: "flex", marginTop: "2", justifyContent: "space-between" }}
    >
      {/* Button for going back, visibility depends on 'hasPrevious' */}
      <Button
        type="button"
        onClick={props.onBackClick}
        style={{ visibility: props.hasPrevious ? "visible" : "hidden" }}
      >
        Volver
      </Button>
      <SubmitButton
        loading={props.loading}
        text={props.isLastStep ? "Enviar" : "Siguiente"}
        loadingText="Enviando..."
        variant="contained"
      />
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
FormNavigation.propTypes = {
  hasPrevious: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FormNavigation;
