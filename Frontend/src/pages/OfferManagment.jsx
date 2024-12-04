import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBar/NavBar.jsx";
import ManagmentOffer from "../components/ManagmentAdmin/ManagmentOffer.jsx"
import Footer from "../components/Footer/Footer.jsx";
const OfferManagment = () => {
    return (
        <div>
            <Header />
            <NavBar />
            <ManagmentOffer />
            <Footer />
        </div>
    );
}

export default OfferManagment;