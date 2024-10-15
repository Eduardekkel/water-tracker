import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const WaterIntakeChart = ({ waterData }) => {
  const labels = waterData.map((entry) => entry.date);
  const dataPoints = waterData.map((entry) => entry.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Tägliche Wasseraufnahme (ml)",
        data: dataPoints,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Wasseraufnahme (ml)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Datum",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default WaterIntakeChart;
