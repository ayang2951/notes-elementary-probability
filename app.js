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
}

function buildToc(){
  const secs = Array.from(document.querySelectorAll('.note-section > h1'));
  tocEl().innerHTML = `<div class="toc-list">${secs.map(h=>`<a href="#${h.parentElement.id}">${h.textContent}</a>`).join('')}</div>`;
}

/* Auto-number callouts with colon */
function autoNumberCallouts(){
  document.querySelectorAll('.note-section').forEach(sec=>{
    const secIdx = sec.dataset.sec;
    const counters = {definition:0, proposition:0, lemma:0, theorem:0, remark:0, corollary:0};
    sec.querySelectorAll('.callout').forEach(c=>{
      for(const t in counters){
        if(c.classList.contains(t)){
          counters[t]++;
          const num = `${secIdx}.${counters[t]}`;
          const label = c.querySelector('.label');
          if(label){
            const match = label.textContent.match(/^[A-Za-z]+\s*[:(]?\s*(.+)?/);
            const customTitle = match && match[1] ? `: ${match[1].replace(/[()]/g,'').trim()}` : '';
            label.textContent = `${capitalize(t)} ${num}${customTitle}`;
          }
        }
      }
    });
  });
}
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

/* Theme toggle */
function getTheme(){ return document.documentElement.getAttribute('data-theme')||'light'; }
function setTheme(t,b){ document.documentElement.setAttribute('data-theme',t); localStorage.setItem('theme',t); if(b){ b.textContent=(t==='dark'?'🌙':'☀️'); b.setAttribute('aria-pressed',t==='dark'); } }

document.addEventListener('DOMContentLoaded',()=>{
  const btn=$id('themeToggle');
  if(btn){ setTheme(getTheme(),btn); btn.addEventListener('click',()=>setTheme(getTheme()==='dark'?'light':'dark',btn)); }
  loadAll();
});
