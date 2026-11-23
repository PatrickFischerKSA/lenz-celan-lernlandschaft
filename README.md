# Durchs Gebirg · Büchner & Celan

Eigenständige Lernlandschaft für die Sekundarstufe II: Georg Büchners **Lenz**, Paul Celans **Gespräch im Gebirg** und **Der Meridian**. Ausgangspunkt ist das Elsass mit Waldersbach und Oberlin. Von dort führen die Textspuren zu Nietzsche, zur versäumten Begegnung mit Adorno im Engadin und zu Celans Poetik der Begegnung.

## Website

https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/

## Lernwege

- Elsass: heutige Waldersbach-Fotografie und Reiseeindruck aus Patrick Fischers Zurichstories; Oberlins Bericht und Büchners Erzählung als verschiedene Perspektiven.
- Lebenswege: historischer Lenz, Büchner im Vormärz und Celan nach der Shoah; historische Differenzen ausdrücklich erhalten.
- Lenz: Erzählperspektive, Raumwahrnehmung, Fürsorge und Kunstgespräch.
- Gespräch im Gebirg: Büchner-Bezug, Nietzsche-Konstellation, Adorno und das ausgebliebene Treffen.
- Meridian: Kreatur und Automat, Gegenwort, Medusenhaupt, unmöglicher Schritt, Atemwende, geschichtliche Daten und Gegenüber.
- Leseraum: vollständige Lenz-Fassung und Meridian aus der bereitgestellten DOCX; Hörzugang zum Gespräch über die vollständige DLA-Lesung. Für Gespräch ist eine Textausgabe parallel vorgesehen, etwa Gesammelte Werke III, S. 169–173.
- Intertextualitätswerkstatt mit sieben unterscheidbaren Verbindungen; explizite Rückbezüge und Deutungshypothesen sind gekennzeichnet.
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

Export als Text sowie JSON-Sicherung und validierter Import mit vorheriger Bestätigung. Der Druck des Journals enthält die Antworten. Bei gesperrtem Browser-Speicher wird auf die Sicherung verwiesen. Externe Dienste erhalten erst beim Öffnen von Quellen oder Medien Anfragen; die YouTube-Lesung wird erst nach bewusster Aktivierung eingebettet.

## Lokal starten

```sh
python3 -m http.server 4175
```

Danach http://localhost:4175 öffnen. Der Leseraum benötigt HTTP, ein direktes Öffnen von `index.html` als `file://` reicht für den JSON-Abruf nicht.

## Prüfen und veröffentlichen

```sh
node --check content.js
node --check app.js
node --test tests/*.test.mjs
```

Der Workflow `.github/workflows/pages.yml` prüft die Anwendung und veröffentlicht ausschliesslich Website-Dateien, Assets und Unterrichtsmaterialien auf GitHub Pages. Änderungen auf `main` lösen die Veröffentlichung aus.
