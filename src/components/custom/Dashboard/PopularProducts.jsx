// Imports
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import useChart from "../../../hooks/chart/useChart";

const CategoriesQuantities = ({ title, chartData, subheader, ...props }) => {
  // Gets the current MUI theme using the useTheme hook
  const theme = useTheme();

  // Extracts  labels and quantity values from chartData
  const chartSeries = chartData.map((data) => data.quantity);
  const chartLabels = chartData.map((data) => data.product);

  // Defines chart options using a custom hook
  const polarOptions = useChart({
    chart: {
      type: "polarArea",
    },
    labels: chartLabels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        color: theme.palette.primary.main,
        shadeTo: "light",
        shadeIntensity: 0.6,
      },
    },
  });

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }}>
        <ReactApexChart
          type="polarArea"
          series={chartSeries}
          options={polarOptions}
          height={350}
        />
      </Box>
    </Card>
  );
};

// Define PropTypes to specify expected props and their types
CategoriesQuantities.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default CategoriesQuantities;
