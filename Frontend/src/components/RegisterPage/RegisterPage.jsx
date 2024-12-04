import React, { useState, useContext } from "react";
import InputField from "../InputFields.jsx";
import usePost from "../../hooks/UsePost";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import images from "../../public/img/images";
import "./RegisterPage.css";

const URL = import.meta.env.VITE_BASE_URL;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const { handleSaveToken, handleSaveUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postData, error, loading } = usePost(`${URL}/api/users/register`);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 8) {
        const formattedPhone = onlyNumbers.replace(/(\d{4})(\d{1,4})?/, "$1-$2");
        setFormData({
          ...formData,
          [name]: formattedPhone,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateField = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es requerido.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Debe ser un correo electrónico válido.";
      }
    }

    if (!formData.phone.trim()) {
      errors.phone = "El teléfono es requerido.";
    } else {
      const phoneRegex = /^\d{4}-\d{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = "El número de teléfono debe estar en el formato XXXX-XXXX.";
      }
    }

    if (!formData.password.trim()) {
      errors.password = "La contraseña es requerida.";
    } else {
      const password = formData.password;
      if (password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres.";
      } else if (!/[A-Z]/.test(password)) {
        errors.password = "Debe tener al menos una letra mayúscula.";
      } else if (!/\d/.test(password)) {
        errors.password = "Debe tener al menos un número.";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.password = "Debe tener al menos un carácter especial.";
      }
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Debes confirmar la contraseña.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (!formData.firstName.trim()) {
      errors.firstName = "El nombre es requerido.";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "El apellido es requerido.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (!validateField()) {
      return; 
    }

    const { email, password, phone, firstName, lastName } = formData;

    const dataToSend = { email, password, phone, firstName, lastName };

    try {
      const res = await postData(dataToSend);
      handleSaveToken(res.token);
      handleSaveUser(res.user);
      navigate("/Login");
    } catch (e) {
      setFieldErrors({ general: e.message }); 
    }
  };

  return (
    <div className="Register-container">
      <div className="RegisterUser">
        <h2>Registrarse</h2>
        <div className="inputField-container">
          <form onSubmit={handleSubmitRegister}>
            {fieldErrors.general && (
              <div className="error">{fieldErrors.general}</div>
            )}
            <div>
              <InputField
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
            </div>
            <div>
              <InputField
                name="phone"
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                maxLength="9"
              />
              {fieldErrors.phone && <div className="error">{fieldErrors.phone}</div>}
            </div>
            <div>
              <InputField
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {fieldErrors.password && (
                <div className="error">{fieldErrors.password}</div>
              )}
            </div>
            <div>
              <InputField
                name="confirmPassword"
                type="password"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {fieldErrors.confirmPassword && (
                <div className="error">{fieldErrors.confirmPassword}</div>
              )}
            </div>
            <div>
              <InputField
                name="firstName"
                type="text"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
              />
              {fieldErrors.firstName && (
                <div className="error">{fieldErrors.firstName}</div>
              )}
            </div>
            <div>
              <InputField
                name="lastName"
                type="text"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
              />
              {fieldErrors.lastName && (
                <div className="error">{fieldErrors.lastName}</div>
              )}
            </div>
            <div className="RegisterButton">
              <button
                type="submit"
                disabled={loading}
                className="RegistrarseButton"
              >
                Regístrate
              </button>
            </div>
          </form>
        </div>
        <div className="footer-links-register">
          <a onClick={() => navigate("/login")}>
            ¿Ya tienes cuenta? Inicia sesión aquí
          </a>
        </div>
      </div>
      <div className="Register-image">
        <img src={images.RegistrarseImage} alt="Vista inspiradora" />
      </div>
    </div>
  );
};

export default RegisterPage;
