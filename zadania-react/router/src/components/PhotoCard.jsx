import { Link } from "react-router-dom";

const NAZWA_KATEGORII = { gory: "Góry", morze: "Morze", miasto: "Miasto" };
const KOLOR_KATEGORII = {
  gory: "#28a745",
  morze: "#007bff",
  miasto: "#343a40",
};

function PhotoCard({
  id,
  title,
  description,
  category,
  image,
  alt,
  favorite,
  onUsun,
  onPrzelacz,
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <img
        src={image}
        alt={alt || title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div
        style={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "18px" }}>{title}</h3>
          <button
            type="button"
            onClick={onPrzelacz}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            {favorite ? "★" : "☆"}
          </button>
        </div>
        <p style={{ margin: "10px 0" }}>
          <span
            style={{
              backgroundColor: KOLOR_KATEGORII[category] || "#6c757d",
              color: "white",
              padding: "3px 8px",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {NAZWA_KATEGORII[category] || category}
          </span>
        </p>
        <p style={{ color: "#666", fontSize: "14px", flexGrow: 1 }}>
          {description}
        </p>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <Link
            to={`/zdjecie/${id}`}
            style={{
              flexGrow: 1,
              textHeading: "none",
              textAlign: "center",
              padding: "8px",
              border: "1px solid #007bff",
              color: "#007bff",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Powiększ
          </Link>
          <button
            type="button"
            onClick={onUsun}
            style={{
              padding: "8px",
              border: "1px solid #dc3545",
              color: "#dc3545",
              backgroundColor: "transparent",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
