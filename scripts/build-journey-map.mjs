import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),ctx=vm.createContext({});
vm.runInContext(['content.js','atlas.js','journeys.js'].map(f=>fs.readFileSync(new URL(f,root),'utf8')).join('\n')+'\nthis.data={journeys,journeyPlaces,journeySources,atlasPlaces};',ctx);
const {journeys,journeyPlaces,journeySources,atlasPlaces}=ctx.data;
const toCoord=id=>{const p=journeyPlaces[id];if(!p)throw Error('Missing place '+id);return `${p.lng} ${p.lat}`;};
const features=[];
for(const j of journeys){
 const parts=j.paths.map(path=>path.map(toCoord).join(', '));
 const wkt=parts.length===1?'LINESTRING ('+parts[0]+')':'MULTILINESTRING ('+parts.map(p=>'('+p+')').join(', ')+')';
 features.push({Name:j.short+' · '+j.period,Person:j.short,Beschreibung:j.kind+'. '+j.stops.map(([id,date,why])=>date+': '+journeyPlaces[id].name+' – '+why).join('; ')+'. Schematische Verbindung ausgewählter Stationen; keine rekonstruierte Reiseroute.',WKT:wkt,Material:'https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/#wege/'+j.id,Quelle:j.sources.map(k=>journeySources[k]).join(' ')});
}
const existing=new Set([...atlasPlaces.map(p=>p.id),'cesvaine','sils']);
const owners={frankfurt:'adorno'};
for(const j of journeys)for(const path of j.paths)for(const id of path){
 if(existing.has(id))continue;
 if(owners[id]&&owners[id]!==j.id)continue;
 existing.add(id);const p=journeyPlaces[id];const stop=j.stops.find(s=>s[0]===id);
 features.push({Name:id==='frankfurt'?'Frankfurt · Goethe / Schiller / Adorno':p.name+' · '+j.short,Person:j.short,Beschreibung:(stop?stop[1]+': '+stop[2]+'. ':'')+(id==='frankfurt'?'Goethes Strassburger Studienreise 1770, Schillers Fluchtstation 1782 und Adornos Exil ab 1934 gehören zu verschiedenen historischen Konstellationen. ':'')+'Gerundete Ortslage, kein Nachweis einer Wohnung oder eines Reisewegs.',WKT:'POINT ('+toCoord(id)+')',Material:'https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/#wege/'+j.id,Quelle:j.sources.map(k=>journeySources[k]).join(' ')});
}
features.push({Name:'Engadin 1959 · Celan / Adorno',Person:'Bezug 1959',Beschreibung:'Literarische Beziehung, keine gemeinsame Reise: Celan erinnert im Meridian an eine versäumte Begegnung im Engadin. Paris und Frankfurt bezeichnen ihre Lebens- und Arbeitsorte; Sils Maria steht für den regionalen Bezugsraum, nicht für einen belegten Treffpunkt.',WKT:'MULTILINESTRING (('+['paris','sils'].map(toCoord).join(', ')+'), ('+['frankfurt','sils'].map(toCoord).join(', ')+'))',Material:'https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/#gespraech',Quelle:'https://www.studienbibliothek.org/veranst/Celan-Adorno.pdf'});
const cols=['Name','Person','Beschreibung','WKT','Material','Quelle'];
const rows=[cols,...features.map(f=>cols.map(c=>f[c]))];
fs.writeFileSync(new URL('materialien/karten/reisen-und-migration.json',root),JSON.stringify({notice:'Schematische Stationsverbindungen, keine rekonstruierten Reisewege.',features,rows},null,2)+'\n');
fs.writeFileSync(new URL('materialien/karten/reisen-und-migration.tsv',root),rows.map(r=>r.map(v=>v.replace(/[\t\r\n]/g,' ')).join('\t')).join('\n')+'\n');
console.log(features.length+' Kartenobjekte, '+journeys.length+' Lebenswege');
