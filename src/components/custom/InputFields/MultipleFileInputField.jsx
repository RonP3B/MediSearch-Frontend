// Imports
import { useRef } from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const MultipleFileInputField = ({
  accept,
  label,
  name,
  setImages,
  ...props
}) => {
  // Reference to the input element
  const inputRef = useRef(null);

  // Get the field and meta props from Formik for this input field
  const [field, meta] = useField(name);
  const formik = useFormikContext();

  // Handler for when files are selected
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      // Set Formik field value to the selected files
      formik.setFieldValue(name, files);

      if (setImages) {
        const imagesArray = [];

        // Function to read an image file as a data URL
        const readImageAsDataURL = (file) => {
          const reader = new FileReader();
          reader.onload = () => {
            imagesArray.push(reader.result);

            // Call setImages when all images are read
            if (imagesArray.length === files.length) {
              setImages(imagesArray);
            }
          };
          reader.readAsDataURL(file);
        };

        // Iterate through files and read images as data URLs
        files.forEach((file) => {
          if (file.type.startsWith("image/")) {
            readImageAsDataURL(file);
          }
        });
      }
    }
  };

  return (
    <>
      {/* Hidden file input triggered by the Box element */}
      <input
        id={name}
        type="file"
        name={name}
        ref={inputRef}
        accept={accept}
        style={{ display: "none" }}
        onBlur={field.onBlur}
        onChange={(event) => handleFileChange(event)}
        multiple
      />
      {/* Box acts as the trigger for the file input */}
      <Box onClick={() => inputRef.current.click()}>
        {/* Text field to display selected file count */}
        <TextField
          value={
            field.value?.length > 0
              ? `${field.value.length} archivos seleccionados`
              : ""
          }
          disabled
          label={label}
          {...props}
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
MultipleFileInputField.propTypes = {
  accept: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setImages: PropTypes.func,
};

export default MultipleFileInputField;
