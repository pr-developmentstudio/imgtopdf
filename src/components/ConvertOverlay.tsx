import type { ConversionState } from "../types";

interface ConvertOverlayProps {
  conversion: ConversionState;
}

export function ConvertOverlay({ conversion }: ConvertOverlayProps) {
  if (conversion.phase === "idle") return null;

  const overlayClass = [
    "convert-overlay",
    conversion.phase === "success" ? "is-success" : "",
    conversion.phase === "error" ? "is-error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={overlayClass} aria-hidden="false">
      <div className="convert-animation">
        <div className="convert-visual">
          <div className="convert-spinner" />
          <div className="convert-pages" aria-hidden="true">
            <span className="convert-page convert-page-1" />
            <span className="convert-page convert-page-2" />
            <span className="convert-page convert-page-3" />
          </div>
          <div className="convert-check" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <p className="convert-title">{conversion.title}</p>
        <div className="convert-progress">
          <div
            className="convert-progress-bar"
            style={{ width: `${conversion.progress}%` }}
          />
        </div>
        <p className="convert-step">{conversion.step}</p>
      </div>
    </div>
  );
}
