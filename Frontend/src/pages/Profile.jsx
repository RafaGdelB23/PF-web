import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBarProfile/NavBarProfile.jsx";
import ProfileUser from "../components/ProfileUser/ProfileUser.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Profile = () => {
  return (
    <div>
      <Header />
      <NavBar />
      <ProfileUser />
      <Footer />
    </div>
  );
}

export default Profile;
