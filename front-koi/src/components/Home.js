import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import CatalogPage from '../pages/Catalog';
const HomePage = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Obtener listado de camisetas
        const response = await fetch('https://api-koi-production.up.railway.app/api/camisetas');
        if (!response.ok) throw new Error('Error al obtener camisetas');
        const camisetas = await response.json();

        // Obtener la primera imagen de cada camiseta (si tiene imágenes)
        const imagesPromises = camisetas.map(async (camiseta) => {
          const imgResponse = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${camiseta.id}/imagenes`);
          if (!imgResponse.ok) return null;
          const urls = await imgResponse.json();
          return urls.length > 0 ? urls[0].url : null;
        });

        const fetchedImages = await Promise.all(imagesPromises);
        setImages(fetchedImages.filter((url) => url !== null)); // Filtrar imágenes válidas
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Lógica para el carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Cambiar cada 5 segundos
    return () => clearInterval(interval);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="homepage-container">
      {/* Carrusel */}
      <div className="carousel">
        {images.length > 0 ? (
          <>
            <img src={images[currentIndex]} alt={`Banner ${currentIndex + 1}`} className="carousel-image" />
            <button className="carousel-btn left" onClick={handlePrev}>
              &#9664;
            </button>
            <button className="carousel-btn right" onClick={handleNext}>
              &#9654;
            </button>
          </>
        ) : (
          <p>Cargando imágenes...</p>
        )}
      </div>
        
      {/* Sección inferior */}
      <div className="features">
        <div className="feature-item">
          <img src="https://i.ibb.co/6yKRSP3/caja.png" alt="Envío gratuito" />
          <p>ENVÍO GRATUITO</p>
          <span>Por compras locales en Cúcuta, NS</span>
        </div>
        <div className="feature-item">
          <img src="https://i.ibb.co/qmd7C3T/descuento.png" alt="Descuentos" />
          <p>DESCUENTOS</p>
          <span>Por compras superiores a $199.000</span>
        </div>
        <div className="feature-item">
          <img src="https://i.ibb.co/f4n3Gxv/mapa.png" alt="A nivel nacional" />
          <p>A NIVEL NACIONAL</p>
          <span>Entregas a todo el país Colombia</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
