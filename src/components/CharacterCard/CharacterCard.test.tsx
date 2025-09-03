// src/components/CharacterCard/CharacterCard.test.tsx
import { render, screen } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import React from 'react';
import { Character } from '../../types/types';

// Datos de prueba para el personaje
const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
};

describe('CharacterCard', () => {
  test('debe mostrar el nombre y el estado del personaje', () => {
    render(<CharacterCard character={mockCharacter} onClick={() => {}} />);

    const nameElement = screen.getByText(/Rick Sanchez/i);
    expect(nameElement).toBeInTheDocument();

    const statusElement = screen.getByText(/Status: Alive/i);
    expect(statusElement).toBeInTheDocument();
  });

  test('debe mostrar la imagen del personaje con el alt correcto', () => {
    render(<CharacterCard character={mockCharacter} onClick={() => {}} />);

    const imageElement = screen.getByAltText(/Rick Sanchez/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockCharacter.image);
  });
});
