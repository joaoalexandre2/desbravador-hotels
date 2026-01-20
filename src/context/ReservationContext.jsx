// import { createContext, useContext, useState } from "react";

// const ReservationContext = createContext();

// export function ReservationProvider({ children }) {
//   const [reservation, setReservation] = useState({
//     room: null,
//     checkIn: "",
//     checkOut: "",
//     adults: 1,
//     children: 0,
//   });

//   return (
//     <ReservationContext.Provider value={{ reservation, setReservation }}>
//       {children}
//     </ReservationContext.Provider>
//   );
// }

// export function useReservation() {
//   return useContext(ReservationContext);
// }

// import { createContext, useContext, useState } from "react";

// const ReservationContext = createContext();

// export function ReservationProvider({ children }) {
//   const [reservation, setReservation] = useState({
//     guest: {},
//     payment: {},
//     room: null
//   });

//   return (
//     <ReservationContext.Provider value={{ reservation, setReservation }}>
//       {children}
//     </ReservationContext.Provider>
//   );
// }

// export function useReservation() {
//   return useContext(ReservationContext);
// }


// import { createContext, useContext, useState } from "react";

// const ReservationContext = createContext();

// const initialState = {
//   guest: {},
//   payment: {},
//   hotel: null,
//   room: null
// };

// export function ReservationProvider({ children }) {
//   const [reservation, setReservation] = useState(initialState);

//   function setRoomAndHotel(room, hotel) {
//     setReservation(prev => ({
//       ...prev,
//       room,
//       hotel
//     }));
//   }

//   function setGuest(guest) {
//     setReservation(prev => ({
//       ...prev,
//       guest
//     }));
//   }

//   function setPayment(payment) {
//     setReservation(prev => ({
//       ...prev,
//       payment
//     }));
//   }

//   return (
//     <ReservationContext.Provider
//       value={{
//         reservation,
//         setRoomAndHotel,
//         setGuest,
//         setPayment
//       }}
//     >
//       {children}
//     </ReservationContext.Provider>
//   );
// }

// export function useReservation() {
//   return useContext(ReservationContext);
// }

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [reservation, setReservation] = useState({
    room: null,
    guest: {},
    payment: {},
    dates: {
      checkIn: null,
      checkOut: null
    }
  });

  function calculateNights() {
    const { checkIn, checkOut } = reservation.dates;
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff;
  }

  function calculateTotal() {
    if (!reservation.room) return 0;
    return calculateNights() * reservation.room.price;
  }

  return (
    <ReservationContext.Provider
      value={{
        reservation,
        setReservation,
        calculateNights,
        calculateTotal
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  return useContext(ReservationContext);
}
