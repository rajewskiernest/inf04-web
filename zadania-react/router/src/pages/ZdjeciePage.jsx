import { useParams, useNavigate } from "react-router-dom";
import { useZdjecia } from "../hooks/useZdjecia";

function ZdjeciePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { zdjecia, isLoading, error } = useZdjecia();

  if (isLoading) return <p>Ładowanie szczegółów...</p>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const zdjecie = zdjecia.find((z) => z.id === Number(id));

  if (!zdjecie) {
    return (
      <div>
        <p style={{ color: "orange" }}>Nie znaleziono zdjęcia o ID {id}.</p>
        <button onClick={() => navigate(-1)}>Wstecz</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{zdjecie.title}</h1>
      <img
        src={zdjecie.imageLarge || zdjecie.image}
        alt={zdjecie.title}
        style={{ maxWidth: "100%", maxHeight: "500px", borderRadius: "8px" }}
      />
      <p style={{ marginTop: "20px", fontSize: "16px", color: "#333" }}>
        {zdjecie.description}
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{ padding: "8px 16px", cursor: "pointer", marginTop: "15px" }}
      >
        Wstecz
      </button>
    </div>
  );
}

export default ZdjeciePage;
