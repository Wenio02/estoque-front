import React, { useState, useEffect } from "react";
import axios from "axios";

const VendasRealizadas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    // Ajuste da URL para incluir o caminho completo, considerando que o backend está na porta 3000
    axios
      .get("http://localhost:3000/vendas") // URL completa para a API de vendas
      .then((response) => {
        setVendas(response.data); // Armazena as vendas no estado
      })
      .catch((error) => {
        console.error("Erro ao carregar as vendas:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Vendas Realizadas</h1>
      <table className="table table-bordered table-striped table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Data</th>
            <th>Tipo de Pagamento</th>
            <th>Tenis ID</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id}>
              <td>{venda.id}</td>
              <td>R$ {Number(venda.total).toFixed(2)}</td>
              <td>{new Date(venda.data).toLocaleDateString("pt-BR")}</td> {/* Formato de data pt-BR */}
              <td>{venda.tipo_pagamento}</td>
              <td>{venda.tenis_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendasRealizadas;
