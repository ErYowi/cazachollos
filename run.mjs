// Cazachollos en la nube: se ejecuta solo cada 30 min en GitHub Actions. 0 tokens.
import fs from "node:fs";
import { DEFAULT_SETTINGS, DEFAULT_SEARCHES, runScan } from "./scanner.js";

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT = process.env.TELEGRAM_CHAT_ID;
if (!TOKEN || !CHAT) { console.error("Faltan los secretos TELEGRAM_TOKEN y TELEGRAM_CHAT_ID"); process.exit(1); }

// ---------- configuración (editable en config.json) ----------
const cfgFile = fs.existsSync("config.json") ? JSON.parse(fs.readFileSync("config.json", "utf8")) : {};
const cfg = { ...DEFAULT_SETTINGS, ...(cfgFile.ajustes || {}) };
const searches = cfgFile.busquedas || DEFAULT_SEARCHES;
const seen = fs.existsSync("seen.json") ? JSON.parse(fs.readFileSync("seen.json", "utf8")) : {};
const firstRun = !seen.__init;
seen.__init = seen.__init || Date.now();

// ---------- fetch con cabeceras de navegador y cookies (para Vinted) ----------
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const jar = new Map();
const nativeFetch = globalThis.fetch;
globalThis.fetch = async (url, opts = {}) => {
  const u = new URL(url);
  const headers = { "User-Agent": UA, "Accept-Language": "es-ES,es;q=0.9", ...(opts.headers || {}) };
  if (u.hostname === "api.wallapop.com") { headers.Origin = "https://es.wallapop.com"; headers.Referer = "https://es.wallapop.com/"; }
  if (u.hostname.endsWith("vinted.es")) {
    headers.Accept = headers.Accept || "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
    if (jar.size) headers.Cookie = [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
  }
  const { credentials, ...rest } = opts;
  const r = await nativeFetch(url, { ...rest, headers });
  if (u.hostname.endsWith("vinted.es")) {
    for (const c of r.headers.getSetCookie?.() || []) { const [kv] = c.split(";"); const i = kv.indexOf("="); jar.set(kv.slice(0, i), kv.slice(i + 1)); }
  }
  return r;
};
// Cookies iniciales de Vinted (visitante anónimo)
try { await fetch("https://www.vinted.es/"); } catch {}

// ---------- Telegram ----------
const esc = (s) => String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
async function tg(method, body) {
  try {
    const r = await nativeFetch(`https://api.telegram.org/bot${TOKEN}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: CHAT, parse_mode: "HTML", ...body }) });
    if (!r.ok) console.log("Telegram:", await r.text());
    return r.ok;
  } catch (e) { console.log("Telegram error:", e.message); return false; }
}
async function sendDeal(d) {
  const foreign = d.country && d.country !== "ES" ? ` 🌍 ${d.country}` : "";
  const where = d.ship ? `📦 Con envío${d.city ? " · " + esc(d.city) : ""}` : `🤝 En mano · ${esc(d.city)} (${d.distKm} km)`;
  const stars = d.seller.stars ? ` · ${Number(d.seller.stars).toFixed(1)}★` : "";
  const text =
    `${d.tier === "S" ? "🔥🔥" : d.tier === "A" ? "🔥" : "✨"} <b>Tier ${d.tier}</b> · ${d.platform} · ${esc(d.search)}\n` +
    `<b>${esc(d.title)}</b>\n` +
    `💶 <b>${d.price} €</b>  (mercado ~${d.median} €, <b>-${d.discount}%</b>)\n` +
    `${where}${foreign}\n` +
    `👤 ${esc(d.seller.name || "vendedor")}${stars} · ${esc(d.seller.why)}\n` +
    `<a href="${d.url}">👉 Ver anuncio</a>`;
  if (d.img && (await tg("sendPhoto", { photo: d.img, caption: text }))) return;
  await tg("sendMessage", { text, disable_web_page_preview: false });
}

// ---------- escaneo ----------
const log = [];
const add = (m) => { log.push(m); console.log(m); };
const deals = await runScan(cfg, searches.filter((s) => s.on !== false), seen, add);

// Si es la primera vez, no inundar: marca todo como visto y envía solo un resumen + los 3 mejores
const toSend = firstRun ? deals.slice(0, 3) : deals;
for (const d of toSend) { await sendDeal(d); await new Promise((r) => setTimeout(r, 1200)); }

// Diagnóstico: avisa si alguna web bloquea al servidor
const errs = log.filter((l) => /^Error/.test(l));
const wOk = log.some((l) => /^Wallapop · .*anuncios/.test(l));
const vOk = log.some((l) => /^Vinted · .*anuncios/.test(l));
if (firstRun) {
  await tg("sendMessage", { text: `✅ <b>Cazachollos en la nube activado</b>\nWallapop: ${wOk ? "funciona ✅" : "❌ no responde"}\nVinted: ${vOk ? "funciona ✅" : "❌ no responde"}\nBuscaré cada 30 min, día y noche.${errs.length ? "\n\nErrores:\n" + esc(errs.slice(0, 5).join("\n")) : ""}` });
} else if (!wOk && !vOk && errs.length) {
  // avisa de bloqueo como mucho una vez al día
  const last = seen.__lastErrAlert || 0;
  if (Date.now() - last > 864e5) {
    await tg("sendMessage", { text: `⚠️ Cazachollos: las webs no responden desde el servidor.\n${esc(errs.slice(0, 3).join("\n"))}` });
    seen.__lastErrAlert = Date.now();
  }
}

// ---------- guardar chollos para verlos en la extensión ----------
const old = fs.existsSync("deals.json") ? JSON.parse(fs.readFileSync("deals.json", "utf8")).deals || [] : [];
const weekAgo = Date.now() - 7 * 864e5;
fs.writeFileSync("deals.json", JSON.stringify({ updated: Date.now(), wallapop: wOk, vinted: vOk, deals: [...deals, ...old].filter((d) => d.found > weekAgo).slice(0, 200) }));

// ---------- guardar vistos (10 días) ----------
const lim = Date.now() - 10 * 864e5;
const keep = Object.fromEntries(Object.entries(seen).filter(([k, t]) => k.startsWith("__") || t > lim));
fs.writeFileSync("seen.json", JSON.stringify(keep));
console.log(`Hecho: ${deals.length} chollos nuevos, ${toSend.length} enviados.`);
