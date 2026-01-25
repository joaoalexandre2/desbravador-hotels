
import { useEffect } from "react";
import { useReservation } from "../../context/ReservationContext";
import Stepper from "../../components/Stepper";
import { useNavigate } from "react-router-dom";
import "./GuestPage.css";




function SummaryPage() {
  const {
    reservation,
    calculateNights,
    calculateTotal,
    setReservation
  } = useReservation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!reservation.room) {
      navigate("/");
    }
  }, [reservation.room, navigate]);

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
    <div className="guest-page" style={{ padding: 24 }}>
      <Stepper step={2} />

      <center><h2>Resumo da Reserva</h2></center>

      {reservation.room?.image && (
        <img
          src={reservation.room.image}
          alt={`Quarto ${reservation.room.type}`}
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "10px",
            marginBottom: "16px"
          }}
        />
      )}

      <p><strong>Hóspede:</strong> {reservation.guest.name}</p>
      <p><strong>Email:</strong> {reservation.guest.email}</p>
      <p><strong>Telefone:</strong> {reservation.guest.phone}</p>

      <p>
        <strong>Quarto:</strong> {reservation.room?.type} Nº {reservation.room?.roomNumber}
      </p>

      <p><strong>Diárias:</strong> {calculateNights()}</p>
      <p><strong>Total:</strong> R$ {calculateTotal()}</p>

      <button className="btn-primary" onClick={handleConfirm}>Confirmar Reserva</button>
    </div>
  );
}

export default SummaryPage;
