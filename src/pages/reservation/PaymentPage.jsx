import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../../context/ReservationContext";
import Stepper from "../../components/Stepper";
import "./GuestPage.css";

function PaymentPage() {
  const navigate = useNavigate();
  const { reservation, setReservation } = useReservation();

  const [form, setForm] = useState({
    cardNumber: "",
    name: "",
    expiry: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Remove qualquer caractere que não seja número para os campos de cartão
    if (name === "cardNumber" || name === "expiry") {
      value = value.replace(/\D/g, "");
    }

    // Máscara do número do cartão: 0000 0000 0000 0000
    if (name === "cardNumber") {
      value = value.slice(0, 16); // Limita 16 dígitos
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Adiciona espaço a cada 4 dígitos
    }

    // Máscara da validade: MM/AA
    if (name === "expiry") {
      value = value.slice(0, 4); // Limita 4 dígitos (MMYY)
      if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 SALVA CORRETAMENTE
    setReservation({
      ...reservation,
      payment: form
    });

    navigate("/reserva/resumo");
  };

  return (
    <div className="guest-page">
      <Stepper active={2} />

      <center>
        <h2>Pagamento</h2>
        {/* Imagem entre o título e o formulário */}
        <img
          src="https://res.cloudinary.com/dolqrhd66/image/upload/v1768669955/CreditCard_ddyx0v.jpg"
          alt="Cartão de Crédito"
          style={{ width: "250px", margin: "20px 0", borderRadius: "12px" }}
        />
      </center>

      <form onSubmit={handleSubmit}>
        <input
          className="form-group"
          name="cardNumber"
          placeholder="Número do cartão"
          value={form.cardNumber}
          onChange={handleChange}
          maxLength={19} // 16 dígitos + 3 espaços
          required
        />

        <input
          className="form-group"
          name="name"
          placeholder="Nome no cartão"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-group"
          name="expiry"
          placeholder="MM/AA"
          value={form.expiry}
          onChange={handleChange}
          maxLength={5} // 4 dígitos + 1 /
          required
        />

        <button className="btn-primary" type="submit">Continuar</button>
      </form>
    </div>
  );
}

export default PaymentPage;
