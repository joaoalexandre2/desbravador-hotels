import { useReservation } from "../../context/ReservationContext";
import Stepper from "../../components/Stepper";
import { useNavigate } from "react-router-dom";

function SummaryPage() {
  const { reservation, calculateNights, calculateTotal, setReservation } =
    useReservation();
  const navigate = useNavigate();

  function handleConfirm() {
    alert("Reserva confirmada com sucesso!");
    setReservation({
      room: null,
      guest: {},
      payment: {},
      dates: { checkIn: null, checkOut: null }
    });
    navigate("/");
  }

  return (
    <div style={{ padding: 24 }}>
      <Stepper step={2} />

      <h2>Resumo da Reserva</h2>

      <p><strong>Hóspede:</strong> {reservation.guest.name}</p>
      <p><strong>Email:</strong> {reservation.guest.email}</p>

      <p><strong>Quarto:</strong> {reservation.room.name}</p>
      <p><strong>Diárias:</strong> {calculateNights()}</p>
      <p><strong>Total:</strong> R$ {calculateTotal()}</p>

      <button onClick={handleConfirm}>Confirmar Reserva</button>
    </div>
  );
}

export default SummaryPage;

