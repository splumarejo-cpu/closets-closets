/**
 * Catálogo maestro y tabulador oficial Closets-Closets Design & More
 * Sincronizado con ECOSISTEMA_DRIVE_360\02_CARPINTERIA_RESIDENCIAL\06_MANIFIESTOS_Y_REGLAS\negocio.json
 */
window.CLOSETS_MASTER = {
  empresa: {
    nombre: "Closets-Closets Design & More",
    corto: "Closets-Closets",
    subtitulo: "Diseño Arquitectónico, Carpintería Modular & Interiorismo",
    director: "Closets-Closets Design & More",
    domicilio: "Calle Julio A. Roca 9417, Col. Fomerrey 87, Monterrey, N.L.",
    whatsappE164: "528134575939",
    whatsappDisplay: "81 3457 5939",
    whatsappUrl: "https://wa.me/528134575939",
    facebookUrl: "https://www.facebook.com/profile.php?id=61573131999253",
    email: "contacto@closets-closets.com",
    leyendaLegal: "Rango estimado preliminar sujeto a rectificación milimétrica de medidas, visita en obra y elección definitiva de materiales. Precios más IVA en caso de requerir factura fiscal."
  },

  zonas: [
    { id: "Monterrey / Cumbres", label: "Monterrey / Cumbres / Mitras", fleteMin: 800, fleteMax: 1200 },
    { id: "San Pedro Garza García", label: "San Pedro Garza García / Valle", fleteMin: 1200, fleteMax: 1800 },
    { id: "Carretera Nacional / Santiago", label: "Carretera Nacional / Santiago", fleteMin: 1600, fleteMax: 2200 },
    { id: "San Nicolás / Guadalupe / Apodaca", label: "San Nicolás / Guadalupe / Apodaca", fleteMin: 1000, fleteMax: 1600 },
    { id: "Santa Catarina / García / Escobedo", label: "Santa Catarina / García / Escobedo", fleteMin: 1200, fleteMax: 2000 }
  ],

  gamas: {
    taller_mty: {
      id: "taller_mty",
      nombre: "Línea Taller MTY",
      etiqueta: "Práctica & Sólida",
      material: "Melamina 16mm Masisa/Arauco (RH en zonas húmedas)",
      canto: "Tapacanto PVC 1.0mm / 0.45mm",
      herraje: "Corredera telescópica & bisagra cazoleta cierre suave",
      entrega: "12 a 18 días hábiles",
      factorPrecio: 1.0
    },
    boutique_spgg: {
      id: "boutique_spgg",
      nombre: "Línea Boutique / San Pedro",
      etiqueta: "Diseño de Autor",
      material: "Frentes Egger Feelwood / Alvic Luxe & Zenit PUR 2mm",
      canto: "Canto termofusionado PUR 2.0mm",
      herraje: "Herrajes Blum (Legrabox / Aventos / Clip Top Blumotion)",
      entrega: "21 a 28 días hábiles",
      factorPrecio: 1.0
    }
  },

  categorias: {
    CLOSET: {
      id: "CLOSET",
      nombre: "Clóset Residencial",
      iconoLabel: "CL-32",
      desc: "Módulos piso a techo con maletero superior, cajonera interior, zapatera y barra cromada.",
      largoDefault: 2.0,
      largoMin: 1.2,
      largoMax: 5.0,
      altoDefault: 2.4,
      altoMin: 1.8,
      altoMax: 2.7,
      fondoDefault: 0.6,
      subtipos: [
        { id: "CLOSET_ABATIBLE", nombre: "Puertas Abatibles + Maletero", desc: "Frente limpio de piso a techo con bisagra cazoleta" },
        { id: "CLOSET_CORREDIZO", nombre: "Puertas Corredizas (Espacio Reducido)", desc: "Riel superior oculto; ideal cuando hay cama cerca" },
        { id: "CLOSET_MIXTO", nombre: "Mixto con Cajonera Central Vista", desc: "Torre central de cajones con módulos laterales" },
        { id: "CLOSET_ABIERTO", nombre: "Modular Abierto Sin Puertas", desc: "Acceso rápido tipo boutique con iluminación vertical" }
      ],
      opcionesExtra: [
        { id: "espejo", nombre: "Puertas con Luna de Espejo 4mm (Adhesivo MS + 4 bisagras c/u)", minMty: 3500, maxMty: 4500, minBou: 5500, maxBou: 7500 },
        { id: "zapatera", nombre: "Módulo Zapatero Inclinado / Extraíble Telescópico", minMty: 1800, maxMty: 2800, minBou: 4500, maxBou: 6800 },
        { id: "led", nombre: "Iluminación LED Cálida 3000K en Bahías", minMty: 2400, maxMty: 3800, minBou: 4200, maxBou: 6500 },
        { id: "joyero", nombre: "Cajón Joyero con Divisores & Terciopelo", minMty: 2200, maxMty: 3500, minBou: 4900, maxBou: 6500 },
        { id: "pantalonero", nombre: "Pantalonero Telescópico + Corbatero Extraíble", minMty: 1900, maxMty: 3200, minBou: 3900, maxBou: 5800 }
      ],
      rangosBase: {
        taller_mty: { min: 16000, max: 22000, refLargo: 1.9, minM2Extra: 4200, maxM2Extra: 5500 },
        boutique_spgg: { min: 38000, max: 62000, refLargo: 2.4, minM2Extra: 8500, maxM2Extra: 11500 }
      }
    },

    WALKIN: {
      id: "WALKIN",
      nombre: "Vestidor / Walk-in Closet",
      iconoLabel: "WK-32",
      desc: "Arquitectura de vestidor abierto perimetral con opción de isla joyera central y cancelería.",
      largoDefault: 3.6,
      largoMin: 2.2,
      largoMax: 8.0,
      altoDefault: 2.4,
      altoMin: 2.1,
      altoMax: 2.8,
      fondoDefault: 0.6,
      subtipos: [
        { id: "WALKIN_LINEAL_DOBLE", nombre: "Dos Muros Paralelos (Pasillo)", desc: "Aprovechamiento simétrico para pareja" },
        { id: "WALKIN_L", nombre: "Vestidor en Escuadra 'L'", desc: "Esquinero continuo con doble tubo" },
        { id: "WALKIN_ISLA", nombre: "Perimetral en 'U' + Isla Joyera", desc: "Isla central con gavetas y cubierta cristal" },
        { id: "WALKIN_CRISTAL", nombre: "Vitrinas Cancelería Aluminio & Cristal", desc: "Módulos cerrados antipolvo estilo boutique" }
      ],
      opcionesExtra: [
        { id: "isla", nombre: "Isla Central con Cajones & Exhibidor Cristal", minMty: 9500, maxMty: 14000, minBou: 18500, maxBou: 28000 },
        { id: "led_vertical", nombre: "Tiras LED COB Verticales Empotradas 3000K", minMty: 3800, maxMty: 5800, minBou: 7500, maxBou: 11000 },
        { id: "zapateras_pro", nombre: "Torre Doble Zapatera Extraíble Telescópica", minMty: 3200, maxMty: 4800, minBou: 6800, maxBou: 9500 }
      ],
      rangosBase: {
        taller_mty: { min: 25000, max: 45000, refLargo: 3.5, minM2Extra: 5200, maxM2Extra: 7200 },
        boutique_spgg: { min: 45000, max: 85000, refLargo: 4.0, minM2Extra: 9500, maxM2Extra: 14500 }
      }
    },

    COCINA: {
      id: "COCINA",
      nombre: "Cocina Integral",
      iconoLabel: "CC-90",
      desc: "Gabinetes bajos y alacenas a techo con Sistema 32, zócalo sellado y opción de barra/cubierta.",
      largoDefault: 3.6,
      largoMin: 1.8,
      largoMax: 8.5,
      altoDefault: 2.4,
      altoMin: 2.1,
      altoMax: 2.7,
      fondoDefault: 0.6,
      subtipos: [
        { id: "COCINA_LINEAL", nombre: "Lineal + Nicho Refri / Alacena", desc: "Ideal para departamentos o muros corridos" },
        { id: "COCINA_L_PENINSULA", nombre: "En 'L' con Barra / Península", desc: "Escuadra funcional más barra desayunadora" },
        { id: "COCINA_ISLA", nombre: "Frente a Techo + Gran Isla Central", desc: "Torre de hornos posterior e isla de trabajo" },
        { id: "COCINA_U", nombre: "En 'U' Completa Envolvente", desc: "Máximo almacenamiento en tres muros" }
      ],
      opcionesExtra: [
        { id: "isla_central", nombre: "+ Integrar Isla Central Desayunadora con Cascada", minMty: 12000, maxMty: 22000, minBou: 26000, maxBou: 45000 },
        { id: "lavavajillas", nombre: "Nicho & Frente Preparado para Lavavajillas 60cm", minMty: 2200, maxMty: 3600, minBou: 4200, maxBou: 6500 },
        { id: "tarja_doble", nombre: "Tarja Doble Submontar Cal. 16 + Monomando Arquitectónico", minMty: 4800, maxMty: 8200, minBou: 9500, maxBou: 16500 },
        { id: "parrilla_campana", nombre: "Zona Cocción: Parrilla 5 Quemadores + Campana Purificadora", minMty: 6500, maxMty: 11500, minBou: 14000, maxBou: 24000 },
        { id: "torre_hornos", nombre: "Torre de Hornos Empotrada (Microondas + Horno Convección)", minMty: 5800, maxMty: 9800, minBou: 12000, maxBou: 19500 },
        { id: "alacena_torre_blum", nombre: "Alacena Torre Blum Space Tower con Gavetas Extraíbles", minMty: 7500, maxMty: 12500, minBou: 16500, maxBou: 28000 },
        { id: "esquinero_lemans", nombre: "Herraje Esquinero Extraíble (LeMans / Magic Corner)", minMty: 5200, maxMty: 8500, minBou: 12500, maxBou: 19500 },
        { id: "bote_doble", nombre: "Bote Doble Basura Extraíble con Cierre Suave bajo Tarja", minMty: 1800, maxMty: 2900, minBou: 3800, maxBou: 5500 },
        { id: "cubiertero_cacerolero", nombre: "Cajones Caceroleros Profundos + Organizador Cubiertos", minMty: 2400, maxMty: 4200, minBou: 4800, maxBou: 7800 },
        { id: "cubierta_cuarzo", nombre: "Cubierta Cuarzo Blanco / Calacatta c/ Cascada", minMty: 16500, maxMty: 28000, minBou: 28000, maxBou: 48000 },
        { id: "cubierta_granito", nombre: "Cubierta Granito Natural San Gabriel / Ala de Mosca", minMty: 8500, maxMty: 14500, minBou: 14000, maxBou: 22000 },
        { id: "led_alacena", nombre: "Perfil LED Cálido 3000K Bajo Alacena + Apagador Touch", minMty: 2500, maxMty: 4200, minBou: 4800, maxBou: 8500 }
      ],
      rangosBase: {
        taller_mty: { min: 35000, max: 65000, refLargo: 3.6, minM2Extra: 7800, maxM2Extra: 10500 },
        boutique_spgg: { min: 90000, max: 185000, refLargo: 4.5, minM2Extra: 15500, maxM2Extra: 23000 }
      }
    },

    BANIO: {
      id: "BANIO",
      nombre: "Vanity / Mueble de Baño RH",
      iconoLabel: "BN-RH",
      desc: "Mueble flotante o con patas en sustrato hidrófugo RH antihumedad y cajones con corte en U.",
      largoDefault: 1.2,
      largoMin: 0.7,
      largoMax: 2.8,
      altoDefault: 0.65,
      altoMin: 0.5,
      altoMax: 0.85,
      fondoDefault: 0.5,
      subtipos: [
        { id: "VANITY_1_SENO", nombre: "Flotante Monolítico 1 Ovalín", desc: "2 gavetas con saque en U para céspol" },
        { id: "VANITY_REPISA", nombre: "Flotante c/ Nicho Toallero Abierto", desc: "Cajón superior + repisa inferior decorativa" },
        { id: "VANITY_DOBLE", nombre: "Máster Doble Seno (1.60m+)", desc: "Doble lavabo y 4 gavetas para baño principal" }
      ],
      opcionesExtra: [
        { id: "cubierta_piedra_bn", nombre: "Cubierta Granito / Mármol Santo Tomás + Saque Ovalín", minMty: 3800, maxMty: 6800, minBou: 7500, maxBou: 14500 },
        { id: "espejo_led_bn", nombre: "Espejo Touch LED Retroiluminado Antivaho", minMty: 3200, maxMty: 5200, minBou: 5800, maxBou: 8200 }
      ],
      rangosBase: {
        taller_mty: { min: 6000, max: 14000, refLargo: 1.1, minM2Extra: 3800, maxM2Extra: 5200 },
        boutique_spgg: { min: 18000, max: 32000, refLargo: 1.5, minM2Extra: 7200, maxM2Extra: 10500 }
      }
    },

    TV_ROOM: {
      id: "TV_ROOM",
      nombre: "Muro TV / Lambrín / Bar / Celosía",
      iconoLabel: "DS-INT",
      desc: "Centro de entretenimiento con consola flotante push, lambrín alistonado, mueble bar o celosía.",
      largoDefault: 2.6,
      largoMin: 1.4,
      largoMax: 6.0,
      altoDefault: 2.4,
      altoMin: 1.8,
      altoMax: 2.8,
      fondoDefault: 0.4,
      subtipos: [
        { id: "TV_LAMBRIN", nombre: "Muro TV + Lambrín Acanalado & Consola", desc: "Consola suspendida con pasacables oculto" },
        { id: "TV_VITRINA", nombre: "Centro Integral con Librero / Vitrina", desc: "Torres laterales iluminadas para sala" },
        { id: "BAR_CAVA", nombre: "Mueble Bar Residencial con Cava & Copero", desc: "Botellero modular y barra de preparación" },
        { id: "CELOSIA", nombre: "Celosía Arquitectónica Piso a Techo", desc: "Listones verticales divisores de ambiente" }
      ],
      opcionesExtra: [
        { id: "halo_led", nombre: "Halo LED Cálido Perimetral 3000K + Apagador", minMty: 2200, maxMty: 3600, minBou: 4200, maxBou: 6800 },
        { id: "pasacables", nombre: "Anclaje Estructural Láser + Canaleta Oculta TV", minMty: 1400, maxMty: 2400, minBou: 2500, maxBou: 3800 }
      ],
      rangosBase: {
        taller_mty: { min: 6000, max: 18000, refLargo: 2.2, minM2Extra: 3200, maxM2Extra: 4800 },
        boutique_spgg: { min: 18000, max: 46000, refLargo: 2.8, minM2Extra: 7500, maxM2Extra: 11000 }
      }
    },

    PUERTAS: {
      id: "PUERTAS",
      nombre: "Puertas de Granero & Carpintería Fina",
      iconoLabel: "PG-32",
      desc: "Puertas de corredera artesanal con riel superior de acero forjado negro, madera selecta o laqueada fina.",
      largoDefault: 1.0,
      largoMin: 0.8,
      largoMax: 2.4,
      altoDefault: 2.2,
      altoMin: 1.9,
      altoMax: 2.7,
      fondoDefault: 0.05,
      subtipos: [
        { id: "PUERTA_GRANERO_Z", nombre: "Puerta de Granero Rústica (Aspas en Z)", desc: "Duela de pino selecto o encino con aspas diagonales y riel negro tipo granero" },
        { id: "PUERTA_GRANERO_X", nombre: "Puerta de Granero en 'X' Británica", desc: "Patrón cruzado artesanal con tirador de herrería forjada" },
        { id: "PUERTA_MODERNA_SLIM", nombre: "Puerta Corrediza Moderna Perfil Delgado", desc: "Tablero liso contemporáneo con ranurado vertical y jaladera embutida" },
        { id: "PUERTA_DOBLE_GRANERO", nombre: "Doble Hoja Encuentro Central", desc: "Apertura simétrica para recámaras principales o división de salas" }
      ],
      opcionesExtra: [
        { id: "soft_close_puerta", nombre: "Freno Hidráulico Oculto Soft-Close Bidireccional", minMty: 1400, maxMty: 2200, minBou: 2400, maxBou: 3800 },
        { id: "acabado_poliuretano", nombre: "Acabado Poliuretano Fino Mate / Semimate Anti-rayas", minMty: 2200, maxMty: 3500, minBou: 4200, maxBou: 6200 },
        { id: "jaladera_forjada", nombre: "Jaladera Tubular de Acero Forjado 60cm + Tirador Embutido", minMty: 1200, maxMty: 1900, minBou: 2200, maxBou: 3400 }
      ],
      rangosBase: {
        taller_mty: { min: 6500, max: 12500, refLargo: 1.0, minM2Extra: 3500, maxM2Extra: 5500 },
        boutique_spgg: { min: 14000, max: 26000, refLargo: 1.0, minM2Extra: 7000, maxM2Extra: 11000 }
      }
    }
  },

  calcularRango: function (params) {
    const cat = this.categorias[params.categoria] || this.categorias.CLOSET;
    const gamaKey = params.gama === "boutique_spgg" ? "boutique_spgg" : "taller_mty";
    const baseCfg = cat.rangosBase[gamaKey];

    const largo = Math.max(cat.largoMin, Math.min(cat.largoMax, Number(params.largo || cat.largoDefault)));
    const deltaLargo = largo - baseCfg.refLargo;

    let min = baseCfg.min;
    let max = baseCfg.max;
    if (deltaLargo > 0) {
      min += deltaLargo * baseCfg.minM2Extra;
      max += deltaLargo * baseCfg.maxM2Extra;
    } else if (deltaLargo < -0.25) {
      const ratio = Math.max(0.72, largo / baseCfg.refLargo);
      min = Math.round((min * ratio) / 500) * 500;
      max = Math.round((max * ratio) / 500) * 500;
    }

    // Subtipo isla / cristal / U suma complejidad estructural realista
    const sub = String(params.subtipo || "");
    if (sub.includes("ISLA") || sub.includes("CRISTAL") || sub.includes("_U") || sub.includes("DOBLE")) {
      min *= 1.08;
      max *= 1.12;
    }

    // Extras marcados
    const extrasSeleccionados = Array.isArray(params.extras) ? params.extras : [];
    const extrasDetalle = [];
    cat.opcionesExtra.forEach((ext) => {
      if (extrasSeleccionados.includes(ext.id)) {
        const emin = gamaKey === "boutique_spgg" ? ext.minBou : ext.minMty;
        const emax = gamaKey === "boutique_spgg" ? ext.maxBou : ext.maxMty;
        min += emin;
        max += emax;
        extrasDetalle.push(ext.nombre);
      }
    });

    // Flete ZMM
    const zonaObj = this.zonas.find((z) => z.id === params.zona) || this.zonas[0];
    min += zonaObj.fleteMin;
    max += zonaObj.fleteMax;

    // Redondeo limpio a múltiplos de $500 MXN
    min = Math.round(min / 500) * 500;
    max = Math.max(min + 2000, Math.round(max / 500) * 500);

    return {
      gamaNombre: this.gamas[gamaKey].nombre,
      minMXN: min,
      maxMXN: max,
      anticipoMin60: Math.round((min * 0.6) / 100) * 100,
      anticipoMax60: Math.round((max * 0.6) / 100) * 100,
      fleteTexto: `$${zonaObj.fleteMin.toLocaleString("es-MX")} – $${zonaObj.fleteMax.toLocaleString("es-MX")} MXN (${zonaObj.id})`,
      extrasDetalle
    };
  },

  presets: [
    // === COCINAS (10 MODELOS) ===
    // Nivel 1: Esencial / Clásico
    {
      id: "cocina_lineal_esencial",
      label: "🍳 Cocina Lineal Esencial (2.4m)",
      cat: "COCINA",
      sub: "COCINA_LINEAL",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 2.4,
      alto: 2.3,
      fondo: 0.6,
      extras: ["tarja_doble", "cubiertero_cacerolero"]
    },
    {
      id: "cocina_l_tradicional",
      label: "🍳 Cocina en 'L' Tradicional",
      cat: "COCINA",
      sub: "COCINA_L_PENINSULA",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 3.2,
      alto: 2.3,
      fondo: 0.6,
      extras: ["tarja_doble", "cubiertero_cacerolero", "cubierta_granito"]
    },
    {
      id: "cocina_barra_volada",
      label: "🍳 Cocina Lineal c/ Barra Volada",
      cat: "COCINA",
      sub: "COCINA_LINEAL",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 3.0,
      alto: 2.3,
      fondo: 0.6,
      extras: ["tarja_doble", "parrilla_campana"]
    },
    // Nivel 2: Contemporáneo
    {
      id: "cocina_l_torre_hornos",
      label: "🍳 Cocina en 'L' + Torre de Hornos",
      cat: "COCINA",
      sub: "COCINA_L_PENINSULA",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 4.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["torre_hornos", "tarja_doble", "parrilla_campana", "cubiertero_cacerolero", "led_alacena"]
    },
    {
      id: "cocina_peninsula_cuarzo",
      label: "🍳 Cocina en L + Península Cuarzo",
      cat: "COCINA",
      sub: "COCINA_L_PENINSULA",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 4.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla_central", "cubierta_cuarzo", "tarja_doble", "cubiertero_cacerolero", "led_alacena"]
    },
    {
      id: "cocina_u_ergonomica",
      label: "🍳 Cocina en 'U' Ergonómica",
      cat: "COCINA",
      sub: "COCINA_U",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 4.5,
      alto: 2.4,
      fondo: 0.6,
      extras: ["esquinero_lemans", "tarja_doble", "parrilla_campana", "torre_hornos", "led_alacena"]
    },
    {
      id: "cocina_alacenas_techo_botes",
      label: "🍳 Cocina Techo Alto + Botes Ocultos",
      cat: "COCINA",
      sub: "COCINA_LINEAL",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 3.6,
      alto: 2.4,
      fondo: 0.6,
      extras: ["bote_doble", "tarja_doble", "cubiertero_cacerolero", "led_alacena"]
    },
    // Nivel 3: Signature
    {
      id: "cocina_chef_suite_fluted",
      label: "💎 Chef Suite: Gran Isla Fluted en Cascada",
      cat: "COCINA",
      sub: "COCINA_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 5.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla_central", "cubierta_cuarzo", "alacena_torre_blum", "esquinero_lemans", "torre_hornos", "lavavajillas", "tarja_doble", "bote_doble", "led_alacena"]
    },
    {
      id: "cocina_hidden_pantry",
      label: "💎 The Hidden Pantry (Pocket Doors)",
      cat: "COCINA",
      sub: "COCINA_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 4.8,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla_central", "alacena_torre_blum", "torre_hornos", "cubierta_cuarzo", "lavavajillas"]
    },
    {
      id: "cocina_vitrinas_gala_fume",
      label: "💎 Cocina de Gala: Vitrinas Fumé & LED",
      cat: "COCINA",
      sub: "COCINA_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 5.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla_central", "alacena_torre_blum", "cubierta_cuarzo", "led_alacena", "tarja_doble", "parrilla_campana"]
    },

    // === CLÓSETS & VESTIDORES (6 MODELOS) ===
    // Nivel 1: Esencial
    {
      id: "closet_clasico_abatible",
      label: "✨ Clóset Clásico Piso a Techo",
      cat: "CLOSET",
      sub: "CLOSET_ABATIBLE",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 2.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["zapatera"]
    },
    {
      id: "closet_corredizo_compact",
      label: "✨ Clóset 2 Puertas Corredizas",
      cat: "CLOSET",
      sub: "CLOSET_CORREDIZO",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 1.8,
      alto: 2.3,
      fondo: 0.6,
      extras: ["zapatera"]
    },
    // Nivel 2: Contemporáneo
    {
      id: "closet_12cajones_modular",
      label: "✨ Ropero Modular c/ 12 Cajones",
      cat: "CLOSET",
      sub: "CLOSET_MIXTO",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 2.6,
      alto: 2.4,
      fondo: 0.6,
      extras: ["zapatera", "pantalonero", "joyero"]
    },
    {
      id: "walkin_escuadra_abierto",
      label: "👔 Vestidor Walk-in Abierto en 'L'",
      cat: "WALKIN",
      sub: "WALKIN_L",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 3.4,
      alto: 2.4,
      fondo: 0.6,
      extras: ["zapateras_pro", "led_vertical"]
    },
    // Nivel 3: Signature
    {
      id: "walkin_master_boutique_isla",
      label: "💎 Master Boutique c/ Isla Joyero Cristal",
      cat: "WALKIN",
      sub: "WALKIN_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 4.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla", "led_vertical", "zapateras_pro"]
    },
    {
      id: "walkin_espejo_infinito_fume",
      label: "💎 Vestidor Signature Cancelería & Fumé",
      cat: "WALKIN",
      sub: "WALKIN_CRISTAL",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 4.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["led_vertical", "zapateras_pro", "isla"]
    },

    // === MUROS TV, BARES & LAMBRÍN (4 MODELOS) ===
    {
      id: "tv_consola_flotante_clasica",
      label: "🪵 Consola Flotante TV con Pasacables",
      cat: "TV_ROOM",
      sub: "TV_LAMBRIN",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 1.8,
      alto: 0.5,
      fondo: 0.4,
      extras: ["pasacables"]
    },
    {
      id: "tv_panel_respaldo_nogal",
      label: "🪵 Muro Respaldo Nogal + Consola Push",
      cat: "TV_ROOM",
      sub: "TV_LAMBRIN",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 2.4,
      alto: 2.4,
      fondo: 0.4,
      extras: ["halo_led", "pasacables"]
    },
    {
      id: "tv_lambrin_acanalado_cantilever",
      label: "💎 Muro Lambrín Acanalado + Cantilever",
      cat: "TV_ROOM",
      sub: "TV_LAMBRIN",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 3.2,
      alto: 2.4,
      fondo: 0.4,
      extras: ["halo_led", "pasacables"]
    },
    {
      id: "cava_bar_lounge_poker",
      label: "💎 Bar Residencial & Cava Lounge",
      cat: "TV_ROOM",
      sub: "BAR_CAVA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 3.0,
      alto: 2.4,
      fondo: 0.55,
      extras: ["halo_led"]
    },

    // === BAÑOS & VANITIES RH (3 MODELOS) ===
    {
      id: "banio_bajolavabo_clasico",
      label: "🚿 Bajolavabo Clásico 1 Puerta/Cajón",
      cat: "BANIO",
      sub: "VANITY_1_SENO",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 0.8,
      alto: 0.65,
      fondo: 0.5,
      extras: []
    },
    {
      id: "banio_vanity_nicho_abierto",
      label: "🚿 Vanity Flotado Nogal c/ Nicho Toallero",
      cat: "BANIO",
      sub: "VANITY_REPISA",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 1.2,
      alto: 0.65,
      fondo: 0.5,
      extras: ["cubierta_piedra_bn"]
    },
    {
      id: "banio_vanity_curvo_doble_rh",
      label: "💎 Vanity Flotante Doble Seno RH + Espejo Touch",
      cat: "BANIO",
      sub: "VANITY_DOBLE",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 1.8,
      alto: 0.65,
      fondo: 0.5,
      extras: ["cubierta_piedra_bn", "espejo_led_bn"]
    },

    // === PUERTAS & RECIBIDORES (2 MODELOS) ===
    {
      id: "puerta_granero_rustica_z",
      label: "🚪 Puerta Granero Rústica con Riel Forjado",
      cat: "PUERTAS",
      sub: "PUERTA_GRANERO_Z",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 1.0,
      alto: 2.2,
      fondo: 0.05,
      extras: ["soft_close_puerta", "acabado_poliuretano", "jaladera_forjada"]
    },
    {
      id: "recibidor_dropzone_lambrin",
      label: "💎 Drop-Zone Recibidor Lambrín & Espejo",
      cat: "TV_ROOM",
      sub: "CELOSIA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 1.6,
      alto: 2.4,
      fondo: 0.35,
      extras: ["halo_led", "pasacables"]
    }
  ]
};
