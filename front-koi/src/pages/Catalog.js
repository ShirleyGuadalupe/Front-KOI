import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

const CatalogPage = () => {
  const [launchProducts, setLaunchProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('user');
  const handleDelete = (productId) => {
    // Filtra el producto eliminado de la lista de productos de oferta
    setOfferProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allResponse = await fetch("https://api-koi-production.up.railway.app/api/camisetas")
        const launchResponse = await fetch("https://api-koi-production.up.railway.app/api/camisetas/lanzamiento");
        const offerResponse = await fetch("https://api-koi-production.up.railway.app/api/camisetas/oferta");

        const launchData = await launchResponse.json();
        const offerData = await offerResponse.json();
        const allData = await allResponse.json();

        setLaunchProducts(launchData);
        setOfferProducts(offerData);
        setAll(allData);
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
      {/* <h1 style={styles.title}>Catálogo</h1> */}

      {/* Productos de Lanzamiento */}
      <h2 style={styles.subTitle}>LANZAMIENTO</h2>
      <div style={styles.grid}>
        {launchProducts.length > 0 ? (
          launchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>No hay productos de lanzamiento disponibles.</div>
        )}
        {isAdmin === "true"?(<a class="btn" style={styles.addButton} href="/adding-product">➕</a>):(<></>)}
      </div>
      <div style={styles.links}>
        {/*<Link to="/lanzamientos" style={styles.link}>Ver más lanzamientos</Link>*/}
      </div>
      {/* Productos de Ofertas */}
      <h2 style={styles.subTitle}>OFERTAS</h2>
      <div style={styles.grid}>
        {offerProducts.length > 0 ? (
          offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete}/>
          ))
        ) : (
          <div>No hay productos de oferta disponibles.</div>
        )}
        {isAdmin === "true"?(<a class="btn" style={styles.addButton} href="/adding-product">➕</a>):(<></>)}
        
      </div>

      {/* Enlaces para ver más productos */}
      <div style={styles.links}>
        {/*<Link to="/ofertas" style={styles.link}>Ver más ofertas</Link>*/}
      </div>
      {/* Productos de Ofertas */}
      <h2 style={styles.subTitle}>TODOS NUESTROS PRODUCTOS</h2>
      <div style={styles.grid}>
        {all.length > 0 ? (
          all.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete}/>
          ))
        ) : (
          <div>No hay productos de oferta disponibles.</div>
        )}
        {isAdmin === "true"?(<a class="btn" style={styles.addButton} href="/adding-product">➕</a>):(<></>)}
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "rgb(232, 233, 219)",
    alignSelf: "Center",
    padding: "16px",
    },
  title: {
    alignSelf: "Center",
    fontSize: "28px",
    marginBottom: "20px",
  },
  subTitle: {
    backgroundColor: "rgb(247, 247, 247)",
    borderRadius: "10px",
    padding: "15px",
    fontSize: "18px",
    marginTop: "30px",
    alignSelf: "Center",
    
  },
  grid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  links: {
    color: "#c60000",
    marginTop: "32px",
  },
  link: {
    marginRight: "16px",
    color: "#c60000",
    textDecoration: "none",
  },
  addButton: {
    padding: "130px 87px",
    margin: "10px",
    backgroundColor: "rgb(246, 246, 246)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    alignSelf: "center"
  },
};

export default CatalogPage;
