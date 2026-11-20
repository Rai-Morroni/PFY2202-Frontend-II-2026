import React, { useContext } from 'react';
import { Link } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';

export const ArticleCard = ({ item }) => {
  const { agregarAlCarrito } = useContext(InventoryContext);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold">{item.nombre}</h3>
        <p className="text-gray-600">Marca: {item.marca}</p>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">{item.tipo}</span>
      </div>
      <div className="mt-4 flex flex-col gap-3 border-t pt-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Stock: {item.cantidad}</p>
          <Link to={`/articulo/${item.id}`} className="text-blue-600 hover:text-blue-800 font-bold text-sm underline">
            Ver detalle
          </Link>
        </div>
        <button 
          onClick={() => agregarAlCarrito(item)}
          disabled={item.cantidad === 0}
          className={`w-full py-2 rounded font-bold text-white transition ${item.cantidad > 0 ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {item.cantidad > 0 ? 'Agregar al carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};