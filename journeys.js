/* Selected, dated stations; map lines are schematic, not reconstructed travel tracks. */
const journeyPlaces={
  "frankfurt": {
    "name": "Frankfurt am Main",
    "lat": 50.11552,
    "lng": 8.68417,
    "coordinateSource": "https://www.geonames.org/2925533/"
  },
  "leipzig": {
    "name": "Leipzig",
    "lat": 51.33962,
    "lng": 12.37129,
    "coordinateSource": "https://www.geonames.org/2879139/"
  },
  "weimar": {
    "name": "Weimar",
    "lat": 50.9803,
    "lng": 11.32903,
    "coordinateSource": "https://www.geonames.org/2812482/"
  },
  "stuttgart": {
    "name": "Stuttgart",
    "lat": 48.78232,
    "lng": 9.17702,
    "coordinateSource": "https://www.geonames.org/2825297/"
  },
  "mannheim": {
    "name": "Mannheim",
    "lat": 49.4891,
    "lng": 8.46694,
    "coordinateSource": "https://www.geonames.org/2873891/"
  },
  "giessen": {
    "name": "Giessen",
    "lat": 50.58727,
    "lng": 8.67554,
    "coordinateSource": "https://www.geonames.org/2920512/"
  },
  "tartu": {
    "name": "Dorpat / Tartu",
    "lat": 58.38062,
    "lng": 26.72509,
    "coordinateSource": "https://www.geonames.org/588335/"
  },
  "riga": {
    "name": "Riga",
    "lat": 56.946,
    "lng": 24.10589,
    "coordinateSource": "https://www.geonames.org/456172/"
  },
  "koenigsberg": {
    "name": "Königsberg / Kaliningrad",
    "lat": 54.70639,
    "lng": 20.51102,
    "coordinateSource": "https://www.geonames.org/554234/"
  },
  "petersburg": {
    "name": "St. Petersburg",
    "lat": 59.93863,
    "lng": 30.31413,
    "coordinateSource": "https://www.geonames.org/498817/"
  },
  "moskau": {
    "name": "Moskau",
    "lat": 55.75204,
    "lng": 37.61781,
    "coordinateSource": "https://www.geonames.org/524901/"
  },
  "bukarest": {
    "name": "Bukarest",
    "lat": 44.43225,
    "lng": 26.10626,
    "coordinateSource": "https://www.geonames.org/683506/"
  },
  "wien": {
    "name": "Wien",
    "lat": 48.20849,
    "lng": 16.37208,
    "coordinateSource": "https://www.geonames.org/2761369/"
  },
  "oxford": {
    "name": "Oxford",
    "lat": 51.75222,
    "lng": -1.25596,
    "coordinateSource": "https://www.geonames.org/2640729/"
  },
  "newyork": {
    "name": "New York",
    "lat": 40.71427,
    "lng": -74.00597,
    "coordinateSource": "https://www.geonames.org/5128581/"
  },
  "losangeles": {
    "name": "Los Angeles",
    "lat": 34.05223,
    "lng": -118.24368,
    "coordinateSource": "https://www.geonames.org/5368361/"
  },
  "strassburg": {
    "name": "Strassburg",
    "lat": 48.573333,
    "lng": 7.752222
  },
  "waldersbach": {
    "name": "Waldersbach",
    "lat": 48.414444,
    "lng": 7.213611
  },
  "zuerich": {
    "name": "Zürich",
    "lat": 47.374444,
    "lng": 8.541111
  },
  "darmstadt": {
    "name": "Darmstadt",
    "lat": 49.866667,
    "lng": 8.65
  },
  "paris": {
    "name": "Paris",
    "lat": 48.856667,
    "lng": 2.352222
  },
  "czernowitz": {
    "name": "Czernowitz / Tscherniwzi",
    "lat": 48.290833,
    "lng": 25.934444
  },
  "cesvaine": {
    "name": "Seßwegen / Cesvaine",
    "lat": 56.9666666667,
    "lng": 26.3
  },
  "sils": {
    "name": "Engadin / Sils Maria",
    "lat": 46.4292,
    "lng": 9.76389
  }
};
const journeySources={
 lenz:'https://bbld.de/0000000121432556',
 lenzEdition:'https://lenz-archiv.de/verzeichnisse/handschriften/',
 buechner:'https://hls-dhs-dss.ch/de/articles/011620/2003-01-27/',
 celan:'https://www.deutsche-biographie.de/118519859.html',
 adorno:'https://agso.uni-graz.at/archive/lexikon/klassiker/adorno/02bio.htm',
 goethe:'https://www.jgoethe.uni-muenchen.de/leben/biotitel.html',
 herder:'https://www.jgoethe.uni-muenchen.de/leben/straher.html',
 empfindsamkeit:'https://www.jgoethe.uni-muenchen.de/leben/empfind.html',
 lavater:'https://www.jgoethe.uni-muenchen.de/leben/lavater.html',
 salzmann:'https://www.alsace-histoire.org/netdba/salzmann-jean-daniel/',
 schiller:'https://www.schillerverein.de/schiller/biographie/'
};
const journeys=[
 {id:'lenz',name:'Jakob Michael Reinhold Lenz',short:'Lenz',color:'#558b2f',kind:'Ausbildung · Erwerbsarbeit · unsichere Zugehörigkeit',period:'1751–1792',field:'lenz',reading:'#leseraum/lenz',readingLabel:'Büchners Lenz lesen',
 text:'Lenz verlässt Livland zum Studium und kommt 1771 als Begleiter der Brüder von Kleist nach Strassburg. Die Arbeit als Privatlehrer gehört ebenso zu seinem Leben wie das Schreiben. Auf den Weimarer Aufenthalt folgen wechselnde Unterkünfte; 1778 nimmt Oberlin ihn im Steintal auf. Später lebt Lenz wieder im östlichen Europa. Seine Bewegung ist durch Abhängigkeit und prekäre Erwerbsmöglichkeiten geprägt. Sie lässt sich nicht mit Büchners politischer Flucht oder Celans Verfolgung gleichsetzen.',
 stops:[['cesvaine','1751','Geburt in Livland'],['tartu','1759–1768','Lateinschule in Dorpat'],['koenigsberg','ab 1768','Theologiestudium'],['strassburg','1771–1776','Begleiter, Privatlehrer und Autor'],['weimar','1776','Aufenthalt; anschliessend wechselnde Orte'],['waldersbach','20. Januar–8. Februar 1778','Oberlins Pfarrhaus'],['strassburg','Februar 1778','Rückführung aus dem Steintal'],['riga','1779','Rückkehr ins Baltikum'],['petersburg','1781','Arbeit als Privatsekretär'],['moskau','ab 1781; gestorben 1792','Unterricht, Übersetzungen und Reformprojekte']],
 paths:[['cesvaine','tartu','koenigsberg','strassburg','weimar','waldersbach','strassburg','riga','petersburg','moskau']],
 question:'Wie bestimmen Arbeit, Unterkunft und Fürsorge Lenz’ Handlungsspielraum in Strassburg und bei Oberlin?',steps:['Vergleiche die Station Strassburg mit dem Aufenthalt bei Oberlin: Wer bietet Arbeit, Unterkunft oder Fürsorge?','Untersuche im Kunstgespräch die Aufmerksamkeit für das Leben einfacher Menschen. Trenne den historischen Autor von Büchners Figur.','Lies Celans Rückblick auf Lenz im Meridian. Welche Person und welche Textfigur begegnen einander dort?'],sources:['lenz','lenzEdition']},
 {id:'buechner',name:'Georg Büchner',short:'Büchner',color:'#0097a7',kind:'Studium · politische Flucht · wissenschaftliche Arbeit',period:'1831–1837',field:'zeiten',reading:'#leseraum/lenz',readingLabel:'Lenz und seinen Entstehungskontext lesen',
 text:'Büchner studiert zunächst in Strassburg, dann in Giessen. Seine revolutionäre Tätigkeit in Hessen bringt ihn in Gefahr. 1835 entzieht er sich der drohenden Verhaftung durch die Flucht nach Strassburg. Die Stadt wird vom Studienort zum Zufluchtsort. 1836 zieht er als Naturwissenschaftler nach Zürich. Die Stationen verbinden politische Verfolgung, persönliche Beziehungen und die Suche nach einer beruflichen Existenz.',
 stops:[['darmstadt','bis 1831','Schulzeit; 1834–1835 erneut im Elternhaus'],['strassburg','1831–1833','Medizinstudium und Verlobung mit Minna Jaeglé'],['giessen','1833–1834','Studium und revolutionäre Tätigkeit'],['darmstadt','1834–1835','Literarische und politische Arbeit unter Verfolgungsdruck'],['strassburg','März 1835–1836','Flucht vor drohender Verhaftung'],['zuerich','Oktober 1836–Februar 1837','Privatdozent; Tod am 19. Februar 1837']],
 paths:[['darmstadt','strassburg','giessen','darmstadt','strassburg','zuerich']],question:'Was verändert sich zwischen Büchners Strassburger Studienaufenthalt 1831–1833 und seinem Exil ab 1835?',steps:['Vergleiche Strassburg 1831 und 1835. Was ändert sich an Büchners Bewegungsfreiheit?','Verbinde die Flucht mit den Materialien zum Hessischen Landboten und zur staatlichen Verfolgung.','Prüfe eine Passage aus Lenz auf soziale Aufmerksamkeit. Eine biografische Parallele ersetzt keinen Textbeleg.'],sources:['buechner']},
 {id:'celan',name:'Paul Celan',short:'Celan',color:'#c2185b',kind:'Überleben der Shoah · Migration · Schreiben und Übersetzen',period:'1945–1948; spätere Reisen',field:'filmvergleich',reading:'#leseraum/meridian',readingLabel:'Der Meridian: Herkunft und Begegnung',
 text:'Celan überlebt die Shoah; seine Eltern werden deportiert und kommen ums Leben. Die eingezeichnete Folge beginnt erst nach dem Krieg: 1945 zieht er von Czernowitz nach Bukarest, Ende 1947 gelangt er nach Wien und 1948 nach Paris. Die Verbindungslinie dokumentiert ausgewählte Stationen dieser Migration. Sie bildet die Verfolgung und Zwangsarbeit während des Krieges nicht ab. Paris wird zum langjährigen Lebens- und Arbeitsort des deutschsprachigen Dichters und Übersetzers.',
 stops:[['czernowitz','bis 1945','Mehrsprachige Herkunft; Verfolgung und Überleben'],['bukarest','1945–1947','Arbeit als Übersetzer und Lektor'],['wien','Ende 1947–1948','Literarische Kontakte und Veröffentlichungen'],['paris','ab 1948','Lebensmittelpunkt; Schreiben und Übersetzen']],paths:[['czernowitz','bukarest','wien','paris']],
 question:'Wie lässt sich Celans Migration 1945–1948 auf die Herkunftssuche im Meridian beziehen?',steps:['Ordne eine Passage aus einem der Filme einer der Stationen zu. Halte Zeitpunkt und Aussage fest.','Lies die Herkunftssuche am Ende des Meridian. Was bedeutet es, dass die gesuchten Orte auf der Kinder-Landkarte nicht zu finden sind?','Vergleiche die Migration von 1945–1948 mit einer späteren literarischen Reise. Unterscheide Notwendigkeit, Entscheidung und Anlass.'],sources:['celan']},
 {id:'adorno',name:'Theodor W. Adorno',short:'Adorno',color:'#673ab7',kind:'Nationalsozialistische Verfolgung · Exil · Rückkehr',period:'1934–1949/1953',field:'adorno',reading:'#gespraech',readingLabel:'Celan, Adorno und das ausgebliebene Gespräch',
 text:'Adorno wird 1903 in Frankfurt am Main geboren. Nach dem Entzug seiner Lehrbefugnis unter den Nationalsozialisten geht er 1934 nach England. Oxford, New York und Los Angeles werden Stationen des Exils. 1949 kehrt er nach Frankfurt zurück; weitere USA-Aufenthalte folgen, 1953 wird die Rückkehr dauerhaft. Frankfurt ist damit Herkunfts- und Rückkehrort. Die philosophische Arbeit entsteht auch aus Vertreibung und der Erfahrung der nationalsozialistischen Katastrophe.',
 stops:[['frankfurt','1903; bis 1934','Geburt, Studium und frühe Lehrtätigkeit'],['oxford','1934–1938','Exil in England; auch Rückreisen nach Deutschland'],['newyork','1938–1941','Institut für Sozialforschung und Radio Research Project'],['losangeles','1941–1949','Zusammenarbeit mit Horkheimer'],['frankfurt','1949; dauerhaft ab 1953','Rückkehr, Universität und Institut für Sozialforschung']],paths:[['frankfurt','oxford','newyork','losangeles','frankfurt']],
 question:'Wie verändert Exil die Frage nach Dichtung und Kultur?',steps:['Verfolge Adornos Exilweg in der Weltansicht. Stelle ihn neben Celans Migration nach Paris, ohne die Erfahrungen gleichzusetzen.','Lies die Materialien zur versäumten Begegnung im Engadin 1959. Der geografische Bezug ersetzt keinen Nachweis einer tatsächlichen Begegnung.','Untersuche, wie Gespräch im Gebirg eine Anrede gestaltet. Die beiden Figuren sind keine historischen Gesprächsprotokolle.'],sources:['adorno']},
 {id:'goethe',name:'Johann Wolfgang Goethe',short:'Goethe',color:'#f57c00',kind:'Studienreise · literarische Begegnung · Freundschaftskultur',period:'1770–1775',field:'spuren',reading:'#ort/strassburg',readingLabel:'Strassburg: Gespräche, Landschaft und neue Formen',
 text:'1770 geht Goethe von Frankfurt nach Strassburg, um sein juristisches Studium abzuschliessen. Die Begegnung mit Herder und der Verkehr im Salzmann-Kreis verändern seinen Blick auf Sprache und Literatur. Die Verbindung nach Sessenheim gehört zur Beziehung zu Friederike Brion. 1771 kehrt Goethe nach Frankfurt zurück; Reisen und Kontakte führen später auch nach Darmstadt und Zürich. Die ausgewählten Ortswechsel zeigen ein Netz von Studium, Lektüre, Liebe und Freundschaft.',
 stops:[['frankfurt','1770','Ausgangspunkt der Studienreise'],['strassburg','April 1770–August 1771','Studium; Herder und der Salzmann-Kreis'],['strassburg','1770/1771','Ausflüge nach Sessenheim; Friederike Brion'],['frankfurt','ab August 1771','Rückkehr und literarische Arbeit'],['darmstadt','1772','Empfindsamer Freundeskreis um Merck und die Flachslands'],['zuerich','1775','Schweizer Reise; Lavater als Gesprächspartner']],
 paths:[['frankfurt','strassburg','frankfurt'],['frankfurt','darmstadt'],['frankfurt','zuerich']],
 question:'Wie wird ein Gesprächskreis zu einem literarischen Ereignis?',steps:['Verfolge die Beziehungen zwischen Frankfurt, Strassburg, Darmstadt und Zürich. Unterscheide eine Reise von einem Brief- oder Lektürekontakt.','Vergleiche Herders Interesse an Volkslied und Shakespeare mit Lenz’ Kunstgespräch bei Büchner.','Frage nach der Differenz: Was wird bei Goethe oder Lenz als Natur und lebendige Sprache gesucht, was wird bei Celan daran problematisch?'],sources:['goethe','herder','empfindsamkeit','lavater']},
 {id:'schiller',name:'Friedrich Schiller',short:'Schiller',color:'#795548',kind:'Herrschaftlicher Zwang · Theater · Flucht',period:'1782–1784',field:'kunst',reading:'#ort/strassburg',readingLabel:'Sturm und Drang: Strassburg und Mannheim unterscheiden',
 text:'Schiller gehört zur späteren Phase des Sturm und Drang. 1770/1771 ist er noch Schüler in Ludwigsburg. Sein frühes Theater verbindet sich mit Mannheim: 1782 besucht er die Uraufführung der Räuber gegen den Willen seines Landesherrn. Im September flieht er aus Stuttgart. Über Mannheim und Frankfurt gelangt er nach Oggersheim, später nach Bauerbach; 1783 wird er Theaterdichter in Mannheim. 1784 liest er am Darmstädter Hof aus Don Karlos.',
 stops:[['stuttgart','bis September 1782','Militärarzt; Arrest und Schreibverbot'],['mannheim','1782; ab 1783','Die Räuber; später Theaterdichter'],['frankfurt','Herbst 1782','Station während der Flucht'],['darmstadt','Dezember 1784','Lesung am Hof']],paths:[['stuttgart','mannheim','frankfurt'],['mannheim','darmstadt']],
 question:'Wie viel Freiheit hat ein Autor unter fürstlicher Herrschaft?',steps:['Vergleiche Schillers Konflikt mit Carl Eugen mit Büchners Verfolgung im Vormärz. Arbeite die unterschiedlichen politischen Verhältnisse heraus.','Beziehe das Theater als Aufführungs- und Erwerbsort ein.','Halte fest, warum Schiller nicht als Teilnehmer des Strassburger Gesprächskreises von 1770/1771 eingezeichnet ist.'],sources:['schiller']}
];
function journeyURL(id){return 'https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/#wege/'+id;}
function journeyOverview(){return `<section class="journey-overview"><p class="eyebrow">Reise · Flucht · Migration · Exil</p><h2>Wer geht – und warum?</h2><p>Wähle einen Lebensweg und prüfe Anlass, Ziel und historischen Zwang. Die Kartenlinien zeigen ausgewählte Ortsbewegungen; Flucht und Migration haben andere Bedingungen als eine Reise.</p><details><summary>Strassburg und Frankfurt: Knoten zwischen verschiedenen Zeiten</summary><p>Strassburg ist ein Knoten, Frankfurt verbindet Goethe und Adorno über sehr verschiedene Zeiten. Die Kartenebene „Reisen & Migration“ verbindet ausgewählte Stationen; Farben und Namen ordnen die Wege zu.</p></details><div class="journey-cards">${journeys.map(j=>`<a href="#wege/${j.id}" style="--journey-color:${j.color}"><span>${j.period}</span><strong>${j.short}</strong><small>${j.kind}</small></a>`).join('')}</div><p class="source">Linien zwischen Ortslagen sind schematisch: keine rekonstruierten Strassen, Verkehrsmittel oder Fluchtverläufe. Zwischenstationen und Rückreisen sind teilweise ausgelassen. Neue Ortslagen: GeoNames (CC BY 4.0), bestehende Kartenpunkte wie im Quellenprotokoll. Die graue Verbindung zum Engadin ist ein literarischer Bezugsraum von 1959, keine gemeinsame Reise.</p><p><a class="textlink" href="#ort/strassburg">Strassburg als literarischen Knoten erkunden</a> · <a href="${sharedGoogleMapLink()}&ll=38%2C-25&z=2" target="_blank" rel="noreferrer">Adornos Exilweg in der Weltansicht öffnen</a></p></section>`;}
function journeyPage(id){const j=journeys.find(j=>j.id===id);if(!j)return `<div class="wrap">${journeyOverview()}</div>`;return `<div class="wrap journey-page"><a class="map-back" href="#auftakt">Zur gemeinsamen Karte</a>${head(j.period+' · '+j.kind,j.name,'Reisen, Abhängigkeiten und die Suche nach einem Ort.')}<p class="lead">${j.text}</p><nav class="journey-stations" aria-label="Ausgewählte Stationen in zeitlicher Folge">${j.stops.map(([id,date,why],i)=>`<a href="https://www.google.com/maps/search/?api=1&query=${journeyPlaces[id].lat},${journeyPlaces[id].lng}" target="_blank" rel="noreferrer" style="--journey-color:${j.color}"><span>${i+1} · ${date}</span><strong>${journeyPlaces[id].name}</strong><small>${why}</small></a>`).join('')}</nav><p class="source">Auswahl von Lebensstationen in zeitlicher Folge. Die Karte verbindet Ortslagen, nicht lückenlos rekonstruierte Reisewege. Heutige Grenzen und Namen entsprechen nicht durchgehend der jeweiligen historischen Situation.</p>${id==='buechner'?'<aside class="inset"><h3>Den Lebensweg im Film verfolgen</h3><p>Das Büchner-Protokoll ergänzt die Stationsfolge um eine filmische Spurensuche. Vergleiche Orte, Quellen und Darstellung.</p><a href="#buechnerfilm">Büchner-Protokoll ansehen und untersuchen · 44:41 Minuten</a></aside>':''}${id==='adorno'?'<div class="inset"><h3>Frankfurt: Goethe und Adorno</h3><p>Goethes Strassburger Aufbruch von 1770 und Adornos Exil ab 1934 beginnen in derselben Stadt. Zwischen den Konstellationen liegen mehr als 160 Jahre. Ortsgleichheit macht die politischen Bedingungen nicht gleich.</p></div>':''}<div class="atlas-detail-links"><a class="button" href="${j.reading}">${j.readingLabel}</a><a href="${sharedGoogleMapLink()}${id==='adorno'?'&ll=38%2C-25&z=2':''}" target="_blank" rel="noreferrer">In der Google-Karte verfolgen</a><a href="#wege">Alle Lebenswege vergleichen</a></div>${task(j.question,'<ol>'+j.steps.map(t=>'<li>'+t+'</li>').join('')+'</ol>',j.field,j.id)}${source(...j.sources.map(k=>[journeySources[k],k==='lenzEdition'?'Lenz-Archiv: Handschriften und Briefe':k==='adorno'?'Universität Graz: Adorno-Chronik':k==='buechner'?'Historisches Lexikon der Schweiz: Büchner':k==='celan'?'Deutsche Biographie: Celan':k==='schiller'?'Schillerverein: Biografie':'Biografische Quelle: '+k]))}</div>`;}
function strasbourgEssay(){return `<section class="strasbourg-essay"><p class="eyebrow">Strassburg · etwa 1770–1776</p><h2>Ein Knoten der Gespräche.<br>Eine neue Aufmerksamkeit.</h2><p class="lead">Universität, Mehrsprachigkeit, Tischgesellschaften und persönliche Begegnungen machen die Stadt zu einem wichtigen Ort des Sturm und Drang. Das geistige Leben entsteht aus konkreten Beziehungen: Menschen kommen an, lesen miteinander, widersprechen, reisen weiter und schreiben Briefe.</p><div class="hotspot-grid"><article><h3>Goethe und Herder</h3><p>Goethe studiert hier von April 1770 bis August 1771 Jura. Herder hält sich von September 1770 bis April 1771 wegen einer Augenbehandlung in der Stadt auf. Ihre Gespräche öffnen einen Blick auf Homer, Shakespeare, Volkslied und geschichtlich gewachsene Sprache. Natur und Dichtung werden an ihren konkreten Erscheinungen befragt.</p></article><article><h3>Salzmanns Kreis</h3><p>Der Jurist Johann Daniel Salzmann verbindet gelehrte Geselligkeit mit dem Alltag einer Tischgesellschaft. Zu seinem Umfeld gehören Goethe, Jung-Stilling, Lenz und Heinrich Leopold Wagner. Salzmann fördert die jungen Autoren, ohne ihre Begeisterung immer zu teilen. Lenz kommt 1771 nach Strassburg und entwickelt hier eine eigene dramatische Position.</p></article><article><h3>Empfindsamkeit und ihre Netze</h3><p>Gefühl, Freundschaft, religiöse Selbstprüfung und die Aufmerksamkeit für ein einzelnes Leben verbinden die Gesprächskultur mit empfindsamen Schreibweisen. Briefe, Erinnerungen und Gespräche sind dabei wichtige Formen. Die Verbindung reicht nach Darmstadt zum Kreis um Johann Heinrich Merck und nach Zürich zu Lavater. Empfindsamkeit, Aufklärung und Sturm und Drang überlagern sich; eine Stadt hat nicht nur eine Epoche.</p></article><article><h3>Schiller: die spätere Konstellation</h3><p>Schiller ist 1770/1771 noch Schüler in Ludwigsburg und kein Mitglied dieses Strassburger Kreises. Für seinen Sturm und Drang sind Stuttgart und Mannheim entscheidend: <em>Die Räuber</em>, das Theater und die Flucht von 1782. Seine Einbindung erfolgt auf der Karte über diese belegten Stationen.</p></article></div><div class="inset"><h3>Von der Gefühlskultur zu Büchner und Celan</h3><p>Büchner kommt rund sechzig Jahre später in ein anderes Strassburg: 1831 als Medizinstudent, 1835 als politisch Verfolgter. Sein <em>Lenz</em> richtet die Aufmerksamkeit auf eine einzelne Existenz, ihre Wahrnehmungen und sozialen Bedingungen. Celan greift diese Aufmerksamkeit nach der Shoah auf. Die Verbindung ist eine Arbeit an Texten und historischen Differenzen, keine unveränderte Tradition des „Gefühls“.</p><p><a href="#leseraum/lenz">Das Kunstgespräch in Lenz lesen</a> · <a href="#leseraum/meridian">Celans Frage nach der Kreatur verfolgen</a></p></div><div class="journey-cards">${['goethe','lenz','buechner','schiller'].map(id=>{const j=journeys.find(j=>j.id===id);return `<a href="#wege/${id}" style="--journey-color:${j.color}"><span>${j.period}</span><strong>${j.short}</strong><small>Orte, Gründe und Textbezüge</small></a>`;}).join('')}</div>${source([journeySources.goethe,'LMU: Goethes biografische Stationen'],[journeySources.herder,'LMU: Goethe und Herder'],[journeySources.salzmann,'Elsässisches biografisches Lexikon: Salzmann'],[journeySources.empfindsamkeit,'LMU: Darmstädter Empfindsamkeit'],[journeySources.lavater,'LMU: Goethe und Lavater'],[journeySources.schiller,'Schillerverein: Biografie'])}<p class="source">J.-J. Oberlin im Strassburger Universitätsumfeld ist nicht mit seinem Bruder Johann Friedrich Oberlin, dem Pfarrer in Waldersbach, zu verwechseln.</p></section>`;}
