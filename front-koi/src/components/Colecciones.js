import React, { useEffect, useState } from 'react';

const Colecciones = () => {
    const [colecciones, setColecciones] = useState([]);
    const [subColecciones, setSubColecciones] = useState([]);
    const [activo, setActivo] = useState(false); 
    const [subActivo, setSubActivo] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coleccionesResponse = await fetch('https://api-koi-production.up.railway.app/api/colecciones', {
                    method: 'GET',
                });
                const subColeccionesResponse = await fetch('https://api-koi-production.up.railway.app/api/sub-colecciones');
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
            onMouseEnter={() => setActivo(true)}
            onMouseLeave={() => {
                setActivo(false);
                setSubActivo(null);
            }} 
            style={{ position: 'relative' }}
        >
            <a className='letters' href="/login">COLECCIONES</a>
            {activo && (
                <div className="dropdown-container"> {/* Contenedor para el dropdown */}
                    <ul className="dropdown">
                        {colecciones.map(coleccion => (
                            <li
                                key={coleccion.id}
                                onMouseEnter={() => setSubActivo(coleccion.id)}
                                onMouseLeave={() => setSubActivo(null)}
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