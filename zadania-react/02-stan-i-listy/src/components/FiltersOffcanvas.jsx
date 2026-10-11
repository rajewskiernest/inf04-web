const KATEGORIE = [
  { value: "gory", label: "Góry" },
  { value: "morze", label: "Morze" },
  { value: "miasto", label: "Miasto" },
];

function FiltersOffcanvas({ aktywna, onWybierz }) {
  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="panelFiltrow">
      <div className="offcanvas-header">
        <h2 className="offcanvas-title h5">Filtry</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Zamknij"
        ></button>
      </div>
      <div className="offcanvas-body">
        <p className="text-body-secondary">
          Zaznacz kategorie, które chcesz zobaczyć:
        </p>
        {KATEGORIE.map((k) => (
          <div className="form-check" key={k.value}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`filtr-${k.value}`}
              checked={aktywna === k.value || aktywna === "wszystkie"}
              onChange={() =>
                onWybierz(aktywna === k.value ? "wszystkie" : k.value)
              }
            />
            <label className="form-check-label" htmlFor={`filtr-${k.value}`}>
              {k.label}
            </label>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary w-100 mt-4"
          data-bs-dismiss="offcanvas"
        >
          Zamknij
        </button>
      </div>
    </div>
  );
}

export default FiltersOffcanvas;
