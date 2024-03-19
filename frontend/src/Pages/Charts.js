import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const Charts = () => {
  const [songsData, setSongsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/music/");
      const data = await response.json();
      setSongsData(data);
      createCharts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createCharts = (data) => {
    createScatterChart(data);
    createHistogram(data);
    createBarCharts(data);
  };

  const createScatterChart = (data) => {
    const danceabilityData = data.map(song => ({
      x: song.danceability,
      y: song.energy,
      title: song.title
    }));

    new Chart(document.getElementById('scatterChart'), {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Danceability vs Energy',
          data: danceabilityData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Danceability'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Energy'
            }
          }
        }
      }
    });
  };

  const createHistogram = (data) => {
    const durationData = data.map(song => song.duration_ms / 1000); // Convert duration to seconds
    const bins = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]; // Define bins for histogram

    new Chart(document.getElementById('histogram'), {
      type: 'bar',
      data: {
        labels: bins.map((bin, index) => index === bins.length - 1 ? `${bin}+` : `${bin}-${bins[index + 1]}`),
        datasets: [{
          label: 'Song Duration (seconds)',
          data: durationData.reduce((acc, val) => {
            const index = bins.findIndex(bin => val < bin);
            acc[index] = (acc[index] || 0) + 1;
            return acc;
          }, new Array(bins.length - 1).fill(0)),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Songs'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Duration (seconds)'
            }
          }
        }
      }
    });
  };

  const createBarCharts = (data) => {
    const acousticsData = data.map(song => ({
      label: song.title,
      value: parseFloat(song.acousticness)
    }));

    const tempoData = data.map(song => ({
      label: song.title,
      value: parseFloat(song.tempo)
    }));

    createBarChart('acousticsChart', 'Acoustics', acousticsData);
    createBarChart('tempoChart', 'Tempo', tempoData);
  };

  const createBarChart = (chartId, label, data) => {
    new Chart(document.getElementById(chartId), {
      type: 'bar',
      data: {
        labels: data.map(song => song.label),
        datasets: [{
          label: label,
          data: data.map(song => song.value),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: label
            }
          },
          x: {
            title: {
              display: true,
              text: 'Songs'
            }
          }
        }
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Scatter Chart: Danceability vs Energy</h2>
        <canvas id="scatterChart" width="400" height="200"></canvas>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Histogram: Song Duration</h2>
        <canvas id="histogram" width="400" height="200"></canvas>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Bar Chart: Acoustics</h2>
        <canvas id="acousticsChart" width="400" height="200"></canvas>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Bar Chart: Tempo</h2>
        <canvas id="tempoChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default Charts;
