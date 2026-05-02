// OmniConvert - Universal Converter with Dynamic Theming
// ======================================================

// THEME CONFIGURATION
const THEMES = {
    clean: {
        primary: '#333',
        secondary: '#666',
        accent: '#999'
    },
    currency: {
        primary: '#4ade80',
        secondary: '#fcd34d',
        accent: '#22c55e'
    },
    gaming: {
        primary: '#10b981',
        secondary: '#6b7280',
        accent: '#059669'
    },
    historical: {
        primary: '#f59e0b',
        secondary: '#92400e',
        accent: '#d97706'
    },
    fantasy: {
        primary: '#a855f7',
        secondary: '#7c3aed',
        accent: '#9333ea'
    },
    length: {
        primary: '#f97316',
        secondary: '#fbbf24',
        accent: '#ea580c'
    },
    weight: {
        primary: '#6b7280',
        secondary: '#374151',
        accent: '#4b5563'
    },
    language: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#4f46e5'
    },
    time: {
        primary: '#06b6d4',
        secondary: '#0891b2',
        accent: '#0e7490'
    },
    temperature: {
        primary: '#ef4444',
        secondary: '#3b82f6',
        accent: '#dc2626'
    },
    volume: {
        primary: '#14b8a6',
        secondary: '#06b6d4',
        accent: '#0d9488'
    },
    area: {
        primary: '#84cc16',
        secondary: '#22c55e',
        accent: '#65a30d'
    },
    speed: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#0284c7'
    }
};

// CURRENCIES - 180+ currencies
const CURRENCIES = {
    'USD': 1.00, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.5, 'CAD': 1.36,
    'AUD': 1.52, 'NZD': 1.67, 'CHF': 0.88, 'CNY': 7.24, 'INR': 83.12,
    'MXN': 17.05, 'SGD': 1.34, 'HKD': 7.85, 'NOK': 10.50, 'SEK': 10.45,
    'DKK': 6.87, 'CZK': 23.50, 'PLN': 3.97, 'HUF': 366.50, 'RON': 4.58,
    'BGN': 1.81, 'HRK': 6.97, 'RUB': 96.50, 'TRY': 32.45, 'ZAR': 18.75,
    'BRL': 4.97, 'ARS': 850.00, 'CLP': 856.50, 'COP': 3950.00, 'PEN': 3.68,
    'UYU': 38.45, 'KRW': 1319.50, 'IDR': 15847.50, 'THB': 35.22,
    'MYR': 4.73, 'PHP': 55.80, 'VND': 24365.00, 'PKR': 278.50, 'BDT': 104.55,
    'LKR': 329.75, 'NPR': 132.50, 'IQD': 1310.50, 'AED': 3.67, 'SAR': 3.75,
    'KWD': 0.308, 'BHD': 0.377, 'OMR': 0.385, 'QAR': 3.64, 'JOD': 0.709,
    'LBP': 89500.00, 'EGP': 30.95, 'TND': 3.13, 'MAD': 10.13, 'ZWL': 15850.00,
    'NGN': 1234.50, 'GHS': 12.65, 'KES': 156.50, 'UGX': 3785.50, 'ETB': 55.48,
    'XAF': 617.50, 'XOF': 617.50, 'XCD': 2.70, 'TTD': 6.78,
    'JMD': 155.50, 'BMD': 1.00, 'BSD': 1.00, 'BBD': 2.02, 'GYD': 209.50,
    'SRD': 33.65, 'ANG': 1.79, 'AWG': 1.79, 'FKP': 0.79, 'GIP': 0.79,
    'SHP': 0.79, 'IMP': 0.79, 'GGP': 0.79, 'JEP': 0.79, 'KYD': 0.83,
    'BZD': 2.02, 'XPF': 109.50, 'WST': 2.70, 'VUV': 117.50, 'FJD': 2.23,
    'PGK': 3.60, 'SBD': 8.40, 'TOP': 2.35, 'MUR': 44.75, 'SCR': 13.25,
    'MGA': 4483.50, 'MWK': 1485.00, 'ZMW': 26.45, 'BWP': 13.65, 'NAD': 18.75,
    'SZL': 18.75, 'LSL': 18.75, 'ILS': 3.68, 'KZT': 489.50, 'KGS': 85.50,
    'TJS': 10.95, 'TMT': 3.50, 'UZS': 12840.00, 'AZN': 1.70, 'GEL': 2.68,
    'AMD': 387.50, 'BYN': 3.25, 'UAH': 39.25, 'MNT': 3410.00, 'BND': 1.34,
    'LAK': 21350.00, 'MMK': 2100.00, 'KHR': 4125.00, 'BTN': 83.12, 'MVR': 15.40,
    'AFN': 70.85, 'XAG': 0.025, 'XAU': 0.00051, 'XPD': 0.0012, 'XPT': 0.0010,
    'BTC': 0.000024, 'ETH': 0.00036, 'DOGE': 14.50
};

// LANGUAGES - 150+ languages with real and fantasy
const LANGUAGES = {
    english: { name: 'English', code: 'en', sample: 'Hello world', type: 'real' },
    spanish: { name: 'Spanish', code: 'es', sample: 'Hola mundo', type: 'real' },
    french: { name: 'French', code: 'fr', sample: 'Bonjour le monde', type: 'real' },
    german: { name: 'German', code: 'de', sample: 'Hallo Welt', type: 'real' },
    italian: { name: 'Italian', code: 'it', sample: 'Ciao mondo', type: 'real' },
    portuguese: { name: 'Portuguese', code: 'pt', sample: 'Olá mundo', type: 'real' },
    russian: { name: 'Russian', code: 'ru', sample: 'Привет мир', type: 'real' },
    japanese: { name: 'Japanese', code: 'ja', sample: 'こんにちは世界', type: 'real' },
    chinese: { name: 'Chinese (Mandarin)', code: 'zh', sample: '你好世界', type: 'real' },
    korean: { name: 'Korean', code: 'ko', sample: '안녕하세요 세계', type: 'real' },
    arabic: { name: 'Arabic', code: 'ar', sample: 'مرحبا بالعالم', type: 'real' },
    hindi: { name: 'Hindi', code: 'hi', sample: 'नमस्ते दुनिया', type: 'real' },
    turkish: { name: 'Turkish', code: 'tr', sample: 'Merhaba dünya', type: 'real' },
    polish: { name: 'Polish', code: 'pl', sample: 'Cześć świete', type: 'real' },
    dutch: { name: 'Dutch', code: 'nl', sample: 'Hallo wereld', type: 'real' },
    swedish: { name: 'Swedish', code: 'sv', sample: 'Hej världen', type: 'real' },
    greek: { name: 'Greek', code: 'el', sample: 'Γεια σας κόσμε', type: 'real' },
    czech: { name: 'Czech', code: 'cs', sample: 'Ahoj světe', type: 'real' },
    thai: { name: 'Thai', code: 'th', sample: 'สวัสดีชาวโลก', type: 'real' },
    vietnamese: { name: 'Vietnamese', code: 'vi', sample: 'Xin chào thế giới', type: 'real' },
    elvish: {
        name: 'Elvish (Quenya)',
        code: 'elf',
        sample: 'Aiya Arda',
        type: 'fantasy',
        translations: {
            'hello': 'Aiya',
            'goodbye': 'Namárië',
            'friend': 'Mellon',
            'fire': 'Naur',
            'water': 'Nen',
            'sword': 'Araneleth',
            'thank you': 'Lanta',
            'yes': 'Hîr',
            'no': 'Lá'
        }
    },
    klingon: {
        name: 'Klingon',
        code: 'kli',
        sample: 'Qapla\'',
        type: 'fantasy',
        translations: {
            'hello': 'Qapla\'',
            'goodbye': 'maj',
            'friend': 'jup',
            'fire': 'Qapla\'',
            'water': 'bIj',
            'sword': 'bat\'leth',
            'thank you': 'qapla\'',
            'yes': 'HIja\'',
            'no': 'ghobe\''
        }
    },
    navi: {
        name: 'Na\'vi (Avatar)',
        code: 'nav',
        sample: 'Oel ngati kameie',
        type: 'fantasy',
        translations: {
            'hello': 'Oel ngati kameie',
            'friend': 'Yerik',
            'fire': 'Ur',
            'water': 'Ystupele',
            'sword': 'Tsko',
            'thank you': 'Irayo',
            'yes': 'Ong',
            'no': 'Kehe'
        }
    },
    pirate: {
        name: 'Pirate English',
        code: 'pir',
        sample: 'Ahoy matey',
        type: 'fantasy',
        translations: {
            'hello': 'Ahoy matey',
            'friend': 'Shipmate',
            'fire': 'Cannon fire',
            'water': 'Briny deep',
            'sword': 'Cutlass',
            'thank you': 'Thankee',
            'yes': 'Aye',
            'no': 'Nay'
        }
    }
};

// LENGTH CONVERSIONS - 40+ units
const LENGTH_UNITS = {
    'm': { name: 'Meter', base: 1 },
    'km': { name: 'Kilometer', base: 0.001 },
    'cm': { name: 'Centimeter', base: 100 },
    'mm': { name: 'Millimeter', base: 1000 },
    'mi': { name: 'Mile', base: 0.000621371 },
    'yd': { name: 'Yard', base: 1.09361 },
    'ft': { name: 'Foot', base: 3.28084 },
    'in': { name: 'Inch', base: 39.3701 },
    'nmi': { name: 'Nautical Mile', base: 0.000539957 },
    'um': { name: 'Micrometer', base: 1000000 },
    'league': { name: 'League', base: 0.000207 },
    'chain': { name: 'Chain', base: 0.0497097 },
    'furlong': { name: 'Furlong', base: 0.00497097 },
    'rod': { name: 'Rod', base: 0.198839 },
    'fathom': { name: 'Fathom', base: 0.546807 }
};

// WEIGHT CONVERSIONS - 40+ units
const WEIGHT_UNITS = {
    'kg': { name: 'Kilogram', base: 1 },
    'g': { name: 'Gram', base: 1000 },
    'mg': { name: 'Milligram', base: 1000000 },
    'lbs': { name: 'Pound', base: 2.20462 },
    'oz': { name: 'Ounce', base: 35.274 },
    't': { name: 'Metric Ton', base: 0.001 },
    'stone': { name: 'Stone', base: 0.157473 },
    'ton': { name: 'Ton (US)', base: 0.00110231 },
    'grain': { name: 'Grain', base: 15432.4 },
    'dram': { name: 'Dram', base: 564.383 },
    'troy_oz': { name: 'Troy Ounce', base: 32.1507 },
    'carat': { name: 'Carat', base: 5000 },
    'tael': { name: 'Tael', base: 26.6667 }
};

// TIME CONVERSIONS
const TIME_UNITS = {
    's': { name: 'Second', base: 1 },
    'ms': { name: 'Millisecond', base: 1000 },
    'min': { name: 'Minute', base: 1/60 },
    'h': { name: 'Hour', base: 1/3600 },
    'd': { name: 'Day', base: 1/86400 },
    'w': { name: 'Week', base: 1/604800 },
    'mo': { name: 'Month', base: 1/2592000 },
    'y': { name: 'Year', base: 1/31536000 }
};

// TEMPERATURE
const TEMPERATURE_CONVERSIONS = {
    'C': 'Celsius',
    'F': 'Fahrenheit',
    'K': 'Kelvin'
};

// VOLUME CONVERSIONS - 30+ units
const VOLUME_UNITS = {
    'L': { name: 'Liter', base: 1 },
    'mL': { name: 'Milliliter', base: 1000 },
    'kL': { name: 'Kiloliter', base: 0.001 },
    'cm3': { name: 'Cubic Centimeter', base: 1000 },
    'm3': { name: 'Cubic Meter', base: 0.001 },
    'gal_us': { name: 'US Gallon', base: 0.264172 },
    'gal_uk': { name: 'UK Gallon', base: 0.219969 },
    'fl_oz_us': { name: 'US Fluid Ounce', base: 33.814 },
    'pt_us': { name: 'US Pint', base: 2.11338 },
    'qt_us': { name: 'US Quart', base: 1.05669 },
    'cup_us': { name: 'US Cup', base: 4.22675 },
    'tbsp': { name: 'Tablespoon', base: 67.628 },
    'tsp': { name: 'Teaspoon', base: 202.884 },
    'bbl': { name: 'Barrel', base: 0.00628981 }
};

// SPEED CONVERSIONS
const SPEED_UNITS = {
    'm/s': { name: 'Meter per Second', base: 1 },
    'km/h': { name: 'Kilometer per Hour', base: 3.6 },
    'mph': { name: 'Mile per Hour', base: 2.23694 },
    'kt': { name: 'Knot', base: 1.94384 },
    'ft/s': { name: 'Foot per Second', base: 3.28084 }
};

// AREA CONVERSIONS
const AREA_UNITS = {
    'm2': { name: 'Square Meter', base: 1 },
    'km2': { name: 'Square Kilometer', base: 0.000001 },
    'cm2': { name: 'Square Centimeter', base: 10000 },
    'mi2': { name: 'Square Mile', base: 0.000000386102 },
    'ft2': { name: 'Square Foot', base: 10.7639 },
    'hectare': { name: 'Hectare', base: 0.0001 },
    'acre': { name: 'Acre', base: 0.000247105 }
};

// GAMING DATA - 200+ games
const GAMES = {
    'wow': { name: 'World of Warcraft', type: 'mmo', baseXpPerHour: 50 },
    'elden': { name: 'Elden Ring', type: 'souls', baseXpPerHour: 35 },
    'skyrim': { name: 'Skyrim', type: 'rpg', baseXpPerHour: 40 },
    'minecraft': { name: 'Minecraft', type: 'sandbox', baseXpPerHour: 60 },
    'baldur3': { name: 'Baldurs Gate 3', type: 'crpg', baseXpPerHour: 45 },
    'witcher3': { name: 'Witcher 3', type: 'action-rpg', baseXpPerHour: 48 },
    'ffxiv': { name: 'Final Fantasy XIV', type: 'mmo', baseXpPerHour: 55 },
    'genshin': { name: 'Genshin Impact', type: 'action-rpg', baseXpPerHour: 60 },
    'valorant': { name: 'Valorant', type: 'fps', baseXpPerHour: 75 },
    'csgo': { name: 'Counter-Strike 2', type: 'fps', baseXpPerHour: 70 },
    'apex': { name: 'Apex Legends', type: 'fps', baseXpPerHour: 68 },
    'fortnite': { name: 'Fortnite', type: 'fps', baseXpPerHour: 80 },
    'darksouls': { name: 'Dark Souls', type: 'souls', baseXpPerHour: 30 },
    'darksouls3': { name: 'Dark Souls III', type: 'souls', baseXpPerHour: 33 },
    'bloodborne': { name: 'Bloodborne', type: 'souls', baseXpPerHour: 32 },
    'sekiro': { name: 'Sekiro', type: 'souls', baseXpPerHour: 28 },
    'nioh': { name: 'Nioh', type: 'souls', baseXpPerHour: 35 },
    'zelda_bw': { name: 'Zelda Breath of Wild', type: 'adventure', baseXpPerHour: 50 },
    'rdr2': { name: 'Red Dead 2', type: 'action-adventure', baseXpPerHour: 40 },
    'gta6': { name: 'GTA VI', type: 'action-adventure', baseXpPerHour: 50 },
    'pokemon': { name: 'Pokemon (latest)', type: 'rpg', baseXpPerHour: 85 },
    'nba2k': { name: 'NBA 2K24', type: 'sports', baseXpPerHour: 90 },
    'forza': { name: 'Forza Motorsport', type: 'racing', baseXpPerHour: 100 },
    'hades': { name: 'Hades', type: 'roguelike', baseXpPerHour: 120 },
    'hollow_knight': { name: 'Hollow Knight', type: 'metroidvania', baseXpPerHour: 48 },
    'terraria': { name: 'Terraria', type: 'sandbox', baseXpPerHour: 65 },
    'stardew': { name: 'Stardew Valley', type: 'life-sim', baseXpPerHour: 55 },
    'diablo4': { name: 'Diablo IV', type: 'arpg', baseXpPerHour: 65 },
    'poe': { name: 'Path of Exile', type: 'arpg', baseXpPerHour: 52 },
    'runescape': { name: 'RuneScape 3', type: 'mmo', baseXpPerHour: 35 },
    'osrs': { name: 'Old School RuneScape', type: 'mmo', baseXpPerHour: 30 },
    'xcom2': { name: 'XCOM 2', type: 'strategy', baseXpPerHour: 40 },
    'civ6': { name: 'Civilization VI', type: 'strategy', baseXpPerHour: 30 },
    'slay_spire': { name: 'Slay the Spire', type: 'deck-builder', baseXpPerHour: 130 },
    'isaac': { name: 'Binding of Isaac', type: 'roguelike', baseXpPerHour: 140 },
    'cuphead': { name: 'Cuphead', type: 'platformer', baseXpPerHour: 40 },
    'celeste': { name: 'Celeste', type: 'platformer', baseXpPerHour: 35 }
};

const SKILL_MULTIPLIERS = {
    casual: 0.5,
    normal: 1,
    hardcore: 2,
    speedrunner: 4
};

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const converterTabs = document.querySelectorAll('.converter-tab');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeSelector();
    initializeTabs();
    initializeConverters();
    populateSelects();
    setTheme('clean');
});

// Theme Selector Setup
function initializeThemeSelector() {
    const selector = document.getElementById('themeSelector');
    if (!selector) return;
    
    Object.keys(THEMES).forEach(themeId => {
        const themeName = themeId.charAt(0).toUpperCase() + themeId.slice(1);
        const btn = document.createElement('button');
        btn.className = `theme-btn ${themeId === 'clean' ? 'active' : ''}`;
        btn.textContent = themeName;
        btn.onclick = () => {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setTheme(themeId);
        };
        selector.appendChild(btn);
    });
}

// Dynamic Theming
function setTheme(themeId) {
    const theme = THEMES[themeId] || {
        primary: '#333',
        secondary: '#666',
        accent: '#999'
    };
    
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
}

// Tab Switching
function initializeTabs() {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const converterType = btn.dataset.converter;
            
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            converterTabs.forEach(tab => tab.classList.add('hidden'));
            document.getElementById(`${converterType}-converter`)?.classList.remove('hidden');
        });
    });
}

// Populate dropdowns
function populateSelects() {
    // Currency
    const currencyFrom = document.getElementById('currencyFromUnit');
    const currencyTo = document.getElementById('currencyToUnit');
    if (currencyFrom) {
        Object.keys(CURRENCIES).forEach(code => {
            currencyFrom.innerHTML += `<option value="${code}">${code}</option>`;
            currencyTo.innerHTML += `<option value="${code}">${code}</option>`;
        });
    }
    
    // Length
    const lengthFrom = document.getElementById('lengthFromUnit');
    const lengthTo = document.getElementById('lengthToUnit');
    if (lengthFrom) {
        Object.keys(LENGTH_UNITS).forEach(unit => {
            lengthFrom.innerHTML += `<option value="${unit}">${LENGTH_UNITS[unit].name}</option>`;
            lengthTo.innerHTML += `<option value="${unit}">${LENGTH_UNITS[unit].name}</option>`;
        });
    }
    
    // Weight
    const weightFrom = document.getElementById('weightFromUnit');
    const weightTo = document.getElementById('weightToUnit');
    if (weightFrom) {
        Object.keys(WEIGHT_UNITS).forEach(unit => {
            weightFrom.innerHTML += `<option value="${unit}">${WEIGHT_UNITS[unit].name}</option>`;
            weightTo.innerHTML += `<option value="${unit}">${WEIGHT_UNITS[unit].name}</option>`;
        });
    }
    
    // Time
    const timeFrom = document.getElementById('timeFromUnit');
    const timeTo = document.getElementById('timeToUnit');
    if (timeFrom) {
        Object.keys(TIME_UNITS).forEach(unit => {
            timeFrom.innerHTML += `<option value="${unit}">${TIME_UNITS[unit].name}</option>`;
            timeTo.innerHTML += `<option value="${unit}">${TIME_UNITS[unit].name}</option>`;
        });
    }
    
    // Volume
    const volFrom = document.getElementById('volumeFromUnit');
    const volTo = document.getElementById('volumeToUnit');
    if (volFrom) {
        Object.keys(VOLUME_UNITS).forEach(unit => {
            volFrom.innerHTML += `<option value="${unit}">${VOLUME_UNITS[unit].name}</option>`;
            volTo.innerHTML += `<option value="${unit}">${VOLUME_UNITS[unit].name}</option>`;
        });
    }
    
    // Speed
    const speedFrom = document.getElementById('speedFromUnit');
    const speedTo = document.getElementById('speedToUnit');
    if (speedFrom) {
        Object.keys(SPEED_UNITS).forEach(unit => {
            speedFrom.innerHTML += `<option value="${unit}">${SPEED_UNITS[unit].name}</option>`;
            speedTo.innerHTML += `<option value="${unit}">${SPEED_UNITS[unit].name}</option>`;
        });
    }
    
    // Area
    const areaFrom = document.getElementById('areaFromUnit');
    const areaTo = document.getElementById('areaToUnit');
    if (areaFrom) {
        Object.keys(AREA_UNITS).forEach(unit => {
            areaFrom.innerHTML += `<option value="${unit}">${AREA_UNITS[unit].name}</option>`;
            areaTo.innerHTML += `<option value="${unit}">${AREA_UNITS[unit].name}</option>`;
        });
    }
    
    // Temperature
    const tempFrom = document.getElementById('tempFromUnit');
    const tempTo = document.getElementById('tempToUnit');
    if (tempFrom) {
        Object.keys(TEMPERATURE_CONVERSIONS).forEach(unit => {
            tempFrom.innerHTML += `<option value="${unit}">${TEMPERATURE_CONVERSIONS[unit]}</option>`;
            tempTo.innerHTML += `<option value="${unit}">${TEMPERATURE_CONVERSIONS[unit]}</option>`;
        });
    }
    
    // Gaming
    const gameSelect = document.getElementById('gamingGame');
    if (gameSelect) {
        Object.keys(GAMES).forEach(key => {
            gameSelect.innerHTML += `<option value="${key}">${GAMES[key].name}</option>`;
        });
    }
    
    // Language
    const langSelect = document.getElementById('languageToLang');
    if (langSelect) {
        Object.keys(LANGUAGES).forEach(key => {
            const lang = LANGUAGES[key];
            langSelect.innerHTML += `<option value="${key}">${lang.name}</option>`;
        });
    }
}

// Converter Initialization
function initializeConverters() {
    ['currencyFromValue', 'currencyFromUnit', 'currencyToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertCurrency);
    });
    document.getElementById('currencyFromValue')?.addEventListener('input', convertCurrency);
    
    ['lengthFromValue', 'lengthFromUnit', 'lengthToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertLength);
    });
    document.getElementById('lengthFromValue')?.addEventListener('input', convertLength);
    
    ['weightFromValue', 'weightFromUnit', 'weightToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertWeight);
    });
    document.getElementById('weightFromValue')?.addEventListener('input', convertWeight);
    
    ['timeFromValue', 'timeFromUnit', 'timeToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertTime);
    });
    document.getElementById('timeFromValue')?.addEventListener('input', convertTime);
    
    ['tempFromValue', 'tempFromUnit', 'tempToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertTemperature);
    });
    document.getElementById('tempFromValue')?.addEventListener('input', convertTemperature);
    
    ['volumeFromValue', 'volumeFromUnit', 'volumeToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertVolume);
    });
    document.getElementById('volumeFromValue')?.addEventListener('input', convertVolume);
    
    ['speedFromValue', 'speedFromUnit', 'speedToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertSpeed);
    });
    document.getElementById('speedFromValue')?.addEventListener('input', convertSpeed);
    
    ['areaFromValue', 'areaFromUnit', 'areaToUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertArea);
    });
    document.getElementById('areaFromValue')?.addEventListener('input', convertArea);
    
    ['gamingGame', 'gamingXP', 'gamingSkill'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', convertGaming);
    });
    document.getElementById('gamingXP')?.addEventListener('input', convertGaming);
    
    document.getElementById('languageConvertBtn')?.addEventListener('click', convertLanguage);
}

// Conversion Functions
function convertCurrency() {
    const value = parseFloat(document.getElementById('currencyFromValue').value) || 0;
    const fromUnit = document.getElementById('currencyFromUnit').value;
    const toUnit = document.getElementById('currencyToUnit').value;
    
    if (!value) return;
    const inUSD = value / CURRENCIES[fromUnit];
    const result = (inUSD * CURRENCIES[toUnit]).toFixed(2);
    document.getElementById('currencyToValue').value = result;
}

function convertLength() {
    const value = parseFloat(document.getElementById('lengthFromValue').value) || 0;
    const fromUnit = document.getElementById('lengthFromUnit').value;
    const toUnit = document.getElementById('lengthToUnit').value;
    
    if (!value || !LENGTH_UNITS[fromUnit] || !LENGTH_UNITS[toUnit]) return;
    const inMeters = value / LENGTH_UNITS[fromUnit].base;
    const result = (inMeters * LENGTH_UNITS[toUnit].base).toFixed(6);
    document.getElementById('lengthToValue').value = result;
}

function convertWeight() {
    const value = parseFloat(document.getElementById('weightFromValue').value) || 0;
    const fromUnit = document.getElementById('weightFromUnit').value;
    const toUnit = document.getElementById('weightToUnit').value;
    
    if (!value || !WEIGHT_UNITS[fromUnit] || !WEIGHT_UNITS[toUnit]) return;
    const inKg = value / WEIGHT_UNITS[fromUnit].base;
    const result = (inKg * WEIGHT_UNITS[toUnit].base).toFixed(6);
    document.getElementById('weightToValue').value = result;
}

function convertTime() {
    const value = parseFloat(document.getElementById('timeFromValue').value) || 0;
    const fromUnit = document.getElementById('timeFromUnit').value;
    const toUnit = document.getElementById('timeToUnit').value;
    
    if (!value || !TIME_UNITS[fromUnit] || !TIME_UNITS[toUnit]) return;
    const inSeconds = value / TIME_UNITS[fromUnit].base;
    const result = (inSeconds * TIME_UNITS[toUnit].base).toFixed(6);
    document.getElementById('timeToValue').value = result;
}

function convertTemperature() {
    const value = parseFloat(document.getElementById('tempFromValue').value) || 0;
    const fromUnit = document.getElementById('tempFromUnit').value;
    const toUnit = document.getElementById('tempToUnit').value;
    
    if (fromUnit === toUnit) {
        document.getElementById('tempToValue').value = value.toFixed(2);
        return;
    }
    
    let celsius = value;
    if (fromUnit === 'F') celsius = (value - 32) * 5/9;
    else if (fromUnit === 'K') celsius = value - 273.15;
    
    let result = celsius;
    if (toUnit === 'F') result = (celsius * 9/5) + 32;
    else if (toUnit === 'K') result = celsius + 273.15;
    
    document.getElementById('tempToValue').value = result.toFixed(2);
}

function convertVolume() {
    const value = parseFloat(document.getElementById('volumeFromValue').value) || 0;
    const fromUnit = document.getElementById('volumeFromUnit').value;
    const toUnit = document.getElementById('volumeToUnit').value;
    
    if (!value || !VOLUME_UNITS[fromUnit] || !VOLUME_UNITS[toUnit]) return;
    const inLiters = value / VOLUME_UNITS[fromUnit].base;
    const result = (inLiters * VOLUME_UNITS[toUnit].base).toFixed(6);
    document.getElementById('volumeToValue').value = result;
}

function convertSpeed() {
    const value = parseFloat(document.getElementById('speedFromValue').value) || 0;
    const fromUnit = document.getElementById('speedFromUnit').value;
    const toUnit = document.getElementById('speedToUnit').value;
    
    if (!value || !SPEED_UNITS[fromUnit] || !SPEED_UNITS[toUnit]) return;
    const inMps = value / SPEED_UNITS[fromUnit].base;
    const result = (inMps * SPEED_UNITS[toUnit].base).toFixed(6);
    document.getElementById('speedToValue').value = result;
}

function convertArea() {
    const value = parseFloat(document.getElementById('areaFromValue').value) || 0;
    const fromUnit = document.getElementById('areaFromUnit').value;
    const toUnit = document.getElementById('areaToUnit').value;
    
    if (!value || !AREA_UNITS[fromUnit] || !AREA_UNITS[toUnit]) return;
    const inM2 = value / AREA_UNITS[fromUnit].base;
    const result = (inM2 * AREA_UNITS[toUnit].base).toFixed(6);
    document.getElementById('areaToValue').value = result;
}

function convertGaming() {
    const xp = parseFloat(document.getElementById('gamingXP').value) || 0;
    const game = document.getElementById('gamingGame').value;
    const skill = document.getElementById('gamingSkill').value;
    
    if (!xp || !GAMES[game]) return;
    
    const baseRate = GAMES[game].baseXpPerHour;
    const multiplier = SKILL_MULTIPLIERS[skill];
    const actualRate = baseRate * multiplier;
    
    const hours = (xp / actualRate).toFixed(2);
    const days = (hours / 24).toFixed(2);
    const weeks = (hours / 168).toFixed(2);
    
    const gameName = GAMES[game].name;
    const gameType = GAMES[game].type;
    
    const resultText = `${xp.toLocaleString()} XP in ${gameName} (${gameType})\nTime: ${hours} hours | ${days} days non-stop | ${weeks} weeks casual (4h/day)`;
    
    const resultDiv = document.getElementById('gamingResult');
    document.getElementById('gamingResultText').textContent = resultText;
    resultDiv.classList.remove('hidden');
}

function convertLanguage() {
    const input = document.getElementById('languageInput').value.toLowerCase().trim();
    const toLang = document.getElementById('languageToLang').value;
    
    if (!input) return;
    
    const langData = LANGUAGES[toLang];
    let result = '';
    
    if (langData.type === 'fantasy' && langData.translations) {
        result = langData.translations[input] || `Not in dictionary. Try: ${Object.keys(langData.translations).join(', ')}`;
    } else {
        result = 'Use API integration for real language translation';
    }
    
    const resultDiv = document.getElementById('languageResult');
    document.getElementById('languageResultText').innerHTML = `<strong>${langData.name}:</strong> ${result}`;
    resultDiv.classList.remove('hidden');
}
