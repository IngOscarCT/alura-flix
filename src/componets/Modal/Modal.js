// src/components/Modal.js
import React, { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css"; // Importa el archivo de estilos para el modal

function Modal({ show, onClose, onSave, video }) {
  const [editedVideo, setEditedVideo] = useState(video || {
    title: '',
    category: 'Selecciona la categoría',
    thumbnail: '',
    videoUrl: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVideo({
      ...editedVideo,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleClearForm = () => {
    setEditedVideo({
      title: '',
      category: 'Selecciona la categoría',
      thumbnail: '',
      videoUrl: '',
      description: ''
    });
    setErrors({});
  };

  const handleSaveChanges = () => {
    console.log('Guardando cambios...');
    console.log('Video editado:', editedVideo);
    if (!validate()) return;
    // Realizar la solicitud PUT para actualizar el video
    axios.put(`http://localhost:3000/videos/${editedVideo.id}`, editedVideo)
      .then((response) => {
        console.log('Response data:', response.data);
        onSave(response.data); // Llamar a la función onSave para guardar los cambios
        onClose(); // Cerrar el modal después de guardar los cambios
      })
      .catch(error => {
        console.error("Error updating video:", error);
      });
  };

  const validate = () => {
    const newErrors = {};

    if (!editedVideo.title) newErrors.title = 'Información requerida';
    if (editedVideo.category === 'Selecciona la categoría') newErrors.category = 'Información requerida';
    if (!editedVideo.thumbnail) newErrors.thumbnail = 'Información requerida';
    if (!editedVideo.videoUrl) newErrors.videoUrl = 'Información requerida';
    if (!editedVideo.description) newErrors.description = 'Información requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>X</button>
        <h2>Editar Video</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSaveChanges();
        }}>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={editedVideo.title || ''}
            onChange={handleInputChange}
            className={errors.title ? styles.inputError : ''}
          />
          {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
          <br />

          <label>Categoría:</label>
          <select
            name="category"
            value={editedVideo.category}
            onChange={handleInputChange}
            className={errors.category ? styles.inputError : ''}
          >
            <option value="Selecciona la categoría">Selecciona la categoría</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="DPersonal">Innovación y Gestión</option>
          </select>
          {errors.category && <span className={styles.errorMessage}>{errors.category}</span>}
          <br />

          <label>Imagen:</label>
          <input
            type="text"
            name="thumbnail"
            value={editedVideo.thumbnail || ''}
            onChange={handleInputChange}
            className={errors.thumbnail ? styles.inputError : ''}
          />
          {errors.thumbnail && <span className={styles.errorMessage}>{errors.thumbnail}</span>}
          <br />

          <label>Video:</label>
          <input
            type="text"
            name="videoUrl"
            value={editedVideo.videoUrl || ''}
            onChange={handleInputChange}
            className={errors.videoUrl ? styles.inputError : ''}
          />
          {errors.videoUrl && <span className={styles.errorMessage}>{errors.videoUrl}</span>}
          <br />

          <label>Descripción:</label>
          <textarea
            name="description"
            value={editedVideo.description || ''}
            onChange={handleInputChange}
            className={errors.description ? styles.inputError : ''}
          />
          {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
          <br />

          <div className={styles.modalActions}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={handleClearForm}>Limpiar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;