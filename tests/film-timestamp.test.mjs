import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const src=fs.readFileSync(new URL('../app.js',import.meta.url),'utf8');
const stampSource=src.slice(src.indexOf('function stamp('),src.indexOf('\n',src.indexOf('function stamp(')));
test('film timestamps stay in the corresponding journal, including Buechner',()=>{
 const state={fields:{film1:'Celan',film2:'Antschel',filmbuechner:'Büchner'}};
 const areas=Object.fromEntries(Object.keys(state.fields).map(k=>[k,{value:'',focus(){}}]));
 const ctx=vm.createContext({state,document:{getElementById:()=>({currentTime:125.8})},main:{querySelector:s=>areas[s.match(/"([^"]+)"/)[1]]},save(){},announce(){}});
 vm.runInContext(stampSource+';this.stamp=stamp;',ctx);
 ctx.stamp('buechner');assert.equal(state.fields.filmbuechner,'Büchner\n[02:05] ');assert.equal(state.fields.film1,'Celan');assert.equal(state.fields.film2,'Antschel');
 ctx.stamp('portrait');ctx.stamp('antschel');assert.equal(state.fields.film1,'Celan\n[02:05] ');assert.equal(state.fields.film2,'Antschel\n[02:05] ');
});
