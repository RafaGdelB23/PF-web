import React from "react";
import HeaderV from "../components/Header/Header.jsx"
import TerminosCondicionesPage from "../components/Conditions/TC/TerminosCondicionesPage"
import Footer from "../components/Footer/Footer"

const TerminosCondiciones = () => {
    return (
        <div className="TerminosCondiciones-container">
        <HeaderV />
        <TerminosCondicionesPage />
        <Footer />
        </div>
    );
    }
    export default TerminosCondiciones