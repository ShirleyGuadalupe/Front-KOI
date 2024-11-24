import React from 'react';
import '../styles/Profile.css';

const Profile = () => {

  const pedidos = [
    {
      nombre: 'Megumi Design',
      precio: 45000,
      cantidad: 1,
      talla: 'M',
      color: 'Marrón',
      estado: 'Entregado',
    },
  ];

  return (
    <div className="profile-container">
      <h1>MI PERFIL</h1>
      <div className="profile-section">
        <h2>MIS PEDIDOS</h2>
        {pedidos.map((pedido, index) => (
          <div key={index} className="pedido-card">
            <div className="pedido-info">
              <img src="https://i.ibb.co/DWB5LLV/image.png" alt={pedido.nombre} className="pedido-img" />
              <div>
                <h3>{pedido.nombre}</h3>
                <p>${pedido.precio.toLocaleString()}</p>
                <p>Cantidad: {pedido.cantidad}</p>
                <p>Talla: {pedido.talla}</p>
                <p>Color: {pedido.color}</p>
              </div>
            </div>
            <div className="pedido-status">
              <p className={`status ${pedido.estado.toLowerCase()}`}>{pedido.estado}</p>
              <textarea placeholder="Valoraciones" className="valoraciones-input"></textarea>
            </div>
          </div>
        ))}
      </div>
      <div className="profile-section">
        <h2>Mis Solicitudes</h2>
        {/* Agregar lista de solicitudes*/}
        <div className="solicitud-card">Sin solicitudes pendientes</div>
      </div>
    </div>
  );
};

export default Profile;
