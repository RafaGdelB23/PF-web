import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBar/NavBar.jsx";
import HeroPage from "../components/Main/HeroPage/HeroPage.jsx"
import MainInfo from "../components/Main/Main-Info/Main-Info.jsx";
import Footer from "../components/Footer/Footer.jsx"

const Home = () => {
  return (
    <div className="container-home">
      <Header />
      <NavBar />
      <HeroPage />
      <MainInfo />
      <Footer/>
    </div>
  );
};

export default Home;
