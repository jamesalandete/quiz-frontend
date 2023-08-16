import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './register.component.css';
import { validateForm } from '../../helpers/Fields.validations';
import { register } from '../../services/login.service';
import * as toast from '../../helpers/Toast';

const Register = () => {
  const navigate = useNavigate();
  // ----->  Declaramos campos en los state
  const [formData, setFormData] = useState({
    name: '',
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
        const reg: any = await register(formData);
        if (!reg?.token) {
          toast.error('No se logro registrar con exito!');
          return false;
        }
        window.localStorage.setItem('userProfile', JSON.stringify(reg))
        window.location.replace('/quiz');
      } catch (error) {
        toast.error('Se presento un error con el servidor')
      }
    }
  };

  const login = () => {
    navigate('/login', { replace: true });
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit} noValidate>
        <h1>Registrarme</h1>
        <div className='content'>
          <div className='input-field'>
            <label className='hide' htmlFor='email'>Nombre completo</label>
            <input type='text' placeholder='Nombre Completo' id='name' name='name' onChange={handleInputChange} value={formData.name} required />
          </div>
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
          <button type='button' onClick={() => login()}>Inicio de sesion</button>
          <button type='submit'>Registrarme</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
