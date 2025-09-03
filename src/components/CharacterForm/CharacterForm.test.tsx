// src/components/CharacterForm/CharacterForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterForm from './CharacterForm';
import React from 'react';
import { useCharacterContext } from '../../contexts/CharacterContext';
import { NewCharacterData } from '../../types/types';

jest.mock('../../contexts/CharacterContext');

const mockUseCharacterContext = useCharacterContext as jest.Mock;

describe('CharacterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente el formulario', () => {
    mockUseCharacterContext.mockReturnValue({
      isCreating: false,
      createCharacter: jest.fn(),
    });

    render(<CharacterForm />);

    expect(screen.getByText(/Crear Nuevo Personaje/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Imagen:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear personaje/i })).toBeInTheDocument();
  });

  test('permite ingresar nombre, estado y archivo', () => {
    mockUseCharacterContext.mockReturnValue({
      isCreating: false,
      createCharacter: jest.fn(),
    });

    render(<CharacterForm />);

    const nameInput = screen.getByLabelText(/Nombre:/i) as HTMLInputElement;
    const statusSelect = screen.getByLabelText(/Estado:/i) as HTMLSelectElement;
    const fileInput = screen.getByLabelText(/Imagen:/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Morty' } });
    fireEvent.change(statusSelect, { target: { value: 'Alive' } });

    const mockFile = new File(['dummy'], 'morty.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(nameInput.value).toBe('Morty');
    expect(statusSelect.value).toBe('Alive');
    expect(fileInput.files?.[0]).toBe(mockFile);
  });

  test('ejecuta createCharacter y resetea el formulario', () => {
    const mockCreate = jest.fn();
    mockUseCharacterContext.mockReturnValue({
      isCreating: false,
      createCharacter: mockCreate,
    });

    render(<CharacterForm />);

    const nameInput = screen.getByLabelText(/Nombre:/i) as HTMLInputElement;
    const statusSelect = screen.getByLabelText(/Estado:/i) as HTMLSelectElement;
    const fileInput = screen.getByLabelText(/Imagen:/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Crear personaje/i });

    // Simular cambios
    fireEvent.change(nameInput, { target: { value: 'Morty' } });
    fireEvent.change(statusSelect, { target: { value: 'Dead' } });

    const mockFile = new File(['dummy'], 'morty.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // Enviar formulario
    fireEvent.click(submitButton);

    expect(mockCreate).toHaveBeenCalledWith({
      name: 'Morty',
      status: 'Dead',
      imageFile: mockFile,
    } as NewCharacterData);

    // Verificar que se reseteó
    expect(nameInput.value).toBe('');
    expect(statusSelect.value).toBe('unknown');
    expect(fileInput.value).toBe('');
  });

  test('muestra "Creando..." cuando isCreating es true', () => {
    mockUseCharacterContext.mockReturnValue({
      isCreating: true,
      createCharacter: jest.fn(),
    });

    render(<CharacterForm />);

    expect(screen.getByRole('button')).toHaveTextContent(/Creando.../i);
    expect(screen.getByLabelText(/Nombre:/i)).toBeDisabled();
    expect(screen.getByLabelText(/Estado:/i)).toBeDisabled();
    expect(screen.getByLabelText(/Imagen:/i)).toBeDisabled();
  });
});
