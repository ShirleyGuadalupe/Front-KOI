import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const handleLogout = () => {
  localStorage.removeItem("token");
};

const Header = () => {
  const isLoggedIn = localStorage.getItem("token");
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Simular llamada a la API para obtener colecciones y subcolecciones
    const fetchCollections = async () => {
      const coleccionesResponse = await fetch('https://api-koi-production.up.railway.app/api/colecciones');
      const subColeccionesResponse = await fetch('https://api-koi-production.up.railway.app/api/sub-colecciones');

      // Parsear las respuestas JSON
      const colecciones = await coleccionesResponse.json();
      const subColecciones = await subColeccionesResponse.json();

      // Crear una estructura para los datos combinados
      const data = colecciones.map(coleccion => {
        const subcollections = subColecciones
          .filter(sub => sub.coleccionId === coleccion.id)
          .map(sub => ({
            id: sub.id,   // Incluye el id de la subcolección
            nombre: sub.nombre
          }));

        return {
          id: coleccion.id,  // Incluye el id de la colección
          name: coleccion.nombre,
          subcollections: subcollections,  // Subcolecciones con su id
        };
      });


      console.log(data);
      setCollections(data);
    };
    fetchCollections();
  }, []);

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
              src="https://i.ibb.co/6rnXzZb/Logo-blanco-03.png"
              alt="Koi Logo"
              className="logo"
            />
          </a>
        </div>
        <nav className="main-nav">
          <ul className="horizontal-list">
            <li>
              <a className="letters" href="/lanzamientos">
                LANZAMIENTO
              </a>
            </li>
            <li className="dropdown">
              <a className="letters" href="#">
                COLECCIONES
              </a>
              <ul className="dropdown-menu">
                {collections.map((collection) => (
                  <li key={collection.id} className="dropdown-item">
                    <a
                      href={`/colecciones/${collection.id}`}  // Usa el id de la colección
                      className="collection-link"
                    >
                      {collection.name}
                    </a>
                    <ul className="sub-dropdown-menu">
                      {collection.subcollections.map((sub) => (
                        <li key={sub.id}>
                          <a
                            href={`/colecciones/${collection.id}/${sub.id}`}  // Usa el id de la subcolección
                            className="subcollection-link"
                          >
                            {sub.nombre}  {/* Usamos el nombre de la subcolección */}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a className="letters" href="/ofertas">
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
