import React, { useState } from "react";
import axios from "axios";

const Vendas = () => {
  const [idProduto, setIdProduto] = useState("");
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [erro, setErro] = useState("");

  const buscarProduto = () => {
    axios
      .get(`/api/tenis/${idProduto}`)
      .then(response => {
        setProduto(response.data);
        setErro(""); // Limpar erro caso o produto seja encontrado
      })
      .catch(error => {
        setErro("Produto não encontrado");
        setProduto(null);
      });
  };

  const realizarVenda = () => {
    console.log(produto);
    if (produto && produto.quantidade >= quantidade) {
      axios
        .post(`/api/tenis/${produto.id}/venda`, { quantidade: quantidade })
        .then(response => {
          // setProduto(null);
          // setIdProduto("");
          setQuantidade(response.quantidade);
        })
        .catch(error => {
          console.error("Erro ao realizar a venda", error);
        });
    } else {
      alert("Quantidade indisponível no estoque");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Vendas</h1>
      <div className="mb-4">
        <input
          type="text"
          value={idProduto}
          onChange={e => setIdProduto(e.target.value)}
          placeholder="Digite o ID do produto"
          className="form-control w-25 d-inline"
        />
        <button onClick={buscarProduto} className="btn btn-primary ml-2">
          Buscar Produto
        </button>
      </div>

      {erro && <div style={{ color: "red" }}>{erro}</div>}

      {produto && (
        <div>
          <h2>Detalhes do Produto</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Campo</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{produto.nome}</td>
              </tr>
              <tr>
                <td>ID</td>
                <td>{produto.id}</td>
              </tr>
              <tr>
                <td>Marca</td>
                <td>{produto.marca}</td>
              </tr>
              <tr>
                <td>Modelo</td>
                <td>{produto.modelo}</td>
              </tr>
              <tr>
                <td>Preço de Custo</td>
                <td>R${produto.precoCusto}</td>
              </tr>
              <tr>
                <td>Preço de Venda</td>
                <td>{produto.precoVenda}</td>
              </tr>
              <tr>
                <td>Estoque</td>
                <td>{produto.quantidade}</td>
              </tr>
            </tbody>
          </table>

          <div className="mb-3">
            <label>Quantidade: </label>
            <input
              type="number"
              value={quantidade}
              onChange={e => setQuantidade(e.target.value)}
              min="1"
              className="form-control w-25"
            />
          </div>

          <button onClick={realizarVenda} className="btn btn-success">
            Realizar Venda
          </button>
        </div>
      )}
    </div>
  );
};

export default Vendas;
