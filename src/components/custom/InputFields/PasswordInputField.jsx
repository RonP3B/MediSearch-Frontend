// Imports
import { useState } from "react";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputField from "./InputField";

const PasswordInputField = ({ label, name, ...props }) => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Toggle the password visibility state
  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <InputField
      type={showPassword ? "text" : "password"} // Toggle between text and password input types
      name={name}
      label={label}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {/* Toggle visibility icon based on the showPassword state */}
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

// Define PropTypes to specify expected props and their types
PasswordInputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PasswordInputField;
