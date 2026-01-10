import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";

function appRouter(){
     return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/hotel/:id" element={<HotelDetails/>}/>
            </Routes>
        </BrowserRouter>
     )
}

export default appRouter;


