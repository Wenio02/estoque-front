import React, { useState, useEffect } from "react";
import axios from "axios";

const PagamentosPrazo = () => {
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    axios.get("/api/pagamentos-prazo")
      .then(response => setPagamentos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Pagamentos a Prazo</h1>
      <table className="table table-bordered table-striped table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map(pagamento => (
            <tr key={pagamento.id}>
              <td>{pagamento.id}</td>
              <td>{pagamento.data}</td>
              <td>{pagamento.cliente}</td>
              <td>{pagamento.valor}</td>
              <td>{pagamento.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagamentosPrazo;
