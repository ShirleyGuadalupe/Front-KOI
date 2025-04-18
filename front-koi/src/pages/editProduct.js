import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../styles/editProduct.css'
const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        nombre: '',
        lanzamiento: false,
        oferta: false,
        subColeccionId: 1,
    });
    const [subcolecciones, setSubcolecciones] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [colores, setColores] = useState([]); // Colores asociados a la camiseta
    const [allColores, setAllColores] = useState([]); // Todos los colores disponibles
    const [selectedColor, setSelectedColor] = useState(null);
    const [message, setMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    //tipos y tallas
    const [tallas, setTallas] = useState([]); // Tallas asociados a la camiseta
    const [allTallas, setAllTallas] = useState([]);
    const [selectedTalla, setSelectedTalla] = useState(null);
    const [tipos, setTipos] = useState([]); // Tipos asociados a la camiseta
    const [allTipos, setAllTipos] = useState([]);
    const [selectedTipo, setSelectedTipo] = useState(null);

    // Función para manejar cuando el mouse entra en una imagen
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    // Función para manejar cuando el mouse sale de una imagen
    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    useEffect(() => {
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener el producto:', error);
                setLoading(false);
            });

        fetch('https://api-koi-production.up.railway.app/api/sub-colecciones')
            .then((response) => response.json())
            .then((data) => {
                setSubcolecciones(data);
            })
            .catch((error) => console.error('Error al obtener subcolecciones:', error));

        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/imagenes`)
            .then((response) => response.json())
            .then((data) => {
                setImages(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error('Error al obtener las imágenes:', error);
                setImages([]);
            });
        // Obtener colores asociados a la camiseta
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/colores/`)
            .then((response) => response.json())
            .then((data) => {
                setColores(data); // Colores asociados a la camiseta
            })
            .catch((error) => {
                console.error('Error al obtener colores asociados:', error);
                setColores([]);
            });

        // Obtener todos los colores disponibles
        fetch('https://api-koi-production.up.railway.app/api/colores/')
            .then((response) => response.json())
            .then((data) => {
                setAllColores(data); // Colores disponibles en la base de datos
            })
            .catch((error) => {
                console.error('Error al obtener colores disponibles:', error);
            });

        // Obtener tallas asociados a la camiseta
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/tallas/`)
            .then((response) => response.json())
            .then((data) => {
                setTallas(data); // Tallas asociados a la camiseta
            })
            .catch((error) => {
                console.error('Error al obtener tallas asociados:', error);
                setTallas([]);
            });

        // Obtener todos las Tallas disponibles
        fetch('https://api-koi-production.up.railway.app/api/talla/')
            .then((response) => response.json())
            .then((data) => {
                setAllTallas(data); // Tallas disponibles en la base de datos
            })
            .catch((error) => {
                console.error('Error al obtener tallas disponibles:', error);
            });
        // Obtener tipos asociados a la camiseta
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/tipos/`)
            .then((response) => response.json())
            .then((data) => {
                setTipos(data); // Tipos asociados a la camiseta
            })
            .catch((error) => {
                console.error('Error al obtener tipos asociados:', error);
                setTipos([]);
            });

        // Obtener todos las tipos disponibles
        fetch('https://api-koi-production.up.railway.app/api/tipo/')
            .then((response) => response.json())
            .then((data) => {
                setAllTipos(data); // tipos disponibles en la base de datos
            })
            .catch((error) => {
                console.error('Error al obtener tipos disponibles:', error);
            });
    }, [id]);
    // Función para agregar un color a la camiseta
    const handleAddColor = () => {
        if (!selectedColor) {
            console.error('Por favor, selecciona un color');
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/colores/${selectedColor}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Agregar el nuevo color a la lista de colores asociados
                setColores((prevColores) => [...prevColores, data]);
                window.location.reload();
                setMessage('Color Añadido correctamente')
                setIsPopupVisible(true);
                setTimeout(() => {
                    setIsPopupVisible(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error al agregar el color:', error);
            });
    };
    const handleAddTalla = () => {
        if (!selectedTalla) {
            console.error('Por favor, selecciona talla');
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/tallas/${selectedTalla}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTallas((prevTallas) => [...prevTallas, data]); // 'data' debe contener la nueva talla
                window.location.reload();
                setMessage('Talla añadida correctamente');
                setIsPopupVisible(true);
                setTimeout(() => {
                    setIsPopupVisible(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error al agregar la talla:', error);
            });
    };
    const handleDeleteTalla = async (Tallaid) => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `https://api-koi-production.up.railway.app/api/camisetas/${id}/tallas/${Tallaid}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            // Refrescar lista de Tallas

            setMessage('Talla Eliminada correctamente');
            setIsPopupVisible(true);
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 3000);
            window.location.reload();
        } else {
            alert("Error al eliminar la talla.");
        }
    };
    const handleAddTipo = () => {
        if (!selectedTipo) {
            console.error('Por favor, selecciona un tipo de producto');
            return;
        }

        const token = localStorage.getItem('token');
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/tipos/${selectedTipo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTipos((prevTipos) => [...prevTipos, data]); // 'data' debe contener el nuevo tipo de producto
                window.location.reload();
                setMessage('Tipo de producto añadido correctamente');
                setIsPopupVisible(true);
                setTimeout(() => {
                    setIsPopupVisible(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error al agregar el tipo de producto:', error);
            });
    };

    const handleDeleteTipo = async (tipoId) => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `https://api-koi-production.up.railway.app/api/camisetas/${id}/tipos/${tipoId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            window.location.reload();
            // Refrescar lista de Tipos de Producto
            setMessage('Tipo de producto eliminado correctamente');
            setIsPopupVisible(true);
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 3000);
        } else {
            alert("Error al eliminar el tipo de producto.");
        }
    };
    const handleProductChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, image: file, url: URL.createObjectURL(file) });
        }
    };

    const handleImageUpload = async () => {
        const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
        if (!apiKey) {
            console.error('API Key is undefined. Please check your .env file');
            return;
        }
        const { image } = product;
        if (!image) {
            console.error('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('key', apiKey);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.data && data.data.url) {
                const uploadedImageUrl = data.data.url;
                const token = localStorage.getItem('token');
                await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/imagenes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ url: uploadedImageUrl }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Imagen añadida:', data);
                        setImages([...images, { url: uploadedImageUrl }]);
                        setMessage('Imagen subida correctamente')
                        setIsPopupVisible(true);
                        setTimeout(() => {
                            setIsPopupVisible(false);
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error('Error al añadir la imagen:', error);
                    });
            }
        } catch (error) {
            console.error('Error al subir la imagen a Imgbb:', error);
        }
    };

    const handleSubmitProduct = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Producto actualizado:', data);
                // navigate(`/product/${id}`);   
                setMessage('Producto Actualizado Correctamente')
                setIsPopupVisible(true); // Mostrar el popup

                // Ocultar el popup después de 3 segundos
                setTimeout(() => {
                    setIsPopupVisible(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error al actualizar el producto:', error);
            });
    };
    const deleteImage = async (idImagen) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/imagenes/${idImagen}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Error al eliminar el producto del carrito");
            setMessage('Imagen Eliminada Correctamente')
            setIsPopupVisible(true);
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 3000);
            //fetchCart(); // Actualizar el carrito después de eliminar
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };
    if (loading) {
        return <div>Cargando...</div>;
    }
    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmitProduct} style={styles.form}>
                <h2>Actualizar Producto</h2>

                <input
                    type="text"
                    name="nombre"
                    value={product.nombre}
                    onChange={handleProductChange}
                    placeholder={product.nombre}
                    style={styles.input}
                />

                <div style={styles.toggleGroup}>
                    <label style={styles.toggleLabel}>
                        Lanzamiento
                        <input
                            type="checkbox"
                            name="lanzamiento"
                            checked={product.lanzamiento}
                            onChange={handleProductChange}
                            style={styles.toggleInput}
                        />
                    </label>

                    <label style={styles.toggleLabel}>
                        Oferta
                        <input
                            type="checkbox"
                            name="oferta"
                            checked={product.oferta}
                            onChange={handleProductChange}
                            style={styles.toggleInput}
                        />
                    </label>
                </div>

                <div style={styles.subColeccionGroup}>
                    <label style={styles.subColeccionLabel}>
                        Subcolección
                        <select
                            name="subColeccionId"
                            value={product.subColeccionId}
                            onChange={handleProductChange}
                            style={styles.selectInput}
                        >
                            {subcolecciones.map((subcoleccion) => (
                                <option key={subcoleccion.id} value={subcoleccion.id}>
                                    {subcoleccion.nombre}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <button type="submit" style={styles.submitButton}>
                    Actualizar Producto
                </button>
            </form>

            <div style={styles.imagesSection}>
                {/* Añadir Imágenes */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleImageUpload();
                    }}
                    style={styles.form}
                >
                    <h2>Añadir Imágenes</h2>

                    <div style={styles.imageUpload}>
                        <label style={styles.imageLabel}>
                            {product.image ? (
                                <img src={product.url} alt="Preview" style={styles.imagePreview} />
                            ) : (
                                <>
                                    <span style={styles.addIcon}>+</span>
                                    <p>Añadir imagen</p>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={styles.fileInput}
                            />
                        </label>
                    </div>
                    <button type="submit" style={styles.submitButton}>
                        Subir Imágenes
                    </button>
                </form>

                {/* Imágenes del Producto */}
                <div style={styles.imagesPreview}>
                    <h3>Imágenes del Producto</h3>
                    {images.length === 0 ? (
                        <p>No hay imágenes para este producto.</p>
                    ) : (
                        <div style={styles.imageGrid}>
                            {images.map((image, index) => (
                                <div key={index} style={styles.imageContainer} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                                    <img
                                        src={image.url}
                                        alt={`Image ${index + 1}`}
                                        style={styles.imagePreview}
                                    />
                                    {hoveredIndex === index && (
                                        <div style={styles.closeButton} >
                                            <img
                                                src="https://i.ibb.co/zFjn8wQ/boton-x-1.png"
                                                alt="Close"
                                                style={styles.closeIcon}
                                                onClick={() => deleteImage(image.id)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Sección de Colores */}
            <div style={styles.colorsSection}>
                <h2>Colores</h2>

                {/* Mostrar colores asociados a la camiseta */}
                <div style={styles.colorList}>
                    {colores.length === 0 ? (
                        <p>No hay colores asociados</p>
                    ) : (
                        colores.map((color) => (
                            <div
                                key={color.id}
                                style={{ ...styles.colorBox, backgroundColor: `${color.hex}` }}
                            />
                        ))
                    )}
                </div>

                {/* Dropdown para seleccionar un nuevo color */}
                <div style={styles.selectGroup}>
                    <label style={styles.label}>Seleccionar Color</label>
                    <select
                        value={selectedColor || ''}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        style={styles.selectInput}
                    >
                        <option value="">Seleccione un color</option>
                        {allColores.map((color) => (
                            <option
                                key={color.id}
                                value={color.id}
                                style={{
                                    backgroundColor: `${color.hex}`,
                                    color: '#fff', // Asegura que el texto sea legible
                                    paddingLeft: '30px', // Espacio para el cuadrado del color
                                    position: 'relative',
                                }}
                            >
                                {/* Espacio para el cuadrado de color */}
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '5px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '15px',
                                        height: '15px',
                                        backgroundColor: `${color.hex}`,
                                        borderRadius: '3px', // Hacer el cuadrado con bordes redondeados
                                    }}
                                />
                                {color.hex}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleAddColor} style={styles.submitButton}>
                    Agregar Color
                </button>
                <Link to="/profile" >Crear Colores</Link>
            </div>
            {/* Tallas */}
            <div style={styles.colorsSection}>
                <h2>Tallas</h2>

                {/* Mostrar Tallas asociados a la camiseta */}
                <div>
                    {tallas.length === 0 ? (
                        <p>No hay Tallas asociados</p>
                    ) : (
                        tallas.map((talla) => (
                            <div key={talla.id} className="size-container" >
                                <span className="size" style={styles.size}>
                                    {talla.nombre}
                                </span>
                                <button className="btn-delete" onClick={() => handleDeleteTalla(talla.id)}>
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Dropdown para seleccionar una nueva Talla */}

                <div style={styles.selectGroup}>
                    <label style={styles.label}>Seleccionar Talla</label>
                    <select
                        value={selectedTalla || ''}
                        onChange={(e) => setSelectedTalla(e.target.value)}
                        style={styles.selectInput}
                    >
                        <option value="">Seleccione una talla</option>
                        {allTallas.map((talla) => (
                            <option key={talla.id} value={talla.id}>
                                {talla.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleAddTalla} style={styles.submitButton}>
                    Agregar Talla
                </button>
                <Link to="/profile" >Crear Tallas</Link>
            </div>
            {/* Tipos de Producto */}
            <div style={styles.colorsSection}>
                <h2>Tipos de Producto</h2>

                {/* Mostrar Tipos de Producto asociados */}
                <div>
                    {tipos.length === 0 ? (
                        <p>No hay Tipos de Producto asociados</p>
                    ) : (
                        tipos.map((tipo) => (
                            <div key={tipo.id} className="size-container">
                                <span className="size" style={styles.size}>
                                    {tipo.nombre} - {tipo.precio}
                                </span>
                                <button className="btn-delete" onClick={() => handleDeleteTipo(tipo.id)}>
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Dropdown para seleccionar un nuevo Tipo de Producto */}
                <div style={styles.selectGroup}>
                    <label style={styles.label}>Seleccionar Tipo de Producto</label>
                    <select
                        value={selectedTipo || ''}
                        onChange={(e) => setSelectedTipo(e.target.value)}
                        style={styles.selectInput}
                    >
                        <option value="">Seleccione un tipo de producto</option>
                        {allTipos.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleAddTipo} style={styles.submitButton}>
                    Agregar Tipo de Producto
                </button>
                <Link to="/profile">Crear Tipos de Producto</Link>
            </div>
            {isPopupVisible && (
                <div className="popup">
                    {message}
                </div>
            )}
        </div>
    );
};

// Estilos
const styles = {
    colorsSection: {
        width: '100%',
        maxWidth: '500px',
        marginTop: '40px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: "rgb(255, 255, 255)"
    },
    colorList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
    },
    colorBox: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #ccc',
    },
    selectGroup: {
        marginBottom: '20px',
    },
    label: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '8px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        padding: '20px',
        
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
        borderTop: "1px solid #ddd",
        backgroundColor: "rgb(255, 255, 255)"
    },
    imagesSection: {
        display: 'flex',
        flexDirection: 'row',  // Cambio de columna a fila
        gap: '40px',
        width: '100%',
        justifyContent: 'center',
    },
    imageGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    imageContainer: {
        width: '150px',
        height: '150px',
        overflow: 'hidden',
        position: "relative",
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        outline: 'none',
    },
    toggleGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
    },
    toggleLabel: {
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        color: '#333',
    },
    toggleInput: {
        marginLeft: '10px',
        transform: 'scale(1.2)',
        cursor: 'pointer',
    },
    subColeccionGroup: {
        width: '100%',
        marginBottom: '20px',
    },
    subColeccionLabel: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '8px',
        display: 'block',
    },
    selectInput: {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '5px',
        outline: 'none',
    },
    submitButton: {
        padding: '12px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    },
    imagePreview: {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '8px',
        position: 'relative',
    },
    addIcon: {
        fontSize: '40px',
        color: '#007bff',
    },
    imageUpload: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
    },
    imageLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px dashed #aaa',
        borderRadius: '8px',
        width: '200px',
        height: '200px',
        justifyContent: 'center',
    },
    fileInput: {
        display: 'none',
    },
    closeButton: {
        position: 'absolute',
        top: '2px',
        left: '2px',
        cursor: 'pointer',
        zIndex: 1000,
    },
    closeIcon: {
        width: '15px',
        height: '15px',
    },
    size: {
        display: 'inline-block',
        padding: '10px 15px',
        margin: '5px',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#555',
    },
    sizeHover: {
        backgroundColor: '#ccc',
        cursor: 'pointer',
    },
};

export default EditProduct;
