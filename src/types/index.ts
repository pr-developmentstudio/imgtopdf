export type PdfMode = "single" | "separate";

export type StatusType = "success" | "error" | "";

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
  image: HTMLImageElement;
}

export interface PageData {
  dataUrl: string;
  format: "PNG" | "JPEG";
  width: number;
  height: number;
}

export type ConversionPhase = "idle" | "running" | "success" | "error";

export interface ConversionState {
  phase: ConversionPhase;
  title: string;
  step: string;
  progress: number;
}

export const ACCEPTED_FILE_INPUT =
  "image/jpeg,image/png,image/webp,image/gif,image/bmp,image/svg+xml,image/avif,.jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.avif";
