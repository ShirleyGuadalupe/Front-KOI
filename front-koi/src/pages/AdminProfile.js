import React, { useState, useEffect } from "react";
import "../styles/AdminProfile.css";

const AdminProfile = () => {
  const [collections, setCollections] = useState([]);
  const [subCollections, setSubCollections] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCollections();
    fetchSubCollections();
    fetchColors();
    fetchCategories();
  }, []);

  const fetchSubCollections = async () => {
  const response = await fetch("https://api-koi-production.up.railway.app/api/sub-colecciones");
  const data = await response.json();
  setSubCollections(data);
  };

  const fetchCollections = async () => {
    const response = await fetch("https://api-koi-production.up.railway.app/api/colecciones");
    const data = await response.json();
    setCollections(data);
  };

  const fetchColors = async () => {
    const response = await fetch("https://api-koi-production.up.railway.app/api/colores");
    const data = await response.json();
    setColors(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("https://api-koi-production.up.railway.app/api/tipo");
    const data = await response.json();
    setCategories(data);
  };

  // Add Collection
  const addCollection = async () => {
    const token = localStorage.getItem('token'); 
    const nombre = prompt("Ingrese el nombre de la colección:");
    if (nombre) {
      await fetch("https://api-koi-production.up.railway.app/api/colecciones", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre }),
      });
      fetchCollections();
    }
  };

  // Add SubCollection
  const addSubCollection = async (coleccionId) => {
    const token = localStorage.getItem('token'); 
    const nombre = prompt("Ingrese el nombre de la subcolección:");
    if (nombre) {
      await fetch("https://api-koi-production.up.railway.app/api/sub-colecciones", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, coleccionId }),
      });
      
      fetchSubCollections();
    }
  };

  // Update SubCollection
  const updateSubCollection = async (id) => {
    const token = localStorage.getItem('token');
    const nombre = prompt("Ingrese el nuevo nombre de la colección:");
    if (nombre) {
      await fetch(`https://api-koi-production.up.railway.app/api/sub-colecciones/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre }),
      });
      fetchSubCollections();
    }
  };

  // Delete subCollection
  const deleteSubCollection = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`https://api-koi-production.up.railway.app/api/sub-colecciones/${id}`, { 
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
     });
    fetchSubCollections();
  };

  // Delete Collection
  const deleteCollection = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`https://api-koi-production.up.railway.app/api/colecciones/${id}`, { 
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      } });
    fetchCollections();
  };

  // Update Collection
  const updateCollection = async (id) => {
    const token = localStorage.getItem('token');
    const nombre = prompt("Ingrese el nuevo nombre de la colección:");
    if (nombre) {
      await fetch(`https://api-koi-production.up.railway.app/api/colecciones/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre }),
      });
      fetchCollections();
    }
  };

  const addColor = async () => {
    const token = localStorage.getItem("token");
    const hex = prompt("Selecciona el color en formato hexadecimal (ej: #FF5733):");
    if (hex && /^#([0-9A-F]{3}){1,2}$/i.test(hex)) { // Validar formato hexadecimal
      const response = await fetch("https://api-koi-production.up.railway.app/api/colores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ hex }),
      });
      if (response.ok) {
        fetchColors(); // Refrescar lista de colores
      } else {
        alert("Error al añadir el color.");
      }
    } else {
      alert("El formato de color no es válido.");
    }
  };

  // Update Color
const updateColor = async (id) => {
  const token = localStorage.getItem("token");
  const hex = prompt("Ingrese el nuevo color en formato hexadecimal (ej: #FF5733):");
  if (hex && /^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    const response = await fetch(`https://api-koi-production.up.railway.app/api/colores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ hex }),
    });
    if (response.ok) {
      fetchColors(); // Refrescar lista de colores
    } else {
      alert("Error al actualizar el color.");
    }
  } else {
    alert("El formato de color no es válido.");
  }
};

// Delete Color
const deleteColor = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`https://api-koi-production.up.railway.app/api/colores/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (response.ok) {
    fetchColors(); // Refrescar lista de colores
  } else {
    alert("Error al eliminar el color.");
  }
};


  const addCategory = async () => {
    const token = localStorage.getItem("token");
    const nombre = prompt("Ingrese el nombre de la categoría:");
    const precio = prompt("Ingrese el precio de la categoría:");
    if (nombre && precio && !isNaN(precio)) { // Validar datos
      const response = await fetch("https://api-koi-production.up.railway.app/api/tipo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
      });
      if (response.ok) {
        fetchCategories(); // Refrescar lista de categorías
      } else {
        alert("Error al añadir la categoría.");
      }
    } else {
      alert("Datos inválidos. Asegúrate de que el precio sea numérico.");
    }
  };

  // Update Category
const updateCategory = async (id) => {
  const token = localStorage.getItem("token");
  const nombre = prompt("Ingrese el nuevo nombre de la categoría:");
  const precio = prompt("Ingrese el nuevo precio de la categoría:");
  if (nombre && precio && !isNaN(precio)) {
    const response = await fetch(`https://api-koi-production.up.railway.app/api/tipo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, precio: parseFloat(precio) }),
    });
    if (response.ok) {
      fetchCategories(); // Refrescar lista de categorías
    } else {
      alert("Error al actualizar la categoría.");
    }
  } else {
    alert("Datos inválidos. Asegúrate de que el precio sea numérico.");
  }
};

// Delete Category
const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`https://api-koi-production.up.railway.app/api/tipo/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (response.ok) {
    fetchCategories(); // Refrescar lista de categorías
  } else {
    alert("Error al eliminar la categoría.");
  }
};

  

  return (
    <div className="admin-profile-container">
      <h1 className="title">MI PERFIL</h1>

      {/* Colecciones */}
      <div className="section">
        <h2>Colecciones</h2>
        <ul className="list">
  {collections.map((collection) => (
    <li key={collection.id}>
      <strong>{collection.nombre}</strong>
      <button onClick={() => updateCollection(collection.id)}>✏️</button>
      <button onClick={() => deleteCollection(collection.id)}>🗑️</button>
      <button onClick={() => addSubCollection(collection.id)}>➕ SubColección</button>
      
      {/* Subcolecciones */}
      <ul className="sublist">
        {subCollections
          .filter((sub) => sub.coleccionId === collection.id) // Subcolecciones vinculadas
          .map((sub) => (
            <li key={sub.id}>
              {sub.nombre}
              <button onClick={() => updateSubCollection(sub.id)}>✏️</button>
              <button onClick={() => deleteSubCollection(sub.id)}>🗑️</button>
            </li>
          ))}
      </ul>
    </li>
  ))}
</ul>
        <button className="add-btn" onClick={addCollection}>Añadir colección ➕</button>
      </div>

      {/* Colores */}
      <div className="section">
  <h2>Colores</h2>
  <div className="colors">
    {colors.map((color) => (
      <div key={color.id} className="color-box-container">
        <div
          style={{ backgroundColor: color.hex }}
          className="color-box"
        />
        <button onClick={() => updateColor(color.id)}>✏️</button>
        <button onClick={() => deleteColor(color.id)}>🗑️</button>
      </div>
    ))}
  </div>
  <button className="add-btn" onClick={addColor}>Añadir color ➕</button>
</div>

      {/* Categorías */}
      <div className="section">
  <h2>Categorías</h2>
  <div className="categories">
    {categories.map((category) => (
      <div key={category.id} className="category-container">
        <span>{category.nombre} (${category.precio})</span>
        <button onClick={() => updateCategory(category.id)}>✏️</button>
        <button onClick={() => deleteCategory(category.id)}>🗑️</button>
      </div>
    ))}
  </div>
  <button className="add-btn" onClick={addCategory}>Añadir categoría ➕</button>
</div>

      {/* Tallas */}
      <div className="section">
        <h2>Tallas</h2>
        <div className="sizes">
          {["S", "M", "L", "XL"].map((size) => (
            <span key={size} className="size">{size}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
