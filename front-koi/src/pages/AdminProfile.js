import React from "react";
import "../styles/AdminProfile.css";

const AdminProfile = () => {
  return (
    <div className="admin-profile-container">
      <h1 className="title">MI PERFIL</h1>
      
      {/* Mis Colecciones */}
      <div className="section">
        <h2>Mis Colecciones</h2>
        <ul className="list">
          <li>ANIME <button>🗑️</button></li>
          <li>JUJUTSU KAISEN <button>🗑️</button></li>
        </ul>
        <button className="add-btn">Añadir colecciones ➕</button>
      </div>

      {/* Colores */}
      <div className="section">
        <h2>Colores</h2>
        <div className="colors">
          {["#5B453A", "#765A50", "#4E4135", "#B3B3B3", "#FAF7F0", "#FFCCE7", "#5E80CB", "#8AC7F4"].map(color => (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className="color-box"
            />
          ))}
        </div>
        <button className="add-btn">Añadir colores ➕</button>
      </div>

      {/* Tallas */}
      <div className="section">
        <h2>Tallas</h2>
        <div className="sizes">
          {["S", "M", "L", "XL"].map(size => (
            <span key={size} className="size">{size}</span>
          ))}
        </div>
        <button className="add-btn">Añadir tallas ➕</button>
      </div>

      {/* Categorías */}
      <div className="section">
        <h2>Categorías</h2>
        <div className="categories">
          <span className="category">UNISEX</span>
          <span className="category">OVERSIZE</span>
        </div>
        <button className="add-btn">Añadir categorías ➕</button>
      </div>

      {/* Pedidos */}
      <div className="section">
        <h2>Fabricación</h2>
        <div className="status fabrication">Pedido X</div>
        <h2>En camino</h2>
        <div className="status shipping">Pedido Y</div>
        <h2>Entregas Finalizadas</h2>
        <div className="status delivered">Pedido Z</div>
      </div>

      {/* Información adicional */}
      <div className="section">
        <h2>Información Adicional</h2>
        <ul className="info-list">
          {["Quiénes somos", "Nuestra misión", "Nuestra visión", "Información adicional", "Contactos"].map(item => (
            <li key={item}>
              {item} <button className="edit-btn">✏️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProfile;
