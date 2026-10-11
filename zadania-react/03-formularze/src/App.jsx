import { useRef, useState } from "react";

const kursy = [
  "Programowanie w C#",
  "Angular dla początkujących",
  "Kurs Django",
  "Wprowadzenie do SQL",
];

function App() {
  // Krok 2: Referencje do pól formularza niekontrolowanego
  const imieNazwiskoRef = useRef(null);
  const numerKursuRef = useRef(null);

  // Krok 3 i Krok 4: Stany do obsługi wyszukiwania oraz kierunku sortowania
  const [szukaj, setSzukaj] = useState("");
  const [rosnaco, setRosnaco] = useState(true);

  // Krok 6: Stan do obsługi komunikatów walidacji na stronie (typ + tresc)
  const [status, setStatus] = useState(null);

  // Łańcuch operacji na danych: mapowanie na obiekty -> filtrowanie -> sortowanie alfabetyczne
  const widoczne = kursy
    .map((kurs, index) => ({ kurs, numer: index + 1 }))
    .filter(({ kurs }) => kurs.toLowerCase().includes(szukaj.toLowerCase()))
    .sort((a, b) =>
      rosnaco ? a.kurs.localeCompare(b.kurs) : b.kurs.localeCompare(a.kurs),
    );

  // Krok 2 i Krok 6: Zintegrowana funkcja obsługi wysyłania formularza
  function handleSubmit(event) {
    event.preventDefault();

    const imienazwisko = imieNazwiskoRef.current.value;
    const numerkursu = Number(numerKursuRef.current.value);
    const kurs = kursy[numerkursu - 1];

    console.log(imienazwisko);

    if (kurs !== undefined) {
      console.log(kurs);
      // Ustawienie stanu sukcesu – wyrenderuje zielony alert
      setStatus({
        type: "sukces",
        tresc: `${imienazwisko} zapisany(-a) na kurs: ${kurs}`,
      });
    } else {
      console.log("Nieprawidłowy numer kursu");
      // Ustawienie stanu błędu – wyrenderuje czerwony alert
      setStatus({
        type: "blad",
        tresc: "Nieprawidłowy numer kursu",
      });
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-4">Zapisy na kursy</h1>

      {/* Krok 6: Warunkowe renderowanie komunikatu walidacji nad formularzem */}
      {status && (
        <div
          className={`alert alert-${status.type === "sukces" ? "success" : "danger"}`}
        >
          {status.tresc}
        </div>
      )}

      <h2 className="h5">Liczba kursów: {kursy.length}</h2>

      {/* Krok 3 i Krok 4: Panel wyszukiwania i przełącznik sortowania */}
      <div className="d-flex gap-2 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Szukaj kursu..."
          value={szukaj}
          onChange={(e) => setSzukaj(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-secondary text-nowrap"
          onClick={() => setRosnaco(!rosnaco)}
        >
          Sortuj {rosnaco ? "Z→A" : "A→Z"}
        </button>
      </div>

      {/* Krok 5: Dynamiczny licznik przefiltrowanych kursów */}
      <p className="text-body-secondary">
        Znaleziono {widoczne.length} z {kursy.length} kursów
      </p>

      {/* Krok 1 i Krok 3: Lista zachowująca oryginalną numerację */}
      <ol>
        {widoczne.map(({ kurs, numer }) => (
          <li key={numer} value={numer}>
            {kurs}
          </li>
        ))}
      </ol>

      {/* Krok 2: Formularz niekontrolowany przy użyciu useRef */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imienazwisko">Imię i nazwisko:</label>
          <input
            type="text"
            id="imienazwisko"
            className="form-control"
            ref={imieNazwiskoRef}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="numerkursu">Numer kursu:</label>
          <input
            type="number"
            id="numerkursu"
            className="form-control"
            ref={numerKursuRef}
            required
          />
        </div>

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">
            Zapisz do kursu
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
