import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('../content.js',import.meta.url),'utf8')+'\n'+fs.readFileSync(new URL('../atlas.js',import.meta.url),'utf8')+'\nthis.atlas={atlasPlaces,googleMapURL,globeProjection,globeSVG,pages,placeMaterials,placePage,placeDestination,geographicHome};',ctx);
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
