import { useState } from "react";
import { useZdjecia } from "../hooks/useZdjecia";
import { usunZdjecie, przelaczUlubione } from "../services/zdjecia";
import CategoryBar from "../components/CategoryBar";
import Gallery from "../components/Gallery";
import ZdjecieDnia from "../components/ZdjecieDnia";

function GaleriaPage() {
  const { zdjecia, setZdjecia, isLoading, error } = useZdjecia();
  const [aktywnaKategoria, setAktywnaKategoria] = useState("wszystkie");

  if (isLoading)
    return (
      <div>
        <h2>Ładowanie galerii...</h2>
      </div>
    );
  if (error) return <div style={{ color: "red" }}>Błąd: {error}</div>;

  const widoczne =
    aktywnaKategoria === "wszystkie"
      ? zdjecia
      : zdjecia.filter((z) => z.category === aktywnaKategoria);

  return (
    <>
      <h2>Wszystkie fotografie</h2>
      <CategoryBar aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria} />
      <p style={{ color: "#666" }}>
        Wyświetlono {widoczne.length} z {zdjecia.length} zdjęć
      </p>

      <Gallery
        zdjecia={widoczne}
        onUsun={(id) => setZdjecia(usunZdjecie(id))}
        onPrzelacz={(id) => setZdjecia(przelaczUlubione(id))}
      />

      <ZdjecieDnia />
    </>
  );
}

export default GaleriaPage;
