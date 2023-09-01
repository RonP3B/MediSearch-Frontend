// Imports
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props); // Use Formik's useField hook to manage form field state and props

  return (
    <TextField
      {...field} // Spread Formik's field props
      {...props} // Spread any additional props passed to InputField
      label={label}
      error={meta.touched && !!meta.error} // Shows error state if touched and there's an error message
      helperText={meta.touched && meta.error} // Displays error message if touched and there's an error
    />
  );
};

// Define PropTypes to specify expected props and their types
InputField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default InputField;
