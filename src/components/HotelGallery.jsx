export default function HotelGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="hotel-gallery">
      <img src={images[0]} alt="Hotel" className="main-image" />
      <div className="side-images">
        {images.slice(1, 5).map((img, index) => (
          <img key={index} src={img} alt={`Hotel ${index + 2}`} />
        ))}
      </div>
    </div>
  );
}
