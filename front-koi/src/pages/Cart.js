import React, { useEffect, useState } from "react";
import "../styles/Product.css";
const Cart = () => {
    const [cart, setCart] = useState(null); // Datos del carrito
    const [loading, setLoading] = useState(true); // Indicador de carga
    const [tipoCamisaMap, setTipoCamisaMap] = useState({}); // Mapa de tipos de camisa
    const [coloresMap, setColoresMap] = useState({}); // Mapa de colores por ID
    const [images, setImages] = useState({}); // Mapa de imágenes por producto
    const token = localStorage.getItem("token"); // Token del usuario
    const [message, setMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    // Función para obtener los colores
    const fetchColor = async (id) => {
        try {
            const response = await fetch(`https://api-koi-production.up.railway.app/api/colores/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error al obtener el color con ID ${id}`);
            }

            const data = await response.json();
            setColoresMap((prev) => ({ ...prev, [id]: data.hex })); // Agregar al mapa de colores
        } catch (error) {
            console.error(`Error al cargar el color con ID ${id}:`, error);
        }
    };

    // Función para obtener imágenes de productos
    const fetchImages = async (productId) => {
        try {
            const response = await fetch(
                `https://api-koi-production.up.railway.app/api/camisetas/${productId}/imagenes`
            );

            if (!response.ok) {
                throw new Error(`Error al obtener imágenes para el producto con ID ${productId}`);
            }

            const data = await response.json();
            setImages((prev) => ({ ...prev, [productId]: data[0]?.url })); // Guardar solo la primera imagen
        } catch (error) {
            console.error(`Error al cargar imágenes del producto ${productId}:`, error);
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch("https://api-koi-production.up.railway.app/api/carrito", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener el carrito");
                }

                const data = await response.json();
                setCart(data); // Actualizar datos del carrito
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
                setCart(null);
            } finally {
                setLoading(false);
            }
        };

        const fetchTipoCamisa = async () => {
            try {
                const response = await fetch("https://api-koi-production.up.railway.app/api/tipo", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los tipos de camisa");
                }

                const data = await response.json();
                const map = {};
                data.forEach((tipo) => {
                    map[tipo.id] = tipo.nombre; // Crear un mapa de ID a nombre
                });
                setTipoCamisaMap(map);
            } catch (error) {
                console.error("Error al cargar tipos de camisa:", error);
            }
        };

        // Llamadas iniciales
        fetchCart();
        fetchTipoCamisa();
    }, [token]);

    useEffect(() => {
        if (cart?.items) {
            cart.items.forEach((item) => {
                if (!coloresMap[item.color]) {
                    // Cargar el color si no está en el mapa
                    fetchColor(item.color);
                }
                if (!images[item.productId]) {
                    // Cargar la imagen si no está en el mapa
                    fetchImages(item.productId);
                }
            });
        }
    }, [cart, coloresMap, images]);

    if (loading) {
        return <div style={styles.loading}>Cargando carrito...</div>;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return <div style={styles.emptyCart}>Tu carrito está vacío.</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title} id="titulo">Carrito de Compras</h1>

            {/* Lista de productos */}
            <div style={styles.itemsContainer}>
                {cart.items.map((item) => (
                    <div key={item.id} style={styles.item}>
                        {/* Imagen del producto */}
                        <div style={styles.imageContainer}>
                            <img
                                src={images[item.productId] || "https://via.placeholder.com/80"}
                                alt={item.nombre}
                                style={styles.image}
                            />
                        </div>

                        {/* Detalles del producto */}
                        <div style={styles.itemDetails}>
                            <h2 style={styles.itemName}>{item.nombre}</h2>
                            <p>Tipo de Camisa: {tipoCamisaMap[item.tipoCamisaId] || "Cargando..."}</p>
                            <p>Talla: {item.talla}</p>
                            <div style={styles.colorContainer}>
                                <p>Color:</p>
                                <div
                                    style={{
                                        ...styles.colorBox,
                                        backgroundColor: coloresMap[item.color] || "#ccc",
                                    }}
                                ></div>
                            </div>
                            <p>Cantidad: {item.cantidad}</p>
                            <p>Precio Unitario: ${item.precio.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Resumen del precio total */}
            <div style={styles.summary}>
                <h2>Total: ${cart.totalPrice.toLocaleString()}</h2>
                <button style={styles.checkoutButton}>Finalizar Compra</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
    },
    itemsContainer: {
        borderTop: "1px solid #ddd",
        marginBottom: "20px",
        alignItems:"center"
    },
    item: {
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        padding: "10px 0",
    },
    imageContainer: {
        flexShrink: 0,
        marginRight: "15px",
    },
    image: {
        width: "200px",
        // height: "80px",
        objectFit: "cover",
        borderRadius: "5px",
    },
    itemDetails: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    itemName: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    colorContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    colorBox: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "1px solid #000",
    },
    summary: {
        textAlign: "center",
        marginTop: "20px",
        padding: "10px 0",
        backgroundColor: "#f8f8f8",
        borderRadius: "5px",
    },
    checkoutButton: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    loading: {
        textAlign: "center",
        fontSize: "18px",
        marginTop: "50px",
    },
    emptyCart: {
        textAlign: "center",
        fontSize: "18px",
        color: "#999",
        marginTop: "50px",
    },
};

export default Cart;
