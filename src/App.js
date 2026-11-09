import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import { BottomMenu } from './components/BottomMenu';
import { DetalleArticulo } from './pages/DetalleArticulo';
import { Carrito } from './pages/Carrito';
import { AgregarArticulo } from './pages/AgregarArticulo';
import { Inventario } from './pages/Inventario';
import { Home } from './pages/Home';
import { QuienesSomos } from './pages/QuienesSomos';
import { Contacto } from './pages/Contacto';

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 pb-20">
          
          <header className="bg-blue-900 text-white p-4 text-center text-2xl font-bold shadow-md">
            Supermercado PFY
          </header>

          <main className="p-4 container mx-auto">
            <Routes>
              {/* Componente Home asignado a la ruta raíz */}
              <Route path="/" element={<Home />} />
  
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/agregar-articulo" element={<AgregarArticulo />} />
              <Route path="/articulo/:id" element={<DetalleArticulo />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>

          <BottomMenu />
          
        </div>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;