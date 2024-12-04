import React from "react";
import Header from "../components/Header/Header.jsx";
import NavBar from "../components/NavBar/NavBar/NavBar.jsx";
import ManagmentUser from "../components/ManagmentAdmin/ManagmentUser.jsx"
import Footer from "../components/Footer/Footer.jsx";

const UserMangment = () => {
    return (
        <div>
            <Header />
            <NavBar />
            <ManagmentUser />
            <Footer />
        </div>
    );
}

export default UserMangment;