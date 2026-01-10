// import "./RoomCard.css";

// function RoomCard({ room, onSelect }) {
//   return (
//     <div className="room-card">
//       <img src={room.image} alt={room.name} className="room-image" />

//       <div className="room-info">
//         <h3>{room.name}</h3>
//         <p>{room.description}</p>

//         <div className="room-footer">
//           <span>R$ {room.price}</span>
//           <span>Tipo {room.type}</span>
//           <button onClick={onSelect}>Reservar</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoomCard;

// RoomCard.jsx

// src/components/RoomCard.jsx


// src/components/RoomCard.jsx
// import "./RoomCard.css";

// <div 
//   style={{
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//     gap: '24px',
//     overflowX: 'auto',
//     padding: '20px 0',
//     maxWidth: '100%'
//   }}
// ></div>

// function RoomCard({ room, onSelect }) {
//   const {
//     roomNumber,
//     type,
//     beds,
//     price,
//     availability,
//     image,
//   } = room;

//   const amenities = [
//     "Café da manhã incluso",
//     "Estacionamento grátis sem manobrista",
//     "Wi-Fi grátis",
//   ];

//   const capacity = beds * 2;

//   if (!availability) return null;

//   return (
//     <div className="room-card">
//       <div className="room-image-container">
//         {image ? (
//           <img src={image} alt={`Quarto ${type} ${roomNumber}`} className="room-image" />
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
//           Acomoda até {capacity} pessoas ({beds} camas)
//         </div>

//         <div className="price-area">
//           <div className="price">R$ {price}</div>
//           <div className="price-note">Total com impostos e taxas</div>
//         </div>

//         <button className="reserve-btn" onClick={onSelect}>
//           Reservar
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RoomCard;


import "./RoomCard.css";

function RoomCard({ room, onSelect }) {
  const { roomNumber, type, beds, price, availability, image } = room;

  // Amenities fixas para todos os quartos (conforme você pediu)
  const amenities = [
    "Café da manhã incluso",
    "Estacionamento grátis sem manobrista",
    "Wi-Fi grátis",
  ];

  const capacity = beds * 2;

  return (
    <div
      className="room-card"
      style={{
        opacity: availability ? 1 : 0.6,
        background: availability ? "white" : "#f8f9fa",
        pointerEvents: availability ? "auto" : "none", // impede interação se indisponível
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
          <div className="price-note">Total com impostos e taxas</div>
        </div>

        {availability ? (
          <button className="reserve-btn" onClick={onSelect}>
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