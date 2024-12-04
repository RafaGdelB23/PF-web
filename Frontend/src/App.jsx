import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { OfferProvider } from "./context/OfferContext.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Registro from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import CodeConfirm from "./pages/CodeConfirm.jsx";
import CodeConfirmLogin from "./pages/CodeConfirmLogin.jsx";
import ChangePasswordConfirm from "./pages/ChangePasswordConfirm.jsx"
import ChangePassLogin from "./pages/ChangePassLogin.jsx";
import Profile from "./pages/Profile.jsx";
import UserManagment from "./pages/UserManagment.jsx";
import OfferManagment from "./pages/OfferManagment.jsx";
import FavoritePage from "./pages/FavoritePage.jsx";
import Destinos from "./pages/Destinos.jsx";
import PlantillaDestinos from "./components/PlantillaDestinos/PlantillaDestinos.jsx";
import DestinosInformacion from "./components/DestinoInformacion/DestinoInformacion.jsx";
import PersonalizarViaje from "./pages/PersonalizarViaje.jsx";
import PaquetesTuristicos from "./components/PlantillaOfertas/PaquetesTuristicos.jsx";
import PlantillaOffer from "./components/PlantillaPaquete/PlantillaOffer.jsx";
import ReservaActividades from "./components/PlantillaOfertas/ReservaActividades.jsx";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad.jsx";
import TerminosCondiciones from "./pages/TerminosCondiciones.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Purchase from "./pages/PurchasePage.jsx";
import HistorialPagos from "./pages/HistorialPagos.jsx"

function App() {
  return (
    <AuthProvider>
      <OfferProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CodeConfirmLogin" element={<CodeConfirmLogin />} />
          <Route path="/CodeConfirm" element={<CodeConfirm />} />
          <Route path="/ChangePasswordConfirm" element={<ChangePasswordConfirm />} />
          <Route path="/ChangePassLogin" element={<ChangePassLogin />} />
          <Route
            path="/Perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserManagement"
            element={
              <ProtectedRoute>
                <UserManagment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OfferManagement"
            element={
              <ProtectedRoute>
                <OfferManagment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Favoritos"
            element={
              <ProtectedRoute>
                <FavoritePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Historial-Pagos"
            element={
              <ProtectedRoute>
                <HistorialPagos />
              </ProtectedRoute>
            }
          />
          <Route path="/PoliticaPrivacidad" element={<PoliticaPrivacidad />} />
          <Route path="/TerminosCondiciones" element={<TerminosCondiciones />}/>
          <Route path="/About-Us" element={<AboutUs />} />
          <Route path="/Destinos" element={<Destinos />} />
          <Route path="/Destinos/:category" element={<PlantillaDestinos />} />
          <Route path="/Destino/:id" element={<DestinosInformacion />} />
          <Route path="/PersonalizarViaje" element={<PersonalizarViaje />} />
          <Route path="/PaquetesTuristicos/:category" element={<PaquetesTuristicos />}/>
          <Route path="/ReservaActividades/:category" element={<ReservaActividades />}/>
          <Route path="/:category/:id" element={<PlantillaOffer />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/HistorialCompras" element={<HistorialPagos />} />


          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
      </OfferProvider>
    </AuthProvider>
  );
}

export default App;
