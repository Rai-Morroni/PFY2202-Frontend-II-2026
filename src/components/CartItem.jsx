import React, { useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';

export const CartItem = ({ item }) => {
  const { modificarCantidadCarrito, inventario } = useContext(InventoryContext);
  
  // Buscamos cuánto stock real le queda a este ítem en el inventario para deshabilitar el botón "+" si es necesario
  const stockReal = inventario.find(invItem => invItem.id === item.id)?.cantidad || 0;

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-blue-500">
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
};