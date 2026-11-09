# Supermercado PFY

Aplicación web de gestión de inventario y carrito de compras, desarrollada como proyecto de **Desarrollo Frontend II**. Permite consultar productos, revisar su disponibilidad, agregarlos al carrito y administrar cantidades durante la sesión.

## Tecnologías

- React 19
- Create React App (`react-scripts` 5)
- React Router DOM 7
- Tailwind CSS 3.4
- PostCSS y Autoprefixer

Se utiliza Tailwind CSS 3.4 porque es compatible con la integración de PostCSS de Create React App 5.

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

Clona el repositorio y entra a su directorio:

```bash
git clone https://github.com/Rai-Morroni/PFY2202-Frontend-II-2026.git
cd PFY2202-Frontend-II-2026
```

Instala las dependencias e inicia el servidor de desarrollo:

```bash
npm install
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Funcionalidades actuales

- Página de inicio con acceso al catálogo.
- Inventario de productos de ejemplo, con filtro por categoría y acceso al detalle.
- Vista de detalle con información del producto, stock disponible y opción para agregar una unidad al carrito.
- Formulario para incorporar artículos al inventario.
- Carrito con controles para aumentar o disminuir las unidades, sincronizando las cantidades con el inventario.
- Páginas informativas de “Quiénes somos” y contacto.
- Menú de navegación disponible en las distintas vistas.

El inventario inicial contiene manzanas, leche entera y arroz. El estado del inventario y del carrito se mantiene en memoria mediante Context de React; no hay persistencia en una base de datos y los cambios se pierden al recargar la página.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/inventario` | Inventario y filtro por categoría |
| `/agregar-articulo` | Formulario para agregar un producto |
| `/articulo/:id` | Detalle de un producto |
| `/carrito` | Carrito de compras |
| `/quienes-somos` | Información del supermercado |
| `/contacto` | Datos de contacto |

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia la aplicación en modo desarrollo. |
| `npm test` | Ejecuta las pruebas con Jest en modo interactivo. |
| `npm run build` | Genera la versión optimizada para producción en `build/`. |
| `npm run deploy` | Construye y publica `build/` en GitHub Pages mediante `gh-pages`. |

## Estructura principal

```text
src/
├── components/       # Componentes compartidos, como el menú inferior
├── context/          # Estado global del inventario y del carrito
├── pages/            # Vistas asociadas a las rutas de la aplicación
├── App.js            # Navegación y estructura principal
└── index.css         # Directivas de Tailwind CSS
```

La configuración de Tailwind está en `tailwind.config.js` y la de PostCSS en `postcss.config.js`.
