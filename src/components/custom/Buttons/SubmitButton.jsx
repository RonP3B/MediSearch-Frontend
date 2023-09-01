// Imports
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// This component returns a Button with dynamic properties based on the loading state
const SubmitButton = ({ loading, text, loadingText, ...props }) => {
  return (
    <Button
      type="submit"
      {...props}
      sx={{
        opacity: loading ? 0.5 : 1, // Reduce opacity if loading
        ...(loading && { pointerEvents: "none" }), // Disable pointer events if loading
      }}
    >
      {loading && ( // Show CircularProgress if loading
        <CircularProgress
          size={17}
          color="inherit"
          sx={{ marginRight: 0.55 }}
        />
      )}
      {/* Displays loadingText or text based on loading state */}
      {loading ? loadingText : text}
    </Button>
  );
};

// Define PropTypes to specify expected props and their types
SubmitButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  loadingText: PropTypes.string.isRequired,
};

export default SubmitButton;
