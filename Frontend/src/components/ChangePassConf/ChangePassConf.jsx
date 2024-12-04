import React, { useRef, useState, useContext } from 'react';
import images from "../../public/img/images";
import InputField from '../InputFields';
import usePut from '../../hooks/UsePut';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import './ChangePassConf.css';

const URL = import.meta.env.VITE_BASE_URL;

const ChangePassConf = () => {
    const { user, removeToken } = useContext(AuthContext); 
    const [formData, setFormData] = useState({ email: user?.email || '', newPassword: '',confirmNewPassword: '' }); 
    const [confirmPassword, setConfirmPassword] = useState('');
    const { putData, error, loading } = usePut(`${URL}/api/users/changePass`);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
   

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('Las nuevas contraseñas no coinciden');
            console.log('Las nuevas contraseñas no coinciden', formData.newPassword, formData.confirmNewPassword);
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

export default ChangePassConf;
