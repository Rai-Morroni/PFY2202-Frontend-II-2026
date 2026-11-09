import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';

export const DetalleArticulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inventario, agregarAlCarrito } = useContext(InventoryContext);

  // Busca el artículo específico por su ID
  const articulo = inventario.find(item => item.id === parseInt(id));

  if (!articulo) {
    return <div className="text-center mt-10 text-red-600 font-bold">Artículo no encontrado</div>;
  }

  const handleAgregarCarrito = () => {
    if (articulo.cantidad > 0) {
      agregarAlCarrito(articulo);
      navigate('/carrito');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-10 border-t-4 border-blue-800">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">{articulo.nombre}</h2>
      <div className="space-y-3 mb-6 text-gray-700">
        <p><span className="font-semibold">Marca:</span> {articulo.marca}</p>
        <p><span className="font-semibold">Categoría:</span> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{articulo.tipo}</span></p>
        <p><span className="font-semibold">Stock disponible:</span> <span className={articulo.cantidad > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{articulo.cantidad} unidades</span></p>
      </div>
      
      <button 
        onClick={handleAgregarCarrito} 
        disabled={articulo.cantidad === 0}
        className={`w-full font-bold py-3 rounded transition ${articulo.cantidad > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
      >
        {articulo.cantidad > 0 ? 'Agregar 1 al Carrito' : 'Sin Stock'}
      </button>
      
      <button onClick={() => navigate('/inventario')} className="w-full mt-3 text-blue-600 font-semibold hover:underline">
        Volver al inventario
      </button>
    </div>
  );
};