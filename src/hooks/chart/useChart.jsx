// Imports
import merge from "lodash/merge";
import { useTheme, alpha } from "@mui/material/styles";

const useChart = (options) => {
  // Get the current theme using the useTheme hook
  const theme = useTheme();

  // Configuration for the label displaying "Total"
  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  };

  // Configuration for the label displaying values
  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    lineHeight: theme.typography.h3.lineHeight,
  };

  // Base options for the chart
  const baseOptions = {
    noData: {
      text: "No hay datos", // Text to display when there's no data
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: theme.typography.h4.fontSize,
        fontFamily: undefined,
      },
    },

    // Array of colors to use in the chart
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      alpha(theme.palette.success.dark, 0.9), // Using the alpha function to adjust opacity
      theme.palette.info.dark,
      alpha(theme.palette.info.dark, 0.9), // Adjusted opacity
    ],

    // Chart configuration
    chart: {
      toolbar: { show: false }, // Hide the chart toolbar
      zoom: { enabled: false }, // Disable zoom functionality
      foreColor: theme.palette.text.disabled, // Color of text elements
      fontFamily: theme.typography.fontFamily, // Font family for text
    },

    // Define different states for the chart visualization
    states: {
      // State when hovering over a data point
      hover: {
        filter: {
          type: "lighten", // Apply a lightening effect
          value: 0.04, // Adjust the lightening intensity
        },
      },
      // State when a data point is active (clicked or selected)
      active: {
        filter: {
          type: "darken", // Apply a darkening effect
          value: 0.88, // Adjust the darkening intensity
        },
      },
    },

    // Define how chart fills should be displayed
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Configure data labels settings
    dataLabels: { enabled: false },

    // Configure chart stroke settings
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    // Configure grid settings for the chart
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    // Configure the x-axis settings for the chart
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Configure marker settings for data points
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },

    // Configure tooltip settings for chart interactions
    tooltip: {
      x: {
        show: false,
      },
    },

    legend: {
      // Configure the legend settings
      show: true,
      fontSize: String(13),
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.text.primary, // Set label colors to the primary text color
      },
    },

    plotOptions: {
      bar: {
        // Configure bar chart options
        borderRadius: 4,
        columnWidth: "28%", // Set the width of the columns in the bar chart
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },

      pie: {
        // Configure pie chart options
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE, // Define what value to display in the pie/donut chart slices
            total: LABEL_TOTAL, // Define what value to display as the total in the center of the donut
          },
        },
      },

      radialBar: {
        // Configure radial bar chart options
        track: {
          strokeWidth: "100%", // Set the width of the track in the radial bar chart
          background: alpha(theme.palette.grey[500], 0.16), // Set background color for the track
        },
        dataLabels: {
          value: LABEL_VALUE, // Define what value to display on the radial bar
          total: LABEL_TOTAL, // Define what value to display as the total value
        },
      },

      radar: {
        // Configure radar chart options
        polygons: {
          fill: { colors: ["transparent"] }, // Set fill color for radar chart polygons
          strokeColors: theme.palette.divider, // Set stroke color for radar chart polygons
          connectorColors: theme.palette.divider, // Set connector color for radar chart polygons
        },
      },

      polarArea: {
        // Configure polar area chart options
        rings: {
          strokeColor: theme.palette.divider, // Set stroke color for polar area chart rings
        },
        spokes: {
          connectorColors: theme.palette.divider, // Set connector color for polar area chart spokes
        },
      },
    },

    responsive: [
      // Define responsiveness settings for different breakpoints
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } }, // Adjust bar width for small screens
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } }, // Adjust bar width for medium screens
        },
      },
    ],
  };

  // Merge and return the result of combining baseOptions with additional options
  return merge(baseOptions, options);
};

export default useChart;
