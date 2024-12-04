import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav className={`navbar-elements ${isMenuOpen ? "open" : ""}`}>
        <Link to={`/Destinos`} onClick={toggleMenu}>Destinos</Link>
        <Link to={`/PersonalizarViaje`} onClick={toggleMenu}>Personalizar Viaje</Link>
        <Link to={`/PaquetesTuristicos/Package`} onClick={toggleMenu}>Paquetes Turísticos</Link>
        <Link to={`/ReservaActividades/Activity`} onClick={toggleMenu}>Actividades</Link>
      </nav>
    </div>
  );
};

export default NavBar;
