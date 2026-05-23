/* ═══════════════════════════════════════════════════════════════
   OmniConvert — app.js
   Author: OmniConvert
   Description: All logic for OmniConvert — the universal
                translator & converter app.
                Requires: Anthropic API key injected at runtime
                          via the claude.ai artifact environment.
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════ */

/**
 * Toggle between dark and light theme on the <html> element.
 * Updates the theme button icon accordingly.
 */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.querySelector('.theme-btn').textContent = isDark ? '☀️' : '🌙';
}

/* ═══════════════════════════════════════════════
   PANEL ROUTING
   ═══════════════════════════════════════════════ */

/**
 * Switch the active panel via a tab button click.
 * @param {HTMLElement|null} btn  - The tab button that was clicked.
 * @param {string}           panelId - ID suffix of the panel (e.g. 'language').
 */
function switchTab(btn, panelId) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-pill').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + panelId).classList.add('active');
  if (btn) btn.classList.add('active');
}

/**
 * Switch panel via a nav-pill click (header navigation).
 * Keeps tab row and nav-pill in sync.
 * @param {string} id - Panel ID suffix.
 */
function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  document.querySelectorAll('.nav-pill').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.tab').forEach(t => {
    if (t.getAttribute('onclick') && t.getAttribute('onclick').includes("'" + id + "'")) {
      t.classList.add('active');
    }
  });
}

/* ═══════════════════════════════════════════════
   GLOBAL SEARCH
   ═══════════════════════════════════════════════ */

/**
 * Smart search handler — reads intent from free-form text and
 * routes the user to the appropriate converter panel.
 * @param {string} val - Current value of the search input.
 */
function handleSearch(val) {
  const clear = document.getElementById('searchClear');
  const hint  = document.getElementById('searchHint');
  clear.style.display = val ? 'block' : 'none';
  if (!val) { hint.textContent = ''; return; }

  const v = val.toLowerCase();

  if (v.includes('translat') || v.includes('elvish') || v.includes('navi') || v.includes('klingon')) {
    hint.textContent = '↳ Switching to Language Translator…';
    setTimeout(() => switchTab(document.querySelector('.tab'), 'language'), 600);
  } else if (v.includes('usd') || v.includes('eur') || v.includes('currency') || v.includes('doubloon') || v.includes('bitcoin')) {
    hint.textContent = '↳ Switching to Currency Converter…';
    setTimeout(() => switchTab(null, 'currency'), 600);
  } else if (v.includes('kg') || v.includes('lb') || v.includes('km') || v.includes('mile') || v.includes('meter')) {
    hint.textContent = '↳ Switching to Measurement Converter…';
    setTimeout(() => switchTab(null, 'measurement'), 600);
  } else if (v.includes('°') || v.includes('celsius') || v.includes('fahrenheit')) {
    hint.textContent = '↳ Switching to Temperature Converter…';
    setTimeout(() => switchTab(null, 'temperature'), 600);
  } else if (v.includes('secret') || v.includes('easter') || v.includes('pirate') || v.includes('medieval')) {
    hint.textContent = '↳ Switching to Secret Modes…';
    setTimeout(() => switchTab(null, 'easter'), 600);
  } else {
    hint.textContent = '';
  }
}

/** Clear the global search input and its hint. */
function clearSearch() {
  document.getElementById('globalSearch').value = '';
  document.getElementById('searchClear').style.display = 'none';
  document.getElementById('searchHint').textContent = '';
}

/* ═══════════════════════════════════════════════
   CLIPBOARD UTILITY
   ═══════════════════════════════════════════════ */

/**
 * Copy the text content of an element to the clipboard.
 * Temporarily changes the button label to "Copied!".
 * @param {string} id - ID of the element whose text to copy.
 */
function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target;
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1800);
  });
}

/* ═══════════════════════════════════════════════
   LANGUAGE TRANSLATION  (AI-powered via Claude)
   ═══════════════════════════════════════════════ */

/**
 * Language codes that trigger the "easter egg / fun fact" extra context
 * after the translation response.
 */
const EASTER_LANGS = [
  'Elvish (Sindarin)', 'Elvish (Quenya)', "Na'vi",
  'Klingon', 'Pirate Speak', 'Shakespearean English',
  'Old English', 'Valley Girl Slang', 'Gen Z Slang', 'Pig Latin'
];

/** Swap the From and To language selects. */
function swapLanguages() {
  const f = document.getElementById('langFrom');
  const t = document.getElementById('langTo');
  [f.value, t.value] = [t.value, f.value];
}

/**
 * Populate the language input with a sample text.
 * @param {string} text - Sample string to load.
 */
function setLangExample(text) {
  document.getElementById('langInput').value = text;
}

/**
 * Send the input text to Claude for context-aware, slang-aware translation.
 * Handles fictional/historical languages and adds an easter-egg fun fact
 * when an exotic target language is selected.
 */
async function translateText() {
  const input    = document.getElementById('langInput').value.trim();
  if (!input) return;

  const from     = document.getElementById('langFrom').value;
  const to       = document.getElementById('langTo').value;
  const btn      = document.getElementById('translateBtn');
  const resultEl = document.getElementById('langResultText');
  const easterEl = document.getElementById('langEasterEgg');

  // UI: loading state
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Translating…';
  resultEl.style.fontStyle = 'italic';
  resultEl.style.color = 'var(--text3)';
  resultEl.textContent = 'Thinking…';
  easterEl.classList.remove('show');

  const isEaster = EASTER_LANGS.includes(to);

  let systemPrompt = `You are an expert multilingual translator with deep knowledge of linguistics, slang, idioms, cultural context, fictional languages, and historical dialects.

Your job:
1. Translate text accurately and naturally
2. Preserve slang, idioms, and cultural meaning — not just literal words
3. If translating to a fictional language (Elvish, Na'vi, Klingon), use authentic words and grammar from those languages, supplemented with romanized approximations where needed
4. If translating to a historical dialect (Old English, Shakespearean), be accurate and authentic
5. Understand context and produce the most natural translation
6. Return ONLY the translated text, nothing else. No explanations, no brackets, no prefixes.`;

  const userPrompt = `Translate the following from ${from === 'auto' ? 'the detected language' : from} to ${to}:\n\n"${input}"`;

  if (isEaster) {
    systemPrompt += `\n\nIMPORTANT: After the translation, on a new line starting with "CONTEXT:" add one fun sentence about the language/dialect.`;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const data = await response.json();
    const full  = data.content?.[0]?.text || '';
    const parts = full.split('\nCONTEXT:');
    const translation = parts[0].replace(/^"|"$/g, '').trim();
    const context     = parts[1] ? parts[1].trim() : null;

    resultEl.textContent   = translation;
    resultEl.style.fontStyle = 'normal';
    resultEl.style.color     = 'var(--text)';

    if (isEaster && context) {
      easterEl.innerHTML = `<strong>✨ Fun Fact</strong>${context}`;
      easterEl.classList.add('show');
    }
  } catch (e) {
    resultEl.textContent = 'Translation failed. Please try again.';
    resultEl.style.color = 'var(--red)';
  }

  btn.disabled = false;
  btn.innerHTML = '✨ Translate';
}

/* ═══════════════════════════════════════════════
   CURRENCY CONVERTER
   ═══════════════════════════════════════════════ */

/**
 * Approximate exchange rates relative to 1 USD.
 * These are baked-in estimates; for production use, swap with a live API.
 */
const RATES = {
  USD: 1,       EUR: 0.92,    GBP: 0.79,
  JPY: 149.5,   CAD: 1.36,    AUD: 1.53,
  CHF: 0.89,    CNY: 7.24,    INR: 83.1,
  MXN: 17.15,   BRL: 4.97,    KRW: 1325,
  SGD: 1.34,    BTC: 0.0000156, ETH: 0.000425
};

/**
 * Easter-egg historical / fictional "currencies".
 * rate = number of units per 1 USD (purchasing-power approximation).
 */
const HISTORICAL = {
  GOLD_DOUBLOON:  { rate: 0.022, symbol: '🏴‍☠️', name: 'Gold Doubloons',   era: 'Pirate Era (1600–1750)',           note: "A Spanish gold doubloon was worth roughly 4 Spanish pesos. Arrr!" },
  SILVER_COIN:    { rate: 0.5,   symbol: '⚔️',  name: 'Silver Shillings', era: 'Medieval England (1200s)',         note: "A shilling could buy a day's labour from a skilled craftsman." },
  ROMAN_DENARIUS: { rate: 3.8,   symbol: '🏛️', name: 'Roman Denarii',    era: 'Ancient Rome (100 AD)',            note: "A denarius was a common soldier's daily pay in the Roman army." },
  GREEK_DRACHMA:  { rate: 4.2,   symbol: '🏺', name: 'Greek Drachmas',   era: 'Classical Greece (400 BC)',        note: "One drachma could buy a sheep in ancient Athens." },
  GEMS:           { rate: 0.01,  symbol: '💎', name: 'Fantasy Gems',      era: 'The Realm of Imagination',        note: "Accepted at most taverns and dragon hoards. Exchange rate subject to wizard fees." }
};

/** Swap the From and To currency selects. */
function swapCurrencies() {
  const f = document.getElementById('currFrom');
  const t = document.getElementById('currTo');
  [f.value, t.value] = [t.value, f.value];
}

/**
 * Convert an amount between two currencies (or into a historical currency).
 * Shows an easter-egg banner for historical/fantasy targets.
 */
function convertCurrency() {
  const amount = parseFloat(document.getElementById('currAmount').value) || 0;
  const from   = document.getElementById('currFrom').value;
  const to     = document.getElementById('currTo').value;
  const bigEl  = document.getElementById('currResultBig');
  const subEl  = document.getElementById('currResultSub');
  const easter = document.getElementById('currEasterEgg');
  easter.classList.remove('show');

  // Historical / easter-egg currencies
  if (HISTORICAL[to]) {
    const h      = HISTORICAL[to];
    const usd    = amount / (RATES[from] || 1);
    const result = (usd * h.rate).toFixed(2);
    bigEl.textContent = `${h.symbol} ${result} ${h.name}`;
    subEl.textContent = h.era;
    easter.innerHTML  = `<strong>${h.symbol} Historical Context</strong>${h.note}<br>
      <em style="opacity:0.7;font-size:0.8em">Note: Values are approximate purchasing-power equivalents for educational fun.</em>`;
    easter.classList.add('show');
    return;
  }

  // Standard currency conversion
  const fromRate = RATES[from];
  const toRate   = RATES[to];
  if (!fromRate || !toRate) { bigEl.textContent = 'Unknown currency'; return; }

  const result = (amount / fromRate) * toRate;

  const fmt = (n, sym) => {
    if (sym === 'BTC') return n.toFixed(6) + ' ₿';
    if (sym === 'ETH') return n.toFixed(4) + ' Ξ';
    if (sym === 'JPY' || sym === 'KRW') return Math.round(n).toLocaleString() + ' ' + sym;
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + sym;
  };

  bigEl.textContent = fmt(result, to);
  subEl.textContent = `1 ${from} = ${fmt(toRate / fromRate, to)} • Live approximate rates`;
}

/* ═══════════════════════════════════════════════
   MEASUREMENT CONVERTER
   ═══════════════════════════════════════════════ */

/**
 * All supported measurement categories.
 * Each entry has: units (short codes), labels (display names),
 * and toBase (conversion factor to a canonical SI base unit).
 */
const MEASURES = {
  length: {
    units:  ['mm','cm','m','km','in','ft','yd','mi','nmi','light-year'],
    labels: ['Millimeters (mm)','Centimeters (cm)','Meters (m)','Kilometers (km)',
             'Inches (in)','Feet (ft)','Yards (yd)','Miles (mi)',
             'Nautical Miles','Light-Years'],
    toBase: [0.001, 0.01, 1, 1000, 0.0254, 0.3048, 0.9144, 1609.344, 1852, 9.461e15]
  },
  weight: {
    units:  ['mg','g','kg','t','oz','lb','st','ton'],
    labels: ['Milligrams (mg)','Grams (g)','Kilograms (kg)','Metric Tons (t)',
             'Ounces (oz)','Pounds (lb)','Stone (st)','Short Tons (US)'],
    toBase: [0.000001, 0.001, 1, 1000, 0.0283495, 0.453592, 6.35029, 907.185]
  },
  volume: {
    units:  ['ml','l','m3','tsp','tbsp','fl oz','cup','pt','qt','gal'],
    labels: ['Milliliters (ml)','Liters (L)','Cubic Meters (m³)','Teaspoons',
             'Tablespoons','Fluid Ounces','Cups','Pints','Quarts','Gallons (US)'],
    toBase: [0.001, 1, 1000, 0.00492892, 0.0147868, 0.0295735, 0.236588, 0.473176, 0.946353, 3.78541]
  },
  area: {
    units:  ['mm2','cm2','m2','km2','in2','ft2','yd2','acre','ha','mi2'],
    labels: ['sq mm','sq cm','sq m','sq km','sq in','sq ft','sq yd','Acres','Hectares','sq mi'],
    toBase: [1e-6, 1e-4, 1, 1e6, 6.452e-4, 0.0929, 0.8361, 4046.86, 1e4, 2.59e6]
  },
  speed: {
    units:  ['m/s','km/h','mph','knot','ft/s','mach'],
    labels: ['Meters/sec (m/s)','Kilometers/hr (km/h)','Miles/hr (mph)','Knots','Feet/sec (ft/s)','Mach'],
    toBase: [1, 1/3.6, 0.44704, 0.514444, 0.3048, 343]
  },
  energy: {
    units:  ['J','kJ','cal','kcal','Wh','kWh','BTU','eV'],
    labels: ['Joules (J)','Kilojoules (kJ)','Calories (cal)','Kilocalories (kcal)',
             'Watt-hours (Wh)','Kilowatt-hours (kWh)','BTU','Electron-volts (eV)'],
    toBase: [1, 1000, 4.184, 4184, 3600, 3.6e6, 1055.06, 1.602e-19]
  }
};

/** Currently selected measurement category. */
let currentMeasCat = 'length';

/**
 * Switch the active measurement category and repopulate dropdowns.
 * @param {HTMLElement|null} btn - The chip button that was clicked.
 * @param {string}           cat - Key into MEASURES.
 */
function setMeasureCategory(btn, cat) {
  document.querySelectorAll('.tip').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  currentMeasCat = cat;
  populateMeasureSelects();
}

/** Repopulate the From/To selects with units for the current category. */
function populateMeasureSelects() {
  const cat = MEASURES[currentMeasCat];
  ['measFrom', 'measTo'].forEach((id, i) => {
    const sel = document.getElementById(id);
    sel.innerHTML = cat.units.map((u, j) =>
      `<option value="${j}">${cat.labels[j]}</option>`
    ).join('');
    sel.selectedIndex = i === 1 ? 1 : 0;
  });
}

/** Swap From and To measurement unit selects. */
function swapMeasure() {
  const f = document.getElementById('measFrom');
  const t = document.getElementById('measTo');
  [f.selectedIndex, t.selectedIndex] = [t.selectedIndex, f.selectedIndex];
}

/** Perform the unit conversion and display results. */
function convertMeasure() {
  const cat    = MEASURES[currentMeasCat];
  const val    = parseFloat(document.getElementById('measAmount').value);
  const fi     = parseInt(document.getElementById('measFrom').value);
  const ti     = parseInt(document.getElementById('measTo').value);
  const inBase = val * cat.toBase[fi];
  const result = inBase / cat.toBase[ti];
  const fmt    = n => (n < 0.001 || n > 1e9) ? n.toExponential(4) : parseFloat(n.toPrecision(6)).toString();

  document.getElementById('measResultBig').textContent = fmt(result) + ' ' + cat.units[ti];
  document.getElementById('measResultSub').textContent =
    `${val} ${cat.labels[fi]} = ${fmt(result)} ${cat.labels[ti]}`;
}

// Init measurement dropdowns on load
populateMeasureSelects();

/* ═══════════════════════════════════════════════
   TIME ZONE CONVERTER
   ═══════════════════════════════════════════════ */

/** All supported IANA timezone identifiers with display labels. */
const TIMEZONES = [
  ['UTC',                  'UTC — Coordinated Universal Time'],
  ['America/New_York',     '🇺🇸 Eastern Time (ET)'],
  ['America/Chicago',      '🇺🇸 Central Time (CT)'],
  ['America/Denver',       '🇺🇸 Mountain Time (MT)'],
  ['America/Los_Angeles',  '🇺🇸 Pacific Time (PT)'],
  ['America/Anchorage',    '🇺🇸 Alaska Time'],
  ['Pacific/Honolulu',     '🇺🇸 Hawaii Time'],
  ['Europe/London',        '🇬🇧 London (GMT/BST)'],
  ['Europe/Paris',         '🇫🇷 Paris (CET/CEST)'],
  ['Europe/Berlin',        '🇩🇪 Berlin'],
  ['Europe/Moscow',        '🇷🇺 Moscow (MSK)'],
  ['Asia/Dubai',           '🇦🇪 Dubai (GST)'],
  ['Asia/Kolkata',         '🇮🇳 India (IST)'],
  ['Asia/Shanghai',        '🇨🇳 China (CST)'],
  ['Asia/Tokyo',           '🇯🇵 Japan (JST)'],
  ['Australia/Sydney',     '🇦🇺 Sydney (AEST)'],
  ['Pacific/Auckland',     '🇳🇿 Auckland (NZST)'],
];

/** Populate timezone dropdowns and set the current time as default. */
function populateTZ() {
  ['tzFrom', 'tzTo'].forEach((id, i) => {
    const sel = document.getElementById(id);
    sel.innerHTML = TIMEZONES.map(([v, l]) =>
      `<option value="${v}">${l}</option>`
    ).join('');
    sel.selectedIndex = i === 0 ? 0 : 7;
  });
  const now = new Date();
  document.getElementById('tzTime').value = now.toISOString().slice(0, 16);
}

/** Swap the From and To timezone selects. */
function swapTZ() {
  const f = document.getElementById('tzFrom');
  const t = document.getElementById('tzTo');
  [f.value, t.value] = [t.value, f.value];
}

/** Convert the entered datetime from one timezone to another. */
function convertTime() {
  const dt     = document.getElementById('tzTime').value;
  const fromTZ = document.getElementById('tzFrom').value;
  const toTZ   = document.getElementById('tzTo').value;
  if (!dt) return;

  try {
    const d = new Date(dt + (fromTZ === 'UTC' ? 'Z' : ''));
    const opts = {
      timeZone: toTZ,
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    };
    document.getElementById('tzResultBig').textContent = d.toLocaleString('en-US', opts);
    document.getElementById('tzResultSub').textContent = `Converted to ${toTZ}`;
  } catch (e) {
    document.getElementById('tzResultBig').textContent = 'Error converting time';
  }
}

// Init timezone dropdowns on load
populateTZ();

/**
 * Convert a duration from one time unit to another.
 * Uses the option value as a multiplier (seconds) for each unit.
 */
function convertDuration() {
  const val    = parseFloat(document.getElementById('durAmount').value) || 0;
  const from   = parseFloat(document.getElementById('durFrom').value);
  const to     = parseFloat(document.getElementById('durTo').value);
  const result = val * from / to;
  const label  = document.getElementById('durTo').options[document.getElementById('durTo').selectedIndex].text;
  document.getElementById('durResultBig').textContent =
    parseFloat(result.toPrecision(6)).toString() + ' ' + label;
}

/* ═══════════════════════════════════════════════
   TEMPERATURE CONVERTER
   ═══════════════════════════════════════════════ */

/**
 * Convert a temperature value to Celsius.
 * @param {number} val  - Input value.
 * @param {string} unit - Source unit: 'C' | 'F' | 'K' | 'R'.
 * @returns {number} Value in Celsius.
 */
function toC(val, unit) {
  if (unit === 'C') return val;
  if (unit === 'F') return (val - 32) * 5 / 9;
  if (unit === 'K') return val - 273.15;
  if (unit === 'R') return (val - 491.67) * 5 / 9;
}

/**
 * Convert a Celsius value to a target temperature unit.
 * @param {number} c    - Input in Celsius.
 * @param {string} unit - Target unit: 'C' | 'F' | 'K' | 'R'.
 * @returns {number} Value in the target unit.
 */
function fromC(c, unit) {
  if (unit === 'C') return c;
  if (unit === 'F') return c * 9 / 5 + 32;
  if (unit === 'K') return c + 273.15;
  if (unit === 'R') return (c + 273.15) * 9 / 5;
}

/** Swap the From and To temperature selects. */
function swapTemp() {
  const f = document.getElementById('tempFrom');
  const t = document.getElementById('tempTo');
  [f.value, t.value] = [t.value, f.value];
}

/**
 * Convert temperature and display the primary result plus a
 * quick-grid showing all four unit equivalents simultaneously.
 */
function convertTemp() {
  const val    = parseFloat(document.getElementById('tempVal').value);
  const from   = document.getElementById('tempFrom').value;
  const to     = document.getElementById('tempTo').value;
  const c      = toC(val, from);
  const result = fromC(c, to);

  document.getElementById('tempResultBig').textContent =
    parseFloat(result.toPrecision(6)) + '°' + to;

  const units = ['C', 'F', 'K', 'R'];
  const syms  = ['°C', '°F', 'K', '°R'];
  const names = ['Celsius', 'Fahrenheit', 'Kelvin', 'Rankine'];

  document.getElementById('tempAllResult').innerHTML =
    '<div class="quick-grid">' +
    units.map((u, i) => `
      <div class="quick-card">
        <div class="qc-label">${names[i]}</div>
        <div class="qc-value">${parseFloat(fromC(c, u).toPrecision(6))} ${syms[i]}</div>
      </div>`).join('') +
    '</div>';
}

/* ═══════════════════════════════════════════════
   DATA STORAGE CONVERTER
   ═══════════════════════════════════════════════ */

/**
 * Convert a data-size value between storage units.
 * Option values represent the number of bits in that unit.
 */
function convertData() {
  const val    = parseFloat(document.getElementById('dataVal').value) || 0;
  const from   = parseFloat(document.getElementById('dataFrom').value);
  const to     = parseFloat(document.getElementById('dataTo').value);
  const bits   = val * from;
  const result = bits / to;
  const label  = document.getElementById('dataTo')
    .options[document.getElementById('dataTo').selectedIndex].text
    .replace(/\(.*\)/, '').trim();

  document.getElementById('dataResultBig').textContent =
    parseFloat(result.toPrecision(6)).toString() + ' ' + label;
}

/* ═══════════════════════════════════════════════
   EASTER EGGS
   ═══════════════════════════════════════════════ */

/**
 * Launch a secret conversion or fun fact panel.
 * Some are computed locally; others call Claude for richer AI-generated content.
 *
 * @param {string} type - One of:
 *   'bananas' | 'moon' | 'speed-light' |
 *   'pirate-gold' | 'medieval-silver' | 'roman' | 'elvish' | 'navi'
 */
async function launchEaster(type) {
  const el = document.getElementById('easterContent');
  el.innerHTML = '<div style="padding:1rem;color:var(--text3);text-align:center;">Loading… ✨</div>';

  /* ── LOCAL COMPUTATIONS ── */

  if (type === 'bananas') {
    const weight = prompt('Enter weight in kg:') || '70';
    const kg     = parseFloat(weight) || 70;
    const count  = (kg / 0.118).toFixed(0);
    el.innerHTML = `<div class="easter-reveal show">
      <strong>🍌 ${kg} kg = ${parseInt(count).toLocaleString()} Bananas</strong>
      An average banana weighs about 118 grams.
      So that object weighs ${count} bananas!
      Scientists actually use "nanobananas" as an informal unit of radiation dose.
    </div>`;
    return;
  }

  if (type === 'moon') {
    const weight = prompt('Enter your weight in kg:') || '70';
    const kg     = parseFloat(weight) || 70;
    const bodies = [
      ['Moon 🌕',    0.165],
      ['Mars 🔴',    0.376],
      ['Jupiter 🟤', 2.528],
      ['Sun ☀️',     27.9],
      ['Pluto 🧊',   0.063]
    ];
    el.innerHTML = `<div class="easter-reveal show">
      <strong>🚀 Your weight across the solar system</strong>
      <div class="quick-grid" style="margin-top:10px;">
        ${bodies.map(([b, g]) =>
          `<div class="quick-card">
            <div class="qc-label">${b}</div>
            <div class="qc-value">${(kg * g).toFixed(1)} kg</div>
          </div>`
        ).join('')}
      </div>
    </div>`;
    return;
  }

  if (type === 'speed-light') {
    const speed = prompt('Enter speed (mph):') || '100';
    const mph   = parseFloat(speed) || 100;
    const c     = 670_616_629; // mph
    const pct   = (mph / c * 100).toExponential(3);
    el.innerHTML = `<div class="easter-reveal show">
      <strong>🚀 ${mph.toLocaleString()} mph = ${pct}% of the speed of light</strong>
      At that speed it would take you ${(1e17 / mph / 8766).toExponential(2)} years to travel one light-year.
      The Voyager 1 probe travels at ~38,000 mph, which is ${(38000 / c * 100).toExponential(3)}% the speed of light.
    </div>`;
    return;
  }

  /* ── AI-POWERED EASTER EGGS ── */

  const aiPrompts = {
    'pirate-gold':     'Give me a fun, historically-flavored response: if I had $100 USD in the Golden Age of Piracy (1680–1730), how many Spanish gold doubloons would that be? Include the historical exchange context and a pirate joke. Keep it to 3 sentences max.',
    'medieval-silver': 'In a fun, historically-flavored way: if I had $100 USD in Medieval England around 1300 AD, how many silver shillings or pennies would that be? What could I buy with it? Keep it to 3 sentences max.',
    'roman':           'In a fun way: if I had $100 USD in Ancient Rome around 100 AD, how many Roman denarii would that be? What could I buy? Keep it to 3 sentences max.',
    'elvish':          "Give me the Elvish (Quenya) words for numbers 1 through 10, formatted as a nice list like \"1 — Minë\". Be accurate to Tolkien's published work.",
    'navi':            "Give me 5 useful Na'vi phrases from James Cameron's Avatar with their English meanings and pronunciation guide. Be accurate to the published Na'vi language.",
  };

  const prompt = aiPrompts[type];
  if (!prompt) {
    el.innerHTML = `<div class="easter-reveal show">Unknown secret mode.</div>`;
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.content?.[0]?.text || 'No response.';
    el.innerHTML = `<div class="easter-reveal show">
      <strong>✨ Secret Knowledge</strong>
      ${text.replace(/\n/g, '<br>')}
    </div>`;
  } catch (e) {
    el.innerHTML = `<div class="easter-reveal show">Failed to load secret content. The wizard is busy.</div>`;
  }
}
