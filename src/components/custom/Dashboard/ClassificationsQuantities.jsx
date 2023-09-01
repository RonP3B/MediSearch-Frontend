// Imports
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import useChart from "../../../hooks/chart/useChart";

const ClassificationsQuantities = ({
  title,
  chartData,
  subheader,
  ...props
}) => {
  // Extracts 'classification' values from the 'chartData' array to create chart labels
  const chartLabels = chartData.map((data) => data.classification);

  // Extracts 'quantity' values from the 'chartData' array to create chart series data
  const chartSeries = chartData.map((data) => data.quantity);

  // Define chart options using a custom hook
  const chartOptions = useChart({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    colors: [
      "#F44F5E",
      "#E55A89",
      "#D863B1",
      "#CA6CD8",
      "#B57BED",
      "#8D95EB",
      "#62ACEA",
      "#4BC3E6",
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      align: "middle",
    },
    xaxis: {
      categories: chartLabels,
    },
    legend: {
      show: false,
    },
  });

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ name: "Cantidad", data: chartSeries }]}
          options={chartOptions}
          height={350}
        />
      </Box>
    </Card>
  );
};

// Define PropTypes to specify expected props and their types
ClassificationsQuantities.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  chartData: PropTypes.array.isRequired,
};

export default ClassificationsQuantities;
