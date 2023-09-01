// Imports
import { alpha, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

const bgBlur = (props) => {
  // Properties from 'props' object with default values
  const color = props?.color || "#000000";
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  // If 'imgUrl' is provided, create a background with blur
  if (imgUrl) {
    return {
      position: "relative",
      backgroundImage: `url(${imgUrl})`,
      "&:before": {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: "100%",
        height: "100%",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity), // 'alpha' function to set color opacity
      },
    };
  }

  // If 'imgUrl' is not provided, create a backdrop blur effect
  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
};

const StyledChart = () => {
  const theme = useTheme(); // Gets the current MUI theme using 'useTheme' hook

  // Create global styles using 'GlobalStyles' component
  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        ".apexcharts-canvas": {
          maxWidth: "1px",
          ".apexcharts-xaxistooltip": {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[3],
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            "&:before": { borderBottomColor: "transparent" },
            "&:after": {
              borderBottomColor: alpha(theme.palette.background.default, 0.8),
            },
          },
          ".apexcharts-tooltip.apexcharts-theme-light": {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            boxShadow: theme.shadows[3],
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            ".apexcharts-tooltip-title": {
              border: 0,
              textAlign: "center",
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: alpha(theme.palette.grey[500], 0.16),
              color:
                theme.palette.text[
                  theme.palette.mode === "light" ? "secondary" : "primary"
                ],
            },
          },

          ".apexcharts-legend": {
            padding: 0,
          },
          ".apexcharts-legend-series": {
            display: "flex !important",
            alignItems: "center",
          },
          ".apexcharts-legend-marker": {
            marginRight: 8,
          },
          ".apexcharts-legend-text": {
            lineHeight: "18px",
            textTransform: "capitalize",
          },
        },
      }}
    />
  );

  return inputGlobalStyles;
};

export default StyledChart;
