import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useZdjecia } from "../hooks/useZdjecia";
import { dodajZdjecie } from "../services/zdjecia";

const PUSTY_FORMULARZ = { title: "", category: "", image: "", description: "" };

function DodajPage() {
  const navigate = useNavigate();
  const { isLoading, error } = useZdjecia();
  const [formularz, setFormularz] = useState(PUSTY_FORMULARZ);

  function zmienPole(pole) {
    return (event) =>
      setFormularz({ ...formularz, [pole]: event.target.value });
  }

  function obslugaSubmit(event) {
    event.preventDefault();
    dodajZdjecie({
      title: formularz.title,
      category: formularz.category,
      image: formularz.image,
      imageLarge: formularz.image,
      description: formularz.description,
    });
    navigate("/");
  }

  if (isLoading) return <p>Weryfikacja bazy danych...</p>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>Dodaj nowe zdjęcie do galerii</h2>
      <form
        onSubmit={obslugaSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Tytuł zdjęcia:
          </label>
          <input
            type="text"
            value={formularz.title}
            onChange={zmienPole("title")}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Kategoria:
          </label>
          <select
            value={formularz.category}
            onChange={zmienPole("category")}
            style={{ width: "100%", padding: "8px" }}
            required
          >
            <option value="" disabled>
              Wybierz...
            </option>
            <option value="gory">Góry</option>
            <option value="morze">Morze</option>
            <option value="miasto">Miasto</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Adres URL zdjęcia:
          </label>
          <input
            type="url"
            value={formularz.image}
            onChange={zmienPole("image")}
            placeholder="https://..."
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Opis zdjęcia:
          </label>
          <textarea
            rows="3"
            value={formularz.description}
            onChange={zmienPole("description")}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Zapisz
          </button>
          <Link
            to="/"
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DodajPage;
