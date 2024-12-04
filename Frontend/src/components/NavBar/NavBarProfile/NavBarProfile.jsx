import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBarProfile.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav className={`navbar-elements ${menuOpen ? "open" : ""}`}>
        <Link to={`/Favoritos`} onClick={() => setMenuOpen(false)}>Favoritos</Link>
        <Link to={`/Historial-Pagos`} onClick={() => setMenuOpen(false)}>Historial de pagos</Link>
      </nav>
    </div>
  );
};

export default NavBar;
