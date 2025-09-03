// src/components/CharacterCard/CharacterCard.tsx

/**
 * @fileoverview Componente de tarjeta para mostrar un personaje.
 * @version 1.0.0
 * @author J.D.
 */

import React from 'react';
import { Character } from '../../types/types';
import styles from './CharacterCard.module.css';

/**
 * Propiedades del componente CharacterCard.
 * @interface
 */
interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

/**
 * Componente que renderiza una tarjeta de personaje.
 * @param props Las propiedades del componente.
 * @param props.character - El objeto personaje a mostrar.
 * @param props.onClick - La función a ejecutar al hacer clic en la tarjeta.
 * @returns El componente de tarjeta.
 */
const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.image} src={character.image} alt={character.name} />
      <div className={styles.info}>
        <h3 className={styles.name}>{character.name}</h3>
        <p className={styles.status}>Status: {character.status}</p>
      </div>
    </div>
  );
};

export default CharacterCard;