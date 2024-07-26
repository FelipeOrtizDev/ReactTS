import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/Sabesp.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <ul className={`navbar-nav ${isOpen ? "active" : ""}`}>
          <li className="nav-item dropdown">
            <a href="#home">Cadastro</a>
            <ul className="dropdown-content">
              <li>
                <Link to="/usuario">Usuários</Link>
              </li>
              <li>
                <a href="#option2">Empresas</a>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a href="#about">Solicitações</a>
            <ul className="dropdown-content">
              <li>
                <a href="#option1">Fechamentos</a>
              </li>
              <li>
                <a href="#option2">Pesquisa</a>
              </li>
              <li>
                <Link to="/vrffechamento">Verificação de Fechamento</Link>
              </li>
              <li className="">
                <a href="#option4">Geofonamento</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/servicosemandamento">Serviços em Andamento</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Header;
