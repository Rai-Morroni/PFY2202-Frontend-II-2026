import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { useNavigate } from 'react-router-dom';

export const AgregarArticulo = () => {
  const { agregarArticulo } = useContext(InventoryContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    marca: '',
    tipo: 'Abarrotes',
    cantidad: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarArticulo(formData);
    // Redirige al inventario después de guardar
    navigate('/inventario');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Agregar Nuevo Artículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Nombre del producto</label>
          <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Marca</label>
          <input type="text" name="marca" required value={formData.marca} onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Categoría</label>
          <select name="tipo" value={formData.tipo} onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Abarrotes">Abarrotes</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Frutas">Frutas</option>
            <option value="Limpieza">Limpieza</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Cantidad Inicial</label>
          <input type="number" name="cantidad" min="1" required value={formData.cantidad} onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
          Guardar en Inventario
        </button>
      </form>
    </div>
  );
};