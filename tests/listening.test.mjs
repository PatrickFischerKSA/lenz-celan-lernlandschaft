import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const sync=JSON.parse(fs.readFileSync(new URL('../materialien/hoertext-sync.json',import.meta.url),'utf8'));
const texts=JSON.parse(fs.readFileSync(new URL('../materialien/texte.json',import.meta.url),'utf8'));
const context=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../listening.js',import.meta.url),'utf8')+';this.find=listeningCueAt;',context);
test('listening intervals follow the timeline and cover each reading paragraph exactly once',()=>{
 for(const [id,d] of Object.entries(sync.recordings)){
  const paragraphs=id==='lenz'?texts.lenz:d.text;assert.equal(paragraphs.length,d.paragraphs);
  assert.ok(d.contentEnd<d.duration);assert.ok(d.contentStart>=0);
  let previous=-1;
  for(const c of d.cues){assert.ok(c.start>=previous);assert.ok(c.end>c.start&&c.end<=d.contentEnd+.11);assert.ok(c.match>=.5);previous=c.start;}
  paragraphs.forEach((p,pi)=>{const cues=d.cues.filter(c=>c.paragraph===pi);let offset=0;for(const c of cues){assert.equal(c.from,offset);assert.ok(c.to>c.from);offset=c.to;}assert.equal(offset,p.length);});
 }
});
test('important passage buttons target the actual phrase within the associated cue',()=>{
 for(const [id,d]of Object.entries(sync.recordings)){
  const paragraphs=id==='lenz'?texts.lenz:d.text;
  assert.ok(d.landmarks.length>=8);
  for(const mark of d.landmarks){const cue=d.cues[mark.cue],p=paragraphs[mark.paragraph],at=p.toLowerCase().indexOf(mark.needle.toLowerCase());assert.ok(at>=cue.from&&at<cue.to);assert.equal(cue.paragraph,mark.paragraph);assert.ok(mark.time>=cue.start&&mark.time<cue.end);}
 }
});
test('timeline lookup handles opening announcements, exact boundaries, seeking backwards and the afterword',()=>{
 const d=sync.recordings.lenz;
 assert.equal(context.find(d.cues,0,d.contentEnd),-1);
 for(const i of [d.cues.length-1,10,0,50,2]){assert.equal(context.find(d.cues,d.cues[i].start,d.contentEnd),i);}
 assert.equal(context.find(d.cues,d.contentEnd,d.contentEnd),-1);
 assert.equal(context.find(d.cues,d.duration-1,d.contentEnd),-1);
 assert.equal(context.find(d.cues,NaN,d.contentEnd),-1);
});
