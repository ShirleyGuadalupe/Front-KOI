import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado para almacenar los datos de la camiseta
    const [product, setProduct] = useState({
        name: '',
        lanzamiento: false,
        oferta: false,
        subColeccionId: 1,
    });
    
    // Estado para manejar las imágenes
    const [subcolecciones, setSubcolecciones] = useState([]);
    const [images, setImages] = useState([]);  // Aseguramos que images es un array
    const [loading, setLoading] = useState(true);

    // Cargar el producto, subcolecciones y las imágenes
    useEffect(() => {
        // Cargar datos del producto
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

        // Cargar subcolecciones
        fetch('https://api-koi-production.up.railway.app/api/sub-colecciones')
            .then((response) => response.json())
            .then((data) => {
                setSubcolecciones(data);
            })
            .catch((error) => console.error('Error al obtener subcolecciones:', error));

        // Cargar imágenes del producto
        fetch(`https://api-koi-production.up.railway.app/api/camisetas/${id}/imagenes`)
            .then((response) => response.json())
            .then((data) => {
                // Aseguramos que data sea un array
                setImages(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error('Error al obtener las imágenes:', error);
                setImages([]); // Si hay un error, ponemos images como un array vacío
            });
    }, [id]);

    // Manejar cambios en los datos del producto
    const handleProductChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Manejar la selección de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setProduct({ ...product, image: file, url: URL.createObjectURL(file) });
        }
    };

    // Subir la imagen a Imgbb y luego enviarla al endpoint
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
          // Subir la imagen a Imgbb
          const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          if (data.data && data.data.url) {
            // Si la imagen se sube correctamente, obtenemos la URL
            const uploadedImageUrl = data.data.url;

            // Luego, enviamos la URL de la imagen al endpoint de tu API
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
                setImages([...images, { url: uploadedImageUrl }]); // Actualizar las imágenes en el estado
              })
              .catch((error) => {
                console.error('Error al añadir la imagen:', error);
              });
          }
        } catch (error) {
          console.error('Error al subir la imagen a Imgbb:', error);
        }
    };

    // Enviar el formulario de actualización de producto
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
        <div style={{ display: 'flex', gap: '40px' }}>
            {/* Formulario de Datos del Producto */}
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

            {/* Formulario de Imágenes */}
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

            {/* Visualizar las imágenes existentes */}
            <div>
                <h3>Imágenes del Producto</h3>
                {images.length === 0 ? (
                    <p>No hay imágenes para este producto.</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {images.map((image, index) => (
                            <div key={index} style={{ width: '150px', height: '150px', overflow: 'hidden' }}>
                                <img
                                    src={image.url}
                                    alt={`Image ${index + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Estilos
const styles = {
    fileInput: {
        display: "none",
    },
    imagePreview: {
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "8px",        
    },
    addButton: {
        padding: "8px 12px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    imageUpload: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:"10px",
    },
    imageLabel: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        border: "1px dashed #aaa",
        borderRadius: "8px",
        width: "200px",
        height: "200px",
        justifyContent: "center",
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
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
        marginBottom:"8px",
    },
    submitButton: {
        padding: '12px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: '100%',
    },
};

export default EditProduct;
