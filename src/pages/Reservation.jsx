import { useReservation } from "../context/ReservationContext";

function Reservation() {
  const { reservation } = useReservation();

  if (!reservation.room) {
    return <p>Nenhuma reserva iniciada.</p>;
  }

  return (
    <div>
      <h1>Finalizar reserva</h1>

      <p>Quarto: {reservation.room.name}</p>
      <p>Preço: R$ {reservation.room.price}</p>

      {/* formulário do hóspede aqui */}
    </div>
  );
}

export default Reservation;
