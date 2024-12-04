import React, { useRef, useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import './CodeConf.css';


export const CodeConf = () => {
  const { user, removeToken } = useContext(AuthContext);
  const form = useRef();
  const [codigoEnviado, setCodigoEnviado] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const requestVerificationCode = () => {
    if (!form.current) {
      console.error("Formulario no disponible.");
      setError("Error interno. Por favor, recarga la página.");
      return;
    }

    const codigo = Math.floor(1000 + Math.random() * 9000);
    const expiracion = new Date(Date.now() + 10 * 60 * 1000);

    const userCodeInput = form.current.elements['user_code'];
    const expirationInput = form.current.elements['expiration'];
    const toEmailInput = form.current.elements['to_email'];

    if (userCodeInput && expirationInput && toEmailInput) {
      userCodeInput.value = codigo;
      expirationInput.value = expiracion.toISOString();
      toEmailInput.value = user?.email;

      emailjs.sendForm('service_r84suq7', 'template_v32wfet', form.current, '7ekuPgQ5ro-EZPsfq')
        .then(
          (result) => {
            console.log(`Código generado: ${codigo}`);
            console.log(`Expiración: ${expiracion}`);
            setCodigoEnviado(codigo.toString());
            setError('');
          },
          (error) => {
            console.log('FAILED...', error.text);
            setError('Error al enviar el código. Por favor, inténtalo de nuevo.');
          }
        );
    } else {
      setError("Error interno. Faltan campos en el formulario.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.current) {
      setError("Formulario no disponible.");
      return;
    }

    const inputCode = form.current.elements['verification_code'].value;
    if (!/^\d+$/.test(inputCode)) {
      setError('El código debe ser solo numérico.');
      return;
    }

    if (inputCode !== codigoEnviado) {
      setError('El código ingresado no coincide con el código enviado.');
      return;
    }

    navigate('/ChangePasswordConfirm');
  };

  return (
    <div className="passwordConf-recovery-container">
      <h2>Recuperación de la cuenta</h2>
      <p>Esto ayuda a verificar que esta cuenta te pertenece.</p>
      <div className='passwordConf-container'>
      <form ref={form} onSubmit={handleSubmit}>
        <input type="hidden" name="user_code" />
        <input type="hidden" name="expiration" />
        <input type="hidden" name="to_email" />
        <input type="text" name="verification_code" placeholder="Escribe el código" className="input-field" />
        <button type="submit" className="submit-button">Verificar código</button>
        <button type="button" onClick={requestVerificationCode} className="submit-button">Solicitar nuevo código</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      </div>
    </div>
  );
};

export default CodeConf;