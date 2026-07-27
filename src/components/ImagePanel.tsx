import type { ImageItem, PdfMode } from "../types";
import { formatSize } from "../utils/imageUtils";
import { PdfModeSelector } from "./PdfModeSelector";

interface ImagePanelProps {
  images: ImageItem[];
  pdfMode: PdfMode;
  panelSub: string;
  isGenerating: boolean;
  onPdfModeChange: (mode: PdfMode) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onGenerate: () => void;
}

export function ImagePanel({
  images,
  pdfMode,
  panelSub,
  isGenerating,
  onPdfModeChange,
  onRemove,
  onClear,
  onGenerate,
}: ImagePanelProps) {
  if (images.length === 0) return null;

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Imágenes seleccionadas</h2>
          <p className="panel-sub">{panelSub}</p>
        </div>
        <span className="count">{images.length}</span>
      </div>

      <ul className="image-list">
        {images.map((item) => (
          <li key={item.id} className="image-item">
            <img src={item.previewUrl} alt={item.file.name} />
            <div className="image-item-info">
              <p className="image-item-name">{item.file.name}</p>
              <p className="image-item-meta">
                {item.width} × {item.height} · {formatSize(item.file.size)}
              </p>
            </div>
            <button
              type="button"
              className="btn-remove"
              onClick={() => onRemove(item.id)}
              disabled={isGenerating}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <PdfModeSelector mode={pdfMode} onChange={onPdfModeChange} />

      <div className="actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClear}
          disabled={isGenerating}
        >
          Limpiar todo
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3v12m0 0l4-4m-4 4l-4-4M5 19h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Convertir a PDF
        </button>
      </div>
    </section>
  );
}
