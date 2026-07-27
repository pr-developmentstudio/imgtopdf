const features = [
  {
    title: "100% privado",
    text: "Todo se procesa en su navegador. Sus archivos nunca salen de su dispositivo.",
    icon: (
      <path
        d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: "Al instante",
    text: "Convierta varias imágenes en segundos y descargue el PDF con un solo clic.",
    icon: (
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Gratis",
    text: "Sin registro, sin límites ocultos y sin marcas de agua en su PDF.",
    icon: (
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function Features() {
  return (
    <section className="features">
      <div className="features-inner">
        {features.map((feature) => (
          <article key={feature.title} className="feature">
            <span className="feature-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {feature.icon}
              </svg>
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
