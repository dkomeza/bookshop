Aby lepiej poznać Twoje umiejętności praktyczne, przygotowałem krótkie zadanie domowe, które proszę wykonać i przesłać link do repozytorium Git z kodem.
Plik README powinien zawierać instrukcję uruchomienia całej aplikacji.

Termin oddania pracy: 31.08.2025, 23:59

Wymagania funkcjonalne – Book Tracker
Sposób implementacji i użyte narzędzia pozostawiam do wyboru.

Technologie

- Backend: Node.js + TypeScript
- Frontend: React + TypeScript

Backend

- Powinien umożliwiać:
  - pobranie listy książek,
  - dodanie nowej książki (title, author),
  - oznaczenie książki jako przeczytanej (read: true).
- Dane przechowywane w bazie danych SQLite.
- Każda książka powinna mieć następującą strukturę:
  {
  id: number;
  title: string;
  author: string;
  read: boolean;
  }

Frontend

- Wyświetla listę książek pobraną z backendu.
- Pozwala dodać nową książkę.
- Pozwala oznaczyć książkę jako przeczytaną.
