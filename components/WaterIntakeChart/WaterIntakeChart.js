// components/WaterIntakeChart.js
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import styled from "styled-components";

Chart.register(...registerables);

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: white;
`;

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
            label: "Water Intake (ml)",
            data: data.reverse(),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Verhindert, dass das Diagramm das Seitenverhältnis beibehält
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 14, // Schriftgröße für die Legende
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                color: "#fff", // Weiße Schrift für die Legende
              },
            },
          },
          title: {
            display: true,
            text: "Water Intake Over the Last 7 Days",
            font: {
              size: 18, // Schriftgröße für den Titel
              weight: "bold",
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              color: "#fff", // Weiße Schrift für den Titel
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Dunkler Hintergrund für Tooltips
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 4,
            padding: 10,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#fff", // Weiße Farbe für die y-Achsenbeschriftungen
              font: {
                size: 14, // Schriftgröße für die y-Achsenbeschriftungen
              },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)", // Helle Gitterlinien
            },
          },
          x: {
            ticks: {
              color: "#fff", // Weiße Farbe für die x-Achsenbeschriftungen
              font: {
                size: 14, // Schriftgröße für die x-Achsenbeschriftungen
              },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)", // Helle Gitterlinien
            },
          },
        },
      },
    });
  }, [waterEntries]);

  return (
    <>
      <Title>Your Progress</Title>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          backgroundColor: "#2c2c2c",
          borderRadius: "8px",
          padding: "50px",
        }}
      >
        <canvas id="waterIntakeChart"></canvas>
      </div>
    </>
  );
}

export default WaterIntakeChart;
