
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotels } from "../services/hotelService";
import RoomCard from "../components/RoomCard";
import ReservationModal from "../components/ReservationModal";

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      const hotels = await getHotels();
      const foundHotel = hotels.find(h => h.id === id || h.id === Number(id));
      setHotel(foundHotel);
      setLoading(false);
    }
    fetchHotel();
  }, [id]);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  if (loading) return <p>Carregando hotel...</p>;
  if (!hotel) return <h2>Hotel não encontrado</h2>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>{hotel.name}</h1>
      <p>{hotel.city}</p>

      <h2>Quartos disponíveis</h2>

      {/* ESTA É A PARTE QUE VOCÊ PRECISA MUDAR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", // mantém responsivo
          gap: "12px",                      // ← espaçamento bem menor (era 24px, agora 12px)
          justifyContent: "center",         // ← centraliza os cards na tela
          padding: "20px 0",                // espaço em cima/embaixo
          maxWidth: "1200px",               // evita que fique muito largo em telas grandes
          margin: "0 auto"                  // centraliza o bloco inteiro
        }}
      >
        {hotel.rooms.map(room => (
          <RoomCard
            key={room.roomNumber}           // melhor usar roomNumber como key
            room={room}
            onSelect={handleSelectRoom}
          />
        ))}
      </div>

      {isModalOpen && (
        <ReservationModal
          room={selectedRoom}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default HotelDetails;

