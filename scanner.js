// Cazachollos — motor de búsqueda y filtrado (Wallapop + Vinted)
// Sin inteligencia artificial: reglas fijas, 0 tokens.

export const MURCIA = { lat: 37.9922, lon: -1.1307 };

export const DEFAULT_SETTINGS = {
  minDiscount: 15,          // % mínimo bajo la mediana para mostrar
  goodDiscount: 20,         // % para tier A
  greatDiscount: 30,        // % para tier S
  intervalMin: 30,          // cada 30 min
  autoLocal: true,          // búsqueda automática en este PC cada 30 min
  githubUser: "",           // usuario de GitHub para ver los chollos de la nube
  localRadiusKm: 50,        // venta en mano: solo cerca de Murcia
  useWallapop: true,
  useVinted: true,
  allowForeignVinted: true, // Vinted fuera de España (siempre con envío)
  telegramToken: "",
  telegramChatId: "",
  desktopNotifications: true,
  paused: false,
  useShops: true,           // ofertas de tiendas (Chollómetro)
  dailySummary: true,       // resumen diario por Telegram a las 21:00
  telegramMinTier: "B",     // tier mínimo que se manda a Telegram
};

// nombre, palabras, min, max, debe contener, no debe contener, categoría Wallapop, estricto (anti-estafa reforzado)
const ACC = "funda|carcasa|protector|cristal templado|cargador|cable|soporte|correa|pegatina|skin|vinilo|piezas|despiece|placa base|repuesto";
const PHONE_X = ACC + "|pantalla (nueva|de repuesto|original)|bater[ií]a (nueva|de repuesto|para)|tapa trasera|chasis|c[aá]mara trasera|coque";
export const DEFAULT_SEARCHES = [
  { id: "switch", name: "Nintendo Switch", kw: "nintendo switch consola", min: 50, max: 250, incl: "switch", excl: "switch ?2|lite|oled|amiibo|pro controller|mando pro|dock solo|solo dock|base dock|" + ACC, cat: "Consolas", strict: false, on: true },
  { id: "oled", name: "Switch OLED", kw: "nintendo switch oled", min: 100, max: 350, incl: "oled", excl: "switch ?2|dock solo|solo dock|base dock|" + ACC, cat: "Consolas", strict: false, on: true },
  { id: "lite", name: "Switch Lite", kw: "nintendo switch lite", min: 45, max: 180, incl: "lite", excl: ACC, cat: "Consolas", strict: false, on: true },
  { id: "switch2", name: "Nintendo Switch 2", kw: "nintendo switch 2", min: 220, max: 600, incl: "switch ?2", excl: "camera|c[aá]mara|mando|" + ACC, cat: "Consolas", strict: true, on: true },
  { id: "ps5", name: "PS5", kw: "ps5 consola", min: 180, max: 600, incl: "ps5|playstation 5", excl: "mando|volante|cascos|portal|\\bvr\\b|disco duro|ssd|lector (de )?disco|unidad de disco|" + ACC, cat: "Consolas", strict: true, on: true },
  { id: "ip12", name: "iPhone 12", kw: "iphone 12", min: 80, max: 300, incl: "iphone 12", excl: "pro|plus|max|mini|" + PHONE_X, cat: "Smartphones", strict: false, on: true },
  { id: "ip13", name: "iPhone 13", kw: "iphone 13", min: 120, max: 400, incl: "iphone 13", excl: "pro|plus|max|mini|" + PHONE_X, cat: "Smartphones", strict: false, on: true },
  { id: "ip13p", name: "iPhone 13 Pro", kw: "iphone 13 pro", min: 200, max: 550, incl: "iphone 13 pro", excl: "max|" + PHONE_X, cat: "Smartphones", strict: false, on: true },
  { id: "ip14", name: "iPhone 14", kw: "iphone 14", min: 160, max: 450, incl: "iphone 14", excl: "pro|plus|max|mini|" + PHONE_X, cat: "Smartphones", strict: false, on: true },
  { id: "ip14p", name: "iPhone 14 Pro", kw: "iphone 14 pro", min: 250, max: 650, incl: "iphone 14 pro", excl: "max|" + PHONE_X, cat: "Smartphones", strict: false, on: true },
  { id: "ip15", name: "iPhone 15", kw: "iphone 15", min: 220, max: 600, incl: "iphone 15", excl: "pro|plus|max|mini|" + PHONE_X, cat: "Smartphones", strict: false, on: true },
  { id: "ip15p", name: "iPhone 15 Pro", kw: "iphone 15 pro", min: 320, max: 800, incl: "iphone 15 pro", excl: "max|" + PHONE_X, cat: "Smartphones", strict: false, on: true },
  { id: "airpodspro", name: "AirPods Pro", kw: "airpods pro", min: 50, max: 250, incl: "airpods pro", excl: "max|solo (el )?(estuche|izquierdo|derecho|auricular)|estuche solo|auricular (izquierdo|derecho)|almohadillas|gomas|" + ACC, cat: null, strict: true, on: true },
  { id: "airpods", name: "AirPods", kw: "airpods", min: 30, max: 180, incl: "airpods", excl: "pro|max|solo (el )?(estuche|izquierdo|derecho|auricular)|estuche solo|auricular (izquierdo|derecho)|" + ACC, cat: null, strict: true, on: true },
  { id: "watchse", name: "Apple Watch SE", kw: "apple watch se", min: 50, max: 250, incl: "apple watch se", excl: ACC, cat: null, strict: false, on: true },
  { id: "watch8", name: "Apple Watch Series 8/9", kw: "apple watch series", min: 100, max: 450, incl: "series (8|9)|s ?(8|9)\\b", excl: "ultra|" + ACC, cat: null, strict: false, on: true },
  { id: "dualsense", name: "Mando PS5", kw: "mando dualsense ps5", min: 15, max: 90, incl: "mando|dualsense|manette|controller", excl: "edge|base de carga|" + ACC, cat: null, strict: false, on: false },
];

// Títulos que NO son el producto: cajas vacías, juegos sueltos, baterías sueltas…
const JUNK_TITLE = new RegExp([
  "^\\s*(solo |s[oó]lo )?caja", "caja (vac[ií]a|original de|de (la )?(consola|nintendo|switch|ps5|playstation|iphone))", "solo (la )?caja", "empty box", "\\bbox only",
  "^\\s*(video)?juegos?\\b", "^\\s*(pack de )?\\d+ juegos", "juegos? (para|de) (la )?(nintendo|switch|ps5|playstation)", "\\bgames? only",
  "^\\s*bater[ií]a", "bater[ií]a (para|de repuesto|compatible)",
  "^\\s*(mando|joy-?con|dock|base|cargador|funda|cable)s?\\b",
  "reventad", "para piezas", "\\bdespiece", "no funciona", "averiad", "bloquead", "icloud",
].join("|"), "i");

// Problemas en título o descripción (se descarta)
const RED_FLAGS = new RegExp(
  [
    // averías y daños
    "no (carga|enciende|funciona|lee|da imagen|sale imagen|reconoce|detecta|arranca|conecta)", "averiad", "estropead", "reventad", "chafad", "aplastad", "doblad",
    "pantalla (rota|partida|quebrada|agrietada|rajada|da[ñn]ada|con (una )?(raja|grieta|l[ií]nea|mancha))", "(cristal|trasera|tapa|c[aá]mara) (rot|partid|rajad|agrietad)",
    "\\brot[oa]s?\\b", "rajad", "grieta", "agrietad", "golpe fuerte", "golpead", "mojad", "le (cay[oó]|entr[oó]) agua",
    "p[ií]xel(es)? muerto", "l[ií]neas? en (la )?pantalla", "manchas? en (la )?pantalla", "pantalla (verde|rosa|negra|parpadea)", "quemad",
    "face ?id (no|falla|desactivad)", "true ?tone (no|desactivad)", "pieza desconocida", "(pantalla|bater[ií]a) no original", "reparad[oa] (con|en)",
    "se (apaga|reinicia|calienta mucho|cuelga)", "sobrecalienta", "ventilador (ruidoso|hace (mucho )?ruido)", "hdmi (roto|no funciona|da[ñn]ado)",
    "lector (no funciona|no lee|roto)", "joy-?cons? (rot|no funciona)", "drift (fuerte|grave|muy|mucho)", "error (de|al) (sistema|arranque|encender)",
    // bloqueos y legales
    "para piezas", "despiece", "bloquead", "icloud", "baneada", "\\bban\\b", "lista negra", "reportad", "imei (bloq|malo)", "sin factura ni",
    // falsificaciones / no es el producto
    "r[eé]plica", "1:1", "\\bclon", "imitaci", "copia (exacta|china)", "caja vac", "solo caja", "solo (el )?mando", "solo (la )?pantalla",
    "reparar", "a reparar", "hors service", "\\bhs\\b", "il manque", "\\bmanca\\b", "missing",
    // pagos fuera / estafas
    "whats ?app", "telegram", "bizum", "transferencia", "virement", "paypal", "contacta(me)? (por|al)", "escr[ií]beme (al|por) ",
    "no leemos", "mitad por adelantado", "adelantado", "env[ií]o (solo|s[oó]lo) (por|con) (correos|seur) pagando",
    "\\+3\\d{9,}", "\\b[67]\\d{2}[ .]?\\d{3}[ .]?\\d{3}\\b",
  ].join("|"),
  "i"
);

// Frases negadas que NO son problema ("sin golpes", "no tiene arañazos", "ningún fallo"…)
const NEGATED = /\b(sin|ning[uú]n[oa]?s?|ni|no (tiene|presenta|hay)( ning[uú]n[oa]?)?)\s+(\w+\s+){0,2}?(golpes?|roturas?|rot[oa]s?|fallos?|defectos?|ara[ñn]azos?|grietas?|rajas?|problemas?|averias?|aver[ií]as?|manchas?|p[ií]xeles?|drift|bloqueos?|marcas?)\b/gi;
export function clean(text) { return String(text || "").replace(NEGATED, " ").replace(/\s+/g, " "); }

// Defectos que SÍ acepta Yoel: arañazos leves, sin caja/accesorios, drift leve
export function hasProblem(text, s) {
  const t = clean(text);
  if (RED_FLAGS.test(t)) return true;
  // iPhone: batería por debajo del 86 % → fuera
  if (/iphone/i.test(s?.kw || "")) {
    const m = t.match(/(bater[ií]a|salud|battery|condici[oó]n)[^0-9%]{0,25}(\d{2,3}) ?%/i) || t.match(/(\d{2,3}) ?% (de )?(bater[ií]a|salud)/i);
    const pct = m ? parseInt(m[2] && /^\d+$/.test(m[2]) ? m[2] : m[1], 10) : null;
    if (pct && pct >= 50 && pct <= 85) return true;
  }
  return false;
}
export function isJunkTitle(title, s) {
  const t = clean(title);
  if (s?.id === "dualsense") return /^\s*(solo |s[oó]lo )?caja|reventad|para piezas|no funciona|averiad/i.test(t);
  return JUNK_TITLE.test(t);
}

const H_WALLA = { "X-DeviceOS": "0", Accept: "application/json, text/plain, */*" };
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let MARKET = null; // se rellena durante runScan: [{search, platform, median, count}]

export function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  if (!s.length) return 0;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function distanceKm(a, b) {
  const R = 6371, toR = (x) => (x * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat), dLon = toR(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// ------------------------------- WALLAPOP -------------------------------
export async function wallapopSearch(s, pages = 6) {
  let url = `https://api.wallapop.com/api/v3/search?source=search_box&keywords=${encodeURIComponent(s.kw)}&order_by=newest&min_sale_price=${s.min}&max_sale_price=${s.max}&latitude=${MURCIA.lat}&longitude=${MURCIA.lon}`;
  const out = [];
  for (let p = 0; p < pages && url; p++) {
    const r = await fetch(url, { headers: H_WALLA });
    if (!r.ok) throw new Error("Wallapop respondió " + r.status);
    const j = await r.json();
    out.push(...(j?.data?.section?.payload?.items || []));
    const np = j?.meta?.next_page;
    url = np ? `https://api.wallapop.com/api/v3/search?next_page=${encodeURIComponent(np)}` : null;
    await sleep(600);
  }
  return out;
}

const wUserCache = new Map();
export async function wallapopUser(id) {
  if (wUserCache.has(id)) return wUserCache.get(id);
  const [u, s] = await Promise.all([
    fetch(`https://api.wallapop.com/api/v3/users/${id}`, { headers: H_WALLA }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    fetch(`https://api.wallapop.com/api/v3/users/${id}/stats`, { headers: H_WALLA }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
  ]);
  const c = Object.fromEntries((s?.counters || []).map((x) => [x.type, x.value]));
  const info = {
    days: u?.register_date ? Math.floor((Date.now() - u.register_date) / 864e5) : -1,
    reviews: c.reviews || 0,
    sells: c.sells || 0,
    listed: c.publish || 0,
    stars: s?.ratings?.[0]?.value ? s.ratings[0].value / 20 : 0,
    name: u?.micro_name || "",
  };
  wUserCache.set(id, info);
  await sleep(300);
  return info;
}

// Reglas de confianza Wallapop (las que pidió Yoel)
export function wallapopTrust(u, strict) {
  if (u.days >= 0 && u.days <= 7) return { ok: false, why: "cuenta creada hace " + u.days + " días" };
  if (strict) {
    // PS5 / Switch 2: patrón de estafa = cuenta nueva, 0 reseñas, 1-3 productos
    if (u.reviews === 0 && u.listed <= 3 && u.days < 60) return { ok: false, why: "patrón de estafa (cuenta reciente, sin reseñas, pocos productos)" };
    if (u.reviews >= 2) return { ok: true, why: `${u.reviews} valoraciones` };
    if (u.days >= 365) return { ok: true, why: `cuenta de ${Math.floor(u.days / 365)} año(s)` };
    return { ok: false, why: "pocas valoraciones para producto de riesgo" };
  }
  if (u.reviews >= 1 || u.sells >= 1) return { ok: true, why: `${u.reviews} valoraciones` };
  if (u.days >= 180) return { ok: true, why: `sin valoraciones pero cuenta de ${Math.round(u.days / 30)} meses` };
  return { ok: false, why: "sin valoraciones y cuenta reciente" };
}

async function scanWallapop(s, cfg, seen, log) {
  const raw = await wallapopSearch(s);
  const incl = new RegExp(s.incl, "i"), excl = new RegExp(s.excl, "i");
  const ids = new Set();
  const list = raw.filter((i) => {
    if (ids.has(i.id)) return false;
    ids.add(i.id);
    if (i?.location?.country_code !== "ES") return false;
    if (i?.reserved?.flag) return false;
    if (!incl.test(i.title) || excl.test(i.title) || isJunkTitle(i.title, s)) return false;
    if (s.cat && !(i.taxonomy || []).some((t) => t.name === s.cat || (s.cat === "Smartphones" && /Móviles|Smartphones/.test(t.name)))) return false;
    return true;
  });
  if (list.length < 8) { log(`Wallapop · ${s.name}: pocos anuncios (${list.length}), salto`); return []; }
  const med = median(list.map((i) => i.price.amount));
  MARKET?.push({ search: s.name, platform: "Wallapop", median: Math.round(med), count: list.length, low: Math.round(median(list.map((i) => i.price.amount).sort((a, b) => a - b).slice(0, Math.max(1, Math.floor(list.length / 4))))) });
  const deals = [];
  const cands = list
    .filter((i) => i.price.amount <= med * (1 - cfg.minDiscount / 100))
    .filter((i) => !hasProblem(i.title + " " + (i.description || ""), s))
    .filter((i) => !seen["w" + i.id])
    .sort((a, b) => a.price.amount - b.price.amount)
    .slice(0, 12);
  for (const i of cands) {
    seen["w" + i.id] = Date.now();
    const ship = !!i?.shipping?.user_allows_shipping;
    const dist = i.location?.latitude ? distanceKm(MURCIA, { lat: i.location.latitude, lon: i.location.longitude }) : 9999;
    if (!ship && dist > cfg.localRadiusKm) continue; // en mano solo cerca de Murcia
    const u = await wallapopUser(i.user_id);
    const t = wallapopTrust(u, s.strict);
    if (!t.ok) { log(`Descartado (${s.name}): ${i.title.slice(0, 40)} — ${t.why}`); continue; }
    const disc = Math.round((1 - i.price.amount / med) * 100);
    deals.push({
      key: "w" + i.id, platform: "Wallapop", search: s.name, title: i.title, price: i.price.amount, median: Math.round(med), discount: disc,
      url: `https://es.wallapop.com/item/${i.web_slug}`, img: i.images?.[0]?.urls?.medium || i.images?.[0]?.urls?.small || "",
      city: i.location?.city || "", country: "ES", ship, distKm: Math.round(dist),
      seller: { name: u.name, reviews: u.reviews, stars: u.stars, days: u.days, why: t.why },
      found: Date.now(),
    });
  }
  log(`Wallapop · ${s.name}: ${list.length} anuncios, mediana ${Math.round(med)} €, ${deals.length} chollos nuevos`);
  return deals;
}

// -------------------------------- VINTED --------------------------------
export function unescapeHtmlJson(h) { return h.replace(/\\"/g, '"').replace(/\\u0026/g, "&"); }

function parseVintedCatalog(html) {
  const h = unescapeHtmlJson(html);
  const items = [];
  const re = /"productItem":\{"id":(\d+),"title":"((?:[^"\\]|\\.)*)","url":"([^"]+)"[\s\S]*?"price":\{"amount":"([\d.]+)"[\s\S]*?"thumbnailUrl":"([^"]*)"[\s\S]*?"user":\{"id":(\d+)/g;
  let m;
  while ((m = re.exec(h))) {
    items.push({ id: m[1], title: m[2], url: "https://www.vinted.es" + m[3], price: parseFloat(m[4]), img: m[5], userId: m[6] });
  }
  return items;
}

async function vintedSearch(s) {
  const url = `https://www.vinted.es/catalog?search_text=${encodeURIComponent(s.kw)}&order=newest_first&price_from=${s.min}&price_to=${s.max}`;
  const r = await fetch(url, { credentials: "include" });
  if (!r.ok) throw new Error("Vinted respondió " + r.status);
  return parseVintedCatalog(await r.text());
}

const vUserCache = new Map();
let vDebugDone = false;
export async function vintedUser(id) {
  if (vUserCache.has(id)) return vUserCache.get(id);
  let info = { reviews: 0, items: 0, country: "?", city: "", name: "", rep: 0 };
  try {
    const res = await fetch(`https://www.vinted.es/member/${id}`, { credentials: "include" });
    const h = unescapeHtmlJson(await res.text());
    // ancla: objeto del perfil (con sesión: "id":ID,"login"; sin sesión: ruta /member/ID-login)
    let i = h.lastIndexOf(`"id":${id},"login"`);
    if (i < 0) i = h.indexOf(`member/${id}-`);
    if (i < 0) i = h.lastIndexOf(`"id":${id}`);
    if (!vDebugDone) { vDebugDone = true; console.log(`[debug Vinted perfil] estado ${res.status}, ${h.length} bytes, pos:${i}`); }
    const seg = i >= 0 ? h.slice(Math.max(0, i - 4000), i + 4000) : "";
    const center = Math.min(i, 4000);
    const g = (k) => {
      const re = new RegExp(`"${k}":("[^"]*"|[\\d.]+)`, "g");
      let best = null, bd = Infinity, m;
      while ((m = re.exec(seg))) { const d = Math.abs(m.index - center); if (d < bd) { bd = d; best = m[1]; } }
      return best;
    };
    const loginFromPath = (h.slice(i, i + 200).match(new RegExp(`member/${id}-([^"/?]+)`)) || [])[1];
    info = {
      name: (g("login") || loginFromPath || "").replace(/"/g, ""),
      reviews: parseInt(g("feedback_count") || "0", 10),
      rep: parseFloat(g("feedback_reputation") || "0"),
      items: parseInt(g("total_items_count") || g("item_count") || "0", 10),
      country: (g("country_iso_code") || g("country_code") || '"?"').replace(/"/g, ""),
      city: (g("city") || "").replace(/"/g, ""),
    };
  } catch (e) { /* sin datos */ }
  vUserCache.set(id, info);
  await sleep(700);
  return info;
}

export function vintedTrust(u, strict) {
  if (u.reviews >= 3 && u.rep > 0 && u.rep < 0.8) return { ok: false, why: `valoraciones malas (${(u.rep * 5).toFixed(1)}★)` };
  if (strict) {
    if (u.reviews >= 5) return { ok: true, why: `${u.reviews} valoraciones` };
    return { ok: false, why: `solo ${u.reviews} valoraciones (producto de riesgo)` };
  }
  if (u.reviews >= 3) return { ok: true, why: `${u.reviews} valoraciones` };
  if (u.reviews >= 1 && u.items >= 5) return { ok: true, why: `${u.reviews} valoraciones y ${u.items} artículos` };
  return { ok: false, why: "sin valoraciones suficientes" };
}

async function vintedDescriptionHasFlags(url, s) {
  try {
    const h = unescapeHtmlJson(await fetch(url, { credentials: "include" }).then((r) => r.text()));
    const m = h.match(/"description":"((?:[^"\\]|\\.){0,1500})"/);
    return m ? hasProblem(m[1], s) : false;
  } catch { return false; }
}

async function scanVinted(s, cfg, seen, log) {
  const raw = await vintedSearch(s);
  const incl = new RegExp(s.incl, "i"), excl = new RegExp(s.excl, "i");
  const list = raw.filter((i) => incl.test(i.title) && !excl.test(i.title) && !isJunkTitle(i.title, s));
  if (list.length < 8) { log(`Vinted · ${s.name}: pocos anuncios (${list.length}), salto`); return []; }
  const med = median(list.map((i) => i.price));
  MARKET?.push({ search: s.name, platform: "Vinted", median: Math.round(med), count: list.length });
  const deals = [];
  const cands = list
    .filter((i) => i.price <= med * (1 - cfg.minDiscount / 100) && !hasProblem(i.title, s) && !seen["v" + i.id])
    .sort((a, b) => a.price - b.price)
    .slice(0, 8);
  for (const i of cands) {
    seen["v" + i.id] = Date.now();
    const u = await vintedUser(i.userId);
    const t = vintedTrust(u, s.strict);
    if (!t.ok) { log(`Descartado Vinted (${s.name}): ${i.title.slice(0, 40)} — ${t.why}`); continue; }
    if (u.country !== "ES" && !cfg.allowForeignVinted) continue;
    if (await vintedDescriptionHasFlags(i.url, s)) { log(`Descartado Vinted: ${i.title.slice(0, 40)} — descripción sospechosa`); continue; }
    deals.push({
      key: "v" + i.id, platform: "Vinted", search: s.name, title: i.title, price: i.price, median: Math.round(med),
      discount: Math.round((1 - i.price / med) * 100), url: i.url, img: i.img, city: u.city, country: u.country, ship: true, distKm: null,
      seller: { name: u.name, reviews: u.reviews, stars: u.rep * 5, days: -1, why: t.why }, found: Date.now(),
    });
  }
  log(`Vinted · ${s.name}: ${list.length} anuncios, mediana ${Math.round(med)} €, ${deals.length} chollos nuevos`);
  return deals;
}

// ------------------------------- PUNTUACIÓN -------------------------------
export function tierOf(d, cfg) {
  if (d.discount >= cfg.greatDiscount) return "S";
  if (d.discount >= cfg.goodDiscount) return "A";
  return "B";
}

export function scoreOf(d, cfg) {
  let sc = d.discount;
  const foreign = d.country && d.country !== "ES";
  if (foreign && d.discount >= cfg.greatDiscount) sc += 10;        // chollazo de fuera con envío: prioridad
  if (!d.ship) sc += 3;                                              // en mano en Murcia: sin gastos de envío
  sc += Math.min(10, Math.log2(1 + (d.seller?.reviews || 0)) * 2);   // vendedor con historial
  return Math.round(sc);
}

export async function runScan(cfg, searches, seen, log, market) {
  MARKET = market || null;
  const all = [];
  for (const s of searches.filter((x) => x.on)) {
    if (cfg.useWallapop) {
      try { all.push(...(await scanWallapop(s, cfg, seen, log))); } catch (e) { log(`Error Wallapop · ${s.name}: ${e.message}`); }
    }
    if (cfg.useVinted) {
      try { all.push(...(await scanVinted(s, cfg, seen, log))); } catch (e) { log(`Error Vinted · ${s.name}: ${e.message}`); }
    }
  }
  for (const d of all) { d.tier = tierOf(d, cfg); d.score = scoreOf(d, cfg); }
  return all.sort((a, b) => b.score - a.score);
}


// ============================================================================
//  v3 · ANALIZADOR DE ANUNCIOS (para el panel que aparece en cada anuncio)
// ============================================================================
export function matchSearch(title, searches, price) {
  const t = String(title || "");
  const inRange = (s) => price == null || (price >= s.min * 0.5 && price <= s.max * 1.3);
  return searches.find((s) => new RegExp(s.incl, "i").test(t) && !new RegExp(s.excl, "i").test(t) && inRange(s)) || null;
}

const round5 = (x) => Math.max(5, Math.floor(x / 5) * 5);

// Datos que manda el panel: {platform, title, price, description, userId, ship, city}
export async function analyzeListing(data, searches, marketHistory, cfg) {
  const s = matchSearch(data.title, searches, data.price);
  const out = { ...data, search: s?.name || null, flags: [], verdict: "?", notes: [] };
  // 1) precio de mercado: último dato guardado o búsqueda en vivo en Wallapop
  let med = null, n = 0, source = "";
  const hist = s ? (marketHistory?.[s.name] || []) : [];
  const last = [...hist].reverse().find((p) => p.w);
  if (last && Date.now() - last.t < 3 * 864e5) { med = last.w; n = last.wn || 0; source = "último escaneo"; }
  if (!med && s) {
    try {
      const raw = await wallapopSearch(s, 2);
      const incl = new RegExp(s.incl, "i"), excl = new RegExp(s.excl, "i");
      const prices = raw.filter((i) => incl.test(i.title) && !excl.test(i.title) && !isJunkTitle(i.title, s) && !i?.reserved?.flag).map((i) => i.price.amount);
      if (prices.length >= 5) { med = Math.round(median(prices)); n = prices.length; source = "Wallapop ahora"; }
    } catch (e) { out.notes.push("No pude consultar el mercado: " + e.message); }
  }
  out.median = med; out.sample = n; out.source = source;
  // 2) problemas en el texto
  if (hasProblem(`${data.title} ${data.description || ""}`, s)) out.flags.push("La descripción menciona averías, bloqueos o pagos fuera de la app");
  if (isJunkTitle(data.title, s)) out.flags.push("Parece caja, juego suelto o pieza, no el producto completo");
  // 3) vendedor
  if (data.platform === "Wallapop" && data.userId) {
    const u = await wallapopUser(data.userId);
    const t = wallapopTrust(u, !!s?.strict);
    out.seller = { ...u, ok: t.ok, why: t.why };
  } else if (data.platform === "Vinted" && data.userId) {
    const u = await vintedUser(data.userId);
    const t = vintedTrust(u, !!s?.strict);
    out.seller = { name: u.name, reviews: u.reviews, stars: u.rep * 5, country: u.country, ok: t.ok, why: t.why };
  }
  if (out.seller && !out.seller.ok) out.flags.push("Vendedor: " + out.seller.why);
  // 4) números
  if (med && data.price) {
    out.discount = Math.round((1 - data.price / med) * 100);
    const resale = Math.round(med * 0.97);                 // vendes un pelín por debajo de la mediana para rotar rápido
    const costs = data.platform === "Vinted" ? 4 : (data.ship ? 3 : 0); // envío/protección aprox.
    out.resale = resale;
    out.profit = Math.round(resale - data.price - costs);
    out.maxBuy = round5(resale * 0.8 - costs);                // compra máxima para ganar ~20 %
    out.offer = round5(Math.min(data.price * 0.85, out.maxBuy - 5)); // primera oferta sugerida
    const tier = out.discount >= cfg.greatDiscount ? "S" : out.discount >= cfg.goodDiscount ? "A" : out.discount >= cfg.minDiscount ? "B" : "-";
    out.verdict = out.flags.length ? "RIESGO" : tier === "-" ? (data.price <= out.maxBuy ? "NEGOCIAR" : "CARO") : "TIER " + tier;
  } else {
    out.verdict = s ? "SIN DATOS" : "NO VIGILADO";
    if (!s) out.notes.push("Este producto no está en tus búsquedas; añádelo para calcular su precio de mercado.");
  }
  return out;
}

// ============================================================================
//  v3 · CHOLLÓMETRO (ofertas de tiendas → arbitraje con precio de Wallapop)
// ============================================================================
function decodeXml(s) { return String(s || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'"); }
export function parseRss(xml) {
  const items = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const b = m[1];
    const tag = (t) => decodeXml((b.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)<\\/${t}>`)) || [])[1]);
    const mer = b.match(/<pepper:merchant[^>]*name="([^"]*)"[^>]*price="([^"]*)"/) || b.match(/<pepper:merchant[^>]*price="([^"]*)"[^>]*name="([^"]*)"/);
    const priceTxt = mer ? (mer[0].match(/price="([^"]*)"/) || [])[1] : "";
    const merchant = mer ? (mer[0].match(/name="([^"]*)"/) || [])[1] : "";
    const img = (b.match(/<media:content[^>]*url="([^"]+)"/) || b.match(/<media:thumbnail[^>]*url="([^"]+)"/) || [])[1] || "";
    const price = parseFloat(String(priceTxt).replace(/[^\d,.]/g, "").replace(/\.(?=\d{3})/g, "").replace(",", "."));
    items.push({ guid: tag("guid") || tag("link"), title: tag("title"), link: tag("link"), cat: tag("category"), merchant, price: isNaN(price) ? null : price, img, date: Date.parse(tag("pubDate")) || Date.now() });
  }
  return items;
}

export async function scanChollometro(searches, marketHistory, seenShop) {
  const feeds = ["https://www.chollometro.com/rss/nuevos", "https://www.chollometro.com/rss/hot"];
  const all = [];
  for (const f of feeds) {
    try { const r = await fetch(f); if (r.ok) all.push(...parseRss(await r.text())); } catch (e) { /* feed caído */ }
  }
  const uniq = new Map(all.map((i) => [i.guid, i]));
  const out = [];
  for (const i of uniq.values()) {
    if (seenShop[i.guid]) continue;
    const s = matchSearch(i.title, searches, i.price);
    if (!s || !i.price || isJunkTitle(i.title, s)) continue;
    seenShop[i.guid] = Date.now();
    const hist = marketHistory?.[s.name] || [];
    const last = [...hist].reverse().find((p) => p.w);
    const med = last?.w || null;
    const margin = med ? Math.round(med * 0.95 - i.price - 4) : null;
    out.push({ ...i, search: s.name, median: med, margin, arbitrage: margin != null && margin >= Math.max(15, i.price * 0.12), found: Date.now() });
  }
  return out;
}
