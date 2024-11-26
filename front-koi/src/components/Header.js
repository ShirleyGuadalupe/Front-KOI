import React from "react";
import "../styles/Header.css";

const handleLogout = () => {
  localStorage.removeItem("token");
};

const Header = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <header>
      {/* Barra Superior */}
      <div className="top-bar">
        <div>
          <a
            href="https://www.instagram.com/koi_alternative/profilecard/?igsh=N2Q3azczdG51ZHF2"
            target="blank"
          >
            <img
              className="social-icons"
              src="https://cdn-icons-png.flaticon.com/128/3670/3670274.png"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.facebook.com/KOIALTERNATIVE?mibextid=ZbWKwL"
            target="blank"
          >
            <img
              className="social-icons"
              src="https://cdn-icons-png.flaticon.com/128/1384/1384005.png"
              alt="Facebook"
            />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=3176482938&text=Holaa"
            target="blank"
          >
            <img
              className="social-icons"
              src="https://cdn-icons-png.flaticon.com/128/1384/1384007.png"
              alt="WhatsApp"
            />
          </a>
          <a
            href="https://www.tiktok.com/@koialternative?_t=8qW18k2Rxw5&_r=1"
            target="blank"
          >
            <img
              className="social-icons"
              src="https://cdn-icons-png.flaticon.com/128/3116/3116491.png"
              alt="TikTok"
            />
          </a>
        </div>
        <div>
          {isLoggedIn ? (
            <a href="/login" className="btn-bar-login" onClick={handleLogout}>
              Cerrar Sesión
            </a>
          ) : (
            <>
              <a href="/register" className="btn-bar">
                Crear Cuenta
              </a>
              <a href="/login" className="btn-bar-login">
                Iniciar Sesión
              </a>
            </>
          )}
        </div>
      </div>

      {/* Barra Principal */}
      <div className="header-container">
        <div className="logo-container">
          <a href="/">
            <img
              src="https://i.ibb.co/NjH0d6K/LOGO.jpg"
              alt="Koi Logo"
              className="logo"
            />
          </a>
        </div>
        <nav className="main-nav">
          <ul className="horizontal-list">
            <li>
              <a className="letters" href="/catalog">
                LANZAMIENTO
              </a>
            </li>
            <li>
              <a className="letters" href="/catalog">
                COLECCIONES
              </a>
            </li>
            <li>
              <a className="letters" href="/catalog">
                OFERTAS
              </a>
            </li>
          </ul>
        </nav>
        {isLoggedIn && (
          <div className="header-actions">
            <a href="/cart">
              <img
                src="https://i.ibb.co/1RrNZJ2/CARRITO.png"
                alt="Carrito"
                className="icon"
              />
            </a>
            <a href="/profile">
              <img
                src="https://i.ibb.co/ry5rBkt/usuario.png"
                alt="Perfil"
                className="icon"
              />
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
