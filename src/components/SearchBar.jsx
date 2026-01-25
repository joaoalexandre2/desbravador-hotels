

import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { useReservation } from "../context/ReservationContext";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const { setReservation } = useReservation();

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [openGuests, setOpenGuests] = useState(false);

  // 🔹 CARREGAR LOCALSTORAGE (useEffect sem dependências)
  useEffect(() => {
    const saved = localStorage.getItem("hotelSearch");
    if (saved) {
      const data = JSON.parse(saved);
      setCity(data.city || "");
      setCheckIn(data.checkIn || "");
      setCheckOut(data.checkOut || "");
      setGuests(data.guests || guests);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 SALVAR LOCALSTORAGE (useEffect com guests, city, checkIn, checkOut)
  useEffect(() => {
    localStorage.setItem(
      "hotelSearch",
      JSON.stringify({ city, checkIn, checkOut, guests })
    );
  }, [city, checkIn, checkOut, guests]);

  // 🔹 Manipulação de guests usando functional update para evitar warning
  function handleGuestChange(type, value) {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value),
    }));
  }

  function handleSearch() {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      alert("Selecione corretamente check-in e check-out");
      return;
    }

    // 🔥 SALVA NO CONTEXT
    setReservation((prev) => ({
      ...prev,
      guest: guests,
      dates: { checkIn, checkOut },
    }));

    // 🔍 Continua filtrando hotéis
    onSearch?.({ city });
  }

  return (
    <div className="searchbar">
      <div className="search-item">
        <FaMapMarkerAlt />
        <input
          placeholder="Para onde você vai?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="search-item">
        <FaCalendarAlt />
        <div className="date-group">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <span>—</span>
          <input
            type="date"
            min={checkIn}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      <div className="search-item" onClick={() => setOpenGuests(!openGuests)}>
        <FaUserFriends />
        <span>
          {guests.adults} adultos · {guests.children} crianças · {guests.rooms}{" "}
          quarto
        </span>

        {openGuests && (
          <div className="guests-dropdown">
            <GuestRow
              label="Adultos"
              value={guests.adults}
              onMinus={() => handleGuestChange("adults", -1)}
              onPlus={() => handleGuestChange("adults", 1)}
            />
            <GuestRow
              label="Crianças"
              value={guests.children}
              onMinus={() => handleGuestChange("children", -1)}
              onPlus={() => handleGuestChange("children", 1)}
            />
            <GuestRow
              label="Quartos"
              value={guests.rooms}
              onMinus={() => handleGuestChange("rooms", -1)}
              onPlus={() => handleGuestChange("rooms", 1)}
            />
          </div>
        )}
      </div>

      <button className="search-btn" onClick={handleSearch}>
        Pesquisar
      </button>
    </div>
  );
}

function GuestRow({ label, value, onMinus, onPlus }) {
  return (
    <div className="guest-row">
      <span>{label}</span>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMinus();
          }}
        >
          −
        </button>
        <span>{value}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlus();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
