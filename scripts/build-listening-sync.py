"""Align the supplied recordings to the reading texts; ASR intermediates stay local.
Usage: python3 scripts/build-listening-sync.py /private/tmp/celan-audio-alignment
"""
import bisect,difflib,hashlib,json,re,sys,unicodedata
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
WORK=Path(sys.argv[1])
WORD=re.compile(r"\w+(?:['’\-]\w+)*",re.UNICODE)
def norm(s):
 s=s.casefold().replace('ß','ss').replace('æ','ae')
 s=''.join(c for c in unicodedata.normalize('NFKD',s) if not unicodedata.combining(c))
 return ''.join(c for c in s if c.isalnum())
canon=json.loads((ROOT/'materialien/texte.json').read_text())
celan=[p.strip() for p in (ROOT/'research/gespraech-mitlesefassung.txt').read_text().split('\n\n') if p.strip()]
landmarks={
'lenz': [('Aufbruch','Den 20.'),('Einsamkeit und Angst','entsetzlich einsam'),('Bei Oberlin','Oberlin'),('Kunstgespräch','Über Tisch'),('Leben des Geringsten','Leben des Geringsten'),('Medusenhaupt','Medusenhaupt'),('Das tote Kind','Das Kind kam ihm'),('Schluss','So lebte er hin')],
'gespraech':[('Aufbruch','Eines Abends'),('Die zweite Figur','sein Vetter'),('Jude und Natur','die Natur, das ist zweierlei'),('Bild und Schleier','ein beweglicher Schleier'),('Wortlücke','eine Wortlücke'),('Sprache ohne Ich und Du','ohne ich und ohne du'),('Ich und Gedächtnis','ich mit dem Gedächtnis'),('Die Kerze','ich liebte die Kerze'),('Schlussbewegung','ich auf dem Weg')]
}
result={'schema':1,'precisionNote':'Zeitliche Orientierung an den bereitgestellten Aufnahmen; kleinere Fassungsabweichungen und Abweichungen im Sekundenbereich sind möglich.','recordings':{}}
audit={}
for key,paras,duration,limit,prefix in [('lenz',canon['lenz'],4200.071837,3753.0,'L'),('gespraech',celan,693.580045,689.0,'G')]:
 raw=json.loads((WORK/(key+'-small.json')).read_text())['transcription']
 heard=[]
 for seg in raw:
  if seg['offsets']['from']/1000>=limit:continue
  for w in WORD.finditer(seg['text']):
   n=norm(w.group())
   if n:heard.append({'word':n,'start':seg['offsets']['from']/1000,'end':seg['offsets']['to']/1000,'text':w.group()})
 reference=[]
 for pi,p in enumerate(paras):
  reference.extend({'word':norm(m.group()),'p':pi,'from':m.start(),'to':m.end(),'text':m.group()} for m in WORD.finditer(p))
 matcher=difflib.SequenceMatcher(None,[w['word'] for w in reference],[w['word'] for w in heard],autojunk=False)
 matches={}
 for block in matcher.get_matching_blocks():
  for n in range(block.size):matches[block.a+n]=block.b+n
 anchors=sorted(matches)
 def at(i):
  if i in matches:return heard[matches[i]]['start']
  pos=bisect.bisect_left(anchors,i)
  if not pos:return heard[matches[anchors[0]]]['start']
  if pos==len(anchors):return min(limit,heard[matches[anchors[-1]]]['end'])
  lo,hi=anchors[pos-1],anchors[pos]
  return heard[matches[lo]]['start']+(heard[matches[hi]]['start']-heard[matches[lo]]['start'])*(i-lo)/(hi-lo)
 cues=[];global_i=0
 for pi,p in enumerate(paras):
  words=[i for i,w in enumerate(reference) if w['p']==pi]
  for a in range(0,len(words),36):
   ids=words[a:a+36];first,last=ids[0],ids[-1]
   start=0 if a==0 else reference[first]['from']
   stop=len(p) if a+36>=len(words) else reference[words[a+36]]['from']
   cues.append({'start':round(at(first),2),'end':0,'paragraph':pi,'from':start,'to':stop,'match':round(sum(i in matches for i in ids)/len(ids),3)})
 for i,c in enumerate(cues):
  c['end']=round(cues[i+1]['start'] if i+1<len(cues) else limit,2)
  if c['end']<=c['start']:c['end']=round(c['start']+.1,2)
 marks=[]
 for title,needle in landmarks[key]:
  hits=[(pi,p.casefold().find(needle.casefold())) for pi,p in enumerate(paras) if needle.casefold() in p.casefold()]
  if not hits:raise ValueError((key,title,needle))
  pi,offset=hits[0];wi=next(i for i,w in enumerate(reference) if w['p']==pi and w['to']>offset)
  cue=next(i for i,c in enumerate(cues) if c['paragraph']==pi and c['from']<=offset<c['to'])
  t=round(at(wi),2);near=matches.get(wi)
  if near is None:near=matches[min(anchors,key=lambda x:abs(x-wi))]
  marks.append({'label':title,'needle':needle,'time':t,'cue':cue,'paragraph':pi})
  print(key,title,f'{int(t)//60:02}:{int(t)%60:02}', ' | ', ' '.join(w['text'] for w in heard[max(0,near-4):near+13]))
 # Long gaps need review: often spelling / spoken-vs-print variants, never silently hide them.
 gaps=[];gap=[]
 for i in range(len(reference)):
  if i not in matches:gap.append(i)
  else:
   if len(gap)>20:gaps.append(gap)
   gap=[]
 if len(gap)>20:gaps.append(gap)
 audit[key]={'referenceWords':len(reference),'recognizedWordsWithinText':len(heard),'exactNormalizedWordMatches':len(matches),'coverage':round(len(matches)/len(reference),4),'minimumCueCoverage':min(c['match'] for c in cues),'longUnmatchedRuns':[{'words':len(g),'text':' '.join(reference[x]['text'] for x in g),'time':round(at(g[0]),2)} for g in gaps]}
 result['recordings'][key]={'duration':duration,'contentStart':cues[0]['start'],'contentEnd':limit,'prefix':prefix,'paragraphs':len(paras),'cues':cues,'landmarks':marks,'editionNote':('Die Lesung nennt „20. Jänner“, der Gutenberg-Text nur „Den 20.“; weitere kleinere Fassungsabweichungen sind möglich. Nach dem Erzählungsende folgen Nachspann und weiteres Material; die Textzuordnung endet bei 1:02:33.' if key=='lenz' else 'Mitlesefassung aus der bereitgestellten Lesung, redaktionell in Hörabschnitte gegliedert. Zeichensetzung und Schreibweisen sind keine textkritische Edition; für wissenschaftliche Zitate eine Druckausgabe heranziehen.')}
 if key=='gespraech':result['recordings'][key]['text']=paras
(ROOT/'materialien/hoertext-sync.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
(ROOT/'research/hoertext-abgleich.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(audit,ensure_ascii=False,indent=2))
