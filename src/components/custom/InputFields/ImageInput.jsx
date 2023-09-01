// Imports
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import DefaultAvatar from "../../../assets/images/DefaultAvatar.jpg";
import FileInputField from "./FileInputField";

const ImageInput = (props) => {
  // Destructuring the props for ease of use
  const {
    name,
    label,
    avatarImage,
    setAvatarImage,
    fileName,
    setFileName,
    variant,
  } = props;

  // Defines a function to handle changes when a file is selected
  const handleFileChange = (file) => {
    // Creates a FileReader to read the contents of the selected file
    const reader = new FileReader();

    // When the reader finishes loading, set the avatar image with the loaded data URL
    reader.onload = (e) => setAvatarImage(e.target.result);

    // Reads the selected file as a data URL
    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: 2,
      }}
    >
      <Box
        component="label"
        htmlFor={name}
        sx={{
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 120,
            width: 120,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "primary.main",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            mr: 1,
          }}
          alt="Avatar"
          src={avatarImage || DefaultAvatar} // Display the avatarImage if available, otherwise use DefaultAvatar
        />
      </Box>
      <FileInputField
        onChange={handleFileChange}
        accept="image/*"
        label={label}
        name={name}
        fileName={fileName}
        setFileName={setFileName}
        variant={variant}
      />
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  avatarImage: PropTypes.any,
  setAvatarImage: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

export default ImageInput;
