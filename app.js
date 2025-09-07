/* app.js – with max-height collapsibles + auto-numbering */

marked.setOptions({ gfm:true, mangle:false, headerIds:false });

const ORDERED_NOTES = [
  { file: "setfamilies.md", title: "Families of Sets" },
  { file: "measure.md", title: "Measures & Measurability" },
  { file: "integration.md", title: "Lebesgue Integration" },
  { file: "productspaces.md", title: "Product Spaces" },
  { file: "independence.md", title: "Independence" },
  { file: "convergence.md", title: "Convergence" },
  { file: "conditionalexpectation.md", title: "Conditional Expectation" }
];

function $id(id){ return document.getElementById(id); }
const contentEl = () => $id('content');
const tocEl = () => $id('toc');

async function loadAll(){
  const parts = await Promise.all(ORDERED_NOTES.map(async({file,title},i)=>{
    try {
      const res = await fetch(`notes/${file}`);
      if(!res.ok) return `<section data-sec="${i+1}"><h1>${title}</h1><blockquote>⚠️ Missing ${file}</blockquote></section>`;
      const md = await res.text();
      const html = marked.parse(md);
      return `<section id="sec-${i+1}" class="note-section" data-sec="${i+1}"><h1>${title}</h1>${html}</section>`;
    } catch(e){
      return `<section data-sec="${i+1}"><h1>${title}</h1><blockquote>⚠️ Load error</blockquote></section>`;
    }
  }));
  contentEl().innerHTML = parts.join("\n");

  if(window.MathJax?.typesetPromise){ await MathJax.typesetPromise([contentEl()]); }

  buildToc();
  autoNumberCallouts();
  addBookmarkButtons();
}

function buildToc(){
  const secs = Array.from(document.querySelectorAll('.note-section > h1'));
  tocEl().innerHTML = `<div class="toc-list">${secs.map(h=>`<a href="#${h.parentElement.id}">${h.textContent}</a>`).join('')}</div>`;
}

/* Auto-number callouts with colon */
/* Replace existing autoNumberCallouts() with this block */
function autoNumberCallouts(){
  document.querySelectorAll('.note-section').forEach(sec=>{
    const secIdx = sec.dataset.sec || (sec.id||'').replace(/^[^\d]*(\d+).*$/,'$1') || '0';
    const counters = {definition:0, proposition:0, lemma:0, theorem:0, remark:0, corollary:0, example:0};

    sec.querySelectorAll('.callout').forEach(c=>{
      for(const t in counters){
        if(c.classList.contains(t)){
          counters[t]++;
          const num = `${secIdx}.${counters[t]}`;
          const labelEl = c.querySelector('.label');
          if(labelEl){
            let raw = labelEl.textContent.trim();
            const afterType = raw.replace(/^[A-Za-z]+\s*[:(]?\s*/,'').trim();
            const titlePart = afterType ? `: ${afterType}` : '';
            const typeWord = t.charAt(0).toUpperCase() + t.slice(1);

            labelEl.innerHTML =
              '<span class="callout-type">' + typeWord + '</span> ' +
              '<span class="callout-num">' + num + '</span>' +
              '<span class="callout-title">' + titlePart + '</span>';
          }
          
          if (!c.id) c.id = `${t}-${secIdx}-${counters[t]}`;
          break;
        }
      }
    });
  });
}


/* Theme toggle */
function getTheme(){ return document.documentElement.getAttribute('data-theme')||'light'; }
function setTheme(t,b){ document.documentElement.setAttribute('data-theme',t); localStorage.setItem('theme',t); if(b){ b.textContent=(t==='dark'?'🌙':'☀️'); b.setAttribute('aria-pressed',t==='dark'); } }

document.addEventListener('DOMContentLoaded',()=>{
  const btn=$id('themeToggle');
  if(btn){ setTheme(getTheme(),btn); btn.addEventListener('click',()=>setTheme(getTheme()==='dark'?'light':'dark',btn)); }
  loadAll();
});

function addBookmarkButtons(){
  const blocks = document.querySelectorAll('p, .callout, h2, h3');
  blocks.forEach((el, idx) => {
    if(!el.id) el.id = 'block-' + idx;
    el.classList.add('bookmarkable');

    // Add 🔖 button to each block
    const btn = document.createElement('button');
    btn.textContent = '🔖';
    btn.className = 'bookmark-btn';
    btn.title = 'Toggle bookmark';

    btn.addEventListener('click', () => toggleBookmark(el.id));
    el.appendChild(btn);
  });

  // Restore visual state
  renderBookmarks();
}

/* --- Bookmark helpers --- */
function getBookmarks(){
  return JSON.parse(localStorage.getItem('bookmarks') || '[]');
}
function saveBookmarks(arr){
  localStorage.setItem('bookmarks', JSON.stringify(arr));
}
function toggleBookmark(id){
  let bookmarks = getBookmarks();
  if(bookmarks.includes(id)){
    bookmarks = bookmarks.filter(b => b !== id);
  } else {
    bookmarks.push(id);
  }
  saveBookmarks(bookmarks);
  renderBookmarks();
}
function removeBookmark(id){
  let bookmarks = getBookmarks().filter(b => b !== id);
  saveBookmarks(bookmarks);
  renderBookmarks();
}

/* --- Render bookmarks list + highlight in text --- */
function renderBookmarks(){
  const bookmarks = getBookmarks();

  // Highlight in text
  document.querySelectorAll('.bookmarkable').forEach(el => {
    if(bookmarks.includes(el.id)){
      el.classList.add('bookmarked');
    } else {
      el.classList.remove('bookmarked');
    }
  });

  // Build list
  const list = document.getElementById('bookmarkList');
  if(list){
    list.innerHTML = '';
    bookmarks.forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      const li = document.createElement('li');

      const link = document.createElement('a');
      link.href = '#' + id;
      // Find the nearest section title
      let section = el.closest('section');
      let heading = section ? section.querySelector('h1') : null;
      let displayText = '(Untitled)';

      // If it's a callout (proposition/lemma/theorem/etc.), use its label
      if (el.classList.contains('callout')) {
        const label = el.querySelector('.label');
        if (label) {
          displayText = label.textContent;
        }
      } else {
        // Otherwise, find nearest heading (h1/h2/h3)
        let heading = null;
        let prev = el;
        while (prev && !['H1','H2','H3'].includes(prev.tagName)) {
          prev = prev.previousElementSibling;
        }
        if (prev && ['H1','H2','H3'].includes(prev.tagName)) {
          heading = prev;
        } else {
          heading = el.closest('section')?.querySelector('h1');
        }
        if (heading) {
          displayText = heading.textContent;
        }
      }

      link.textContent = displayText;


      link.addEventListener('click', (e) => {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      });

      const rm = document.createElement('button');
      rm.textContent = '❌';
      rm.addEventListener('click', () => removeBookmark(id));

      li.appendChild(link);
      li.appendChild(rm);
      list.appendChild(li);
    });
  }
}

/* --- Panel toggle --- */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBookmarks');
  const panel = document.getElementById('bookmarkPanel');
  if(toggleBtn && panel){
    toggleBtn.addEventListener('click', () => {
      panel.style.display = (panel.style.display === 'block' ? 'none' : 'block');
    });
  }
});
