// import AppRouter from "./router";
// import './App.css';

// function App() {
//   return (
//     <AppRouter/>
//   );
// }

// export default App;

import AppRouter from "./router";
import { ReservationProvider } from "./context/ReservationContext";
import "./App.css";

function App() {
  return (
    <ReservationProvider>
      <AppRouter />
    </ReservationProvider>
  );
}

export default App;

