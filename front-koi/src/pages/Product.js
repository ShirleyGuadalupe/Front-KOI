import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Product.css";

const Product = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupError, setPopupError] = useState('');
    // Fetch product, images, types, and colors
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error al obtener los datos del producto:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/imagenes`);
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error("Error al obtener las imágenes:", error);
            }
        };

        const fetchTypes = async () => {
            try {
                const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/tipos`);
                const data = await response.json();
                setTypes(data);
                setSelectedType(data[0]?.id); // Seleccionar el primer tipo por defecto
            } catch (error) {
                console.error("Error al obtener los tipos de camiseta:", error);
            }
        };

        const fetchColors = async () => {
            try {
                const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/colores`);
                const data = await response.json();
                setColors(data);
                setSelectedColor(data[0]?.id); // Seleccionar el primer color por defecto
            } catch (error) {
                console.error("Error al obtener los colores:", error);
            }
        };
        const fetchSizes= async () => {
            try {
                const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/tallas`);
                const data = await response.json();
                setSizes(data);
                setSelectedSize(data[0]?.id); // Seleccionar el primer tipo por defecto
            } catch (error) {
                console.error("Error al obtener las tallas de producto:", error);
            }
        };
        fetchProduct();
        fetchImages();
        fetchTypes();
        fetchColors();
        fetchSizes();
    }, [id]);

    if (loading) {
        return <div style={styles.loading}>Cargando producto...</div>;
    }

    if (!product) {
        return <div style={styles.error}>Error al cargar el producto.</div>;
    }
    const handleAddToCart = async () => {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            alert("Por favor, inicia sesión para agregar productos al carrito.");
            return;
        }

        if (!selectedSize || !selectedColor || !selectedType) {
            setPopupError('popupError')
            setMessage('Por favor, selecciona todas las opciones (talla, tipo y color).')
            setIsPopupVisible(true);
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 3000);
        } else {

            const payload = {
                userId,
                productId: id,
                tipoCamisaId: selectedType,
                cantidad: quantity,
                color: selectedColor,
                talla: selectedSize,
            };

            try {
                const creando = await fetch(`https://api-koi-production.up.railway.app/api/carrito`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const response = await fetch(`https://api-koi-production.up.railway.app/api/carrito`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    setPopupError('popup')
                    setMessage('Añadido correctamente al Carrito de Compras')
                    setIsPopupVisible(true);
                    setTimeout(() => {
                        setIsPopupVisible(false);
                    }, 3000);
                } else {
                    const errorData = await response.json();
                    console.log(errorData)
                    alert(`Error al añadir al carrito: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error al añadir al carrito:", error);
            }
        }
    };
    return (
        <div style={styles.container}>
            {/* Imagen principal */}
            <div style={styles.imageSection}>
                {images.length > 0 ? (
                    <img
                        src={images[currentImage]?.url}
                        alt="Imagen del producto"
                        style={styles.mainImage}
                    />
                ) : (
                    <div style={styles.noImages}>NO HAY IMÁGENES</div>
                )}

                {/* Miniaturas para cambiar de imagen */}
                {images.length > 1 && (
                    <div style={styles.thumbnailContainer}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Miniatura ${index + 1}`}
                                style={{
                                    ...styles.thumbnail,
                                    border: currentImage === index ? "2px solid #000" : "none",
                                }}
                                onClick={() => setCurrentImage(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Información del producto */}
            <div style={styles.infoSection } className="Info">
                <h1 style={styles.title} id="titulo">{product.nombre}</h1>

                {/* Selección de tipo de camiseta */}
                <div style={styles.formGroup}>
                    <label htmlFor="type" style={styles.label}>
                        Tipo de Camiseta:
                    </label>
                    <select
                        id="type"
                        value={selectedType}
                        onChange={(e) => setSelectedType(Number(e.target.value))}
                        style={styles.select}
                    >
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.nombre} - ${type.precio}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selección de color */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Color:</label>
                    <div style={styles.colorContainer}>
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                style={{
                                    ...styles.colorButton,
                                    backgroundColor: color.hex,
                                    border: selectedColor === color.id ? "3px solid #000" : "1px solid #ccc",
                                }}
                                onClick={() => setSelectedColor(color.id)}
                            />
                        ))}
                    </div>
                </div>
                {/* Tallas */}
                <div className="section">
                    <h2>Tallas</h2>
                    <div className="sizes">
                        {sizes.map((size) => (
                            <span
                                key={size.id}
                                className={`size ${selectedSize === size.nombre ? "selected" : ""}`}
                                onClick={() => setSelectedSize(size.nombre)}
                            >
                                {size.nombre}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Cantidad */}
                <div className="section">
                    <h2>Cantidad</h2>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                {/* Botón para agregar al carrito */}
                <button onClick={handleAddToCart} className="add-to-cart-button">
                    Agregar al carrito
                </button>
            </div>
            {isPopupVisible && (
                <div className={`${popupError}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        flexWrap: "wrap"
    },
    imageSection: {
        flex: "0 0 60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    infoSection: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "20px",
        backgroundColor: "rgb(219, 219, 219)",
        padding:"4vh",
    },
    mainImage: {
        width: "100%",
        maxWidth: "80vh",
        borderRadius: "10px",
    },
    thumbnailContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    thumbnail: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "5px",
        cursor: "pointer",
    },
    noImages: {
        color: "red",
        fontWeight: "bold",
    },
    
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    formGroup: {
        marginBottom: "20px",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    select: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
    },
    colorContainer: {
        display: "flex",
        gap: "10px",
    },
    colorButton: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        cursor: "pointer",
    },
    loading: {
        textAlign: "center",
        marginTop: "50px",
        fontSize: "18px",
    },
    error: {
        textAlign: "center",
        marginTop: "50px",
        color: "red",
        fontSize: "18px",
    },
};

export default Product;
