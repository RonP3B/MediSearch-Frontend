// Imports
import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

// Context to hold color mode related data
const ColorModeContext = createContext({});

// Provider component to wrap around the application for color mode management
export const ColorModeProvider = ({ children }) => {
  // State to hold the current color mode (light/dark)
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  // Define the theme based on the current color mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#9c27b0",
          },
          secondary: {
            main: "#f50057",
          },
        },
      }),
    [mode]
  );

  // Provide color mode and theme to the components within the context
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Define PropTypes to specify expected props and their types
ColorModeProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default ColorModeContext;
