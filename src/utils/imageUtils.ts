import type { ImageItem, PageData } from "../types";

const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
  "image/avif",
]);

const ACCEPTED_EXTENSIONS = /\.(jpe?g|png|webp|gif|bmp|svg|avif)$/i;

export function isAcceptedFile(file: File): boolean {
  if (ACCEPTED_TYPES.has(file.type)) return true;
  return ACCEPTED_EXTENSIONS.test(file.name);
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getPdfFileName(imageName: string): string {
  const base = imageName.replace(/\.[^.]+$/, "");
  return `${base || "imagen"}.pdf`;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function loadImageMeta(file: File): Promise<ImageItem> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        id: crypto.randomUUID(),
        file,
        previewUrl: url,
        width: img.naturalWidth,
        height: img.naturalHeight,
        image: img,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`No se pudo leer "${file.name}". Verifique que sea una imagen válida.`));
    };

    img.src = url;
  });
}

export function fileToCanvasData(item: ImageItem): Promise<PageData> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = item.width;
    canvas.height = item.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error(`No se pudo procesar "${item.file.name}".`));
      return;
    }

    if (item.file.type === "image/jpeg" || /\.jpe?g$/i.test(item.file.name)) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    try {
      ctx.drawImage(item.image, 0, 0);
    } catch {
      reject(new Error(`No se pudo procesar "${item.file.name}".`));
      return;
    }

    const usePng = item.file.type === "image/png" || /\.png$/i.test(item.file.name);
    const format = usePng ? "PNG" : "JPEG";
    const dataUrl = usePng
      ? canvas.toDataURL("image/png")
      : canvas.toDataURL("image/jpeg", 0.92);

    resolve({
      dataUrl,
      format,
      width: item.width,
      height: item.height,
    });
  });
}
