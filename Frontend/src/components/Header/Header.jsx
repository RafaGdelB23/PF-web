import React from "react";
import images from "../../public/img/images";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

const HeaderUI = () => {
  const { token } = useContext(AuthContext);
  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/">
          <img src={images.Logo} alt="Logo" />
        </Link>
      </div>
      <div className="funcionalities">
        {token ? (
           <nav className="navLinks">
           <Link to="/Perfil" id="Perfil" >
             <img src={images.PerfilLogo} alt="Perfil-Logo" />
           </Link>
         </nav>
        ) : (
          <div className="usersFunctions">
              <nav className="navLinks">
                <Link to="/Registro" id="Register">
                  Registrarse
                </Link>
                <Link to="/Login" id="Login">
                  Iniciar Sesión
                </Link>
              </nav>
            </div>
        )} 
      </div>
    </div>
  );
};

export default HeaderUI;

  