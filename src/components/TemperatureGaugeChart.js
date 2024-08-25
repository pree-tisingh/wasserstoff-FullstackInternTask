// TemperatureBarChart.js

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TemperatureBarChart = ({ minTemp, maxTemp, unit }) => {
  const data = {
    labels: ["Temperature"], // Just one label for now
    datasets: [
      {
        label: `Min Temperature (°${unit === "metric" ? "C" : "F"})`,
        data: [minTemp],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: `Max Temperature (°${unit === "metric" ? "C" : "F"})`,
        data: [maxTemp],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "90%", height:"90%", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TemperatureBarChart;
