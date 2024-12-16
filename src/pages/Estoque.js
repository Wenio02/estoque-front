import React, { useState, useEffect } from "react";
import axios from "axios";

const Estoque = () => {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    axios.get("/api/estoque")
      .then(response => setEstoque(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Controle de Estoque</h1>
      <table className="table table-bordered table-striped table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.marca}</td>
              <td>{item.modelo}</td>
              <td>{item.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estoque;
