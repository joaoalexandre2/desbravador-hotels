export default function HotelHeader({ hotel }) {
  return (
    <div className="hotel-header">
      <h1>{hotel.name}</h1>
      <p className="hotel-address">{hotel.city}</p>

      {hotel.rating && (
        <div className="hotel-rating">
          <span className="score">{hotel.rating.score}</span>
          <span className="label">{hotel.rating.label}</span>
          <small>({hotel.rating.reviews} avaliações)</small>
        </div>
      )}
    </div>
  );
}
