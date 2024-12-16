import axios from "axios";

export const getPagamentos = () => axios.get("/api/pagamentos-prazo");
