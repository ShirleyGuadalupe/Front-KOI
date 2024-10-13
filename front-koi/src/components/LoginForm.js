import React, { useState } from 'react';
import '../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';


  const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', 
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }
      const data = await response.json();
      console.log('Login exitoso:', data);
      setTimeout(() => {
        navigate('/profile');
      }, 1);
    } catch (error) {
      console.error('Error al ingresar:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className='bienvenidos'>BIENVENIDO</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">CORREO ELECTRÓNICO</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">CONTRASEÑA</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn">Ingresar</button>
      </form>
      <p className='parrafo'>¿No tienes una cuenta? <a href="/register">Crea una</a></p>
    </div>
  );
};

export default LoginForm;
