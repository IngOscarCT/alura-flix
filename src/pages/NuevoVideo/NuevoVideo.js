import React, { useState } from 'react'; // Importa React y useState de la biblioteca de React
import axios from 'axios';
import styles from "./NuevoVideo.module.css";
import Header from "componets/Header/Header";
import Footer from "componets/Footer/Footer";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación

function NuevoVideo() {
    const [formValues, setFormValues] = useState({
        title: '',
        category: 'Selecciona la categoría', // Valor por defecto para categoría
        thumbnail: '',
        videoUrl: '',
        description: ''
    }); // Estado para almacenar los valores del formulario

    const [errors, setErrors] = useState({}); // Estado para almacenar los errores de validación

    const navigate = useNavigate(); // Hook para la navegación

    const handleInputChange = (e) => {
        const { name, value } = e.target; // Desestructura el nombre y valor del evento de cambio
        setFormValues({
            ...formValues,
            [name]: value
        }); // Actualiza el estado con la nueva información
        setErrors({
            ...errors,
            [name]: ''
        }); // Limpia los errores al cambiar los valores del formulario
    };

    const validate = () => {
        const newErrors = {}; // Inicializa un objeto para los nuevos errores

        // Validar que todos los campos estén completos
        if (!formValues.title) newErrors.title = 'Información requerida';
        if (formValues.category === 'Selecciona la categoría') newErrors.category = 'Información requerida';
        if (!formValues.thumbnail) newErrors.thumbnail = 'Información requerida';
        if (!formValues.videoUrl) newErrors.videoUrl = 'Información requerida';
        if (!formValues.description) newErrors.description = 'Información requerida';

        setErrors(newErrors); // Actualiza los errores en el estado
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene la acción predeterminada del formulario
        if (!validate()) return; // Valida el formulario y si hay errores, no envía

        axios.post('http://localhost:3000/videos', formValues) // Realiza una solicitud POST a la API
            .then(response => {
                console.log('Formulario enviado:', response.data); // Muestra el video creado en la consola
                // Limpia el formulario después del envío exitoso
                setFormValues({
                    title: '',
                    category: 'Selecciona la categoría',
                    thumbnail: '',
                    videoUrl: '',
                    description: ''
                });
                navigate("/NuevoVideo"); // Recarga la página
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error); // Maneja cualquier error en la solicitud
            });
    };

    return (
        <div className={styles.nuevoVideoPage}>
            <Header /> {/* Renderiza el componente Header */}
            <div className={styles.mainSection}>
                <h2>Nuevo Video</h2>
                <p>Complete el formulario para crear una nueva tarjeta de video</p>
                <h3>Crear Tarjeta</h3>
                <form onSubmit={handleSubmit}>
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleInputChange}
                        className={errors.title ? styles.inputError : ''}
                    />
                    {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
                    <br />

                    <label>Categoría:</label>
                    <select
                        name="category"
                        value={formValues.category}
                        onChange={handleInputChange}
                        className={errors.category ? styles.inputError : ''}
                    >
                        <option disabled>Selecciona la categoría</option>
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
                        value={formValues.thumbnail}
                        onChange={handleInputChange}
                        className={errors.thumbnail ? styles.inputError : ''}
                    />
                    {errors.thumbnail && <span className={styles.errorMessage}>{errors.thumbnail}</span>}
                    <br />

                    <label>URL del Video:</label>
                    <input
                        type="text"
                        name="videoUrl"
                        value={formValues.videoUrl}
                        onChange={handleInputChange}
                        className={errors.videoUrl ? styles.inputError : ''}
                    />
                    {errors.videoUrl && <span className={styles.errorMessage}>{errors.videoUrl}</span>}
                    <br />

                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={formValues.description}
                        onChange={handleInputChange}
                        className={errors.description ? styles.inputError : ''}
                    />
                    {errors.description && <span className={styles.errorMessage}>{errors.description}</span>}
                    <br />

                    <button type="submit">Guardar</button>
                    <button
                        type="reset"
                        onClick={() => {
                            setFormValues({
                                title: '',
                                category: 'Selecciona la categoría',
                                thumbnail: '',
                                videoUrl: '',
                                description: ''
                            });
                            setErrors({}); // Limpiar errores
                        }}
                    >Limpiar</button>
                </form>
            </div>
            <Footer /> {/* Renderiza el componente Footer */}
        </div >
    );
}

export default NuevoVideo; // Exporta el componente NuevoVideo como el valor por defecto