import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartProduct = ({ data }) => {
  const cleanedData = data.map((item) => ({
    ...item,
    sold: item.sold ?? 0, // Replace null/undefined with 0
  }));

  // Prepare data for Chart.js
  const chartData = {
    labels: cleanedData.map((d) => d.name), // Product names
    datasets: [
      {
        label: "Đã bán",
        data: cleanedData.map((d) => d.sold),
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Adjust color as needed
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        ticks: {
          display: false, // Hides the labels on the x-axis
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChartProduct;
