import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_STORAGE_KEY = "imgtopdf-intro-seen";
const INTRO_DURATION_MS = 2800;
const INTRO_FADE_MS = 550;

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const finishedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    document.body.style.overflow = "";
    localStorage.setItem(INTRO_STORAGE_KEY, "1");
    onComplete();
  }, [onComplete]);

  const startExit = useCallback(() => {
    setIsExiting(true);
    timersRef.current.push(window.setTimeout(finish, INTRO_FADE_MS));
  }, [finish]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    timersRef.current.push(
      window.setTimeout(startExit, INTRO_DURATION_MS),
    );

    return () => {
      timersRef.current.forEach(window.clearTimeout);
      timersRef.current = [];
      document.body.style.overflow = "";
    };
  }, [startExit]);

  function handleSkip() {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
    startExit();
  }

  return (
    <div
      className={`intro-loader${isExiting ? " intro-loader--exit" : ""}`}
      role="dialog"
      aria-label="Bienvenida a ImgToPDF"
      aria-live="polite"
    >
      <div className="intro-loader-inner">
        <div className="intro-brand">
          <span className="intro-brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9" />
              <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.55" />
              <path
                d="M5 14h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="intro-brand-name">
            Img<span>To</span>PDF
          </span>
        </div>

        <div className="intro-magic" aria-hidden="true">
          <span className="intro-img-card" />
          <span className="intro-img-card" />
          <span className="intro-img-card" />
          <span className="intro-pdf-doc">PDF</span>
          <span className="intro-spark">✦</span>
          <span className="intro-spark">✦</span>
        </div>

        <p className="intro-title">Convirtiendo imágenes en PDF</p>
        <p className="intro-sub">Rápido, privado y en su navegador</p>
      </div>

      <button type="button" className="intro-skip" onClick={handleSkip}>
        Omitir
      </button>
    </div>
  );
}

export function shouldShowIntro(): boolean {
  try {
    return localStorage.getItem(INTRO_STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}
