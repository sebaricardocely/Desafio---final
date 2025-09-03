import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Character, NewCharacterData } from '../types/types';
import { CharacterService } from '../services/CharacterService';

const characterService = new CharacterService();

/**
 * Propiedades del contexto de personajes.
 * @fileoverview Define el contrato para el contexto de personajes, incluyendo el estado y las funciones.
 */
export interface CharacterContextProps {
  characters: Character[];
  selectedCharacter: Character | null;
  isLoading: boolean;
  error: string | null;
  selectCharacter: (id: number) => void;
  deselectCharacter: () => void;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isCreating: boolean;
  createCharacter: (characterData: NewCharacterData) => Promise<void>;
}

/**
 * Contexto de React para gestionar el estado de los personajes.
 */
const CharacterContext = createContext<CharacterContextProps | undefined>(
  undefined
);

/**
 * Propiedades del proveedor de contexto.
 * @interface
 */
interface CharacterProviderProps {
  children: ReactNode;
}

/**
 * Proveedor de contexto para la gestión de personajes.
 * @param children Los componentes hijos que tendrán acceso al contexto.
 * @returns Un proveedor de contexto que envuelve a los hijos.
 */
export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  /**
   * Estado de la lista de personajes.
   */
  const [characters, setCharacters] = useState<Character[]>([]);
  
  /**
   * Estado del personaje seleccionado.
   */
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  
  /**
   * Estado de carga de la aplicación.
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  /**
   * Estado de error para la carga de datos.
   */
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Estado de la página actual de la paginación.
   */
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  /**
   * Estado del número total de páginas.
   */
  const [totalPages, setTotalPages] = useState<number>(1);
  
  /**
   * Estado que indica si se está creando un personaje.
   */
  const [isCreating, setIsCreating] = useState<boolean>(false);

  /**
   * Selecciona un personaje por su ID.
   * @param id El ID del personaje a seleccionar.
   */
  const selectCharacter = (id: number) => {
    const character = characters.find((char) => char.id === id);
    if (character) {
      setSelectedCharacter(character);
    }
  };

  /**
   * Deselecciona el personaje actualmente seleccionado.
   */
  const deselectCharacter = () => {
    setSelectedCharacter(null);
  };

  /**
   * Cambia la página actual de la paginación.
   * @param page La página a la que se desea navegar.
   */
  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Crea un nuevo personaje y lo añade a la lista.
   * @param characterData Los datos del nuevo personaje.
   * @returns Una promesa que se resuelve cuando el personaje ha sido creado.
   */
  const createCharacter = async (characterData: NewCharacterData) => {
    setIsCreating(true);
    setError(null);
    try {
      // Creamos el FormData aquí para que el servicio pueda usarlo
      const formData = new FormData();
      formData.append('name', characterData.name);
      if (characterData.imageFile) {
        formData.append('imageFile', characterData.imageFile);
      }
      formData.append('status', characterData.status);
      
      const newCharacter = await characterService.createCharacter(formData);
      setCharacters([newCharacter, ...characters]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * El valor que se proporcionará al contexto.
   * Contiene el estado y las funciones para manipular los personajes.
   */
  const value = {
    characters,
    selectedCharacter,
    isLoading,
    error,
    setCharacters,
    setIsLoading,
    setError,
    selectCharacter,
    deselectCharacter,
    currentPage,
    totalPages,
    setPage,
    setTotalPages,
    isCreating,
    createCharacter,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de personajes.
 * @returns El contexto de personajes.
 * @throws Error si no se utiliza dentro de un CharacterProvider.
 */
export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};