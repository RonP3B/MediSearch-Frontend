// Imports
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index} // Hide the panel if its value doesn't match the index
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other} // Spread any additional props
    >
      {/* Render children only if the value matches the index */}
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Define PropTypes to specify expected props and their types
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default CustomTabPanel;
