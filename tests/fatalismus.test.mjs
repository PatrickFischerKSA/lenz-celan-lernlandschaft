import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const app=read('app.js');
const ctx=vm.createContext({});
const escape=app.slice(app.indexOf('function escapeHTML'),app.indexOf('\nfunction validState'));
vm.runInContext(read('content.js')+'\n'+escape+'\n'+read('fatalismus.js')+'\nthis.f={fatalBrief,fatalFocus,fatalComparisons,fatalTransfers,fatalOriginal,fatalismusPage,fatalProgress,fields,pages};',ctx);
const f=ctx.f;
test('changing analysis focus only marks words and preserves the complete original passage',()=>{
 const original=Array.from(f.fatalBrief).join('');
 for(const focus of f.fatalFocus){
  vm.runInContext(`fatalSelectedFocus=${JSON.stringify(focus.id)}`,ctx);
  const html=f.fatalOriginal();
  const plain=html.replace(/<span class="fatal-line">B\d<\/span>/g,'').replace(/<[^>]+>/g,'');
  assert.equal(plain,original);
  assert.ok(html.includes('<mark>'));
 }
});
test('comparison quotations occur in the brief and in the existing permitted Celan reading',()=>{
 const brief=Array.from(f.fatalBrief).join(' ');
 const celan=JSON.parse(read('materialien/hoertext-sync.json')).recordings.gespraech.text.join(' ');
 for(const c of f.fatalComparisons){assert.ok(brief.includes(c.brief),c.id);assert.ok(celan.includes(c.celan),c.id);}
});
test('new journal fields remain compatible with saved work and progress requires actual notes',()=>{
 const validation=app.slice(app.indexOf('function validState'),app.indexOf('\ntry{'));
 vm.runInContext(validation+';this.validate=validState;',ctx);
 const fields={frage:'Vorhandene Frage',fatalanalyse:'Ein Befund',fatalvergleich:'Teilweise tragfähige Hypothese',fataltransfer1:'Antwort 1',fataltransfer2:'Antwort 2'};
 const saved={schema:1,app:'durchs-gebirg',fields,checks:{'1':true}};
 assert.equal(ctx.validate(saved),true);
 assert.deepEqual(Array.from(f.fatalProgress(fields)),[true,true,false]);
 fields.fataltransfer3='  ';assert.equal(f.fatalProgress(fields)[2],false);
 fields.fataltransfer3='Antwort 3';assert.equal(f.fatalProgress(fields)[2],true);
 for(const key of Object.keys(fields).filter(k=>k.startsWith('fatal')))assert.ok(f.pages.journal().includes(`data-field="${key}"`));
 assert.equal(ctx.validate({...saved,fields:{...fields,unknownFatalField:'x'}}),false);
});
test('every new Meridian deep link resolves to a real paragraph in the unchanged text',()=>{
 const anchors=vm.runInNewContext('('+app.match(/const meridianEntry=(\{[^;]+?\})\[location/)[1]+')');
 const text=JSON.parse(read('materialien/texte.json')).meridian;
 for(const section of ['brief','vergleich','transfer']){
  const html=f.fatalismusPage(section);
  for(const [,key] of html.matchAll(/href="#leseraum\/meridian\/([a-z]+)"/g)){
   assert.ok(anchors[key],key);assert.ok(text.some(p=>p.includes(anchors[key])),key);
  }
 }
 assert.equal((f.fatalismusPage('transfer').match(/Eine mögliche Antwort lesen/g)||[]).length,3);
});
