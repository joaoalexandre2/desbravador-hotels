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
    setForm({
      ...form,
      [e.target.name]: e.target.value
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

      <h2>Pagamento</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-group"
          name="cardNumber"
          placeholder="Número do cartão"
          value={form.cardNumber}
          onChange={handleChange}
          required
        />

        <input className="form-group"
          name="name"
          placeholder="Nome no cartão"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input className="form-group"
          name="expiry"
          placeholder="Validade"
          value={form.expiry}
          onChange={handleChange}
          required
        />

        <button className="btn-primary" type="submit">Continuar</button>
      </form>
    </div>
  );
}

export default PaymentPage;

