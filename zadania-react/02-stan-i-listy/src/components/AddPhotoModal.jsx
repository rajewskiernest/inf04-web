import { useState } from "react";
import { Modal } from "bootstrap";

const PUSTY_FORMULARZ = {
  title: "",
  category: "",
  image: "",
  alt: "",
  description: "",
};

function AddPhotoModal({ onDodaj }) {
  const [formularz, setFormularz] = useState(PUSTY_FORMULARZ);

  function zmienPole(pole) {
    return function (event) {
      setFormularz({ ...formularz, [pole]: event.target.value });
    };
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Prosta walidacja: tytuł i URL są wymagane
    if (!formularz.title.trim() || !formularz.image.trim()) return;

    // Przekazanie nowego zdjęcia w górę do App.jsx
    onDodaj({
      ...formularz,
      id: Date.now(), // Dynamiczne i unikalne ID
      imageLarge: formularz.image, // Używamy tego samego URL dla powiększenia
      alt: formularz.alt || formularz.title,
    });

    // Reset pól formularza
    setFormularz(PUSTY_FORMULARZ);

    // Zamknięcie modala z poziomu kodu JavaScript
    const modalElement = document.getElementById("dodajZdjecie");
    const modalInstance = Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  return (
    <div
      className="modal fade"
      id="dodajZdjecie"
      tabIndex="-1"
      aria-labelledby="dodajZdjecieLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title h5" id="dodajZdjecieLabel">
              Dodaj zdjęcie
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Zamknij"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="tytul" className="form-label">
                    Tytuł
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tytul"
                    value={formularz.title}
                    onChange={zmienPole("title")}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="kategoria" className="form-label">
                    Kategoria
                  </label>
                  <select
                    className="form-select"
                    id="kategoria"
                    value={formularz.category}
                    onChange={zmienPole("category")}
                    required
                  >
                    <option value="" disabled>
                      Wybierz kategorię...
                    </option>
                    <option value="gory">Góry</option>
                    <option value="morze">Morze</option>
                    <option value="miasto">Miasto</option>
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="plik" className="form-label">
                    Adres URL zdjęcia
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="plik"
                    placeholder="https://picsum.photos"
                    value={formularz.image}
                    onChange={zmienPole("image")}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="opis" className="form-label">
                    Opis
                  </label>
                  <textarea
                    className="form-control"
                    id="opis"
                    rows="3"
                    value={formularz.description}
                    onChange={zmienPole("description")}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer px-0 pb-0 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Anuluj
                </button>
                <button type="submit" className="btn btn-primary">
                  Zapisz
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPhotoModal;
