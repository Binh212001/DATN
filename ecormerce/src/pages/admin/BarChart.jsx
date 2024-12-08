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

const BarChart = ({ data }) => {
  // Prepare data for Chart.js
  const chartData = {
    labels: data.map((d) => `Month ${d.month}/${d.year}`),
    datasets: [
      {
        label: "Doanh số",
        data: data.map((d) => d.totalAmount),
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Use red shades since your primary color is red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString("en-US"), // Format as currency
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
