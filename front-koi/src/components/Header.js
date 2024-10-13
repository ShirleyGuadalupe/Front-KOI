import React from 'react';
import Colecciones from './colecciones'; // Asegúrate de que la ruta sea correcta
import '../styles/Header.css';

const Header = () => {
    return (
        <div className='header-container'>
            <ul className="horizontal-list">
                <li>
                    <a className='letters' href="/login">LANZAMIENTO</a>
                </li>
                <Colecciones />
                <li>
                    <a className='letters' href="/login">PERSONALIZACIÓN</a>
                </li>
                <li>
                    <a className='letters' href="/login">OFERTAS</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;

