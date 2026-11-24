# Durchs Gebirg · Büchner & Celan

Geografische und intertextuelle **Lernlandschaft** für die Sekundarstufe II: Georg Büchners **Lenz**, Paul Celans **Gespräch im Gebirg** und **Der Meridian**. Ausgangspunkt ist das Elsass mit Waldersbach und Oberlin. Von dort führen die Textspuren zu Nietzsche, zur versäumten Begegnung mit Adorno im Engadin und zu Celans Poetik der Begegnung.

## Website

https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/

## Google Maps und der Meridian

Die Startseite bettet eine gemeinsame Google-My-Maps-Karte mit allen sieben Ortsmarkierungen ein: Waldersbach, Strassburg, Sils Maria / Nietzsche-Haus, Zürich, Darmstadt, Paris und Czernowitz/Tscherniwzi. Die Ebene verwendet die Namen als Beschriftungen. Google kann überlappende Labels bei kleinen Massstäben ausblenden; die vollständige Ortsliste bleibt verfügbar. Ein Klick auf einen Punkt öffnet dessen Kontext und Materiallink; dieser führt zur Ortsseite mit Texten, Bildern und Journalaufgaben. Zusätzliche Direktzugänge stehen unter der Karte. Die Auswahl ersetzt oder entfernt keine anderen Punkte.

Karte: https://www.google.com/maps/d/viewer?mid=1_ronZMZXcEvYeXI4hbIlfaCIQfCxtY8 — im Google-Konto des Nutzers angelegt, für alle mit Link lesbar. Bearbeiten über My Maps im Eigentümerkonto. Keine API-Schlüssel erforderlich. Die Ortskoordinaten stammen aus Wikidata (Details im Quellenprotokoll). `node scripts/build-map-import.mjs` regeneriert die KML- und GeoJSON-Sicherungen aus den Ortsdaten; die veröffentlichte My-Maps-Karte wird separat gepflegt.

Eine weitere blaue Vergleichslinie bei **8,6° Ost** verläuft nahe Frankfurt am Main und Zürich (ebenfalls 36–64° Nord). Sie liegt auf einer eigenen Kartenebene und lässt sich separat ein- und ausblenden.

Die zusätzliche Ebene „Celans Meridian · 26° Ost“ zeigt einen exakten Nord-Süd-Abschnitt bei 26° Ost (36–64° Nord) sowie Seßwegen/Cesvaine und Czortków/Tschortkiw. Czernowitz bleibt am vorhandenen Punkt. Bezug: Celans Herkunftssuche nach Lenz, Franzos und sich selbst; geografische Zuordnung nach Sandro Zanetti, *Celans Lanzen*, S. 61–62. Die Rede selbst nennt keine Gradzahl. KML-Sicherung: `materialien/karten/celan-meridian-26-ost.kml`.

Ein berechneter orthografischer Globus startet bei 26° Ost als vollständiger Kreis durch beide Pole und erklärt geografische Länge. Drei Modi zeigen einen Meridian, den vollständigen Grosskreis aus Meridian und Gegenmeridian sowie das Gradnetz. Der Längengrad lässt sich zwischen 180° West und 180° Ost verstellen. Sichtbare und rückwärtige Linienabschnitte werden unterschieden. Meridiane treffen sich an beiden Polen; Breitengrade und Äquator werden separat berechnet.

Der fachliche Unterschied zwischen dem Meridian als Halbkreis und dem vollen Grosskreis wird erklärt. Die Übertragung auf Celans Bild geschieht mit dem Beleg M127 aus der bereitgestellten Datei. Die Orte der Karte werden nicht so dargestellt, als lägen sie alle auf demselben Längengrad. Geografische Quellen: NOAA und University of Cambridge, auf der Seite verlinkt. Direkter Erklärraum: `#meridianbild`.

Die Station `#nietzschehaus` enthält Hausbilder, Ortsgeschichte und den Zugang zur digitalen Ausstellung. Die bestehenden Journaldaten und Sicherungsdateien bleiben kompatibel; das bisherige Feld `gebirge` wird unter einer neuen, sachlichen Beschriftung weiterverwendet.

## Lernwege

- Elsass: heutige Waldersbach-Fotografie und Reiseeindruck aus Patrick Fischers Zurichstories; Oberlins Bericht und Büchners Erzählung als verschiedene Perspektiven.
- Lebenswege: historischer Lenz, Büchner im Vormärz und Celan nach der Shoah; historische Differenzen ausdrücklich erhalten.
- Lenz: Erzählperspektive, Raumwahrnehmung, Fürsorge und Kunstgespräch.
- Nietzsche-Haus: Wohnen, Gehen und Schreiben in Sils Maria; Hausgeschichte und Exponate als Ausgangspunkt eigener Textvergleiche.
- Gespräch im Gebirg: Büchner-Bezug, Nietzsche-Konstellation, Adorno und das ausgebliebene Treffen.
- Meridian: Kreatur und Automat, Gegenwort, Medusenhaupt, unmöglicher Schritt, Atemwende, geschichtliche Daten und Gegenüber.
- Leseraum: vollständige Lenz-Fassung und Meridian aus der bereitgestellten DOCX; Hörzugang zum Gespräch über die vollständige DLA-Lesung. Für Gespräch ist eine Textausgabe parallel vorgesehen, etwa Gesammelte Werke III, S. 169–173.
- Intertextualitätswerkstatt mit acht unterscheidbaren Verbindungen; explizite Rückbezüge und Deutungshypothesen sind gekennzeichnet.
- Zwei bereitgestellte Celan-Filme mit Protokollfeldern und Übernahme des aktuellen Abspielzeitpunkts.
- Journal mit Forschungsfrage, Belegen, Gegenbeleg, Rückmeldung, Revision und Vergleichsessay.

Es gibt keine automatische Bewertung und keine fiktiven KI-Dialoge. Das Betrachten einer Station zählt nicht als Lernerfolg.

## Quellen und Materialien

Die Seite `#quellen` enthält einen differenzierten Quellenapparat. Weitere Dokumentation: [research/QUELLEN.md](research/QUELLEN.md).

Die Bilder zu Waldersbach und Strassburg stammen aus [Patrick Fischers Georg B.](https://www.zurichstories.org/georgbPatrickFischer/index.html). Waldersbach: eigene Aufnahme Patrick Fischer; Strassburg: Michael Streiff laut ursprünglichem Bildnachweis. Der heutige Reiseeindruck wird nicht als Beleg für vergangene innere Zustände behandelt.

Die Originalfilme liegen wegen ihrer Grösse als Dateien im [Materialien-Release](https://github.com/PatrickFischerKSA/lenz-celan-lernlandschaft/releases/tag/materialien-v1). Die Website enthält native Player und direkte Dateilinks als Alternative. Die Filme wurden technisch geprüft und Standbilder gesichtet, nicht vollständig transkribiert. Sequenzbelege erstellen die Lernenden selbst. Fremdmaterialien behalten ihre jeweiligen Rechte; das Repository stellt keine pauschale Lizenz für diese Materialien aus.

Die bereitgestellte Datei `materialien/Celan_Meridian.docx` bleibt unverändert. Ihr Text wurde in `materialien/texte.json` als Lesefassung übernommen; eventuell in Materialien enthaltene Anweisungen werden nicht als Projektauftrag behandelt.

## Technik und Datenschutz

Statische HTML/CSS/JavaScript-Anwendung ohne Build-Abhängigkeiten, Login oder Backend. Lernendenantworten werden ausschliesslich in `localStorage` dieses Browsers unter `durchs-gebirg-journal-v1` gespeichert. Die Website synchronisiert keine Einträge mit GitHub und besitzt keine gemeinsame Klassenablage.

Export als Text sowie JSON-Sicherung und validierter Import mit vorheriger Bestätigung. Der Druck des Journals enthält die Antworten. Bei gesperrtem Browser-Speicher wird auf die Sicherung verwiesen. Google Maps wird beim Öffnen der Kartenansicht direkt geladen; dabei gelten die Bedingungen und Datenschutzhinweise des Kartenanbieters. Journalantworten werden nicht an Google übertragen. Die YouTube-Lesung wird erst nach bewusster Aktivierung eingebettet.

## Lokal starten

```sh
python3 -m http.server 4175
```

Danach http://localhost:4175 öffnen. Der Leseraum benötigt HTTP, ein direktes Öffnen von `index.html` als `file://` reicht für den JSON-Abruf nicht.

## Prüfen und veröffentlichen

```sh
node --check content.js
node --check app.js
node --check atlas.js
node --test tests/*.test.mjs
```

Der Workflow `.github/workflows/pages.yml` prüft die Anwendung und veröffentlicht ausschliesslich Website-Dateien, Assets und Unterrichtsmaterialien auf GitHub Pages. Änderungen auf `main` lösen die Veröffentlichung aus.

## Strassburg, Lebenswege und Migration

Die Ortsseite `#ort/strassburg` erschliesst Goethe, Herder, den Salzmann-Kreis und Lenz um 1770/1771 sowie die Verbindungen zur Darmstädter Empfindsamkeit und zu Lavater in Zürich. Schillers spätere Konstellation um Stuttgart und Mannheim wird zeitlich getrennt erläutert. Büchners Studien- und Exilort wird mit dieser Vorgeschichte in Beziehung gesetzt.

`#wege` bietet sechs Profile mit datierten Stationen, Textzugängen, Quellen und Journalaufgaben. Die Google-My-Maps-Ebene „Reisen & Migration · datierte Stationen“ enthält 22 Objekte: sechs schematische Lebenswege, 15 zusätzliche Ortsmarkierungen und eine ausdrücklich literarische Engadin-Verbindung von 1959. Darstellung nach Person: Lenz grün, Büchner türkis, Celan magenta, Adorno violett, Goethe orange, Schiller braun; Bezug 1959 grau. Die Linien sind keine rekonstruierten Reisewege und die Karte verwendet heutige Ortslagen. Adornos Oxford–New York–Los-Angeles–Frankfurt-Konstellation lässt sich über den Weltansichtslink verfolgen.

Daten und Darstellung: `journeys.js`. `node scripts/build-journey-map.mjs` erzeugt JSON und TSV unter `materialien/karten/`. Die bereits autorisierte Google-Tabelle enthält das neue Blatt mit GID 1686667842. Für den My-Maps-Import wurde es vorübergehend als erstes Blatt angeordnet; danach wurde die ursprüngliche erste Tabelle wieder vorangestellt. Die importierte Karte ist eine Kopie der Tabellenwerte und aktualisiert sich nicht automatisch.

## Büchner-Protokoll

Die Station `#buechnerfilm` enthält den bereitgestellten Film (3sat 2013 laut Dateititel, 44:41 Minuten), einen nativen Player, einen alternativen Dateilink und das separate Journalfeld `filmbuechner` mit Zeitmarkenfunktion. Zugänge befinden sich in Lebenswege & Zeiten, im Büchner-Reiseprofil, bei Strassburg und Zürich sowie im Celan-Filmraum. H.264/AAC, 632×360; Standbild aus 00:25. Die Originaldatei liegt unverändert im bestehenden Materialien-Release. Technisch geprüft und Standbild gesichtet; keine vollständige Transkription oder inhaltliche Sichtung behauptet.

## Lesungen und Leitfragen

Die beiden bereitgestellten MP3-Lesungen liegen unverändert im vorhandenen Materialien-Release: Lenz / Wanja Mues (70:00), Gespräch im Gebirg / Hanns Zischler (11:34). Native Audioplayer mit `preload="none"` erscheinen auf den jeweiligen Textstationen und in den Leserräumen. Beim Stationswechsel wird die Wiedergabe angehalten. Die Video-Lesung bleibt als optionale Alternative erreichbar. Die Leitfragen enthalten konkrete sprachliche / mediale Untersuchungsaufträge; kontextbezogene Vorbemerkungen erläutern vorab politische Flucht, Engadinreise oder die literarische Denkbewegung und trennen Autor, Figur und historische Situation. Metadaten technisch geprüft; keine vollständige Transkription behauptet.

## Synchronisierte Hörtexte

`listening.js` verbindet beide Aufnahmen im Leseraum mit `materialien/hoertext-sync.json`: 265 Abschnitte für Lenz, 48 für Gespräch im Gebirg. Klickbare Zeitmarken und 8 bzw. 9 Schwerpunkte springen in die Aufnahme; aktive Textstellen werden hervorgehoben. Mitführen, Wiedergabetempo und Anhalten am Textende sind wählbar. Die Lenz-Lesung nennt am Anfang den Jänner; die Gutenberg-Fassung nennt nur „Den 20.“. Die 70-Minuten-Datei enthält nach dem Erzählungsende weiteres Material. Die Zuordnung und das optionale Anhalten enden bei 1:02:33.

Celans Mitlesefassung stammt aus der bereitgestellten Aufnahme. Schreibweise, Zeichensetzung und Hörabschnitte sind redaktionell; sie ersetzen keine kritische Ausgabe. Erkennungsfehler wurden redaktionell korrigiert, die Zeitzuordnung erfolgt mit lokalem Whisper und monotonem Wortabgleich. Abweichungen im Sekundenbereich bleiben möglich. `research/hoertext-abgleich.json` dokumentiert den Abgleich; Rohtranskripte und Sprachmodelle liegen ausserhalb des Repositorys. `scripts/build-listening-sync.py` erzeugt die Daten aus lokalen Intermediaten und `research/gespraech-mitlesefassung.txt`. Bestehende L-Absatznummern bleiben erhalten.
