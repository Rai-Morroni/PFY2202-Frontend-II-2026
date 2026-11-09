import React, { useContext, useState } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { Link } from 'react-router-dom';

export const Inventario = () => {
  const { inventario } = useContext(InventoryContext);
  const [filtro, setFiltro] = useState('Todas');

  // Filtramos visualmente sin afectar el estado original
  const inventarioFiltrado = filtro === 'Todas' 
    ? inventario 
    : inventario.filter(item => item.tipo === filtro);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Inventario Actual</h2>
        <select 
          value={filtro} 
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Abarrotes">Abarrotes</option>
          <option value="Lácteos">Lácteos</option>
          <option value="Frutas">Frutas</option>
          <option value="Limpieza">Limpieza</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventarioFiltrado.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">{item.nombre}</h3>
              <p className="text-gray-600">Marca: {item.marca}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">{item.tipo}</span>
            </div>
            <div className="mt-4 flex justify-between items-center border-t pt-3">
              <p className="font-semibold">Stock: {item.cantidad}</p>
              {/* Este enlace nos llevará a la pantalla de detalle */}
              <Link to={`/articulo/${item.id}`} className="text-blue-600 hover:text-blue-800 font-bold text-sm underline">
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
        {inventarioFiltrado.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">No hay artículos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};