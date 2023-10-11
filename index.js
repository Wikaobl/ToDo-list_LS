// Zapis notatki w local storage
// Wyświetlenie notatki na stronie
// Dołączenie mozliwości usuwania notatki
// Po załadowaniu strony wyświetlenie notatek pobranych z local storage

// Funkcja za pomocą której będziemy zapisywać notatkę

function saveNote() {
  const note = document.querySelector(".note-area").value;
  // mini walidacja by nie zapisywały się nam puste notatki
  if (!note) {
    alert("Wpisz notatkę");
    return;
  }
  const noteKey = Date.now().toString(); // Tutaj też możemy od razu dodawać kilka liter do tego ciągu cyfr
  localStorage.setItem(noteKey, note);
  // Funkcja tworząca elementy HTML dla nowej notatki
  createNote(noteKey, note);
  // Czyścimy pole wpisywania notatek
  // Nie wiem czemu nie działa samo note = "";
  document.querySelector(".note-area").value = "";
}

// Event listener dla buttona
document.querySelector(".save-btn").addEventListener("click", saveNote);

// Funkcja która wyświetla notatkę którą dodaliśmy ( zapisaliśmy )

function createNote(noteKey, noteText) {
  const div = document.createElement("div");
  div.id = "id" + noteKey;

  div.className = "note";

  div.textContent = noteText;

  const button = document.createElement("button");
  button.textContent = "Usuń";
  button.className = "delete-btn";

  button.addEventListener("click", () => deleteNote(noteKey));

  div.appendChild(button);
  document.querySelector(".notes").appendChild(div);
}

function deleteNote(noteKey) {
  console.log(`Usunięto notatkę nr ${noteKey}`);

  localStorage.removeItem(noteKey);

  document.querySelector(`#id${noteKey}`).remove();
}

function init() {
  console.log(Object.keys(localStorage));

  Object.keys(localStorage).forEach((noteKey) => {
    const noteText = localStorage.getItem(noteKey);
    createNote(noteKey, noteText);
  });
}
init();
