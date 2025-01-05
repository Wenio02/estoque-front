import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardChart from '../components/DashboardChart'; // Importa o novo gráfico

const Home = () => {
  const [data, setData] = useState({
    estoque: 0,
    vendasRealizadas: 0,
    pagamentosPendentes: 0,
  });

  useEffect(() => {
    // Chama o backend para obter os dados do dashboard
    axios
      .get("/api/dashboard")
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        setData(response.data); // Atualiza o estado com os dados do dashboard
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  return (
    <div className="home">
      <h1>Dashboard</h1>
      {/* Exibe o gráfico de barras */}
      <DashboardChart data={data} />
    </div>
  );
};

export default Home;
