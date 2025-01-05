import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";

const ListarPrazo = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [observacoes, setObservacoes] = useState(""); // Estado para armazenar as observações
  const [editingPayment, setEditingPayment] = useState(null); // Estado para controlar o pagamento que está sendo editado
  const [erro, setErro] = useState(""); // Estado para armazenar erros de requisições

  // Buscar pagamentos a prazo
  useEffect(() => {
    axios
      .get("/api/pagamentos-prazo")
      .then((response) => {
        setPagamentos(response.data);
      })
      .catch((error) => {
        setErro("Erro ao carregar os pagamentos");
        console.error(error);
      });
  }, []);

  // Função para abrir o campo de edição
  const handleEditClick = (pagamento) => {
    setEditingPayment(pagamento); // Armazenar o pagamento que está sendo editado
    setObservacoes(pagamento.observacoes || ""); // Preencher com as observações existentes ou vazio
  };

  // Função para salvar as observações
  const handleSaveObservacoes = () => {
    if (editingPayment) {
      // Atualizar as observações do pagamento
      axios
        .put(`/api/pagamentos-prazo/${editingPayment._id}`, {
          observacoes: observacoes,
        })
        .then((response) => {
          // Atualizar o estado de pagamentos
          setPagamentos((prevPagamentos) =>
            prevPagamentos.map((pagamento) =>
              pagamento._id === editingPayment._id
                ? { ...pagamento, observacoes: observacoes }
                : pagamento
            )
          );
          setEditingPayment(null); // Fechar o campo de edição
          setObservacoes(""); // Limpar as observações
        })
        .catch((error) => {
          setErro("Erro ao salvar observações");
          console.error("Erro ao salvar observações", error);
        });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Pagamentos a Prazo
      </Typography>

      {erro && (
        <Typography color="error" variant="body1" align="center" sx={{ mb: 3 }}>
          {erro}
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Pagamento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagamentos.map((pagamento) => (
              <TableRow key={pagamento._id}>
                <TableCell>{pagamento.id}</TableCell>
                <TableCell>{pagamento.produto_id}</TableCell>
                <TableCell>{pagamento.cliente}</TableCell>
                <TableCell>{pagamento.quantidade}</TableCell>
                <TableCell>
                  R$
                  {isNaN(parseFloat(pagamento.valor))
                    ? "Valor inválido"
                    : parseFloat(pagamento.valor).toFixed(2)}
                </TableCell>
                <TableCell>{pagamento.status_pagamento}</TableCell>
                <TableCell>{pagamento.data_pagamento}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => handleEditClick(pagamento)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingPayment && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Editar Observações para o Pagamento {editingPayment._id}
          </Typography>
          <TextField
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Observações"
            placeholder="Digite suas observações aqui..."
          />
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveObservacoes}
              sx={{ mr: 2 }}
            >
              Salvar Observações
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditingPayment(null)} // Fechar o campo de edição
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ListarPrazo;
