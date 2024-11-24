import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h3>QUIÉNES SOMOS</h3>
        <p>Una alternativa a la hora de personalizar tus camisas</p>
        <img src="https://i.ibb.co/ZMK1gXX/colombia.png" alt="Bandera de Colombia" className="flag" />
      </div>

      <div className="footer-mission">
        <h3>NUESTRA MISIÓN</h3>
        <p>
          Ofrecer a nuestros clientes una experiencia única de personalización de camisas, 
          combinando creatividad y calidad para reflejar su estilo personal y profesional. 
          Nos comprometemos a entregar productos excepcionales con un servicio al cliente 
          amigable y eficiente, utilizando tecnologías innovadoras y materiales de alta calidad.
        </p>
      </div>

      <div className="footer-vision">
        <h3>NUESTRA VISIÓN</h3>
        <p>
          Ser la empresa líder en personalización de camisas, reconocida por nuestra 
          capacidad para transformar ideas en diseños únicos y de alta calidad. 
          Buscamos inspirar a nuestros clientes a expresarse con confianza y estilo, 
          estableciendo nuevos estándares en innovación, sostenibilidad y satisfacción del cliente 
          en el mercado de la moda personalizada.
        </p>
      </div>

      <div className="footer-bottom">
        <p>&copy;2024 KOI ALTERNATIVE. Todos los derechos reservados.</p>
        <div className="logos">
          <img src="https://i.ibb.co/mCzJCH6/UFPS-Logo.png" alt="Logo UFPS" className="logo" />
          <img src="https://i.ibb.co/n8C7yVM/logo-sistemas.png" alt="Logo adicional" className="logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
