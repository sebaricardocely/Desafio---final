import { useEffect } from 'react';
import { useCharacterContext } from '../contexts/CharacterContext';
import { CharacterService } from '../services/CharacterService';

const characterService = new CharacterService();

/**
 * Hook para gestionar la obtención de personajes de la API.
 * @fileoverview Custom hook que maneja la lógica de carga de personajes,
 * paginación y gestión de errores, interactuando con el contexto global.
 * @exports useCharacters
 */

export const useCharacters = () => {
  const {
    setCharacters,
    setIsLoading,
    setError,
    currentPage,
    setTotalPages,
  } = useCharacterContext();

   /**
   * Efecto que se ejecuta cuando la página actual cambia.
   * Realiza una llamada a la API para obtener los personajes de la página actual.
   *
   * @remarks Este efecto maneja el estado de carga y de error, y actualiza el
   * contexto con los personajes obtenidos y el número total de páginas.
   */
  useEffect(() => {
    /**
     * Función asincrónica para obtener los personajes del servicio.
     */
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await characterService.getCharacters(currentPage);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err: any) {
        setError(err.message);
          // En caso de error, establece un mensaje de error en el estado.
      } finally {
        setIsLoading(false);
        // Se ejecuta siempre, independientemente del resultado.
      }
    };

    fetchCharacters();
  }, [currentPage, setCharacters, setIsLoading, setError, setTotalPages]);
};