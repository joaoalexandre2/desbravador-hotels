// import { useState } from "react";
// import hotelsMock from "../mock/hotelsMock";
// import HotelCard from "../components/HotelCard";
// import SearchBox from "../components/SearchBar";

// function Home() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filtra pelo nome ou cidade
//   const filteredHotels = hotelsMock.filter(
//     (hotel) =>
//       hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "16px" }}>
//       <h1>Lista de Hotéis</h1>

//       <SearchBox
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "16px",
//           marginTop: "16px"
//         }}
//       >
//         {filteredHotels.length > 0 ? (
//           filteredHotels.map((hotel) => (
//             <HotelCard key={hotel.id} hotel={hotel} />
//           ))
//         ) : (
//           <p>Nenhum hotel encontrado.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;


import { useState, useEffect } from "react";
import { getHotels } from "../services/hotelService";
import HotelCard from "../components/HotelCard";
import SearchBox from "../components/SearchBar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      const data = await getHotels();
      setHotels(data);
      setLoading(false);
    }
    fetchHotels();
  }, []);

  // Filtra pelo nome ou cidade
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordena por preço (front-end)
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (!sortOrder) return 0;

    return sortOrder === "asc"
      ? a.pricePerNight - b.pricePerNight
      : b.pricePerNight - a.pricePerNight;
  });

  if (loading) return <p>Carregando hotéis...</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h1>Lista de Hotéis</h1>

      <SearchBox
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ marginTop: "12px", padding: "6px" }}
      >
        <option value="">Ordenar por preço</option>
        <option value="asc">Menor preço</option>
        <option value="desc">Maior preço</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          marginTop: "16px"
        }}
      >
        {sortedHotels.length > 0 ? (
          sortedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        ) : (
          <p>Nenhum hotel encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Home;


