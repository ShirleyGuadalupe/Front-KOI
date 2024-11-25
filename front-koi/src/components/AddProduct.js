import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    nombre: "",
    lanzamiento: false,
    oferta: false,
    subColeccionId: 1,
  });
  const [subcolecciones, setSubcolecciones] = useState([]);

  useEffect(() => {
    fetch('https://api-koi-production.up.railway.app/api/sub-colecciones')
      .then(response => response.json())
      .then(data => {
        setSubcolecciones(data);
      })
      .catch(error => console.error('Error al obtener subcolecciones:', error));
  }, []);
  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      const response = await fetch('https://api-koi-production.up.railway.app/api/camisetas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }
      const responseData = await response.json();
      const camisetaId = responseData.id;
      console.log("Producto añadido:", product);
      console.log(response)
      setTimeout(() => {
        navigate(`/edit-product/${camisetaId}`);
      }, 1);
    } catch (error) {
      console.error('Error al añadir:', error);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: URL.createObjectURL(file) });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Añadir Producto</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* <div style={styles.imageUpload}>
          <label style={styles.imageLabel}>
            {product.image ? (
              <img src={product.image} alt="Preview" style={styles.imagePreview} />
            ) : (
              <>
                <span style={styles.addIcon}>+</span>
                <p>Añadir imagen</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
          </label>
        </div> */}

        <input
          type="text"
          placeholder="Nombre del producto"
          value={product.nombre}
          onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
          style={styles.input}
        />


        <div style={styles.toggleGroup}>
          <label style={styles.toggleLabel}>
            Lanzamiento
            <input
              type="checkbox"
              checked={product.lanzamiento}
              onChange={() => setProduct({ ...product, lanzamiento: !product.lanzamiento })}
              style={styles.toggleInput}
            />
          </label>

          <label style={styles.toggleLabel}>
            Oferta
            <input
              type="checkbox"
              checked={product.oferta}
              onChange={() => setProduct({ ...product, oferta: !product.oferta })}
              style={styles.toggleInput}
            />
          </label>
        </div>
        <div style={styles.subColeccionGroup}>
          <label style={styles.subColeccionLabel}>
            Subcolección
            <select
              value={product.subColeccionId}
              onChange={(e) => setProduct({ ...product, subColeccionId: parseInt(e.target.value) })}
              style={styles.selectInput}
            >
              {subcolecciones.map((subcoleccion) => (
                <option key={subcoleccion.id} value={subcoleccion.id}>
                  {subcoleccion.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" style={styles.submitButton}>
          Agregar Camisa
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  imageUpload: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    border: "1px dashed #aaa",
    borderRadius: "8px",
    width: "200px",
    height: "200px",
    justifyContent: "center",
  },
  addIcon: {
    fontSize: "24px",
    color: "#666",
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "8px",
  },
  fileInput: {
    display: "none",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  colorSection: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  addButton: {
    padding: "8px 12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  colorList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  colorItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  removeButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#ff0000",
  },
  submitButton: {
    padding: "10px 16px",
    backgroundColor: "#00C0FF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AddProductForm;
