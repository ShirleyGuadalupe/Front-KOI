import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Subcoleccion = ({id}) => {
    const { secondId } = useParams();
    const [camisetas, setCamisetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nombre,setNombre] = useState("");
    useEffect(() => {

        const fetchCamisetas = async () => {
            try {
                const response = await fetch(`https://api-koi-production.up.railway.app/api/sub-colecciones/${secondId || id}/camisetas`);
                const data = await response.json();
                const nombreResponse = await fetch(`https://api-koi-production.up.railway.app/api/sub-colecciones/${secondId || id}/`);
                const nombreData = await nombreResponse.json();
                setCamisetas(data);
                setNombre(nombreData.nombre)
            } catch (error) {
                console.error("Error al obtener camisetas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCamisetas();
    }, []); // Solo se ejecuta al montar el componente

    if (loading) {
        return <div>Cargando productos de oferta...</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{(nombre)}</h1>
            <div style={styles.grid}>
                {camisetas.length > 0 ? (
                    camisetas.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div>No hay productos de {(nombre)} disponibles.</div>
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

export default Subcoleccion;
