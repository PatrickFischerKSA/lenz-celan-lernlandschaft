from pathlib import Path
from bs4 import BeautifulSoup
import json
root=Path(__file__).resolve().parents[1]
s=BeautifulSoup(Path('/private/tmp/lenz.html').read_text(),'html.parser')
a=s.select_one('.book-reader__chapter-content-wrapper')
ps=[p.get_text(' ',strip=True) for p in a.find_all('p') if p.get_text(strip=True)]
assert ps[0].startswith('Den 20.') and 'So lebte er hin' in ps[-1]
m=[p for p in (root/'research/meridian-extraktion.txt').read_text().splitlines() if p.strip()]
if m[0]=='Dankrede':m=m[1:]
(root/'materialien/texte.json').write_text(json.dumps({'lenz':ps,'meridian':m},ensure_ascii=False))
print('Lenz:',len(ps),'Absätze; Meridian:',len(m),'Absätze')
