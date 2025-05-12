# Tu Próximo Toyota - MVP

Una aplicación web para explorar y gestionar el inventario de vehículos Toyota, con funcionalidades para calcular financiación y agendar test drives.

## Características

- Exploración de vehículos Toyota (nuevos y usados certificados)
- Detalles completos de cada vehículo
- Calculadora de financiación
- Formulario para agendar test drives
- Diseño responsive y moderno
- Interfaz en español

## Tecnologías Utilizadas

- React 18
- TypeScript
- React Router
- Tailwind CSS
- Vite

## Requisitos Previos

- Node.js 16.x o superior
- npm 7.x o superior

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd tu-proximo-toyota
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
  ├── components/     # Componentes reutilizables
  ├── pages/         # Páginas principales
  ├── data/          # Datos mock (JSON)
  ├── types.ts       # Definiciones de tipos TypeScript
  └── App.tsx        # Componente principal y rutas
```

## Datos Mock

El MVP utiliza datos mock almacenados en archivos JSON:
- `src/data/inventory.json`: Información de vehículos
- `src/data/finance_params.json`: Parámetros de financiación

## Próximos Pasos

- Integración con backend real
- Autenticación de usuarios
- Sistema de gestión de leads
- Chat integrado
- Seguimiento de estado de compra/service
