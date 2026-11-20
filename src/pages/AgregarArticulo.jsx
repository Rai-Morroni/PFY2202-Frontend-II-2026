import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
// Actualización sugerida: Cambiamos 'react-router-dom' por 'react-router' debido a la migración a Vite
import { useNavigate } from 'react-router';

export const AgregarArticulo = () => {
  // Extraemos categoriasUnicas del contexto para usarlas en el selector dinámicamente
  const { agregarArticulo, categoriasUnicas } = useContext(InventoryContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    marca: '',
    // Seleccionamos por defecto la primera categoría disponible en el inventario o 'Abarrotes' como respaldo
    tipo: categoriasUnicas.length > 0 ? categoriasUnicas[0] : 'Abarrotes',
    cantidad: 1
  });

  // Estado para manejar el mensaje de error de validación
  const [errorValidacion, setErrorValidacion] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiamos el error cuando el usuario comienza a escribir nuevamente
    if (errorValidacion) setErrorValidacion('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Incorporación de expresiones regulares para validar nombres y marcas (Solo letras y espacios, mín 3 caracteres)
    const regexTexto = /^[a-zA-ZÀ-ÿ\s]{3,50}$/;
    
    if (!regexTexto.test(formData.nombre) || !regexTexto.test(formData.marca)) {
      setErrorValidacion('El nombre y la marca deben contener solo letras y tener al menos 3 caracteres.');
      return;
    }

    agregarArticulo(formData);
    // Redirige al inventario después de guardar
    navigate('/inventario');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Agregar Nuevo Artículo</h2>
      
      {/* Mostramos la alerta de error si la validación por Regex falla */}
      {errorValidacion && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded text-sm">
          {errorValidacion}
        </div>
      )}

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
            
            {/* Derivación dinámica de categorías del inventario en lugar de hardcodearlas */}
            {categoriasUnicas.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            
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