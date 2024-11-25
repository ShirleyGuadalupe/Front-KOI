import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const OfferPage = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferProducts = async () => {
      try {
        const response = await fetch("https://api-koi-production.up.railway.app/api/camisetas/oferta");
        const data = await response.json();
        setOfferProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos de oferta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferProducts();
  }, []); // Solo se ejecuta al montar el componente

  if (loading) {
    return <div>Cargando productos de oferta...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ofertas</h1>
      <div style={styles.grid}>
        {offerProducts.length > 0 ? (
          offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>No hay productos de oferta disponibles.</div>
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

export default OfferPage;
