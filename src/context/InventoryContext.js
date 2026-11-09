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

  // --- Funciones para manejar el Inventario ---
  const agregarArticulo = (nuevoArticulo) => {
    setInventario([...inventario, { ...nuevoArticulo, id: Date.now() }]);
  };

  const modificarCantidadCarrito = (id, accion) => {
    const articuloEnCarrito = carrito.find(item => item.id === id);
    const articuloEnInventario = inventario.find(item => item.id === id);

    if (accion === 'aumentar' && articuloEnInventario.cantidad > 0) {
      // Resta 1 del inventario y suma 1 al carrito
      setInventario(inventario.map(item => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item));
      setCarrito(carrito.map(item => item.id === id ? { ...item, cantidadCarrito: item.cantidadCarrito + 1 } : item));
    } 
    else if (accion === 'disminuir') {
      // Suma 1 al inventario
      setInventario(inventario.map(item => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item));
      
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
    // 1. Restar del inventario
    const inventarioActualizado = inventario.map(item => 
      item.id === articulo.id ? { ...item, cantidad: item.cantidad - 1 } : item
    );
    setInventario(inventarioActualizado);    

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
      agregarArticulo,
      agregarAlCarrito,
      modificarCantidadCarrito
    }}>
      {children}
    </InventoryContext.Provider>
  );
};