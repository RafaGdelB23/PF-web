import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBar/NavBar.jsx";
import Filters from "../components/Filtros/Filtros.jsx";
import Footer from "../components/Footer/Footer.jsx"

const PersonalizarViaje = () => {
    return(
        
        <div className="personalizar-container">
            <Header />
            <NavBar />
            <Filters />
            <Footer />
        </div>
    );
}

export default PersonalizarViaje;