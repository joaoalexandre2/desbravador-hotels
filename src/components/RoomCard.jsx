


import "./RoomCard.css";

function RoomCard({ room, onSelect }) {
  const { roomNumber, type, beds, price, availability, image } = room;

  // Amenities fixas para todos os quartos (conforme você pediu)
  const amenities = [
    "Café da manhã incluso",
    "Estacionamento grátis sem manobrista",
    "Wi-Fi Gratuito",
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