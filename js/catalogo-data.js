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
    {
      id: "cocina_l_isla",
      label: "🍳 Cocina en 'L' + Isla Central",
      cat: "COCINA",
      sub: "COCINA_L_PENINSULA",
      largo: 4.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla_central", "parrilla_campana", "tarja_doble", "cubiertero_cacerolero", "led_alacena"]
    },
    {
      id: "cocina_chef_completa",
      label: "💎 Cocina Integral Alta Gama + Blum",
      cat: "COCINA",
      sub: "COCINA_ISLA",
      largo: 4.8,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla_central", "alacena_torre_blum", "esquinero_lemans", "torre_hornos", "lavavajillas", "tarja_doble", "bote_doble", "cubierta_cuarzo"]
    },
    {
      id: "walkin_master_isla",
      label: "👔 Vestidor Walk-in c/ Isla Joyero",
      cat: "WALKIN",
      sub: "WALKIN_ISLA",
      largo: 4.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["isla", "led_vertical", "zapateras_pro"]
    },
    {
      id: "closet_3modulos_espejo",
      label: "✨ Clóset 3 Módulos c/ Espejo & LED",
      cat: "CLOSET",
      sub: "CLOSET_MIXTO",
      largo: 2.4,
      alto: 2.4,
      fondo: 0.6,
      extras: ["espejo", "zapatera", "led", "joyero"]
    },
    {
      id: "puerta_granero_rustica",
      label: "🚪 Puerta Granero Rústica Artesanal",
      cat: "PUERTAS",
      sub: "PUERTA_GRANERO_Z",
      largo: 1.0,
      alto: 2.2,
      fondo: 0.05,
      extras: ["soft_close_puerta", "acabado_poliuretano", "jaladera_forjada"]
    },
    {
      id: "muro_tv_lambrin_cava",
      label: "🪵 Muro TV Lambrín + Bar Cava",
      cat: "TV_ROOM",
      sub: "TV_LAMBRIN",
      largo: 3.2,
      alto: 2.4,
      fondo: 0.4,
      extras: ["halo_led", "pasacables"]
    }
  ]
};
