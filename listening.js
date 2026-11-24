/* Hörtext und Sprungmarken beziehen sich ausschliesslich auf die bereitgestellten MP3-Dateien. */
let listeningDataCache=null;
let activeListeningSession=null;
function listeningTime(seconds){const n=Math.max(0,Math.floor(seconds));return `${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;}
function listeningCueAt(cues,time,end){if(!Number.isFinite(time)||!cues.length||time<cues[0].start||time>=end)return -1;let lo=0,hi=cues.length-1,result=-1;while(lo<=hi){const mid=(lo+hi)>>1;if(cues[mid].start<=time){result=mid;lo=mid+1;}else hi=mid-1;}return result>=0&&time<cues[result].end?result:-1;}
function listeningParagraphs(paragraphs,data){return paragraphs.map((p,pi)=>{const chunks=data.cues.map((c,i)=>({c,i})).filter(({c})=>c.paragraph===pi);return `<p id="${data.prefix}${pi+1}"><span class="para-id" aria-label="Absatz ${pi+1}">${data.prefix}${pi+1}</span><span class="para-text">${chunks.map(({c,i})=>`<span class="listening-cue" id="listening-cue-${i}" data-listening-text="${i}"><button type="button" class="cue-time" data-listening-seek="${i}" aria-label="Passage ${data.prefix}${pi+1} ab ${listeningTime(c.start)} abspielen">${listeningTime(c.start)}</button><span class="cue-words">${escapeHTML(p.slice(c.from,c.to))}</span></span>`).join('')}</span></p>`;}).join('');}
async function loadListeningReader(expected){
 const root=document.getElementById('reader-content');if(!root)return;
 root.innerHTML='<p role="status">Hörtext und Zeitmarken werden geladen …</p>';
 try{
  if(!listeningDataCache||!textData){const [sync,texts]=await Promise.all([listeningDataCache?Promise.resolve(listeningDataCache):fetch('materialien/hoertext-sync.json').then(r=>{if(!r.ok)throw new Error('sync');return r.json();}),textData?Promise.resolve(textData):fetch('materialien/texte.json').then(r=>{if(!r.ok)throw new Error('text');return r.json();})]);listeningDataCache=sync;textData=texts;}
  if(currentReader!==expected||root!==document.getElementById('reader-content'))return;
  const data=listeningDataCache.recordings[expected],meta=readerMeta[expected];
  const paragraphs=expected==='lenz'?textData.lenz:data.text;
  if(!data||!Array.isArray(paragraphs)||!data.cues.length)throw new Error('data');
  if(expected==='gespraech')textData.gespraech=paragraphs;
  root.innerHTML=`${departureExplanation(expected==='lenz'?'lenz':'celan')}<div class="listening-workspace"><div class="listening-sticky">${readingAudio(expected,true)}<div class="listening-controls"><label><input type="checkbox" id="listening-follow" checked> Text mitführen</label><label><input type="checkbox" id="listening-stop" checked> Am Textende anhalten</label><label>Tempo <select id="listening-rate" aria-label="Tempo der Lesung"><option value="0.8">0,8×</option><option value="1" selected>1×</option><option value="1.25">1,25×</option><option value="1.5">1,5×</option></select></label><button type="button" id="listening-current">Zur aktuellen Textstelle</button><span id="listening-status">Textbeginn ${listeningTime(data.contentStart)}</span></div></div><p class="source listening-edition">${escapeHTML(data.editionNote)} ${escapeHTML(listeningDataCache.precisionNote)}</p><nav class="listening-landmarks" aria-label="Wichtige Passagen der Lesung">${data.landmarks.map((b,i)=>`<button type="button" data-listening-bookmark="${i}"><span>${listeningTime(b.time)}</span> ${escapeHTML(b.label)}</button>`).join('')}</nav><div class="reader-tools"><div><label for="reader-search">Im Hörtext suchen</label><input id="reader-search" type="search" placeholder="Ein Wort oder eine Formulierung …"></div><div><label for="reader-size">Schriftgrösse</label><select id="reader-size"><option value="20">Normal</option><option value="23">Gross</option><option value="26">Sehr gross</option></select></div></div><p class="reader-status" id="reader-status" role="status">${paragraphs.length} Absätze · ${data.cues.length} zeitlich zugeordnete Hörabschnitte</p><div class="reader-layout listening-layout"><article class="reader-panel listening-panel" id="reader-panel" aria-label="${escapeHTML(meta.title)}: Mitlesetext" tabindex="0">${listeningParagraphs(paragraphs,data)}</article><aside class="reader-aside">${task(expected==='lenz'?'Wie verändern Satzrhythmus und Mues’ Vortrag deine Wahrnehmung von Lenz’ Krise?':'Wie unterscheiden sich Erzählen, Anrede und Antwort in Zischlers Vortrag?','<p>Springe zu einer wichtigen Passage. Notiere Hörzeitpunkt und Absatz, beschreibe ein hörbares Detail und prüfe seine Wirkung am Wortlaut. Unterscheide Vortrag und Text.</p>',meta.field,false)}<p class="source">Jede Zeitangabe am Text spielt die zugehörige Passage ab. Bei ausgeschaltetem Mitführen kannst du unabhängig vom Ton weiterlesen.</p>${expected==='gespraech'?`<details><summary>DLA-Lesung zusätzlich als Video</summary><div id="reading-embed"><button class="primary" data-action="load-reading">DLA-Video laden</button></div>${source([S.gespraech,'Video bei der Quelle öffnen'])}</details>`:source([S.gutenberg,'Referenzfassung des Lesetextes'])}${readerWeave(expected)}</aside></div></div>`;
  restoreFields();initListeningReader(expected,data,root);
 }catch(error){if(currentReader!==expected||root!==document.getElementById('reader-content'))return;root.innerHTML=`${readingAudio(expected,true)}<div class="error"><h2>Die Textzuordnung konnte nicht geladen werden.</h2><p>Die Lesung bleibt über den Dateilink erreichbar. Lade die Zuordnung erneut, um mitzulesen und zu den Passagen zu springen.</p><button type="button" data-action="retry-reader">Textzuordnung erneut laden</button></div>`;}
}
function initListeningReader(id,data,root){
 const player=root.querySelector(`#audio-${id}`),panel=root.querySelector('#reader-panel'),follow=root.querySelector('#listening-follow'),stop=root.querySelector('#listening-stop'),status=root.querySelector('#listening-status');
 let current=-1;activeListeningSession={id,player,data};
 function paint(force=false){
  if(!player.isConnected)return;
  const time=player.currentTime,index=listeningCueAt(data.cues,time,data.contentEnd);
  if(time>=data.contentEnd){if(stop.checked&&!player.paused)player.pause();status.textContent=id==='lenz'?'Lesetext beendet · anschliessend folgt weiteres Material.':'Lesetext beendet.';}
  else if(index<0)status.textContent=`Ansage · Textbeginn ${listeningTime(data.contentStart)}`;
  if(index===current&&!force)return;
  if(current>=0){const previous=root.querySelector(`[data-listening-text="${current}"]`);previous?.classList.remove('listening-active');previous?.removeAttribute('aria-current');}
  current=index;if(index<0)return;
  const el=root.querySelector(`[data-listening-text="${index}"]`);el.classList.add('listening-active');el.setAttribute('aria-current','true');
  status.textContent=`${data.prefix}${data.cues[index].paragraph+1} · ${listeningTime(time)}`;
  if(follow.checked||force){const top=panel.scrollTop+el.getBoundingClientRect().top-panel.getBoundingClientRect().top-panel.clientHeight*.22;panel.scrollTo({top:Math.max(0,top),behavior:'instant'});}
 }
 function seek(time,autoplay=true){
  const target=Math.max(data.contentStart,Math.min(time,data.contentEnd-.1));
  const assign=()=>{player.currentTime=target;paint(true);};
  if(player.readyState===0){player.addEventListener('loadedmetadata',assign,{once:true});player.load();}else assign();
  if(autoplay)player.play().catch(()=>announce('Bitte die Lesung mit der Wiedergabetaste starten.'));
 }
 root.querySelectorAll('[data-listening-seek]').forEach(b=>b.addEventListener('click',()=>seek(data.cues[Number(b.dataset.listeningSeek)].start)));
 root.querySelectorAll('[data-listening-bookmark]').forEach(b=>b.addEventListener('click',()=>seek(data.landmarks[Number(b.dataset.listeningBookmark)].time)));
 player.addEventListener('timeupdate',()=>paint());player.addEventListener('seeked',()=>paint());player.addEventListener('loadedmetadata',()=>paint());
 root.querySelector('#listening-rate').addEventListener('change',e=>{player.playbackRate=Number(e.target.value);});
 follow.addEventListener('change',()=>{if(follow.checked)paint(true);});root.querySelector('#listening-current').addEventListener('click',()=>paint(true));
 paint();
 const entry=location.hash.split('/')[2],anchors={lenz:{anfang:0,oberlin:2,kunst:3,medusa:5,schluss:7},gespraech:{anfang:0,natur:2,sprache:5,gedaechtnis:6,kerze:7}};
 const bookmark=anchors[id]?.[entry];if(bookmark!==undefined)seek(data.landmarks[bookmark].time,false);
}
