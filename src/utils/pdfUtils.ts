import { jsPDF } from "jspdf";
import type { PageData, PdfMode } from "../types";
import type { ImageItem } from "../types";
import { delay, fileToCanvasData, getPdfFileName } from "./imageUtils";

function addPageToPdf(
  pdf: jsPDF | null,
  page: PageData,
  isFirstPage: boolean,
): jsPDF {
  const orientation = page.width >= page.height ? "landscape" : "portrait";

  if (isFirstPage || !pdf) {
    pdf = new jsPDF({
      orientation,
      unit: "px",
      format: [page.width, page.height],
      compress: true,
    });
  } else {
    pdf.addPage([page.width, page.height], orientation);
  }

  pdf.addImage(page.dataUrl, page.format, 0, 0, page.width, page.height, undefined, "FAST");
  return pdf;
}

export interface GenerateProgress {
  current: number;
  total: number;
  message: string;
}

export async function generatePdfs(
  images: ImageItem[],
  mode: PdfMode,
  onProgress: (progress: GenerateProgress) => void,
): Promise<string> {
  const total = images.length;

  if (mode === "separate") {
    for (let i = 0; i < images.length; i++) {
      onProgress({
        current: i,
        total,
        message: `Generando PDF ${i + 1} de ${total}...`,
      });

      const page = await fileToCanvasData(images[i]);
      const pdf = addPageToPdf(null, page, true);
      pdf.save(getPdfFileName(images[i].file.name));

      onProgress({
        current: i + 1,
        total,
        message: `PDF ${i + 1} completado`,
      });

      if (i < images.length - 1) {
        await delay(350);
      }
    }

    if (total === 1) {
      return "PDF descargado correctamente.";
    }

    return `${total} PDF descargados correctamente. Si su navegador bloqueó alguna descarga, permita descargas múltiples.`;
  }

  let pdf: jsPDF | null = null;

  for (let j = 0; j < images.length; j++) {
    onProgress({
      current: j,
      total,
      message: `Procesando imagen ${j + 1} de ${total}...`,
    });

    const page = await fileToCanvasData(images[j]);
    pdf = addPageToPdf(pdf, page, j === 0);

    onProgress({
      current: j + 1,
      total,
      message: `Imagen ${j + 1} agregada`,
    });
  }

  pdf?.save("imagenes.pdf");
  return "PDF descargado correctamente.";
}
