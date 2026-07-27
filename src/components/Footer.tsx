export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">
          Img<span>To</span>PDF
        </p>
        <p className="footer-copy">
          Herramienta gratuita para convertir imágenes a PDF. Procesamiento local en su navegador.
        </p>
        <p className="footer-note">© 2026 ImgToPDF — Sus archivos, su privacidad.</p>
        <p className="footer-dev">
          Desarrollado por{" "}
          <a
            href="https://github.com/pr-developmentstudio"
            target="_blank"
            rel="noopener noreferrer"
          >
            PR Development Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
