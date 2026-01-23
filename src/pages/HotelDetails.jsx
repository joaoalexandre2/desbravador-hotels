// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getHotels } from "../services/hotelService";
// import RoomCard from "../components/RoomCard";
// import { useReservation } from "../context/ReservationContext";

// function HotelDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { reservation, setReservation } = useReservation();

//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchHotel() {
//       const hotels = await getHotels();
//       const foundHotel = hotels.find(
//         h => h.id === id || h.id === Number(id)
//       );
//       setHotel(foundHotel);
//       setLoading(false);
//     }
//     fetchHotel();
//   }, [id]);

//   const handleSelectRoom = (room) => {
//     // 🔥 SALVA NO CONTEXT (obrigatório)
//     setReservation({
//       ...reservation,
//       room,
//       hotel
//     });

//     // 🔥 NAVEGA PARA A ROTA CORRETA
//     navigate("/reserva/dados");
//   };

//   if (loading) return <p>Carregando hotel...</p>;
//   if (!hotel) return <h2>Hotel não encontrado</h2>;

//   return (
//     <div style={{ padding: "16px" }}>
//       <h1>{hotel.name}</h1>
//       <p>{hotel.city}</p>

//       <h2>Quartos disponíveis</h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
//           gap: "12px",
//           justifyContent: "center",
//           padding: "20px 0",
//           maxWidth: "1200px",
//           margin: "0 auto"
//         }}
//       >
//         {hotel.rooms.map(room => (
//           <RoomCard
//             key={room.roomNumber}
//             room={room}
//             onSelect={() => handleSelectRoom(room)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HotelDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHotels } from "../services/hotelService";
import RoomCard from "../components/RoomCard";
import { useReservation } from "../context/ReservationContext";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { setReservation } = useReservation();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      const hotels = await getHotels();
      const foundHotel = hotels.find(
        h => h.id === id || h.id === Number(id)
      );
      setHotel(foundHotel);
      setLoading(false);
    }
    fetchHotel();
  }, [id]);

  function handleSelectRoom(room) {
    setReservation(prev => ({
      ...prev,
      hotel: {
        id: hotel.id,
        name: hotel.name,
        city: hotel.city
      },
      room: {
        roomNumber: room.roomNumber,
        type: room.type,
        price: room.price,
        image: room.image,
        beds: room.beds,
        capacity: room.beds * 2
      }
    }));

    navigate("/reserva/dados");
  }

  if (loading) return <p>Carregando hotel...</p>;
  if (!hotel) return <h2>Hotel não encontrado</h2>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>{hotel.name}</h1>
      <p>{hotel.city}</p>

      <h2>Quartos disponíveis</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "12px",
          justifyContent: "center",
          padding: "20px 0",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {hotel.rooms.map(room => (
          <RoomCard
            key={room.roomNumber}
            room={room}
            onSelect={handleSelectRoom}
          />
        ))}
      </div>
    </div>
  );
}

export default HotelDetails;

