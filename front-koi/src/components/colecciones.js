// Colecciones.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Colecciones = () => {
    const [colecciones, setColecciones] = useState([]);
    const [subColecciones, setSubColecciones] = useState([]);
    const [activo, setActivo] = useState(false); // Controla si el dropdown está visible
    const [subActivo, setSubActivo] = useState(null); // Controla qué subcolección está activa

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coleccionesResponse = await axios.get('http://localhost:3000/api/colecciones');
                const subColeccionesResponse = await axios.get('http://localhost:3000/api/sub-colecciones');
                setColecciones(coleccionesResponse.data);
                setSubColecciones(subColeccionesResponse.data);
            } catch (error) {
                console.error("Error al obtener los datos", error);
            }
        };

        fetchData();
    }, []);

    return (
        <li
            onMouseEnter={() => setActivo(true)} // Al pasar el mouse sobre "Colecciones"
            onMouseLeave={() => {
                setActivo(false);
                setSubActivo(null); // Resetea subcolección activa al salir
            }} 
            style={{ position: 'relative' }} // Asegúrate de que el li tenga posición relativa
        >
            <a className='letters' href="/login">COLECCIONES</a>
            {activo && (
                <div className="dropdown-container"> {/* Contenedor para el dropdown */}
                    <ul className="dropdown">
                        {colecciones.map(coleccion => (
                            <li
                                key={coleccion.id}
                                onMouseEnter={() => setSubActivo(coleccion.id)} // Muestra subcolecciones al pasar el mouse
                                onMouseLeave={() => setSubActivo(null)} // Resetea al salir
                            >
                                {coleccion.nombre}
                                {subActivo === coleccion.id && (
                                    <ul className="dropdown-sub">
                                        {subColecciones
                                            .filter(sub => sub.coleccionId === coleccion.id)
                                            .map(sub => (
                                                <li key={sub.id}>{sub.nombre}</li>
                                            ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default Colecciones;
