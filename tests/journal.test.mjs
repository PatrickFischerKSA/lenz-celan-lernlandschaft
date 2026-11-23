import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const src=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const validation=src.slice(src.indexOf('function validState'),src.indexOf('\ntry{'));
const fields=Object.fromEntries(['frage','lenz','essay','haus','gebirge'].map(x=>[x,[]]));
const ctx=vm.createContext({fields});vm.runInContext(validation+';this.validate=validState;',ctx);
const good=()=>({schema:1,app:'durchs-gebirg',fields:{frage:'Wie sucht die Dichtung ein Du?'},checks:{'1':true}});
test('accepts compatible journal and preserves arbitrary answer text',()=>{assert.equal(ctx.validate(good()),true);const x=good();x.fields.essay='<script>alert(1)</script>';assert.equal(ctx.validate(x),true);});
test('rejects wrong schemas, unknown keys, malformed answers and checks',()=>{for(const x of [null,{}, {...good(),schema:2},{...good(),app:'other'},{...good(),fields:[]},{...good(),fields:{unknown:'x'}},{...good(),fields:{frage:7}},{...good(),checks:{'1':'true'}},{...good(),checks:{'6':true}},{...good(),fields:{frage:'a'.repeat(100001)}}])assert.equal(ctx.validate(x),false);});
test('rejects special property keys used for prototype pollution',()=>{assert.equal(ctx.validate(JSON.parse('{"schema":1,"app":"durchs-gebirg","fields":{"__proto__":"x"},"checks":{}}')),false);});

test('accepts previous backups and new place notes in the same schema',()=>{assert.equal(ctx.validate(good()),true);const x=good();x.fields.haus='Bildbefund, Kontext, Textbezug';x.fields.gebirge='Oberlin – Nietzsche – Celan';assert.equal(ctx.validate(x),true);});
