import type { PdfMode } from "../types";

interface PdfModeSelectorProps {
  mode: PdfMode;
  onChange: (mode: PdfMode) => void;
}

export function PdfModeSelector({ mode, onChange }: PdfModeSelectorProps) {
  return (
    <div className="pdf-mode">
      <p className="pdf-mode-label">Modo de salida</p>
      <div className="pdf-mode-options" role="radiogroup" aria-label="Modo de salida del PDF">
        <label className={`pdf-mode-option${mode === "single" ? " is-selected" : ""}`}>
          <input
            type="radio"
            name="pdfMode"
            value="single"
            checked={mode === "single"}
            onChange={() => onChange("single")}
          />
          <span className="pdf-mode-title">Un solo PDF</span>
          <span className="pdf-mode-desc">Todas las imágenes en un documento</span>
        </label>
        <label className={`pdf-mode-option${mode === "separate" ? " is-selected" : ""}`}>
          <input
            type="radio"
            name="pdfMode"
            value="separate"
            checked={mode === "separate"}
            onChange={() => onChange("separate")}
          />
          <span className="pdf-mode-title">PDFs separados</span>
          <span className="pdf-mode-desc">Un archivo por cada imagen</span>
        </label>
      </div>
    </div>
  );
}
