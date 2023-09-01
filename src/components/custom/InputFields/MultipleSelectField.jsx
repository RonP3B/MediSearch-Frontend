// Imports
import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MultipleSelectField = React.forwardRef(({ options, ...props }, ref) => {
  // Use the 'useField' hook from Formik to manage form field state
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  // Callback function to handle changes in the selected values
  const handleChange = (event, values) => {
    setValue(values);
  };

  // Use React.useImperativeHandle to expose methods through the forwarded ref
  React.useImperativeHandle(ref, () => ({
    getValue: () => field.value,
    setValue: (values) => setValue(values),
  }));

  return (
    <Autocomplete
      {...props} // Spread all the props passed to this component
      {...field} // Spread the field properties
      multiple
      disableCloseOnSelect
      options={options}
      getOptionLabel={(option) => option}
      onChange={handleChange}
      ref={ref}
      renderInput={(params) => (
        <TextField
          {...params} // Spread the parameters for rendering the input field
          {...props} // Spread additional props
          error={meta.touched && !!meta.error} // Show error state if touched and error exists
          helperText={meta.touched && meta.error} // Display the error message if touched and error exists
        />
      )}
    />
  );
});

// Set a display name for the component to appear in React DevTools
MultipleSelectField.displayName = "MultipleSelectField";

// Define PropTypes to specify expected props and their types
MultipleSelectField.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultipleSelectField;
