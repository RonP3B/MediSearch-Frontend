// Import necessary modules and components
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-multi-carousel/lib/styles.css";
import "./styles/css/styles.css";
import { ColorModeProvider } from "./components/contexts/ColorModeContext.jsx";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import MediSearchInterceptor from "./components/interceptors/MediSearchInterceptor.jsx";
import StyledChart from "./components/custom/Dashboard/StyledChart.jsx";

// Check if the environment is set to production and disable React DevTools
if (import.meta.env.VITE_REACT_ENV === "production") {
  disableReactDevTools();
}

// Render the main application component into the root element of the HTML document
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the application in a ColorModeProvider */}
    <ColorModeProvider>
      {/* Apply a baseline CSS reset */}
      <CssBaseline />

      {/* Render a styled chart component */}
      <StyledChart />

      {/* Set up routing using BrowserRouter */}
      <BrowserRouter>
        {/* Provide authentication context */}
        <AuthProvider>
          {/* Apply the MediSearchInterceptor */}
          <MediSearchInterceptor>
            {/* Define routes using Routes */}
            <Routes>
              {/* Define a default route for the App component */}
              <Route path="/*" element={<App />} />
            </Routes>
          </MediSearchInterceptor>
        </AuthProvider>
      </BrowserRouter>
    </ColorModeProvider>
  </React.StrictMode>
);
