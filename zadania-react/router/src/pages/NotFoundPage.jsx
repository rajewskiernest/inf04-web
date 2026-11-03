import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <h2>Błąd 404: Nie ma takiej strony!</h2>
      <Link
        to="/"
        style={{ color: "#007bff", fontWeight: "bold", textDecoration: "none" }}
      >
        Wróć do strony głównej galerii
      </Link>
    </div>
  );
}

export default NotFoundPage;
