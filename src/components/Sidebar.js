import React from "react";
import { Link } from "react-router-dom";
import { FaTshirt, FaBox, FaCashRegister, FaFileInvoiceDollar, } from "react-icons/fa";
import SearchIcon from '@mui/icons-material/Search';
import "../styles/global.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">HighheelsOficial</div>
      <ul>
        <li>
          <Link to="/">
            <FaTshirt className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/cadastro-tenis">
            <FaBox className="icon" /> Cadastro de Tênis
          </Link>
        </li>
        <li>
          <Link to="/vendas">
            <FaCashRegister className="icon" /> Vendas
          </Link>
        </li>
        <li>
          <Link to="/pagamentos-prazo">
            <FaFileInvoiceDollar className="icon" /> Pagamentos a Prazo
          </Link>
        </li>
        <li>
          <Link to="/estoque">
            <FaBox className="icon" /> Listar vendas a Prazo
          </Link>
          
        </li>

        <li>
          <Link to="/pesquisar">
            <SearchIcon className="icon" /> Pesquisar
          </Link>
          
        </li>

        <li>
          <Link to="/vendas-realizadas">
          <FaCashRegister className="icon" /> vendas realizadas
          </Link>
          
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
