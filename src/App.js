import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import CadastroTenis from "./pages/CadastroTenis";
import Vendas from "./pages/Vendas";
import Dashboard from './components/DashboardCard';
import PagamentosPrazo from "./pages/PagamentosPrazo";
import VendaPrazo from "./pages/ListarPagamentosPrazo";
import ListagemTenis from './pages/ListagemTenis';
import VendasRealizadas from './pages/vendasrealizadas'; // Adicionei a importação do componente VendasRealizadas
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro-tenis" element={<CadastroTenis />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/pagamentos-prazo" element={<PagamentosPrazo />} />
            <Route path="/estoque" element={<VendaPrazo/>} />
            <Route path="/pesquisar" element={<ListagemTenis />} />
            <Route path="/vendas-realizadas" element={<VendasRealizadas />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
};

export default App;
