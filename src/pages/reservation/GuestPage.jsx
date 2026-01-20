// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useReservation } from "../../context/ReservationContext";
// import Stepper from "../../components/Stepper";
// import "./GuestPage.css";

// function GuestPage() {
//   const navigate = useNavigate();
//   const { reservation, setReservation } = useReservation();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 🔥 SALVA NO CONTEXT CORRETAMENTE
//     setReservation({
//       ...reservation,
//       guest: form
//     });

//     navigate("/reserva/pagamento");
//   };

//   return (
//     <div>
//       <Stepper active={1} />

//       <h2>Dados do hóspede</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Nome"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="phone"
//           placeholder="Telefone"
//           value={form.phone}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Continuar</button>
//       </form>
//     </div>
//   );
// }

// export default GuestPage;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useReservation } from "../../context/ReservationContext";
// import Stepper from "../../components/Stepper";
// import "./GuestPage.css";

// function GuestPage() {
//   const navigate = useNavigate();
//   const { reservation, setReservation } = useReservation();

//   const [form, setForm] = useState({
//     name: "",
//     lastName: "",          // ← novo campo teste
//     email: "",
//     phone: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form enviado!", form); // ← para debug
//     setReservation({
//       ...reservation,
//       guest: { ...form }
//     });
//     navigate("/reserva/pagamento");
//   };

//   return (
//     <div>
//       <Stepper active={1} />

//       <h2>Dados do hóspede</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Nome"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="lastName"                  // ← novo
//           placeholder="Sobrenome"
//           value={form.lastName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="phone"
//           placeholder="Telefone"
//           value={form.phone}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Continuar</button>
//       </form>
//     </div>
//   );
// }

//export default GuestPage;

// Novo


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../../context/ReservationContext";
import Stepper from "../../components/Stepper";
import InputMask from 'react-input-mask';
import "./GuestPage.css";

function GuestPage() {
  const navigate = useNavigate();
  const { reservation, setReservation } = useReservation();

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    data: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
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
            placeholder="Cpf"
            value={form.cpf}
            onChange={handleChange}
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
            required
          />
        </div>

         <div className="form-group">
          <input
            name="data"
            type="data"
            placeholder="Data Nascimento"
            value={form.data}
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