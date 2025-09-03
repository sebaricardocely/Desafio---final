import React, { useEffect } from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import { useCharacters } from '../../hooks/useCharacters';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import CharacterForm from '../../components/CharacterForm/CharacterForm';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import styles from './Characters.module.css';

/**
 * Componente principal que maneja la visualización de la lista de personajes y el formulario.
 * @returns {JSX.Element} El componente del módulo de personajes.
 */
const Characters: React.FC = () => {
  const {
    characters,
    isLoading,
    error,
    selectedCharacter,
    selectCharacter,
    currentPage,
    totalPages,
    setPage
  } = useCharacterContext();

  useCharacters(); // Carga inicial de datos

  const handleTitleClick = () => {
    setPage(1); // Cambia la página a la primera
  };

  // Este useEffect se activa cada vez que la página cambia y desplaza la vista al inicio
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  return (
    <div className={styles.container}>
      {/* Lógica condicional: si la página es 1, muestra un h1; si no, un botón */}
      {currentPage === 1 ? (
        <h1 className={`${styles.mainTitle} ${styles.title}`}>
          Desafio RICK & MORTY
        </h1>
      ) : (
        <button
          onClick={handleTitleClick}
          className={`${styles.mainTitle} ${styles.titleAsButton}`}
        >
          Desafio RICK & MORTY
        </button>
      )}

      {/* El formulario solo se renderizará si la página actual es 1 */}
      {currentPage === 1 && <CharacterForm />}

      {/* Título de Personajes */}
      <h2 className={styles.subtitle}>Personajes</h2>

      {isLoading && <p className={styles.loading}>Cargando personajes...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!isLoading && !error && characters.length === 0 && (
        <p>No hay personajes para mostrar.</p>
      )}

      <div className={styles.characterGrid}>
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => selectCharacter(character.id)}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        {/* Renderiza el botón "Anterior" solo si no es la primera página */}
        {currentPage > 1 && (
          <button onClick={() => setPage(currentPage - 1)}>Anterior</button>
        )}

        <span className={styles.pageInfo}>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Siguiente
        </button>
      </div>

      {selectedCharacter && <CharacterDetails />}
    </div>
  );
};

export default Characters;
