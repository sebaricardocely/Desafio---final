// src/components/CharacterDetails/CharacterDetails.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';
import React from 'react';
import { Character } from '../../types/types';
import { useCharacterContext } from '../../contexts/CharacterContext';

// 🔹 Mockear el hook del contexto
jest.mock('../../contexts/CharacterContext');

const mockUseCharacterContext = useCharacterContext as jest.Mock;

// 🔹 Datos de prueba
const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
};

describe('CharacterDetails', () => {
  test('no renderiza nada si no hay personaje seleccionado', () => {
    mockUseCharacterContext.mockReturnValue({
      selectedCharacter: null,
      deselectCharacter: jest.fn(),
    });

    const { container } = render(<CharacterDetails />);
    expect(container.firstChild).toBeNull();
  });

  test('muestra los detalles del personaje cuando hay uno seleccionado', () => {
    mockUseCharacterContext.mockReturnValue({
      selectedCharacter: mockCharacter,
      deselectCharacter: jest.fn(),
    });

    render(<CharacterDetails />);

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Estado:/i)).toBeInTheDocument();
    expect(screen.getByText(/Especie:/i)).toBeInTheDocument();
    expect(screen.getByText(/Género:/i)).toBeInTheDocument();
    expect(screen.getByText(/Origen:/i)).toBeInTheDocument();
    expect(screen.getByText(/Ubicación:/i)).toBeInTheDocument();
  });

  test('ejecuta deselectCharacter al hacer clic en el botón de cerrar', () => {
    const mockDeselect = jest.fn();

    mockUseCharacterContext.mockReturnValue({
      selectedCharacter: mockCharacter,
      deselectCharacter: mockDeselect,
    });

    render(<CharacterDetails />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockDeselect).toHaveBeenCalled();
  });
});
