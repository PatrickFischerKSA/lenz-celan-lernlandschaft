import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('content.js',root),'utf8')+'\n'+fs.readFileSync(new URL('atlas.js',root),'utf8')+'\nthis.mapData={atlasPlaces,placeMaterials,placeDestination};',ctx);
const {atlasPlaces,placeMaterials,placeDestination}=ctx.mapData;
const esc=s=>String(s).replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
const fullURL=u=>u.startsWith('#')?'https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/'+u:u;
const description=p=>{const m=placeMaterials[p.id];return `<h2>${esc(p.name)}</h2><p>${esc(p.time)}</p><p>${esc(p.headline)}</p><p>${esc(p.text)}</p><p><b><a href="${placeDestination(p.id)}">Texte, Bilder und Aufgaben öffnen</a></b></p><h3>Texte und Materialien</h3><ul>${m.texts.map(([u,t])=>`<li><a href="${esc(fullURL(u))}">${esc(t)}</a></li>`).join('')}</ul><p><a href="${esc(fullURL('#'+p.section))}">Ausführliche Lernstation</a></p>`;};
const kml=`<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"><Document>
<name>Durchs Gebirg · Büchner und Celan</name>
<description>Sieben Orte: Texte, Bilder und Aufgaben. Die Markierungen zeigen Ortslagen und keine gemeinsame historische Reiseroute.</description>
<Style id="learning-place"><IconStyle><color>ff9a7332</color><scale>1.1</scale><Icon><href>https://maps.google.com/mapfiles/kml/paddle/blu-circle.png</href></Icon></IconStyle><LabelStyle><color>ff263b42</color><scale>1.0</scale></LabelStyle></Style>
${atlasPlaces.map(p=>`<Placemark id="${p.id}"><name>${esc(p.name)}</name><description><![CDATA[${description(p)}]]></description><styleUrl>#learning-place</styleUrl><ExtendedData><Data name="Lernstation"><value>${placeDestination(p.id)}</value></Data><Data name="Zeitraum"><value>${esc(p.time)}</value></Data><Data name="Koordinatenquelle"><value>${p.coordinateSource}</value></Data></ExtendedData><Point><coordinates>${p.lng},${p.lat},0</coordinates></Point></Placemark>`).join('\n')}
</Document></kml>\n`;
fs.writeFileSync(new URL('materialien/karten/buechner-celan-orte.kml',root),kml);
const geojson={type:'FeatureCollection',features:atlasPlaces.map(p=>({type:'Feature',geometry:{type:'Point',coordinates:[p.lng,p.lat]},properties:{id:p.id,name:p.name,region:p.region,period:p.time,destination:placeDestination(p.id),coordinateSource:p.coordinateSource}}))};
fs.writeFileSync(new URL('materialien/karten/buechner-celan-orte.geojson',root),JSON.stringify(geojson,null,2)+'\n');
console.log(`Built ${atlasPlaces.length} named markers with material links.`);
