import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PagamentosPrazo = () => {
  const [idProduto, setIdProduto] = useState("");
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [cliente, setCliente] = useState("");
  const [status, setStatus] = useState("pendente");
  const [dataPagamento, setDataPagamento] = useState("");
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  // Buscar produto pelo ID
  const buscarProduto = () => {
    setLoading(true);
    axios
      .get(`/api/tenis/${idProduto}`)
      .then((response) => {
        setProduto(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Produto não encontrado");
        setProduto(null);
        setLoading(false);
      });
  };

  // Registrar pagamento a prazo
  const registrarPagamento = () => {
    if (!produto) {
      toast.error("Produto não encontrado");
      return;
    }

    if (produto.quantidade < quantidade) {
      toast.error("Quantidade indisponível no estoque");
      return;
    }

    if (!cliente || !dataPagamento) {
      toast.error("Todos os campos devem ser preenchidos!");
      return;
    }

    const valorTotal = produto.precoVenda * quantidade;

    const pagamento = {
      produto_id: produto.id,
      cliente,
      quantidade,
      valor_total: valorTotal,
      status_pagamento: status,
      data_pagamento: dataPagamento,
    };

    setLoading(true);

    axios
      .post("/api/pagamentos-prazo", pagamento)
      .then(() => {
        toast.success("Pagamento registrado com sucesso!");
        resetForm();
        setProduto(null);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Erro ao registrar pagamento.");
        setLoading(false);
      });
  };

  // Resetar formulário
  const resetForm = () => {
    setIdProduto("");
    setQuantidade(1);
    setCliente("");
    setStatus("pendente");
    setDataPagamento("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007BFF" }}>Pagamentos a Prazo</h2>

      {/* Campo para buscar o produto */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          value={idProduto}
          onChange={(e) => setIdProduto(e.target.value)}
          placeholder="Digite o ID do produto"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={buscarProduto}
          disabled={loading}
          style={{
            padding: "10px 16px",
            fontSize: "14px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Carregando..." : "Buscar Produto"}
        </button>
      </div>

      {/* Detalhes do produto */}
      {produto && (
        <div>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Detalhes do Produto</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>ID</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{produto.id}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Marca</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{produto.marca}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Modelo</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{produto.modelo}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Preço de Venda</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>R$ {produto.precoVenda}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Estoque</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{produto.quantidade}</td>
              </tr>
            </tbody>
          </table>

          {/* Formulário para registrar pagamento */}
          <div>
            <label>Quantidade:</label>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              min="1"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <label>Cliente:</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <label>Status do Pagamento:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
            </select>

            <label>Data de Pagamento:</label>
            <input
              type="date"
              value={dataPagamento}
              onChange={(e) => setDataPagamento(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={registrarPagamento}
                disabled={loading}
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Registrar Pagamento
              </button>
              <button
                onClick={resetForm}
                style={{
                  padding: "10px 16px",
                  fontSize: "14px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagamentosPrazo;
