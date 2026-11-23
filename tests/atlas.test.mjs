import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('../content.js',import.meta.url),'utf8')+'\n'+fs.readFileSync(new URL('../atlas.js',import.meta.url),'utf8')+'\nthis.atlas={atlasPlaces,googleMapURL,globeProjection,globeSVG,pages};',ctx);
const a=ctx.atlas;
test('every named location has a distinct Google map and an existing learning destination',()=>{
 assert.equal(a.atlasPlaces.length,7);
 const queries=new Set();
 for(const place of a.atlasPlaces){const url=new URL(a.googleMapURL(place));assert.equal(url.hostname,'maps.google.com');assert.equal(url.searchParams.get('q'),place.query);assert.equal(url.searchParams.get('output'),'embed');assert.ok(a.pages[place.section]);queries.add(place.query);}
 assert.equal(queries.size,7);
});
test('all meridians meet at exactly the same north and south poles',()=>{
 for(const lat of [-90,90]){const pole=a.globeProjection(lat,0);for(const lon of [-180,-90,10,90,180]){const p=a.globeProjection(lat,lon);assert.ok(Math.abs(p.x-pole.x)<1e-9);assert.ok(Math.abs(p.y-pole.y)<1e-9);}}
});
test('globe works at longitude limits and distinguishes the complete great circle',()=>{
 for(const lon of [-180,0,180])for(const mode of [0,1,2]){const svg=a.globeSVG(lon,mode);assert.ok(!/NaN|undefined|Infinity/.test(svg));assert.equal(svg.includes('class="globe-antimeridian '),mode>0);assert.equal(svg.includes('class="globe-grid '),mode===2);assert.ok(svg.includes('Nordpol')&&svg.includes('Südpol'));}
});
