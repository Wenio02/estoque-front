import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardCard from "../components/DashboardCard";

const Home = () => {
  const [data, setData] = useState({
    estoque: 0,
    vendasRealizadas: 0,
    pagamentosPendentes: 0,
  });

  useEffect(() => {
    // Chama o backend para obter as informações do dashboard
    axios
      .get("/api/dashboard")
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  return (
    <div className="home">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <DashboardCard title="Estoque" value={data.estoque} />
        <DashboardCard title="Vendas Realizadas" value={data.vendasRealizadas} />
        <DashboardCard title="Pagamentos Pendentes" value={data.pagamentosPendentes} />
      </div>
    </div>
  );
};

export default Home;
