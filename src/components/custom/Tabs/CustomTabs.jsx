// Imports
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "./CustomTabPanel";

// Function to generate accessibility properties for tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// CustomTabs component definition
const CustomTabs = (props) => {
  // Destructure tabs from props
  const { tabs } = props;

  // State to keep track of the currently active tab
  const [value, setValue] = React.useState(0);

  // Event handler for tab change
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
CustomTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
};

export default CustomTabs;
