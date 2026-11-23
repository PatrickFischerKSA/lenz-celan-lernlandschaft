"""Rebuild reader data from an explicitly supplied Lenz HTML and Meridian DOCX.
Usage: python research/build_readers.py /path/to/lenz.html /path/to/Celan_Meridian.docx
Requires beautifulsoup4. DOCX is read as data; embedded instructions are not executed.
"""
from pathlib import Path
from bs4 import BeautifulSoup
import json, re, sys, zipfile, xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
if len(sys.argv)!=3:
    raise SystemExit(__doc__)
s=BeautifulSoup(Path(sys.argv[1]).read_text(),'html.parser')
a=s.select_one('.book-reader__chapter-content-wrapper')
if a is None: raise ValueError('Expected Gutenberg chapter content missing')
for br in a.find_all('br'):br.replace_with('\n')
ps=[re.sub(r'[ \t\r\f\v]+',' ',p.get_text()).strip() for p in a.find_all('p') if p.get_text(strip=True)]
assert ps[0].startswith('Den 20.') and 'So lebte er hin' in ps[-1]
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with zipfile.ZipFile(sys.argv[2]) as z: r=ET.fromstring(z.read('word/document.xml'))
m=[''.join(t.text or '' for t in p.findall('.//w:t',ns)) for p in r.findall('.//w:p',ns)]
m=[p for p in m if p.strip()]
if m[0]=='Dankrede':m=m[1:]
(root/'materialien/texte.json').write_text(json.dumps({'lenz':ps,'meridian':m},ensure_ascii=False))
print('Lenz:',len(ps),'Absätze; Meridian:',len(m),'Absätze')
