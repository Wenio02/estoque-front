import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registre os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = ({ data }) => {
  // Estrutura dos dados do gráfico
  const chartData = {
    labels: ['Estoque', 'Vendas Realizadas', 'Pagamentos Pendentes'], // Rótulos do eixo X
    datasets: [
      {
        label: 'Valores',
        data: [data.estoque, data.vendasRealizadas, data.pagamentosPendentes], // Dados do eixo Y
        backgroundColor: '#4CAF50', // Cor das barras
        borderRadius: 8, // Bordas arredondadas
        borderColor: '#388E3C', // Cor da borda
        borderWidth: 1,
      },
    ],
  };

  // Opções para o gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Dashboard de Desempenho',
        font: {
          size: 20,
        },
        padding: 20,
      },
      tooltip: {
        backgroundColor: '#1976D2',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categorias',
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valores',
          font: {
            size: 16,
          },
        },
        beginAtZero: true, // Para começar o gráfico no zero
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default DashboardChart;
