import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from './useCharacters';
import { CharacterProvider } from '../contexts/CharacterContext';
import { CharacterService } from '../services/CharacterService';

// Mock del servicio
jest.mock('../services/CharacterService');
const mockGetCharacters = jest.fn();
(CharacterService as jest.Mock).mockImplementation(() => ({
  getCharacters: mockGetCharacters,
}));

// Wrapper con el contexto
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CharacterProvider>{children}</CharacterProvider>
);

describe('useCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('carga personajes correctamente', async () => {
    mockGetCharacters.mockResolvedValue({
      results: [{ id: 1, name: 'Rick' }],
      info: { pages: 5 },
    });

    renderHook(() => useCharacters(), { wrapper });

    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledWith(1); // página inicial
    });
  });

  test('maneja error al cargar personajes', async () => {
    mockGetCharacters.mockRejectedValue(new Error('Error de API'));

    renderHook(() => useCharacters(), { wrapper });

    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledTimes(1);
    });
  });
});
