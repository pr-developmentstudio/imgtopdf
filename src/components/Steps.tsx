const steps = [
  {
    num: "1",
    title: "Suba sus imágenes",
    text: "Arrastre o seleccione las imágenes desde su dispositivo.",
  },
  {
    num: "2",
    title: "Revise el orden",
    text: "Verifique la vista previa antes de convertir.",
  },
  {
    num: "3",
    title: "Descargue el PDF",
    text: "Obtenga su documento listo para compartir o imprimir.",
  },
];

export function Steps() {
  return (
    <section className="steps">
      <div className="steps-inner">
        <h2>Cómo funciona</h2>
        <ol className="steps-list">
          {steps.map((step) => (
            <li key={step.num}>
              <span className="step-num">{step.num}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
