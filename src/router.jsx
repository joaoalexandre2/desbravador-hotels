// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import HotelDetails from "./pages/HotelDetails";

// function appRouter(){
//      return(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Home/>}/>
//                 <Route path="/hotel/:id" element={<HotelDetails/>}/>
//             </Routes>
//         </BrowserRouter>
//      )
// }

// export default appRouter;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import HotelPage from "./pages/HotelPage";
// import HotelDetails from "./pages/HotelDetails";
// import ReservationPage from "./pages/ReservationPage";

// function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />

//         {/* Página do hotel */}
//         <Route path="/hotel/:id" element={<HotelPage />} />

//         {/* Quartos do hotel */}
//         <Route path="/hotel/:id/quartos" element={<HotelDetails />} />

//         <Route path="/reserva" element={<ReservationPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRouter;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import HotelPage from "./pages/HotelPage";
// import HotelDetails from "./pages/HotelDetails";

// // novas páginas da reserva
// import GuestPage from "./pages/reservation/GuestPage";
// import PaymentPage from "./pages/reservation/PaymentPage";
// import SummaryPage from "./pages/reservation/SummaryPage";

// function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />

//         {/* Página do hotel */}
//         <Route path="/hotel/:id" element={<HotelPage />} />

//         {/* Quartos do hotel */}
//         <Route path="/hotel/:id/quartos" element={<HotelDetails />} />

//         {/* Fluxo de reserva */}
//         <Route path="/reserva/guest" element={<GuestPage />} />
//         <Route path="/reserva/payment" element={<PaymentPage />} />
//         <Route path="/reserva/summary" element={<SummaryPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRouter;



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HotelPage from "./pages/HotelPage";
import HotelDetails from "./pages/HotelDetails";

import GuestPage from "./pages/reservation/GuestPage";
import PaymentPage from "./pages/reservation/PaymentPage";
import SummaryPage from "./pages/reservation/SummaryPage";

import ProtectedRoute from "./components/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/hotel/:id/quartos" element={<HotelDetails />} />

        <Route
          path="/reserva/dados"
          element={
            <ProtectedRoute require="room">
              <GuestPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reserva/pagamento"
          element={
            <ProtectedRoute require="guest">
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reserva/resumo"
          element={
            <ProtectedRoute require="payment">
              <SummaryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
