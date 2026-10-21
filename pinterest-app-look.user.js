// ==UserScript==
// @name         Pinterest App Look
// @name:ar      بنترست بمظهر تطبيق الآيفون
// @namespace    https://github.com/jabar/pinterest-app-look
// @version      1.0.0
// @description  iOS-style Pinterest: dark mode, rounded cards, glass header, floating dock and a settings sheet.
// @description:ar  إعادة تصميم Pinterest على الويب بمظهر تطبيق iOS: وضع مظلم، بطاقات دائرية، شريط علوي زجاجي، شريط سفلي عائم، ولوحة إعدادات.
// @author       Jabar
// @license      MIT
// @match        https://pinterest.com/*
// @match        https://*.pinterest.com/*
// @match        https://*.pinterest.co.uk/*
// @match        https://*.pinterest.ca/*
// @match        https://*.pinterest.de/*
// @match        https://*.pinterest.fr/*
// @match        https://*.pinterest.es/*
// @match        https://*.pinterest.it/*
// @match        https://*.pinterest.com.au/*
// @match        https://*.pinterest.co.nz/*
// @match        https://*.pinterest.jp/*
// @match        https://*.pinterest.co.kr/*
// @match        https://*.pinterest.com.mx/*
// @match        https://*.pinterest.com.br/*
// @match        https://*.pinterest.pt/*
// @match        https://*.pinterest.se/*
// @match        https://*.pinterest.dk/*
// @match        https://*.pinterest.at/*
// @match        https://*.pinterest.ch/*
// @match        https://*.pinterest.ie/*
// @match        https://*.pinterest.ph/*
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @noframes
// ==/UserScript==

/*
  Pinterest App Look — v1.0.0
  ---------------------------
  الفكرة: Pinterest على الويب يستخدم ألوانًا صلبة وزوايا حادة ومساحات ضيقة.
  هذا السكربت يستبدل تلك الطبقة البصرية بلغة تصميم iOS:
  زجاج ضبابي، زوايا دائرية، ظلال ناعمة، حركة قصيرة، وشريط تنقل عائم.

  بنية الملف:
    1) الإعدادات الافتراضية + التخزين
    2) حساب الثيم الفعلي (تلقائي / فاتح / داكن / AMOLED)
    3) CSS الصفحة (حقن مرة واحدة)
    4) تلوين الأسطح البيضاء التي لا يمكن الوصول إليها بالـ CSS وحده
    5) واجهة الإعدادات + الشريط العائم (داخل Shadow DOM حتى لا تتعارض مع Pinterest)
*/

(() => {
  "use strict";

  /* ---------- 1. الإعدادات ---------- */

  const STORAGE_KEY = "pinterest-app-look.settings.v1";
  const STYLE_ID = "pa-page-style";
  const HOST_ID = "pa-ui-host";

  const ACCENTS = {
    pinterest: "#e60023",
    ios: "#0a84ff",
    violet: "#8b5cf6",
    emerald: "#10b981",
    amber: "#f59e0b",
  };

  const DEFAULTS = {
    theme: "system",          // system | light | dark | amoled
    accent: "pinterest",
    radius: 20,
    deepDark: true,           // تلوين الأسطح البيضاء غير القابلة للوصول بالـ CSS
    hidePromoted: true,
    hideShopping: true,
    compactHeader: false,
    showDock: true,
  };

  const BOOLEAN_KEYS = ["deepDark", "hidePromoted", "hideShopping", "compactHeader", "showDock"];

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      return sanitizeSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch (error) {
      return { ...DEFAULTS };
    }
  }

  // التخزين يمكن أن يُفسد أو يُعدَّل يدويًا، لذلك كل قيمة تُفحص قبل الاستخدام.
  function sanitizeSettings(input) {
    const clean = { ...DEFAULTS };
    clean.theme = ["system", "light", "dark", "amoled"].includes(input.theme) ? input.theme : DEFAULTS.theme;
    clean.accent = Object.hasOwn(ACCENTS, input.accent) ? input.accent : DEFAULTS.accent;
    clean.radius = Math.min(28, Math.max(8, Number(input.radius) || DEFAULTS.radius));
    for (const key of BOOLEAN_KEYS) clean[key] = Boolean(input[key]);
    return clean;
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      /* التخزين ممتلئ أو محجوب: نكمل بالجلسة الحالية فقط. */
    }
  }

  /* ---------- 2. الثيم ---------- */

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function resolveTheme(theme) {
    if (theme === "system") return systemDark.matches ? "dark" : "light";
    return theme;
  }

  function isDarkTheme(theme) {
    const resolved = resolveTheme(theme);
    return resolved === "dark" || resolved === "amoled";
  }
  /* ---------- 3. CSS الصفحة ---------- */

  const PAGE_CSS = `
/* ===== 1) رموز التصميم ===== */
:root {
  --pa-r: 20px;
  --pa-r-sm: 12px;
  --pa-r-lg: 30px;
  --pa-accent: #e60023;
  --pa-font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI Variable Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --pa-ease: cubic-bezier(.32, .72, 0, 1);

  /* الوضع الفاتح */
  --pa-bg: #f6f6f8;
  --pa-surface: #ffffff;
  --pa-surface-2: #f0f0f3;
  --pa-text: #101014;
  --pa-muted: #6b6b74;
  --pa-line: rgba(16, 16, 20, .09);
  --pa-shadow: 0 1px 2px rgba(16, 16, 20, .06), 0 18px 38px -22px rgba(16, 16, 20, .40);
  --pa-shadow-soft: 0 1px 2px rgba(16, 16, 20, .05);
}

html[data-pa-theme="dark"] {
  --pa-bg: #0b0b0d;
  --pa-surface: #17171b;
  --pa-surface-2: #202026;
  --pa-text: #f4f4f7;
  --pa-muted: #a2a2ac;
  --pa-line: rgba(255, 255, 255, .09);
  --pa-shadow: 0 1px 2px rgba(0, 0, 0, .60), 0 22px 48px -24px rgba(0, 0, 0, .90);
  --pa-shadow-soft: 0 1px 2px rgba(0, 0, 0, .50);
}

html[data-pa-theme="amoled"] {
  --pa-bg: #000000;
  --pa-surface: #0e0e11;
  --pa-surface-2: #16161a;
  --pa-text: #f7f7fa;
  --pa-muted: #9c9ca6;
  --pa-line: rgba(255, 255, 255, .10);
  --pa-shadow: 0 1px 2px rgba(0, 0, 0, .80), 0 22px 48px -24px rgba(0, 0, 0, 1);
  --pa-shadow-soft: 0 1px 2px rgba(0, 0, 0, .70);
}

/* ===== 2) الأسطح الأساسية ===== */
html, body {
  background: var(--pa-bg) !important;
}

body {
  color: var(--pa-text);
  font-family: var(--pa-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

#__PWS_ROOT__, #__next, #root, [data-test-id="app"] {
  background: var(--pa-bg) !important;
}

/* ===== 3) الشريط العلوي الزجاجي ===== */
header,
[role="banner"],
[data-test-id="header"],
[data-test-id="header-bar"] {
  background: color-mix(in srgb, var(--pa-bg) 80%, transparent) !important;
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  backdrop-filter: blur(22px) saturate(180%);
  border-bottom: 1px solid var(--pa-line) !important;
}

html[data-pa-compact="1"] [data-test-id="header"] {
  padding-block: 4px !important;
}

html[data-pa-compact="1"] header {
  padding-block: 4px !important;
}

/* ===== 4) البطاقات ===== */
[data-grid-item] > div,
[data-test-id="pin"] > div {
  border-radius: var(--pa-r) !important;
  transition: transform .24s var(--pa-ease), box-shadow .24s var(--pa-ease);
  will-change: transform;
}

[data-grid-item]:hover > div {
  transform: translateY(-3px);
  box-shadow: var(--pa-shadow);
}

[data-grid-item] img {
  border-radius: var(--pa-r) !important;
}

/* ===== 5) الأزرار والحقول ===== */
button {
  border-radius: 999px !important;
  transition: transform .16s var(--pa-ease), filter .16s var(--pa-ease);
}

button:active {
  transform: scale(.965);
}

input, textarea {
  border-radius: 999px !important;
  font-family: var(--pa-font);
}

textarea {
  border-radius: var(--pa-r-sm) !important;
}

[data-test-id="search-box"] input,
input[name="searchBoxInput"] {
  background: var(--pa-surface-2) !important;
  box-shadow: inset 0 0 0 1px var(--pa-line);
}

input:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--pa-accent) 75%, transparent);
  outline-offset: 2px;
}

/* ===== 6) النوافذ والقوائم ===== */
[role="dialog"] {
  background: var(--pa-surface) !important;
  border-radius: var(--pa-r-lg) !important;
  box-shadow: var(--pa-shadow) !important;
}

[role="menu"], [role="listbox"] {
  background: var(--pa-surface) !important;
  border-radius: var(--pa-r-sm) !important;
  border: 1px solid var(--pa-line) !important;
  box-shadow: var(--pa-shadow) !important;
}

/* ===== 7) حبر النص في الوضع المظلم ===== */
html[data-pa-dark="1"] :where(p, h1, h2, h3, h4, h5, h6, li, label, span, div, a, strong, em, small, figcaption) {
  color: var(--pa-text) !important;
}

/* الأسطح التي يلوّنها الجافاسكربت (الفلاتر التي لا يصلها CSS) */
[data-pa-surface="1"] {
  background-color: var(--pa-surface) !important;
}

/* ===== 8) المنشورات المروّجة والتسوق ===== */
html[data-pa-hide-promoted="1"] [data-grid-item]:has([data-test-id="oneTapPromotedPin"]),
html[data-pa-hide-promoted="1"] [data-grid-item]:has([aria-label*="Promoted" i]),
html[data-pa-hide-promoted="1"] [data-grid-item]:has([aria-label*="Sponsored" i]),
html[data-pa-hide-promoted="1"] [data-grid-item]:has([aria-label*="ممول"]),
html[data-pa-hide-promoted="1"] [data-test-id="oneTapPromotedPin"] {
  display: none !important;
}

html[data-pa-hide-shopping="1"] [data-test-id="shopping-module"],
html[data-pa-hide-shopping="1"] [data-test-id="shop-tab"],
html[data-pa-hide-shopping="1"] [data-test-id="product-pin"],
html[data-pa-hide-shopping="1"] [data-test-id="shopping-button"] {
  display: none !important;
}

/* ===== 9) تفاصيل صغيرة ===== */
::selection {
  background: color-mix(in srgb, var(--pa-accent) 30%, transparent);
}

* {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--pa-muted) 55%, transparent) transparent;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--pa-muted) 45%, transparent);
  border: 3px solid transparent;
  border-radius: 999px;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--pa-muted) 70%, transparent);
  border: 3px solid transparent;
  background-clip: padding-box;
}

html[data-pa-dock="1"] body {
  padding-bottom: 96px !important;
}
`;

  function injectPageStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = PAGE_CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  /* ---------- 4. تلوين الأسطح البيضاء ---------- */

  // Pinterest يبني ألوانه عبر كلاسات مولّدة، فلا يمكن لأي CSS ثابت أن يعرف كل سطح.
  // نقرأ اللون المحسوب لعناصر "ذات معنى" (لها data-test-id أو role) ونعلّم الأبيض منها
  // بسمة data-pa-surface، ثم يتولى CSS تلوينها. هذا يحافظ على الأداء: فحص محدود ومرّة واحدة لكل عنصر.

  // نتذكّر كل عنصر فحصناه (أبيض أو لا) حتى لا نعيد قياسه في كل تمريرة.
  let inspectedNodes = new WeakSet();
  let paintTimer = 0;

  const MEDIA_TAGS = new Set(["IMG", "VIDEO", "CANVAS", "SVG", "PATH", "PICTURE", "IFRAME", "INPUT"]);
  const SURFACE_SELECTOR = "[data-test-id], [role], header, aside, nav, form, ul, button";

  function parseColor(value) {
    if (!value) return null;
    const rgbMatch = value.match(/^rgba?\(([^)]+)\)$/i);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      if (parts.length >= 3) return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
    }
    const srgbMatch = value.match(/^color\(srgb\s+([^)]+)\)$/i);
    if (srgbMatch) {
      const parts = srgbMatch[1].split(/[\s/]+/).filter(Boolean).map(Number);
      if (parts.length >= 3) return { r: parts[0] * 255, g: parts[1] * 255, b: parts[2] * 255, a: parts[3] ?? 1 };
    }
    return null;
  }

  function isNearWhite(color) {
    const parsed = parseColor(color);
    if (!parsed || parsed.a < 0.55) return false;
    return (parsed.r + parsed.g + parsed.b) / 3 > 232;
  }

  function paintLightSurfaces() {
    if (!isDarkTheme(settings.theme) || !settings.deepDark) {
      unpaintSurfaces();
      return;
    }

    // نقرأ أولًا ثم نكتب: خلط القراءة والكتابة داخل حلقة واحدة يسبب إعادة حساب تخطيط لكل عنصر.
    const toPaint = [];
    let budget = 1200;

    for (const element of document.querySelectorAll(SURFACE_SELECTOR)) {
      if (budget-- <= 0) break;
      if (inspectedNodes.has(element) || MEDIA_TAGS.has(element.tagName)) continue;

      inspectedNodes.add(element);

      const rect = element.getBoundingClientRect();
      if (rect.width < 24 || rect.height < 16) continue;
      // نتجاهل الحاويات العملاقة: تلوينها يغطي الصفحة كلها بدل عنصر واحد.
      if (rect.width > window.innerWidth * 0.92 && rect.height > window.innerHeight * 0.92) continue;

      if (isNearWhite(getComputedStyle(element).backgroundColor)) toPaint.push(element);
    }

    for (const element of toPaint) element.dataset.paSurface = "1";
  }

  function unpaintSurfaces() {
    document.querySelectorAll("[data-pa-surface]").forEach((element) => {
      delete element.dataset.paSurface;
    });
    inspectedNodes = new WeakSet();
  }

  // نؤجل الفحص بعد آخر تغيير في الصفحة: Pinterest يضيف بطاقات باستمرار أثناء التمرير.
  function scheduleSurfacePaint() {
    clearTimeout(paintTimer);
    paintTimer = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(paintLightSurfaces, { timeout: 800 });
      } else {
        paintLightSurfaces();
      }
    }, 250);
  }
  /* ---------- 5. تطبيق الإعدادات ---------- */

  let settings = loadSettings();

  function applySettings(next, { persist = true } = {}) {
    settings = sanitizeSettings(next);
    if (persist) saveSettings(settings);

    const resolved = resolveTheme(settings.theme);
    const root = document.documentElement;

    root.dataset.paTheme = resolved;
    root.dataset.paDark = resolved === "light" ? "0" : "1";
    root.dataset.paCompact = settings.compactHeader ? "1" : "0";
    root.dataset.paDock = settings.showDock ? "1" : "0";
    root.dataset.paHidePromoted = settings.hidePromoted ? "1" : "0";
    root.dataset.paHideShopping = settings.hideShopping ? "1" : "0";

    root.style.setProperty("--pa-accent", ACCENTS[settings.accent]);
    root.style.setProperty("--pa-r", settings.radius + "px");
    root.style.setProperty("--pa-r-sm", Math.max(8, Math.round(settings.radius * 0.6)) + "px");
    root.style.setProperty("--pa-r-lg", (settings.radius + 10) + "px");

    syncPanel();
    scheduleSurfacePaint();
  }

  /* ---------- 6. واجهة الإعدادات (Shadow DOM) ---------- */

  // لماذا Shadow DOM؟ لأن Pinterest يحمّل CSS عامًا يطال كل عنصر في الصفحة.
  // داخل الظل نتحكم بأنفسنا ولا نلوّث الواجهة الأصلية.

  const UI_CSS = `
/* لا نستخدم all: initial هنا: سيقطع وراثة متغيّرات الثيم عبر حدود الظل. */
:host {
  font-family: var(--pa-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
  color: var(--pa-text, #111);
}

*, *::before, *::after {
  box-sizing: border-box;
}

button, input, a {
  font-family: inherit;
}

button {
  cursor: pointer;
}

/* ===== الطبقة المعتمة خلف اللوحة ===== */
.pa-scrim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .38);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity .24s ease;
  pointer-events: auto;
}

.pa-scrim[data-open="1"] {
  opacity: 1;
}

.pa-scrim[hidden] {
  display: none;
}

/* ===== لوحة الإعدادات ===== */
.pa-sheet {
  position: fixed;
  inset-inline: 0;
  margin-inline: auto;
  top: 50%;
  width: min(420px, calc(100vw - 32px));
  max-height: min(720px, 86vh);
  overflow: auto;
  padding: 10px 20px 14px;
  background: var(--pa-surface, #fff);
  color: var(--pa-text, #111);
  border: 1px solid var(--pa-line, rgba(0, 0, 0, .08));
  border-radius: 26px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, .38);
  opacity: 0;
  transform: translateY(14px) scale(.98);
  transition: opacity .24s ease, transform .32s var(--pa-ease, ease);
  pointer-events: auto;
  overscroll-behavior: contain;
}

.pa-sheet[data-open="1"] {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.pa-sheet[hidden] {
  display: none;
}

.pa-sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0 4px;
  position: sticky;
  top: 0;
  background: var(--pa-surface, #fff);
  z-index: 2;
}

.pa-sheet-head h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -.02em;
}

.pa-icon-btn {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 999px;
  background: var(--pa-surface-2, #f0f0f3);
  color: var(--pa-muted, #6b6b74);
  font-size: 14px;
  line-height: 1;
}

.pa-icon-btn:hover {
  color: var(--pa-text, #111);
}

.pa-sheet-body {
  display: grid;
  gap: 18px;
  padding: 12px 0 4px;
}

.pa-field {
  display: grid;
  gap: 8px;
}

.pa-field-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  color: var(--pa-muted, #6b6b74);
  letter-spacing: .01em;
}

.pa-field-label output {
  color: var(--pa-text, #111);
  font-variant-numeric: tabular-nums;
}

/* ===== مفتاح مقسّم بنمط iOS ===== */
.pa-segmented {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  padding: 3px;
  background: var(--pa-surface-2, #f0f0f3);
  border-radius: 11px;
}

.pa-segmented button {
  border: 0;
  padding: 7px 4px;
  border-radius: 8px;
  background: transparent;
  color: var(--pa-muted, #6b6b74);
  font-size: 12.5px;
  font-weight: 600;
  transition: color .16s ease, background .16s ease;
}

.pa-segmented button[aria-checked="true"] {
  background: color-mix(in srgb, var(--pa-text, #111) 8%, var(--pa-surface, #fff));
  color: var(--pa-text, #111);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .16);
}

/* ===== عيّنات اللون ===== */
.pa-swatches {
  display: flex;
  gap: 12px;
  padding: 2px 0;
}

.pa-swatch {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: var(--pa-swatch);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .12);
  transition: transform .16s var(--pa-ease, ease), box-shadow .16s ease;
}

.pa-swatch:hover {
  transform: scale(1.08);
}

.pa-swatch[aria-pressed="true"] {
  box-shadow: 0 0 0 2px var(--pa-surface, #fff), 0 0 0 4px var(--pa-swatch);
}

/* ===== شريط الاستدارة ===== */
input[type="range"] {
  width: 100%;
  height: 28px;
  margin: 0;
  appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 999px;
  background: var(--pa-surface-2, #f0f0f3);
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  margin-top: -8px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, .12);
  box-shadow: 0 2px 6px rgba(0, 0, 0, .28);
}

input[type="range"]::-moz-range-track {
  height: 6px;
  border-radius: 999px;
  background: var(--pa-surface-2, #f0f0f3);
}

input[type="range"]::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border: 1px solid rgba(0, 0, 0, .12);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .28);
}

/* ===== قائمة المفاتيح ===== */
.pa-list {
  display: grid;
  gap: 2px;
  margin: 0 -8px;
}

.pa-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 11px 8px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 500;
  cursor: pointer;
}

.pa-row:hover {
  background: color-mix(in srgb, var(--pa-text, #111) 5%, transparent);
}

/* مفتاح iOS */
.pa-row input[type="checkbox"] {
  appearance: none;
  flex: 0 0 auto;
  width: 51px;
  height: 31px;
  margin: 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--pa-text, #111) 18%, transparent);
  position: relative;
  transition: background .22s ease;
  direction: ltr;
}

.pa-row input[type="checkbox"]::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
  transition: transform .22s var(--pa-ease, ease);
}

.pa-row input[type="checkbox"]:checked {
  background: var(--pa-accent, #e60023);
}

.pa-row input[type="checkbox"]:checked::after {
  transform: translateX(20px);
}

.pa-row input[type="checkbox"]:focus-visible {
  outline: 2px solid var(--pa-accent, #e60023);
  outline-offset: 2px;
}

/* ===== التذييل ===== */
.pa-sheet-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0 4px;
  border-top: 1px solid var(--pa-line, rgba(0, 0, 0, .08));
  margin-top: 10px;
}

.pa-reset {
  border: 0;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--pa-surface-2, #f0f0f3);
  color: var(--pa-text, #111);
  font-size: 13px;
  font-weight: 600;
}

.pa-reset:hover {
  background: color-mix(in srgb, var(--pa-text, #111) 14%, var(--pa-surface, #fff));
}

.pa-version {
  font-size: 11.5px;
  color: var(--pa-muted, #6b6b74);
  font-variant-numeric: tabular-nums;
}

/* ===== الزر العائم ===== */
.pa-fab {
  position: fixed;
  left: 20px;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid var(--pa-line, rgba(0, 0, 0, .08));
  border-radius: 999px;
  background: color-mix(in srgb, var(--pa-surface, #fff) 82%, transparent);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  backdrop-filter: blur(18px) saturate(180%);
  color: var(--pa-text, #111);
  box-shadow: var(--pa-shadow, 0 8px 24px rgba(0, 0, 0, .2));
  pointer-events: auto;
  transition: transform .18s var(--pa-ease, ease);
}

.pa-fab:hover {
  transform: translateY(-2px);
}

.pa-fab:active {
  transform: scale(.94);
}

.pa-fab svg {
  width: 22px;
  height: 22px;
}

/* ===== الشريط السفلي العائم ===== */
.pa-dock {
  position: fixed;
  left: 50%;
  bottom: calc(18px + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border: 1px solid var(--pa-line, rgba(0, 0, 0, .08));
  border-radius: 999px;
  background: color-mix(in srgb, var(--pa-surface, #fff) 76%, transparent);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  backdrop-filter: blur(22px) saturate(180%);
  box-shadow: var(--pa-shadow, 0 8px 24px rgba(0, 0, 0, .2));
  pointer-events: auto;
}

.pa-dock[hidden] {
  display: none;
}

.pa-dock a,
.pa-dock button {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--pa-muted, #6b6b74);
  text-decoration: none;
  transition: background .18s ease, color .18s ease, transform .18s var(--pa-ease, ease);
}

.pa-dock a:hover,
.pa-dock button:hover {
  background: color-mix(in srgb, var(--pa-text, #111) 8%, transparent);
  color: var(--pa-text, #111);
}

.pa-dock a:active,
.pa-dock button:active {
  transform: scale(.93);
}

.pa-dock a[aria-current="page"] {
  background: color-mix(in srgb, var(--pa-accent, #e60023) 16%, transparent);
  color: var(--pa-accent, #e60023);
}

.pa-dock svg {
  width: 22px;
  height: 22px;
}

/* على الشاشات الضيقة نرفع الزر العائم فوق الشريط */
@media (max-width: 780px) {
  .pa-fab {
    bottom: calc(92px + env(safe-area-inset-bottom, 0px));
  }

  .pa-dock[hidden] ~ .pa-fab {
    bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  }
}

/* اللوحة تصبح Sheet سفلية على الجوال */
@media (max-width: 560px) {
  .pa-sheet {
    top: auto;
    bottom: 0;
    width: 100%;
    max-height: 88vh;
    border-radius: 26px 26px 0 0;
    transform: translateY(100%);
    padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  }

  .pa-sheet[data-open="1"] {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pa-sheet,
  .pa-scrim,
  .pa-fab,
  .pa-dock a,
  .pa-dock button {
    transition: none;
  }
}
`;
  const UI_MARKUP = `
<div class="pa-scrim" data-pa-scrim hidden></div>

<section class="pa-sheet" data-pa-sheet role="dialog" aria-modal="true" aria-labelledby="pa-sheet-title" dir="rtl" hidden>
  <header class="pa-sheet-head">
    <h2 id="pa-sheet-title">مظهر Pinterest</h2>
    <button type="button" class="pa-icon-btn" data-pa-close aria-label="إغلاق الإعدادات">✕</button>
  </header>

  <div class="pa-sheet-body">
    <div class="pa-field">
      <span class="pa-field-label">الوضع</span>
      <div class="pa-segmented" role="radiogroup" aria-label="وضع الألوان">
        <button type="button" role="radio" aria-checked="true" data-theme-option="system">تلقائي</button>
        <button type="button" role="radio" aria-checked="false" data-theme-option="light">فاتح</button>
        <button type="button" role="radio" aria-checked="false" data-theme-option="dark">داكن</button>
        <button type="button" role="radio" aria-checked="false" data-theme-option="amoled">AMOLED</button>
      </div>
    </div>

    <div class="pa-field">
      <span class="pa-field-label">لون التمييز</span>
      <div class="pa-swatches" role="group" aria-label="لون التمييز">
        <button type="button" class="pa-swatch" data-accent-option="pinterest" style="--pa-swatch:#e60023" aria-label="أحمر Pinterest" aria-pressed="true"></button>
        <button type="button" class="pa-swatch" data-accent-option="ios" style="--pa-swatch:#0a84ff" aria-label="أزرق iOS" aria-pressed="false"></button>
        <button type="button" class="pa-swatch" data-accent-option="violet" style="--pa-swatch:#8b5cf6" aria-label="بنفسجي" aria-pressed="false"></button>
        <button type="button" class="pa-swatch" data-accent-option="emerald" style="--pa-swatch:#10b981" aria-label="أخضر" aria-pressed="false"></button>
        <button type="button" class="pa-swatch" data-accent-option="amber" style="--pa-swatch:#f59e0b" aria-label="برتقالي" aria-pressed="false"></button>
      </div>
    </div>

    <div class="pa-field">
      <label class="pa-field-label" for="pa-radius-input">استدارة الحواف <output data-pa-radius-output>20</output></label>
      <input id="pa-radius-input" type="range" min="8" max="28" step="1" value="20" data-pa-radius>
    </div>

    <div class="pa-list">
      <label class="pa-row">
        <span>تعتيم الأسطح الفاتحة</span>
        <input type="checkbox" data-pa-toggle="deepDark">
      </label>
      <label class="pa-row">
        <span>إخفاء المنشورات المروّجة</span>
        <input type="checkbox" data-pa-toggle="hidePromoted">
      </label>
      <label class="pa-row">
        <span>إخفاء وحدات التسوق</span>
        <input type="checkbox" data-pa-toggle="hideShopping">
      </label>
      <label class="pa-row">
        <span>رأس صفحة مضغوط</span>
        <input type="checkbox" data-pa-toggle="compactHeader">
      </label>
      <label class="pa-row">
        <span>الشريط السفلي العائم</span>
        <input type="checkbox" data-pa-toggle="showDock">
      </label>
    </div>
  </div>

  <footer class="pa-sheet-foot">
    <button type="button" class="pa-reset" data-pa-reset>استعادة الافتراضي</button>
    <span class="pa-version">v1.0.0</span>
  </footer>
</section>

<nav class="pa-dock" data-pa-dock aria-label="تنقل سريع">
  <a href="/" data-pa-nav="home" aria-label="الرئيسية" title="الرئيسية">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.6 12 4l8 6.6V19a1.4 1.4 0 0 1-1.4 1.4h-4.1v-6h-5v6H5.4A1.4 1.4 0 0 1 4 19z"/></svg>
  </a>
  <a href="/ideas/" data-pa-nav="explore" aria-label="استكشاف" title="استكشاف">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.2"/><path d="m14.9 9.1-1.7 4.1-4.1 1.7 1.7-4.1z"/></svg>
  </a>
  <button type="button" data-pa-search aria-label="بحث" title="بحث">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.4"/><path d="m20 20-4.2-4.2"/></svg>
  </button>
  <a href="/pin-creation-tool/" data-pa-nav="create" aria-label="إنشاء Pin" title="إنشاء Pin">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5.5v13M5.5 12h13"/></svg>
  </a>
  <button type="button" data-pa-settings aria-label="إعدادات المظهر" title="إعدادات المظهر">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h8M16.5 8H20M4 16h4M12.5 16H20"/><circle cx="14" cy="8" r="2.1"/><circle cx="10" cy="16" r="2.1"/></svg>
  </button>
</nav>

<button type="button" class="pa-fab" data-pa-fab aria-label="إعدادات المظهر" title="إعدادات المظهر">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h8M16.5 8H20M4 16h4M12.5 16H20"/><circle cx="14" cy="8" r="2.1"/><circle cx="10" cy="16" r="2.1"/></svg>
</button>
`;

  let panel = null;

  function createUi() {
    if (document.getElementById(HOST_ID)) return;

    const host = document.createElement("div");
    host.id = HOST_ID;
    host.style.cssText = "position:fixed;inset:0;z-index:2147483000;pointer-events:none;";

    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = UI_CSS;

    const template = document.createElement("template");
    template.innerHTML = UI_MARKUP.trim();

    shadow.append(style, template.content);
    document.documentElement.appendChild(host);

    panel = {
      sheet: shadow.querySelector("[data-pa-sheet]"),
      scrim: shadow.querySelector("[data-pa-scrim]"),
      fab: shadow.querySelector("[data-pa-fab]"),
      dock: shadow.querySelector("[data-pa-dock]"),
      closeButton: shadow.querySelector("[data-pa-close]"),
      resetButton: shadow.querySelector("[data-pa-reset]"),
      searchButton: shadow.querySelector("[data-pa-search]"),
      settingsButton: shadow.querySelector("[data-pa-settings]"),
      radiusInput: shadow.querySelector("[data-pa-radius]"),
      radiusOutput: shadow.querySelector("[data-pa-radius-output]"),
      themeButtons: [...shadow.querySelectorAll("[data-theme-option]")],
      accentButtons: [...shadow.querySelectorAll("[data-accent-option]")],
      toggles: [...shadow.querySelectorAll("[data-pa-toggle]")],
      navLinks: [...shadow.querySelectorAll("[data-pa-nav]")],
      lastFocus: null,
    };

    bindPanelEvents();
  }

  function bindPanelEvents() {
    panel.fab.addEventListener("click", openSheet);
    panel.settingsButton.addEventListener("click", openSheet);
    panel.closeButton.addEventListener("click", closeSheet);
    panel.scrim.addEventListener("click", closeSheet);

    panel.themeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applySettings({ ...settings, theme: button.dataset.themeOption });
      });
    });

    panel.accentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applySettings({ ...settings, accent: button.dataset.accentOption });
      });
    });

    panel.radiusInput.addEventListener("input", () => {
      applySettings({ ...settings, radius: Number(panel.radiusInput.value) });
    });

    panel.toggles.forEach((input) => {
      input.addEventListener("change", () => {
        applySettings({ ...settings, [input.dataset.paToggle]: input.checked });
      });
    });

    panel.resetButton.addEventListener("click", () => applySettings({ ...DEFAULTS }));
    panel.searchButton.addEventListener("click", focusPinterestSearch);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.sheet.dataset.open === "1") closeSheet();
    }, true);

    window.addEventListener("popstate", syncDockActive);
    document.addEventListener("click", () => window.setTimeout(syncDockActive, 400), true);
  }

  /* ---------- 7. فتح وإغلاق اللوحة ---------- */

  function openSheet() {
    if (!panel || panel.sheet.dataset.open === "1") return;

    panel.lastFocus = document.activeElement;
    panel.scrim.hidden = false;
    panel.sheet.hidden = false;

    // إطار واحد قبل تشغيل الانتقال حتى يلتقط المتصفح الحالة الابتدائية.
    window.requestAnimationFrame(() => {
      panel.scrim.dataset.open = "1";
      panel.sheet.dataset.open = "1";
      panel.closeButton.focus();
    });
  }

  function closeSheet() {
    if (!panel || panel.sheet.dataset.open !== "1") return;

    panel.sheet.dataset.open = "0";
    panel.scrim.dataset.open = "0";

    window.setTimeout(() => {
      if (panel.sheet.dataset.open !== "0") return;
      panel.sheet.hidden = true;
      panel.scrim.hidden = true;
    }, 240);

    if (panel.lastFocus instanceof HTMLElement) panel.lastFocus.focus();
  }

  /* ---------- 8. مزامنة الواجهة مع الإعدادات ---------- */

  function syncPanel() {
    if (!panel) return;

    panel.themeButtons.forEach((button) => {
      button.setAttribute("aria-checked", String(button.dataset.themeOption === settings.theme));
    });

    panel.accentButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.accentOption === settings.accent));
    });

    panel.radiusInput.value = String(settings.radius);
    panel.radiusOutput.textContent = String(settings.radius);

    panel.toggles.forEach((input) => {
      input.checked = Boolean(settings[input.dataset.paToggle]);
    });

    panel.dock.hidden = !settings.showDock;
  }

  function syncDockActive() {
    if (!panel) return;

    const path = window.location.pathname;
    const active = path === "/" ? "home"
      : path.startsWith("/ideas") ? "explore"
      : path.startsWith("/pin-creation-tool") ? "create"
      : "";

    panel.navLinks.forEach((link) => {
      if (link.dataset.paNav === active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function focusPinterestSearch() {
    const input = document.querySelector(
      'input[name="searchBoxInput"], [data-test-id="search-box"] input, input[placeholder]'
    );

    if (input instanceof HTMLInputElement) {
      closeSheet();
      input.focus();
      input.select();
      return;
    }

    window.location.href = "/search/";
  }

  /* ---------- 9. التشغيل ---------- */

  let started = false;

  function start() {
    if (started) return;
    started = true;

    injectPageStyle();
    createUi();
    applySettings(settings, { persist: false });
    observePage();

    if (typeof GM_registerMenuCommand === "function") {
      GM_registerMenuCommand("إعدادات مظهر Pinterest", openSheet);
    }

    systemDark.addEventListener("change", () => {
      if (settings.theme === "system") applySettings(settings, { persist: false });
    });
  }

  function observePage() {
    const observer = new MutationObserver(() => {
      if (!document.getElementById(STYLE_ID)) injectPageStyle();
      scheduleSurfacePaint();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  // حقن الـ CSS والثيم فورًا (document-start) حتى لا تومض الصفحة بيضاء قبل بناء الواجهة.
  injectPageStyle();
  applySettings(settings, { persist: false });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();