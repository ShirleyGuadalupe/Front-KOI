import React, { useState } from 'react';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', 
    email: '', 
    password: '',
    telefono: '', 
    departamento: '',
    ciudad: '',
    direccion: '', 
    isAdmin: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmpassword) {
      setError('Las contraseñas no coinciden');
      setMessage('');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
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
      console.log('Registro exitoso:', data);
      setMessage('Cuenta creada con éxito');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('No se pudo crear la cuenta');
      setMessage('');
    }
  };

  return (
    <div className="register-container">
      <h2>PARA COMPRAR CON ESTILO, CREA TU CUENTA</h2>
      {message && <div className="popup">{message}</div>}
      {error && <div className="popuperror">{error}</div>}
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name= "username" placeholder="Nombre" onChange={handleChange} required/>
          <input type="text" name="direccion" placeholder="Dirección" onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <input type="text" name='apellido' placeholder="Apellido" onChange={handleChange} required/>
          <input type="text" name='ciudad' placeholder="Ciudad" onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <input type="text" name='telefono' placeholder="Celular" onChange={handleChange} required/>
          <input type="text" name='departamento' placeholder="Departamento" onChange={handleChange} required/>
        </div>
        <input type="email" name='email' placeholder="Correo Electrónico" onChange={handleChange} required/>
        <input type="email" name='confirmemail' placeholder="Confirmar Correo Electrónico"  onChange={handleChange} required/>
        <input type="password" name='password' placeholder="Contraseña" onChange={handleChange} required />
        <input type="password" name='confirmpassword' placeholder="Confirmar Contraseña" onChange={handleChange} required/>
        <button type="submit" className="btn-register">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Register;
