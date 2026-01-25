import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../../context/ReservationContext";
import Stepper from "../../components/Stepper";
import DatePicker from "react-datepicker";

import ptBR from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";
import "./GuestPage.css";

const today = new Date();
const maxDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
); // mínimo 18 anos

const minDate = new Date(
  today.getFullYear() - 120,
  today.getMonth(),
  today.getDate()
); // máximo 120 anos

export default function GuestPage() {
  const navigate = useNavigate();
  const { reservation, setReservation } = useReservation();

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: "",
    birthDate: null,
  });

  const [valid, setValid] = useState({
    name: null,
    cpf: null,
    email: null,
    phone: null,
    address: null,
    birthDate: null,
  });

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;

    return remainder === parseInt(cpf.substring(10, 11));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // CPF
    if (name === "cpf") {
      value = value.replace(/\D/g, "").slice(0, 11);
      if (value.length > 9)
        value = value.replace(
          /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
          "$1.$2.$3-$4"
        );
      else if (value.length > 6)
        value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
      else if (value.length > 3)
        value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }

    // Telefone
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 11);
      if (value.length > 10)
        value = value.replace(
          /(\d{2})(\d{1})(\d{4})(\d{0,4})/,
          "($1) $2$3-$4"
        );
      else if (value.length > 6)
        value = value.replace(
          /(\d{2})(\d{4})(\d{0,4})/,
          "($1) $2-$3"
        );
      else if (value.length > 2)
        value = value.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    }

    setForm({ ...form, [name]: value });

    let isValid = false;
    switch (name) {
      case "name":
      case "address":
        isValid = value.trim().length > 2;
        break;
      case "email":
        isValid = /\S+@\S+\.\S+/.test(value);
        break;
      case "cpf":
        isValid = validarCPF(value);
        break;
      case "phone":
        isValid = value.replace(/\D/g, "").length >= 10;
        break;
      default:
        break;
    }

    setValid({ ...valid, [name]: isValid });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, birthDate: date });
    setValid({ ...valid, birthDate: !!date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(valid).every(Boolean)) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    setReservation({
      ...reservation,
      guest: { ...form },
    });

    navigate("/reserva/pagamento");
  };

  const renderIcon = (field) => {
    if (valid[field] === null) return null;
    return valid[field] ? (
      <span className="icon valid-icon">✔️</span>
    ) : (
      <span className="icon invalid-icon">❌</span>
    );
  };

  const renderError = (field, message) =>
    valid[field] === false && <span className="error">{message}</span>;

  return (
    <div className="guest-page">
      <Stepper active={1} />

      <h2 style={{ textAlign: "center" }}>Dados do Hóspede</h2>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="form-group">
          <div className="input-wrapper">
            <input
              name="name"
              placeholder="Nome completo"
              value={form.name}
              onChange={handleChange}
              className={valid.name == null ? "" : valid.name ? "valid" : "invalid"}
              required
            />
            {renderIcon("name")}
          </div>
          {renderError("name", "Nome muito curto")}
        </div>

        {/* CPF */}
        <div className="form-group">
          <div className="input-wrapper">
            <input
              name="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={handleChange}
              maxLength={14}
              className={valid.cpf == null ? "" : valid.cpf ? "valid" : "invalid"}
              required
            />
            {renderIcon("cpf")}
          </div>
          {renderError("cpf", "CPF inválido")}
        </div>

        {/* Email */}
        <div className="form-group">
          <div className="input-wrapper">
            <input
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              className={valid.email == null ? "" : valid.email ? "valid" : "invalid"}
              required
            />
            {renderIcon("email")}
          </div>
          {renderError("email", "Email inválido")}
        </div>

        {/* Telefone */}
        <div className="form-group">
          <div className="input-wrapper">
            <input
              name="phone"
              placeholder="(DD) xxxxx-xxxx"
              value={form.phone}
              onChange={handleChange}
              maxLength={15}
              className={valid.phone == null ? "" : valid.phone ? "valid" : "invalid"}
              required
            />
            {renderIcon("phone")}
          </div>
          {renderError("phone", "Telefone inválido")}
        </div>

        {/* Data nascimento */}
        <div className="form-group">
          <div className="input-wrapper">
            <DatePicker
              selected={form.birthDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              minDate={minDate}
              maxDate={maxDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="DD/MM/AAAA"
              className={
                valid.birthDate == null
                  ? ""
                  : valid.birthDate
                  ? "valid"
                  : "invalid"
              }
              required
            />
            {renderIcon("birthDate")}
          </div>
          {renderError("birthDate", "Selecione sua data")}
        </div>

        {/* Endereço */}
        <div className="form-group">
          <div className="input-wrapper">
            <input
              name="address"
              placeholder="Endereço"
              value={form.address}
              onChange={handleChange}
              className={
                valid.address == null ? "" : valid.address ? "valid" : "invalid"
              }
              required
            />
            {renderIcon("address")}
          </div>
          {renderError("address", "Endereço muito curto")}
        </div>

        <button className="btn-primary" type="submit">
          Continuar para pagamento
        </button>
      </form>
    </div>
  );
}

