import { useState } from "react";
import GuestStep from "../components/steps/GuestStep";
import PaymentStep from "../components/steps/PaymentStep";
import SummaryStep from "../components/steps/SummaryStep";

import "../styles/reservation.css";

function ReservationPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="reservation-page">
      {step === 1 && <GuestStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <PaymentStep
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && <SummaryStep onBack={() => setStep(2)} />}
    </div>
  );
}

export default ReservationPage;
