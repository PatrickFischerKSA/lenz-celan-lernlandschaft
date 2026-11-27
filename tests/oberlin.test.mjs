import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const app=read('app.js'),escape=app.slice(app.indexOf('function escapeHTML'),app.indexOf('\nfunction validState'));
const ctx=vm.createContext({});
vm.runInContext(read('content.js')+'\n'+escape+'\n'+read('oberlin.js')+'\nthis.o={oberlinObjects,oberlinThemes,oberlinCollections,oberlinObjectPanel,oberlinVisible,pages,fields};',ctx);
const o=ctx.o,inventory=JSON.parse(read('materialien/oberlin-sammlung.json'));
test('the museum explorer preserves all 25 verified object pages and 26 images',()=>{
 assert.deepEqual(JSON.parse(JSON.stringify(o.oberlinObjects)),inventory.objects);
 assert.equal(o.oberlinObjects.length,25);assert.equal(o.oberlinObjects.flatMap(x=>Array.from(x.images)).length,26);
 assert.equal(new Set(o.oberlinObjects.map(x=>x.id)).size,25);assert.equal(new Set(o.oberlinObjects.map(x=>x.source)).size,25);
 for(const obj of o.oberlinObjects){assert.ok(obj.source.startsWith(inventory.source));assert.ok(obj.date&&obj.question&&obj.credit);assert.ok(o.oberlinThemes.some(t=>t.id===obj.group));for(const url of obj.images)assert.ok(url.startsWith('https://musee-oberlin.org/wp-content/uploads/'));}
});
test('each theme remains browsable and notes share the existing journal schema',()=>{
 for(const theme of o.oberlinThemes){vm.runInContext(`oberlinGroup=${JSON.stringify(theme.id)}`,ctx);const list=o.oberlinVisible();assert.ok(list.length);assert.ok(list.every(x=>x.group===theme.id));}
 const html=o.oberlinCollections();assert.ok(html.includes('1778'));assert.ok(html.includes('Sie zeigen Oberlins spätere Arbeit'));
 assert.ok(html.includes('data-field="oberlinobjekte"'));assert.ok(o.pages.journal().includes('data-field="oberlinobjekte"'));
 vm.runInContext(app.slice(app.indexOf('function validState'),app.indexOf('\ntry{'))+';this.validate=validState;',ctx);
 assert.equal(ctx.validate({schema:1,app:'durchs-gebirg',fields:{frage:'Eine vorhandene Frage',oberlinobjekte:'Eine neue Beobachtung'},checks:{'0':true}}),true);
});
