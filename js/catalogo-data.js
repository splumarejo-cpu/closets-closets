/**
 * Catálogo maestro, tabulador oficial y Motor de Reglas "Diseñador Senior Sistema 32"
 * Closets-Closets Design & More — Monterrey & San Pedro Garza García, N.L.
 * Especialización 100% Melamina / Tablero Modular Sistema 32:
 * Cocinas Integrales, Clósets, Vestidores Walk-in, Vanities RH, Muebles TV, Percheros y Almacenamiento.
 */
window.CLOSETS_MASTER = {
  empresa: {
    nombre: "Closets-Closets Design & More",
    corto: "Closets-Closets",
    subtitulo: "Ingeniería de Almacenamiento Modular Sistema 32 · Cocinas, Clósets, Vanities & TV",
    director: "Closets-Closets Design & More",
    domicilio: "Calle Julio A. Roca 9417, Col. Fomerrey 87, Monterrey, N.L.",
    whatsappE164: "528134575939",
    whatsappDisplay: "81 3457 5939",
    whatsappUrl: "https://wa.me/528134575939",
    facebookUrl: "https://www.facebook.com/profile.php?id=61573131999253",
    email: "contacto@closets-closets.com",
    leyendaLegal: "Rango estimado preliminar sujeto a rectificación milimétrica de medidas, visita en obra y elección definitiva de materiales. Precios más IVA en caso de requerir factura fiscal."
  },

  // Base de Conocimiento del Agente Diseñador Senior (Estándares Reales de Taller MTY + Sistema 32 + NKBA)
  estandaresSenior: {
    cocina: {
      alturaSuperficieMelaminaCm: 91, // 81 cm casco + 10 cm patas niveladoras = 91 cm a superficie melamina
      alturaCascoBajoCm: 81,
      patasNiveladoras: {
        estandar100mm: {
          nominalCm: 10,
          rangoAjusteCm: "9.5 a 11.8 cm",
          capacidadKg: "100 kg por pata",
          tapeta: "Tapeta clip PVC color Aluminio c/ sello sanitario (evita bichos y desmontable para fumigación)"
        },
        ergonomica120mm: {
          nominalCm: 12,
          rangoAjusteCm: "11.5 a 14.8 cm",
          capacidadKg: "120 kg por pata",
          tapeta: "Tapeta clip PVC color Aluminio alta ergonomía (cubierta final a 93-95 cm)"
        }
      },
      golaManguete: {
        mangueteSuperiorCm: 5.5,
        corteFrente: "Chaflán / Corte a 45° en borde superior de puerta o gaveta",
        funcion: "Baja 5.5 a 6 cm desde el techo del módulo para acompañar el faldón de la cubierta de granito/cuarzo y formar el canal Gola libre para los dedos."
      },
      alacenasEscalonadas: {
        umbralDoblePisoCm: 80,
        fondoPrimerPisoCm: 32,
        fondoSegundoPisoCm: 42,
        nota: "Cuando la altura disponible de alacena supera los 80 cm (techos ≥ 2.35 m), se divide en 2 niveles: 1° Piso de uso diario a 32 cm de fondo (ergonómico, evita golpes en cabeza) + 2° Piso de Sobrealacena a techo con 42 cm de fondo (+10 cm de voladizo frontal para jerarquía volumétrica)."
      },
      reglaPuertas: {
        umbralDobleHojaCm: 60,
        nota: "Módulos < 60 cm llevan 1 hoja abatible; módulos ≥ 60 cm llevan 2 hojas simétricas (ej. 60 cm = 2 puertas de 29.7 cm; 90 cm = 2 puertas de 44.7 cm) para evitar vencimiento de bisagras e invasión de pasillo."
      },
      coccion: {
        parrillaEmpotrada: "Dimensionable de 60 cm (2-4 flamas), 75 cm (5 flamas) a 90 cm (6 flamas). Debajo lleva 2 cajones medianos (cubiertos/utensilios) + 1 gaveta cacerolera profunda abajo.",
        parrillaConHorno: "Módulo de 60-75 cm con parrilla superior en cubierta y horno empotrado sin base en el gabinete inferior.",
        estufaPiso: "Estufa completa de piso (76 cm / 30\"): interrumpe el zoclo, el casco y corta la continuidad de la cubierta de piedra."
      },
      cubiertasPiedra: {
        prohibicionMarmol: "JAMÁS Mármol en cocina: es roca calcárea porosa que se mancha y quema con limón, vinagre, vino y grasa caliente. Solo Cuarzo o Granito.",
        rendimientoPlacaML: 4.8,
        incluyeLlaveEnMano: "Suministro de placa seleccionada, plantillado milimétrico en obra, fabricación de cortes (tarja, parrilla, faldones a 45°, zoclo), logística, gestión de proyecto e instalación nivelada llave en mano."
      }
    }
  },

  // =========================================================================
  // COLECCIÓN ESTACIONAL & MARCAS ALIADAS CERTIFICADAS
  // (Actualizable cada temporada en un solo bloque centralizado)
  // =========================================================================
  coleccionTemporada: {
    id: "invierno_2027",
    badge: "TENDENCIA INVIERNO 2027",
    titulo: "Tendencia Invierno 2027 · Edición Curada",
    subtitulo: "Maderas cálidas de veta sincrónica, tonos arquitectónicos supermate antihuellas y piedra de alto desempeño con marcas certificadas.",
    vigencia: "Edición Otoño / Invierno 2026–2027",
    marcasAliadas: [
      { id: "arauco", nombre: "Arauco · Vesto", rol: "Melamina Antimicrobiana 16/18mm", gama: "Taller MTY & Boutique", detalle: "Tablero con protección de cobre antimicrobiana y versiones hidrófugas (RH) para zonas húmedas." },
      { id: "masisa", nombre: "Masisa México", rol: "Sustratos MDP/MDF & Melaminas", gama: "Taller MTY", detalle: "Tableros estructurales estables para cascos Sistema 32 y tapacanto termofusionado." },
      { id: "egger", nombre: "Egger Feelwood", rol: "Textura Sincrónica Poro Profundo", gama: "Boutique / San Pedro", detalle: "Diseño europeo donde la textura sigue exactamente el dibujo de la veta natural." },
      { id: "alvic", nombre: "Alvic Luxe & Zenit", rol: "Frentes Alto Brillo & Supermate PUR", gama: "Boutique / San Pedro", detalle: "Lacados españoles antihuellas con canteado PUR 2.0mm cero filtración." },
      { id: "blum", nombre: "Blum Austria", rol: "Sistemas de Movimiento Alta Gama", gama: "Boutique / San Pedro", detalle: "Cajones Legrabox / Tandembox, abatibles Aventos y bisagras CLIP top Blumotion." },
      { id: "hafele", nombre: "Häfele · Kesseböhmer", rol: "Equipamiento Extraíble Alemán", gama: "Opcional Especial", detalle: "Esquineros articulados LeMans, despensas extraíbles e iluminación perfil LED." },
      { id: "ducasse", nombre: "Ducasse · Handy Home", rol: "Correderas & Herrajes Funcionales", gama: "Taller MTY", detalle: "Rieles corredizos silenciosos, correderas telescópicas y niveladores de zoclo 100/120mm." },
      { id: "piedra", nombre: "Cuarzo & Granito", rol: "Cubiertas Llave en Mano", gama: "Cocinas & Vanitys", detalle: "Solo granito natural o cuarzo de ingeniería instalado llave en mano (jamás mármol en cocina)." }
    ],
    acabadosCarpinteria: [
      { id: "roble_santana", nombre: "Roble Santana", marca: "Arauco · Vesto", tag: "Cálido 2027", gamaCompat: "Ambas gamas", hex: "#B8926A", img: "assets/texturas/roble-santana.webp", desc: "Roble natural luminoso ideal para cocinas amplias y vestidores cálidos." },
      { id: "nogal_neo", nombre: "Nogal Neo", marca: "Arauco · Vesto", tag: "Favorito SPGG", gamaCompat: "Ambas gamas", hex: "#5A4032", img: "assets/texturas/nogal-neo.webp", desc: "Nogal arquitectónico medio, balance entre sobriedad y veta continua." },
      { id: "malta_arena", nombre: "Malta Cashmere", marca: "Arauco · Vesto RH", tag: "Invierno 2027", gamaCompat: "Ambas gamas", hex: "#D6C9B8", img: "assets/texturas/malta-arena.webp", desc: "Tono lino arena texturizado; ilumina alacenas superiores y clósets." },
      { id: "fresno_bruma", nombre: "Fresno Bruma", marca: "Masisa / Egger", tag: "Greige Nórdico", gamaCompat: "Ambas gamas", hex: "#9B9286", img: "assets/texturas/fresno-bruma.webp", desc: "Madera deslavada en tono topo-grisáceo para diseños contemporáneos." },
      { id: "turmalina_verde", nombre: "Verde Turmalina", marca: "Arauco · Vesto", tag: "Color 2027", gamaCompat: "Acento Invierno", hex: "#3F5246", img: "assets/texturas/turmalina-verde.webp", desc: "Verde salvia profundo; ideal en islas de cocina, vanities y recibidores." },
      { id: "gris_luxe", nombre: "Gris Grafito Zenit", marca: "Alvic Zenit Mate", tag: "Antihuellas PUR", gamaCompat: "Boutique / SPGG", hex: "#6E7175", img: "assets/texturas/gris-luxe.webp", desc: "Supermate sedoso antihuellas para cocinas con perfil Gola a 45°." },
      { id: "oxford_blue", nombre: "Azul Oxford Mate", marca: "Alvic / Vesto", tag: "Invierno 2027", gamaCompat: "Boutique / SPGG", hex: "#0F2744", img: "assets/texturas/oxford-blue.webp", desc: "Azul profundo de acento contrastado con cubiertas blancas Calacatta." },
      { id: "nogal_americano", nombre: "Nogal Sincrónico", marca: "Egger Feelwood", tag: "Poro Real PUR", gamaCompat: "Boutique / SPGG", hex: "#6B4C35", img: "assets/texturas/nogal-americano.webp", desc: "Veta profunda sincronizada de nogal americano para vestidores y bares." },
      { id: "blanco_mate", nombre: "Blanco Puro Mate", marca: "Arauco / Alvic", tag: "Clásico Lumínico", gamaCompat: "Ambas gamas", hex: "#F5F3EE", img: "assets/texturas/blanco-mate.webp", desc: "Blanco cálido mate para alacenas limpias o interiores de vestidor." }
    ],
    acabadosPiedra: [
      { id: "cuarzo_calacatta", nombre: "Cuarzo Calacatta Light", tipo: "Cuarzo de Ingeniería", extraId: "cubierta_cuarzo", hex: "#EEECEA", img: "assets/texturas/cuarzo-calacatta.webp", desc: "Veta gris suave sobre fondo blanco luminoso; cero porosidad." },
      { id: "cuarzo_estelar", nombre: "Cuarzo Blanco Micrograno", tipo: "Cuarzo de Ingeniería", extraId: "cubierta_cuarzo", hex: "#E8E8E6", img: "assets/texturas/cuarzo-estelar.webp", desc: "Blanco cristalino uniforme ideal para islas y barras continuas." },
      { id: "granito_via_lactea", nombre: "Granito Vía Láctea Leather", tipo: "Granito Natural", extraId: "cubierta_granito", hex: "#2E3033", img: "assets/texturas/granito-via-lactea.webp", desc: "Piedra natural negra mate cepillada con veta mineral blanca." }
    ]
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
      material: "Melamina 16mm Masisa/Arauco (RH hidrófuga en zonas húmedas)",
      canto: "Tapacanto PVC 1.0mm / 0.45mm + Gola corte 45°",
      herraje: "Corredera telescópica & bisagra cazoleta cierre suave + patas niveladoras 100mm",
      entrega: "12 a 18 días hábiles",
      factorPrecio: 1.0
    },
    boutique_spgg: {
      id: "boutique_spgg",
      nombre: "Línea Boutique / San Pedro",
      etiqueta: "Ingeniería de Autor",
      material: "Frentes Egger Feelwood / Alvic Luxe & Zenit PUR 2mm (Casco 16/18mm)",
      canto: "Canto termofusionado PUR 2.0mm + Gola 45° / Perfil Aluminio",
      herraje: "Herrajes Blum (Tandembox / Legrabox / Aventos / Clip Top Blumotion)",
      entrega: "21 a 28 días hábiles",
      factorPrecio: 1.0
    }
  },

  categorias: {
    COCINA: {
      id: "COCINA",
      nombre: "Cocina Integral",
      iconoLabel: "CC-91",
      desc: "Cocina integral modular a la medida con cierre suave, frentes Gola 45° y cubierta de cuarzo o granito.",
      largoDefault: 3.6,
      largoMin: 1.8,
      largoMax: 8.5,
      altoDefault: 2.4,
      altoMin: 2.1,
      altoMax: 2.7,
      fondoDefault: 0.6,
      subtipos: [
        { id: "COCINA_LINEAL", nombre: "Lineal + Nicho Refri / Torre", desc: "Tramo recto con bajo tarja, bajo parrilla (60-90cm) y torre lateral" },
        { id: "COCINA_L_PENINSULA", nombre: "En Escuadra 'L' + Esquinero", desc: "Muro A + Muro B con esquinero configurable (Extraíble o Entrepaños)" },
        { id: "COCINA_ISLA", nombre: "Frente a Techo + Gran Isla Central", desc: "Muro posterior con torres + isla central de trabajo con faldón" },
        { id: "COCINA_U", nombre: "Perimetral en 'U' (3 Muros)", desc: "Máximo almacenamiento continuo con 2 esquinas protegidas" }
      ],
      opcionesExtra: [
        { id: "sobrealacena_42cm", nombre: "Alacena de 2 Pisos hasta Techo (Almacenamiento Superior Extra)", minMty: 3800, maxMty: 6400, minBou: 6200, maxBou: 9800, defaultActive: true },
        { id: "gola_manguete45", nombre: "Frentes sin Jaladera (Perfil Gola 45°)", minMty: 1800, maxMty: 3200, minBou: 2800, maxBou: 4800, defaultActive: true },
        { id: "zoclo_12cm", nombre: "Barra Alta (93 cm) con Zoclo Sellado de Aluminio", minMty: 900, maxMty: 1500, minBou: 1200, maxBou: 2000 },
        { id: "cubiertero_cacerolero", nombre: "Bajo Parrilla: 2 Cajones Medianos Cubierteros + 1 Gaveta Cacerolera Grande", minMty: 2400, maxMty: 4200, minBou: 3800, maxBou: 6200, defaultActive: true },
        { id: "esquinero_lemans", nombre: "Esquinero en Escuadra: Herraje Extraíble Articulado (LeMans / Magic Corner)", minMty: 5200, maxMty: 8500, minBou: 10500, maxBou: 16500 },
        { id: "cubierta_granito", nombre: "Cubierta Granito Natural (San Gabriel / Gris Oxford) — Llave en Mano Instalada", minMty: 23500, maxMty: 29500, minBou: 26000, maxBou: 34000 },
        { id: "cubierta_cuarzo", nombre: "Cubierta Cuarzo de Ingeniería (Blanco / Calacatta) — Llave en Mano Instalada", minMty: 28500, maxMty: 38500, minBou: 34000, maxBou: 48000 },
        { id: "tarja_doble", nombre: "Suministro Opcional Equipo: Tarja Submontar Cal.16 + Monomando (Módulo RH Incluido)", minMty: 4800, maxMty: 7800, minBou: 7500, maxBou: 12000 },
        { id: "parrilla_campana", nombre: "Suministro Opcional Equipo: Parrilla Empotrada (60–90cm · 2-6 Flamas) + Campana", minMty: 6800, maxMty: 11200, minBou: 11500, maxBou: 18500 },
        { id: "torre_hornos", nombre: "Torre de Hornos Empotrada (Microondas + Horno + Gavetas Inferiores)", minMty: 5800, maxMty: 9800, minBou: 9500, maxBou: 14500 },
        { id: "alacena_torre_blum", nombre: "Alacena Despensero Torre Blum Space Tower (5 Gavetas Extraíbles)", minMty: 7500, maxMty: 12500, minBou: 14000, maxBou: 22000 },
        { id: "bote_doble", nombre: "Carro Extraíble Bote Doble Basura con Cierre Suave", minMty: 1800, maxMty: 2900, minBou: 3200, maxBou: 4800 },
        { id: "isla_central", nombre: "+ Integrar Isla Central Desayunadora con Faldón en Cascada", minMty: 12000, maxMty: 22000, minBou: 22000, maxBou: 36000 },
        { id: "lavavajillas", nombre: "Nicho & Preparación para Lavavajillas 60cm", minMty: 2200, maxMty: 3600, minBou: 3500, maxBou: 5500 },
        { id: "led_alacena", nombre: "Perfil LED Cálido 3000K Bajo Alacena + Sensor Touch", minMty: 2500, maxMty: 4200, minBou: 4200, maxBou: 7200 }
      ],
      rangosBase: {
        taller_mty: { min: 32000, max: 54000, refLargo: 3.6, minM2Extra: 7200, maxM2Extra: 9800 },
        boutique_spgg: { min: 76000, max: 136000, refLargo: 4.2, minM2Extra: 13500, maxM2Extra: 19500 }
      }
    },

    CLOSET: {
      id: "CLOSET",
      nombre: "Clóset Residencial",
      iconoLabel: "CL-32",
      desc: "Almacenamiento de recámara piso a techo en Melamina Sistema 32: maletero corrido, cajoneras soft-close, zapatera, doble colgado y puertas simétricas (regla ≥60cm = 2 hojas).",
      largoDefault: 2.4,
      largoMin: 1.2,
      largoMax: 5.5,
      altoDefault: 2.4,
      altoMin: 1.8,
      altoMax: 2.7,
      fondoDefault: 0.6,
      subtipos: [
        { id: "CLOSET_ABATIBLE", nombre: "Puertas Abatibles + Maletero", desc: "Frente cerrado limpio con regla ≥60cm = par de puertas simétricas" },
        { id: "CLOSET_CORREDIZO", nombre: "Puertas Corredizas Riel Oculto", desc: "Ahorro de espacio cuando la cama queda a menos de 80 cm" },
        { id: "CLOSET_MIXTO", nombre: "Mixto c/ Cajonera Central Vista", desc: "Torre central de gavetas expuestas + colgados laterales cerrados" },
        { id: "CLOSET_ABIERTO", nombre: "Modular Abierto Tipo Boutique", desc: "Interior arquitectónico a la vista con entrepaños y cajones" }
      ],
      opcionesExtra: [
        { id: "zapatera", nombre: "Torre Zapatera Inclinada c/ Topes o Extraíble Telescópica", minMty: 1800, maxMty: 2800, minBou: 3800, maxBou: 5400, defaultActive: true },
        { id: "espejo", nombre: "Puertas con Luna de Espejo 4mm (Adhesivo MS + 4 Bisagras Cazoleta c/u)", minMty: 3500, maxMty: 4500, minBou: 4800, maxBou: 6800 },
        { id: "pantalonero", nombre: "Perchero Pantalonero Telescópico + Corbatero Extraíble", minMty: 1900, maxMty: 3200, minBou: 3400, maxBou: 5200 },
        { id: "joyero", nombre: "Cajón Slim Organizador Joyero / Relojero con Divisores", minMty: 2200, maxMty: 3500, minBou: 4200, maxBou: 5800 },
        { id: "led", nombre: "Iluminación LED Cálida 3000K Vertical en Módulos", minMty: 2400, maxMty: 3800, minBou: 3800, maxBou: 5800 }
      ],
      rangosBase: {
        taller_mty: { min: 16500, max: 24000, refLargo: 2.0, minM2Extra: 4200, maxM2Extra: 5600 },
        boutique_spgg: { min: 34000, max: 52000, refLargo: 2.4, minM2Extra: 7800, maxM2Extra: 10500 }
      }
    },

    WALKIN: {
      id: "WALKIN",
      nombre: "Vestidor / Walk-in Closet",
      iconoLabel: "WK-32",
      desc: "Ingeniería de vestidor perimetral en Melamina Sistema 32 (Muros A, B y C) con esquineros de doble tubo sin choque de cajones, zapateras e isla joyera central.",
      largoDefault: 3.6,
      largoMin: 2.2,
      largoMax: 8.0,
      altoDefault: 2.4,
      altoMin: 2.1,
      altoMax: 2.8,
      fondoDefault: 0.6,
      subtipos: [
        { id: "WALKIN_L", nombre: "Vestidor en Escuadra 'L'", desc: "Muro A + Muro B con esquinero de colgado continuo y cajones libres" },
        { id: "WALKIN_LINEAL_DOBLE", nombre: "Dos Muros Paralelos (Pasillo)", desc: "Aprovechamiento simétrico Él y Ella con pasillo ergonómico ≥90cm" },
        { id: "WALKIN_ISLA", nombre: "Perimetral en 'U' + Isla Joyera", desc: "3 muros de almacenamiento + isla central con cubierta de cristal" },
        { id: "WALKIN_CRISTAL", nombre: "Boutique c/ Vitrinas Cristal Fumé", desc: "Módulos cerrados antipolvo con perfil de aluminio y cristal" }
      ],
      opcionesExtra: [
        { id: "colgadores_dobles", nombre: "Módulos Doble Tubo Ovalado Cromado/Negro (Sacos y Camisas)", minMty: 1800, maxMty: 2800, minBou: 3200, maxBou: 4800, defaultActive: true },
        { id: "cajonera_softclose", nombre: "Torre Cajonera 4 Gavetas Cierre Suave (Reubicada Fuera de Esquina)", minMty: 3600, maxMty: 5400, minBou: 6800, maxBou: 9800, defaultActive: true },
        { id: "colgador_vestidos", nombre: "Módulo Colgado Largo (145cm Libres p/ Vestidos y Abrigos)", minMty: 1500, maxMty: 2400, minBou: 2800, maxBou: 4200 },
        { id: "zapateras_pro", nombre: "Torre Zapatera de 5 a 6 Niveles con Tope de Aluminio", minMty: 3200, maxMty: 4800, minBou: 6800, maxBou: 9500 },
        { id: "pantografo", nombre: "Perchero Pantógrafo Elevador Hidráulico p/ Colgado Alto", minMty: 2800, maxMty: 4200, minBou: 4800, maxBou: 7200 },
        { id: "isla", nombre: "Isla Central Joyera con Cubierta Cristal Templado & Gavetas", minMty: 9500, maxMty: 14000, minBou: 18500, maxBou: 28000 },
        { id: "led_vertical", nombre: "Tiras LED COB Verticales Empotradas 3000K en Bahías", minMty: 3800, maxMty: 5800, minBou: 7500, maxBou: 11000 }
      ],
      rangosBase: {
        taller_mty: { min: 25000, max: 45000, refLargo: 3.5, minM2Extra: 5200, maxM2Extra: 7200 },
        boutique_spgg: { min: 45000, max: 85000, refLargo: 4.0, minM2Extra: 9500, maxM2Extra: 14500 }
      }
    },

    BANIO: {
      id: "BANIO",
      nombre: "Vanity / Bajolavabo RH",
      iconoLabel: "BN-RH",
      desc: "Mueble bajolavabo suspendido o con zoclo nivelador en Melamina/MDF RH (Resistente a Humedad), cajón superior con saque en 'U' para librar céspol y cubierta de cuarzo o granito.",
      largoDefault: 1.2,
      largoMin: 0.7,
      largoMax: 2.8,
      altoDefault: 0.65,
      altoMin: 0.5,
      altoMax: 0.85,
      fondoDefault: 0.5,
      subtipos: [
        { id: "VANITY_1_SENO", nombre: "Bajolavabo Flotado 1 Seno (Gavetas Saque 'U')", desc: "2 gavetas RH cierre suave con recorte en U para trampa hidráulica" },
        { id: "VANITY_REPISA", nombre: "Bajolavabo c/ Nicho Toallero Abierto", desc: "Gavetas + repisa abierta en melamina tono nogal para toallas" },
        { id: "VANITY_DOBLE", nombre: "Máster Doble Lavabo (1.50m a 2.40m)", desc: "4 gavetas RH + módulo central de almacenamiento para baño principal" }
      ],
      opcionesExtra: [
        { id: "cubierta_piedra_bn", nombre: "Cubierta Cuarzo / Granito Natural c/ Faldón + Saque de Ovalín", minMty: 4200, maxMty: 7500, minBou: 6500, maxBou: 9900, defaultActive: true },
        { id: "botiquin_espejo", nombre: "Gabinete Botiquín Superior Oculto con Puerta de Espejo (15cm Fondo)", minMty: 2800, maxMty: 4600, minBou: 4000, maxBou: 6000 },
        { id: "espejo_led_bn", nombre: "Espejo Touch LED Retroiluminado 3000K Antivaho", minMty: 3200, maxMty: 5200, minBou: 4200, maxBou: 5800 }
      ],
      rangosBase: {
        taller_mty: { min: 6500, max: 14000, refLargo: 1.1, minM2Extra: 3800, maxM2Extra: 5200 },
        boutique_spgg: { min: 15000, max: 25500, refLargo: 1.5, minM2Extra: 6200, maxM2Extra: 8800 }
      }
    },

    TV_ROOM: {
      id: "TV_ROOM",
      nombre: "Mueble TV / Perchero & Almacenamiento",
      iconoLabel: "AL-32",
      desc: "Centros de entretenimiento en melamina con consola flotante pasacables, torres de almacenamiento, percheros recibidores (Mudroom con banca zapatera) y gabinetes bar.",
      largoDefault: 2.6,
      largoMin: 1.2,
      largoMax: 6.0,
      altoDefault: 2.4,
      altoMin: 1.8,
      altoMax: 2.8,
      fondoDefault: 0.4,
      subtipos: [
        { id: "TV_LAMBRIN", nombre: "Consola TV Flotante + Panel Respaldo Melamina", desc: "Consola suspendida c/ cajones o puertas abatibles y pasacables oculto" },
        { id: "TV_VITRINA", nombre: "Centro de TV + Torres de Almacenamiento", desc: "Consola central + columnas laterales con entrepaños, cajones o vitrina" },
        { id: "PERCHERO_MUDROOM", nombre: "Perchero Recibidor (Mudroom) + Banca Zapatera", desc: "Banca inferior para calzado, panel con ganchos percheros, maletero y columna" },
        { id: "BAR_CAVA", nombre: "Gabinete Bar & Botellero Modular Sistema 32", desc: "Módulo bajo con cajones/puertas + cuadrícula portabotellas y copero" }
      ],
      opcionesExtra: [
        { id: "pasacables", nombre: "Bastidor Oculto Reforzado + Canaleta Pasacables p/ Pantalla", minMty: 1400, maxMty: 2400, minBou: 2500, maxBou: 3800, defaultActive: true },
        { id: "ganchos_perchero", nombre: "Kit de Ganchos Percheros Dobles en Acero Negro Mate + Banca Reforzada", minMty: 1200, maxMty: 2100, minBou: 2400, maxBou: 3900 },
        { id: "halo_led", nombre: "Iluminación LED Cálida 3000K en Repisas / Respaldo", minMty: 2200, maxMty: 3600, minBou: 4200, maxBou: 6800 }
      ],
      rangosBase: {
        taller_mty: { min: 7500, max: 18500, refLargo: 2.2, minM2Extra: 3400, maxM2Extra: 4900 },
        boutique_spgg: { min: 19000, max: 46000, refLargo: 2.8, minM2Extra: 7500, maxM2Extra: 11000 }
      }
    }
  },

  // Calcula el precio individual exacto de un extra para mostrarlo en el Checklist (+ $X,XXX)
  calcularPrecioExtra: function (ext, params) {
    const gamaKey = params.gama === "boutique_spgg" ? "boutique_spgg" : "taller_mty";
    const cat = this.categorias[params.categoria] || this.categorias.COCINA;

    // Si es cubierta de piedra en cocina, se calcula por número exacto de placas según los metros lineales
    if (cat.id === "COCINA" && (ext.id === "cubierta_cuarzo" || ext.id === "cubierta_granito")) {
      let totalML = Number(params.largo || cat.largoDefault);
      if (params.muroA_L || params.muroB_activo || params.muroC_activo) {
        const mA = Number(params.muroA_L || params.largo || cat.largoDefault);
        const mB = params.muroB_activo ? Math.max(0.6, Number(params.muroB_L || 2.1) - Number(params.fondo || 0.6)) : 0;
        const mC = params.muroC_activo ? Math.max(0.6, Number(params.muroC_L || 2.1) - Number(params.fondo || 0.6)) : 0;
        totalML = Math.round((mA + mB + mC) * 10) / 10;
      }
      const extrasArr = Array.isArray(params.extras) ? params.extras : [];
      const hasIsland = String(params.subtipo || "") === "COCINA_ISLA" || extrasArr.includes("isla_central");
      const cubiertaML = Math.max(1.2, Math.round(((totalML - 0.72) + (hasIsland ? 1.8 : 0)) * 10) / 10);
      const rendML = (this.estandaresSenior && this.estandaresSenior.reglasCocina && this.estandaresSenior.reglasCocina.cubiertasPiedra && this.estandaresSenior.reglasCocina.cubiertasPiedra.rendimientoPlacaML) || 4.8;
      const numPlacas = Math.max(1, Math.ceil(cubiertaML / rendML));

      // Precio comercial llave en mano por placa instalada (incluye maquila + placa + gestión/plantillado Closets-Closets)
      const isCuarzo = ext.id === "cubierta_cuarzo";
      const precioPorPlaca = isCuarzo
        ? (gamaKey === "boutique_spgg" ? 34500 : 28500)
        : (gamaKey === "boutique_spgg" ? 26500 : 22500);
      return {
        precio: numPlacas * precioPorPlaca,
        numPlacas,
        cubiertaML
      };
    }

    const pBase = gamaKey === "boutique_spgg"
      ? Math.round(((ext.minBou + ext.maxBou) / 2) / 100) * 100
      : Math.round(((ext.minMty + ext.maxMty) / 2) / 100) * 100;
    return { precio: pBase, numPlacas: 0, cubiertaML: 0 };
  },

  calcularRango: function (params, activeModules) {
    const cat = this.categorias[params.categoria] || this.categorias.COCINA;
    const gamaKey = params.gama === "boutique_spgg" ? "boutique_spgg" : "taller_mty";
    const baseCfg = cat.rangosBase[gamaKey];

    let largo = Math.max(cat.largoMin, Math.min(cat.largoMax, Number(params.largo || cat.largoDefault)));
    let totalML = largo;
    const allowMultiWall = cat.id === "COCINA" || cat.id === "WALKIN";
    if (allowMultiWall && (params.muroA_L || params.muroB_activo || params.muroC_activo)) {
      const mA = Number(params.muroA_L || params.largo || cat.largoDefault);
      const mB = params.muroB_activo ? Math.max(0.6, Number(params.muroB_L || 2.1) - Number(params.fondo || 0.6)) : 0;
      const mC = params.muroC_activo ? Math.max(0.6, Number(params.muroC_L || 2.1) - Number(params.fondo || 0.6)) : 0;
      totalML = Math.round((mA + mB + mC) * 10) / 10;
      largo = totalML;
    } else if (params.muroA_L) {
      totalML = Math.round(Number(params.muroA_L) * 10) / 10;
      largo = totalML;
    }

    // 1. PRECIO BASE ÚNICO DEL MUEBLE (Carpintería estructural por metros lineales y altura, sin inflar con rangos)
    const refBase = Math.round((baseCfg.min * 0.62 + baseCfg.max * 0.38) / 500) * 500;
    const costoPorMLExtra = Math.round((baseCfg.minM2Extra * 0.6 + baseCfg.maxM2Extra * 0.4) / 100) * 100;
    const deltaLargo = largo - baseCfg.refLargo;

    let precioBase = refBase;
    if (deltaLargo > 0) {
      precioBase += deltaLargo * costoPorMLExtra;
    } else if (deltaLargo < -0.15) {
      const ratio = Math.max(0.68, largo / baseCfg.refLargo);
      precioBase = Math.round((precioBase * ratio) / 500) * 500;
    }

    // Ajuste proporcional por altura si supera 2.40 m (ej. techos altos de 2.50 a 2.75 m)
    const altoNum = Number(params.alto || cat.altoDefault);
    if (altoNum > cat.altoDefault + 0.05) {
      const factorAlto = 1 + ((altoNum - cat.altoDefault) * 0.18);
      precioBase *= factorAlto;
    }

    const sub = String(params.subtipo || "");
    if (sub.includes("ISLA") || sub.includes("CRISTAL") || sub.includes("_U") || sub.includes("DOBLE")) {
      precioBase *= 1.08;
    }
    precioBase = Math.round(precioBase / 500) * 500;

    // 2. CHECKLIST DE ADICIONALES SELECCIONADOS POR EL CLIENTE
    const extrasSeleccionados = Array.isArray(params.extras) ? params.extras : [];
    const extrasDetalle = [];
    const extrasDesglose = [];
    let extrasTotal = 0;

    let piedraInfo = null;
    if (cat.id === "COCINA") {
      const hasIsland = sub === "COCINA_ISLA" || extrasSeleccionados.includes("isla_central");
      const cubiertaML = Math.max(1.2, Math.round(((totalML - 0.72) + (hasIsland ? 1.8 : 0)) * 10) / 10);
      const rendML = (this.estandaresSenior && this.estandaresSenior.reglasCocina && this.estandaresSenior.reglasCocina.cubiertasPiedra && this.estandaresSenior.reglasCocina.cubiertasPiedra.rendimientoPlacaML) || 4.8;
      const numPlacas = Math.max(1, Math.ceil(cubiertaML / rendML));
      const usaCuarzo = extrasSeleccionados.includes("cubierta_cuarzo");
      const usaGranito = extrasSeleccionados.includes("cubierta_granito");
      piedraInfo = {
        aplica: true,
        seleccionada: usaCuarzo || usaGranito,
        tipoLabel: usaCuarzo ? "Cuarzo de Ingeniería" : usaGranito ? "Granito Natural" : "Sin cubierta seleccionada",
        cubiertaML,
        numPlacas
      };
    }

    cat.opcionesExtra.forEach((ext) => {
      if (extrasSeleccionados.includes(ext.id)) {
        const calc = this.calcularPrecioExtra(ext, params);
        extrasTotal += calc.precio;
        const labelLimpio = calc.numPlacas > 0
          ? `${ext.nombre} (${calc.numPlacas} placa${calc.numPlacas > 1 ? "s" : ""})`
          : ext.nombre;
        extrasDetalle.push(labelLimpio);
        extrasDesglose.push({
          id: ext.id,
          nombre: labelLimpio,
          precio: calc.precio
        });
      }
    });

    // 3. FLETE E INSTALACIÓN (Valor único por zona)
    const zonaObj = this.zonas.find((z) => z.id === params.zona) || this.zonas[0];
    const fleteMXN = Math.round(((zonaObj.fleteMin + zonaObj.fleteMax) / 2) / 100) * 100;

    // 4. PRECIO TOTAL ÚNICO ESTIMADO (Base + Checklist Adicionales + Flete)
    const totalMXN = Math.round((precioBase + extrasTotal + fleteMXN) / 500) * 500;
    const anticipo60MXN = Math.round((totalMXN * 0.6) / 100) * 100;
    const finiquito40MXN = totalMXN - anticipo60MXN;

    return {
      gamaNombre: this.gamas[gamaKey].nombre,
      precioBaseMXN: precioBase,
      extrasMXN: extrasTotal,
      extrasDesglose: extrasDesglose,
      fleteMXN: fleteMXN,
      totalMXN: totalMXN,
      // Compatibilidad con llamadas que leían minMXN / maxMXN
      minMXN: totalMXN,
      maxMXN: totalMXN,
      totalML: totalML,
      anticipo60MXN: anticipo60MXN,
      finiquito40MXN: finiquito40MXN,
      anticipoMin60: anticipo60MXN,
      anticipoMax60: anticipo60MXN,
      fleteTexto: `$${fleteMXN.toLocaleString("es-MX")} MXN (${zonaObj.id})`,
      extrasDetalle,
      piedraInfo
    };
  },

  /**
   * AGENTE DISEÑADOR SENIOR SISTEMA 32
   * Analiza en vivo las dimensiones, muros, categoría y módulos 3D activos
   * para emitir el dictamen de ingeniería de taller en tiempo real.
   */
  generarDictamenSenior: function (params, rangeInfo, activeModules) {
    const catId = params.categoria || "COCINA";
    const mods = Array.isArray(activeModules) ? activeModules : [];
    const extras = Array.isArray(params.extras) ? params.extras : [];
    const totalML = (rangeInfo && rangeInfo.totalML) ? rangeInfo.totalML : Number(params.largo || 2.4);
    const rules = [];

    if (catId === "COCINA") {
      const pata12 = extras.includes("zoclo_12cm");
      const pataMm = pata12 ? "120 mm (12 cm, regula hasta 14-15 cm)" : "100 mm (10 cm, regula entre 9.5 y 11.8 cm)";
      const altMelamina = pata12 ? "93.0 cm" : "91.0 cm";

      rules.push({
        badge: "ALTURA & ZOCLO ANTI-PLAGAS",
        title: `Superficie de Melamina a ${altMelamina} + Patas Niveladoras ${pata12 ? "12 cm" : "10 cm"}`,
        detail: `Casco inferior de 81 cm montado sobre patas niveladoras de elevador de ${pataMm} con tapeta clip de PVC color Aluminio: sella contra humedad, bloquea ingreso de bichos y se desmonta en segundos para acceso de fumigación.`
      });

      const clearUpperCm = Math.round((Number(params.alto || 2.4) - 1.52) * 100);
      const hasDoubleUpper = clearUpperCm > 80 || extras.includes("sobrealacena_42cm");
      if (hasDoubleUpper) {
        rules.push({
          badge: "SOBREALACENA ESCALONADA 32→42 CM",
          title: `Alacena > 80 cm (${clearUpperCm} cm): 1° Piso a 32 cm + 2° Piso a 42 cm de Fondo`,
          detail: "Regla volumétrica de altura: al superar 80 cm de alacena flotada, se modula un 1° piso a 32 cm de fondo (evita estorbar en barra) y un 2° piso de sobrealacena a techo de 42 cm de fondo (+10 cm en voladizo frontal que enmarca el volumen arquitectónico)."
        });
      } else {
        rules.push({
          badge: "ALACENA FLOTADA 32 CM",
          title: `Alacena Simple de ${clearUpperCm} cm de Alto × 32 cm de Fondo`,
          detail: "Con altura de alacena ≤ 80 cm se modula en 1 solo piso a 32 cm de fondo. Si aumentas la altura total o activas el 2° piso, se agrega la sobrealacena superior de 42 cm de fondo."
        });
      }

      rules.push({
        badge: "MANGUETE 5.5 CM & GOLA 45°",
        title: "Techo con Manguete Frontal de 5.5 cm + Frentes con Corte a 45°",
        detail: "El panel superior (techo) baja un manguete remetido de 5 a 6 cm para acompañar el faldón de la cubierta de piedra y dejar la cavidad (gola) libre para abrir puertas y cajones con chaflán a 45° sin jaladeras salientes."
      });

      const hasEstufaPiso = mods.some((m) => m.type === "estufa_piso");
      const parrillaMod = mods.find((m) => m.type === "parrilla_cajones" || m.type === "parrilla_horno");
      if (hasEstufaPiso) {
        rules.push({
          badge: "COCCIÓN · ESTUFA DE PISO",
          title: "Hueco de Estufa Completa (76 cm) — Interrumpe Barra y Zoclo",
          detail: "Configuración con estufa de piso completa: se corta la continuidad del zoclo, casco y cubierta de piedra para alojar la estufa a piso con costados de melamina canteados en PUR."
        });
      } else {
        const anchoParrilla = (parrillaMod && parrillaMod.count >= 60) ? `${parrillaMod.count} cm` : "60 a 90 cm (2 a 6 flamas)";
        rules.push({
          badge: "COCCIÓN & CAJONERA",
          title: `Módulo Bajo Parrilla (${anchoParrilla}): 2 Cubierteros Medianos + 1 Cacerolero`,
          detail: "Debajo de la parrilla empotrada se modulan 2 cajones medianos superiores (cubiertos y utensilios de mano) + 1 gaveta cacerolera profunda inferior (45 kg) o bien horno empotrado sin base."
        });
      }

      const hasCorner = Boolean(params.muroB_activo || params.muroC_activo || String(params.subtipo).includes("_L") || String(params.subtipo).includes("_U"));
      if (hasCorner) {
        const cornerMod = mods.find((m) => m.id.startsWith("cocina_esquinero_"));
        const isExtraible = !cornerMod || cornerMod.type === "esquinero_lemans";
        rules.push({
          badge: "INGENIERÍA DE ESCUADRA",
          title: isExtraible ? "Esquinero en 'L' con Herraje Extraíble Articulado" : "Esquinero en 'L' con Entrepaños Corridos Sistema 32",
          detail: "En los módulos que colindan en escuadra jamás se cruzan cajoneras. Puedes alternar con un clic en el 3D entre Herraje Extraíble (LeMans/Magic Corner) o Entrepaños Corridos con puerta abatible."
        });
      }

      rules.push({
        badge: "ESTÁNDAR DE PUERTAS ≥ 60 CM",
        title: "Modulación Automática: Módulos ≥ 60 cm llevan Puertas Dobles (30+30 cm)",
        detail: "Todo gabinete de 60 cm a 90 cm divide su frente en 2 hojas simétricas (ej. 60 cm = 2 hojas de 29.7 cm). Evita pandeo en bisagras de cazoleta y reduce a la mitad la invasión del pasillo al abrir."
      });

      if (rangeInfo && rangeInfo.piedraInfo) {
        const pi = rangeInfo.piedraInfo;
        rules.push({
          badge: "CUBIERTA CUARZO / GRANITO",
          title: `Cero Mármol en Cocina · Requiere ${pi.numPlacas} Placa${pi.numPlacas > 1 ? "s" : ""} (${pi.cubiertaML} ML de barra)`,
          detail: `En cocina jamás se instala mármol por su porosidad ante limón, ácidos y grasa; especificamos únicamente Cuarzo de Ingeniería o Granito Natural. Tu desarrollo de ${pi.cubiertaML} ML considera ${pi.numPlacas} placa${pi.numPlacas > 1 ? "s" : ""} con servicio llave en mano (suministro de material, plantillado en sitio, cortes de tarja/parrilla, faldón a 45°, logística e instalación nivelada).`
        });
      }
    } else if (catId === "CLOSET" || catId === "WALKIN") {
      rules.push({
        badge: "MODULACIÓN SISTEMA 32",
        title: "Profundidad 60 cm + Maletero Corrido y Columnas de Barrenado 32 mm",
        detail: "Cajas estructurales en melamina 16/18 mm con paso de barrenado a 32 mm (37 mm al canto frontal) para ajustar alturas de entrepaños, tubos ovalados y cajoneras sin perforar de nuevo."
      });
      rules.push({
        badge: "REGLA DE PUERTAS & CAJONES",
        title: "Bahías ≥ 60 cm con Par de Hojas Simétricas + Cajoneras Libres de Esquina",
        detail: "Módulos de 60 a 90 cm montan 2 puertas abatibles simétricas con 3 a 4 bisagras cazoleta cierre suave por hoja. En vestidores en 'L' o 'U', el esquinero lleva doble tubo continuo y las cajoneras se ubican fuera del vértice."
      });
      rules.push({
        badge: "ERGONOMÍA DE GUARDADO",
        title: "Alturas Estándar: Doble Colgado (105 / 205 cm) · Vestidos (145 cm) · Maletero (+200 cm)",
        detail: "Toca cualquier módulo en el 3D para intercambiar entre Cajonera (2 a 5 gavetas), Torre de Entrepaños, Doble Tubo, Colgado Largo o Zapatera inclinada, y agregar o quitar puertas."
      });
    } else if (catId === "BANIO") {
      rules.push({
        badge: "SUSTRATO HIDRÓFUGO RH",
        title: "Tablero Melamina / MDF RH Resistente a Humedad + Canteado Sellado",
        detail: "Fabricación obligatoria en tablero hidrófugo RH para soportar vapor condensado. Altura ergonómica superior a 88–90 cm del piso terminado (suspendido a +20/+25 cm para limpieza sanitaria)."
      });
      rules.push({
        badge: "INGENIERÍA HIDRÁULICA",
        title: "Gaveta Superior con Saque en 'U' para Librar Céspol y Llaves Angulares",
        detail: "El cajón superior incluye recorte perimetral en 'U' canteado para rodear la trampa del lavabo aprovechando ambos costados, mientras la gaveta inferior queda 100% libre para toallas."
      });
    } else if (catId === "TV_ROOM") {
      const isPerchero = params.subtipo === "PERCHERO_MUDROOM";
      if (isPerchero) {
        rules.push({
          badge: "PERCHERO & BANCA MUDROOM",
          title: "Banca Zapatera Reforzada (Altura 45 cm) + Panel Perchero & Columna",
          detail: "Diseño modular 100% en melamina Sistema 32: banca inferior con capacidad de carga para sentarse a calzar + charolas zapateras, respaldo con ganchos percheros, maletero superior y torre lateral configurable."
        });
      } else {
        rules.push({
          badge: "CONSOLA & BASTIDOR OCULTO",
          title: "Anclaje Francés a 45° + Canalización Oculta de Cables HDMI / Corriente",
          detail: "Consola suspendida a +28 cm del piso (fondo 40 cm) con cámara trasera pasacables. Módulos configurables en cajones push-to-open o puertas abatibles con entrepaños ventilados para consolas."
        });
      }
      rules.push({
        badge: "ALMACENAMIENTO PERSONALIZABLE",
        title: "Módulos Laterales e Inferiores 100% Editables en el 3D",
        detail: "Haz clic sobre cualquier sección en el visor 3D para agregar o quitar cajones, entrepaños y puertas (melamina cerrada, vitrina cristal fumé o espejo)."
      });
    }

    return rules;
  },

  presets: [
    // === COCINAS (10 MODELOS) ===
    {
      id: "cocina_lineal_esencial",
      label: "🍳 Cocina Lineal 2.4m (Tarja + Parrilla c/ Cajones)",
      cat: "COCINA",
      sub: "COCINA_LINEAL",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 2.4,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "cubiertero_cacerolero"]
    },
    {
      id: "cocina_l_tradicional",
      label: "🍳 Cocina en 'L' + Cubierta Granito",
      cat: "COCINA",
      sub: "COCINA_L_PENINSULA",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 3.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "cubiertero_cacerolero", "cubierta_granito"]
    },
    {
      id: "cocina_barra_volada",
      label: "🍳 Cocina Lineal 3.0m + Gola Corte 45°",
      cat: "COCINA",
      sub: "COCINA_LINEAL",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 3.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "cubiertero_cacerolero"]
    },
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
      extras: ["gola_manguete45", "torre_hornos", "cubiertero_cacerolero", "led_alacena"]
    },
    {
      id: "cocina_peninsula_cuarzo",
      label: "🍳 Cocina en 'L' + Cubierta Cuarzo",
      cat: "COCINA",
      sub: "COCINA_L_PENINSULA",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 4.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "cubierta_cuarzo", "cubiertero_cacerolero", "led_alacena"]
    },
    {
      id: "cocina_u_ergonomica",
      label: "🍳 Cocina en 'U' + Esquinero Extraíble",
      cat: "COCINA",
      sub: "COCINA_U",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 4.5,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "esquinero_lemans", "cubiertero_cacerolero", "torre_hornos", "led_alacena"]
    },
    {
      id: "cocina_alacenas_techo_botes",
      label: "🍳 Cocina Techo Alto + Botes Extraíbles",
      cat: "COCINA",
      sub: "COCINA_LINEAL",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 3.6,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "bote_doble", "cubiertero_cacerolero", "led_alacena"]
    },
    {
      id: "cocina_chef_suite_fluted",
      label: "💎 Chef Suite: Gran Isla Cuarzo + Parrilla 90cm",
      cat: "COCINA",
      sub: "COCINA_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 5.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "zoclo_12cm", "isla_central", "cubierta_cuarzo", "alacena_torre_blum", "esquinero_lemans", "torre_hornos", "cubiertero_cacerolero", "bote_doble", "led_alacena"]
    },
    {
      id: "cocina_hidden_pantry",
      label: "💎 Cocina Isla + Torre Despensa Blum",
      cat: "COCINA",
      sub: "COCINA_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 4.8,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "isla_central", "alacena_torre_blum", "torre_hornos", "cubierta_cuarzo"]
    },
    {
      id: "cocina_vitrinas_gala_fume",
      label: "💎 Cocina de Gala: Isla + Vitrinas Fumé LED",
      cat: "COCINA",
      sub: "COCINA_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 5.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["gola_manguete45", "isla_central", "alacena_torre_blum", "cubierta_cuarzo", "led_alacena", "cubiertero_cacerolero"]
    },

    // === CLÓSETS & VESTIDORES (6 MODELOS) ===
    {
      id: "closet_clasico_abatible",
      label: "✨ Clóset Clásico Piso a Techo (Puertas 30/45cm)",
      cat: "CLOSET",
      sub: "CLOSET_ABATIBLE",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 2.4,
      alto: 2.4,
      fondo: 0.6,
      extras: ["zapatera"]
    },
    {
      id: "closet_corredizo_compact",
      label: "✨ Clóset Puertas Corredizas + Maletero",
      cat: "CLOSET",
      sub: "CLOSET_CORREDIZO",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 1.8,
      alto: 2.4,
      fondo: 0.6,
      extras: ["zapatera"]
    },
    {
      id: "closet_12cajones_modular",
      label: "✨ Ropero Modular c/ Cajonera Central & Perchero",
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
      label: "👔 Vestidor Walk-in Abierto en Escuadra 'L'",
      cat: "WALKIN",
      sub: "WALKIN_L",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 3.4,
      alto: 2.4,
      fondo: 0.6,
      extras: ["colgadores_dobles", "cajonera_softclose", "zapateras_pro", "led_vertical"]
    },
    {
      id: "walkin_master_boutique_isla",
      label: "💎 Master Walk-in en 'U' + Isla Joyera Cristal",
      cat: "WALKIN",
      sub: "WALKIN_ISLA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 4.2,
      alto: 2.4,
      fondo: 0.6,
      extras: ["colgadores_dobles", "cajonera_softclose", "isla", "led_vertical", "zapateras_pro"]
    },
    {
      id: "walkin_espejo_infinito_fume",
      label: "💎 Vestidor Boutique c/ Vitrinas Cristal Fumé",
      cat: "WALKIN",
      sub: "WALKIN_CRISTAL",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 4.0,
      alto: 2.4,
      fondo: 0.6,
      extras: ["led_vertical", "zapateras_pro", "isla"]
    },

    // === MUEBLES TV, PERCHEROS & ALMACENAMIENTO (6 MODELOS) ===
    {
      id: "tv_consola_flotante_clasica",
      label: "📺 Consola Flotante TV c/ Cajones & Pasacables",
      cat: "TV_ROOM",
      sub: "TV_LAMBRIN",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 1.8,
      alto: 2.2,
      fondo: 0.4,
      extras: ["pasacables"]
    },
    {
      id: "perchero_recibidor_esencial",
      label: "🧥 Perchero Recibidor + Banca Zapatera (1.5m)",
      cat: "TV_ROOM",
      sub: "PERCHERO_MUDROOM",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 1.5,
      alto: 2.4,
      fondo: 0.45,
      extras: ["ganchos_perchero"]
    },
    {
      id: "tv_panel_respaldo_nogal",
      label: "📺 Muro TV Melamina Nogal + Consola Push",
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
      id: "recibidor_dropzone_lambrin",
      label: "🧥 Mudroom Familiar: Perchero + Torre Guardado",
      cat: "TV_ROOM",
      sub: "PERCHERO_MUDROOM",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 2.2,
      alto: 2.4,
      fondo: 0.45,
      extras: ["ganchos_perchero", "halo_led"]
    },
    {
      id: "tv_lambrin_acanalado_cantilever",
      label: "💎 Centro TV + Torres Vitrina & Almacenamiento",
      cat: "TV_ROOM",
      sub: "TV_VITRINA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 3.2,
      alto: 2.4,
      fondo: 0.4,
      extras: ["halo_led", "pasacables"]
    },
    {
      id: "cava_bar_lounge_poker",
      label: "💎 Gabinete Bar & Almacenamiento Cava Modular",
      cat: "TV_ROOM",
      sub: "BAR_CAVA",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 2.8,
      alto: 2.4,
      fondo: 0.55,
      extras: ["halo_led"]
    },

    // === BAÑOS & VANITIES RH (3 MODELOS) ===
    {
      id: "banio_bajolavabo_clasico",
      label: "🚿 Bajolavabo RH 80cm (2 Gavetas Saque 'U')",
      cat: "BANIO",
      sub: "VANITY_1_SENO",
      tier: "esencial",
      tierLabel: "Esencial",
      largo: 0.8,
      alto: 0.65,
      fondo: 0.5,
      extras: ["cubierta_piedra_bn"]
    },
    {
      id: "banio_vanity_nicho_abierto",
      label: "🚿 Vanity Flotado RH 1.2m + Nicho Toallero",
      cat: "BANIO",
      sub: "VANITY_REPISA",
      tier: "contemporaneo",
      tierLabel: "Contemporáneo",
      largo: 1.2,
      alto: 0.65,
      fondo: 0.5,
      extras: ["cubierta_piedra_bn", "botiquin_espejo"]
    },
    {
      id: "banio_vanity_curvo_doble_rh",
      label: "💎 Vanity Doble Lavabo RH 1.8m + Cubierta Cuarzo",
      cat: "BANIO",
      sub: "VANITY_DOBLE",
      tier: "signature",
      tierLabel: "Signature SP",
      largo: 1.8,
      alto: 0.65,
      fondo: 0.5,
      extras: ["cubierta_piedra_bn", "botiquin_espejo", "espejo_led_bn"]
    }
  ]
};
