// SEO: maakt na `vite build` echte HTML-pagina's in dist/ zodat Google ze kan lezen.
// Haalt openbare data uit Supabase (zelfde anon-key als de app; RLS bepaalt wat zichtbaar is).
// Faalt nooit de build: zonder data worden alleen de vaste pagina's gemaakt.
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://lickorlie.com';
const DIST = 'dist';
const src = readFileSync('src/utils/supabase.ts', 'utf8');
const SB_URL = src.match(/https:\/\/[a-z0-9]+\.supabase\.co/)?.[0];
const SB_KEY = src.match(/eyJ[\w-]+\.[\w-]+\.[\w-]+/)?.[0];

async function rows(table, query) {
  try {
    const r = await fetch(`${SB_URL}/rest/v1/${table}?${query}`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
    if (!r.ok) throw new Error(`${table}: ${r.status}`);
    return await r.json();
  } catch (e) {
    console.warn('[prerender]', e.message);
    return [];
  }
}

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fmtDate = d => new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Amsterdam' });
const fmtTime = d => new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam' });
const COUNTRY = { NL: 'Netherlands', BE: 'Belgium' };

const pages = []; // voor sitemap
function write(path, html) {
  const file = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  pages.push(path);
}

const CSS = `
:root{--cream:#FBF6F1;--paper:#fff;--sand:#E8DDD3;--ink:#1A1A1A;--muted:#6B5E55;--rouge:#C1121F;--blush:#F6E4E1}
*{box-sizing:border-box}body{margin:0;background:var(--cream);color:var(--ink);font:17px/1.6 Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
main{max-width:720px;margin:0 auto;padding:24px 20px 64px}
header{display:flex;justify-content:space-between;align-items:center;max-width:720px;margin:0 auto;padding:16px 20px}
.logo{font:600 24px 'Cormorant Garamond',Georgia,serif;color:var(--ink);text-decoration:none}
nav a{color:var(--muted);text-decoration:none;font-size:14px;margin-left:14px}
h1{font:500 40px/1.1 'Cormorant Garamond',Georgia,serif;margin:16px 0 12px}h2{font:500 28px/1.2 'Cormorant Garamond',Georgia,serif;margin:36px 0 12px}
.lead{color:var(--muted);font-size:18px}.muted{color:var(--muted);font-size:14px}
.cta{display:inline-block;background:var(--rouge);color:#fff;font-weight:600;padding:14px 22px;border-radius:12px;text-decoration:none;margin:12px 0}
ul.list{list-style:none;padding:0;margin:0}ul.list li{background:var(--paper);border:1px solid var(--sand);border-radius:16px;padding:14px 16px;margin:10px 0}
ul.list a{color:var(--ink);text-decoration:none}.t{font-weight:600}.chips a{display:inline-block;background:var(--paper);border:1px solid var(--sand);border-radius:999px;padding:6px 12px;margin:4px 4px 0 0;color:var(--ink);text-decoration:none;font-size:14px}
.card{background:var(--blush);border-radius:16px;padding:14px 16px;margin:10px 0}footer{max-width:720px;margin:0 auto;padding:24px 20px;color:var(--muted);font-size:13px}
article p{white-space:pre-line}`;

function layout({ path, title, description, body, jsonld = [] }) {
  const url = SITE + (path === '/' ? '/' : path + '/');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}"><meta name="rating" content="adult">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="Lick or Lie">
<meta name="theme-color" content="#FBF6F1"><link rel="icon" href="/assets/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;600&display=swap" rel="stylesheet">
<style>${CSS}</style>
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('')}
</head><body>
<header><a class="logo" href="/">Lick or Lie 👅</a><nav><a href="/party-agenda/">Party agenda</a><a href="/clubs/">Clubs</a><a href="/blog/">Blog</a></nav></header>
<main>${body}</main>
<footer>18+ only. Lick or Lie is a free truth or dare game for adults. Event details come from the organisers' own websites; always check with the organiser before you go.</footer>
</body></html>`;
}

const playCta = (label = 'Play free now') => `<a class="cta" href="/">${label} →</a>`;

async function main() {
  const now = new Date().toISOString();
  const [events, places, posts, questions] = await Promise.all([
    rows('events', `select=*&active=eq.true&starts_at=gte.${encodeURIComponent(now)}&order=starts_at`),
    rows('places', 'select=*&active=eq.true&order=name'),
    rows('posts', 'select=*&status=eq.published&order=published_at.desc'),
    rows('questions', 'select=question,theme,level,type&level=eq.Sweet&limit=400'),
  ]);

  /* ---------- Themapagina's ---------- */
  const THEMES = [
    { path: '/truth-or-dare-for-couples', theme: 'lovers', h1: 'Truth or dare for couples',
      title: 'Truth or Dare for Couples · Free naughty game | Lick or Lie',
      desc: 'A free truth or dare game for couples that starts sweet and turns spicy. No app, no account. Play on one phone tonight.',
      intro: 'Turn date night into something you will talk about for weeks. Lick or Lie starts with sweet questions and slowly levels up through Sexy and Spicy to Wet & Wild, so you both set the pace. Everything is about the two of you.' },
    { path: '/truth-or-dare-for-friends', theme: 'friends', h1: 'Truth or dare for friends',
      title: 'Truth or Dare for Friends · Free adult party game | Lick or Lie',
      desc: 'Daring truth or dare for adult friends and parties. Bold questions, cheeky dares, free in your browser. 18+.',
      intro: 'Pre-drinks, a bachelorette or a night in: add everyone\'s name and pass the phone around. Truths get personal, dares get bold, and the game levels up the longer you play. Every player gets passes and a joker, because no is always a full answer.' },
    { path: '/truth-or-dare-for-swingers', theme: '🍍', h1: 'Truth or dare for swingers 🍍',
      title: 'Swingers Truth or Dare · Spicy party game | Lick or Lie',
      desc: 'The spicy truth or dare for open-minded couples and swingers parties. Free, private, no account. 18+.',
      intro: 'Made for open-minded couples and lifestyle parties. Cards match players by gender and orientation, missions get people mingling, and the heat rises from Sweet to Wet & Wild. Agree on a safeword and enjoy.' },
  ];
  for (const t of THEMES) {
    const sample = questions.filter(q => q.theme === t.theme).slice(0, 8);
    write(t.path, layout({
      path: t.path, title: t.title, description: t.desc,
      body: `<h1>${esc(t.h1)}</h1><p class="lead">${esc(t.intro)}</p>${playCta()}
<h2>How it works</h2><p>Add 2 or more players, pick a theme and start. Each turn is a truth or a dare. After a while the level goes up: Sweet 🍒 → Sexy 🍑 → Spicy 🥵 → Wet &amp; Wild 💦. Names stay on your phone; nothing is stored.</p>
${sample.length ? `<h2>A taste of the Sweet level</h2>${sample.map(q => `<div class="card">${esc(q.type === 'dare' ? 'Dare' : 'Truth')}: ${esc(String(q.question).replace(/\[partner\]/g, 'your partner'))}</div>`).join('')}` : ''}
${playCta('Start the game')}
<p class="muted">Looking for a party tonight? See the <a href="/party-agenda/">party agenda</a>.</p>`,
      jsonld: [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Lick or Lie', url: SITE, applicationCategory: 'GameApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } }],
    }));
  }

  /* ---------- Agenda ---------- */
  const regionsOf = list => [...new Set(list.map(e => e.region).filter(Boolean))].sort();
  const eventLi = e => `<li><a href="${esc(e.url || '#')}" rel="nofollow noopener" target="_blank"><span class="t">${esc(e.title)}</span><br><span class="muted">${esc(fmtDate(e.starts_at))} · ${esc(fmtTime(e.starts_at))} · ${esc([e.venue, e.city].filter(Boolean).join(', '))}</span></a></li>`;
  const eventLd = e => ({
    '@context': 'https://schema.org', '@type': 'Event', name: e.title, startDate: e.starts_at,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: e.venue || e.city || 'Secret location', address: { '@type': 'PostalAddress', addressLocality: e.city || undefined, addressRegion: e.region || undefined, addressCountry: e.country || undefined } },
    organizer: { '@type': 'Organization', name: e.venue || 'Organiser', url: e.url || undefined }, url: e.url || undefined, typicalAgeRange: '18-',
  });
  const regions = regionsOf([...events, ...places]);
  const regionChips = `<p class="chips">${regions.map(r => `<a href="/party-agenda/${slug(r)}/">${esc(r)}</a>`).join('')}</p>`;

  write('/party-agenda', layout({
    path: '/party-agenda', title: 'Swingers & adult party agenda Netherlands and Belgium | Lick or Lie',
    description: `Upcoming swingers parties, couples club nights and fetish events in the Netherlands and Belgium. ${events.length} parties, updated every week.`,
    body: `<h1>Party agenda 📅</h1><p class="lead">Swingers parties, couples club nights and kinky events in the Netherlands and Belgium, updated every Monday. Pick your region or open the app to see what is near you.</p>${playCta('See parties near me')}
${regionChips}<h2>Coming up</h2><ul class="list">${events.slice(0, 60).map(eventLi).join('') || '<li>New parties are added every week.</li>'}</ul>`,
    jsonld: events.slice(0, 30).map(eventLd),
  }));

  for (const r of regions) {
    const ev = events.filter(e => e.region === r), pl = places.filter(p => p.region === r);
    const land = COUNTRY[(ev[0] || pl[0])?.country] || '';
    write(`/party-agenda/${slug(r)}`, layout({
      path: `/party-agenda/${slug(r)}`, title: `Swingers parties & clubs in ${r} | Party agenda | Lick or Lie`,
      description: `Swingers parties, couples clubs and adult events in ${r}${land ? ', ' + land : ''}. ${ev.length} upcoming parties and ${pl.length} clubs, updated weekly.`,
      body: `<h1>Parties in ${esc(r)}</h1><p class="lead">Upcoming swingers and adult parties in ${esc(r)}${land ? ', ' + esc(land) : ''}, straight from the organisers. Updated every Monday.</p>${playCta('See distances from my town')}
<h2>Upcoming parties</h2><ul class="list">${ev.map(eventLi).join('') || '<li>No parties announced yet. Check back next week.</li>'}</ul>
${pl.length ? `<h2>Clubs and saunas</h2><ul class="list">${pl.map(p => `<li>${p.url ? `<a href="${esc(p.url)}" rel="nofollow noopener" target="_blank">` : ''}<span class="t">${esc(p.name)}</span><br><span class="muted">${esc([p.city, p.category].filter(Boolean).join(' · '))}</span>${p.description ? `<br>${esc(p.description)}` : ''}${p.url ? '</a>' : ''}</li>`).join('')}</ul>` : ''}
<h2>Other regions</h2>${regionChips}`,
      jsonld: ev.slice(0, 30).map(eventLd),
    }));
  }

  /* ---------- Clubs ---------- */
  write('/clubs', layout({
    path: '/clubs', title: 'Swingers clubs & couples clubs Netherlands and Belgium | Lick or Lie',
    description: `${places.length} swingers clubs, couples clubs and erotic saunas in the Netherlands and Belgium, by region.`,
    body: `<h1>Clubs &amp; saunas</h1><p class="lead">Couples clubs, swingers clubs and erotic saunas in the Netherlands and Belgium, grouped by region.</p>${playCta('Find clubs near me')}
${regions.map(r => { const pl = places.filter(p => p.region === r); return pl.length ? `<h2><a href="/party-agenda/${slug(r)}/" style="color:inherit">${esc(r)}</a></h2><ul class="list">${pl.map(p => `<li><span class="t">${esc(p.name)}</span><br><span class="muted">${esc([p.city, p.category].filter(Boolean).join(' · '))}</span></li>`).join('')}</ul>` : ''; }).join('')}`,
  }));

  /* ---------- Blog ---------- */
  write('/blog', layout({
    path: '/blog', title: 'Blog · Tips for spicy nights, parties and couples | Lick or Lie',
    description: 'Stories and tips about truth or dare, swingers parties, first club visits and spicing things up as a couple.',
    body: `<h1>Blog</h1><ul class="list">${posts.map(p => `<li><a href="/blog/${slug(p.title)}/"><span class="t">${esc(p.title)}</span>${p.excerpt ? `<br><span class="muted">${esc(p.excerpt)}</span>` : ''}</a></li>`).join('') || '<li>Stories are coming soon.</li>'}</ul>`,
  }));
  for (const p of posts) {
    const path = `/blog/${slug(p.title)}`;
    write(path, layout({
      path, title: `${p.title} | Lick or Lie`, description: (p.excerpt || String(p.body).slice(0, 150)).replace(/\s+/g, ' '),
      body: `<article><h1>${esc(p.title)}</h1><p class="muted">${esc(fmtDate(p.published_at))}</p>${p.image_url ? `<img src="${esc(p.image_url)}" alt="" style="width:100%;border-radius:16px">` : ''}<p>${esc(p.body)}</p></article>${playCta()}`,
      jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, datePublished: p.published_at, image: p.image_url || undefined, publisher: { '@type': 'Organization', name: 'Lick or Lie' } }],
    }));
  }

  /* ---------- Startpagina: meta toevoegen aan de app ---------- */
  const appHtml = readFileSync(join(DIST, 'index.html'), 'utf8').replace('</head>', `
<meta name="description" content="Lick or Lie is a free truth or dare game for grown-ups: for couples, friends and swingers. Sweet to Wet &amp; Wild, on one phone, no account. 18+.">
<link rel="canonical" href="${SITE}/"><meta name="rating" content="adult">
<meta property="og:type" content="website"><meta property="og:title" content="Lick or Lie · Truth or dare for grown-ups"><meta property="og:description" content="Free truth or dare for couples, friends and swingers. 18+."><meta property="og:url" content="${SITE}/">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Lick or Lie', url: SITE, applicationCategory: 'GameApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } })}</script>
</head>`).replace('<div id="root" class="select-none"></div>', `<div id="root" class="select-none"></div>
<noscript><h1>Lick or Lie · Truth or dare for grown-ups</h1><p>Free truth or dare for <a href="/truth-or-dare-for-couples/">couples</a>, <a href="/truth-or-dare-for-friends/">friends</a> and <a href="/truth-or-dare-for-swingers/">swingers</a>. See the <a href="/party-agenda/">party agenda</a>.</p></noscript>`);
  writeFileSync(join(DIST, 'index.html'), appHtml);
  pages.unshift('/');

  /* ---------- Sitemap + robots ---------- */
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(pages)].map(p => `<url><loc>${SITE}${p === '/' ? '/' : p + '/'}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE}/sitemap.xml\n`);
  console.log(`[prerender] ${pages.length} pages, ${events.length} events, ${places.length} places, ${posts.length} posts`);
}

main().catch(e => { console.warn('[prerender] failed, app still builds:', e); });
