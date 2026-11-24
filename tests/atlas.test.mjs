import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('../content.js',import.meta.url),'utf8')+'\n'+fs.readFileSync(new URL('../atlas.js',import.meta.url),'utf8')+'\n'+fs.readFileSync(new URL('../journeys.js',import.meta.url),'utf8')+'\nthis.atlas={meridianGuide,stationThreads,learningStations,readerWeave,atlasPlaces,googleMapURL,globeProjection,globeSVG,pages,placeMaterials,placePage,placeDestination,geographicHome,meridianOrigins,celanMeridianLongitude,meridianExplainer};',ctx);
const a=ctx.atlas;
test('the home embeds one shared map and preserves access to all seven locations',()=>{
 const html=a.geographicHome(),url=new URL(a.googleMapURL());
 assert.equal(url.hostname,'www.google.com');assert.equal(url.pathname,'/maps/d/embed');assert.equal(url.searchParams.get('mid'),'1_ronZMZXcEvYeXI4hbIlfaCIQfCxtY8');
 assert.equal((html.match(/<iframe /g)||[]).length,1);assert.ok(!html.includes('data-place='));assert.equal(a.atlasPlaces.length,7);
 for(const place of a.atlasPlaces){assert.ok(html.includes('href="#ort/'+place.id+'"'));assert.ok(a.pages[place.section]);}
});
test('all meridians meet at exactly the same north and south poles',()=>{
 for(const lat of [-90,90]){const pole=a.globeProjection(lat,0);for(const lon of [-180,-90,10,90,180]){const p=a.globeProjection(lat,lon);assert.ok(Math.abs(p.x-pole.x)<1e-9);assert.ok(Math.abs(p.y-pole.y)<1e-9);}}
});
test('globe works at longitude limits and distinguishes the complete great circle',()=>{
 for(const lon of [-180,0,180])for(const mode of [0,1,2]){const svg=a.globeSVG(lon,mode);assert.ok(!/NaN|undefined|Infinity/.test(svg));assert.equal(svg.includes('class="globe-antimeridian '),mode>0);assert.equal(svg.includes('class="globe-grid '),mode===2);assert.ok(svg.includes('Nordpol')&&svg.includes('Südpol'));}
});

test('every marker opens an existing page containing an image, readings and a journal task',()=>{
 for(const p of a.atlasPlaces){const h=a.placePage(p.id);assert.ok(h.includes('<img '));assert.ok(h.includes('Texte & Materialien'));assert.ok(h.includes('data-field='));assert.equal(a.placeDestination(p.id),'https://patrickfischerksa.github.io/lenz-celan-lernlandschaft/#ort/'+p.id);assert.ok(a.placeMaterials[p.id].texts.length>=2);assert.ok(p.lat>-90&&p.lat<90&&p.lng>-180&&p.lng<180);}
});

test('Celan reference connects the three distinct origins near 26 E and starts with the full circle',()=>{
 assert.equal(a.celanMeridianLongitude,26);assert.equal(a.meridianOrigins.length,3);
 for(const p of a.meridianOrigins)assert.ok(Math.abs(p.longitude-26)<0.5);
 assert.equal(new Set(a.meridianOrigins.map(p=>p.longitude)).size,3);
 const html=a.meridianExplainer();assert.ok(html.includes('value="26"'));assert.ok(html.includes('26° Ost'));assert.ok(html.includes('class="globe-antimeridian '));assert.ok(html.includes('class="globe-tropic '));assert.ok(html.includes('data-celan-meridian'));
 const kml=fs.readFileSync(new URL('../materialien/karten/celan-meridian-26-ost.kml',import.meta.url),'utf8');
 const line=kml.match(/<LineString>[\s\S]*?<coordinates>([^<]+)<\/coordinates>/)[1].trim().split(/\s+/).map(c=>c.split(',').map(Number));
 assert.ok(line.every(([lon])=>lon===26));assert.ok(line[0][1]<48&&line.at(-1)[1]>57);
 assert.ok(kml.includes('kein genauer Geburtsstandort'));assert.ok(kml.includes('nicht das Forsthaus'));
});


test('learning paths connect existing stations, places and readers in both directions',()=>{
 const home=a.learningStations();assert.equal((home.match(/class="route-stop"/g)||[]).length,10);
 for(const [station,thread] of Object.entries(a.stationThreads)){
  assert.ok(a.pages[station]||station==='wege',station);
  assert.ok(thread.transfer.length>80);
  for(const [href] of thread.links){
   const [page,id]=href.slice(1).split('/');
   if(page==='ort')assert.ok(a.atlasPlaces.some(p=>p.id===id),href);
   else if(page==='leseraum')assert.ok(['lenz','gespraech','meridian'].includes(id||'lenz'),href);
   else if(page!=='wege')assert.ok(a.pages[page],href);
  }
 }
 for(const id of ['lenz','gespraech','meridian'])assert.ok(a.readerWeave(id).includes('href="#'+id+'"'));
});


test('meridian explanations are linked from the map and stay on their own topic pages',()=>{
 const home=a.geographicHome();
 assert.ok(!home.includes('id="meridian-globe"'));
 assert.ok(!home.includes('class="celan-map-reading"'));
 for(const topic of ['geografie','celan','vergleich']){
  assert.ok(home.includes('href="#meridianbild/'+topic+'"'));
  const page=a.meridianGuide(topic);
  assert.ok(page.includes('href="#auftakt/karte"'));
  assert.ok(page.includes('href="#meridianbild/'+topic+'" aria-current="page"'));
  assert.equal(page.includes('id="meridian-globe"'),topic==='geografie');
  assert.equal(page.includes('class="celan-map-reading"'),topic==='celan');
 }
 assert.ok(a.meridianGuide('celan').includes('href="#leseraum/meridian/herkunft"'));
 assert.ok(a.meridianGuide('vergleich').includes('kein zweiter von Celan benannter Meridian'));
});
