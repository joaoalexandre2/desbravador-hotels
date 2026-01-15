// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getHotels } from "../services/hotelService";
// import "./HotelDetails.css";

// function HotelPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchHotel() {
//       const hotels = await getHotels();
//       const foundHotel = hotels.find(
//         (h) => h.id === id || h.id === Number(id)
//       );
//       setHotel(foundHotel);
//       setLoading(false);
//     }

//     fetchHotel();
//   }, [id]);

//   if (loading) return <p>Carregando hotel...</p>;
//   if (!hotel) return <p>Hotel não encontrado.</p>;

//   return (
//     <div className="hotel-details-container">
//       <div className="hotel-banner">
//         <img src={hotel.image} alt={hotel.name} />
//       </div>

    

//       <div className="hotel-info">
//         <h1>{hotel.name}</h1>
//         <p className="hotel-city">{hotel.city}</p>

//         <p className="hotel-description">{hotel.description}</p>

//         {hotel.amenities && (
//           <>
//             <h3>Comodidades</h3>
//             <ul className="hotel-amenities">
//               {hotel.amenities.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </>
//         )}

//         <button
//           className="primary-button"
//           onClick={() => navigate(`/hotel/${id}/quartos`)}
//         >
//           Conheça nossas acomodações
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HotelPage;


// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getHotels } from "../services/hotelService";
// import "./HotelDetails.css";

// function HotelPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchHotel() {
//       try {
//         const hotels = await getHotels();

//         const foundHotel = hotels.find(
//           (h) => h.id === Number(id) || h.id === id
//         );

//         setHotel(foundHotel);
//       } catch (error) {
//         console.error("Erro ao buscar hotel:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHotel();
//   }, [id]);

//   if (loading) return <p>Carregando hotel...</p>;
//   if (!hotel) return <p>Hotel não encontrado.</p>;

//   return (
//     <div className="hotel-details-container">
//       {/* Banner principal */}
//       <div className="hotel-banner">
//         <img
//           src={hotel.image}
//           alt={hotel.name}
//         />
//       </div>

//       {/* Galeria de imagens */}
//       {hotel.images && hotel.images.length > 0 && (
//         <div className="hotel-gallery">
//           {hotel.images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`${hotel.name} - imagem ${index + 1}`}
//               loading="lazy"
//             />
//           ))}
//         </div>
//       )}

//       {/* Informações do hotel */}
//       <div className="hotel-info">
//         <h1>{hotel.name}</h1>
//         <p className="hotel-city">{hotel.city}</p>

//         <p className="hotel-description">
//           {hotel.description}
//         </p>

//         {/* Comodidades */}
//         {hotel.amenities && hotel.amenities.length > 0 && (
//           <>
//             <h3>Comodidades</h3>
//             <ul className="hotel-amenities">
//               {hotel.amenities.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//           </>
//         )}

//         {/* Botão */}
//         <button
//           className="primary-button"
//           onClick={() => navigate(`/hotel/${id}/quartos`)}
//         >
//           Conheça nossas acomodações
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HotelPage;


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
