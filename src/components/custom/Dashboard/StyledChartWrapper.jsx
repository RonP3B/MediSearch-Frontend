// Imports the 'styled' function from the "@mui/material/styles" package
import { styled } from "@mui/material/styles";

// Defines constants for chart and legend heights
const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

// Defines a styled component using the 'styled' function
const StyledChartWrapper = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export default StyledChartWrapper;
