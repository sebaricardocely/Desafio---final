/**
 * @fileoverview Componente para mostrar los detalles de un personaje.
 * @version 1.0.0
 * @author J.D.
 */

import React from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import styles from './CharacterDetails.module.css';

/**
 * Componente que renderiza los detalles de un personaje seleccionado.
 * @returns El componente de detalles o null si no hay personaje seleccionado.
 */
const CharacterDetails: React.FC = () => {
  const { selectedCharacter, deselectCharacter } = useCharacterContext();

  /**
   * Verifica si hay un personaje seleccionado.
   * Si no hay, no se renderiza nada.
   */
  if (!selectedCharacter) {
    return null;
  }

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.closeButton} onClick={deselectCharacter}>
        &times;
      </button>
      <img className={styles.image} src={selectedCharacter.image} alt={selectedCharacter.name} />
      <h2 className={styles.name}>{selectedCharacter.name}</h2>
      <p>
        <strong>Estado:</strong> {selectedCharacter.status}
      </p>
      <p>
        <strong>Especie:</strong> {selectedCharacter.species}
      </p>
      <p>
        <strong>Género:</strong> {selectedCharacter.gender}
      </p>
      <p>
        <strong>Origen:</strong> {selectedCharacter.origin.name}
      </p>
      <p>
        <strong>Ubicación:</strong> {selectedCharacter.location.name}
      </p>
    </div>
  );
};

export default CharacterDetails;