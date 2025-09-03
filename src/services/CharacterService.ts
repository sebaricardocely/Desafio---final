/**
 * @fileoverview Servicio para manejar las peticiones a la API de personajes.
 * @version 1.0.0
 * @author J.D.
 */

import axios from 'axios';
import { Character, NewCharacterData } from '../types/types';

/**
 * Clase de servicio para interactuar con la API de personajes.
 * @class
 */
export class CharacterService {
  private api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
  });

  /**
   * Obtiene la lista de todos los personajes.
   * @param {number} page - El número de página a solicitar.
   * @returns {Promise<any>} Una promesa que resuelve con los datos paginados de la API.
   */
  public async getCharacters(page: number = 1): Promise<any> {
    try {
      const response = await this.api.get(`/character?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
      throw new Error('No se pudo obtener la lista de personajes.');
    }
  }

  /**
   * Obtiene los detalles de un personaje específico por su ID.
   * @param {number} id - El ID del personaje.
   * @returns {Promise<Character>} Una promesa que resuelve con los datos del personaje.
   */
  public async getCharacterById(id: number): Promise<Character> {
    try {
      const response = await this.api.get(`/character/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el personaje con ID ${id}:`, error);
      throw new Error(`No se pudo encontrar el personaje con ID ${id}.`);
    }
  }

  /**
   * Crea un nuevo personaje enviando los datos a la API.
   * NOTA: La API de Rick and Morty no soporta realmente peticiones POST para crear personajes.
   * Este método simula la lógica de envío para cumplir con los requisitos del ejercicio.
   * En un entorno real, la URL del endpoint y la estructura del payload serían diferentes.
   * @param {FormData} characterData - Los datos del nuevo personaje, incluyendo la imagen.
   * @returns {Promise<Character>} Una promesa que resuelve con el personaje creado.
   */
  public async createCharacter(characterData: FormData): Promise<Character> {
    try {
      // Intenta enviar los datos al webhook.
      await axios.post('https://webhook.site/c07be521-865f-4e7d-ada1-4386e2b6ce13', characterData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      // Si la llamada falla, simplemente lo registramos en la consola
      // y continuamos la ejecución para que la tarjeta se muestre de todas formas.
      console.error('La petición a la API falló, pero el personaje simulado se mostrará:', error);
    }
    
    // Fuera del bloque try-catch, siempre creamos y retornamos el personaje.
    const newCharacter: Character = {
      id: Math.floor(Math.random() * 1000) + 200,
      name: characterData.get('name') as string,
      image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
      status: characterData.get('status') as 'Alive' | 'Dead' | 'unknown',
      species: 'Human',
      gender: 'unknown',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
    };

    return newCharacter;
  }
}