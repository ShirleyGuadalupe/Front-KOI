import React, { useState } from "react";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    image: null,
    colors: [],
  });
  const [newColor, setNewColor] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: URL.createObjectURL(file) });
  };

  const handleAddColor = () => {
    if (newColor && !product.colors.includes(newColor)) {
      setProduct({ ...product, colors: [...product.colors, newColor] });
      setNewColor("");
    }
  };

  const handleRemoveColor = (color) => {
    setProduct({
      ...product,
      colors: product.colors.filter((c) => c !== color),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto añadido:", product);
    // Aquí puedes enviar los datos al backend.
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Añadir Producto</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.imageUpload}>
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
        </div>

        <input
          type="text"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          style={styles.input}
        />

        <div style={styles.colorSection}>
          <input
            type="text"
            placeholder="Añadir color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={handleAddColor} style={styles.addButton}>
            Añadir color
          </button>
        </div>

        <div style={styles.colorList}>
          {product.colors.map((color, index) => (
            <div key={index} style={styles.colorItem}>
              <span>{color}</span>
              <button
                type="button"
                onClick={() => handleRemoveColor(color)}
                style={styles.removeButton}
              >
                ✕
              </button>
            </div>
          ))}
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
