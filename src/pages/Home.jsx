


// import { useState, useEffect } from "react";
// import { getHotels } from "../services/hotelService";
// import HotelCard from "../components/HotelCard";
// import SearchBar from "../components/SearchBar";

// function Home() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState("");

//   useEffect(() => {
//     async function fetchHotels() {
//       const data = await getHotels();
//       setHotels(data);
//       setLoading(false);
//     }
//     fetchHotels();
//   }, []);

//   const filteredHotels = hotels.filter(
//     (hotel) =>
//       hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedHotels = [...filteredHotels].sort((a, b) => {
//     if (!sortOrder) return 0;
//     return sortOrder === "asc"
//       ? a.pricePerNight - b.pricePerNight
//       : b.pricePerNight - a.pricePerNight;
//   });

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url('https://thumbs.dreamstime.com/b/luxury-modern-white-beach-hotel-swimming-infinity-pool-sundeck-sunbeds-palm-trees-ocean-sea-sunset-vacation-home-367413507.jpg')`, // ← imagem principal sugerida
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed", // faz o fundo ficar "parallax" (opcional, mas bonito)
//         padding: "16px",
//         position: "relative",
//       }}
//     >
//       {/* Overlay semi-transparente para melhorar legibilidade dos textos e cards */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.45)", // escurece um pouco o fundo
//           zIndex: 1,
//         }}
//       />

//       {/* Conteúdo principal com z-index maior */}
//       <div style={{ position: "relative", zIndex: 2, color: "#fff" }}>
//        <center> <h1 style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
//           Find place that gives
// you ultimate calm
//         </h1></center>

//         <SearchBar
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           style={{
//             marginTop: "12px",
//             padding: "6px",
//             backgroundColor: "rgba(255,255,255,0.9)",
//             borderRadius: "6px",
//           }}
//         >
//           <option value="">Ordenar por preço</option>
//           <option value="asc">Menor preço</option>
//           <option value="desc">Maior preço</option>
//         </select>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "16px",
//             marginTop: "24px",
//           }}
//         >
//           {sortedHotels.length > 0 ? (
//             sortedHotels.map((hotel) => (
//               <HotelCard key={hotel.id} hotel={hotel} />
//             ))
//           ) : (
//             <p style={{ color: "#fff", gridColumn: "1 / -1", textAlign: "center" }}>
//               Nenhum hotel encontrado.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import { useState, useEffect } from "react";
import { getHotels } from "../services/hotelService";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch (error) {
        console.error("Erro ao buscar hotéis:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (!sortOrder) return 0;
    return sortOrder === "asc"
      ? a.pricePerNight - b.pricePerNight
      : b.pricePerNight - a.pricePerNight;
  });

  // 🔹 LOADING STATE
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
          color: "#fff",
          fontSize: "1.4rem",
        }}
      >
        Carregando hotéis...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('https://thumbs.dreamstime.com/b/luxury-modern-white-beach-hotel-swimming-infinity-pool-sundeck-sunbeds-palm-trees-ocean-sea-sunset-vacation-home-367413507.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        padding: "16px",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 1,
        }}
      />

      {/* Conteúdo */}
      <div style={{ position: "relative", zIndex: 2, color: "#fff" }}>
        <center>
          <h1 style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
            Find place that gives
            <br />
            you ultimate calm
          </h1>
        </center>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            marginTop: "12px",
            padding: "6px",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "6px",
          }}
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
            marginTop: "24px",
          }}
        >
          {sortedHotels.length > 0 ? (
            sortedHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <p
              style={{
                color: "#fff",
                gridColumn: "1 / -1",
                textAlign: "center",
              }}
            >
              Nenhum hotel encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;




