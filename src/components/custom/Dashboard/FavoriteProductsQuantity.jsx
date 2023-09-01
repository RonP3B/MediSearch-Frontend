// Imports
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import useChart from "../../../hooks/chart/useChart";

const FavoriteProductsQuantity = ({
  title,
  chartData,
  subheader,
  ...props
}) => {
  // Extracts labels and quantity values from chartData
  const chartLabels = chartData.map((data) => data.product);
  const chartSeries = chartData.map((data) => data.quantity);

  // Defines chart options using a custom hook
  const chartOptions = useChart({
    chart: {
      type: "donut",
    },
    labels: chartLabels,
  });

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="donut"
          series={chartSeries}
          options={chartOptions}
          height={350}
        />
      </Box>
    </Card>
  );
};

// Define PropTypes to specify expected props and their types
FavoriteProductsQuantity.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default FavoriteProductsQuantity;
