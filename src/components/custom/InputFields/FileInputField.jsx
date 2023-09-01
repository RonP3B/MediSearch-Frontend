// Imports
import { useRef } from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const FileInputField = (props) => {
  // Destructuring props
  const { onChange, accept, label, name, fileName, setFileName, variant } =
    props;

  // Create a reference to the input element
  const inputRef = useRef(null);

  // useField and useFormikContext  from formik library
  const [field, meta] = useField(name);
  const formik = useFormikContext();

  // Handler for when a file is selected
  const handleFileChange = (event) => {
    // Gets the selected file from the input event
    const file = event.target.files[0];

    // Checks if a file was selected
    if (file) {
      onChange(file); // Calls the 'onChange' function and pass the selected file
      formik.setFieldValue(name, file); // Uses Formik's 'setFieldValue' to update the value of 'name' field with the selected file
      setFileName(file.name); // Updates the state to display the selected file's name
    }
  };

  return (
    <>
      {/* Hidden input element for file selection */}
      <input
        id={name}
        type="file"
        name={name}
        ref={inputRef}
        accept={accept}
        style={{ display: "none" }}
        onBlur={field.onBlur}
        onChange={(event) => handleFileChange(event)}
      />

      {/* Box element that triggers the hidden input on click */}
      <Box onClick={() => inputRef.current.click()}>
        <TextField
          value={fileName}
          disabled
          fullWidth
          label={label}
          variant={variant || "outlined"}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <AttachFileIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

// Define PropTypes to specify expected props and their types
FileInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default FileInputField;
