import React, { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { Link } from 'react-router-dom';

export const Carrito = () => {
  const { carrito, modificarCantidadCarrito, inventario } = useContext(InventoryContext);

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
        {carrito.map((item) => {
          // Buscamos cuánto stock real le queda a este ítem en el inventario para deshabilitar el botón "+" si es necesario
          const stockReal = inventario.find(invItem => invItem.id === item.id)?.cantidad || 0;
          
          return (
            <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-blue-500">
              <div>
                <h3 className="font-bold text-lg">{item.nombre}</h3>
                <p className="text-sm text-gray-600">{item.marca}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => modificarCantidadCarrito(item.id, 'disminuir')}
                  className="bg-red-500 text-white w-8 h-8 rounded font-bold hover:bg-red-600"
                >-</button>
                
                <span className="font-bold text-xl">{item.cantidadCarrito}</span>
                
                <button 
                  onClick={() => modificarCantidadCarrito(item.id, 'aumentar')}
                  disabled={stockReal === 0}
                  className={`w-8 h-8 rounded font-bold text-white ${stockReal > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                >+</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón añadido para mejorar la navegación desde el carrito */}
      <div className="mt-8 text-center">
        <Link to="/inventario" className="inline-block bg-blue-100 text-blue-800 font-bold py-3 px-6 rounded hover:bg-blue-200 transition shadow-sm">
          &larr; Seguir comprando
        </Link>
      </div>
    </div>
  );
};