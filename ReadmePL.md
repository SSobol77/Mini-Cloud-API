# Dokumentacja projektu Mini-Cloud

## Przegląd

**Mini-Cloud** to aplikacja webowa, która pozwala użytkownikom na tworzenie, zarządzanie oraz przesyłanie plików do różnych tematów. Projekt wykorzystuje Node.js, Express.js, Handlebars (HBS) oraz różne middleware do zarządzania plikami i przesyłania plików.

## Spis treści
1. [Struktura projektu](#struktura-projektu)
2. [Instalacja i konfiguracja](#instalacja-i-konfiguracja)
3. [Uruchomienie aplikacji](#uruchomienie-aplikacji)
4. [Punkty końcowe API](#punkty-końcowe-api)
5. [Konfiguracja](#konfiguracja)
6. [Skrypty i style](#skrypty-i-style)
7. [Znane problemy](#znane-problemy)
8. [Wkład](#wkład)
9. [Licencja](#licencja)

## Struktura projektu

```
MINI-CLOUD-API
|
|-- /cloud
|   |-- (Przechowywane są tu przesłane pliki)
|
|-- /datajsons
|   |-- allTopics.json (Zawiera dane o wszystkich tematach)
|   |-- <theme_name>.json (Pliki dla konkretnych tematów)
|
|-- /node_modules
|   |-- (Moduły Node.js)
|
|-- /public
|   |-- favicon.ico (Ikona aplikacji webowej)
|   |-- logo.png (Logo aplikacji webowej)
|   |-- /css
|   |   |-- style_menu.css (Style dla menu nawigacyjnego)
|   |   |-- style_docs.css (Style dla strony dokumentacji)
|   |   |-- style_upload.css (Style dla strony przesyłania plików)
|   |   |-- styles.css (Style ogólne)
|   |-- /js
|       |-- script_config.js (JavaScript dla strony konfiguracji)
|       |-- script_index.js (JavaScript dla strony głównej)
|       |-- script_upload.js (JavaScript dla strony przesyłania plików)
|       |-- scripts.js (Funkcje ogólne JavaScript)
|
|-- /routes
|   |-- api.js (Ścieżki API do zarządzania plikami)
|   |-- config.js (Ścieżki do strony konfiguracji)
|   |-- docs.js (Ścieżki do strony dokumentacji)
|   |-- storage.js (Ścieżki do strony głównej i operacji na plikach)
|   |-- upload.js (Ścieżki do strony przesyłania plików)
|       
|-- /views
|   |-- /partial
|   |   |-- menu.hbs (Szablon dla menu nawigacyjnego)
|   |-- config.hbs (Szablon dla strony konfiguracji)
|   |-- docs.hbs (Szablon dla strony dokumentacji)
|   |-- index.hbs (Szablon dla strony głównej)
|   |-- upload.hbs (Szablon dla strony przesyłania plików)
|   |-- layout.hbs (Główny szablon dla wszystkich stron)
|
|-- app.js (Główny plik serwera do inicjalizacji i uruchamiania aplikacji)
|-- package-lock.json (Plik blokady NPM)
|-- package.json (Plik konfiguracji projektu)
|-- README.md (Dokumentacja projektu)
```

## Instalacja i konfiguracja

### Wymagania

- Node.js i npm zainstalowane na komputerze.
- Git zainstalowany na komputerze.

### Kroki

1. Sklonuj repozytorium:
   ```sh
   git clone https://github.com/your-repo/mini-cloud.git
   ```

2. Przejdź do katalogu projektu:
   ```sh
   cd mini-cloud
   ```

3. Zainstaluj zależności:
   ```sh
   npm install
   ```

## Uruchomienie aplikacji

Aby uruchomić serwer, wykonaj następujące polecenie:

```sh
node app
```

Serwer uruchomi się domyślnie na porcie 3000. Otwórz przeglądarkę i przejdź do `http://localhost:3000`.

## Punkty końcowe API

### Główne ścieżki

- `GET /`: Strona główna wyświetlająca wszystkie tematy i pliki.
- `GET /upload`: Strona przesyłania plików.
- `GET /config`: Strona konfiguracji do zarządzania tematami.
- `GET /docs`: Strona dokumentacji.

### Ścieżki API

- `GET /api/files`: Pobierz listę wszystkich plików.
- `POST /api/upload`: Prześlij nowy plik.
- `GET /api/download/:filename`: Pobierz konkretny plik.
- `DELETE /api/delete/:filename`: Usuń konkretny plik.
- `GET /api/themes`: Pobierz listę wszystkich tematów.
- `POST /api/themes`: Utwórz nowy temat.
- `DELETE /api/themes/:themeName`: Usuń konkretny temat.

## Konfiguracja

### Zarządzanie tematami

Tematy można tworzyć i usuwać za pomocą strony konfiguracji (`/config`). Każdy temat jest powiązany z plikiem JSON w katalogu `/datajsons`, który przechowuje metadane o plikach w tym temacie.

### Tworzenie nowego tematu

Aby utworzyć nowy temat:

1. Przejdź do strony konfiguracji (`/config`).
2. Wprowadź nazwę tematu i wybierz typ pliku.
3. Kliknij "Create Topic".

### Usuwanie tematu

Aby usunąć temat:

1. Przejdź do strony konfiguracji (`/config`).
2. Kliknij przycisk "Delete" obok tematu, który chcesz usunąć.

## Skrypty i style

### Pliki JavaScript

- `script_config.js`: Obsługuje tworzenie i usuwanie tematów.
- `script_index.js`: Obsługuje usuwanie plików i tematów na stronie głównej.
- `script_upload.js`: Obsługuje walidację i postęp przesyłania plików.
- `scripts.js`: Zawiera ogólne funkcje używane w aplikacji.

### Pliki CSS

- `style_menu.css`: Style dla menu nawigacyjnego.
- `style_docs.css`: Style dla strony dokumentacji.
- `style_upload.css`: Style dla strony przesyłania plików.
- `styles.css`: Style ogólne używane w aplikacji.

## Znane problemy

1. **Błąd typu MIME**: Upewnij się, że wszystkie pliki CSS i JavaScript są serwowane z poprawnym typem MIME.
2. **500 Wewnętrzny błąd serwera**: Sprawdź logi serwera w celu uzyskania szczegółowych komunikatów o błędach i upewnij się, że wszystkie wymagane middleware i ścieżki są poprawnie skonfigurowane.

## Wkład

Wkłady są mile widziane! Proszę forknąć repozytorium i stworzyć pull request ze swoimi zmianami.

### Kroki do wkładu

1. Forknij repozytorium.
2. Utwórz nową gałąź dla swojej funkcji lub poprawki błędu.
3. Wprowadź swoje zmiany.
4. Zacommituj i wypchnij swoje zmiany do swojego forka.
5. Stwórz pull request ze szczegółowym opisem swoich zmian.

## Licencja

Ten projekt jest licencjonowany na warunkach licencji MIT. Zobacz plik [LICENSE](LICENSE) dla szczegółów.

---

.
