import "./ReservationModal.css";

function ReservationModal({ room, onClose }) {
  if (!room) return null;

  const handleConfirm = () => {
    alert(`Reserva confirmada para o quarto: ${room.name}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmar Reserva</h2>

        <img src={room.image} alt={room.name} />

        <p><strong>Quarto:</strong> {room.name}</p>
        <p><strong>Preço:</strong> R$ {room.price} / noite</p>

        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;
