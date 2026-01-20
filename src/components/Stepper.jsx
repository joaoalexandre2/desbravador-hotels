function Stepper({ step }) {
  const steps = ["Dados", "Pagamento", "Resumo"];

  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
      {steps.map((label, index) => (
        <div
          key={label}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            background: step === index ? "#003580" : "#eee",
            color: step === index ? "#fff" : "#333",
            fontWeight: 500
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default Stepper;


