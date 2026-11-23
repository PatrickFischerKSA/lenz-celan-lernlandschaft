import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx=vm.createContext({});
vm.runInContext(['content.js','atlas.js','journeys.js'].map(f=>fs.readFileSync(new URL('../'+f,import.meta.url),'utf8')).join('\n')+'\nthis.model={journeys,journeyPlaces,journeyPage,strasbourgEssay,fields,placePage,geographicHome};',ctx);
const m=ctx.model;
test('dated journeys have valid coordinates, sources, readings and compatible journal fields',()=>{
 assert.equal(m.journeys.length,6);
 for(const j of m.journeys){assert.ok(j.stops.length>=4);assert.ok(Object.hasOwn(m.fields,j.field));assert.ok(j.sources.length);const html=m.journeyPage(j.id);assert.ok(html.includes('data-field='));assert.ok(html.includes(j.name));assert.ok(html.includes(j.reading));for(const path of j.paths){assert.ok(path.length>=2);for(const id of path){const p=m.journeyPlaces[id];assert.ok(p&&p.lat>=-90&&p.lat<=90&&p.lng>=-180&&p.lng<=180);}}}
});
test('Strasbourg distinguishes the 1770s circle, Schiller and Buechner’s exile',()=>{
 const html=m.placePage('strassburg');for(const s of ['Salzmann','Herder','Schiller','Ludwigsburg','Empfindsamkeit','1835'])assert.ok(html.includes(s));assert.ok(html.includes('kein Mitglied dieses Strassburger Kreises'));assert.ok(m.geographicHome().includes('#wege/adorno'));
});
test('map import links every route and clearly distinguishes the Engadin relationship',()=>{
 const data=JSON.parse(fs.readFileSync(new URL('../materialien/karten/reisen-und-migration.json',import.meta.url),'utf8'));
 assert.equal(data.rows[0][3],'WKT');assert.equal(data.features.length,22);
 for(const j of m.journeys)assert.ok(data.features.some(f=>f.Person===j.short&&f.Material.endsWith('#wege/'+j.id)&&/LINESTRING/.test(f.WKT)));
 const engadin=data.features.find(f=>f.Person==='Bezug 1959');assert.ok(engadin.Beschreibung.includes('keine gemeinsame Reise'));assert.ok(!engadin.Beschreibung.includes('Treffen fand'));
 assert.ok(data.features.find(f=>f.Name.startsWith('Frankfurt')).Beschreibung.includes('verschiedenen historischen Konstellationen'));
});
