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
        if (!odpowiedz.ok) throw new Error("Błąd serwera: " + odpowiedz.status);
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
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px dashed #ccc",
        borderRadius: "8px",
      }}
    >
      <h3>Zdjęcie dnia (Zewnętrzne API)</h3>
      {error && <div style={{ color: "red" }}>Błąd: {error}</div>}
      {zdjecie && (
        <div style={{ margin: "15px 0" }}>
          <img
            src={`https://picsum.photos{id}/400/250`}
            alt={zdjecie.author}
            style={{ borderRadius: "6px", maxWidth: "100%" }}
          />
          <p style={{ color: "#666", fontSize: "14px" }}>
            Autor: {zdjecie.author}
          </p>
        </div>
      )}
      <button
        disabled={isLoading}
        onClick={() => setId(losowaId())}
        style={{
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isLoading ? "Losowanie..." : "Losuj inne zdjęcie"}
      </button>
    </div>
  );
}

export default ZdjecieDnia;
