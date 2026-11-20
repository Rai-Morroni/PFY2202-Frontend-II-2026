import React, { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
// Actualización sugerida: Cambiamos 'react-router-dom' por 'react-router'
import { Link } from 'react-router';
// Importamos el componente extraído (Sugerencia de reutilización JSX)
import { CartItem } from '../components/CartItem';

export const Carrito = () => {
  // Ya no necesitamos extraer 'modificarCantidadCarrito' ni 'inventario' aquí, 
  // porque el componente CartItem se encarga de esa responsabilidad
  const { carrito } = useContext(InventoryContext);

  if (carrito.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-700">Tu carrito está vacío</h2>
        <Link to="/inventario" className="text-blue-600 mt-4 inline-block hover:underline">Ir al inventario</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Carrito de Compras</h2>
      <div className="space-y-4">
        
        {/* Usamos el componente extraído, iterando sobre el carrito */}
        {carrito.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        
      </div>

      {/* Botón añadido para mejorar la navegación desde el carrito */}
      <div className="mt-8 text-center">
        <Link to="/inventario" className="inline-block bg-blue-100 text-blue-800 font-bold py-3 px-6 rounded hover:bg-blue-200 transition shadow-sm">
          &larr; Seguir comprando
        </Link>

        <button 
          onClick={() => alert('¡Gracias por preferir Supermercado PFY! (Módulo de pago en construcción).')}
          className="bg-green-600 text-white font-bold py-3 px-6 rounded hover:bg-green-700 transition shadow-sm text-center ml-4">
          Ir a pagar &rarr;
        </button>        
      </div>
    </div>
  );
};