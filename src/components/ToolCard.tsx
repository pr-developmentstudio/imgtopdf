import { useCallback, useMemo, useState } from "react";
import type { ConversionState, ImageItem, PdfMode, StatusType } from "../types";
import { delay, isAcceptedFile, loadImageMeta } from "../utils/imageUtils";
import { generatePdfs } from "../utils/pdfUtils";
import { ConvertOverlay } from "./ConvertOverlay";
import { Dropzone } from "./Dropzone";
import { ImagePanel } from "./ImagePanel";

const idleConversion: ConversionState = {
  phase: "idle",
  title: "",
  step: "",
  progress: 0,
};

export function ToolCard() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pdfMode, setPdfMode] = useState<PdfMode>("single");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversion, setConversion] = useState<ConversionState>(idleConversion);

  const panelSub = useMemo(
    () =>
      pdfMode === "separate"
        ? "Se generará un PDF independiente por cada imagen"
        : "Cada imagen será una página del PDF",
    [pdfMode],
  );

  const setStatusMessage = useCallback((message: string, type: StatusType = "") => {
    setStatus(message);
    setStatusType(type);
  }, []);

  const revokeImage = useCallback((item: ImageItem) => {
    URL.revokeObjectURL(item.previewUrl);
  }, []);

  const handleFilesSelected = useCallback(
    async (fileList: FileList) => {
      const files = Array.from(fileList);
      const rejected: string[] = [];
      let added = 0;
      const newItems: ImageItem[] = [];

      for (const file of files) {
        if (!isAcceptedFile(file)) {
          rejected.push(file.name);
          continue;
        }

        try {
          const item = await loadImageMeta(file);
          newItems.push(item);
          added++;
        } catch {
          rejected.push(file.name);
        }
      }

      if (newItems.length > 0) {
        setImages((prev) => [...prev, ...newItems]);
      }

      if (added > 0 && rejected.length === 0) {
        setStatusMessage(
          added === 1 ? "1 imagen agregada." : `${added} imágenes agregadas.`,
          "success",
        );
      } else if (added > 0 && rejected.length > 0) {
        setStatusMessage(
          `${added} agregada(s). No se pudieron usar: ${rejected.join(", ")}.`,
          "error",
        );
      } else if (rejected.length > 0) {
        setStatusMessage(
          `Formato no soportado o archivo inválido: ${rejected.join(", ")}.`,
          "error",
        );
      }
    },
    [setStatusMessage],
  );

  const handleRemove = useCallback(
    (id: string) => {
      setImages((prev) => {
        const item = prev.find((image) => image.id === id);
        if (item) revokeImage(item);
        return prev.filter((image) => image.id !== id);
      });
      setStatusMessage("");
    },
    [revokeImage, setStatusMessage],
  );

  const handleClear = useCallback(() => {
    setImages((prev) => {
      prev.forEach(revokeImage);
      return [];
    });
    setStatusMessage("");
  }, [revokeImage, setStatusMessage]);

  const handleGenerate = useCallback(async () => {
    if (images.length === 0 || isGenerating) return;

    setIsGenerating(true);
    setStatusMessage("");

    setConversion({
      phase: "running",
      title: "Convirtiendo a PDF",
      step: "Preparando imágenes...",
      progress: 0,
    });

    try {
      const message = await generatePdfs(images, pdfMode, ({ current, total, message: step }) => {
        const progress = total > 0 ? Math.round((current / total) * 100) : 0;
        setConversion({
          phase: "running",
          title: "Convirtiendo a PDF",
          step,
          progress,
        });
      });

      setConversion({
        phase: "success",
        title: "¡PDF listo!",
        step: "Descarga iniciada",
        progress: 100,
      });

      await delay(900);
      setStatusMessage(message, "success");
    } catch (error) {
      setConversion({
        phase: "error",
        title: "Error al convertir",
        step: error instanceof Error ? error.message : "Error al generar el PDF.",
        progress: 0,
      });

      await delay(700);
      setStatusMessage(
        error instanceof Error ? error.message : "Error al generar el PDF.",
        "error",
      );
    } finally {
      setConversion(idleConversion);
      setIsGenerating(false);
    }
  }, [images, isGenerating, pdfMode, setStatusMessage]);

  const statusClass = ["status", statusType].filter(Boolean).join(" ");

  return (
    <section className={`tool-card${isGenerating ? " is-converting" : ""}`}>
      <Dropzone onFilesSelected={handleFilesSelected} />

      <ImagePanel
        images={images}
        pdfMode={pdfMode}
        panelSub={panelSub}
        isGenerating={isGenerating}
        onPdfModeChange={setPdfMode}
        onRemove={handleRemove}
        onClear={handleClear}
        onGenerate={handleGenerate}
      />

      {status && (
        <p className={statusClass} role="status" aria-live="polite">
          {status}
        </p>
      )}

      <ConvertOverlay conversion={conversion} />
    </section>
  );
}
