import React, { useEffect, useState } from "react";
import "../styles/Product.css";
import "../styles/cart.css";
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
    const deleteItem = async (idItem) => {
        try {
            const response = await fetch(`https://api-koi-production.up.railway.app/api/carrito/${idItem}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Error al eliminar el producto del carrito");
            setMessage('Eliminado correctamente del carrito de Compras')
            setIsPopupVisible(true);
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 3000);
            fetchCart(); // Actualizar el carrito después de eliminar
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };
    useEffect(() => {
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
        return <div style={styles.emptyCart}>
            Tu carrito está vacío.
            <div><img src="https://i.ibb.co/xmB6NYN/11329060.png" /> </div>
        </div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title} id="titulo">TU CARRITO DE COMPRAS</h1>

            {/* Lista de productos */}
            <div style={styles.itemsContainer} className="container">
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
                        <div style={styles.itemDetails} className="details">
                            <h2 style={styles.itemName}>{item.nombre}</h2>
                            <p>TIPO DE CAMISA: {tipoCamisaMap[item.tipoCamisaId] || "Cargando..."}</p>
                            <p>TALLA: {item.talla}</p>
                            <div style={styles.colorContainer}>
                                <p>COLOR:</p>
                                <div
                                    style={{
                                        ...styles.colorBox,
                                        backgroundColor: coloresMap[item.color] || "#ccc",
                                    }}
                                ></div>
                            </div>
                            <p>CANTIDAD: {item.cantidad}</p>
                            <p>PRECIO UNITARIO: ${item.precio.toLocaleString()}</p>
                            <div>
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => deleteItem(item.id)}
                                    title="Eliminar producto"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Resumen del precio total */}
            <div style={styles.summary}>
                <h2>TOTAL: ${cart.totalPrice.toLocaleString()}</h2>
                <button style={styles.checkoutButton}>Finalizar Compra</button>
            </div>
            {isPopupVisible && (
                <div className={`popup`}>
                    {message}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor:"rgb(235, 234, 234)",
        maxWidth: "800px",
        margin:"auto",
        marginTop: "40px",
        alignItems:"center",
        // textAlign: "center"
    },
    title: {
        fontSize: "20px",
        textAlign: "center",
        marginBottom: "20px",
        padding:"20px",
    },
    itemsContainer: {
        marginBottom: "20px",
        alignItems: "center",
        flexDirection: "column"
    },
    item: {
        display: "flex",
        alignItems: "center",
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
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    colorContainer: {
        marginLeft:"10px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    colorBox: {
        
        width: "30px",
        height: "30px",
        display: "flex",
        borderRadius: "50%",
        border: "1px solid #000",
    },
    summary: {
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "30px",
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
        borderRadius: "10px",
        cursor: "pointer",
    },
    loading: {
        textAlign: "center",
        fontSize: "18px",
        marginTop: "50px",
    },
    emptyCart: {
        textAlign: "center",
        fontSize: "50px",
        color: "#999",
        marginTop: "50px",
    },
    deleteButton: {
        padding: "10px",
        backgroundColor: "rgb(231, 89, 89)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    deleteButtonImage: {
        width: "15px", // Tamaño personalizado para la imagen
        height: "15px",
    },
};

export default Cart;
