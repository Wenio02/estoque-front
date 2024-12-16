import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListagemTenis = () => {
  const [tenisList, setTenisList] = useState([]);

  useEffect(() => {
    // Requisição para pegar a lista de tênis
    axios
      .get("/api/tenis")
      .then((response) => {
        setTenisList(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar os tênis: ", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/tenis/${id}`)
      .then(() => {
        setTenisList((prevList) => prevList.filter((tenis) => tenis.id !== id));
        toast.success("Excluído com sucesso!", {
          position: "top-right",
          autoClose: 3000, // Fecha após 3 segundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Erro ao excluir o tênis: ", error);
        toast.error("Erro ao excluir o tênis.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Tênis Cadastrados</h1>
      <table className="table table-bordered table-striped table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Numeração</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Preço de Custo</th>
            <th>Preço de Venda</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tenisList.map((tenis) => (
            <tr key={tenis.id}>
              <td>{tenis.id}</td> {/* Adiciona a coluna ID */}
              <td>{tenis.numeracao}</td>
              <td>{tenis.marca}</td>
              <td>{tenis.modelo}</td>
              <td>R$ {Number(tenis.preco_custo).toFixed(2)}</td>
              <td>R$ {Number(tenis.preco_venda).toFixed(2)}</td>
              <td>{tenis.quantidade}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(tenis.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Container do Toastify */}
      <ToastContainer />
    </div>
  );
};

export default ListagemTenis;
