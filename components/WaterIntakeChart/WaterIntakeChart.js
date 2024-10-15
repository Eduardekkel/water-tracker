// components/WaterIntakeChart.js
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function WaterIntakeChart({ waterEntries }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = [];
    const data = [];

    const currentDate = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      const label = date.toLocaleDateString();

      labels.push(label);
      const dailyTotal = waterEntries
        .filter((entry) => new Date(entry.date).toLocaleDateString() === label)
        .reduce((sum, entry) => sum + entry.amount, 0);
      data.push(dailyTotal);
    }

    const ctx = document.getElementById("waterIntakeChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels.reverse(),
        datasets: [
          {
            label: "Water intake (ml)",
            data: data.reverse(),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Water intake over the last 7 days",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [waterEntries]);

  return <canvas id="waterIntakeChart" width="400" height="200"></canvas>;
}

export default WaterIntakeChart;
