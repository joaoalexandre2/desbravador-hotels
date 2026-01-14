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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HotelPage from "./pages/HotelPage";
import HotelDetails from "./pages/HotelDetails";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Página do hotel */}
        <Route path="/hotel/:id" element={<HotelPage />} />

        {/* Quartos do hotel */}
        <Route path="/hotel/:id/quartos" element={<HotelDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;


