const KATEGORIE = [
  { value: "gory", label: "Góry" },
  { value: "morze", label: "Morze" },
  { value: "miasto", label: "Miasto" },
];

function CategoryBar({ aktywna, onWybierz }) {
  return (
    <div id="kategorie" className="d-flex flex-wrap gap-2 mb-4">
      <button
        type="button"
        className={`btn btn-outline-primary${aktywna === "wszystkie" ? " active" : ""}`}
        onClick={() => onWybierz("wszystkie")}
      >
        Wszystkie
      </button>
      {KATEGORIE.map((k) => (
        <button
          key={k.value}
          type="button"
          className={`btn btn-outline-primary${aktywna === k.value ? " active" : ""}`}
          onClick={() => onWybierz(k.value)}
        >
          {k.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
