import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const telefono = localStorage.getItem('telefono');
  const direccion = localStorage.getItem('direccion');
  const ciudad = localStorage.getItem('ciudad');
  const departamento = localStorage.getItem('departamento');

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mi Perfil</h1>
      <div className="profile-card">
        <div className="profile-info">
          <h2>{username}</h2>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Teléfono:</strong> {telefono}</p>
          <p><strong>Dirección:</strong> {direccion}</p>
          <p><strong>Ciudad:</strong> {ciudad}</p>
          <p><strong>Departamento:</strong> {departamento}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
