import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import './login.component.css';
import { validateForm } from '../../helpers/Fields.validations';
import { login } from '../../services/login.service';
import * as toast from '../../helpers/Toast';

const Login = () => {
  const navigate = useNavigate();
  // ----->  Declaramos campos en los state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // -----> Validar datos de los campos
    const isValid = await validateForm(formData, event);
    if (isValid) {
      // -----> Enviar el formulario utilizando Axios
      try {
        const auth = await login(formData);
        if (auth.length == 0) {
          toast.error('Usuario y contraseña no son correctas!');
          return false;
        }
        window.localStorage.setItem('userProfile', JSON.stringify(auth))
        window.location.replace('/quiz');
      } catch (error) {
        toast.error('Se presento un error con el servidor')
      }
    }
  };
  const register = () => {
    navigate('/register', { replace: true });
  }
  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit} noValidate>
        <h1>Inicio de sesion</h1>
        <div className='content'>
          <div className='input-field'>
            <label className='hide' htmlFor='email'>Correo electronico</label>
            <input type='email' placeholder='Correo electronico' id='email' name='email' onChange={handleInputChange} value={formData.email} required />
          </div>
          <div className='input-field'>
            <label className='hide' htmlFor='password'>Contraseña</label>
            <input type='password' placeholder='Contraseña' id='password' name='password' onChange={handleInputChange} value={formData.password} required/>
          </div>
        </div>
        <div className='action'>
          <button type='button' onClick={register}>Registrar</button>
          <button type='submit'>Acceder</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
