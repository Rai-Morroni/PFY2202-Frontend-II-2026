import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div className="text-center mt-12">
    <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Bienvenido a Supermercado PFY</h1>
    <p className="text-gray-600 mb-8">El mejor sistema de gestión de inventario y compras.</p>
    <Link to="/inventario" className="bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700">
      Ver Catálogo de Productos
    </Link>
  </div>
);