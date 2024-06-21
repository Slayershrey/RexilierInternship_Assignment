// src/components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const labels = data.map((d) => d.range);
  const counts = data.map((d) => d.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Items",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Price Range Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
