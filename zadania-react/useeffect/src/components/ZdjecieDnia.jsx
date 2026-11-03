import { useState, useEffect } from "react";

function losowaId() {
  return Math.floor(Math.random() * 300);
}

function ZdjecieDnia() {
  const [id, setId] = useState(losowaId);
  const [zdjecie, setZdjecie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function pobierz() {
      setIsLoading(true);
      try {
        const odpowiedz = await fetch(`https://picsum.photos{id}/info`);
        if (!odpowiedz.ok) {
          throw new Error("Błąd serwera: " + odpowiedz.status);
        }
        const dane = await odpowiedz.json();
        setZdjecie(dane);
        setError(null);
      } catch (err) {
        setError(err.message);
        setZdjecie(null);
      } finally {
        setIsLoading(false);
      }
    }
    pobierz();
  }, [id]);

  return (
    <div>
      <h2>Losowe zdjęcie dnia (Picsum API)</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>Błąd: {error}</div>
      )}

      {zdjecie && (
        <div style={{ marginBottom: "15px" }}>
          <img
            src={`https://picsum.photos{id}/400/250`}
            alt={zdjecie.author}
            style={{ borderRadius: "8px", maxWidth: "100%" }}
          />
          <p style={{ color: "#666", fontStyle: "italic" }}>
            Autor: {zdjecie.author}
          </p>
        </div>
      )}

      <button
        disabled={isLoading}
        onClick={() => setId(losowaId())}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
        }}
      >
        {isLoading ? "Losowanie..." : "Losuj inne zdjęcie"}
      </button>
    </div>
  );
}

export default ZdjecieDnia;
