from pathlib import Path
from xml.sax.saxutils import escape
root=Path(__file__).resolve().parents[1]
url='https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/#meridianbild'
source='https://www.schreibszenen.net/zanetti-open/sz-celans-lanzen-buch.pdf#page=61'
points=[('Seßwegen / Cesvaine · Lenz',56+58/60,26+18/60,'Lenz wird 1751 in Seßwegen (heute Cesvaine, Lettland) geboren. Celan sucht am Schluss der Rede Lenz’ Herkunftsgegend. Ortslage nach Zanetti, Celans Lanzen, S. 61; kein genauer Geburtsstandort.'),('Czortków / Tschortkiw · Franzos',49+1/60,25+47/60,'Karl Emil Franzos wird 1848 in einem Forsthaus bei Czortków geboren. Er ist Büchner-Herausgeber und Celans wiedergefundener Landsmann in der Rede. Der Punkt zeigt die Stadt, nicht das Forsthaus. Ortslage nach Zanetti, Celans Lanzen, S. 61.')]
kml='''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Celans Meridian · 26° Ost</name>
<Style id="meridian"><LineStyle><color>ff3054ba</color><width>5</width></LineStyle></Style>
<Style id="origin"><IconStyle><color>ff3054ba</color><Icon><href>https://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon></IconStyle></Style>
<Placemark><name>26° Ost · Celans geografischer Bezug</name><styleUrl>#meridian</styleUrl><description>Europäischer Ausschnitt des 26. östlichen Längengrades. Die Linie setzt sich nach Norden und Süden zu den Polen fort. Seßwegen, Czortków und Czernowitz liegen in ihrer Nähe, nicht exakt darauf. Celan nennt in der Rede keinen Zahlenwert; die Zuordnung folgt Sandro Zanetti, Celans Lanzen, S. 61–62. Der geografische Bezug erklärt das poetische Bild nicht vollständig.
Texte, Globus und Aufgaben: '''+url+'''
Quelle: '''+source+'''</description><LineString><tessellate>1</tessellate><coordinates>26,36,0 26,50,0 26,64,0</coordinates></LineString></Placemark>
'''
for name,lat,lng,desc in points:
 kml+=f'<Placemark><name>{escape(name)}</name><styleUrl>#origin</styleUrl><description>{escape(desc)}\nCelans Herkunftssuche, Karte, Globus und Aufgaben: {url}\nQuelle: {source}</description><Point><coordinates>{lng},{lat},0</coordinates></Point></Placemark>\n'
kml+='</Document></kml>\n'
(root/'materialien/karten/celan-meridian-26-ost.kml').write_text(kml)
