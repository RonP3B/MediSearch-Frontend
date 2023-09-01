// Imports
import PropTypes from "prop-types";
import { useField } from "formik";
import MaskedInput from "react-text-mask";
import TextField from "@mui/material/TextField";

const MaskedInputField = ({ label, mask, ...props }) => {
  const [field, meta] = useField(props); // Use the 'useField' hook to get the 'field' and 'meta' objects

  return (
    <MaskedInput
      {...field} // Spread the 'field' object's properties
      {...props} // Spread the other provided props
      mask={mask}
      guide={false}
      render={(ref, maskProps) => (
        <TextField
          {...maskProps} // Spread the maskProps object's properties (input-related props)
          label={label}
          inputRef={ref}
          error={meta.touched && !!meta.error} // Display error state based on touch and error status
          helperText={meta.touched && meta.error} // Show error message when touched and an error exists
        />
      )}
    />
  );
};

// Define PropTypes to specify expected props and their types
MaskedInputField.propTypes = {
  label: PropTypes.string.isRequired,
  mask: PropTypes.array.isRequired,
};

export default MaskedInputField;
