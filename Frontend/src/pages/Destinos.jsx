import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBar/NavBar.jsx";
import MainDestinosText from "../components/Main-Destinos/Main-Destinos-Text/Main-Destinos-Text.jsx";
import MainDestinosLugares from "../components/Main-Destinos/Main-Destinos-Lugares/Main-Destinos-Lugares.jsx";
import Footer from "../components/Footer/Footer.jsx"

const Destinos = () => {

    return(
        <div className="componentes-destinosUI">
            <Header />
            <NavBar />
            <MainDestinosText />
            <MainDestinosLugares />
            <Footer />
        </div>
    );
}

export default Destinos;