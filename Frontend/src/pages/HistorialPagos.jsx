import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBarProfile/NavBarProfile.jsx";
import HistorialPagos from "../components/HistorialPagos/HistorialPagos";
import Footer from "../components/Footer/Footer.jsx";

const Profile = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <HistorialPagos />
      <Footer />
    </div>
  );
}

export default Profile;
