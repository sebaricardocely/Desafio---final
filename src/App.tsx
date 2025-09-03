/**
 * @fileoverview Componente principal de la aplicación.
 * @version 1.0.0
 * @author J.D.
 */

import React from 'react';
import Characters from './modules/characters/Characters';
import { CharacterProvider } from './contexts/CharacterContext';
import Layout from './components/Layout/index';
import './styles/globals.css';

/**
 * Componente principal de la aplicación.
 * Este componente actúa como el punto de entrada principal.
 * Envuelve toda la aplicación en un proveedor de contexto de personajes
 * y un componente de layout para una estructura y gestión de estado unificadas.
 * @returns El componente principal de la aplicación.
 */
const App: React.FC = () => {
  return (
    <CharacterProvider>
      <Layout>
        <Characters />
      </Layout>
    </CharacterProvider>
  );
};

export default App;