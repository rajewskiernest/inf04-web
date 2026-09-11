// Krok 3 — szkielet JavaScript i uchwyty
const ADRES = "https://typicode.com";

const wynik = document.querySelector("#wynik");
const filtr = document.querySelector("#filtr");
const licznik = document.querySelector("#licznik");

// Wszyscy pobrani użytkownicy - pobierani RAZ
let uzytkownicy = [];

// Krok 4 — pobranie danych z API za pomocą fetch
async function pobierzUzytkownikow() {
  try {
    const odpowiedz = await fetch(ADRES);

    if (!odpowiedz.ok) {
      throw new Error(`Błąd HTTP: ${odpowiedz.status} ${odpowiedz.statusText}`);
    }

    return await odpowiedz.json();
  } catch (blad) {
    console.error("Nie udało się pobrać danych:", blad);
    throw blad;
  }
}

// Krok 5 — bezpieczne wstawianie tekstu (zabezpieczenie przed atakiem XSS)
function bezpieczny(tekst) {
  return String(tekst)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Krok 6 — szablon pojedynczej karty użytkownika
function kartaHtml(uzytkownik) {
  const { name, email, address, company } = uzytkownik;

  return `
        <li class="karta">
            <h2>${bezpieczny(name)}</h2>
            <dl>
                <dt>E-mail</dt>
                <dd><a href="mailto:${bezpieczny(email)}">${bezpieczny(email)}</a></dd>
                <dt>Miasto</dt>
                <dd>${bezpieczny(address.city)}</dd>
                <dt>Firma</dt>
                <dd>${bezpieczny(company.name)}</dd>
            </dl>
        </li>`;
}

// Krok 7 — wyświetlenie listy użytkowników w elemencie #wynik
function pokazListe(lista) {
  if (lista.length === 0) {
    wynik.innerHTML = `<p class="stan">Brak wyników</p>`;
    return;
  }

  wynik.innerHTML = `<ul class="lista">${lista.map(kartaHtml).join("")}</ul>`;
}

// Krok 8 — filtrowanie danych podczas wpisywania tekstu
function odswiez() {
  const szukane = filtr.value.trim().toLowerCase();

  const widoczne =
    szukane === ""
      ? uzytkownicy
      : uzytkownicy.filter((u) => u.name.toLowerCase().includes(szukane));

  licznik.textContent = `Widocznych: ${widoczne.length} z ${uzytkownicy.length}`;
  pokazListe(widoczne);
}

// Wywołanie filtrowania przy każdym wpisanym znaku
filtr.addEventListener("input", odswiez);

// Krok 9 — funkcja pomocnicza do renderowania błędu
function pokazBlad(komunikat) {
  wynik.innerHTML = `
        <p class="stan stan--blad">
            <strong>Nie udało się pobrać danych.</strong><br>
            ${bezpieczny(komunikat)}
        </p>`;
}

// Krok 9 — funkcja startowa aplikacji
async function start() {
  // Blokujemy filtr dopóki nie ma danych
  filtr.disabled = true;

  try {
    uzytkownicy = await pobierzUzytkownikow();
    filtr.disabled = false; // Odblokowujemy po pobraniu
    odswiez();
    filtr.focus(); // Ustawiamy kursor w polu wyszukiwania
  } catch (blad) {
    pokazBlad(blad.message);
    licznik.textContent = "";
  }
}

// Uruchomienie programu
start();
