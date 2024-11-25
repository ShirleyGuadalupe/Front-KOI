import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
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
            })
            .catch((error) => {
                console.error('Error al agregar el color:', error);
            });
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
                navigate(`/product/${id}`);
            })
            .catch((error) => {
                console.error('Error al actualizar el producto:', error);
            });
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
                    name="name"
                    value={product.name}
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
                                <div key={index} style={styles.imageContainer}>
                                    <img
                                        src={image.url}
                                        alt={`Image ${index + 1}`}
                                        style={styles.imagePreview}
                                    />
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
                <Link to="/profile-admin" >Crear Colores</Link>
            </div>
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
};

export default EditProduct;
