import React from "react";
import "./Footer.css";
import images from "../../public/img/images";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-column1">
          <ul>
            <li>
              <div className="about-us-link">
                <Link to="/About-Us">Sobre nosotros</Link>
              </div>
            </li>
            <li>
              <a href="#">Medios de pago</a>
            </li>
          </ul>
          <div className="payment-logos">
            <img src={images.Visa} alt="Visa" id="Visa" />
            <img src={images.MC} alt="MC" id="MC" />
          </div>
        </div>
        <div className="footer-column2">
          <img src={images.Logo} id="footerLogo" alt="Travel SV Logo" />
          <div className="social-icons">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={images.Instagram} alt="Instagram" />
            </a>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={images.WhatsApp} alt="WhatsApp" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={images.Facebook} alt="Facebook" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={images.X} alt="X" />
            </a>
            <a href="tel:+123456789" rel="noopener noreferrer">
              <img src={images.Telephone} alt="Telephone" />
            </a>
          </div>
        </div>

        <div className="footer-column3">
          <ul>
            <li>
              <Link to="/PoliticaPrivacidad">Política y privacidad</Link>
            </li>
            <li>
              <Link to="/TerminosCondiciones">Términos y condiciones</Link>
            </li>
            <li>
              <span>Travel SV ® | El Salvador Tour Operator</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
