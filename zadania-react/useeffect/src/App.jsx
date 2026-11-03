import { useState, useEffect } from "react";
import ZdjecieDnia from "./components/ZdjecieDnia";

function App() {
  const [zdjecia, setZdjecia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function pobierzZdjecia() {
      try {
        const odpowiedz = await fetch("/photos.json");
        if (!odpowiedz.ok) {
          throw new Error("Błąd serwera: " + odpowiedz.status);
        }
        const dane = await odpowiedz.json();
        setZdjecia(dane);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    pobierzZdjecia();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontFamily: "sans-serif",
        }}
      >
        <h2>Ładowanie galerii...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", margin: "20px", fontFamily: "sans-serif" }}>
        Nie udało się pobrać danych: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Galeria Zdjęć (Nowy moduł: useEffect)</h1>

      {zdjecia.length === 0 ? (
        <p>Katalog jest pusty.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {zdjecia.map((foto) => (
            <div
              key={foto.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <img
                src={foto.url}
                alt={foto.title}
                style={{ width: "100%", borderRadius: "4px" }}
              />
              <h3 style={{ fontSize: "16px", marginTop: "10px" }}>
                {foto.title}
              </h3>
            </div>
          ))}
        </div>
      )}

      <hr style={{ margin: "40px 0" }} />
      <ZdjecieDnia />
    </div>
  );
}

export default App;
