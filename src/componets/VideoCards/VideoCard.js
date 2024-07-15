import React, { useState } from "react";
import axios from "axios";
import ModalVideo from "componets/ModalVideo/ModalVideo";
import styles from "./VideoCards.module.css";
import Modal from "../Modal/Modal";
import iconoEditar from "./editarCard.png";
import iconoEliminar from "./eliminarCard.png";

function VideoCard({ video, onEdit, onDelete }) {
    // Estado para controlar si el modal de edición está abierto
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Estado para almacenar el video editado
    const [editedVideo, setEditedVideo] = useState(video || {}); // Inicializar con un objeto vacío si video es undefined
    // Estado para controlar si el modal de reproducción de video está abierto
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // Función para manejar el clic en el botón de editar
    const handleEditClick = () => {
        setIsModalOpen(true); // Abrir el modal de edición
        setEditedVideo(video); // Establecer el video a editar en el estado local
    };

    // Función para guardar los cambios editados del video
    const handleSaveChanges = () => {
        axios.put(`http://localhost:3000/videos/${editedVideo.id}`, editedVideo) // Petición PUT para actualizar el video en la API
            .then((response) => {
                onEdit(response.data, editedVideo.id); // Actualizar el video editado en el estado global de la aplicación
                setIsModalOpen(false); // Cerrar el modal después de guardar los cambios
            })
            .catch(error => {
                console.error("Error updating video:", error); // Manejo de errores en caso de fallo en la actualización
            });
    };

    // Función para eliminar un video
    const handleDelete = () => {
        axios.delete(`http://localhost:3000/videos/${video.id}`) // Petición DELETE para eliminar el video de la API
            .then(() => {
                onDelete(video.id); // Eliminar el video del estado global de la aplicación
            })
            .catch(error => {
                console.error("Error deleting video:", error); // Manejo de errores en caso de fallo en la eliminación
            });
    };

    // Función para manejar el cambio en los inputs del formulario de edición
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedVideo({
            ...editedVideo,
            [name]: value,
        });
    };

    // Función para manejar el clic en la miniatura del video
    const handleThumbnailClick = () => {
        setIsVideoModalOpen(true); // Abrir el modal de reproducción de video
    };

    // Función para cerrar el modal de reproducción de video
    const handleCloseVideoModal = () => {
        setIsVideoModalOpen(false);
    };

    // Función para cerrar el modal de edición
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Verificar si video existe antes de renderizar el componente
    if (!video) {
        return null; // Si no hay video, no renderizar nada
    }

    // Renderización del componente VideoCard
    return (
        <div className={styles.videoCard}>
            <div onClick={handleThumbnailClick}>
                {video.thumbnail && (
                    <img src={video.thumbnail} alt={video.title} className={styles.videoThumbnail} />
                )}
            </div>
            <div className={styles.videoInfo}>
                {video.title && <h3>{video.title}</h3>}
                {video.description && <p>{video.description}</p>}
                <div className={styles.videoActions}>
                    <img src={iconoEditar} alt="Editar" /> {/* Icono para editar el video */}
                    <button onClick={handleEditClick}>Editar</button> {/* Botón para editar el video */}
                    <img src={iconoEliminar} alt="Eliminar" /> {/* Icono para eliminar el video */}
                    <button onClick={handleDelete}>Eliminar</button> {/* Botón para eliminar el video */}
                </div>
            </div>

            {/* Modal para editar el video */}
            <Modal show={isModalOpen} onClose={handleCloseModal} onSave={handleSaveChanges} video={editedVideo}>
                <h2>Editar Video</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveChanges(); // Guarda los cambios al enviar el formulario
                }}>
                    <label>Título:</label>
                    <input type="text" name="title" value={editedVideo.title || ""} onChange={handleInputChange} />
                    <br />
                    <label>Descripción:</label>
                    <textarea name="description" value={editedVideo.description || ""} onChange={handleInputChange} />
                    <br />
                    <button type="submit">Guardar Cambios</button>
                </form>
            </Modal>

            {/* Modal para reproducir el video */}
            <ModalVideo show={isVideoModalOpen} videoUrl={video.videoUrl} onClose={handleCloseVideoModal} />
        </div>
    );
}

export default VideoCard;