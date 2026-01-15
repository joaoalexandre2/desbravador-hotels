export default function HotelAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="hotel-amenities">
      <h2>Comodidades</h2>
      <ul>
        {amenities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
