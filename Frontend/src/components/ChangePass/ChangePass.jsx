import React, { useRef, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import images from "../../public/img/images";
import InputField from '../InputFields';
import usePut from '../../hooks/UsePut';
import { AuthContext } from "../../context/AuthContext";
import './ChangePass.css';

const ChangePass = () => {
    const { removeToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();  

    const email = location.state?.email; 

    
    const [formData, setFormData] = useState({ email: email || '', newPassword: '', confirmNewPassword: '' });
    const { putData, error, loading } = usePut(`${import.meta.env.VITE_BASE_URL}/api/users/changePass`);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('Las nuevas contraseñas no coinciden');
            return;
        }
        try {
            const res = await putData(formData);
            alert(res.message);
            removeToken();
            navigate('/login');
        } catch (e) {
            alert('Error: ' + e.message);
        }
    };

    return (
        <div className="changePassword-container">
            <div className="changePassword">
                <h2>Cambiar Contraseña</h2>
                <div className="inputField-container-pass">
                    <form onSubmit={handleSubmitChangePassword}>
                        <InputField
                            type="password"
                            placeholder="Nueva contraseña"
                            required
                            onChange={handleChange}
                            name="newPassword"
                            value={formData.newPassword}
                        />
                        <InputField
                            type="password"
                            placeholder="Confirmar contraseña"
                            required
                            onChange={handleChange}
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                        />
                        <button type="submit" disabled={loading} className="ChangePasswordButton">
                            Cambiar Contraseña
                        </button>
                    </form>
                </div>
                <div className="footer-links-change-password">
                    <a onClick={() => navigate('/login')}>Listo</a>
                </div>
            </div>
            <div className="change-password-image">
                <img src={images.ChangePass} alt="Imagen de cambio de contraseña" />
            </div>
        </div>
    );
};

export default ChangePass;
