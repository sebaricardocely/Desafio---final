import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { CharacterProvider, useCharacterContext } from './CharacterContext';
import { Character } from '../types/types';

// Mock del servicio
jest.mock('../services/CharacterService', () => {
  return {
    CharacterService: jest.fn().mockImplementation(() => ({
      createCharacter: jest.fn(async (formData: FormData) => {
        return {
          id: 999,
          name: formData.get('name'),
          status: formData.get('status'),
          image: 'fake.png',
          species: 'Human',
          gender: 'Male',
          origin: { name: 'Earth', url: '' },
          location: { name: 'Citadel', url: '' },
        };
      }),
    })),
  };
});

// Personaje de prueba
const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  image: 'rick.png',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
};

// Componente auxiliar para consumir el contexto en las pruebas
const TestComponent = () => {
  const {
    characters,
    selectedCharacter,
    selectCharacter,
    deselectCharacter,
    setCharacters,
    createCharacter,
    isCreating,
  } = useCharacterContext();

  return (
    <div>
      <p data-testid="selected">
        {selectedCharacter ? selectedCharacter.name : 'Ninguno'}
      </p>
      <button onClick={() => setCharacters([mockCharacter])}>Cargar personajes</button>
      <button onClick={() => selectCharacter(1)}>Seleccionar</button>
      <button onClick={deselectCharacter}>Deseleccionar</button>
      <button
        onClick={() =>
          createCharacter({ name: 'Morty', status: 'Alive', imageFile: null })
        }
      >
        Crear personaje
      </button>
      <p data-testid="isCreating">{isCreating ? 'true' : 'false'}</p>
      <p data-testid="charactersCount">{characters.length}</p>
    </div>
  );
};

describe('CharacterContext', () => {
  test('inicia con valores por defecto', () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );

    expect(screen.getByTestId('selected')).toHaveTextContent('Ninguno');
    expect(screen.getByTestId('isCreating')).toHaveTextContent('false');
    expect(screen.getByTestId('charactersCount')).toHaveTextContent('0');
  });

  test('permite seleccionar y deseleccionar un personaje', () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );

    fireEvent.click(screen.getByText('Cargar personajes'));
    fireEvent.click(screen.getByText('Seleccionar'));
    expect(screen.getByTestId('selected')).toHaveTextContent('Rick Sanchez');

    fireEvent.click(screen.getByText('Deseleccionar'));
    expect(screen.getByTestId('selected')).toHaveTextContent('Ninguno');
  });

  test('createCharacter añade un personaje a la lista', async () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );

    fireEvent.click(screen.getByText('Crear personaje'));

    // VerifiCACIÓN de activación del estado de carga
    expect(screen.getByTestId('isCreating')).toHaveTextContent('true');

    // Esperar fin de la promesa
    await waitFor(() =>
      expect(screen.getByTestId('isCreating')).toHaveTextContent('false')
    );

    expect(screen.getByTestId('charactersCount')).toHaveTextContent('1');
  });
});
