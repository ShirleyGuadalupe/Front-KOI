import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const LaunchPage = () => {
  const [launchProducts, setLaunchProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunchProducts = async () => {
      try {
        const response = await fetch("https://api-koi-production.up.railway.app/api/camisetas/lanzamiento");
        const data = await response.json();
        setLaunchProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos de lanzamiento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunchProducts();
  }, []); // Solo se ejecuta al montar el componente

  if (loading) {
    return <div>Cargando productos de lanzamiento...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lanzamientos</h1>
      <div style={styles.grid}>
        {launchProducts.length > 0 ? (
          launchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>No hay productos de lanzamiento disponibles.</div>
        )}
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
};

export default LaunchPage;
