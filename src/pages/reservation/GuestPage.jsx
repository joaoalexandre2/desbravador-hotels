


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../../context/ReservationContext";
import Stepper from "../../components/Stepper";
import "./GuestPage.css";

function GuestPage() {
  const navigate = useNavigate();
  const { reservation, setReservation } = useReservation();

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: "",
    data: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Remove qualquer caractere que não seja número para os campos específicos
    if (name === "cpf" || name === "phone" || name === "data") {
      value = value.replace(/\D/g, ""); // deixa só números
    }

    // Limita o tamanho máximo do input
    if (name === "cpf") value = value.slice(0, 11);       // 11 dígitos
    if (name === "phone") value = value.slice(0, 11);     // 11 dígitos (DDD + 9 + número)
    if (name === "data") value = value.slice(0, 8);       // DDMMYYYY

    // Formatação CPF: 000.000.000-00
    if (name === "cpf") {
      if (value.length > 9) value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
      else if (value.length > 6) value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
      else if (value.length > 3) value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }

    // Formatação telefone: (00) 00000-0000
    if (name === "phone") {
      if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      else if (value.length > 2) value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    }

    // Formatação data: DD/MM/AAAA
    if (name === "data") {
      if (value.length > 4) value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
      else if (value.length > 2) value = value.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReservation({
      ...reservation,
      guest: { ...form }
    });
    navigate("/reserva/pagamento");
  };

  return (
    <div className="guest-page">
      <Stepper active={1} />

      <center><h2>Dados do Hóspede</h2></center>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            maxLength={14} // 000.000.000-00
            required
          />
        </div>

        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            name="phone"
            type="tel"
            placeholder="(DDD) 9xxxx-xxxx"
            value={form.phone}
            onChange={handleChange}
            maxLength={15} // (00) 00000-0000
            required
          />
        </div>

        <div className="form-group">
          <input
            name="data"
            type="text"
            placeholder="Data de Nascimento"
            value={form.data}
            onChange={handleChange}
            maxLength={10} // DD/MM/AAAA
            required
          />
        </div>

        <div className="form-group">
          <input
            name="address"
            type="text"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn-primary" type="submit">Continuar para pagamento</button>
      </form>
    </div>
  );
}

export default GuestPage;
