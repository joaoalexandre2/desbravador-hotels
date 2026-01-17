import { Navigate } from "react-router-dom";
import { useReservation } from "../context/ReservationContext";

function ProtectedRoute({ children, require }) {
  const { reservation } = useReservation();

  if (require === "guest" && !reservation.guest?.name) {
    return <Navigate to="/reserva/dados" />;
  }

  if (require === "payment" && !reservation.payment?.cardNumber) {
    return <Navigate to="/reserva/pagamento" />;
  }

  if (require === "room" && !reservation.room) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
