import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
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
  const [snackbar, setSnackbar] = useState({ open: false, type: "", message: "" });

  useEffect(() => {
    if (tennisId) {
      axios
        .get(`/api/tenis/${tennisId}`)
        .then((response) => setTenis(response.data))
        .catch(() => showSnackbar("error", "Erro ao carregar dados do tênis."));
    }
  }, [tennisId]);

  useEffect(() => {
    if (tenis.precoCusto) {
      const precoVenda = (parseFloat(tenis.precoCusto) * 1.5).toFixed(2);
      setTenis((prev) => ({ ...prev, precoVenda }));
    }
  }, [tenis.precoCusto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenis({ ...tenis, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tennisId) {
        await axios.put(`/api/tenis/${tennisId}`, tenis);
        showSnackbar("success", "Tênis atualizado com sucesso!");
      } else {
        await axios.post("/api/tenis", tenis);
        showSnackbar("success", "Tênis cadastrado com sucesso!");
      }
      resetForm();
    } catch (error) {
      showSnackbar("error", "Erro ao cadastrar/atualizar tênis.");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (type, message) => {
    setSnackbar({ open: true, type, message });
  };

  const resetForm = () => {
    setTenis({
      numeracao: "",
      marca: "",
      modelo: "",
      precoCusto: "",
      precoVenda: "",
      quantidade: "",
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 4,
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {tennisId ? "Editar Tênis" : "Cadastrar Tênis"}
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary" mb={3}>
        Preencha os campos abaixo para {tennisId ? "editar" : "cadastrar"} um tênis.
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Preço de Venda"
              name="precoVenda"
              type="number"
              value={tenis.precoVenda}
              fullWidth
              required
              variant="outlined"
              InputProps={{ readOnly: true }}
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
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mr: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : tennisId ? "Atualizar" : "Cadastrar"}
          </Button>
          {onCancel && (
            <Button
              onClick={onCancel}
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ ml: 1 }}
            >
              Cancelar
            </Button>
          )}
        </Box>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CadastroTenis;
