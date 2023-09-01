// Imports
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

const NoChats = ({ msg, chatSection, Icon, handleButton }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      {/* Display the provided Icon with appropriate styling */}
      <Icon sx={{ fontSize: 80, color: "primary.main" }} />

      {/* Display the provided message */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        {msg}
      </Typography>

      {/* Conditionally display additional message based on chatSection */}
      {chatSection && (
        <Typography variant="subtitle1">
          Selecciona de tus conversaciones existentes o crea una nueva
        </Typography>
      )}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mt: 2 }}
        onClick={handleButton}
      >
        Nuevo mensaje
      </Button>
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
NoChats.propTypes = {
  msg: PropTypes.string.isRequired,
  chatSection: PropTypes.bool.isRequired,
  Icon: PropTypes.elementType.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default NoChats;
