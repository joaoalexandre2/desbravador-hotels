import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotels } from "../services/hotelService";
import "./HotelDetails.css";

function HotelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      const hotels = await getHotels();
      const foundHotel = hotels.find(
        (h) => h.id === id || h.id === Number(id)
      );
      setHotel(foundHotel);
      setLoading(false);
    }

    fetchHotel();
  }, [id]);

  if (loading) return <p>Carregando hotel...</p>;
  if (!hotel) return <p>Hotel não encontrado.</p>;

  return (
    <div className="hotel-details-container">
      <div className="hotel-banner">
        <img src={hotel.image} alt={hotel.name} />
      </div>

      <div className="hotel-info">
        <h1>{hotel.name}</h1>
        <p className="hotel-city">{hotel.city}</p>

        <p className="hotel-description">{hotel.description}</p>

        {hotel.amenities && (
          <>
            <h3>Comodidades</h3>
            <ul className="hotel-amenities">
              {hotel.amenities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        <button
          className="primary-button"
          onClick={() => navigate(`/hotel/${id}/quartos`)}
        >
          Conheça nossas acomodações
        </button>
      </div>
    </div>
  );
}

export default HotelPage;
