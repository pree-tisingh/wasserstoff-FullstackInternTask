import React from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/RainGraph.css';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register required components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement // Make sure to register PointElement
);

const RainGraph = ({ forecastData }) => {
  const labels = forecastData.map(entry =>
    new Date(entry.date).toLocaleDateString([], {  month: 'short', day: 'numeric' })
  );

  const precipitationProbData = forecastData.map(entry => parseFloat(entry.rain)); // Convert to float if needed

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Precipitation Probability (%)',
        data: precipitationProbData,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '5-Day Precipitation Probability',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Cap to 100 since it's a percentage
        title: {
          display: true,
          text: 'Probability (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="rain-graph-container">
      <h3>Chance of Rain (5-Day Forecast)</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RainGraph;
