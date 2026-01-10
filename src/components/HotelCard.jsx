import { Link } from "react-router-dom";
import "./HotelCard.css";

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="hotel-card-image"
      />

      <div className="hotel-card-content">
        <h2 className="hotel-card-title">{hotel.name}</h2>

        <p className="hotel-card-city">{hotel.city}</p>

        <p className="hotel-card-description">
          {hotel.description}
        </p>

        <div className="hotel-card-footer">
          <span className="hotel-card-price">
            R$ {hotel.pricePerNight} / noite
          </span>

          <Link to={`/hotel/${hotel.id}`} className="hotel-card-button">
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
