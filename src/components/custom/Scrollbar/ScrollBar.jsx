// Imports
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";

// Create a styled component for the root container of the scrollbar
const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

// Create a styled component for the scrollbar itself using SimpleBar
const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
  "& .simplebar-placeholder": {
    width: "auto !important",
  },
}));

// Define a ScrollBar component
const ScrollBar = ({ children, sx, customRef, ...props }) => {
  // Determine if the user agent is from a mobile device
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  // If the device is mobile, render a basic scrollable container
  if (isMobile) {
    return (
      <Box
        sx={{
          direction: "inherit",
          boxSizing: "border-box",
          position: "relative",
          display: "block",
          height: "100%",
          width: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto",
          ...sx,
        }}
        ref={customRef}
        {...props}
      >
        <Box>{children}</Box>
      </Box>
    );
  }

  // If not on a mobile device, render a styled scrollbar using SimpleBar
  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        timeout={3000}
        clickOnTrack={false}
        sx={{ "& .simplebar-content": sx }}
        {...props}
        ref={customRef}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
};

// Define PropTypes to specify expected props and their types
ScrollBar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
  customRef: PropTypes.object,
};

export default ScrollBar;
