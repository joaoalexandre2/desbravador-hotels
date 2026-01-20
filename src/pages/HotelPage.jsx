

// Novo

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotels } from "../services/hotelService";

import HotelHeader from "../components/HotelHeader";
import HotelGallery from "../components/HotelGallery";
import HotelDescription from "../components/HotelDescription";
import HotelAmenities from "../components/HotelAmenities";
import HotelAction from "../components/HotelAction";

import "../styles/hotel.css";

export default function HotelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      const hotels = await getHotels();
      const foundHotel = hotels.find(h => h.id === Number(id));
      setHotel(foundHotel);
      setLoading(false);
    }

    fetchHotel();
  }, [id]);


  if (!hotel) return <p>Hotel não encontrado.</p>;

  return (
    <div className="hotel-page">
      <div className="hotel-container">
        <HotelHeader hotel={hotel} />
        <HotelGallery images={hotel.images} />
        <div className="hotel-layout">
          <div className="hotel-left">
            <HotelDescription description={hotel.description} />
            <HotelAmenities amenities={hotel.amenities} />
          </div>
          <HotelAction price={hotel.pricePerNight} navigate={navigate} id={id} />
        </div>
      </div>
    </div>
  );
}
