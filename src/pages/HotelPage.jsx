

// Novo

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getHotels } from "../services/hotelService";

// import HotelHeader from "../components/HotelHeader";
// import HotelGallery from "../components/HotelGallery";
// import HotelDescription from "../components/HotelDescription";
// import HotelAmenities from "../components/HotelAmenities";
// import HotelAction from "../components/HotelAction";

// import "../styles/hotel.css";

// export default function HotelPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchHotel() {
//       const hotels = await getHotels();
//       const foundHotel = hotels.find(h => h.id === Number(id));
//       setHotel(foundHotel);
//       setLoading(false);
//     }

//     fetchHotel();
//   }, [id]);


//   if (!hotel) return <p>Hotel não encontrado.</p>;

//   return (
//     <div className="hotel-page">
//       <div className="hotel-container">
//         <HotelHeader hotel={hotel} />
//         <HotelGallery images={hotel.images} />
//         <div className="hotel-layout">
//           <div className="hotel-left">
//             <HotelDescription description={hotel.description} />
//             <HotelAmenities amenities={hotel.amenities} />
//           </div>
//           <HotelAction price={hotel.pricePerNight} navigate={navigate} id={id} />
//         </div>
//       </div>
//     </div>
//   );
// }


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
      try {
        const hotels = await getHotels();
        const foundHotel = hotels.find((h) => h.id === Number(id));
        setHotel(foundHotel);
      } catch (error) {
        console.error("Erro ao buscar hotel:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotel();
  }, [id]);

  // 🔹 LOADING STATE
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
        }}
      >
        Carregando hotel...
      </div>
    );
  }

  if (!hotel) {
    return <p style={{ textAlign: "center" }}>Hotel não encontrado.</p>;
  }

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

          <HotelAction
            price={hotel.pricePerNight}
            navigate={navigate}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}
