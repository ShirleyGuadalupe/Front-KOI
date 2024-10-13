import React, { useState } from 'react';
import '../styles/LoginForm.css';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Aquí puedes agregar lógica para manejar la autenticación
  };

  return (
    <div className="login-container">
      <h2 className='bienvenidos'>BIENVENIDO</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">CORREO ELECTRÓNICO</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">CONTRASEÑA</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
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
