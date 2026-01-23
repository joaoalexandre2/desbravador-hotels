

// import "./RoomCard.css";

// function RoomCard({ room, onSelect }) {
//   const { roomNumber, type, beds, price, availability, image } = room;

//   // Amenities fixas para todos os quartos
//   const amenities = [
//     "Café da manhã incluso",
//     "Estacionamento grátis sem manobrista",
//     "Wi-Fi Gratuito",
//   ];

//   const capacity = beds * 2;

//   return (
//     <div
//       className="room-card"
//       style={{
//         opacity: availability ? 1 : 0.6,
//         background: availability ? "white" : "#f8f9fa",
//         pointerEvents: availability ? "auto" : "none", // impede interação se indisponível
//         transition: "opacity 0.3s ease, background 0.3s ease",
//       }}
//     >
//       <div className="room-image-container">
//         {image ? (
//           <img
//             src={image}
//             alt={`Quarto ${type} Nº ${roomNumber}`}
//             className="room-image"
//           />
//         ) : (
//           <div className="no-image">Sem foto</div>
//         )}
//       </div>

//       <div className="room-details">
//         <h3 className="room-title">
//           Quarto {type} <small>Nº {roomNumber}</small>
//         </h3>

//         <ul className="amenities-list">
//           {amenities.map((item, index) => (
//             <li key={index}>✓ {item}</li>
//           ))}
//         </ul>

//         <div className="capacity">
//           Acomoda até {capacity} pessoas ({beds} cama{beds > 1 ? "s" : ""})
//         </div>

//         <div className="price-area">
//           <div className="price">R$ {price}</div>
//           <div className="price-note">Total com impostos e taxas</div>
//         </div>

//         {availability ? (
//           <button
//             className="reserve-btn"
//             onClick={() => onSelect(room)} // 🔥 envia o quarto completo para o pai
//           >
//             Reservar
//           </button>
//         ) : (
//           <button
//             className="reserve-btn"
//             style={{ background: "#ccc", cursor: "not-allowed" }}
//             disabled
//           >
//             Indisponível
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RoomCard;


// import "./RoomCard.css";
// import { useReservation } from "../context/ReservationContext";
// import { useNavigate } from "react-router-dom";

// function RoomCard({ room }) {
//   const { setReservation } = useReservation();
//   const navigate = useNavigate();

//   const { roomNumber, type, beds, price, availability, image } = room;
//   const capacity = beds * 2;

//   function handleReserve() {
//     setReservation((prev) => ({
//       ...prev,
//       room,
//     }));

//     navigate("/summary");
//   }

//   return (
//     <div className="room-card" style={{ opacity: availability ? 1 : 0.6 }}>
//       <div className="room-image-container">
//         <img src={image} alt={`Quarto ${type}`} className="room-image" />
//       </div>

//       <div className="room-details">
//         <h3>Quarto {type} <small>Nº {roomNumber}</small></h3>

//         <p>Acomoda até {capacity} pessoas</p>

//         <div className="price-area">
//           <strong>R$ {price}</strong>
//           <small> / noite</small>
//         </div>

//         <button
//           className="reserve-btn"
//           disabled={!availability}
//           onClick={handleReserve}
//         >
//           Reservar
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RoomCard;


// Novo


import "./RoomCard.css";
import { useReservation } from "../context/ReservationContext";
import { useNavigate } from "react-router-dom";

function RoomCard({ room }) {
  const { reservation, setReservation } = useReservation();
  const navigate = useNavigate();

  const { roomNumber, type, beds, price, availability, image } = room;

  const amenities = [
    "Café da manhã incluso",
    "Estacionamento grátis sem manobrista",
    "Wi-Fi Gratuito",
  ];

  const capacity = beds * 2;

  function handleReserve() {
    // 🚫 BLOQUEIO SE NÃO TIVER DATAS
    if (
      !reservation.dates?.checkIn ||
      !reservation.dates?.checkOut
    ) {
      alert("Selecione as datas de check-in e check-out antes de reservar.");
      return;
    }

    // ✅ SALVA QUARTO NO CONTEXT
    setReservation((prev) => ({
      ...prev,
      room,
    }));

    // 🔄 NAVEGA PARA DADOS / RESUMO
    navigate("/reserva/dados");
  }

  return (
    <div
      className="room-card"
      style={{
        opacity: availability ? 1 : 0.6,
        background: availability ? "white" : "#f8f9fa",
        pointerEvents: availability ? "auto" : "none",
        transition: "opacity 0.3s ease, background 0.3s ease",
      }}
    >
      <div className="room-image-container">
        {image ? (
          <img
            src={image}
            alt={`Quarto ${type} Nº ${roomNumber}`}
            className="room-image"
          />
        ) : (
          <div className="no-image">Sem foto</div>
        )}
      </div>

      <div className="room-details">
        <h3 className="room-title">
          Quarto {type} <small>Nº {roomNumber}</small>
        </h3>

        <ul className="amenities-list">
          {amenities.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>

        <div className="capacity">
          Acomoda até {capacity} pessoas ({beds} cama{beds > 1 ? "s" : ""})
        </div>

        <div className="price-area">
          <div className="price">R$ {price}</div>
          <div className="price-note">por noite</div>
        </div>

        {availability ? (
          <button className="reserve-btn" onClick={handleReserve}>
            Reservar
          </button>
        ) : (
          <button
            className="reserve-btn"
            style={{ background: "#ccc", cursor: "not-allowed" }}
            disabled
          >
            Indisponível
          </button>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
