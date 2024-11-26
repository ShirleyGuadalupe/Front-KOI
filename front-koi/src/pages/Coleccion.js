import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Subcoleccion from "./Subcoleccion";

const OfferPage = () => {
    const { id } = useParams();
    const [subColecciones, setSubColecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("");
    useEffect(() => {
        const fetchsubColecciones = async () => {
            try {
                const response = await fetch(`https://api-koi-production.up.railway.app/api/colecciones/${id}/sub-colecciones`);
                const data = await response.json();
                const nombreResponse = await fetch(`https://api-koi-production.up.railway.app/api/colecciones/${id}/`);
                const nombreData = await nombreResponse.json();
                console.log(data)
                setSubColecciones(data);
                setNombre(nombreData.nombre)
            } catch (error) {
                console.error("Error al obtener las subcolecciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchsubColecciones();
    }, []); // Solo se ejecuta al montar el componente

    if (loading) {
        return <div>Cargando productos de oferta...</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{(nombre)}</h1>
            <div style={styles.grid}>
                {subColecciones.length > 0 ? (
                    subColecciones.map((subcoleccion) => (
                        <Subcoleccion key={subcoleccion.id} id={subcoleccion.id} />
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
