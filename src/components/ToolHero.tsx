export function ToolHero() {
  return (
    <header className="tool-hero">
      <div className="tool-hero-inner">
        <div className="tool-icon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="8" width="16" height="16" rx="3" fill="#fff" opacity="0.95" />
            <rect x="26" y="8" width="16" height="16" rx="3" fill="#fff" opacity="0.6" />
            <path d="M10 30h28a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" fill="#fff" />
            <text
              x="24"
              y="40"
              textAnchor="middle"
              fill="#e5322d"
              fontSize="8"
              fontWeight="700"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              PDF
            </text>
          </svg>
        </div>
        <h1>Imagen a PDF</h1>
        <p className="tool-desc">
          Convierta imágenes JPG, PNG y otros formatos a un PDF listo para descargar. Rápido,
          privado y sin subir archivos a ningún servidor.
        </p>
      </div>
    </header>
  );
}
