/**
 * @fileoverview Componente de layout principal de la aplicación.
 * @version 1.0.0
 * @author S.A.
 */

import React, { ReactNode } from 'react';
import styles from './Layout.module.css';

/**
 * Propiedades del componente Layout.
 * @interface
 * @property {ReactNode} children - Los elementos hijos a renderizar dentro del layout.
 */
interface LayoutProps {
  children: ReactNode;
}

/**
 * Componente de diseño para la estructura principal de la página.
 * @param {LayoutProps} { children } - Los hijos a renderizar.
 * @returns {JSX.Element} El componente de layout.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;


export {};