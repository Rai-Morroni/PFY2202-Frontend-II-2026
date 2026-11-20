import React, { createContext, useState } from 'react';

// 1. Crear el contexto
export const InventoryContext = createContext();

// 2. Crear el Provider
export const InventoryProvider = ({ children }) => {
  
  // Datos iniciales de prueba para el inventario
  const [inventario, setInventario] = useState([
    { id: 1, nombre: "Manzanas", marca: "Frutita", tipo: "Frutas", cantidad: 50 },
    { id: 2, nombre: "Leche Entera", marca: "Colun", tipo: "Lácteos", cantidad: 30 },
    { id: 3, nombre: "Arroz Grano Largo", marca: "Tucapel", tipo: "Abarrotes", cantidad: 100 },
  ]);

  // Estado para el carrito de compras
  const [carrito, setCarrito] = useState([]);

  // --- Nuevas Funciones Auxiliares (Sugerencias del docente) ---
  
  // Derivación dinámica de categorías para mantener opciones coherentes entre pantallas
  const categoriasUnicas = [...new Set(inventario.map(item => item.tipo))];

  // Función auxiliar (DRY) para unificar operaciones del contexto al actualizar el inventario
  const ajustarStockInventario = (id, cantidadCambio) => {
    setInventario(prev => prev.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad + cantidadCambio } : item
    ));
  };

  // --- Funciones para manejar el Inventario ---
  const agregarArticulo = (nuevoArticulo) => {
    setInventario([...inventario, { ...nuevoArticulo, id: Date.now() }]);
  };

  const modificarCantidadCarrito = (id, accion) => {
    const articuloEnCarrito = carrito.find(item => item.id === id);
    const articuloEnInventario = inventario.find(item => item.id === id);

    // Manejo defensivo: Verificar existencia del artículo antes de consultar cantidades
    if (!articuloEnInventario || !articuloEnCarrito) return;

    if (accion === 'aumentar' && articuloEnInventario.cantidad > 0) {
      // Resta 1 del inventario usando la función auxiliar unificada (DRY)
      ajustarStockInventario(id, -1);
      
      // Suma 1 al carrito
      setCarrito(carrito.map(item => item.id === id ? { ...item, cantidadCarrito: item.cantidadCarrito + 1 } : item));
    } 
    else if (accion === 'disminuir') {
      // Suma 1 al inventario usando la función auxiliar unificada (DRY)
      ajustarStockInventario(id, 1);
      
      if (articuloEnCarrito.cantidadCarrito === 1) {
        // Si solo quedaba 1 en el carrito, lo elimina
        setCarrito(carrito.filter(item => item.id !== id));
      } else {
        // Si hay más de 1, solo resta la cantidad en el carrito
        setCarrito(carrito.map(item => item.id === id ? { ...item, cantidadCarrito: item.cantidadCarrito - 1 } : item));
      }
    }
  };

  // --- Funciones para manejar el Carrito ---
  const agregarAlCarrito = (articulo) => {
    const articuloEnInventario = inventario.find(item => item.id === articulo.id);

    // Manejo defensivo: Verificar existencia y stock del artículo antes de agregarlo
    if (!articuloEnInventario || articuloEnInventario.cantidad <= 0) return;

    // 1. Restar del inventario usando la función auxiliar unificada (DRY)
    ajustarStockInventario(articulo.id, -1);

    // 2. Sumar al carrito
    const existeEnCarrito = carrito.find(item => item.id === articulo.id);
    if (existeEnCarrito) {
      setCarrito(carrito.map(item => 
        item.id === articulo.id ? { ...item, cantidadCarrito: item.cantidadCarrito + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...articulo, cantidadCarrito: 1 }]);
    }
  };

  return (
    <InventoryContext.Provider value={{
      inventario,
      carrito,
      categoriasUnicas, // Se exportan las categorías dinámicas para usarlas en los formularios
      agregarArticulo,
      agregarAlCarrito,
      modificarCantidadCarrito
    }}>
      {children}
    </InventoryContext.Provider>
  );
};