import React from 'react';
import { Link } from 'react-router-dom';

export const BottomMenu = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-blue-800 text-white shadow-lg">
      <ul className="flex justify-around items-center h-16 text-sm md:text-base font-semibold">
        <li><Link to="/" className="hover:text-blue-300">Inicio</Link></li>
        <li><Link to="/inventario" className="hover:text-blue-300">Inventario</Link></li>
        <li><Link to="/agregar-articulo" className="hover:text-blue-300">Agregar Artículo</Link></li>
        <li><Link to="/carrito" className="hover:text-blue-300">Carrito</Link></li>
        <li><Link to="/quienes-somos" className="hover:text-blue-300">Quienes Somos</Link></li>
        <li><Link to="/contacto" className="hover:text-blue-300">Contacto</Link></li>
      </ul>
    </nav>
  );
};