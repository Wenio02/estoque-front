import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Importando o toast
import "react-toastify/dist/ReactToastify.css"; // Importando o estilo do Toastify
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Container,
  Grid,
  Box,
  Alert,
} from "@mui/material";

const CadastroTenis = ({ tennisId, onCancel }) => {
  const [tenis, setTenis] = useState({
    numeracao: "",
    marca: "",
    modelo: "",
    precoCusto: "",
    precoVenda: "",
    quantidade: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(( ) => {
     const valor = parseFloat(tenis.precoCusto)
     if(!isNaN(valor)){
      setTenis((prev)=>({
        ...prev,
        precoVenda: (valor * 1.5).toFixed(2)
      }))
     } else{
      setTenis((prev)=>({
        ...prev,
        precoVenda: ""
      }))
     }
     
    
  },[tenis.precoCusto])

  useEffect(() => {
    if (tennisId) {
      // Carregar dados para edição
      axios
        .get(`/api/tenis/${tennisId}`)
        .then((response) => setTenis(response.data))
        .catch(() =>
          setMessage({ type: "error", text: "Erro ao carregar dados do tênis." })
        );
    }
  }, [tennisId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenis({ ...tenis, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (tennisId) {
        await axios.put(`/api/tenis/${tennisId}`, tenis);
        setMessage({ type: "success", text: "Tênis atualizado com sucesso!" });
        toast.success("Tênis atualizado com sucesso!"); // Toast de sucesso de atualização
      } else {
        await axios.post("/api/tenis", tenis);
        setMessage({ type: "success", text: "Tênis cadastrado com sucesso!" });
        toast.success("Tênis cadastrado com sucesso!"); // Toast de sucesso de cadastro
      }
      // Resetar o formulário
      setTenis({
        numeracao: "",
        marca: "",
        modelo: "",
        precoCusto: "",
        precoVenda: "",
        quantidade: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao cadastrar/atualizar tênis." });
      toast.error("Erro ao cadastrar/atualizar tênis."); // Toast de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {tennisId ? "Editar Tênis" : "Cadastrar Tênis"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Numeração"
                name="numeracao"
                value={tenis.numeracao}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Marca"
                name="marca"
                value={tenis.marca}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Modelo"
                name="modelo"
                value={tenis.modelo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Preço de Custo"
                name="precoCusto"
                type="number"
                value={tenis.precoCusto}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Preço de Venda"
                name="precoVenda"
                type="number"
                value={tenis.precoVenda}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantidade"
                name="quantidade"
                type="number"
                value={tenis.quantidade}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
            >
              {loading ? <CircularProgress size={24} /> : tennisId ? "Atualizar" : "Cadastrar"}
            </Button>
            {onCancel && (
              <Button
                onClick={onCancel}
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ ml: 2 }}
              >
                Cancelar
              </Button>
            )}
          </Box>
        </form>
        {message && (
          <Box mt={3}>
            <Alert severity={message.type}>{message.text}</Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CadastroTenis;
