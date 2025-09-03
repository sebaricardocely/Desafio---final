/**
 * @fileoverview Definiciones de tipos para la aplicación.
 * @version 1.0.0
 * @author J.D.
 */

/**
 * Representa la estructura de un personaje.
 * @interface
 * @property {number} id - El identificador único del personaje.
 * @property {string} name - El nombre del personaje.
 * @property {string} image - La URL de la imagen del personaje.
 * @property {'Alive' | 'Dead' | 'unknown'} status - El estado de vida del personaje.
 * @property {string} species - La especie a la que pertenece el personaje.
 * @property {string} gender - El género del personaje.
 * @property {Object} origin - El origen del personaje.
 * @property {string} origin.name - El nombre del origen.
 * @property {string} origin.url - La URL del origen.
 * @property {Object} location - La última ubicación conocida del personaje.
 * @property {string} location.name - El nombre de la ubicación.
 * @property {string} location.url - La URL de la ubicación.
 */
export interface Character {
  id: number;
  name: string;
  image: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

/**
 * Representa la estructura de los datos de un personaje en el formulario de creación.
 * @interface
 * @property {File | null} imageFile - El archivo de imagen subido por el usuario.
 * @property {string} name - El nombre del personaje.
 * @property {'Alive' | 'Dead' | 'unknown'} status - El estado del personaje.
 */
export interface NewCharacterData {
  imageFile: File | null;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
}