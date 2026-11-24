/**
 * Buba Metrics & Funnel Attribution v1 — closets-closets.com
 * 100% seguro sin backend: guarda embudo local en localStorage/sessionStorage
 * y activa GA4 / Meta Pixel automáticamente en cuanto configures IDs reales.
 */
(function (win, doc) {
  "use strict";

  var CONFIG = win.BUBA_METRICS_CONFIG = Object.assign({
    site: "closets-closets.com",
    // Deja vacío hasta pegar IDs reales (no usa placeholders falsos):
    ga4MeasurementId: "",   // Ejemplo: "G-ABCD1234EF"
    metaPixelId: "",        // Ejemplo: "123456789012345"
    webhookUrl: "",         // URL opcional HTTPS para recibir eventos JSON vía sendBeacon
    debug: false
  }, win.BUBA_METRICS_CONFIG || {});

  var STORE_KEY = "cc_funnel_metrics_v1";
  var ATTR_KEY = "cc_attribution_v1";
  var CONSENT_KEY = "cc_cookie_consent_v1";
  var MAX_RECENT = 120;

  function safeParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function safeStorageGet(storage, key) {
    try {
      return storage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function safeStorageSet(storage, key, val) {
    try {
      storage.setItem(key, val);
    } catch (_) {
      // Modo privado o cuota llena
    }
  }

  function getAttribution() {
    var existing = safeParse(safeStorageGet(win.sessionStorage, ATTR_KEY), null);
    var params = new URLSearchParams(win.location.search || "");
    var fresh = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      fbclid: params.get("fbclid") || "",
      gclid: params.get("gclid") || "",
      has_design_token: params.has("d"),
      preset: params.get("preset") || "",
      referrer: doc.referrer || "",
      landing_path: win.location.pathname || "/",
      captured_at: new Date().toISOString()
    };

    if (!existing) {
      safeStorageSet(win.sessionStorage, ATTR_KEY, JSON.stringify(fresh));
      return fresh;
    }

    var changed = false;
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"].forEach(function (k) {
      if (fresh[k] && !existing[k]) {
        existing[k] = fresh[k];
        changed = true;
      }
    });
    if (changed) {
      safeStorageSet(win.sessionStorage, ATTR_KEY, JSON.stringify(existing));
    }
    return existing;
  }

  function defaultStore() {
    return {
      first_seen_at: new Date().toISOString(),
      last_seen_at: new Date().toISOString(),
      totals: {
        page_views: 0,
        configurator_opens: 0,
        category_changes: 0,
        finish_changes: 0,
        stone_changes: 0,
        preset_clicks: 0,
        lamina_downloads: 0,
        wa_clicks: 0,
        form_submits: 0,
        restored_designs: 0
      },
      byPage: {},
      byCategory: {},
      recent: []
    };
  }

  function readStore() {
    var parsed = safeParse(safeStorageGet(win.localStorage, STORE_KEY), null);
    if (!parsed || typeof parsed !== "object" || !parsed.totals) {
      return defaultStore();
    }
    return Object.assign(defaultStore(), parsed, {
      totals: Object.assign(defaultStore().totals, parsed.totals || {}),
      byPage: parsed.byPage || {},
      byCategory: parsed.byCategory || {},
      recent: Array.isArray(parsed.recent) ? parsed.recent : []
    });
  }

  function writeStore(store) {
    store.last_seen_at = new Date().toISOString();
    if (store.recent.length > MAX_RECENT) {
      store.recent = store.recent.slice(store.recent.length - MAX_RECENT);
    }
    safeStorageSet(win.localStorage, STORE_KEY, JSON.stringify(store));
  }

  function isValidGa4(id) {
    return typeof id === "string" && /^G-[A-Z0-9]{6,16}$/i.test(id.trim());
  }

  function isValidPixel(id) {
    return typeof id === "string" && /^\d{8,20}$/.test(id.trim());
  }

  var ga4Loaded = false;
  var pixelLoaded = false;

  function getCookieConsent() {
    return safeStorageGet(win.localStorage, CONSENT_KEY) || "";
  }

  function setCookieConsent(val) {
    safeStorageSet(win.localStorage, CONSENT_KEY, val);
    if (val === "accepted") {
      initThirdPartyProviders();
    }
  }

  function initThirdPartyProviders() {
    if (getCookieConsent() !== "accepted") {
      return;
    }
    if (isValidGa4(CONFIG.ga4MeasurementId) && !ga4Loaded) {
      ga4Loaded = true;
      var gaId = CONFIG.ga4MeasurementId.trim();
      win.dataLayer = win.dataLayer || [];
      win.gtag = win.gtag || function () { win.dataLayer.push(arguments); };
      win.gtag("js", new Date());
      win.gtag("config", gaId, { send_page_view: false });
      var sGa = doc.createElement("script");
      sGa.async = true;
      sGa.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId);
      doc.head.appendChild(sGa);
    }

    if (isValidPixel(CONFIG.metaPixelId) && !pixelLoaded) {
      pixelLoaded = true;
      var pxId = CONFIG.metaPixelId.trim();
      if (!win.fbq) {
        var n = win.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!win._fbq) win._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        var sFb = doc.createElement("script");
        sFb.async = true;
        sFb.src = "https://connect.facebook.net/en_US/fbevents.js";
        doc.head.appendChild(sFb);
      }
      win.fbq("init", pxId);
      win.fbq("track", "PageView");
    }
  }

  var EVENT_COUNTER_MAP = {
    page_view: "page_views",
    open_configurator: "configurator_opens",
    cad_category_change: "category_changes",
    cad_finish_change: "finish_changes",
    cad_stone_change: "stone_changes",
    cad_preset_apply: "preset_clicks",
    cad_engineering_open: "lamina_downloads",
    lead_whatsapp_click: "wa_clicks",
    lead_form_submit: "form_submits",
    cad_design_restored: "restored_designs"
  };

  function forwardThirdParty(eventName, detail) {
    if (ga4Loaded && typeof win.gtag === "function") {
      win.gtag("event", eventName, detail);
    }
    if (pixelLoaded && typeof win.fbq === "function") {
      if (eventName === "lead_whatsapp_click" || eventName === "lead_form_submit") {
        win.fbq("track", "Lead", {
          content_name: detail.label || detail.category || eventName,
          content_category: detail.category || "carpinteria",
          value: Number(detail.precio || 0) || undefined,
          currency: "MXN"
        });
      } else if (eventName === "open_configurator" || eventName === "cad_engineering_open") {
        win.fbq("trackCustom", eventName, detail);
      }
    }
    if (CONFIG.webhookUrl && typeof navigator.sendBeacon === "function") {
      try {
        var blob = new Blob([JSON.stringify(detail)], { type: "application/json" });
        navigator.sendBeacon(CONFIG.webhookUrl, blob);
      } catch (_) {
        // Ignorar errores de red en beacon opcional
      }
    }
  }

  var lastDedupKey = "";
  var lastDedupTs = 0;

  function track(eventName, payload) {
    if (!eventName) return null;
    var now = Date.now();
    var p = payload && typeof payload === "object" ? Object.assign({}, payload) : {};
    var dedupKey = eventName + "|" + (p.label || "") + "|" + (p.source || "") + "|" + (p.folio || "");
    if (dedupKey === lastDedupKey && (now - lastDedupTs) < 350) {
      return null;
    }
    lastDedupKey = dedupKey;
    lastDedupTs = now;

    var attr = getAttribution();
    var pageName = (win.location.pathname || "/").split("/").pop() || "index.html";
    var store = readStore();

    var counterKey = EVENT_COUNTER_MAP[eventName];
    if (counterKey && Object.prototype.hasOwnProperty.call(store.totals, counterKey)) {
      store.totals[counterKey] += 1;
    }
    if (eventName === "page_view") {
      store.byPage[pageName] = (store.byPage[pageName] || 0) + 1;
    }
    if (p.category) {
      store.byCategory[p.category] = (store.byCategory[p.category] || 0) + 1;
    }

    var record = Object.assign({
      ts: new Date().toISOString(),
      event: eventName,
      page: pageName,
      utm_source: attr.utm_source || undefined,
      utm_campaign: attr.utm_campaign || undefined
    }, p);

    store.recent.push(record);
    writeStore(store);

    if (CONFIG.debug && win.console && win.console.debug) {
      win.console.debug("[BubaMetrics]", record);
    }

    forwardThirdParty(eventName, record);
    try {
      win.dispatchEvent(new CustomEvent("buba:metric", { detail: record }));
    } catch (_) {
      // Navegadores antiguos sin CustomEvent constructor
    }
    return record;
  }

  function getSummary() {
    var store = readStore();
    return {
      site: CONFIG.site,
      attribution: getAttribution(),
      configuredProviders: {
        ga4: isValidGa4(CONFIG.ga4MeasurementId),
        metaPixel: isValidPixel(CONFIG.metaPixelId),
        webhook: Boolean(CONFIG.webhookUrl)
      },
      totals: store.totals,
      byPage: store.byPage,
      byCategory: store.byCategory,
      recentCount: store.recent.length,
      recent: store.recent
    };
  }

  function resetLocal() {
    safeStorageSet(win.localStorage, STORE_KEY, JSON.stringify(defaultStore()));
  }

  function bindAutoListeners() {
    doc.addEventListener("click", function (ev) {
      var target = ev.target && ev.target.closest ? ev.target.closest("a, button") : null;
      if (!target) return;

      var href = target.getAttribute("href") || "";
      var label = (target.getAttribute("data-track") || target.textContent || "").trim().slice(0, 80);

      if (href.indexOf("wa.me/") !== -1) {
        track("lead_whatsapp_click", { source: "anchor", label: label });
      } else if (href.indexOf("configurador.html") !== -1) {
        var presetMatch = href.match(/preset=([a-z0-9_-]+)/i);
        track("open_configurator", {
          source: "anchor",
          label: label,
          preset: presetMatch ? presetMatch[1] : undefined
        });
      }
    }, true);
  }

  function renderConsentBannerIfNeeded() {
    if (getCookieConsent() || doc.getElementById("bubaCookieBanner")) return;
    if ((win.location.pathname || "").indexOf("privacidad.html") !== -1) return;
    var box = doc.createElement("div");
    box.id = "bubaCookieBanner";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Aviso de cookies y privacidad");
    box.style.cssText = "position:fixed;left:16px;bottom:16px;z-index:950;max-width:390px;width:calc(100% - 32px);background:#0f172a;color:#f8fafc;border:1px solid rgba(255,255,255,.16);border-radius:14px;padding:13px 15px;box-shadow:0 18px 45px rgba(15,23,42,.38);font-size:12px;line-height:1.45;";
    box.innerHTML = [
      '<div style="font-weight:700;color:#fbbf24;margin-bottom:4px;">Privacidad y Cookies</div>',
      '<p style="margin:0 0 10px;color:#cbd5e1;">Usamos almacenamiento local y cookies técnicas para guardar tu diseño 3D, vincular tu Código Match y medir el desempeño del sitio. <a href="privacidad.html" style="color:#fbbf24;text-decoration:underline;">Ver Aviso de Privacidad</a>.</p>',
      '<div style="display:flex;gap:8px;flex-wrap:wrap;">',
      '  <button type="button" id="bubaCookieAccept" style="background:#16a34a;color:#fff;border:0;border-radius:8px;padding:6px 11px;font-weight:700;cursor:pointer;font-size:11px;">Aceptar todo</button>',
      '  <button type="button" id="bubaCookieEssential" style="background:#1e293b;color:#e2e8f0;border:1px solid #475569;border-radius:8px;padding:6px 11px;font-weight:600;cursor:pointer;font-size:11px;">Solo esenciales</button>',
      '</div>'
    ].join("");
    doc.body.appendChild(box);
    doc.getElementById("bubaCookieAccept").addEventListener("click", function () {
      setCookieConsent("accepted");
      box.remove();
    });
    doc.getElementById("bubaCookieEssential").addEventListener("click", function () {
      setCookieConsent("essential");
      box.remove();
    });
  }

  win.BubaMetrics = {
    track: track,
    getSummary: getSummary,
    getAttribution: getAttribution,
    getCookieConsent: getCookieConsent,
    setCookieConsent: setCookieConsent,
    resetLocal: resetLocal,
    config: CONFIG
  };

  initThirdPartyProviders();
  getAttribution();
  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", function () {
      bindAutoListeners();
      renderConsentBannerIfNeeded();
      track("page_view", { title: doc.title });
    });
  } else {
    bindAutoListeners();
    renderConsentBannerIfNeeded();
    track("page_view", { title: doc.title });
  }
})(window, document);
