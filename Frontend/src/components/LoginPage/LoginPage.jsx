import React, { useState, useContext } from 'react';
import images from "../../public/img/images";
import InputField from '../InputFields.jsx';
import usePost from '../../hooks/UsePost';
import { AuthContext } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import  { saveToken, saveUser } from "../../utils/Utils.js";
import './LoginPage.css';

const URL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
    const { handleSaveToken, handleSaveUser } = useContext(AuthContext); 
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState({});
    const { postData, error, loading } = usePost(`${URL}/api/users/login`);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateFields = () => {
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = "El correo electrónico es requerido.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = "Debe ser un correo electrónico válido.";
            }
        }

        if (!formData.password.trim()) {
            errors.password = "La contraseña es requerida.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return; 
        }

        try {
            const res = await postData(formData);
            if (res.token && res.user) {
                handleSaveToken(res.token);
                handleSaveUser(res.user);
                saveToken(res.token);
                saveUser(res.user);
                navigate("/");
            } else {
                setFieldErrors({ general: 'Inicio de sesión fallido. Verifica tus datos.' });
            }a
        } catch (e) {
            setFieldErrors({ general: e.message || 'Error al iniciar sesión.' });
        }
    };

    return (
        <div className="loginUser-container">
            <div className="loginUser">
                <h2>Inicia sesión en tu cuenta</h2>
                <div className="inputField-container">
                    <form onSubmit={handleSubmitLogin}>
                        <div>
                            <InputField
                                type="email"
                                placeholder="Correo electrónico"
                                onChange={handleChange}
                                name="email"
                                value={formData.email}
                            />
                            {fieldErrors.email && <div className="error">{fieldErrors.email}</div>}
                        </div>
                        <div>
                            <InputField
                                type="password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                name="password"
                                value={formData.password}
                            />
                            {fieldErrors.password && (
                                <div className="error">{fieldErrors.password}</div>
                            )}
                        </div>
                        {fieldErrors.general && (
                            <div className="error-general">{fieldErrors.general}</div>
                        )}
                        <div className="LoginButton">
                            <button type="submit" disabled={loading}>Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
                <div className="footer-links-login">
                    <a onClick={() => navigate('/Registro')}>¿No posees cuenta? Regístrate aquí</a>
                    <a onClick={() => navigate('/CodeConfirmLogin')}>¿Has olvidado tu contraseña?</a>
                </div>
            </div>
            <div className="login-image">
                <img src={images.LoginImage} alt="Vista hermosa" />
            </div>
        </div>
    );    
};

export default LoginPage;
