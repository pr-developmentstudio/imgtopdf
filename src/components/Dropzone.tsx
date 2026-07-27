import { useRef, useState } from "react";
import type { DragEvent, KeyboardEvent } from "react";
import { ACCEPTED_FILE_INPUT } from "../types";

interface DropzoneProps {
  onFilesSelected: (files: FileList) => void;
}

export function Dropzone({ onFilesSelected }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(false);
    if (event.dataTransfer.files.length > 0) {
      onFilesSelected(event.dataTransfer.files);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  }

  return (
    <div
      className={`dropzone${isDragOver ? " dragover" : ""}`}
      tabIndex={0}
      aria-label="Zona para soltar imágenes"
      onClick={openFilePicker}
      onKeyDown={handleKeyDown}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FILE_INPUT}
        multiple
        hidden
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            onFilesSelected(event.target.files);
          }
          event.target.value = "";
        }}
      />
      <div className="dropzone-content">
        <div className="dropzone-visual" aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="22" height="22" rx="4" fill="#fde8e7" />
            <rect x="34" y="12" width="22" height="22" rx="4" fill="#fde8e7" />
            <path d="M14 40h36a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z" fill="#fde8e7" />
            <path d="M32 28v12M26 34h12" stroke="#e5322d" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <p className="dropzone-title">Arrastre sus imágenes aquí</p>
        <p className="dropzone-hint">JPG, JPEG, PNG, WebP, GIF, BMP, SVG y AVIF</p>
        <button
          type="button"
          className="btn-select"
          onClick={(event) => {
            event.stopPropagation();
            openFilePicker();
          }}
        >
          Seleccionar imágenes
        </button>
      </div>
    </div>
  );
}
