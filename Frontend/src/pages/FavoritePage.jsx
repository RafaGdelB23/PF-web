import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBarProfile/NavBarProfile.jsx";
import FavoriteOffers from "../components/FavoriteOffers/FavoriteOffers.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Profile = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <FavoriteOffers />
      <Footer />
    </div>
  );
}

export default Profile;
