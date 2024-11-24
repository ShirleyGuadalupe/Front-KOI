import React from "react";
import ProductCard from "../components/ProductCard";
    
const products = [
  {
    id: 1,
    name: "SAKURA",
    image: "https://i.ibb.co/DWB5LLV/image.png", // Cambia esto por la URL real
    priceOversize: 45000,
    priceUnisex: 35000,
  },
];

const CatalogPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lanzamiento</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <a class="btn" style={styles.addButton} href="/adding-product">➕ Añadir productos</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "16px",
    background: "#f9f9f9",
  },
  title: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  grid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  addButton: {
    padding: "10px 16px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    alignSelf: "center",
  },
};

export default CatalogPage;
