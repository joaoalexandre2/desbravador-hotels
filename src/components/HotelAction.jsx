export default function HotelAction({ price, navigate, id }) {
  return (
    <div className="hotel-action">
      <p className="price">
        R$ <strong>{price}</strong> / Diária
      </p>

      <button onClick={() => navigate(`/hotel/${id}/quartos`)}>
        Ver disponibilidade
      </button>
    </div>
  );
}

