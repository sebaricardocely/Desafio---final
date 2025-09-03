import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import { NewCharacterData } from '../../types/types';
import styles from './CharacterForm.module.css';

/**
 * @fileoverview Componente de formulario para agregar un nuevo personaje.
 * @returns El componente del formulario.
 */
const CharacterForm: React.FC = () => {
  const { isCreating, createCharacter } = useCharacterContext();
  const [formData, setFormData] = useState<NewCharacterData>({
    imageFile: null,
    name: '',
    status: 'unknown',
  });
  
  /**
   * Estado para el mensaje de confirmación de creación exitosa.
   */
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Referencia al elemento de input de tipo file para poder resetearlo.
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Maneja los cambios en los campos de entrada de texto y selección.
   * @param event El evento de cambio del input.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Maneja la selección de un archivo de imagen.
   * @param event El evento de cambio del input de tipo 'file'.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData(prev => ({ ...prev, imageFile: file }));
  };

  /**
   * Maneja el envío del formulario.
   * @param event El evento de envío del formulario.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.name && formData.imageFile) {
      try {
        await createCharacter(formData);
        setSuccessMessage('¡Personaje creado exitosamente!');

        // Limpia el estado del formulario
        setFormData({
          imageFile: null,
          name: '',
          status: 'unknown',
        });
        
        // Resetea el valor del input de archivo usando la referencia
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Limpia el mensaje de éxito después de 3 segundos
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (error) {
        console.error('Error al crear el personaje:', error);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Crear Nuevo Personaje</h2>
      
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nombre del personaje"
            required
            disabled={isCreating}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="status">Estado:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
            disabled={isCreating}
          >
            <option value="unknown">Desconocido</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="imageFile">Imagen:</label>
          <input
            ref={fileInputRef} 
            type="file"
            id="imageFile"
            name="imageFile"
            onChange={handleFileChange}
            required
            disabled={isCreating}
          />
        </div>
      </div>
      <button type="submit" className={styles.submitButton} disabled={isCreating}>
        {isCreating ? 'Creando...' : 'Crear personaje'}
      </button>
    </form>
  );
};

export default CharacterForm;