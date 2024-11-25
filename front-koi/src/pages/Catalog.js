import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const CatalogPage = () => {
  const [launchProducts, setLaunchProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('user');
  const handleDelete = (productId) => {
    // Filtra el producto eliminado de la lista de productos de oferta
    setOfferProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const launchResponse = await fetch("https://api-koi-production.up.railway.app/api/camisetas/lanzamiento");
        const offerResponse = await fetch("https://api-koi-production.up.railway.app/api/camisetas/oferta");

        const launchData = await launchResponse.json();
        const offerData = await offerResponse.json();

        setLaunchProducts(launchData);
        setOfferProducts(offerData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Solo se ejecuta al montar el componente

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Catálogo</h1>

      {/* Productos de Lanzamiento */}
      <h2 style={styles.subTitle}>Lanzamientos</h2>
      <div style={styles.grid}>
        {launchProducts.length > 0 ? (
          launchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>No hay productos de lanzamiento disponibles.</div>
        )}
        {isAdmin === "true"?(<a class="btn" style={styles.addButton} href="/adding-product">➕ Añadir productos</a>):(<></>)}
      </div>
      <div style={styles.links}>
        <Link to="/lanzamientos" style={styles.link}>Ver más lanzamientos</Link>
      </div>
      {/* Productos de Ofertas */}
      <h2 style={styles.subTitle}>Ofertas</h2>
      <div style={styles.grid}>
        {offerProducts.length > 0 ? (
          offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete}/>
          ))
        ) : (
          <div>No hay productos de oferta disponibles.</div>
        )}
        {isAdmin === "true"?(<a class="btn" style={styles.addButton} href="/adding-product">➕ Añadir productos</a>):(<></>)}
        
      </div>

      {/* Enlaces para ver más productos */}
      <div style={styles.links}>
        <Link to="/ofertas" style={styles.link}>Ver más ofertas</Link>
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
  subTitle: {
    fontSize: "20px",
    marginTop: "32px",
    marginBottom: "16px",
  },
  grid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  links: {
    marginTop: "32px",
  },
  link: {
    marginRight: "16px",
    color: "#007BFF",
    textDecoration: "none",
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
