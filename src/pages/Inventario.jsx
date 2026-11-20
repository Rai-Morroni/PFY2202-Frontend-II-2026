import React, { useContext, useState } from 'react';
import { InventoryContext } from '../context/InventoryContext';
// Importa el nuevo componente extraído para reducir código repetido
import { ArticleCard } from '../components/ArticleCard'; 

export const Inventario = () => {
  // Extraemos categoriasUnicas del contexto. 
  // Ya no necesita extraer agregarAlCarrito aquí porque esa lógica se movió a ArticleCard
  const { inventario, categoriasUnicas } = useContext(InventoryContext);
  const [filtro, setFiltro] = useState('Todas');

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
          
          {/* Derivación dinámica de categorías del inventario en lugar de hardcodearlas */}
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Uso del componente reutilizable, aplicando el principio DRY en el JSX */}
        {inventarioFiltrado.map((item) => (
          <ArticleCard key={item.id} item={item} />
        ))}

        {inventarioFiltrado.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">No hay artículos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};