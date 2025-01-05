import React, { useState } from "react";
import axios from "axios";

const Vendas = () => {
  const [idProduto, setIdProduto] = useState("");
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const [loading, setLoading] = useState(false);

  // Buscar Produto
  const buscarProduto = () => {
    setMensagem({ tipo: "", texto: "" });
    setLoading(true);

    axios
      .get(`/api/tenis/${idProduto}`)
      .then((response) => {
        const produtoData = response.data;
        produtoData.precoVenda = parseFloat(produtoData.precoVenda);
        setProduto(produtoData);
        setLoading(false);
      })
      .catch(() => {
        setMensagem({ tipo: "erro", texto: "Produto não encontrado" });
        setProduto(null);
        setLoading(false);
      });
  };

  // Realizar Venda
  const realizarVenda = () => {
    if (!produto) {
      setMensagem({ tipo: "erro", texto: "Produto não encontrado" });
      return;
    }

    if (produto.quantidade < quantidade) {
      setMensagem({ tipo: "erro", texto: "Quantidade indisponível no estoque" });
      return;
    }

    if (!metodoPagamento) {
      setMensagem({ tipo: "erro", texto: "Selecione o método de pagamento" });
      return;
    }

    const valorTotal = produto.precoVenda * quantidade;

    setLoading(true);

    axios
      .post(`/api/tenis/${produto.id}/venda`, {
        quantidade,
        valorTotal,
        metodoPagamento,
      })
      .then(() => {
        setMensagem({ tipo: "sucesso", texto: "Venda realizada com sucesso!" });
        resetarFormulario();
        setLoading(false);
      })
      .catch(() => {
        setMensagem({ tipo: "erro", texto: "Erro ao realizar a venda" });
        setLoading(false);
      });
  };

  // Resetar Formulário
  const resetarFormulario = () => {
    setIdProduto("");
    setProduto(null);
    setQuantidade(1);
    setMetodoPagamento("");
    setMensagem({ tipo: "", texto: "" });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007BFF" }}>Realizar Venda</h2>

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

      {mensagem.texto && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: mensagem.tipo === "sucesso" ? "#d4edda" : "#f8d7da",
            color: mensagem.tipo === "sucesso" ? "#155724" : "#721c24",
          }}
        >
          {mensagem.texto}
        </div>
      )}

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
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>R$ {produto.precoVenda.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Estoque</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{produto.quantidade}</td>
              </tr>
            </tbody>
          </table>

          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
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

          <label>Método de Pagamento:</label>
          <select
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">Selecione...</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
            <option value="pix">Pix</option>
            <option value="dinheiro">Dinheiro</option>
          </select>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={realizarVenda}
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
              Realizar Venda
            </button>
            <button
              onClick={resetarFormulario}
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
      )}
    </div>
  );
};

export default Vendas;
