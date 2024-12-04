import React, { useRef, useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import './CodeConfLogin.css';

export const CodeConfLogin = () => {
  const { user, removeToken } = useContext(AuthContext);
  const form = useRef();
  const [codigoEnviado, setCodigoEnviado] = useState('');
  const [error, setError] = useState('');
  const [emailVerificado, setEmailVerificado] = useState('');  
  const navigate = useNavigate();

  const requestVerificationCode = () => {
    if (!form.current) {
      setError("Error interno. Por favor, recarga la página.");
      return;
    }

    const emailInput = form.current.elements['to_email'].value;
    if (!emailInput || !/\S+@\S+\.\S+/.test(emailInput)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    const codigo = Math.floor(1000 + Math.random() * 9000);
    const expiracion = new Date(Date.now() + 10 * 60 * 1000);

    form.current.elements['user_code'].value = codigo;
    form.current.elements['expiration'].value = expiracion.toISOString();
    setEmailVerificado(emailInput);  

    emailjs.sendForm('service_r84suq7', 'template_v32wfet', form.current, '7ekuPgQ5ro-EZPsfq')
      .then(
        (result) => {
          console.log('Correo enviado correctamente', result);
          setCodigoEnviado(codigo.toString());
          setError('');
        },
        (error) => {
          console.error('Error al enviar el correo', error);
          setError('Error al enviar el código. Por favor, inténtalo de nuevo.');
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputCode = form.current.elements['verification_code'].value;
    if (inputCode !== codigoEnviado) {
      setError('El código ingresado no coincide con el código enviado.');
      return;
    }

    navigate('/ChangePassLogin', { state: { email: emailVerificado } });
  };

  return (
    <div className="passwordConf-recovery-container">
      <h2>Recuperación de la cuenta</h2>
      <p>Esto ayuda a verificar que esta cuenta te pertenece.</p>
      <div className='passwordConf-container'>
        <form ref={form} onSubmit={handleSubmit}>
          <input type="hidden" name="user_code" />
          <input type="hidden" name="expiration" />
          <input type="email" name="to_email" placeholder="Tu correo electrónico" className="input-field" required />
          <input type="text" name="verification_code" placeholder="Escribe el código" className="input-field" />
          <button type="submit" className="submit-button">Verificar código</button>
          <button type="button" onClick={requestVerificationCode} className="submit-button">Solicitar nuevo código</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CodeConfLogin;
