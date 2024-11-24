import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.details}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.price}>
          ${product.priceOversize} <span style={styles.tag}>oversize</span>
        </p>
        <p style={styles.price}>
          ${product.priceUnisex} <span style={styles.tag}>unisex</span>
        </p>
      </div>
      <div style={styles.actions}>
        <button style={styles.editBtn}>✏️</button>
        <button style={styles.deleteBtn}>🗑️</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    maxWidth: "200px",
  },
  image: {
    width: "100%",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  details: {
    textAlign: "center",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "8px 0",
  },
  price: {
    fontSize: "14px",
    margin: "4px 0",
  },
  tag: {
    fontSize: "12px",
    color: "#666",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
  editBtn: {
    backgroundColor: "#f0f0f0",
    border: "none",
    padding: "4px 8px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  deleteBtn: {
    backgroundColor: "#ffdddd",
    border: "none",
    padding: "4px 8px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default ProductCard;
