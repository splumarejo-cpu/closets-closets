/**
 * Buba Identity & Match Bidireccional v1 — closets-closets.com
 * 1) Genera ID persistente de cliente web (CC-XXXXXX) + historial local de anteproyectos.
 * 2) Soporta "Identifícate con Google" (Google Identity Services) en sitio estático en cuanto
 *    se configure googleClientId (Client ID OAuth 2.0 Web en Google Cloud).
 * 3) Empaca Match Bidireccional (Página -> WhatsApp -> Buba y retorno ?buba=... -> Página).
 */
(function (win, doc) {
  "use strict";

  var CFG = win.BUBA_IDENTITY_CONFIG = Object.assign({
    // Pegar aquí tu OAuth 2.0 Client ID tipo "Aplicación web" de Google Cloud (ej. "12345-abc.apps.googleusercontent.com")
    // Nota: el credentials.json "installed" actual es de escritorio; Google requiere un Client ID tipo Web con origen https://closets-closets.com
    googleClientId: ""
  }, win.BUBA_IDENTITY_CONFIG || {});

  var PROFILE_KEY = "cc_client_profile_v1";

  function safeParse(raw, fb) {
    try {
      return raw ? JSON.parse(raw) : fb;
    } catch (_) {
      return fb;
    }
  }

  function genVisitorId() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var out = "CC-";
    for (var i = 0; i < 6; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
  }

  function loadProfile() {
    var raw = "";
    try {
      raw = win.localStorage.getItem(PROFILE_KEY) || "";
    } catch (_) {
      raw = "";
    }
    var p = safeParse(raw, null);
    if (!p || !p.clientId) {
      p = {
        clientId: genVisitorId(),
        nombre: "",
        tel: "",
        email: "",
        googleSub: "",
        picture: "",
        verifiedGoogle: false,
        createdAt: new Date().toISOString(),
        historyFolios: []
      };
      saveProfile(p);
    }
    if (!Array.isArray(p.historyFolios)) p.historyFolios = [];
    return p;
  }

  function saveProfile(p) {
    try {
      win.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    } catch (_) {
      // Sin almacenamiento disponible
    }
    return p;
  }

  function decodeJwtPayload(jwt) {
    try {
      var parts = String(jwt || "").split(".");
      if (parts.length < 2) return null;
      var b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      var bin = atob(b64);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (_) {
      return null;
    }
  }

  function fromBase64UrlUtf8(tok) {
    var b64 = String(tok || "").replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function hasValidGoogleClientId() {
    var id = String(CFG.googleClientId || "").trim();
    return id.length > 20 && id.indexOf(".apps.googleusercontent.com") !== -1;
  }

  function getAttributionSafe() {
    if (win.BubaMetrics && typeof win.BubaMetrics.getAttribution === "function") {
      return win.BubaMetrics.getAttribution() || {};
    }
    var params = new URLSearchParams(win.location.search || "");
    return {
      utm_source: params.get("utm_source") || "",
      utm_campaign: params.get("utm_campaign") || "",
      fbclid: params.get("fbclid") || ""
    };
  }

  function getMatchCode(folio) {
    var p = loadProfile();
    var suffix = folio ? "-" + String(folio).replace(/^CAD-/i, "") : "";
    return "BUBA-" + p.clientId + suffix;
  }

  function getCompactUserTag() {
    var p = loadProfile();
    var attr = getAttributionSafe();
    var tag = { cid: p.clientId };
    if (p.nombre) tag.nm = String(p.nombre).slice(0, 60);
    if (p.tel) tag.tel = String(p.tel).slice(0, 24);
    if (p.email) tag.em = String(p.email).slice(0, 80);
    if (p.googleSub) tag.gs = String(p.googleSub).slice(0, 32);
    if (p.verifiedGoogle) tag.vg = 1;
    var src = attr.utm_source || (attr.fbclid ? "facebook_ads" : "");
    if (src) tag.src = String(src).slice(0, 40);
    if (attr.utm_campaign) tag.cmp = String(attr.utm_campaign).slice(0, 60);
    return tag;
  }

  function recordFolio(folio, cat, precio, urlPlano) {
    if (!folio) return;
    var p = loadProfile();
    p.historyFolios = p.historyFolios.filter(function (x) { return x && x.folio !== folio; });
    p.historyFolios.unshift({
      folio: folio,
      cat: cat || "",
      precio: Number(precio || 0),
      url: urlPlano || "",
      ts: new Date().toISOString()
    });
    if (p.historyFolios.length > 12) p.historyFolios = p.historyFolios.slice(0, 12);
    saveProfile(p);
  }

  function formatMatchBullets(folio) {
    var p = loadProfile();
    var attr = getAttributionSafe();
    var code = getMatchCode(folio);
    var lines = ["• Código Match: " + code];
    if (p.nombre || p.email || p.verifiedGoogle) {
      var cuenta = (p.nombre || "Visitante Web") + (p.email ? " (" + p.email + ")" : "") + (p.verifiedGoogle ? " [Google Verificado]" : "");
      lines.push("• Cuenta Web: " + cuenta);
    }
    var orig = [attr.utm_source || (attr.fbclid ? "facebook" : ""), attr.utm_campaign].filter(Boolean).join(" / ");
    if (orig) {
      lines.push("• Origen Web: " + orig);
    }
    return lines;
  }

  function prefillFormsFromProfile() {
    var p = loadProfile();
    var nomInputs = doc.querySelectorAll('#cliNombre, #contactForm [name="nombre"]');
    nomInputs.forEach(function (el) {
      if (el && !el.value && p.nombre) el.value = p.nombre;
    });
    var telInputs = doc.querySelectorAll('#cliTel, #contactForm [name="telefono"]');
    telInputs.forEach(function (el) {
      if (el && !el.value && p.tel) el.value = p.tel;
    });
  }

  function parseBubaReturnPayload() {
    var params = new URLSearchParams(win.location.search || "");
    var rawBuba = params.get("buba");
    if (!rawBuba) return null;
    try {
      var obj = JSON.parse(fromBase64UrlUtf8(rawBuba));
      return obj && typeof obj === "object" ? obj : null;
    } catch (_) {
      return null;
    }
  }

  function renderBubaReturnBanner() {
    var buba = parseBubaReturnPayload();
    if (!buba) return;
    if (doc.getElementById("bubaMatchReturnBanner")) return;

    var bar = doc.createElement("div");
    bar.id = "bubaMatchReturnBanner";
    bar.style.cssText = "background:linear-gradient(90deg,#0f172a,#1e293b);color:#f8fafc;border-bottom:2px solid #d97706;padding:12px 18px;font-size:13px;line-height:1.45;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;z-index:80;";

    var left = doc.createElement("div");
    var title = doc.createElement("strong");
    title.style.color = "#fbbf24";
    title.textContent = "🔗 Seguimiento Oficial Buba / Taller" + (buba.folio ? " · " + buba.folio : "");
    left.appendChild(title);

    var details = [];
    if (buba.cl) details.push("Cliente: " + buba.cl);
    if (buba.st) details.push("Estatus: " + buba.st);
    if (buba.pt) details.push("Presupuesto Taller: $" + Number(buba.pt).toLocaleString("es-MX") + " MXN");
    if (buba.match) details.push("Match: " + buba.match);

    var sub = doc.createElement("div");
    sub.style.cssText = "color:#e2e8f0;margin-top:2px;";
    sub.textContent = details.join(" · ");
    left.appendChild(sub);

    if (buba.obs) {
      var obs = doc.createElement("div");
      obs.style.cssText = "color:#94a3b8;font-size:12px;margin-top:2px;";
      obs.textContent = "Nota de taller: " + buba.obs;
      left.appendChild(obs);
    }

    var right = doc.createElement("div");
    right.style.cssText = "display:flex;align-items:center;gap:8px;";
    var waBtn = doc.createElement("a");
    var msgReply = "Hola Buba, abrí el enlace de seguimiento (" + (buba.match || buba.folio || "WEB") + ") y quiero confirmar este anteproyecto.";
    waBtn.href = "https://wa.me/528134575939?text=" + encodeURIComponent(msgReply);
    waBtn.target = "_blank";
    waBtn.rel = "noopener noreferrer";
    waBtn.style.cssText = "background:#16a34a;color:#fff;padding:7px 12px;border-radius:8px;font-weight:700;text-decoration:none;font-size:12px;";
    waBtn.textContent = "💬 Confirmar por WhatsApp";
    right.appendChild(waBtn);

    bar.appendChild(left);
    bar.appendChild(right);
    doc.body.insertBefore(bar, doc.body.firstChild);
  }

  function ensureAccountUi() {
    if (doc.getElementById("bubaAccountModal")) return;

    var modal = doc.createElement("div");
    modal.id = "bubaAccountModal";
    modal.setAttribute("aria-hidden", "true");
    modal.style.cssText = "display:none;position:fixed;inset:0;background:rgba(15,23,42,.62);backdrop-filter:blur(3px);z-index:1200;align-items:center;justify-content:center;padding:16px;";

    var card = doc.createElement("div");
    card.style.cssText = "background:#fff;color:#0f172a;max-width:430px;width:100%;border-radius:16px;padding:22px;box-shadow:0 24px 60px rgba(15,23,42,.35);border:1px solid #e2e8f0;position:relative;font-family:inherit;";

    card.innerHTML = [
      '<button type="button" id="bubaAccClose" aria-label="Cerrar" style="position:absolute;top:12px;right:12px;border:0;background:#f1f5f9;color:#334155;width:30px;height:30px;border-radius:50%;cursor:pointer;font-weight:700;">✕</button>',
      '<div style="font-size:11px;font-weight:800;letter-spacing:.08em;color:#b45309;text-transform:uppercase;">CUENTA &amp; MATCH BUBA</div>',
      '<h3 style="margin:4px 0 8px;font-size:19px;">Tu perfil para seguimiento 3D</h3>',
      '<p style="margin:0 0 14px;font-size:13px;color:#475569;line-height:1.45;">Guarda tus proyectos y vincula tu código único con Buba por WhatsApp para retomar medidas, precios y rectificaciones exactas.</p>',
      '<div id="bubaAccCodePill" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:8px 12px;font-size:12px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;"></div>',
      '<div id="bubaGoogleBtnSlot" style="margin-bottom:14px;"></div>',
      '<form id="bubaAccLocalForm" style="display:grid;gap:8px;">',
      '  <input type="text" id="bubaAccName" placeholder="Tu nombre completo" style="padding:9px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;">',
      '  <input type="tel" id="bubaAccTel" placeholder="WhatsApp (10 dígitos)" style="padding:9px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;">',
      '  <input type="email" id="bubaAccEmail" placeholder="Correo electrónico (opcional)" style="padding:9px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;">',
      '  <button type="submit" style="background:#0f172a;color:#fff;border:0;border-radius:9px;padding:10px;font-weight:700;cursor:pointer;font-size:13px;">Guardar perfil y vincular Match</button>',
      '</form>',
      '<div id="bubaAccHistory" style="margin-top:12px;font-size:12px;color:#475569;"></div>'
    ].join("");

    modal.appendChild(card);
    doc.body.appendChild(modal);

    function refreshModalBody() {
      var p = loadProfile();
      var codeEl = doc.getElementById("bubaAccCodePill");
      if (codeEl) {
        codeEl.innerHTML = '<span>Código Match: <strong style="color:#0f172a;">BUBA-' + p.clientId + '</strong></span><span style="color:' + (p.verifiedGoogle ? '#15803d' : '#64748b') + ';font-weight:700;">' + (p.verifiedGoogle ? '✓ Google' : 'Local') + '</span>';
      }
      var nEl = doc.getElementById("bubaAccName"); if (nEl) nEl.value = p.nombre || "";
      var tEl = doc.getElementById("bubaAccTel"); if (tEl) tEl.value = p.tel || "";
      var eEl = doc.getElementById("bubaAccEmail"); if (eEl) eEl.value = p.email || "";

      var slot = doc.getElementById("bubaGoogleBtnSlot");
      if (slot) {
        slot.innerHTML = "";
        if (hasValidGoogleClientId()) {
          var wrap = doc.createElement("div");
          wrap.id = "g_id_signin_target";
          slot.appendChild(wrap);
          if (win.google && win.google.accounts && win.google.accounts.id) {
            win.google.accounts.id.renderButton(wrap, { theme: "outline", size: "large", width: 380, text: "continue_with", locale: "es" });
          } else {
            slot.textContent = "Cargando botón de Google...";
          }
          if (p.verifiedGoogle) {
            var outBtn = doc.createElement("button");
            outBtn.type = "button";
            outBtn.style.cssText = "margin-top:6px;background:transparent;border:0;color:#dc2626;font-size:12px;cursor:pointer;text-decoration:underline;padding:0;";
            outBtn.textContent = "Cerrar sesión de Google (" + (p.email || p.nombre) + ")";
            outBtn.addEventListener("click", function () {
              p.verifiedGoogle = false;
              p.googleSub = "";
              p.picture = "";
              saveProfile(p);
              updateHeaderTrigger();
              refreshModalBody();
            });
            slot.appendChild(outBtn);
          }
        } else {
          var notice = doc.createElement("div");
          notice.style.cssText = "background:#fffbeb;border:1px solid #fde68a;border-radius:9px;padding:9px 11px;font-size:12px;color:#92400e;";
          notice.innerHTML = '<strong>Google Sign-In listo para activar:</strong> agrega un Client ID OAuth Web (<code>https://closets-closets.com</code>) en <code>BUBA_IDENTITY_CONFIG.googleClientId</code>. Mientras tanto tu perfil local mantiene tu Código Match exacto.';
          slot.appendChild(notice);
        }
      }

      var hist = doc.getElementById("bubaAccHistory");
      if (hist) {
        if (p.historyFolios.length) {
          hist.innerHTML = "<strong>Tus últimos diseños guardados:</strong> " + p.historyFolios.slice(0, 4).map(function (h) {
            return h.url ? '<a href="' + h.url + '" style="color:#b45309;font-weight:700;margin-right:8px;">' + h.folio + '</a>' : h.folio;
          }).join(" ");
        } else {
          hist.textContent = "";
        }
      }
    }

    doc.getElementById("bubaAccClose").addEventListener("click", function () {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    });
    modal.addEventListener("click", function (ev) {
      if (ev.target === modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      }
    });
    doc.getElementById("bubaAccLocalForm").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var p = loadProfile();
      p.nombre = (doc.getElementById("bubaAccName").value || "").trim();
      p.tel = (doc.getElementById("bubaAccTel").value || "").trim();
      p.email = (doc.getElementById("bubaAccEmail").value || "").trim();
      saveProfile(p);
      prefillFormsFromProfile();
      updateHeaderTrigger();
      if (win.BubaMetrics) {
        win.BubaMetrics.track("identity_profile_saved", { label: p.verifiedGoogle ? "google" : "local" });
      }
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    });

    win._bubaOpenAccountModal = function () {
      refreshModalBody();
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    };
  }

  function updateHeaderTrigger() {
    var btn = doc.getElementById("bubaAccountTriggerBtn");
    if (!btn) return;
    var p = loadProfile();
    if (p.nombre || p.verifiedGoogle) {
      var shortName = String(p.nombre || p.email || "Mi Cuenta").split(" ")[0].slice(0, 16);
      btn.innerHTML = (p.verifiedGoogle ? "✓ " : "👤 ") + shortName + " · " + p.clientId;
    } else {
      btn.textContent = hasValidGoogleClientId() ? "Identifícate con Google" : "Mi Cuenta · Match " + p.clientId;
    }
  }

  function initGoogleIdentity() {
    if (!hasValidGoogleClientId()) return;
    var s = doc.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = function () {
      if (!win.google || !win.google.accounts || !win.google.accounts.id) return;
      win.google.accounts.id.initialize({
        client_id: String(CFG.googleClientId).trim(),
        callback: function (response) {
          var payload = decodeJwtPayload(response && response.credential);
          if (!payload) return;
          var p = loadProfile();
          p.googleSub = payload.sub || "";
          p.email = payload.email || p.email;
          p.nombre = payload.name || p.nombre;
          p.picture = payload.picture || "";
          p.verifiedGoogle = Boolean(payload.email_verified);
          saveProfile(p);
          prefillFormsFromProfile();
          updateHeaderTrigger();
          if (win.BubaMetrics) {
            win.BubaMetrics.track("identity_google_signin", { label: p.clientId });
          }
        }
      });
      var modal = doc.getElementById("bubaAccountModal");
      if (modal && modal.style.display === "flex" && win._bubaOpenAccountModal) {
        win._bubaOpenAccountModal();
      }
      updateHeaderTrigger();
    };
    doc.head.appendChild(s);
  }

  function bindProfileTrigger() {
    var btn = doc.getElementById("bubaAccountTriggerBtn");
    if (btn && !btn.dataset.bubaBound) {
      btn.dataset.bubaBound = "1";
      btn.addEventListener("click", function () {
        ensureAccountUi();
        if (win._bubaOpenAccountModal) win._bubaOpenAccountModal();
      });
    }
  }

  win.BubaIdentity = {
    getProfile: loadProfile,
    saveProfile: saveProfile,
    getMatchCode: getMatchCode,
    getCompactUserTag: getCompactUserTag,
    formatMatchBullets: formatMatchBullets,
    recordFolio: recordFolio,
    parseBubaReturnPayload: parseBubaReturnPayload,
    openModal: function () {
      ensureAccountUi();
      if (win._bubaOpenAccountModal) win._bubaOpenAccountModal();
    },
    config: CFG
  };

  function boot() {
    loadProfile();
    ensureAccountUi();
    bindProfileTrigger();
    updateHeaderTrigger();
    prefillFormsFromProfile();
    renderBubaReturnBanner();
    initGoogleIdentity();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window, document);
