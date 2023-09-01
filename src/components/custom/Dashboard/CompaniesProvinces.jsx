// Imports
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import useChart from "../../../hooks/chart/useChart";
import StyledChartWrapper from "./StyledChartWrapper";

const CompaniesProvinces = ({
  title,
  subheader,
  chartColors,
  chartData,
  ...props
}) => {
  // Gets the current MUI theme using the useTheme hook
  const theme = useTheme();

  // Extracts province labels and quantity values from chartData
  const chartLabels = chartData.map((data) => data.province);
  const chartSeries = chartData.map((data) => data.quantity);

  // Defines chart options using a custom hook
  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => seriesName,
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />
      <StyledChartWrapper dir="ltr">
        <ReactApexChart
          type="pie"
          series={chartSeries}
          options={chartOptions}
          height={280}
        />
      </StyledChartWrapper>
    </Card>
  );
};

// Define PropTypes to specify expected props and their types
CompaniesProvinces.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartData: PropTypes.array.isRequired,
};

export default CompaniesProvinces;
