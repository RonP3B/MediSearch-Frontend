// Imports
import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const SelectInputField = React.forwardRef(
  ({ label, options, setSelected, loading, ...props }, ref) => {
    // Extract field-related props and functions from Formik's useField hook
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    // Handle change event for the Autocomplete component
    const handleChange = (event, value) => {
      setValue(value);
      if (setSelected) setSelected(value);
    };

    // Expose imperative methods through the ref using React.useImperativeHandle
    React.useImperativeHandle(ref, () => ({
      getValue: () => field.value,
      setValue: (value) => setValue(value),
    }));

    return (
      <Autocomplete
        {...field} // Spread 'field' props
        {...props} // Spread additional props
        options={options}
        onChange={handleChange}
        ref={ref}
        renderInput={(params) => (
          <TextField
            {...props} // Spread additional props
            {...params} // Spread 'params' props from Autocomplete
            label={label}
            error={meta.touched && !!meta.error} // Show error state if touched and error exists
            helperText={meta.touched && meta.error} // Display error message if touched and error exists
            InputProps={{
              ...params.InputProps, // Spread input props from 'params'
              endAdornment: (
                <>
                  {/* Show CircularProgress if loading */}
                  {loading && <CircularProgress color="inherit" size={20} />}

                  {/* Display original endAdornment */}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  }
);

// Set a display name for the component to appear in React DevTools
SelectInputField.displayName = "SelectInputField";

// Define PropTypes to specify expected props and their types
SelectInputField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setSelected: PropTypes.func,
  loading: PropTypes.bool,
};

export default SelectInputField;
