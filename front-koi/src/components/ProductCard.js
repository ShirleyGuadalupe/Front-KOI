import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

const ProductCard = ({ product, onDelete }) => {
  const [image, setImage] = useState(null); // Estado para almacenar la primera imagen
  const navigate = useNavigate(); // Usamos el hook useNavigate para la navegación
  const isAdmin = localStorage.getItem('user');
  console.log(isAdmin)
  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Realizamos la petición a la API para obtener las imágenes
        const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${product.id}/imagenes`);
        const data = await response.json();

        // Si existen imágenes, tomamos la primera
        if (data && data.length > 0) {
          setImage(data[0].url); // Asignamos la URL de la primera imagen al estado
        }
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    };

    fetchImage(); // Llamamos a la función para obtener la imagen
  }, [product.id]); // El efecto depende de product.id

  // Función para manejar la eliminación del producto
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      // Hacemos la petición DELETE a la API para eliminar la camiseta
      const response = await fetch(`https://api-koi-production.up.railway.app/api/camisetas/${product.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        } // Usamos el método DELETE
      });

      if (response.ok) {
        // Si la eliminación es exitosa, llamamos a onDelete para actualizar el estado en el componente padre
        onDelete(product.id); // Eliminamos el producto del estado del componente principal
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar la camiseta:", error);
    }
  };
  const redirigir = () => {
    navigate(`/product/${product.id}`);  // Redirige a la ruta "/nueva-pagina"
  };

  return (
    <div style={styles.card} >
      {/* Si hay una imagen, la mostramos */}
      {image ? (
        <img src={image} alt={product.name} style={styles.image} onClick={redirigir}/>
      ) : (
        <div style={styles.imagePlaceholder}>Imagen no disponible</div> // Si no hay imagen, mostramos un mensaje de placeholder
      )}
      <div style={styles.details}>
        <h3 style={styles.title}>{product.nombre}</h3> {/* Asumiendo que 'name' es el nombre del producto */}
      </div>
      { isAdmin ==="true" ? (
      <div style={styles.actions}>
        {/* Botón de editar: navega a la página de edición */}
        <button 
          style={styles.editBtn} 
          onClick={() => navigate(`/edit-product/${product.id}`)} // Navegamos a la ruta de edición
        >
         Editar
        </button>

        {/* Botón de eliminar: llama a handleDelete para eliminar la camiseta */}
        <button 
          style={styles.deleteBtn} 
          onClick={handleDelete} // Llamamos a handleDelete cuando se hace clic
        >
          Eliminar
        </button>
      </div>) : (<></>)}
    </div>
  );
};

const styles = {
  card: {
    alignItems:"center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "8px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    maxWidth: "200px",
    
  },
  image: {
    width:"100%",
    borderRadius: "4px",
    marginBottom: "8px",
    cursor:"pointer",
  },
  imagePlaceholder: {
    width: "100%",
    height: "150px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    marginBottom: "8px",
    color: "#666",
  },
  details: {
    textAlign: "center",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "8px 0",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },
  editBtn: {
    backgroundColor: "#f0f0f0",
    fontSize:"14px",
    border: "none",
    padding: "4px 8px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  deleteBtn: {
    backgroundColor: "#ffdddd",
    fontSize:"14px",
    border: "none",
    padding: "4px 8px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default ProductCard;
