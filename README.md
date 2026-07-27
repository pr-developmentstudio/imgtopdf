# ImgToPDF

Herramienta web gratuita para convertir imágenes a PDF. Todo el procesamiento ocurre en el navegador del usuario: **ningún archivo se sube a un servidor**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

## Características

- Conversión de imágenes a PDF en el navegador
- Formatos soportados: JPG, JPEG, PNG, WebP, GIF, BMP, SVG y AVIF
- **Un solo PDF** con todas las imágenes o **un PDF por imagen**
- Vista previa, eliminación individual y limpieza total
- Animación de bienvenida en la primera visita
- Animación de progreso al convertir
- Interfaz en español formal, diseño inspirado en herramientas PDF modernas
- 100% privado: los archivos nunca salen del dispositivo

## Stack tecnológico

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vite.dev/)
- [jsPDF](https://github.com/parallax/jsPDF) para generación de PDF en cliente

## Desarrollo local

### Requisitos

- Node.js 18 o superior
- npm

### Instalación

```bash
git clone https://github.com/pr-developmentstudio/imgtopdf.git
cd imgtopdf
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) en su navegador.

### Build de producción

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

### Opción 1 — Desde GitHub (recomendado)

1. Suba este repositorio a GitHub
2. Entre en [vercel.com](https://vercel.com) e inicie sesión
3. Haga clic en **Add New → Project**
4. Importe el repositorio
5. Vercel detectará Vite automáticamente. Use estos valores:

| Campo | Valor |
|-------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

6. Haga clic en **Deploy**

### Opción 2 — CLI de Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Para producción:

```bash
vercel --prod
```

El archivo `vercel.json` ya incluye la configuración necesaria para el proyecto.

## Estructura del proyecto

```
imgtopdf/
├── src/
│   ├── components/     # Componentes React
│   ├── utils/          # Lógica de imágenes y PDF
│   ├── types/          # Tipos TypeScript
│   └── styles/         # Estilos globales
├── public/             # Archivos estáticos
├── index.html
├── vercel.json
└── vite.config.ts
```

## Privacidad

ImgToPDF no almacena imágenes ni PDFs. La conversión se ejecuta íntegramente en el navegador mediante JavaScript. No hay backend ni base de datos.

## Créditos

Desarrollado por [PR Development Studio](https://github.com/pr-developmentstudio)

## Licencia

Proyecto privado. Todos los derechos reservados.
