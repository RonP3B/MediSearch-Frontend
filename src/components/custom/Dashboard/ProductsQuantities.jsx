// Imports
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import useChart from "../../../hooks/chart/useChart";

const ProductsQuantities = ({ title, chartData, subheader, ...props }) => {
  // Extracts labels and quantity values from chartData
  const chartLabels = chartData.map((data) => data.product);
  const chartSeries = chartData.map((data) => data.quantity);

  // Defines chart options using a custom hook
  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => seriesName,
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
};

// Define PropTypes to specify expected props and their types
ProductsQuantities.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default ProductsQuantities;
