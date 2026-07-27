export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a className="brand" href="#">
          <span className="brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9" />
              <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.55" />
              <path d="M5 14h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z" fill="currentColor" />
            </svg>
          </span>
          <span className="brand-text">
            Img<span className="brand-accent">To</span>PDF
          </span>
        </a>
        <span className="navbar-tag">100% gratis · Sin registro</span>
      </div>
    </nav>
  );
}
