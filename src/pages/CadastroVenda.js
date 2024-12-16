import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CadastroVenda = () => {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/vendas", {
        produto,
        quantidade,
        preco,
      });

      // Redireciona para a página de Vendas após salvar
      navigate("/vendas");
    } catch (error) {
      console.error("Erro ao salvar a venda", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Venda</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="produto">
          <Form.Label>Produto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do produto"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="quantidade">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite a quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="preco">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
};

export default CadastroVenda;
