// Krok 3 — dane: var -> const
export const kursy = [
  { nazwa: "React", godziny: 30, aktywny: true },
  { nazwa: "Node.js", godziny: 20, aktywny: false },
  { nazwa: "MySQL", godziny: 15, aktywny: true },
  { nazwa: "Bootstrap", godziny: 10, aktywny: true },
];

// Krok 4 — pętla -> filter + map
export const nazwyAktywnych = (tablica) =>
  tablica.filter((kurs) => kurs.aktywny).map((kurs) => kurs.nazwa);

// Krok 5 — ręczne sumowanie -> reduce
export const sumaGodzin = (tablica) =>
  tablica.reduce((suma, kurs) => suma + kurs.godziny, 0);

// Krok 6 & 7 — sklejanie napisów szablonem oraz destrukturyzacja parametru
export const opis = ({ nazwa, godziny }) =>
  `Kurs ${nazwa} trwa ${godziny} godzin`;

// Krok 8 — dodajGodziny przez spread (tworzenie nowego obiektu, niemodyfikowanie starego)
export const dodajGodziny = (kurs, ile) => ({
  ...kurs,
  godziny: kurs.godziny + ile,
});
