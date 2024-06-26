# DealViewerAddon

## Spis Treści
* [Informacje ogólne](#informacje-ogólne)
* [Opis działania](#opis-działania)
* [Jak zainstalować](#jak-zainstalować)
* [Dalsze plany](#dalsze-plany)

## Informacje ogólne
Prosta wtyczka do przeglądarki Firefox/Chrome rozszerzająca zawartość stron z wynikami, które można znaleźć na stronie Warszawskiego Związku Brydża Sportowego (WZBS). Umożliwia przeprowadzenie analizy lewa po lewej z korzystaniem z narzędzia HandViewer udostępnionego przez Bridge Base Online. Inspiracją do stworzenia rozszerzenia był projekt [Bridge Spider](https://bridgespider.com/), który na swojej stronie z wynikami turniejów posiada taką funkcjonalność.

## Opis działania
Po włączeniu strony z wynikami wybranego turnieju, tabela z wynikami zostaje zmodyfikowana a do komórki zawierajacej wartość kontraktu, automatycznie dodawany jest przycisk umożliwiający otwarcie analizatora. Przykładowe działanie rozszerzenia można zobaczyć na rysunkach poniżej.

<h3>Zmienione elementy w tabeli wyników</h3>

![Changed table](img/table_ui.JPG)

<h3>analiza lewa po lewej</h3>

![Changed UI](img/bbo_view.JPG)

## Jak zainstalować?

### Instalacja dla przeglądarki Firefox

Na razie dodatek nie jest opublikowany na oficjalnej stronie Firefoksa, więc można z niego korzystać tylko poprzez tymczasową instalację do przeglądarki ( na razie ). Po wyłączeniu przeglądarki, dodatek sam się odinstaluje.

Pierwszy krok to pobranie dodatku w dowolny sposób (najprościej przez code > download ZIP). Archiwum należy rozpakować gdziekolwiek. Następnie uruchomić przeglądarkę Firefox i dostać się do opcji debugowania:

* Klikając narzędzia -> więcej narzędzi -> Remote Debugging.
* Lub wpisując w przeglądarkę adres about:debugging.

Tam należy przejść do zakładki "Ten Firefox", gdzie pojawi się opcja "Tymczasowo wczytaj dodatek...", na którą należy kliknąć i dostać się do wcześniej rozpakowanego folderu i z folderu firefox_version wybrać plik "manifest.json". I to tyle, dodatek będzie działał aż do wyłączenia przeglądarki. Aby wczytać dodatek ponownie (po wyłączeniu), należy go ponownie "tymczasowo wczytać".

### Instalacja dla przeglarki chrome

Pierwszy krok to pobranie dodatku w dowolny sposób (najprościej przez code > download ZIP). Archiwum należy rozpakować gdziekolwiek. Następnie należy uruchomić Chrome i:

* W opcjach przegladarki wejść w rozszerzenia -> zarządzaj rozszerzeniami.
* Włączyć tryb developera (prawy górny róg).
* Wybrać opcje "Załaduj rozpakowane" po czym zaznaczyć folder chrome_version.
* Jeśli wszysto pójdzie dobrze, rozszerzenie zostanie załadowane.

### Instalacja dla przegladarki Opera

Wersja rozszerzenia dla przegladarki chrome powinna działać również dla Opery, ale nie korzystam i nie sprawzałem :D

## Dalsze plany

Na razie dodatek działa tylko na stronie WZBS i współpracuje z danymi wygenerowanymi przez tournament calculator. W przyszłości może jak mi się bedzie chciało to dorzucę:

* Wsparcie na innych stronach, niekoniecznie z domeny WZBS.
* Rozszerzenie funkcjonalności na inne strony wygenerowane przez inne programy liczące (np. RRBridge).
* Możliwość ściągnięcia wszystkich lub pojedynczych rozdań w użytecznym formacie (LIN lub PBN).