/**
 * Motor CAD Conceptual en Líneas y Trazos (3D EdgesGeometry + Alzado 2D SVG + Exportador de Lámina PNG)
 * Sistema Modular Interactivo Ecosistema Completo: Clósets, Vestidores, Cocinas, Baños RH, Muros TV/Bar y Puertas.
 * Cero texturas PNG pesadas: corre fluido a 60 FPS en móvil y genera planos técnicos para el equipo de taller.
 */
(function () {
  const container = document.getElementById("cadViewport");
  const canvas = document.getElementById("cadCanvas3D");
  const svgWrap = document.getElementById("svgElevationWrap");
  if (!canvas || typeof THREE === "undefined") return;

  // -------------------------------------------------------------
  // ESQUEMAS MODULARES DEL ECOSISTEMA (ÚNICA FUENTE DE VERDAD)
  // -------------------------------------------------------------
  const MODULE_SCHEMAS = {
    closet_bay: {
      label: "Módulo de Clóset / Vestidor (Sistema 32)",
      types: [
        {
          id: "cajones",
          label: "🗄️ Cajonera Soft-Close + Repisas",
          countLabel: "Número de Cajones / Gavetas:",
          counts: [
            { val: 2, txt: "2 Gavetas Profundas (38 cm c/u)" },
            { val: 3, txt: "3 Cajones Estándar" },
            { val: 4, txt: "4 Cajones Estándar (Recomendado)" },
            { val: 5, txt: "5 Cajones Organizadores Slim" }
          ],
          defaultCount: 4,
          allowDoors: true
        },
        {
          id: "entrepanos",
          label: "📚 Torre de Entrepaños Regulables",
          countLabel: "Número de Entrepaños:",
          counts: [
            { val: 3, txt: "3 Entrepaños Espaciosos" },
            { val: 4, txt: "4 Entrepaños Estándar" },
            { val: 5, txt: "5 Entrepaños (Recomendado)" },
            { val: 6, txt: "6 Entrepaños Alta Densidad" }
          ],
          defaultCount: 4,
          allowDoors: true
        },
        {
          id: "colgador_doble",
          label: "👔 Doble Tubo de Colgado (Sacos / Pantalones)",
          counts: null,
          allowDoors: true
        },
        {
          id: "colgador_largo",
          label: "👗 Colgador Largo (Vestidos / Abrigos 145cm)",
          counts: null,
          allowDoors: true
        },
        {
          id: "zapatera",
          label: "👠 Torre Zapatera c/ Tope Aluminio",
          countLabel: "Niveles de Zapatera:",
          counts: [
            { val: 4, txt: "4 Niveles Inclinados c/ Tope" },
            { val: 5, txt: "5 Niveles Estándar" },
            { val: 6, txt: "6 Niveles Alta Capacidad" }
          ],
          defaultCount: 5,
          allowDoors: true
        },
        {
          id: "mixto_cajon_tubo",
          label: "✨ Cajonera Baja + Tubo de Colgado Superior",
          countLabel: "Cajones Inferiores:",
          counts: [
            { val: 2, txt: "2 Cajones Bajos + Tubo Superior" },
            { val: 3, txt: "3 Cajones Bajos + Tubo Superior" }
          ],
          defaultCount: 2,
          allowDoors: true
        }
      ],
      doors: [
        { id: "none", label: "Sin puerta (Abierto)" },
        { id: "abatible", label: "Puertas Abatibles Melamina (≥60cm = 2 Hojas)" },
        { id: "cristal", label: "Puertas Vitrina Cristal Fumé" },
        { id: "espejo", label: "Puertas con Luna de Espejo 4mm" }
      ]
    },

    maletero: {
      label: "Maletero Superior Continuo",
      types: [
        { id: "maletero_corrido", label: "🧳 Maletero Corrido Piso a Techo", counts: null, allowDoors: true }
      ],
      doors: [
        { id: "abatible", label: "Con Puertas Abatibles" },
        { id: "none", label: "Abierto Sin Puertas" },
        { id: "cristal", label: "Puertas Cristal Fumé" }
      ]
    },

    walkin_isla: {
      label: "Isla Joyera Central",
      types: [
        {
          id: "isla_joyero",
          label: "💎 Isla Joyera c/ Cubierta Cristal",
          countLabel: "Niveles de Gavetas:",
          counts: [
            { val: 2, txt: "2 Niveles Gavetas + Joyero Cristal" },
            { val: 3, txt: "3 Niveles Gavetas + Joyero Cristal" },
            { val: 4, txt: "4 Niveles Gavetas + Joyero Cristal" }
          ],
          defaultCount: 3,
          allowDoors: false
        },
        {
          id: "isla_solida",
          label: "🗄️ Isla Cubierta Sólida c/ Cajones",
          countLabel: "Niveles de Cajones:",
          counts: [
            { val: 3, txt: "3 Niveles de Cajones" },
            { val: 4, txt: "4 Niveles de Cajones" }
          ],
          defaultCount: 3,
          allowDoors: false
        }
      ],
      doors: null
    },

    cocina_bajo: {
      label: "Módulo Bajo Cocina (91cm · Casco 81 + Patas 10cm)",
      types: [
        {
          id: "tarja_puertas_botes",
          label: "🚰 Mover Tarja Aquí: Bajo Tarja RH (2 Puertas + Botes)",
          countLabel: "Equipamiento Bajo Tarja:",
          counts: [
            { val: 2, txt: "2 Puertas Simétricas (30+30cm) + Bote Doble Basura" },
            { val: 1, txt: "2 Puertas Simétricas + Piso Aluminio Libre Céspol" }
          ],
          defaultCount: 2,
          allowDoors: true
        },
        {
          id: "tarja_gavetas_u",
          label: "🚰 Mover Tarja Aquí: Bajo Tarja c/ 2 Gavetas (Saque 'U')",
          countLabel: "Gavetas Hidrófugas RH:",
          counts: [
            { val: 2, txt: "Gaveta Sup. c/ Saque 'U' Céspol + Gavetón Limpieza" }
          ],
          defaultCount: 2,
          allowDoors: false
        },
        {
          id: "parrilla_cajones",
          label: "🔥 Mover Parrilla Aquí (60-90cm): 2 Cubierteros + 1 Cacerolero",
          countLabel: "Dimensionamiento de Parrilla (2 a 6 Flamas):",
          counts: [
            { val: 60, txt: "Parrilla 60 cm (2-4 Flamas) + 2 Cubierteros + 1 Cacerolero" },
            { val: 75, txt: "Parrilla 75 cm (5 Flamas) + 2 Cubierteros + 1 Cacerolero" },
            { val: 90, txt: "Parrilla 90 cm (6 Flamas Chef) + 2 Cubierteros + 1 Cacerolero" }
          ],
          defaultCount: 75,
          allowDoors: false
        },
        {
          id: "parrilla_horno",
          label: "🔥 Mover Parrilla + Horno Empotrado Sin Base Aquí",
          counts: null,
          allowDoors: false
        },
        {
          id: "estufa_piso",
          label: "🍳 Mover Estufa de Piso (76cm) Aquí — Corta Barra y Zoclo",
          counts: null,
          allowDoors: false
        },
        {
          id: "cajones_cocina",
          label: "🗄️ Cajonera: 2 Medianos Cubierteros + 1 Grande (o 2/4)",
          countLabel: "Distribución de Cajones:",
          counts: [
            { val: 3, txt: "2 Cajones Medianos (Cubiertos) + 1 Cacerolero Grande Abajo" },
            { val: 2, txt: "2 Gavetas Caceroleras Profundas (45 kg)" },
            { val: 4, txt: "4 Cajones Organizadores" }
          ],
          defaultCount: 3,
          allowDoors: false
        },
        {
          id: "entrepanos_cocina",
          label: "📚 Gabinete c/ Entrepaños + Puertas (≥60cm = 2 Hojas)",
          countLabel: "Entrepaños Interiores Sistema 32:",
          counts: [
            { val: 1, txt: "1 Entrepaño Central" },
            { val: 2, txt: "2 Entrepaños Regulables (Recomendado)" },
            { val: 3, txt: "3 Entrepaños Alta Densidad" }
          ],
          defaultCount: 2,
          allowDoors: true
        },
        {
          id: "mixto_cajon_entrepano",
          label: "✨ 1 Cajón Cubiertero Arriba + Puertas c/ Entrepaños",
          countLabel: "Entrepaños Bajo el Cajón:",
          counts: [
            { val: 1, txt: "1 Cajón Superior + 1 Entrepaño c/ Puertas" },
            { val: 2, txt: "1 Cajón Superior + 2 Entrepaños c/ Puertas" }
          ],
          defaultCount: 1,
          allowDoors: true
        },
        {
          id: "especiero",
          label: "🗑️ Extraíble Botes de Basura / Especiero",
          countLabel: "Configuración Extraíble:",
          counts: [
            { val: 2, txt: "Carro Bote Doble Basura Extraíble" },
            { val: 3, txt: "Especiero / Botellero Extraíble 3 Niveles" }
          ],
          defaultCount: 2,
          allowDoors: false
        }
      ],
      doors: [
        { id: "abatible_gola45", label: "Puertas Gola Corte 45° + Manguete 5.5cm (≥60cm = 2 Hojas)" },
        { id: "abatible", label: "Puertas Abatibles Cierre Suave (≥60cm = 2 Hojas)" },
        { id: "cristal", label: "Puerta Vitrina Cristal Fumé" },
        { id: "none", label: "Nicho Abierto Sin Puertas" }
      ]
    },

    cocina_esquinero: {
      label: "Módulo Esquinero en Escuadra ('L' / 'U')",
      types: [
        {
          id: "esquinero_lemans",
          label: "⚙️ Herraje Extraíble Articulado (LeMans / Magic Corner)",
          countLabel: "Bandejas Extraíbles:",
          counts: [
            { val: 2, txt: "2 Bandejas Articuladas Extraíbles (45 kg)" }
          ],
          defaultCount: 2,
          allowDoors: true
        },
        {
          id: "esquinero_entrepanos",
          label: "📐 Esquinero con Entrepaños Corridos",
          countLabel: "Entrepaños en Escuadra:",
          counts: [
            { val: 1, txt: "1 Entrepaño Corrido Reforzado" },
            { val: 2, txt: "2 Entrepaños Corridos Sistema 32" },
            { val: 3, txt: "3 Entrepaños Corridos Alta Capacidad" }
          ],
          defaultCount: 2,
          allowDoors: true
        },
        {
          id: "esquinero_cajon_entrepano",
          label: "🗄️ Esquinero Mixto (1 Cajón Sup. + Entrepaños)",
          countLabel: "Entrepaños Inferiores:",
          counts: [
            { val: 1, txt: "1 Cajón Superior + 1 Entrepaño Interior" },
            { val: 2, txt: "1 Cajón Superior + 2 Entrepaños Interiores" }
          ],
          defaultCount: 2,
          allowDoors: true
        }
      ],
      doors: [
        { id: "abatible_gola45", label: "Puertas Gola Corte 45° + Manguete 5.5cm" },
        { id: "abatible", label: "Puertas Abatibles Bisagra 165°" },
        { id: "none", label: "Abierto Sin Puerta" }
      ]
    },

    cocina_tarja: {
      label: "Módulo Bajo Tarja RH (Zona Húmeda)",
      types: [
        {
          id: "tarja_puertas_botes",
          label: "🚰 Bajo Tarja RH 2 Puertas (30+30cm) + Botes Basura",
          countLabel: "Equipamiento Bajo Tarja:",
          counts: [
            { val: 2, txt: "2 Puertas Simétricas + Bote Doble Extraíble" },
            { val: 1, txt: "2 Puertas Simétricas + Piso Aluminio Libre Céspol" }
          ],
          defaultCount: 2,
          allowDoors: true
        },
        {
          id: "tarja_gavetas_u",
          label: "🗄️ Bajo Tarja c/ 2 Gavetas Caceroleras (Saque en 'U')",
          countLabel: "Gavetas Hidrófugas RH:",
          counts: [
            { val: 2, txt: "Gaveta Sup. c/ Saque 'U' Céspol + Gavetón Limpieza" }
          ],
          defaultCount: 2,
          allowDoors: false
        },
        {
          id: "tarja_entrepanos",
          label: "📚 Bajo Tarja 2 Puertas + Entrepaños Laterales",
          countLabel: "Entrepaños Auxiliares:",
          counts: [
            { val: 1, txt: "1 Entrepaño Lateral p/ Detergentes" },
            { val: 2, txt: "2 Entrepaños Laterales" }
          ],
          defaultCount: 1,
          allowDoors: true
        }
      ],
      doors: [
        { id: "abatible_gola45", label: "2 Puertas Simétricas Gola Corte 45°" },
        { id: "abatible", label: "2 Puertas Simétricas Cierre Suave" }
      ]
    },

    cocina_alacena: {
      label: "Alacena Superior de Cocina (Fondo 35cm)",
      types: [
        {
          id: "entrepanos_alacena",
          label: "📦 Alacena con Entrepaños Sistema 32",
          countLabel: "Número de Entrepaños:",
          counts: [
            { val: 1, txt: "1 Entrepaño Estándar" },
            { val: 2, txt: "2 Entrepaños Regulables (Recomendado)" },
            { val: 3, txt: "3 Entrepaños Alta Densidad" }
          ],
          defaultCount: 2,
          allowDoors: true
        },
        {
          id: "vitrina_led",
          label: "✨ Vitrina Iluminada LED",
          countLabel: "Repisas Interiores:",
          counts: [
            { val: 2, txt: "2 Repisas + Tira LED 3000K" },
            { val: 3, txt: "3 Repisas + Tira LED 3000K" }
          ],
          defaultCount: 2,
          allowDoors: true
        }
      ],
      doors: [
        { id: "abatible", label: "Puertas Abatibles (≥60cm = 2 Hojas de 30cm+)" },
        { id: "aventos", label: "Puerta Elevable Blum Aventos HF" },
        { id: "cristal", label: "Marco Aluminio + Cristal Fumé" },
        { id: "none", label: "Repisas Abiertas Sin Puerta" }
      ]
    },

    cocina_torre: {
      label: "Torre Lateral Piso a Techo (240cm)",
      types: [
        {
          id: "torre_alacena",
          label: "📦 Torre Alacena Despensero c/ Entrepaños",
          countLabel: "Número de Entrepaños:",
          counts: [
            { val: 4, txt: "4 Entrepaños Espaciosos" },
            { val: 5, txt: "5 Entrepaños Estándar" },
            { val: 6, txt: "6 Entrepaños Despensa" }
          ],
          defaultCount: 5,
          allowDoors: true
        },
        {
          id: "torre_blum",
          label: "🗄️ Torre Blum Space Tower (Gavetas Extraíbles)",
          countLabel: "Gavetas Interiores:",
          counts: [
            { val: 4, txt: "4 Gavetas Extraíbles Blum" },
            { val: 5, txt: "5 Gavetas Extraíbles Blum" },
            { val: 6, txt: "6 Gavetas Extraíbles Blum" }
          ],
          defaultCount: 5,
          allowDoors: true
        },
        {
          id: "torre_hornos",
          label: "⚡ Torre de Hornos (Micro + Horno + Gavetas)",
          countLabel: "Gavetas Caceroleras Inferiores:",
          counts: [
            { val: 2, txt: "2 Gavetas Caceroleras + Hornos Empotrados" },
            { val: 3, txt: "3 Gavetas + Hornos Empotrados" }
          ],
          defaultCount: 2,
          allowDoors: false
        },
        {
          id: "torre_refri",
          label: "🧊 Nicho Refrigerador + Alacena Superior",
          counts: null,
          allowDoors: false
        }
      ],
      doors: [
        { id: "abatible_gola45", label: "Puertas Dobles Gola Corte 45°" },
        { id: "abatible", label: "Puertas Dobles Cierre Suave" },
        { id: "cristal", label: "Puertas Vitrina Cristal Fumé" },
        { id: "none", label: "Abierta Sin Puertas" }
      ]
    },

    vanity_col: {
      label: "Módulo Bajolavabo RH (Resistente a Humedad)",
      types: [
        {
          id: "cajones_bano",
          label: "🗄️ Gavetas RH c/ Saque en 'U' para Céspol",
          countLabel: "Número de Gavetas:",
          counts: [
            { val: 1, txt: "1 Gaveta Profunda RH" },
            { val: 2, txt: "2 Gavetas Estándar (Sup. Saque 'U' + Inf. Libre)" },
            { val: 3, txt: "3 Gavetas Organizadoras" }
          ],
          defaultCount: 2,
          allowDoors: false
        },
        {
          id: "entrepanos_bano",
          label: "📚 Gabinete c/ Entrepaños Toalleros",
          countLabel: "Número de Entrepaños:",
          counts: [
            { val: 1, txt: "1 Entrepaño Toallero" },
            { val: 2, txt: "2 Entrepaños Regulables" }
          ],
          defaultCount: 1,
          allowDoors: true
        }
      ],
      doors: [
        { id: "abatible_gola45", label: "Puertas RH Gola Corte 45° (≥60cm = 2 Hojas)" },
        { id: "abatible", label: "Puertas Abatibles RH Cierre Suave" },
        { id: "none", label: "Nicho Toallero Abierto Sin Puerta" }
      ]
    },

    tv_consola: {
      label: "Módulo de Consola TV / Almacenamiento",
      types: [
        {
          id: "cajones_tv",
          label: "🗄️ Cajón Push-to-Open / Gola 45°",
          countLabel: "Cajones:",
          counts: [
            { val: 1, txt: "1 Gaveta Amplia Continua" },
            { val: 2, txt: "2 Cajones Horizontales" }
          ],
          defaultCount: 1,
          allowDoors: false
        },
        {
          id: "entrepanos_tv",
          label: "📺 Compartimento Equipos / Entrepaños",
          countLabel: "Entrepaños Interiores:",
          counts: [
            { val: 1, txt: "1 Entrepaño Divisor c/ Pasacables" },
            { val: 2, txt: "2 Entrepaños Equipos" }
          ],
          defaultCount: 1,
          allowDoors: true
        }
      ],
      doors: [
        { id: "abatible", label: "Puerta Abatible c/ Pistón / Bisagra" },
        { id: "none", label: "Abierto Sin Puerta (Ventilación Consolas)" },
        { id: "cristal", label: "Puerta Cristal Fumé (Paso Control Remoto)" }
      ]
    },

    tv_torre: {
      label: "Torre de Almacenamiento / Perchero Lateral",
      types: [
        {
          id: "entrepanos_tv_torre",
          label: "📚 Columna de Entrepaños Regulables",
          countLabel: "Número de Entrepaños:",
          counts: [
            { val: 3, txt: "3 Entrepaños Amplios" },
            { val: 4, txt: "4 Entrepaños Estándar" },
            { val: 5, txt: "5 Entrepaños (Recomendado)" },
            { val: 6, txt: "6 Entrepaños Alta Densidad" }
          ],
          defaultCount: 5,
          allowDoors: true
        },
        {
          id: "cajones_tv_torre",
          label: "🗄️ Cajones Inferiores + Entrepaños Superiores",
          countLabel: "Cajones Inferiores:",
          counts: [
            { val: 2, txt: "2 Cajones Bajos + Entrepaños" },
            { val: 3, txt: "3 Cajones Bajos + Entrepaños" },
            { val: 4, txt: "4 Cajones Bajos + Entrepaños" }
          ],
          defaultCount: 3,
          allowDoors: true
        }
      ],
      doors: [
        { id: "abatible", label: "Puerta Cerrada Melamina Cierre Suave" },
        { id: "cristal", label: "Puerta Vitrina Cristal Fumé" },
        { id: "espejo", label: "Puerta con Luna de Espejo 4mm" },
        { id: "none", label: "Abierto Sin Puerta" }
      ]
    },

    perchero_banca: {
      label: "Módulo Central Perchero & Banca Zapatera (Mudroom)",
      types: [
        {
          id: "banca_charolas_perchero",
          label: "🧥 Banca Zapatera + Respaldo Perchero + Maletero",
          countLabel: "Niveles de Calzado Bajo Banca:",
          counts: [
            { val: 2, txt: "Banca 45cm + 2 Niveles Zapatera Abierta + 4 Ganchos" },
            { val: 3, txt: "Banca 45cm + 3 Divisiones Calzado + 5 Ganchos" }
          ],
          defaultCount: 2,
          allowDoors: false
        },
        {
          id: "banca_gavetas_perchero",
          label: "🗄️ Banca con Gavetas Extraíbles + Ganchos Percheros",
          countLabel: "Gavetas Bajo Banca:",
          counts: [
            { val: 2, txt: "2 Gavetones Zapateros Cierre Suave + Perchero" },
            { val: 3, txt: "3 Gavetas Bajo Banca + Perchero" }
          ],
          defaultCount: 2,
          allowDoors: false
        }
      ],
      doors: null
    }
  };

  function getDoorLabel(schemaKey, doorId) {
    const sc = MODULE_SCHEMAS[schemaKey];
    if (!sc || !sc.doors) return "";
    const found = sc.doors.find((d) => d.id === doorId);
    return found ? found.label : "";
  }

  // Renderer ligero sin mipmaps gigantes, preserveDrawingBuffer para exportar Lámina PNG limpia
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    preserveDrawingBuffer: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 16 / 10, 0.1, 60);
  camera.position.set(3.2, 2.2, 4.0);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 1.15, 0);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  let gridHelper = null;
  let explodables = [];
  let stateRef = null;
  let blueprintMode = false;
  let explosionPct = 0;
  let autoRotate = false;
  let activeView = "3d"; // "3d" | "2d"

  // Estado del sistema interactivo de módulos
  let interactiveMeshes = [];
  let highlightFrames = []; // bounding wireframes que solo prenden en hover
  let currentModulesCatalog = [];
  let bayCustomizations = {};
  let hoveredInfo = null;
  let highlightedModuleId = null;
  let activePopoverModuleId = null;
  let onModulesUpdatedCallback = null;
  let onModuleHoverCallback = null;
  let mouseDownPos = { x: 0, y: 0 };

  const hoverCard = document.getElementById("cadHoverCard");
  const popover = document.getElementById("cadModulePopover");

  function resize() {
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 480;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  function palette() {
    if (blueprintMode) {
      return {
        bg: 0x102036,
        gridA: 0x2a4d7d,
        gridB: 0x1a3459,
        fill: 0x1c3d68,
        fillOpacity: 0.55,
        edge: 0xf1f5f9,
        accentEdge: 0xfbbf24,
        accentFill: 0x264b7d,
        highlightEdge: 0x38bdf8,
        svgBg: "#102036",
        svgStroke: "#F1F5F9",
        svgMuted: "#93C5FD",
        svgAccent: "#FBBF24",
        svgFill: "rgba(37, 74, 125, 0.35)"
      };
    }
    return {
      bg: 0xf6f3ec,
      gridA: 0xc8c0b2,
      gridB: 0xe3ddd0,
      fill: 0xfffdf8,
      fillOpacity: 0.88,
      edge: 0x161513,
      accentEdge: 0x1b365d,
      accentFill: 0xebe3d3,
      highlightEdge: 0xd97706,
      svgBg: "#F6F3EC",
      svgStroke: "#161513",
      svgMuted: "#5A5854",
      svgAccent: "#B48327",
      svgFill: "#FFFDF8"
    };
  }

  function refreshSceneTheme() {
    const pal = palette();
    scene.background = new THREE.Color(pal.bg);
    if (gridHelper) scene.remove(gridHelper);
    gridHelper = new THREE.GridHelper(10, 20, pal.gridA, pal.gridB);
    gridHelper.position.y = 0;
    scene.add(gridHelper);
    container.classList.toggle("blueprint-mode", blueprintMode);
  }

  /**
   * Crea un panel/volumen arquitectónico con relleno maqueta limpio + trazo CAD EdgesGeometry
   */
  function addCadBox(w, h, d, x, y, z, opts = {}) {
    const pal = palette();
    const isAccent = Boolean(opts.accent);
    const geom = new THREE.BoxGeometry(Math.max(0.008, w), Math.max(0.008, h), Math.max(0.008, d));
    const mat = new THREE.MeshBasicMaterial({
      color: isAccent ? pal.accentFill : pal.fill,
      transparent: true,
      opacity: opts.glass ? 0.24 : pal.fillOpacity,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y, z);

    const edgeColor = isAccent ? pal.accentEdge : pal.edge;
    const edges = new THREE.EdgesGeometry(geom, 15);
    const lineMat = new THREE.LineBasicMaterial({ color: edgeColor });
    const wire = new THREE.LineSegments(edges, lineMat);
    mesh.add(wire);

    const parent = opts.parent || rootGroup;
    parent.add(mesh);

    if (opts.explode) {
      mesh.userData.basePos = new THREE.Vector3(x, y, z);
      mesh.userData.explodeVec = new THREE.Vector3(opts.explode[0], opts.explode[1], opts.explode[2]);
      explodables.push(mesh);
    }
    if (opts.moduleInfo) {
      mesh.userData.moduleInfo = opts.moduleInfo;
      mesh.userData.wire = wire;
      mesh.userData.origEdgeColor = edgeColor;
      interactiveMeshes.push(mesh);
    }
    return mesh;
  }

  /**
   * Volumen invisible de raycasting + marco dorado que solo aparece al pasar el mouse sobre ese módulo
   */
  function addModuleHitBox(w, h, d, x, y, z, modInfo, parentGroup) {
    const pal = palette();
    const geom = new THREE.BoxGeometry(Math.max(0.04, w), Math.max(0.04, h), Math.max(0.04, d));
    const mat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const hitMesh = new THREE.Mesh(geom, mat);
    hitMesh.position.set(x, y, z);
    hitMesh.userData.moduleInfo = modInfo;

    const edges = new THREE.EdgesGeometry(geom, 15);
    const frameMat = new THREE.LineBasicMaterial({ color: pal.highlightEdge });
    const frameWire = new THREE.LineSegments(edges, frameMat);
    frameWire.visible = false;
    frameWire.userData.moduleId = modInfo.id;
    hitMesh.add(frameWire);
    highlightFrames.push(frameWire);

    (parentGroup || rootGroup).add(hitMesh);
    interactiveMeshes.push(hitMesh);
    return hitMesh;
  }

  function registerModule(mod) {
    const idx = currentModulesCatalog.findIndex((m) => m.id === mod.id);
    if (idx === -1) {
      currentModulesCatalog.push(mod);
    } else {
      currentModulesCatalog[idx] = mod;
    }
  }

  function highlightModule3D(modId) {
    if (highlightedModuleId === modId) return;
    highlightedModuleId = modId;
    const pal = palette();
    interactiveMeshes.forEach((m) => {
      if (m.userData && m.userData.wire && m.userData.moduleInfo) {
        const match = modId && m.userData.moduleInfo.id === modId;
        m.userData.wire.material.color.setHex(match ? pal.highlightEdge : m.userData.origEdgeColor);
      }
    });
    highlightFrames.forEach((fw) => {
      fw.visible = Boolean(modId && fw.userData.moduleId === modId);
    });
    if (onModuleHoverCallback) onModuleHoverCallback(modId);
  }

  function clearFurniture() {
    while (rootGroup.children.length > 0) {
      const ch = rootGroup.children.pop();
      ch.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
    }
    explodables = [];
    interactiveMeshes = [];
    highlightFrames = [];
    currentModulesCatalog = [];
    highlightedModuleId = null;
  }

  // Helper para dibujar puertas en coordenadas locales de cualquier bahía (frente en +bayD/2)
  // Regla Senior Sistema 32: Módulos a partir de 60 cm (bayW >= 0.58m) llevan SIEMPRE 2 puertas simétricas (30cm+ c/u)
  function addBayDoorLocal(bayW, bayH, bayD, doorType, group, modInfo, opts = {}) {
    if (!doorType || doorType === "none") return;
    const zDoor = bayD / 2 + 0.015 + (opts.zOffset || 0);
    const isGlass = doorType === "cristal" || doorType === "espejo";
    const isGola45 = doorType === "abatible_gola45";
    const explodeZ = opts.explodeZ || 0.42;

    if (doorType === "aventos") {
      const halfH = bayH / 2 - 0.006;
      addCadBox(bayW - 0.01, halfH, 0.018, 0, bayH * 0.75, zDoor, {
        accent: true,
        parent: group,
        explode: [0, 0.14, explodeZ],
        moduleInfo: modInfo
      });
      addCadBox(bayW - 0.01, halfH, 0.018, 0, bayH * 0.25, zDoor, {
        parent: group,
        explode: [0, 0.06, explodeZ],
        moduleInfo: modInfo
      });
      addCadBox(Math.min(0.24, bayW * 0.35), 0.014, 0.016, 0, 0.05, zDoor + 0.014, {
        accent: true,
        parent: group,
        explode: [0, 0.06, explodeZ],
        moduleInfo: modInfo
      });
      return;
    }

    // Si es Gola con corte a 45° + manguete superior de 5.5cm, la hoja libra el canal Gola superior
    const topClearance = isGola45 ? 0.058 : 0.012;
    const doorH = Math.max(0.20, bayH - topClearance);
    const doorCY = doorH / 2 + 0.004;

    // Estándar de Taller: a partir de 60 cm (0.58 m descontando holguras) van 2 puertas simétricas
    const splitTwo = bayW >= 0.58 && doorType !== "corrediza";
    if (splitTwo) {
      const leafW = bayW / 2 - 0.006;
      [-bayW / 4, bayW / 4].forEach((lx, idx) => {
        addCadBox(leafW, doorH, 0.018, lx, doorCY, zDoor, {
          glass: isGlass,
          accent: isGlass,
          parent: group,
          explode: [idx === 0 ? -0.04 : 0.04, 0, explodeZ],
          moduleInfo: modInfo
        });
        if (isGola45) {
          addCadBox(leafW - 0.004, 0.010, 0.012, lx, doorCY + doorH / 2 - 0.005, zDoor + 0.004, {
            accent: true,
            parent: group,
            explode: [idx === 0 ? -0.04 : 0.04, 0, explodeZ],
            moduleInfo: modInfo
          });
        } else {
          const hx = idx === 0 ? lx + leafW / 2 - 0.035 : lx - leafW / 2 + 0.035;
          addCadBox(0.012, Math.min(0.22, doorH * 0.22), 0.016, hx, Math.min(doorCY * 1.05, 1.0), zDoor + 0.014, {
            accent: true,
            parent: group,
            explode: [idx === 0 ? -0.04 : 0.04, 0, explodeZ],
            moduleInfo: modInfo
          });
        }
      });
    } else {
      addCadBox(bayW - 0.008, doorH, 0.018, 0, doorCY, zDoor, {
        glass: isGlass,
        accent: isGlass,
        parent: group,
        explode: [0, 0, explodeZ],
        moduleInfo: modInfo
      });
      if (isGola45) {
        addCadBox(bayW - 0.014, 0.010, 0.012, 0, doorCY + doorH / 2 - 0.005, zDoor + 0.004, {
          accent: true,
          parent: group,
          explode: [0, 0, explodeZ],
          moduleInfo: modInfo
        });
      } else {
        addCadBox(0.012, Math.min(0.22, doorH * 0.22), 0.016, bayW / 2 - 0.045, Math.min(doorCY * 1.05, 1.0), zDoor + 0.014, {
          accent: true,
          parent: group,
          explode: [0, 0, explodeZ],
          moduleInfo: modInfo
        });
      }
    }
  }

  // -------------------------------------------------------------
  // CONSTRUCTOR DE BAHÍA DE CLÓSET / VESTIDOR (EN GRUPO LOCAL 3D)
  // -------------------------------------------------------------
  function buildClosetBay(opts) {
    const { cx, cyBase, cz, rotY = 0, bayW, bayH, bayD, bayKey, zone, defaultCfg, isCorner = false, zDoorOffset = 0 } = opts;

    const group = new THREE.Group();
    group.position.set(cx, cyBase, cz);
    group.rotation.y = rotY;
    rootGroup.add(group);

    if (isCorner) {
      const modInfo = {
        id: bayKey,
        zone: zone || "Esquina Continua",
        title: "Esquinero Continuo 'L' (Doble Tubo)",
        desc: "Regla de carpintería: doble tubo cromado continuo sin cajones en esquina para evitar colisión con el ala perpendicular.",
        schemaKey: "fixed",
        configurable: false,
        type: "corner_hanging",
        count: 2,
        door: "none"
      };
      addCadBox(bayW - 0.02, 0.022, 0.022, 0, bayH - 0.12, 0.04, { accent: true, parent: group, moduleInfo: modInfo });
      addCadBox(bayW - 0.02, 0.022, 0.022, 0, Math.min(0.95, bayH * 0.5), 0.04, { accent: true, parent: group, moduleInfo: modInfo });
      addCadBox(bayW - 0.01, 0.018, bayD - 0.04, 0, Math.min(1.04, bayH * 0.55), 0, { parent: group, moduleInfo: modInfo });
      addModuleHitBox(bayW - 0.01, bayH, bayD, 0, bayH / 2, 0, modInfo, group);
      registerModule(modInfo);
      return modInfo;
    }

    const custom = bayCustomizations[bayKey] || {};
    const type = custom.type || defaultCfg.type || "colgador_doble";
    const count = Number(custom.count !== undefined ? custom.count : (defaultCfg.count || (type === "cajones" ? 4 : (type === "entrepanos" ? 4 : 5))));
    const door = custom.door !== undefined ? custom.door : (defaultCfg.door || "none");

    const doorTxt = door && door !== "none" ? ` · ${getDoorLabel("closet_bay", door)}` : " · Abierto";
    const modInfo = {
      id: bayKey,
      zone: zone || "Bahía",
      title: "",
      desc: "",
      schemaKey: "closet_bay",
      configurable: true,
      type: type,
      count: count,
      door: door
    };

    if (type === "cajones") {
      modInfo.title = `Cajonera Soft-Close (${count} Gavetas)`;
      modInfo.desc = `${count} gavetas con correderas telescópicas cierre suave + repisas superiores regulables${doorTxt}.`;
      const totalDrawersH = Math.min(bayH * 0.56, Math.max(0.55, count * 0.20));
      const gap = 0.014;
      const singleH = (totalDrawersH - (count + 1) * gap) / count;
      for (let c = 0; c < count; c++) {
        const dy = gap + c * (singleH + gap) + singleH / 2;
        addCadBox(bayW - 0.02, singleH, bayD - 0.05, 0, dy, 0.01, {
          accent: true,
          parent: group,
          explode: [0, 0, 0.18 + c * 0.05],
          moduleInfo: modInfo
        });
        // Jaladera / uñero frontal
        addCadBox(Math.min(0.22, bayW * 0.3), 0.012, 0.014, 0, dy + singleH * 0.25, bayD / 2 - 0.01, {
          parent: group,
          explode: [0, 0, 0.18 + c * 0.05],
          moduleInfo: modInfo
        });
      }
      // Tapa sobre cajonera + entrepaños superiores
      addCadBox(bayW - 0.01, 0.018, bayD - 0.03, 0, totalDrawersH + 0.02, 0, { parent: group, moduleInfo: modInfo });
      const remH = bayH - (totalDrawersH + 0.04);
      if (remH > 0.45) {
        addCadBox(bayW - 0.01, 0.018, bayD - 0.04, 0, totalDrawersH + 0.02 + remH * 0.45, 0, { parent: group, moduleInfo: modInfo });
      }
      if (remH > 0.85) {
        addCadBox(bayW - 0.01, 0.018, bayD - 0.04, 0, totalDrawersH + 0.02 + remH * 0.80, 0, { parent: group, moduleInfo: modInfo });
      }
    } else if (type === "entrepanos") {
      modInfo.title = `Torre de Entrepaños (${count} Niveles)`;
      modInfo.desc = `${count} repisas regulables en Sistema 32 para ropa doblada, bolsas o blancos${doorTxt}.`;
      const step = bayH / (count + 1);
      for (let s = 1; s <= count; s++) {
        addCadBox(bayW - 0.01, 0.018, bayD - 0.04, 0, s * step, 0, {
          parent: group,
          explode: [0, 0, 0.08],
          moduleInfo: modInfo
        });
      }
    } else if (type === "zapatera") {
      modInfo.title = `Torre Zapatera (${count} Niveles)`;
      modInfo.desc = `${count} repisas para exhibición de calzado con tope frontal de aluminio${doorTxt}.`;
      const step = Math.min(0.32, (bayH - 0.12) / (count + 0.4));
      for (let s = 1; s <= count; s++) {
        const sy = s * step;
        addCadBox(bayW - 0.01, 0.018, bayD - 0.05, 0, sy, 0, { parent: group, explode: [0, 0, 0.12], moduleInfo: modInfo });
        addCadBox(bayW - 0.03, 0.028, 0.014, 0, sy + 0.018, bayD / 2 - 0.04, { accent: true, parent: group, explode: [0, 0, 0.12], moduleInfo: modInfo });
      }
    } else if (type === "mixto_cajon_tubo") {
      const nDraw = Math.max(2, Math.min(3, count));
      modInfo.title = `Mixto (${nDraw} Cajones + Colgador)`;
      modInfo.desc = `${nDraw} cajones cierre suave en la parte inferior + tubo cromado para camisas/sacos arriba${doorTxt}.`;
      const totalH = nDraw * 0.21;
      const gap = 0.014;
      const singleH = (totalH - (nDraw + 1) * gap) / nDraw;
      for (let c = 0; c < nDraw; c++) {
        const dy = gap + c * (singleH + gap) + singleH / 2;
        addCadBox(bayW - 0.02, singleH, bayD - 0.05, 0, dy, 0.01, {
          accent: true,
          parent: group,
          explode: [0, 0, 0.18 + c * 0.05],
          moduleInfo: modInfo
        });
      }
      addCadBox(bayW - 0.01, 0.018, bayD - 0.03, 0, totalH + 0.02, 0, { parent: group, moduleInfo: modInfo });
      addCadBox(bayW - 0.02, 0.022, 0.022, 0, bayH - 0.12, 0.04, { accent: true, parent: group, moduleInfo: modInfo });
    } else if (type === "colgador_largo") {
      modInfo.title = "Colgador Largo (Vestidos & Abrigos)";
      modInfo.desc = `Claro vertical libre para vestidos de gala, abrigos y trajes largos${doorTxt}.`;
      addCadBox(bayW - 0.02, 0.022, 0.022, 0, bayH - 0.12, 0.04, { accent: true, parent: group, moduleInfo: modInfo });
    } else {
      modInfo.title = "Doble Tubo de Colgado";
      modInfo.desc = `Tubo ovalado cromado superior (camisas/sacos) e inferior (pantalones/faldas) con divisor intermedio${doorTxt}.`;
      const midY = bayH * 0.52;
      addCadBox(bayW - 0.02, 0.022, 0.022, 0, bayH - 0.12, 0.04, { accent: true, parent: group, moduleInfo: modInfo });
      addCadBox(bayW - 0.02, 0.022, 0.022, 0, midY - 0.10, 0.04, { accent: true, parent: group, moduleInfo: modInfo });
      addCadBox(bayW - 0.01, 0.018, bayD - 0.04, 0, midY, 0, { parent: group, moduleInfo: modInfo });
    }

    // Puerta configurable por bahía
    addBayDoorLocal(bayW, bayH, bayD, door, group, modInfo, { zOffset: zDoorOffset });

    // Hit-box invisible + marco hover para toda la bahía
    addModuleHitBox(bayW - 0.008, bayH - 0.008, bayD, 0, bayH / 2, 0, modInfo, group);
    registerModule(modInfo);
    return modInfo;
  }

  // -------------------------------------------------------------
  // 1. CLÓSET RESIDENCIAL
  // -------------------------------------------------------------
  function buildClosetCAD(p) {
    const L = Number(p.largo || 2.0);
    const H = Number(p.alto || 2.4);
    const D = Number(p.fondo || 0.6);
    const t = 0.018;
    const zoclo = 0.08;
    const maleteroY = H - 0.44;
    const nBays = Math.max(2, Math.min(6, Math.round(L / 0.85)));
    const bayW = (L - (nBays + 1) * t) / nBays;
    const extras = p.extras || [];
    const tieneEspejo = extras.includes("espejo");
    const tieneZapatera = extras.includes("zapatera");
    const sub = p.subtipo || "CLOSET_ABATIBLE";

    // Zócalo, piso, techo y fondo trasero
    addCadBox(L - 0.02, zoclo, D - 0.04, 0, zoclo / 2, -0.02, { accent: true, explode: [0, -0.14, 0] });
    addCadBox(L, t, D, 0, zoclo + t / 2, 0);
    addCadBox(L, t, D, 0, H - t / 2, 0, { explode: [0, 0.22, 0] });
    addCadBox(L, H - zoclo, 0.012, 0, zoclo + (H - zoclo) / 2, -D / 2 + 0.006, { explode: [0, 0, -0.25] });

    // Divisores verticales
    for (let i = 0; i <= nBays; i++) {
      const x = -L / 2 + t / 2 + i * (bayW + t);
      const isOuter = i === 0 || i === nBays;
      addCadBox(t, H - zoclo - t, D, x, zoclo + (H - zoclo) / 2, 0, {
        explode: [isOuter ? (i === 0 ? -0.22 : 0.22) : 0, 0, 0]
      });
    }

    // Maletero superior corrido (con toggle de puertas)
    const malCustom = bayCustomizations["closet_maletero"] || {};
    const malDoor = malCustom.door !== undefined ? malCustom.door : (sub === "CLOSET_ABIERTO" ? "none" : "abatible");
    const malInfo = {
      id: "closet_maletero",
      zone: "Zona Superior (Piso a Techo)",
      title: "Maletero Superior Continuo",
      desc: `Almacenamiento corrido para maletas y edredones (${Math.round((H - maleteroY) * 100)} cm libres) · ${getDoorLabel("maletero", malDoor)}.`,
      schemaKey: "maletero",
      configurable: true,
      type: "maletero_corrido",
      count: 1,
      door: malDoor
    };
    addCadBox(L - 2 * t, t, D - 0.02, 0, maleteroY, -0.01, { accent: true, moduleInfo: malInfo });
    if (malDoor !== "none") {
      const malH = H - maleteroY - 0.03;
      for (let b = 0; b < nBays; b++) {
        const cx = -L / 2 + t + bayW / 2 + b * (bayW + t);
        addCadBox(bayW - 0.01, malH, 0.018, cx, maleteroY + malH / 2 + 0.015, D / 2 + 0.018, {
          glass: malDoor === "cristal",
          accent: malDoor === "cristal",
          explode: [0, 0.14, 0.35],
          moduleInfo: malInfo
        });
      }
    }
    addModuleHitBox(L - 0.02, H - maleteroY, D, 0, maleteroY + (H - maleteroY) / 2, 0, malInfo, rootGroup);
    registerModule(malInfo);

    // Bahías configurables del clóset
    for (let b = 0; b < nBays; b++) {
      const cx = -L / 2 + t + bayW / 2 + b * (bayW + t);
      const isCenter = b === Math.floor(nBays / 2);
      const isLast = b === nBays - 1;

      let defDoor = "abatible";
      if (sub === "CLOSET_ABIERTO") defDoor = "none";
      else if (sub === "CLOSET_MIXTO" && isCenter) defDoor = "none";
      else if (tieneEspejo) defDoor = "espejo";

      const defaultCfg = isCenter
        ? { type: "cajones", count: 4, door: defDoor }
        : isLast
        ? { type: tieneZapatera ? "zapatera" : "entrepanos", count: tieneZapatera ? 5 : 4, door: defDoor }
        : { type: "colgador_doble", count: 2, door: defDoor };

      buildClosetBay({
        cx: cx,
        cyBase: zoclo + t,
        cz: 0,
        rotY: 0,
        bayW: bayW - 0.004,
        bayH: maleteroY - zoclo - t,
        bayD: D - 0.02,
        bayKey: `closet_bay_${b}`,
        zone: `Bahía ${b + 1} (${b === 0 ? "Izquierda" : isLast ? "Derecha" : "Central"})`,
        defaultCfg: defaultCfg,
        zDoorOffset: sub === "CLOSET_CORREDIZO" ? (b % 2) * 0.024 : 0
      });
    }
  }

  // -------------------------------------------------------------
  // 2. VESTIDOR / WALK-IN CLOSET (TODOS LOS MUROS Y ALAS EN SU SITIO EXACTO)
  // -------------------------------------------------------------
  function buildWalkinCAD(p) {
    const L = Math.max(2.0, Math.min(Number(p.muroA_L || p.largo || 3.6), 6.5));
    const H = Number(p.alto || 2.4);
    const D = Math.max(0.45, Math.min(Number(p.fondo || 0.58), 0.65));
    const sub = p.subtipo || "WALKIN_LINEAL_DOBLE";
    const t = 0.018;
    const zoclo = 0.08;
    const maleteroY = H - 0.44;
    const extras = p.extras || [];

    const hasLeftWing = p.muroB_activo !== undefined
      ? Boolean(p.muroB_activo)
      : (sub === "WALKIN_L" || sub === "WALKIN_ISLA" || sub === "WALKIN_CRISTAL");
    const leftWingL = Math.max(1.0, Math.min(Number(p.muroB_L || 2.4), 4.2));

    const hasRightWing = p.muroC_activo !== undefined
      ? Boolean(p.muroC_activo)
      : (sub === "WALKIN_ISLA");
    const rightWingL = Math.max(1.0, Math.min(Number(p.muroC_L || 2.4), 4.2));

    const tieneVestidos = extras.includes("colgador_vestidos");
    const tieneCajonera = extras.includes("cajonera_softclose") || true;
    const tieneZapateras = extras.includes("zapateras_pro") || extras.includes("zapatera");
    const tieneLED = extras.includes("led_vertical") || extras.includes("led");
    const defDoor = sub === "WALKIN_CRISTAL" ? "cristal" : "none";

    const zBack = -1.0;
    const wallW = L;
    const nBays = Math.max(3, Math.round(wallW / 0.85));
    const bayW = (wallW - (nBays + 1) * t) / nBays;

    // Estructura muro posterior en z = zBack (-1.0)
    addCadBox(wallW, H - zoclo, 0.012, 0, zoclo + (H - zoclo) / 2, zBack - D / 2 + 0.006, { explode: [0, 0, -0.22] });
    addCadBox(wallW, t, D, 0, H - t / 2, zBack);
    addCadBox(wallW, zoclo, D, 0, zoclo / 2, zBack, { accent: true });
    addCadBox(wallW - 2 * t, t, D - 0.02, 0, maleteroY, zBack, { accent: true });

    for (let i = 0; i <= nBays; i++) {
      const dx = -wallW / 2 + t / 2 + i * (bayW + t);
      addCadBox(t, H - zoclo - t, D, dx, zoclo + (H - zoclo) / 2, zBack, { explode: [0, 0, -0.15] });
      if (tieneLED && i > 0 && i < nBays) {
        addCadBox(0.012, maleteroY - zoclo - 0.06, 0.012, dx + 0.014, zoclo + (maleteroY - zoclo) / 2, zBack + D / 2 - 0.02, { accent: true });
      }
    }

    // Maletero superior del vestidor
    const malCustom = bayCustomizations["walkin_maletero"] || {};
    const malDoor = malCustom.door !== undefined ? malCustom.door : defDoor;
    const malInfo = {
      id: "walkin_maletero",
      zone: "Zona Superior Perimetral",
      title: "Maletero Superior Continuo",
      desc: `Almacenamiento corrido superior para maletas, cajas de temporada y edredones · ${getDoorLabel("maletero", malDoor)}.`,
      schemaKey: "maletero",
      configurable: true,
      type: "maletero_corrido",
      count: 1,
      door: malDoor
    };
    if (malDoor !== "none") {
      const malH = H - maleteroY - 0.03;
      for (let b = 0; b < nBays; b++) {
        const cx = -wallW / 2 + t + bayW / 2 + b * (bayW + t);
        addCadBox(bayW - 0.01, malH, 0.018, cx, maleteroY + malH / 2 + 0.015, zBack + D / 2 + 0.018, {
          glass: malDoor === "cristal",
          accent: malDoor === "cristal",
          explode: [0, 0.12, 0.25],
          moduleInfo: malInfo
        });
      }
    }
    addModuleHitBox(wallW - 0.02, H - maleteroY, D, 0, maleteroY + (H - maleteroY) / 2, zBack, malInfo, rootGroup);
    registerModule(malInfo);

    // Bahías del muro posterior — TODAS posicionadas en cz = zBack (-1.0)
    for (let b = 0; b < nBays; b++) {
      const cx = -wallW / 2 + t + bayW / 2 + b * (bayW + t);
      const isLeftCorner = b === 0 && (sub === "WALKIN_L" || sub === "WALKIN_ISLA" || sub === "WALKIN_CRISTAL");
      const isRightCorner = b === nBays - 1 && sub === "WALKIN_ISLA";
      const isCornerBay = isLeftCorner || isRightCorner;
      const isDrawerBay = sub === "WALKIN_L" ? b === 1 : b === Math.floor(nBays / 2);

      let defaultCfg = { type: "colgador_doble", count: 2, door: defDoor };
      if (isDrawerBay && tieneCajonera) {
        defaultCfg = { type: "cajones", count: 4, door: defDoor };
      } else if (b === nBays - 1 && tieneZapateras && sub !== "WALKIN_ISLA") {
        defaultCfg = { type: "zapatera", count: 5, door: defDoor };
      } else if (tieneVestidos && b === nBays - 1 && sub !== "WALKIN_ISLA") {
        defaultCfg = { type: "colgador_largo", count: 1, door: defDoor };
      }

      buildClosetBay({
        cx: cx,
        cyBase: zoclo + t,
        cz: zBack,
        rotY: 0,
        bayW: bayW - 0.004,
        bayH: maleteroY - zoclo - t,
        bayD: D - 0.02,
        bayKey: `walkin_wall_${b}`,
        zone: `Muro Fondo · Bahía ${b + 1}`,
        defaultCfg: defaultCfg,
        isCorner: isCornerBay
      });
    }

    // Muro opuesto en "Dos Muros Paralelos (Pasillo)" — rotY = Math.PI (frente hacia -Z)
    if (sub === "WALKIN_LINEAL_DOBLE") {
      const zOpp = 1.0; // pasillo interior limpio de ~1.40 m entre frentes
      const oppW = wallW;
      const nOppBays = nBays;
      const oppBayW = (oppW - (nOppBays + 1) * t) / nOppBays;

      addCadBox(oppW, H - zoclo, 0.012, 0, zoclo + (H - zoclo) / 2, zOpp + D / 2 - 0.006, { explode: [0, 0, 0.22] });
      addCadBox(oppW, t, D, 0, H - t / 2, zOpp);
      addCadBox(oppW, zoclo, D, 0, zoclo / 2, zOpp, { accent: true });
      addCadBox(oppW - 2 * t, t, D - 0.02, 0, maleteroY, zOpp, { accent: true });

      for (let oi = 0; oi <= nOppBays; oi++) {
        const ox = -oppW / 2 + t / 2 + oi * (oppBayW + t);
        addCadBox(t, H - zoclo - t, D, ox, zoclo + (H - zoclo) / 2, zOpp, { explode: [0, 0, 0.15] });
      }
      for (let ob = 0; ob < nOppBays; ob++) {
        const ox = -oppW / 2 + t + oppBayW / 2 + ob * (oppBayW + t);
        const defOpp = ob === Math.floor(nOppBays / 2)
          ? { type: "entrepanos", count: 5, door: "none" }
          : ob === 0
          ? { type: "colgador_largo", count: 1, door: "none" }
          : { type: "colgador_doble", count: 2, door: "none" };

        buildClosetBay({
          cx: ox,
          cyBase: zoclo + t,
          cz: zOpp,
          rotY: Math.PI,
          bayW: oppBayW - 0.004,
          bayH: maleteroY - zoclo - t,
          bayD: D - 0.02,
          bayKey: `walkin_opp_${ob}`,
          zone: `Muro Frente · Bahía ${ob + 1}`,
          defaultCfg: defOpp
        });
      }
    }

    // Alas laterales (arrancan EXACTAMENTE en el frente del muro posterior: zBack + D/2 — cero huecos!)
    const wingZStart = zBack + D / 2;

    function buildWingModules(posX, isLeft, wingPrefix, customWingL) {
      const curWingL = Math.max(1.0, Math.min(Number(customWingL || 2.4), 4.5));
      const centerZ = wingZStart + curWingL / 2;
      const nWingBays = Math.max(1, Math.round(curWingL / 0.85));
      const wingBayL = (curWingL - (nWingBays + 1) * t) / nWingBays;
      const signIn = isLeft ? 1 : -1; // dirección hacia el pasillo interior
      const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;
      const wingName = isLeft ? "Muro B · Ala Izquierda" : "Muro C · Ala Derecha";

      // Respaldo exterior del ala
      addCadBox(0.012, H - zoclo, curWingL, posX - signIn * (D / 2 - 0.006), zoclo + (H - zoclo) / 2, centerZ, {
        explode: [-signIn * 0.2, 0, 0]
      });
      // Techo, zócalo y maletero del ala
      addCadBox(D, t, curWingL, posX, H - t / 2, centerZ);
      addCadBox(D, zoclo, curWingL, posX, zoclo / 2, centerZ, { accent: true });
      addCadBox(D - 0.02, t, curWingL - 2 * t, posX, maleteroY, centerZ, { accent: true });

      // Divisores transversales del ala
      for (let wb = 0; wb <= nWingBays; wb++) {
        const wz = wingZStart + t / 2 + wb * (wingBayL + t);
        addCadBox(D, H - zoclo - t, t, posX, zoclo + (H - zoclo) / 2, wz);
        if (tieneLED && wb > 0 && wb < nWingBays) {
          addCadBox(0.012, maleteroY - zoclo - 0.06, 0.012, posX + signIn * (D / 2 - 0.02), zoclo + (maleteroY - zoclo) / 2, wz, { accent: true });
        }
      }

      // Bahías del ala — cada una orientada EXACTAMENTE hacia el pasillo interior
      for (let wb = 0; wb < nWingBays; wb++) {
        const wz = wingZStart + t + wingBayL / 2 + wb * (wingBayL + t);
        const defaultCfg = wb === 0
          ? { type: "colgador_doble", count: 2, door: defDoor }
          : wb === nWingBays - 1
          ? { type: "zapatera", count: 5, door: defDoor }
          : { type: "entrepanos", count: 4, door: defDoor };

        buildClosetBay({
          cx: posX,
          cyBase: zoclo + t,
          cz: wz,
          rotY: rotY,
          bayW: wingBayL - 0.004,
          bayH: maleteroY - zoclo - t,
          bayD: D - 0.02,
          bayKey: `${wingPrefix}_bay_${wb}`,
          zone: `${wingName} · Bahía ${wb + 1}`,
          defaultCfg: defaultCfg
        });
      }
    }

    if (hasLeftWing) {
      buildWingModules(-wallW / 2 + D / 2, true, "left_wing", leftWingL);
    }
    if (hasRightWing) {
      buildWingModules(wallW / 2 - D / 2, false, "right_wing", rightWingL);
    }

    // Isla Joyera Central con pasillos ergonómicos
    const refWingL = Math.max(hasLeftWing ? leftWingL : 1.8, hasRightWing ? rightWingL : 1.8);
    if ((sub === "WALKIN_ISLA" || (extras.includes("isla") && sub !== "WALKIN_LINEAL_DOBLE")) && (hasLeftWing || hasRightWing)) {
      const clearW = wallW - 2 * D;
      const islandW = Math.max(0.58, Math.min(0.76, clearW - 1.70));
      const islandL = Math.max(0.95, Math.min(1.45, refWingL - 0.90));
      const islandBackZ = wingZStart + 0.90;
      const islandCenterZ = islandBackZ + islandL / 2;

      const islaCustom = bayCustomizations["walkin_isla"] || {};
      const islaType = islaCustom.type || "isla_joyero";
      const islaCount = Number(islaCustom.count || 3);
      const isGlassTop = islaType === "isla_joyero";

      const islaInfo = {
        id: "walkin_isla",
        zone: "Centro de Vestidor",
        title: isGlassTop ? `Isla Joyera Cristal (${islaCount} Niveles)` : `Isla Sólida (${islaCount} Niveles Cajones)`,
        desc: isGlassTop
          ? `Cubierta cristal templado 6mm + charola joyera terciopelo + ${islaCount} niveles de gavetas cierre suave. Pasillos libres ≥ 85 cm.`
          : `Cubierta sólida + ${islaCount} niveles de cajones dobles para accesorios y ropa doblada. Pasillos libres ≥ 85 cm.`,
        schemaKey: "walkin_isla",
        configurable: true,
        type: islaType,
        count: islaCount,
        door: "none"
      };

      const islaGroup = new THREE.Group();
      islaGroup.position.set(0, 0, islandCenterZ);
      rootGroup.add(islaGroup);

      // Zócalo y cuerpo
      addCadBox(islandW - 0.04, 0.06, islandL - 0.04, 0, 0.03, 0, { parent: islaGroup, moduleInfo: islaInfo });
      addCadBox(islandW, 0.78, islandL, 0, 0.45, 0, { parent: islaGroup, moduleInfo: islaInfo });
      // Cubierta superior
      addCadBox(islandW + 0.04, 0.025, islandL + 0.04, 0, 0.855, 0, {
        glass: isGlassTop,
        accent: true,
        parent: islaGroup,
        explode: [0, 0.25, 0],
        moduleInfo: islaInfo
      });

      // Gavetas reales en ambos costados según islaCount
      const drawAreaH = 0.72;
      const dH = (drawAreaH - (islaCount + 1) * 0.015) / islaCount;
      for (let r = 0; r < islaCount; r++) {
        const ry = 0.08 + r * (dH + 0.015) + dH / 2;
        addCadBox(islandW + 0.02, dH, islandL - 0.08, 0, ry, 0, {
          accent: r === islaCount - 1 && isGlassTop,
          parent: islaGroup,
          explode: [0.16 + r * 0.03, 0, 0],
          moduleInfo: islaInfo
        });
      }

      addModuleHitBox(islandW + 0.04, 0.88, islandL + 0.04, 0, 0.44, 0, islaInfo, islaGroup);
      registerModule(islaInfo);
    }
  }

  // -------------------------------------------------------------
  // CONSTRUCTORES DE BAHÍAS DE COCINA (INGENIERÍA SENIOR SISTEMA 32)
  // 1. Altura a superficie melamina: 91 cm (Casco 81 cm + Patas niveladoras 10 cm c/ tapeta aluminio)
  // 2. Manguete superior: 5.5 cm bajo techo para acompañar faldón de piedra y canal Gola a 45°
  // 3. Sobrealacena 2° Piso: Cuando alacena > 80 cm -> 1° Piso 32 cm fondo + 2° Piso 42 cm fondo (+10 cm voladizo)
  // 4. Unicidad inteligente de Tarja y Parrilla (Swap automático sin duplicados jamás)
  // -------------------------------------------------------------
  let kitchenCookBayId = null;
  let kitchenSinkBayId = null;

  function isCookType(t) {
    return t === "parrilla_cajones" || t === "parrilla_horno" || t === "estufa_piso";
  }
  function isSinkType(t) {
    return t === "tarja_puertas_botes" || t === "tarja_gavetas_u" || t === "tarja_entrepanos";
  }

  function applyKitchenSingletonRules(targetId, newCfg) {
    if (!targetId || !newCfg || !newCfg.type) return;
    const newType = newCfg.type;

    if (isCookType(newType)) {
      const prevCookId = kitchenCookBayId;
      const prevCookCfg = (prevCookId && bayCustomizations[prevCookId])
        ? Object.assign({}, bayCustomizations[prevCookId])
        : { type: "parrilla_cajones", count: 75, door: "none" };

      if (targetId === kitchenSinkBayId && prevCookId && prevCookId !== targetId) {
        // SWAP: La tarja pasa a donde estaba la parrilla
        const prevSinkCfg = bayCustomizations[targetId] && isSinkType(bayCustomizations[targetId].type)
          ? Object.assign({}, bayCustomizations[targetId])
          : { type: "tarja_puertas_botes", count: 2, door: "abatible_gola45" };
        bayCustomizations[prevCookId] = prevSinkCfg;
        kitchenSinkBayId = prevCookId;
      } else if (prevCookId && prevCookId !== targetId) {
        const targetOld = bayCustomizations[targetId];
        if (targetOld && !isCookType(targetOld.type) && !isSinkType(targetOld.type)) {
          bayCustomizations[prevCookId] = Object.assign({}, targetOld);
        } else {
          bayCustomizations[prevCookId] = { type: "entrepanos_cocina", count: 2, door: "abatible_gola45" };
        }
      }
      kitchenCookBayId = targetId;
      bayCustomizations[targetId] = Object.assign({}, prevCookCfg, newCfg);
      return;
    }

    if (isSinkType(newType)) {
      const prevSinkId = kitchenSinkBayId;
      const prevSinkCfg = (prevSinkId && bayCustomizations[prevSinkId])
        ? Object.assign({}, bayCustomizations[prevSinkId])
        : { type: "tarja_puertas_botes", count: 2, door: "abatible_gola45" };

      if (targetId === kitchenCookBayId && prevSinkId && prevSinkId !== targetId) {
        // SWAP: La parrilla pasa a donde estaba la tarja
        const prevCookCfg = bayCustomizations[targetId] && isCookType(bayCustomizations[targetId].type)
          ? Object.assign({}, bayCustomizations[targetId])
          : { type: "parrilla_cajones", count: 75, door: "none" };
        bayCustomizations[prevSinkId] = prevCookCfg;
        kitchenCookBayId = prevSinkId;
      } else if (prevSinkId && prevSinkId !== targetId) {
        const targetOld = bayCustomizations[targetId];
        if (targetOld && !isCookType(targetOld.type) && !isSinkType(targetOld.type)) {
          bayCustomizations[prevSinkId] = Object.assign({}, targetOld);
        } else {
          bayCustomizations[prevSinkId] = { type: "entrepanos_cocina", count: 2, door: "abatible_gola45" };
        }
      }
      kitchenSinkBayId = targetId;
      bayCustomizations[targetId] = Object.assign({}, prevSinkCfg, newCfg);
      return;
    }

    const allBaseMods = currentModulesCatalog.filter((m) => m.schemaKey === "cocina_bajo" && m.id !== targetId);
    if (targetId === kitchenCookBayId) {
      const fallback = allBaseMods.find((m) => m.id !== kitchenSinkBayId) || allBaseMods[0];
      if (fallback) {
        const oldCookCfg = (bayCustomizations[targetId] && isCookType(bayCustomizations[targetId].type))
          ? Object.assign({}, bayCustomizations[targetId])
          : { type: "parrilla_cajones", count: 75, door: "none" };
        kitchenCookBayId = fallback.id;
        bayCustomizations[fallback.id] = oldCookCfg;
      }
    } else if (targetId === kitchenSinkBayId) {
      const fallback = allBaseMods.find((m) => m.id !== kitchenCookBayId) || allBaseMods[0];
      if (fallback) {
        const oldSinkCfg = (bayCustomizations[targetId] && isSinkType(bayCustomizations[targetId].type))
          ? Object.assign({}, bayCustomizations[targetId])
          : { type: "tarja_puertas_botes", count: 2, door: "abatible_gola45" };
        kitchenSinkBayId = fallback.id;
        bayCustomizations[fallback.id] = oldSinkCfg;
      }
    }

    bayCustomizations[targetId] = Object.assign({}, bayCustomizations[targetId] || {}, newCfg);
  }

  function drawLevelerLegsAndToekick(w, zocloH, d, group, modInfo) {
    const legW = 0.036;
    const zFront = d / 2 - 0.055;
    const zRear = -d / 2 + 0.055;
    [-w / 2 + 0.06, w / 2 - 0.06].forEach((lx) => {
      addCadBox(legW, zocloH, legW, lx, zocloH / 2, zFront, { accent: true, parent: group, moduleInfo: modInfo });
      addCadBox(legW, zocloH, legW, lx, zocloH / 2, zRear, { parent: group, moduleInfo: modInfo });
    });
    addCadBox(w - 0.004, zocloH - 0.004, 0.012, 0, zocloH / 2, zFront + 0.018, {
      accent: true,
      parent: group,
      explode: [0, 0, 0.14],
      moduleInfo: modInfo
    });
  }

  function buildKitchenCornerBay(opts) {
    const { cx, cyBase, cz, bayW, bayH, bayD, bayKey, zone, defaultType = "esquinero_lemans" } = opts;
    const group = new THREE.Group();
    group.position.set(cx, cyBase, cz);
    rootGroup.add(group);

    const custom = bayCustomizations[bayKey] || {};
    const type = custom.type || defaultType;
    const count = Number(custom.count !== undefined ? custom.count : 2);
    const door = custom.door !== undefined ? custom.door : "abatible_gola45";

    const t = 0.016;
    const mangueteH = 0.055;
    const modWCm = Math.round(bayW * 100);
    const doorsCountTxt = bayW >= 0.58 ? `2 Puertas de ${Math.round((bayW * 100) / 2)} cm` : `1 Puerta de ${modWCm} cm`;

    const modInfo = {
      id: bayKey,
      zone: zone,
      title: "",
      desc: "",
      schemaKey: "cocina_esquinero",
      configurable: true,
      type: type,
      count: count,
      door: door
    };

    addCadBox(t, bayH, bayD, -bayW / 2 + t / 2, bayH / 2, 0, { parent: group, moduleInfo: modInfo });
    addCadBox(t, bayH, bayD, bayW / 2 - t / 2, bayH / 2, 0, { parent: group, moduleInfo: modInfo });
    addCadBox(bayW - 2 * t, t, bayD, 0, t / 2, 0, { parent: group, moduleInfo: modInfo });
    addCadBox(bayW - 2 * t, t, bayD, 0, bayH - t / 2, 0, { parent: group, moduleInfo: modInfo });
    addCadBox(bayW - 2 * t, mangueteH, 0.018, 0, bayH - mangueteH / 2, bayD / 2 - 0.016, { accent: true, parent: group, moduleInfo: modInfo });

    const usableH = bayH - mangueteH - t;

    if (type === "esquinero_lemans") {
      modInfo.title = `⚙️ Esquinero Extraíble LeMans (${doorsCountTxt})`;
      modInfo.desc = `Módulo en escuadra con 2 bandejas articuladas extraíbles (45 kg) que salen fuera del mueble. Manguete 5.5 cm + ${getDoorLabel("cocina_esquinero", door)}.`;
      addCadBox(bayW - 0.12, 0.024, bayD - 0.12, 0, usableH * 0.36, 0, { accent: true, parent: group, explode: [0, 0, 0.28], moduleInfo: modInfo });
      addCadBox(bayW - 0.12, 0.024, bayD - 0.12, 0, usableH * 0.72, 0, { accent: true, parent: group, explode: [0, 0, 0.34], moduleInfo: modInfo });
    } else if (type === "esquinero_cajon_entrepano") {
      modInfo.title = `🗄️ Esquinero Mixto: 1 Cajón + ${count} Entrepaño${count > 1 ? "s" : ""}`;
      modInfo.desc = `Esquinero con 1 cajón superior + ${count} entrepaño${count > 1 ? "s" : ""} corrido${count > 1 ? "s" : ""} inferior${count > 1 ? "es" : ""} · ${doorsCountTxt}.`;
      const topDrawH = 0.16;
      addCadBox(bayW - 2 * t - 0.008, topDrawH, bayD - 0.04, 0, usableH - topDrawH / 2, 0.015, {
        accent: true,
        parent: group,
        explode: [0, 0, 0.25],
        moduleInfo: modInfo
      });
      const lowerH = usableH - topDrawH - 0.02;
      for (let s = 1; s <= count; s++) {
        addCadBox(bayW - 2 * t - 0.01, 0.016, bayD - 0.04, 0, (lowerH / (count + 1)) * s, 0, { parent: group, moduleInfo: modInfo });
      }
      if (door !== "none") {
        addBayDoorLocal(bayW, lowerH + 0.05, bayD, door, group, modInfo, { explodeZ: 0.34 });
      }
      addModuleHitBox(bayW, bayH, bayD, 0, bayH / 2, 0, modInfo, group);
      registerModule(modInfo);
      return modInfo;
    } else {
      modInfo.title = `📐 Esquinero c/ ${count} Entrepaño${count > 1 ? "s" : ""} (${doorsCountTxt})`;
      modInfo.desc = `Módulo en escuadra con ${count} entrepaño${count > 1 ? "s" : ""} corrido${count > 1 ? "s" : ""} reforzado${count > 1 ? "s" : ""} Sistema 32 · ${getDoorLabel("cocina_esquinero", door)}.`;
      for (let s = 1; s <= count; s++) {
        addCadBox(bayW - 2 * t - 0.01, 0.016, bayD - 0.04, 0, (usableH / (count + 1)) * s, 0, { parent: group, moduleInfo: modInfo });
      }
    }

    addBayDoorLocal(bayW, bayH, bayD, door, group, modInfo, { explodeZ: 0.34 });
    addModuleHitBox(bayW, bayH, bayD, 0, bayH / 2, 0, modInfo, group);
    registerModule(modInfo);
    return modInfo;
  }

  function buildKitchenBaseBay(opts) {
    const { cx, cyBase, cz, rotY = 0, bayW, bayH, bayD, bayKey, zone, defaultCfg, extraNote = "", zocloH = 0.10 } = opts;
    const group = new THREE.Group();
    group.position.set(cx, cyBase, cz);
    group.rotation.y = rotY;
    rootGroup.add(group);

    const custom = bayCustomizations[bayKey] || {};
    let type = custom.type || defaultCfg.type || "entrepanos_cocina";

    if (bayKey === kitchenCookBayId && !isCookType(type)) {
      type = (custom.type && isCookType(custom.type)) ? custom.type : (defaultCfg.type && isCookType(defaultCfg.type) ? defaultCfg.type : "parrilla_cajones");
    } else if (bayKey !== kitchenCookBayId && isCookType(type)) {
      type = "entrepanos_cocina";
    }

    if (bayKey === kitchenSinkBayId && !isSinkType(type)) {
      type = (custom.type && isSinkType(custom.type)) ? custom.type : "tarja_puertas_botes";
    } else if (bayKey !== kitchenSinkBayId && isSinkType(type)) {
      type = "entrepanos_cocina";
    }

    const defCount = type === "parrilla_cajones" ? 75 : (type === "cajones_cocina" ? 3 : 2);
    const count = Number(custom.count !== undefined ? custom.count : (defaultCfg.count || defCount));
    const door = custom.door !== undefined ? custom.door : (defaultCfg.door || "abatible_gola45");

    const t = 0.016;
    const mangueteH = 0.055;
    const usableH = bayH - mangueteH - 0.008;
    const innerW = bayW - 2 * t - 0.006;
    const modWCm = Math.round(bayW * 100);
    const leafCm = Math.round(modWCm / 2);
    const doorSplitNote = bayW >= 0.58 ? `2 Puertas de ${leafCm} cm` : `1 Puerta de ${modWCm} cm`;

    const allowsDoorNow =
      type === "entrepanos_cocina" ||
      type === "mixto_cajon_entrepano" ||
      type === "tarja_puertas_botes" ||
      type === "tarja_entrepanos";

    const modInfo = {
      id: bayKey,
      zone: zone,
      title: "",
      desc: "",
      schemaKey: "cocina_bajo",
      configurable: true,
      type: type,
      count: count,
      door: allowsDoorNow ? door : "none"
    };

    if (type === "estufa_piso") {
      modInfo.title = `🍳 Estufa Completa de Piso (76 cm · Corta Barra)`;
      modInfo.desc = `Estufa de piso independiente con horno integrado: interrumpe el zoclo, casco y cubierta de piedra. Puedes moverla a cualquier otro módulo sin que se duplique.`;
      const stoveH = bayH + zocloH;
      addCadBox(bayW - 0.02, stoveH, bayD + 0.02, 0, -zocloH + stoveH / 2, 0.01, {
        accent: true,
        parent: group,
        explode: [0, 0, 0.30],
        moduleInfo: modInfo
      });
      addCadBox(bayW * 0.72, stoveH * 0.44, 0.02, 0, -zocloH + stoveH * 0.42, bayD / 2 + 0.025, {
        glass: true,
        accent: true,
        parent: group,
        explode: [0, 0, 0.34],
        moduleInfo: modInfo
      });
      addCadBox(bayW - 0.04, 0.03, bayD - 0.04, 0, bayH + 0.02, 0, {
        accent: true,
        parent: group,
        explode: [0, 0.16, 0.30],
        moduleInfo: modInfo
      });
      addModuleHitBox(bayW, stoveH + 0.08, bayD + 0.04, 0, -zocloH + stoveH / 2, 0, modInfo, group);
      registerModule(modInfo);
      return modInfo;
    }

    addCadBox(t, bayH, bayD, -bayW / 2 + t / 2, bayH / 2, 0, { parent: group });
    addCadBox(t, bayH, bayD, bayW / 2 - t / 2, bayH / 2, 0, { parent: group });
    addCadBox(bayW - 2 * t, t, bayD, 0, t / 2, 0, { parent: group });
    if (!isSinkType(type)) {
      addCadBox(bayW - 2 * t, t, bayD, 0, bayH - t / 2, 0, { parent: group });
    }
    addCadBox(bayW - 2 * t, bayH, 0.01, 0, bayH / 2, -bayD / 2 + 0.005, { parent: group });
    addCadBox(bayW - 2 * t, mangueteH, 0.018, 0, bayH - mangueteH / 2, bayD / 2 - 0.016, {
      accent: true,
      parent: group,
      moduleInfo: modInfo
    });

    if (isSinkType(type)) {
      if (type === "tarja_gavetas_u") {
        modInfo.title = `🚰 Bajo Tarja RH c/ 2 Gavetas (Saque en 'U')`;
        modInfo.desc = `Zona húmeda única: 2 gavetas caceroleras hidrófugas RH con saque en 'U' para librar céspol + Tarja submontar Cal.16 y monomando.`;
        const gH = (usableH - 0.036) / 2;
        [0, 1].forEach((idx) => {
          const dy = 0.012 + idx * (gH + 0.012) + gH / 2;
          addCadBox(innerW, gH, bayD - 0.04, 0, dy, 0.015, {
            accent: true,
            parent: group,
            explode: [0, 0, 0.22 + idx * 0.06],
            moduleInfo: modInfo
          });
        });
      } else if (type === "tarja_entrepanos") {
        modInfo.title = `🚰 Bajo Tarja RH (${doorSplitNote} + Entrepaño Lateral)`;
        modInfo.desc = `Zona húmeda única: gabinete hidrófugo RH con ${doorSplitNote}, manguete 5.5 cm Gola 45° y entrepaño lateral para detergentes.`;
        addCadBox(innerW * 0.48, 0.016, bayD - 0.06, -innerW * 0.24, usableH * 0.48, 0, { parent: group, moduleInfo: modInfo });
        addBayDoorLocal(bayW, bayH, bayD, door, group, modInfo, { explodeZ: 0.34 });
      } else {
        modInfo.title = `🚰 Bajo Tarja RH (${doorSplitNote} + Botes Basura)`;
        modInfo.desc = `Zona húmeda única: gabinete hidrófugo RH con piso aluminio, ${doorSplitNote}, manguete 5.5 cm Gola 45° y bote doble extraíble.`;
        addCadBox(bayW * 0.34, 0.38, 0.34, -bayW * 0.20, 0.22, 0.04, { accent: true, parent: group, explode: [0, 0, 0.22], moduleInfo: modInfo });
        addCadBox(bayW * 0.34, 0.38, 0.34, bayW * 0.20, 0.22, 0.04, { accent: true, parent: group, explode: [0, 0, 0.22], moduleInfo: modInfo });
        addBayDoorLocal(bayW, bayH, bayD, door, group, modInfo, { explodeZ: 0.34 });
      }
      addCadBox(Math.min(0.74, bayW - 0.08), 0.022, 0.44, 0, bayH + 0.052, 0.02, { accent: true, parent: group, explode: [0, 0.24, 0], moduleInfo: modInfo });
      addCadBox(0.03, 0.30, 0.03, 0, bayH + 0.21, -0.15, { accent: true, parent: group, moduleInfo: modInfo });
      addCadBox(0.12, 0.03, 0.03, 0, bayH + 0.36, -0.11, { accent: true, parent: group, moduleInfo: modInfo });

      addModuleHitBox(bayW, bayH + 0.38, bayD, 0, (bayH + 0.38) / 2, 0, modInfo, group);
      registerModule(modInfo);
      return modInfo;
    }

    if (type === "parrilla_cajones") {
      const pCm = (count === 60 || count === 75 || count === 90) ? count : 75;
      const nFlamas = pCm === 60 ? "4 Flamas" : pCm === 90 ? "6 Flamas" : "5 Flamas";
      modInfo.title = `🔥 Bajo Parrilla ${pCm}cm (${nFlamas}): 2 Cubierteros + 1 Cacerolero`;
      modInfo.desc = `Zona de cocción única dimensionada a parrilla de ${pCm} cm (${nFlamas}): 2 cajones medianos superiores para cubiertos + 1 gaveta cacerolera grande abajo (45 kg) con Gola a 45°.`;

      const gap = 0.010;
      const hGrande = usableH * 0.44;
      const hMed = (usableH - hGrande - 4 * gap) / 2;
      const drawers = [
        { y: gap + hGrande / 2, h: hGrande, accent: false },
        { y: 2 * gap + hGrande + hMed / 2, h: hMed, accent: true },
        { y: 3 * gap + hGrande + hMed + hMed / 2, h: hMed, accent: true }
      ];
      drawers.forEach((d, idx) => {
        addCadBox(innerW, d.h, bayD - 0.04, 0, d.y, 0.015, {
          accent: d.accent,
          parent: group,
          explode: [0, 0, 0.20 + idx * 0.06],
          moduleInfo: modInfo
        });
        addCadBox(innerW - 0.006, 0.008, 0.012, 0, d.y + d.h / 2 - 0.004, bayD / 2 + 0.002, {
          accent: true,
          parent: group,
          explode: [0, 0, 0.20 + idx * 0.06],
          moduleInfo: modInfo
        });
      });

      const pW = Math.min(bayW + 0.12, pCm / 100);
      addCadBox(pW, 0.024, 0.50, 0, bayH + 0.052, 0.02, {
        accent: true,
        parent: group,
        explode: [0, 0.24, 0],
        moduleInfo: modInfo
      });
    } else if (type === "parrilla_horno") {
      modInfo.title = `🔥 Bajo Parrilla + Horno Empotrado (Sin Base)`;
      modInfo.desc = `Zona de cocción única: parrilla superior empotrada en cubierta + horno de 60 cm montado directamente en el gabinete bajo.`;
      addCadBox(innerW - 0.02, usableH * 0.78, 0.03, 0, usableH * 0.54, bayD / 2 + 0.005, {
        glass: true,
        accent: true,
        parent: group,
        explode: [0, 0, 0.24],
        moduleInfo: modInfo
      });
      addCadBox(innerW, usableH * 0.16, bayD - 0.04, 0, usableH * 0.09, 0.015, {
        accent: true,
        parent: group,
        explode: [0, 0, 0.18],
        moduleInfo: modInfo
      });
      addCadBox(Math.min(0.75, bayW - 0.04), 0.024, 0.50, 0, bayH + 0.052, 0.02, {
        accent: true,
        parent: group,
        explode: [0, 0.24, 0],
        moduleInfo: modInfo
      });
    } else if (type === "cajones_cocina") {
      modInfo.title = count === 3
        ? "2 Cajones Medianos (Cubiertos) + 1 Cacerolero Grande"
        : count === 2
        ? "2 Gavetas Caceroleras Profundas (45 kg)"
        : `${count} Cajones Organizadores`;
      modInfo.desc = `${modInfo.title} con correderas cierre suave, manguete superior de 5.5 cm y jaladera Gola con corte a 45°.${extraNote}`;
      const gap = 0.010;
      if (count === 3) {
        const hGrande = usableH * 0.44;
        const hMed = (usableH - hGrande - 4 * gap) / 2;
        const ys = [gap + hGrande / 2, 2 * gap + hGrande + hMed / 2, 3 * gap + hGrande + hMed + hMed / 2];
        const hs = [hGrande, hMed, hMed];
        ys.forEach((dy, idx) => {
          addCadBox(innerW, hs[idx], bayD - 0.04, 0, dy, 0.015, {
            accent: idx >= 1,
            parent: group,
            explode: [0, 0, 0.20 + idx * 0.06],
            moduleInfo: modInfo
          });
          addCadBox(innerW - 0.006, 0.008, 0.012, 0, dy + hs[idx] / 2 - 0.004, bayD / 2 + 0.002, {
            accent: true,
            parent: group,
            explode: [0, 0, 0.20 + idx * 0.06],
            moduleInfo: modInfo
          });
        });
      } else {
        const singleH = (usableH - (count + 1) * gap) / count;
        for (let c = 0; c < count; c++) {
          const dy = gap + c * (singleH + gap) + singleH / 2;
          addCadBox(innerW, singleH, bayD - 0.04, 0, dy, 0.015, {
            accent: c === count - 1,
            parent: group,
            explode: [0, 0, 0.20 + c * 0.05],
            moduleInfo: modInfo
          });
          addCadBox(innerW - 0.006, 0.008, 0.012, 0, dy + singleH / 2 - 0.004, bayD / 2 + 0.002, {
            accent: true,
            parent: group,
            explode: [0, 0, 0.20 + c * 0.05],
            moduleInfo: modInfo
          });
        }
      }
    } else if (type === "mixto_cajon_entrepano") {
      modInfo.title = `1 Cajón Cubiertero + ${doorSplitNote} (${count} Entrepaño${count > 1 ? "s" : ""})`;
      modInfo.desc = `1 cajón superior con Gola a 45° + gabinete inferior con ${count} entrepaño${count > 1 ? "s" : ""} y ${doorSplitNote}.${extraNote}`;
      const drawH = 0.16;
      addCadBox(innerW, drawH, bayD - 0.04, 0, usableH - drawH / 2, 0.015, {
        accent: true,
        parent: group,
        explode: [0, 0, 0.24],
        moduleInfo: modInfo
      });
      const lowH = usableH - drawH - 0.015;
      for (let s = 1; s <= count; s++) {
        addCadBox(innerW, 0.016, bayD - 0.05, 0, (lowH / (count + 1)) * s, -0.01, {
          parent: group,
          explode: [0, 0, 0.06],
          moduleInfo: modInfo
        });
      }
      addBayDoorLocal(bayW, lowH + 0.04, bayD, door, group, modInfo, { explodeZ: 0.34 });
    } else if (type === "especiero") {
      modInfo.title = count === 2 ? `🗑️ Carro Extraíble Bote Doble Basura` : `🧂 Extraíble Especiero / Botellero (3 Niveles)`;
      modInfo.desc = `Herraje extraíble cierre suave con frente Gola corte 45° y manguete superior de 5.5 cm.${extraNote}`;
      addCadBox(bayW - 0.01, usableH - 0.008, 0.018, 0, usableH / 2, bayD / 2 + 0.012, {
        accent: true,
        parent: group,
        explode: [0, 0, 0.38],
        moduleInfo: modInfo
      });
      const step = usableH / (count + 0.5);
      for (let s = 0; s < count; s++) {
        addCadBox(innerW * 0.85, count === 2 ? 0.28 : 0.06, bayD - 0.08, 0, 0.14 + s * step, 0, {
          accent: true,
          parent: group,
          explode: [0, 0, 0.38],
          moduleInfo: modInfo
        });
      }
    } else {
      const doorTxt = door === "none" ? "Nicho Abierto" : `${doorSplitNote} (${getDoorLabel("cocina_bajo", door)})`;
      modInfo.title = `Gabinete c/ ${count} Entrepaño${count > 1 ? "s" : ""} (${door === "none" ? "Abierto" : doorSplitNote})`;
      modInfo.desc = `${count} entrepaño${count > 1 ? "s" : ""} interior${count > 1 ? "es" : ""} regulable${count > 1 ? "s" : ""} Sistema 32 + manguete 5.5 cm · ${doorTxt}.${extraNote}`;
      const step = usableH / (count + 1);
      for (let s = 1; s <= count; s++) {
        addCadBox(innerW, 0.016, bayD - 0.05, 0, s * step, -0.01, {
          parent: group,
          explode: [0, 0, 0.06],
          moduleInfo: modInfo
        });
      }
      addBayDoorLocal(bayW, bayH, bayD, door, group, modInfo, { explodeZ: 0.36 });
    }

    addModuleHitBox(bayW, bayH, bayD, 0, bayH / 2, 0, modInfo, group);
    registerModule(modInfo);
    return modInfo;
  }

  function buildKitchenUpperBay(opts) {
    const { cx, cyBase, cz, bayW, bayH, bayD, bayKey, zone, defaultCfg, isSecondTier = false } = opts;
    const group = new THREE.Group();
    group.position.set(cx, cyBase, cz);
    rootGroup.add(group);

    const custom = bayCustomizations[bayKey] || {};
    const type = custom.type || defaultCfg.type || "entrepanos_alacena";
    const count = Number(custom.count !== undefined ? custom.count : (defaultCfg.count || (isSecondTier ? 1 : 2)));
    const door = custom.door !== undefined ? custom.door : (type === "vitrina_led" ? "cristal" : (defaultCfg.door || "abatible"));

    const t = 0.016;
    addCadBox(t, bayH, bayD, -bayW / 2 + t / 2, bayH / 2, 0, { accent: isSecondTier, parent: group });
    addCadBox(t, bayH, bayD, bayW / 2 - t / 2, bayH / 2, 0, { accent: isSecondTier, parent: group });
    addCadBox(bayW - 2 * t, t, bayD, 0, t / 2, 0, { accent: isSecondTier, parent: group });
    addCadBox(bayW - 2 * t, t, bayD, 0, bayH - t / 2, 0, { accent: isSecondTier, parent: group });
    addCadBox(bayW - 2 * t, bayH, 0.01, 0, bayH / 2, -bayD / 2 + 0.005, { parent: group });

    const isVitrina = type === "vitrina_led" || door === "cristal";
    const modWCm = Math.round(bayW * 100);
    const fondoCm = Math.round(bayD * 100);
    const doorLeavesTxt = (door !== "none" && door !== "aventos" && bayW >= 0.58)
      ? `2 Hojas de ${Math.round(modWCm / 2)}cm`
      : getDoorLabel("cocina_alacena", door);

    const modInfo = {
      id: bayKey,
      zone: zone,
      title: isSecondTier
        ? `🏛️ 2° Piso Sobrealacena (${fondoCm}cm Fondo · ${doorLeavesTxt})`
        : (isVitrina ? `Vitrina 1° Piso (${fondoCm}cm Fondo · ${count} Repisas)` : `Alacena 1° Piso (${fondoCm}cm Fondo · ${count} Ent.)`),
      desc: isSecondTier
        ? `Sobrealacena volumétrica de 2° piso a techo con ${fondoCm} cm de fondo (+10 cm en voladizo frontal sobre la alacena de 32 cm) · ${doorLeavesTxt}.`
        : `Alacena flotada de 1° piso a ${fondoCm} cm de fondo ergonómico con ${count} entrepaño${count > 1 ? "s" : ""} Sistema 32 · ${doorLeavesTxt}.`,
      schemaKey: "cocina_alacena",
      configurable: true,
      type: type,
      count: count,
      door: door
    };

    const innerW = bayW - 2 * t - 0.006;
    const step = bayH / (count + 1);
    for (let s = 1; s <= count; s++) {
      addCadBox(innerW, 0.016, bayD - 0.04, 0, s * step, 0, {
        glass: isVitrina,
        accent: isVitrina || isSecondTier,
        parent: group,
        explode: [0, 0.12, 0.08],
        moduleInfo: modInfo
      });
    }
    if (type === "vitrina_led") {
      addCadBox(0.012, bayH - 0.06, 0.012, -bayW / 2 + 0.025, bayH / 2, bayD / 2 - 0.02, { accent: true, parent: group, moduleInfo: modInfo });
      addCadBox(0.012, bayH - 0.06, 0.012, bayW / 2 - 0.025, bayH / 2, bayD / 2 - 0.02, { accent: true, parent: group, moduleInfo: modInfo });
    }

    addBayDoorLocal(bayW, bayH, bayD, door, group, modInfo, { explodeZ: isSecondTier ? 0.44 : 0.36 });
    addModuleHitBox(bayW, bayH, bayD, 0, bayH / 2, 0, modInfo, group);
    registerModule(modInfo);
    return modInfo;
  }

  function buildKitchenTowerBay(opts) {
    const { cx, cz, towerW, H, D, zocloH = 0.10, defaultCfg } = opts;
    const group = new THREE.Group();
    group.position.set(cx, 0, cz);
    rootGroup.add(group);

    const bayKey = "cocina_torre";
    const custom = bayCustomizations[bayKey] || {};
    const type = custom.type || defaultCfg.type || "torre_alacena";
    const count = Number(custom.count !== undefined ? custom.count : (defaultCfg.count || (type === "torre_hornos" ? 2 : 5)));
    const door = custom.door !== undefined ? custom.door : (defaultCfg.door || "abatible_gola45");

    const t = 0.018;
    const zoclo = zocloH;
    const bodyH = H - zoclo;

    const modInfo = {
      id: bayKey,
      zone: "Torre Lateral Piso a Techo",
      title: "",
      desc: "",
      schemaKey: "cocina_torre",
      configurable: true,
      type: type,
      count: count,
      door: (type === "torre_alacena" || type === "torre_blum") ? door : "none"
    };

    if (type === "torre_refri") {
      modInfo.title = "Nicho Refrigerador + Alacena Alta";
      modInfo.desc = "Espacio libre ventilado para refrigerador (h = 1.82 m) con alacena superior de 2 hojas simétricas hasta techo.";
      addCadBox(t, H, D, -towerW / 2 + t / 2, H / 2, 0, { parent: group, moduleInfo: modInfo });
      addCadBox(t, H, D, towerW / 2 - t / 2, H / 2, 0, { parent: group, moduleInfo: modInfo });
      addCadBox(towerW, t, D, 0, H - t / 2, 0, { parent: group, moduleInfo: modInfo });
      const topCabH = Math.max(0.38, H - 1.84);
      addCadBox(towerW - 2 * t, topCabH, D, 0, H - topCabH / 2, 0, { accent: true, parent: group, explode: [0.18, 0.1, 0.2], moduleInfo: modInfo });
      addCadBox(towerW - 0.08, 1.76, D - 0.06, 0, 0.88, -0.01, { glass: true, parent: group, moduleInfo: modInfo });
    } else if (type === "torre_hornos") {
      const nGav = Math.max(2, Math.min(3, count));
      modInfo.title = `Torre de Hornos + ${nGav} Gavetas`;
      modInfo.desc = `Nichos ventilados para horno (60 cm) y microondas empotrado + ${nGav} gavetas caceroleras inferiores sobre patas niveladoras de ${Math.round(zoclo * 100)} cm c/ tapeta aluminio.`;
      drawLevelerLegsAndToekick(towerW, zoclo, D, group, modInfo);
      addCadBox(t, bodyH, D, -towerW / 2 + t / 2, zoclo + bodyH / 2, 0, { parent: group });
      addCadBox(t, bodyH, D, towerW / 2 - t / 2, zoclo + bodyH / 2, 0, { parent: group });
      addCadBox(towerW, t, D, 0, H - t / 2, 0, { parent: group });
      const gH = (0.68 - (nGav + 1) * 0.012) / nGav;
      for (let g = 0; g < nGav; g++) {
        const gy = zoclo + 0.012 + g * (gH + 0.012) + gH / 2;
        addCadBox(towerW - 2 * t - 0.01, gH, D - 0.04, 0, gy, 0.015, {
          accent: true,
          parent: group,
          explode: [0.15, 0, 0.22 + g * 0.05],
          moduleInfo: modInfo
        });
      }
      addCadBox(towerW - 0.08, 0.56, 0.04, 0, zoclo + 1.00, D / 2 - 0.01, { glass: true, accent: true, parent: group, explode: [0.15, 0, 0.20], moduleInfo: modInfo });
      addCadBox(towerW - 0.08, 0.36, 0.04, 0, zoclo + 1.50, D / 2 - 0.01, { glass: true, accent: true, parent: group, explode: [0.15, 0, 0.20], moduleInfo: modInfo });
      const topH = Math.max(0.32, H - (zoclo + 1.74));
      addCadBox(towerW - 2 * t, topH, D, 0, H - topH / 2, 0, { parent: group, explode: [0.15, 0.1, 0.20], moduleInfo: modInfo });
    } else if (type === "torre_blum") {
      modInfo.title = `Torre Blum Space Tower (${count} Gavetas)`;
      modInfo.desc = `Despensa vertical piso a techo con ${count} gavetas interiores extracción total Blum y puertas dobles simétricas · ${getDoorLabel("cocina_torre", door)}.`;
      drawLevelerLegsAndToekick(towerW, zoclo, D, group, modInfo);
      addCadBox(t, bodyH, D, -towerW / 2 + t / 2, zoclo + bodyH / 2, 0, { parent: group });
      addCadBox(t, bodyH, D, towerW / 2 - t / 2, zoclo + bodyH / 2, 0, { parent: group });
      addCadBox(towerW, t, D, 0, H - t / 2, 0, { parent: group });
      const step = (bodyH - 0.30) / count;
      for (let g = 0; g < count; g++) {
        addCadBox(towerW - 0.08, 0.14, D - 0.08, 0, zoclo + 0.14 + g * step, 0.01, {
          accent: true,
          parent: group,
          explode: [0.18, 0, 0.28 + g * 0.03],
          moduleInfo: modInfo
        });
      }
      if (door !== "none") {
        const doorGrp = new THREE.Group();
        doorGrp.position.set(0, zoclo, 0);
        group.add(doorGrp);
        addBayDoorLocal(towerW, bodyH, D, door, doorGrp, modInfo, { explodeZ: 0.45 });
      }
    } else {
      modInfo.title = `Torre Alacena (${count} Entrepaños)`;
      modInfo.desc = `Despensa vertical piso a techo con ${count} entrepaños regulables Sistema 32 y puertas dobles simétricas · ${getDoorLabel("cocina_torre", door)}.`;
      drawLevelerLegsAndToekick(towerW, zoclo, D, group, modInfo);
      addCadBox(t, bodyH, D, -towerW / 2 + t / 2, zoclo + bodyH / 2, 0, { parent: group });
      addCadBox(t, bodyH, D, towerW / 2 - t / 2, zoclo + bodyH / 2, 0, { parent: group });
      addCadBox(towerW, t, D, 0, H - t / 2, 0, { parent: group });
      const step = bodyH / (count + 1);
      for (let s = 1; s <= count; s++) {
        addCadBox(towerW - 2 * t - 0.01, 0.018, D - 0.05, 0, zoclo + s * step, 0, {
          parent: group,
          explode: [0.15, 0, 0.08],
          moduleInfo: modInfo
        });
      }
      if (door !== "none") {
        const doorGrp = new THREE.Group();
        doorGrp.position.set(0, zoclo, 0);
        group.add(doorGrp);
        addBayDoorLocal(towerW, bodyH, D, door, doorGrp, modInfo, { explodeZ: 0.45 });
      }
    }

    addModuleHitBox(towerW, H, D, 0, H / 2, 0, modInfo, group);
    registerModule(modInfo);
    return modInfo;
  }

  // -------------------------------------------------------------
  // 3. COCINA INTEGRAL (91CM MELAMINA + SOBREALACENA 32->42CM + UNICIDAD TARJA/PARRILLA)
  // -------------------------------------------------------------
  function buildCocinaCAD(p) {
    const totalW = Math.min(Math.max(Number(p.muroA_L || p.largo || 3.6), 2.0), 6.2);
    const H = Number(p.alto || 2.4);
    const sub = p.subtipo || "COCINA_L_PENINSULA";
    const extras = p.extras || [];

    const towerW = 0.72;
    const bajosL = Math.max(1.4, totalW - towerW - 0.02);
    const nMod = Math.max(2, Math.min(6, Math.round(bajosL / 0.75)));
    const modW = bajosL / nMod;
    const zBack = -0.95;
    const D_base = 0.60;

    const D_upper1 = 0.32;
    const D_upper2 = 0.42;
    const zWallBack = zBack - D_base / 2;
    const zUpper1 = zWallBack + D_upper1 / 2;
    const zUpper2 = zWallBack + D_upper2 / 2;

    const zoclo = extras.includes("zoclo_12cm") ? 0.12 : 0.10;
    const baseH = 0.81;
    const upperY = 1.52;
    const totalUpperH = Math.max(0.58, H - upperY);
    const useDoubleUpper = totalUpperH > 0.80 || extras.includes("sobrealacena_42cm");
    const hUpper1 = useDoubleUpper ? Math.min(0.64, Math.max(0.48, totalUpperH * 0.62)) : totalUpperH;
    const hUpper2 = useDoubleUpper ? Math.max(0.24, totalUpperH - hUpper1) : 0;
    const yUpper2 = upperY + hUpper1;

    const startX = -totalW / 2;
    const bajosCenterX = startX + bajosL / 2;

    const hasIsland = sub === "COCINA_ISLA" || extras.includes("isla_central");
    const hasPeninsula = (p.muroB_activo !== undefined ? Boolean(p.muroB_activo) : (sub === "COCINA_L_PENINSULA")) && !extras.includes("isla_central");
    const isCocinaU = (p.muroC_activo !== undefined ? Boolean(p.muroC_activo) : (sub === "COCINA_U")) && !hasIsland;

    const leftCornerSlot = (hasPeninsula || isCocinaU) ? 0 : -1;
    const rightCornerSlot = (isCocinaU && nMod >= 3) ? nMod - 1 : -1;

    const hasLavavajillas = extras.includes("lavavajillas");
    const freeMainSlots = [];
    for (let i = 0; i < nMod; i++) {
      if (i !== leftCornerSlot && i !== rightCornerSlot) freeMainSlots.push(i);
    }
    const lavSlot = hasLavavajillas && freeMainSlots.length >= 3 ? freeMainSlots[2] : -1;

    const eligibleBaseIds = [];
    freeMainSlots.forEach((slotIdx) => {
      if (slotIdx !== lavSlot) eligibleBaseIds.push(`cocina_bajo_${slotIdx}`);
    });
    if (hasIsland) {
      eligibleBaseIds.push("cocina_isla_0", "cocina_isla_1");
    } else if (hasPeninsula) {
      const penL = Math.max(1.2, Math.min(Number(p.muroB_L || 2.1), 3.5));
      const nPenMod = Math.max(2, Math.round(penL / 0.75));
      for (let pm = 0; pm < nPenMod; pm++) eligibleBaseIds.push(`cocina_peninsula_${pm}`);
    } else if (isCocinaU) {
      const leftWingL = Math.max(1.2, Math.min(Number(p.muroB_L || 2.1), 3.5));
      const rightWingL = Math.max(1.2, Math.min(Number(p.muroC_L || 2.1), 3.5));
      const nL = Math.max(2, Math.round(leftWingL / 0.75));
      const nR = Math.max(2, Math.round(rightWingL / 0.75));
      for (let wm = 0; wm < nL; wm++) eligibleBaseIds.push(`cocina_u_izq_${wm}`);
      for (let wm = 0; wm < nR; wm++) eligibleBaseIds.push(`cocina_u_der_${wm}`);
    }

    if (!kitchenCookBayId || !eligibleBaseIds.includes(kitchenCookBayId)) {
      kitchenCookBayId = eligibleBaseIds[0] || "cocina_bajo_0";
    }
    if (!kitchenSinkBayId || !eligibleBaseIds.includes(kitchenSinkBayId) || kitchenSinkBayId === kitchenCookBayId) {
      kitchenSinkBayId = eligibleBaseIds.find((id) => id !== kitchenCookBayId) || eligibleBaseIds[0] || "cocina_bajo_1";
    }

    for (let i = 0; i < nMod; i++) {
      const mx = startX + modW / 2 + i * modW;
      const bayKey = `cocina_bajo_${i}`;
      const custom = bayCustomizations[bayKey] || {};
      const isCookHere = bayKey === kitchenCookBayId;
      const isSinkHere = bayKey === kitchenSinkBayId;
      const isEstufaPiso = isCookHere && custom.type === "estufa_piso";

      if (!isEstufaPiso) {
        const legGroup = new THREE.Group();
        legGroup.position.set(mx, 0, zBack);
        rootGroup.add(legGroup);
        drawLevelerLegsAndToekick(modW, zoclo, D_base, legGroup, null);

        addCadBox(modW + 0.004, 0.04, D_base + 0.04, mx, zoclo + baseH + 0.02, zBack + 0.02, {
          accent: true,
          explode: [0, 0.22, 0]
        });
      }

      if (i === leftCornerSlot || i === rightCornerSlot) {
        const isL = i === leftCornerSlot;
        buildKitchenCornerBay({
          cx: mx,
          cyBase: zoclo,
          cz: zBack,
          bayW: modW - 0.006,
          bayH: baseH,
          bayD: D_base,
          bayKey: isL ? "cocina_esquinero_izq" : "cocina_esquinero_der",
          zone: `Esquina ${isL ? "Izquierda" : "Derecha"} (Colindancia ${isCocinaU ? "U" : "L"})`,
          defaultType: extras.includes("esquinero_lemans") ? "esquinero_lemans" : "esquinero_entrepanos"
        });
      } else if (i === lavSlot) {
        const lavInfo = {
          id: "cocina_lavavajillas",
          zone: `Muro A · Bajo ${i + 1} (Electrodoméstico)`,
          title: "🫧 Nicho Lavavajillas 60 cm",
          desc: "Módulo preparado con tomas hidráulica/desagüe y frente panelable integrado.",
          schemaKey: "fixed",
          configurable: false,
          type: "lavavajillas",
          count: 1,
          door: "abatible"
        };
        const gLav = new THREE.Group();
        gLav.position.set(mx, zoclo, zBack);
        rootGroup.add(gLav);
        addCadBox(modW - 0.008, baseH, D_base, 0, baseH / 2, 0, { accent: true, parent: gLav, explode: [0, 0, 0.22], moduleInfo: lavInfo });
        addCadBox(modW * 0.68, 0.028, 0.028, 0, baseH - 0.06, D_base / 2 + 0.02, { accent: true, parent: gLav, explode: [0, 0, 0.28], moduleInfo: lavInfo });
        addModuleHitBox(modW, baseH, D_base, 0, baseH / 2, 0, lavInfo, gLav);
        registerModule(lavInfo);
      } else {
        const defaultCfg = isCookHere
          ? { type: "parrilla_cajones", count: p.gama === "boutique_spgg" ? 90 : 75, door: "none" }
          : isSinkHere
          ? { type: "tarja_puertas_botes", count: 2, door: "abatible_gola45" }
          : (extras.includes("bote_doble") && i === nMod - 1)
          ? { type: "especiero", count: 2, door: "none" }
          : { type: "entrepanos_cocina", count: 2, door: "abatible_gola45" };

        buildKitchenBaseBay({
          cx: mx,
          cyBase: zoclo,
          cz: zBack,
          rotY: 0,
          bayW: modW - 0.006,
          bayH: baseH,
          bayD: D_base,
          zocloH: zoclo,
          bayKey: bayKey,
          zone: `Muro A · Bajo ${i + 1}${isCookHere ? " (Zona Cocción)" : isSinkHere ? " (Zona Tarja)" : ""}`,
          defaultCfg: defaultCfg,
          extraNote: " Puedes mover aquí la Tarja o la Parrilla sin que se dupliquen."
        });
      }

      if (isCookHere) {
        const campInfo = {
          id: "cocina_campana",
          zone: `Muro A · Superior ${i + 1} (Sobre Cocción)`,
          title: "🌀 Campana Extractora (Sigue a la Parrilla)",
          desc: "Campana extractora/purificadora de acero inox que acompaña automáticamente la posición de la parrilla.",
          schemaKey: "fixed",
          configurable: false,
          type: "campana",
          count: 1,
          door: "none"
        };
        const gCamp = new THREE.Group();
        gCamp.position.set(mx, upperY, zBack);
        rootGroup.add(gCamp);
        const campDuctH = useDoubleUpper ? Math.max(0.28, hUpper1 - 0.14) : Math.max(0.38, totalUpperH - 0.16);
        addCadBox(Math.min(0.84, modW - 0.04), 0.12, 0.48, 0, 0.10, -0.04, { accent: true, parent: gCamp, explode: [0, 0.14, 0], moduleInfo: campInfo });
        addCadBox(0.28, campDuctH, 0.28, 0, 0.16 + campDuctH / 2, -0.14, { accent: true, parent: gCamp, moduleInfo: campInfo });
        addModuleHitBox(modW, hUpper1, 0.48, 0, hUpper1 / 2, -0.04, campInfo, gCamp);
        registerModule(campInfo);
      } else {
        buildKitchenUpperBay({
          cx: mx,
          cyBase: upperY,
          cz: zUpper1,
          bayW: modW - 0.006,
          bayH: hUpper1,
          bayD: D_upper1,
          bayKey: `cocina_alacena_${i}`,
          zone: `1° Piso Alacena ${i + 1} (32cm Fondo)`,
          isSecondTier: false,
          defaultCfg: {
            type: "entrepanos_alacena",
            count: 2,
            door: p.gama === "boutique_spgg" ? "aventos" : "abatible"
          }
        });
      }

      if (useDoubleUpper && hUpper2 >= 0.20) {
        buildKitchenUpperBay({
          cx: mx,
          cyBase: yUpper2,
          cz: zUpper2,
          bayW: modW - 0.006,
          bayH: hUpper2,
          bayD: D_upper2,
          bayKey: `cocina_sobrealacena_${i}`,
          zone: `2° Piso Sobrealacena ${i + 1} (42cm Fondo · Voladizo +10cm)`,
          isSecondTier: true,
          defaultCfg: {
            type: "entrepanos_alacena",
            count: 1,
            door: "abatible"
          }
        });
      }
    }

    const towerX = startX + bajosL + 0.02 + towerW / 2;
    let defaultTowerType = "torre_alacena";
    if (extras.includes("alacena_torre_blum")) defaultTowerType = "torre_blum";
    else if (extras.includes("torre_hornos")) defaultTowerType = "torre_hornos";
    else if (sub === "COCINA_LINEAL") defaultTowerType = "torre_refri";

    buildKitchenTowerBay({
      cx: towerX,
      cz: zBack,
      towerW: towerW,
      H: H,
      D: D_base + 0.02,
      zocloH: zoclo,
      defaultCfg: { type: defaultTowerType, count: defaultTowerType === "torre_hornos" ? 2 : 5, door: "abatible_gola45" }
    });

    if (hasIsland) {
      const islandW = Math.min(2.2, Math.max(1.5, bajosL * 0.68));
      const islandD = 0.88;
      const islandX = bajosCenterX;
      const islandZ = 0.68;
      const nIslaMod = 2;
      const iModW = islandW / nIslaMod;

      addCadBox(islandW + 0.08, 0.04, islandD + 0.08, islandX, zoclo + baseH + 0.02, islandZ, { accent: true, explode: [0, 0.24, 0.25] });
      addCadBox(0.04, zoclo + baseH + 0.04, islandD + 0.08, islandX - islandW / 2 - 0.02, (zoclo + baseH + 0.04) / 2, islandZ, { accent: true, explode: [-0.14, 0, 0.25] });

      for (let im = 0; im < nIslaMod; im++) {
        const imx = islandX - islandW / 2 + iModW / 2 + im * iModW;
        const bKey = `cocina_isla_${im}`;
        const legG = new THREE.Group();
        legG.position.set(imx, 0, islandZ - 0.10);
        rootGroup.add(legG);
        drawLevelerLegsAndToekick(iModW, zoclo, 0.60, legG, null);

        const isCookHere = bKey === kitchenCookBayId;
        const isSinkHere = bKey === kitchenSinkBayId;

        buildKitchenBaseBay({
          cx: imx,
          cyBase: zoclo,
          cz: islandZ - 0.10,
          rotY: Math.PI,
          bayW: iModW - 0.008,
          bayH: baseH,
          bayD: 0.60,
          zocloH: zoclo,
          bayKey: bKey,
          zone: `Isla Central · Módulo ${im + 1}${isCookHere ? " (Zona Cocción)" : isSinkHere ? " (Zona Tarja)" : ""}`,
          defaultCfg: isCookHere
            ? { type: "parrilla_cajones", count: 75, door: "none" }
            : isSinkHere
            ? { type: "tarja_puertas_botes", count: 2, door: "abatible_gola45" }
            : im === 0
            ? { type: "cajones_cocina", count: 3, door: "none" }
            : { type: "entrepanos_cocina", count: 2, door: "abatible_gola45" }
        });
      }

      const nSlats = Math.round(islandW / 0.09);
      for (let s = 0; s < nSlats; s++) {
        const sx = islandX - islandW / 2 + 0.045 + s * 0.09;
        addCadBox(0.024, baseH + zoclo - 0.04, 0.016, sx, (baseH + zoclo) / 2, islandZ + islandD / 2 - 0.06, { accent: true });
      }
    } else if (hasPeninsula) {
      const penL = Math.max(1.2, Math.min(Number(p.muroB_L || 2.1), 3.5));
      const penZStart = zBack + D_base / 2;
      const penX = startX + D_base / 2;
      const nPenMod = Math.max(2, Math.round(penL / 0.75));
      const penModL = penL / nPenMod;
      addCadBox(D_base + 0.16, 0.04, penL + 0.04, penX + 0.06, zoclo + baseH + 0.02, penZStart + penL / 2, { accent: true, explode: [-0.15, 0.2, 0.15] });
      addCadBox(D_base - 0.04, zoclo, penL, penX, zoclo / 2, penZStart + penL / 2, { accent: true });
      for (let pm = 0; pm < nPenMod; pm++) {
        const pmz = penZStart + penModL * (pm + 0.5);
        const bKey = `cocina_peninsula_${pm}`;
        const isCookHere = bKey === kitchenCookBayId;
        const isSinkHere = bKey === kitchenSinkBayId;
        buildKitchenBaseBay({
          cx: penX,
          cyBase: zoclo,
          cz: pmz,
          rotY: Math.PI / 2,
          bayW: penModL - 0.008,
          bayH: baseH,
          bayD: D_base,
          zocloH: zoclo,
          bayKey: bKey,
          zone: `Muro B · Escuadra Módulo ${pm + 1}${isCookHere ? " (Zona Cocción)" : isSinkHere ? " (Zona Tarja)" : ""}`,
          defaultCfg: isCookHere
            ? { type: "parrilla_cajones", count: 75, door: "none" }
            : isSinkHere
            ? { type: "tarja_puertas_botes", count: 2, door: "abatible_gola45" }
            : pm === 0
            ? { type: "entrepanos_cocina", count: 2, door: "abatible_gola45" }
            : { type: "cajones_cocina", count: 3, door: "none" }
        });
      }
    } else if (isCocinaU) {
      const leftWingL = Math.max(1.2, Math.min(Number(p.muroB_L || 2.1), 3.5));
      const rightWingL = Math.max(1.2, Math.min(Number(p.muroC_L || 2.1), 3.5));
      const wingZStart = zBack + D_base / 2;
      const leftX = startX + D_base / 2;
      const rightX = startX + bajosL - D_base / 2;
      [
        { x: leftX, rotY: Math.PI / 2, prefix: "cocina_u_izq", label: "Muro B · Ala Izq.", wingL: leftWingL },
        { x: rightX, rotY: -Math.PI / 2, prefix: "cocina_u_der", label: "Muro C · Ala Der.", wingL: rightWingL }
      ].forEach((side) => {
        const wL = side.wingL;
        const nSideMod = Math.max(2, Math.round(wL / 0.75));
        const sModL = wL / nSideMod;
        addCadBox(D_base + 0.04, 0.04, wL + 0.04, side.x, zoclo + baseH + 0.02, wingZStart + wL / 2, { accent: true });
        addCadBox(D_base - 0.04, zoclo, wL, side.x, zoclo / 2, wingZStart + wL / 2, { accent: true });
        for (let wm = 0; wm < nSideMod; wm++) {
          const wmz = wingZStart + sModL * (wm + 0.5);
          const bKey = `${side.prefix}_${wm}`;
          const isCookHere = bKey === kitchenCookBayId;
          const isSinkHere = bKey === kitchenSinkBayId;
          buildKitchenBaseBay({
            cx: side.x,
            cyBase: zoclo,
            cz: wmz,
            rotY: side.rotY,
            bayW: sModL - 0.008,
            bayH: baseH,
            bayD: D_base,
            zocloH: zoclo,
            bayKey: bKey,
            zone: `${side.label} · Módulo ${wm + 1}${isCookHere ? " (Zona Cocción)" : isSinkHere ? " (Zona Tarja)" : ""}`,
            defaultCfg: isCookHere
              ? { type: "parrilla_cajones", count: 75, door: "none" }
              : isSinkHere
              ? { type: "tarja_puertas_botes", count: 2, door: "abatible_gola45" }
              : wm === 0
              ? { type: "entrepanos_cocina", count: 2, door: "abatible_gola45" }
              : { type: "cajones_cocina", count: 3, door: "none" }
          });
        }
      });
    }
  }

  // -------------------------------------------------------------
  // 4. VANITY / MUEBLE DE BAÑO RH (CONFIGURABLE POR COLUMNA)
  // -------------------------------------------------------------
  function buildVanityCAD(p) {
    const L = Math.min(Number(p.largo || 1.2), 2.8);
    const H = Number(p.alto || 0.65);
    const D = Number(p.fondo || 0.5);
    const sub = p.subtipo || "VANITY_1_SENO";
    const yBottom = 0.28;
    const cols = sub === "VANITY_DOBLE" || L >= 1.5 ? 2 : 1;
    const colW = L / cols;
    const t = 0.018;

    // Casco externo hidrófugo RH
    addCadBox(L, t, D, 0, yBottom + t / 2, -0.3);
    addCadBox(L, t, D, 0, yBottom + H - t / 2, -0.3);
    addCadBox(L, H, 0.012, 0, yBottom + H / 2, -0.3 - D / 2 + 0.006);
    for (let i = 0; i <= cols; i++) {
      addCadBox(t, H, D, -L / 2 + t / 2 + i * (colW - t / cols), yBottom + H / 2, -0.3);
    }

    for (let c = 0; c < cols; c++) {
      const gx = cols === 1 ? 0 : -L / 4 + c * (L / 2);
      const bayKey = `vanity_col_${c}`;
      const custom = bayCustomizations[bayKey] || {};
      const defType = sub === "VANITY_REPISA" ? "entrepanos_bano" : "cajones_bano";
      const type = custom.type || defType;
      const count = Number(custom.count !== undefined ? custom.count : (type === "cajones_bano" ? 2 : 1));
      const door = custom.door !== undefined ? custom.door : (sub === "VANITY_REPISA" ? "none" : "abatible");

      const group = new THREE.Group();
      group.position.set(gx, yBottom + t, -0.3);
      rootGroup.add(group);

      const innerW = colW - 2 * t;
      const innerH = H - 2 * t;

      const modInfo = {
        id: bayKey,
        zone: cols > 1 ? `Módulo Lavabo ${c === 0 ? "Izquierdo" : "Derecho"}` : "Módulo Vanity RH",
        title: type === "cajones_bano"
          ? `Cajonera RH (${count} Gaveta${count > 1 ? "s" : ""} c/ Saque U)`
          : `Gabinete Toallero (${count} Entrepaño${count > 1 ? "s" : ""})`,
        desc: type === "cajones_bano"
          ? `MDF hidrófugo RH antihumedad con ${count} gaveta${count > 1 ? "s" : ""} cierre suave y saque en 'U' para céspol.`
          : `MDF hidrófugo RH con ${count} entrepaño${count > 1 ? "s" : ""} · ${getDoorLabel("vanity_col", door)}.`,
        schemaKey: "vanity_col",
        configurable: true,
        type: type,
        count: count,
        door: type === "entrepanos_bano" ? door : "none"
      };

      if (type === "cajones_bano") {
        const gap = 0.014;
        const dH = (innerH - (count + 1) * gap) / count;
        for (let r = 0; r < count; r++) {
          const dy = gap + r * (dH + gap) + dH / 2;
          addCadBox(innerW, dH, D - 0.04, 0, dy, 0.012, {
            accent: r === count - 1,
            parent: group,
            explode: [0, 0, 0.22 + r * 0.06],
            moduleInfo: modInfo
          });
        }
      } else {
        const step = innerH / (count + 1);
        for (let s = 1; s <= count; s++) {
          addCadBox(innerW, 0.018, D - 0.05, 0, s * step, 0, { parent: group, moduleInfo: modInfo });
        }
        addBayDoorLocal(colW - 0.01, innerH, D, door, group, modInfo, { explodeZ: 0.34 });
      }

      // Ovalín cerámico sobre cubierta
      addCadBox(0.46, 0.12, 0.34, gx, yBottom + H + 0.10, -0.3, { accent: true, explode: [0, 0.22, 0] });

      addModuleHitBox(colW, H, D, 0, innerH / 2, 0, modInfo, group);
      registerModule(modInfo);
    }

    // Cubierta piedra
    addCadBox(L + 0.04, 0.04, D + 0.03, 0, yBottom + H + 0.02, -0.29, { accent: true, explode: [0, 0.14, 0] });

    // Espejo LED (fijo)
    const espejoInfo = {
      id: "vanity_espejo",
      zone: "Zona Superior",
      title: "🪞 Espejo Touch LED Antivaho (Fijo)",
      desc: "Espejo de 4mm con halo LED cálido 3000K perimetral, botón touch capacitivo y película antivaho.",
      schemaKey: "fixed",
      configurable: false,
      type: "espejo",
      count: 1,
      door: "none"
    };
    addCadBox(L * 0.88, 0.9, 0.02, 0, yBottom + H + 0.72, -0.52, { glass: true, accent: true, moduleInfo: espejoInfo });
    registerModule(espejoInfo);
  }

  // -------------------------------------------------------------
  // 5. MUEBLE TV / PERCHERO MUDROOM & ALMACENAMIENTO (100% MELAMINA SISTEMA 32)
  // -------------------------------------------------------------
  function buildTvRoomCAD(p) {
    const L = Math.min(Number(p.largo || 2.6), 5.5);
    const H = Number(p.alto || 2.4);
    const D = Number(p.fondo || 0.42);
    const sub = p.subtipo || "TV_LAMBRIN";

    if (sub === "PERCHERO_MUDROOM" || sub === "CELOSIA") {
      const t = 0.018;
      const towerW = Math.min(0.65, Math.max(0.50, L * 0.30));
      const benchW = Math.max(0.85, L - towerW);
      const startX = -L / 2;
      const benchCX = startX + benchW / 2;
      const towerCX = startX + benchW + towerW / 2;
      const zCenter = -0.20;

      const bancaKey = "perchero_banca_0";
      const customBanca = bayCustomizations[bancaKey] || {};
      const bType = customBanca.type || "banca_charolas_perchero";
      const bCount = Number(customBanca.count !== undefined ? customBanca.count : 2);

      const gBanca = new THREE.Group();
      gBanca.position.set(benchCX, 0.06, zCenter);
      rootGroup.add(gBanca);

      const bancaH = 0.45;
      const maleteroH = 0.40;
      const totalH = H - 0.06;

      const bancaInfo = {
        id: bancaKey,
        zone: "Zona Perchero & Calzado (Mudroom)",
        title: bType === "banca_gavetas_perchero"
          ? `🧥 Perchero + Banca c/ ${bCount} Gavetas Zapateras`
          : `🧥 Perchero + Banca Zapatera (${bCount} Niveles)`,
        desc: `Módulo recibidor en Melamina Sistema 32: banca reforzada a 45 cm de altura, respaldo con ganchos percheros dobles en acero negro y maletero superior.`,
        schemaKey: "perchero_banca",
        configurable: true,
        type: bType,
        count: bCount,
        door: "none"
      };

      addCadBox(t, totalH, D, -benchW / 2 + t / 2, totalH / 2, 0, { parent: gBanca });
      addCadBox(t, totalH, D, benchW / 2 - t / 2, totalH / 2, 0, { parent: gBanca });
      addCadBox(benchW - 2 * t, 0.018, D, 0, 0.009, 0, { parent: gBanca });
      addCadBox(benchW - 2 * t, 0.032, D + 0.02, 0, bancaH, 0.01, { accent: true, parent: gBanca, moduleInfo: bancaInfo });
      addCadBox(benchW - 2 * t, totalH, 0.018, 0, totalH / 2, -D / 2 + 0.01, { parent: gBanca, moduleInfo: bancaInfo });

      if (bType === "banca_gavetas_perchero") {
        const gW = (benchW - 2 * t - 0.02) / bCount;
        for (let g = 0; g < bCount; g++) {
          const gx = -(benchW - 2 * t) / 2 + gW / 2 + g * gW + 0.005;
          addCadBox(gW - 0.008, bancaH - 0.05, D - 0.04, gx, bancaH / 2, 0.015, {
            accent: true,
            parent: gBanca,
            explode: [0, 0, 0.24],
            moduleInfo: bancaInfo
          });
        }
      } else {
        for (let s = 1; s < bCount; s++) {
          addCadBox(benchW - 2 * t - 0.01, 0.018, D - 0.04, 0, (bancaH / bCount) * s, 0, { parent: gBanca, moduleInfo: bancaInfo });
        }
        addCadBox(0.018, bancaH - 0.03, D - 0.04, 0, bancaH / 2, 0, { parent: gBanca, moduleInfo: bancaInfo });
      }

      const nHooks = Math.max(3, Math.min(6, Math.round(benchW / 0.28)));
      for (let h = 0; h < nHooks; h++) {
        const hx = -benchW / 2 + 0.16 + h * ((benchW - 0.32) / Math.max(1, nHooks - 1));
        addCadBox(0.024, 0.09, 0.06, hx, 1.48, -D / 2 + 0.05, { accent: true, parent: gBanca, explode: [0, 0, 0.14], moduleInfo: bancaInfo });
      }

      addCadBox(benchW - 2 * t, 0.018, D, 0, totalH - maleteroH, 0, { accent: true, parent: gBanca, moduleInfo: bancaInfo });
      addCadBox(benchW - 2 * t, 0.018, D, 0, totalH - 0.009, 0, { parent: gBanca, moduleInfo: bancaInfo });
      addCadBox(0.018, maleteroH, D - 0.02, 0, totalH - maleteroH / 2, 0, { parent: gBanca, moduleInfo: bancaInfo });

      addModuleHitBox(benchW, totalH, D, 0, totalH / 2, 0, bancaInfo, gBanca);
      registerModule(bancaInfo);

      const tKey = "tv_torre";
      const customT = bayCustomizations[tKey] || {};
      const tType = customT.type || "cajones_tv_torre";
      const tCount = Number(customT.count !== undefined ? customT.count : 3);
      const tDoor = customT.door !== undefined ? customT.door : "abatible";

      const gTorre = new THREE.Group();
      gTorre.position.set(towerCX, 0.06, zCenter);
      rootGroup.add(gTorre);

      addCadBox(t, totalH, D, -towerW / 2 + t / 2, totalH / 2, 0, { parent: gTorre });
      addCadBox(t, totalH, D, towerW / 2 - t / 2, totalH / 2, 0, { parent: gTorre });
      addCadBox(towerW, t, D, 0, t / 2, 0, { parent: gTorre });
      addCadBox(towerW, t, D, 0, totalH - t / 2, 0, { parent: gTorre });

      const tInfo = {
        id: tKey,
        zone: "Columna Lateral Almacenamiento",
        title: tType === "cajones_tv_torre"
          ? `Columna (${tCount} Cajones + Entrepaños)`
          : `Columna Almacenamiento (${tCount} Entrepaños)`,
        desc: `Torre lateral Sistema 32 para guardado diario, mochilas, abrigos o calzado · ${getDoorLabel("tv_torre", tDoor)}.`,
        schemaKey: "tv_torre",
        configurable: true,
        type: tType,
        count: tCount,
        door: tDoor
      };

      if (tType === "cajones_tv_torre") {
        const dTotal = tCount * 0.20;
        const dH = (dTotal - (tCount + 1) * 0.012) / tCount;
        for (let r = 0; r < tCount; r++) {
          addCadBox(towerW - 0.04, dH, D - 0.04, 0, 0.02 + r * (dH + 0.012) + dH / 2, 0.01, {
            accent: true,
            parent: gTorre,
            explode: [0.16, 0, 0.18 + r * 0.04],
            moduleInfo: tInfo
          });
        }
        const remH = totalH - dTotal - 0.04;
        for (let s = 1; s <= 4; s++) {
          addCadBox(towerW - 0.04, 0.016, D - 0.04, 0, dTotal + (remH / 5) * s, 0, { parent: gTorre, moduleInfo: tInfo });
        }
      } else {
        const step = totalH / (tCount + 1);
        for (let s = 1; s <= tCount; s++) {
          addCadBox(towerW - 0.04, 0.016, D - 0.04, 0, s * step, 0, { parent: gTorre, moduleInfo: tInfo });
        }
      }

      addBayDoorLocal(towerW, totalH, D, tDoor, gTorre, tInfo, { explodeZ: 0.35 });
      addModuleHitBox(towerW, totalH, D, 0, totalH / 2, 0, tInfo, gTorre);
      registerModule(tInfo);
      return;
    }

    const lambrinInfo = {
      id: "tv_lambrin_panel",
      zone: "Muro Principal",
      title: "🪵 Panel Respaldo en Melamina + Bastidor Pasacables",
      desc: "Respaldo modular en tablero de melamina 16/18 mm con cámara trasera para ocultar cables HDMI y contactos.",
      schemaKey: "fixed",
      configurable: false,
      type: "lambrin",
      count: 1,
      door: "none"
    };
    addCadBox(L, H, 0.03, 0, H / 2, -0.45, { moduleInfo: lambrinInfo });
    for (let i = 0; i < 6; i++) {
      addCadBox(0.035, H - 0.04, 0.03, -L / 2 + 0.05 + i * 0.075, H / 2, -0.42, { accent: true, moduleInfo: lambrinInfo });
    }
    registerModule(lambrinInfo);

    function buildConsolaBays(totalConsolaW, yBottom, hBox, dBox, zBox, keyPrefix, zonePrefix) {
      const nBays = Math.max(2, Math.min(4, Math.round(totalConsolaW / 0.82)));
      const bayW = totalConsolaW / nBays;
      const t = 0.016;

      addCadBox(totalConsolaW, t, dBox, 0, yBottom + t / 2, zBox);
      addCadBox(totalConsolaW, t, dBox, 0, yBottom + hBox - t / 2, zBox, { accent: true });

      for (let b = 0; b < nBays; b++) {
        const cx = -totalConsolaW / 2 + bayW / 2 + b * bayW;
        const bayKey = `${keyPrefix}_${b}`;
        const custom = bayCustomizations[bayKey] || {};
        const type = custom.type || (b === Math.floor(nBays / 2) ? "entrepanos_tv" : "cajones_tv");
        const count = Number(custom.count !== undefined ? custom.count : 1);
        const door = custom.door !== undefined ? custom.door : "none";

        const group = new THREE.Group();
        group.position.set(cx, yBottom + t, zBox);
        rootGroup.add(group);

        const innerH = hBox - 2 * t;
        const innerW = bayW - 0.02;
        addCadBox(t, innerH, dBox, -bayW / 2 + t / 2, innerH / 2, 0, { parent: group });
        addCadBox(t, innerH, dBox, bayW / 2 - t / 2, innerH / 2, 0, { parent: group });

        const modInfo = {
          id: bayKey,
          zone: `${zonePrefix} · Módulo ${b + 1}`,
          title: type === "cajones_tv"
            ? `Cajón Push (${count} Nivel${count > 1 ? "es" : ""})`
            : `Compartimento Equipos (${count} Entrepaño${count > 1 ? "s" : ""})`,
          desc: type === "cajones_tv"
            ? `${count} cajón${count > 1 ? "es" : ""} con apertura push-to-open y corredera oculta cierre suave.`
            : `${count} entrepaño${count > 1 ? "s" : ""} con ventilación trasera pasacables · ${getDoorLabel("tv_consola", door)}.`,
          schemaKey: "tv_consola",
          configurable: true,
          type: type,
          count: count,
          door: type === "entrepanos_tv" ? door : "none"
        };

        if (type === "cajones_tv") {
          const gap = 0.012;
          const dH = (innerH - (count + 1) * gap) / count;
          for (let r = 0; r < count; r++) {
            const dy = gap + r * (dH + gap) + dH / 2;
            addCadBox(innerW, dH, dBox - 0.04, 0, dy, 0.012, {
              accent: true,
              parent: group,
              explode: [0, 0, 0.24 + r * 0.05],
              moduleInfo: modInfo
            });
          }
        } else {
          const step = innerH / (count + 1);
          for (let s = 1; s <= count; s++) {
            addCadBox(innerW, 0.016, dBox - 0.05, 0, s * step, 0, { parent: group, moduleInfo: modInfo });
          }
          addBayDoorLocal(bayW - 0.008, innerH, dBox, door, group, modInfo, { explodeZ: 0.30 });
        }

        addModuleHitBox(bayW, hBox, dBox, 0, innerH / 2, 0, modInfo, group);
        registerModule(modInfo);
      }
    }

    if (sub === "BAR_CAVA") {
      buildConsolaBays(L, 0.10, 0.81, 0.52, -0.18, "tv_bar", "Gabinete Bajo Bar");
      addCadBox(L + 0.04, 0.04, 0.56, 0, 0.93, -0.16, { accent: true });

      const cavaInfo = {
        id: "tv_cava_cristal",
        zone: "Almacenamiento Superior Bar",
        title: "🍷 Alacena Copero & Botellero Modular Sistema 32",
        desc: "Módulo superior en melamina con cuadrícula para botellas y vitrina para cristalería.",
        schemaKey: "fixed",
        configurable: false,
        type: "cava",
        count: 1,
        door: "cristal"
      };
      addCadBox(L * 0.4, 1.35, 0.36, L * 0.25, 1.60, -0.25, { glass: true, accent: true, moduleInfo: cavaInfo });
      const gridW = L * 0.45, gridH = 0.55, gridX = -L * 0.22, gridY = 1.85;
      addCadBox(gridW, gridH, 0.32, gridX, gridY, -0.28, { accent: true, moduleInfo: cavaInfo });
      for (let r = 1; r < 4; r++) {
        addCadBox(gridW, 0.015, 0.30, gridX, gridY - gridH / 2 + r * (gridH / 4), -0.28, { moduleInfo: cavaInfo });
      }
      for (let c = 1; c < 5; c++) {
        addCadBox(0.015, gridH, 0.30, gridX - gridW / 2 + c * (gridW / 5), gridY, -0.28, { moduleInfo: cavaInfo });
      }
      registerModule(cavaInfo);
    } else {
      const consW = sub === "TV_VITRINA" ? L - 0.56 : L * 0.92;
      buildConsolaBays(consW, 0.32, 0.36, 0.38, -0.25, "tv_consola", "Consola Flotante");

      const tvInfo = {
        id: "tv_pantalla",
        zone: "Centro de Entretenimiento",
        title: "📺 Pantalla TV (Referencia de Montaje)",
        desc: "Referencia visual para pantalla 55\"–75\" con canaleta interior oculta de cables.",
        schemaKey: "fixed",
        configurable: false,
        type: "tv",
        count: 1,
        door: "none"
      };
      addCadBox(Math.min(1.65, consW * 0.65), 0.92, 0.04, sub === "TV_VITRINA" ? -0.24 : 0.05, 1.34, -0.39, { accent: true, moduleInfo: tvInfo });
      registerModule(tvInfo);

      if (sub === "TV_VITRINA") {
        const bayKey = "tv_torre";
        const custom = bayCustomizations[bayKey] || {};
        const type = custom.type || "entrepanos_tv_torre";
        const count = Number(custom.count !== undefined ? custom.count : (type === "cajones_tv_torre" ? 3 : 5));
        const door = custom.door !== undefined ? custom.door : "cristal";

        const tW = 0.54, tD = 0.38, tH = H - 0.12;
        const gTorre = new THREE.Group();
        gTorre.position.set(L / 2 - tW / 2 - 0.02, 0.06, -0.26);
        rootGroup.add(gTorre);

        addCadBox(0.016, tH, tD, -tW / 2 + 0.008, tH / 2, 0, { parent: gTorre });
        addCadBox(0.016, tH, tD, tW / 2 - t / 2, tH / 2, 0, { parent: gTorre });
        addCadBox(tW, 0.016, tD, 0, 0.008, 0, { parent: gTorre });
        addCadBox(tW, 0.016, tD, 0, tH - 0.008, 0, { parent: gTorre });

        const modInfo = {
          id: bayKey,
          zone: "Torre Lateral Almacenamiento",
          title: type === "cajones_tv_torre"
            ? `Torre (${count} Cajones + Entrepaños)`
            : `Torre Almacenamiento (${count} Entrepaños)`,
          desc: `Torre lateral Sistema 32 con entrepaños regulables · ${getDoorLabel("tv_torre", door)}.`,
          schemaKey: "tv_torre",
          configurable: true,
          type: type,
          count: count,
          door: door
        };

        if (type === "cajones_tv_torre") {
          const dTotal = count * 0.20;
          const dH = (dTotal - (count + 1) * 0.012) / count;
          for (let r = 0; r < count; r++) {
            addCadBox(tW - 0.04, dH, tD - 0.04, 0, 0.02 + r * (dH + 0.012) + dH / 2, 0.01, {
              accent: true,
              parent: gTorre,
              explode: [0.18, 0, 0.15 + r * 0.04],
              moduleInfo: modInfo
            });
          }
          const remH = tH - dTotal - 0.04;
          for (let s = 1; s <= 4; s++) {
            addCadBox(tW - 0.04, 0.016, tD - 0.04, 0, dTotal + (remH / 5) * s, 0, { parent: gTorre, moduleInfo: modInfo });
          }
        } else {
          const step = tH / (count + 1);
          for (let s = 1; s <= count; s++) {
            addCadBox(tW - 0.04, 0.016, tD - 0.04, 0, s * step, 0, {
              glass: door === "cristal",
              accent: door === "cristal",
              parent: gTorre,
              moduleInfo: modInfo
            });
          }
        }

        addBayDoorLocal(tW, tH, tD, door, gTorre, modInfo, { explodeZ: 0.35 });
        addModuleHitBox(tW, tH, tD, 0, tH / 2, 0, modInfo, gTorre);
        registerModule(modInfo);
      }
    }
  }

  // -------------------------------------------------------------
  // RECONSTRUCCIÓN GENERAL 3D + 2D
  // -------------------------------------------------------------
  function rebuild3D(params) {
    const prevSub = stateRef ? stateRef.subtipo : null;
    const prevCat = stateRef ? stateRef.categoria : null;
    stateRef = params;
    refreshSceneTheme();

    if (prevCat !== params.categoria || prevSub !== params.subtipo) {
      bayCustomizations = {};
      kitchenCookBayId = null;
      kitchenSinkBayId = null;
      closeModulePopover();
    }
    clearFurniture();

    const builders = {
      CLOSET: buildClosetCAD,
      WALKIN: buildWalkinCAD,
      COCINA: buildCocinaCAD,
      BANIO: buildVanityCAD,
      TV_ROOM: buildTvRoomCAD
    };
    (builders[params.categoria] || buildClosetCAD)(params);
    applyExplosion(explosionPct);
    render2DElevation(params);

    if (prevCat !== params.categoria || prevSub !== params.subtipo) {
      setCameraPreset("iso");
    }

    if (onModulesUpdatedCallback) {
      onModulesUpdatedCallback(currentModulesCatalog);
    }
  }

  function applyExplosion(pct) {
    explosionPct = pct;
    const t = pct / 100;
    explodables.forEach((m) => {
      if (m.userData.basePos && m.userData.explodeVec) {
        m.position.copy(m.userData.basePos).addScaledVector(m.userData.explodeVec, t);
      }
    });
  }

  function setCameraPreset(preset) {
    if (!stateRef) return;
    const isWalkinU =
      stateRef.subtipo === "WALKIN_ISLA" ||
      stateRef.subtipo === "WALKIN_L" ||
      stateRef.subtipo === "WALKIN_CRISTAL" ||
      stateRef.subtipo === "WALKIN_LINEAL_DOBLE";
    const targetY = stateRef.categoria === "BANIO" ? 0.85 : stateRef.categoria === "PUERTAS" ? 1.1 : 1.15;
    const targetZ = isWalkinU ? 0.15 : 0;
    controls.target.set(0, targetY, targetZ);
    if (preset === "front") {
      camera.position.set(0, targetY + (isWalkinU ? 0.3 : 0), isWalkinU ? 5.6 : 4.6);
    } else if (preset === "top") {
      camera.position.set(0, 6.2, isWalkinU ? 0.4 : 0.8);
    } else {
      if (isWalkinU) {
        camera.position.set(4.0, 3.0, 4.8);
      } else {
        camera.position.set(3.2, 2.2, 4.2);
      }
    }
    controls.update();
  }

  // -------------------------------------------------------------
  // ALZADO 2D ACOTADO SVG (SINCRONIZADO CON MÓDULOS PERSONALIZADOS)
  // -------------------------------------------------------------
  function render2DElevation(p) {
    if (!svgWrap) return;
    const pal = palette();
    const Lcm = Math.round(Number(p.largo || 2.0) * 100);
    const Hcm = Math.round(Number(p.alto || 2.4) * 100);
    const Dcm = Math.round(Number(p.fondo || 0.6) * 100);

    const drawX = 130, drawY = 75, maxW = 660, maxH = 310;
    const scale = Math.min(maxW / Math.max(Lcm, 80), maxH / Math.max(Hcm, 60));
    const wPx = Lcm * scale;
    const hPx = Hcm * scale;
    const x0 = drawX + (maxW - wPx) / 2;
    const y0 = drawY + (maxH - hPx) / 2 + 12;

    let inner = "";
    const extras = p.extras || [];

    if (p.categoria === "PUERTAS") {
      const railOverhang = wPx * 0.55;
      const rX1 = x0 - 20, rX2 = x0 + wPx + railOverhang, rY = y0 - 18;
      inner += `<line x1="${rX1}" y1="${rY}" x2="${rX2}" y2="${rY}" stroke="${pal.svgStroke}" stroke-width="4"/>`;
      inner += `<circle cx="${x0 + wPx * 0.2}" cy="${rY}" r="7" fill="${pal.svgAccent}"/>`;
      inner += `<circle cx="${x0 + wPx * 0.8}" cy="${rY}" r="7" fill="${pal.svgAccent}"/>`;
      inner += `<rect x="${x0}" y="${y0}" width="${wPx}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="2"/>`;
      const fPx = Math.min(22, wPx * 0.12);
      inner += `<rect x="${x0 + fPx}" y="${y0 + fPx}" width="${wPx - fPx * 2}" height="${hPx - fPx * 2}" fill="none" stroke="${pal.svgMuted}" stroke-width="1.2"/>`;
      const sub = p.subtipo || "PUERTA_GRANERO_Z";
      if (sub === "PUERTA_GRANERO_Z") {
        inner += `<line x1="${x0 + fPx}" y1="${y0 + hPx / 2}" x2="${x0 + wPx - fPx}" y2="${y0 + hPx / 2}" stroke="${pal.svgMuted}" stroke-width="1.4"/>`;
        inner += `<line x1="${x0 + fPx}" y1="${y0 + fPx}" x2="${x0 + wPx - fPx}" y2="${y0 + hPx / 2}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
        inner += `<line x1="${x0 + fPx}" y1="${y0 + hPx / 2}" x2="${x0 + wPx - fPx}" y2="${y0 + hPx - fPx}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
      } else if (sub === "PUERTA_GRANERO_X") {
        inner += `<line x1="${x0 + fPx}" y1="${y0 + fPx}" x2="${x0 + wPx - fPx}" y2="${y0 + hPx - fPx}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
        inner += `<line x1="${x0 + wPx - fPx}" y1="${y0 + fPx}" x2="${x0 + fPx}" y2="${y0 + hPx - fPx}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
      } else {
        for (let s = 1; s <= 5; s++) {
          const sx = x0 + (wPx / 6) * s;
          inner += `<line x1="${sx}" y1="${y0 + fPx}" x2="${sx}" y2="${y0 + hPx - fPx}" stroke="${pal.svgMuted}" stroke-width="1"/>`;
        }
      }
      inner += `<text x="${x0 + wPx / 2}" y="${y0 + hPx + 24}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10" text-anchor="middle">SISTEMA CORREDIZO GRANERO · FRENO SOFT-CLOSE</text>`;
    } else if (p.categoria === "BANIO") {
      const mirrorH = Math.min(130, hPx * 0.72);
      const mirrorY = Math.max(drawY, y0 - mirrorH - 18);
      inner += `<rect x="${x0 + wPx * 0.08}" y="${mirrorY}" width="${wPx * 0.84}" height="${mirrorH}" fill="none" stroke="${pal.svgAccent}" stroke-width="1.5" stroke-dasharray="6,4"/>`;
      inner += `<text x="${x0 + wPx / 2}" y="${mirrorY + mirrorH / 2}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="11" text-anchor="middle">ESPEJO RETROILUMINADO</text>`;
      inner += `<rect x="${x0}" y="${y0}" width="${wPx}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="2"/>`;
      inner += `<line x1="${x0}" y1="${y0 + 12}" x2="${x0 + wPx}" y2="${y0 + 12}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
      const vanCols = currentModulesCatalog.filter((m) => m.id.startsWith("vanity_col_"));
      const nCols = Math.max(1, vanCols.length);
      const colPx = wPx / nCols;
      vanCols.forEach((mod, idx) => {
        const cx = x0 + idx * colPx;
        if (idx > 0) inner += `<line x1="${cx}" y1="${y0 + 12}" x2="${cx}" y2="${y0 + hPx}" stroke="${pal.svgStroke}" stroke-width="1.4"/>`;
        const bodyH = hPx - 12;
        if (mod.type === "cajones_bano") {
          for (let d = 1; d < mod.count; d++) {
            inner += `<line x1="${cx + 4}" y1="${y0 + 12 + (bodyH / mod.count) * d}" x2="${cx + colPx - 4}" y2="${y0 + 12 + (bodyH / mod.count) * d}" stroke="${pal.svgStroke}" stroke-width="1.1"/>`;
          }
          inner += `<text x="${cx + colPx / 2}" y="${y0 + 12 + bodyH * 0.55}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">${mod.count} CAJONES RH</text>`;
        } else {
          for (let s = 1; s <= mod.count; s++) {
            inner += `<line x1="${cx + 4}" y1="${y0 + 12 + (bodyH / (mod.count + 1)) * s}" x2="${cx + colPx - 4}" y2="${y0 + 12 + (bodyH / (mod.count + 1)) * s}" stroke="${pal.svgMuted}" stroke-width="1" stroke-dasharray="4,3"/>`;
          }
          inner += `<text x="${cx + colPx / 2}" y="${y0 + 12 + bodyH * 0.55}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">${mod.count} ENTREPAÑO${mod.count > 1 ? "S" : ""}</text>`;
        }
      });
    } else if (p.categoria === "COCINA") {
      const zPx = hPx * 0.06;
      const bajosH = hPx * 0.34;
      const huecoH = hPx * 0.24;
      const alacenaTotalH = hPx - zPx - bajosH - huecoH;
      const totalUpperMeters = Math.max(0.58, Number(p.alto || 2.4) - 1.52);
      const hasDoubleUpper2D = totalUpperMeters > 0.80 || extras.includes("sobrealacena_42cm");
      const sobreH = hasDoubleUpper2D ? alacenaTotalH * 0.36 : 0;
      const alacena1H = alacenaTotalH - sobreH;

      const towerPx = wPx * (0.72 / Math.max(2.0, Number(p.largo || 3.6)));
      const runPx = wPx - towerPx;

      const baseMods = currentModulesCatalog.filter((m) =>
        m.id.startsWith("cocina_bajo_") || m.id.startsWith("cocina_esquinero_") || m.id === "cocina_lavavajillas"
      );
      const nB = Math.max(2, baseMods.length);
      const mPx = runPx / nB;
      const mCm = Math.round(((Lcm - 72) / nB));

      for (let i = 0; i < nB; i++) {
        const bx = x0 + i * mPx;
        const bMod = baseMods[i];
        const uMod = currentModulesCatalog.find((m) => m.id === `cocina_alacena_${i}`) || (bMod && bMod.id === kitchenCookBayId ? currentModulesCatalog.find((m) => m.id === "cocina_campana") : null);
        const sMod = currentModulesCatalog.find((m) => m.id === `cocina_sobrealacena_${i}`);

        // 2° Piso Sobrealacena (42 cm fondo · +10 cm voladizo)
        if (hasDoubleUpper2D && sMod) {
          inner += `<rect x="${bx}" y="${y0}" width="${mPx}" height="${sobreH - 2}" fill="${pal.svgFill}" stroke="${pal.svgAccent}" stroke-width="1.8"/>`;
          inner += `<text x="${bx + mPx / 2}" y="${y0 + sobreH * 0.58}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="7.2" font-weight="700" text-anchor="middle">2° PISO · 42CM FONDO</text>`;
        }

        // 1° Piso Alacena (32 cm fondo) o Campana
        const yU1 = y0 + sobreH;
        if (bMod && bMod.id === kitchenCookBayId) {
          inner += `<rect x="${bx + mPx * 0.32}" y="${yU1}" width="${mPx * 0.36}" height="${alacena1H * 0.72}" fill="${pal.svgFill}" stroke="${pal.svgAccent}" stroke-width="1.4"/>`;
          inner += `<rect x="${bx + 4}" y="${yU1 + alacena1H * 0.72}" width="${mPx - 8}" height="${alacena1H * 0.22}" fill="${pal.svgFill}" stroke="${pal.svgAccent}" stroke-width="1.6"/>`;
          inner += `<text x="${bx + mPx / 2}" y="${yU1 + alacena1H * 0.88}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="8" font-weight="700" text-anchor="middle">CAMPANA</text>`;
        } else {
          inner += `<rect x="${bx}" y="${yU1}" width="${mPx}" height="${alacena1H}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.5"/>`;
          inner += `<text x="${bx + mPx / 2}" y="${yU1 + alacena1H * 0.45}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle">1° PISO · 32CM</text>`;
          if (uMod) {
            inner += `<text x="${bx + mPx / 2}" y="${yU1 + alacena1H * 0.70}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle">${uMod.count} ENT${uMod.door === "cristal" ? " VIT" : ""}</text>`;
          }
        }

        // Bajo (81 cm casco + 10/12 cm patas = 91/93 cm)
        const by = y0 + alacenaTotalH + huecoH;
        inner += `<rect x="${bx}" y="${by}" width="${mPx}" height="${bajosH}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.5"/>`;
        if (bMod) {
          if (bMod.id.startsWith("cocina_esquinero_")) {
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.45}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="8" font-weight="700" text-anchor="middle">ESQUINERO</text>`;
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.65}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle">${bMod.type === "esquinero_lemans" ? "EXTRAÍBLE" : "ENTREPAÑOS"}</text>`;
          } else if (isSinkType(bMod.type)) {
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.45}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="8.5" font-weight="700" text-anchor="middle">🚰 BAJO TARJA</text>`;
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.65}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle">2 PUERTAS RH</text>`;
          } else if (bMod.id === "cocina_lavavajillas") {
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.55}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">LAVAVAJILLAS</text>`;
          } else if (bMod.type === "estufa_piso") {
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.45}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="8" font-weight="700" text-anchor="middle">🍳 ESTUFA PISO</text>`;
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.65}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle">CORTA BARRA</text>`;
          } else if (isCookType(bMod.type)) {
            inner += `<line x1="${bx + 2}" y1="${by + bajosH * 0.28}" x2="${bx + mPx - 2}" y2="${by + bajosH * 0.28}" stroke="${pal.svgAccent}" stroke-width="1.2"/>`;
            inner += `<line x1="${bx + 2}" y1="${by + bajosH * 0.56}" x2="${bx + mPx - 2}" y2="${by + bajosH * 0.56}" stroke="${pal.svgAccent}" stroke-width="1.2"/>`;
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.44}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="7.5" font-weight="700" text-anchor="middle">${bMod.type === "parrilla_horno" ? "🔥 PARR+HORNO" : "🔥 PARRILLA " + (bMod.count || 75) + "CM"}</text>`;
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.78}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="7" text-anchor="middle">${bMod.type === "parrilla_horno" ? "HORNO EMPOTRADO" : "2 CUB + 1 CACEROL"}</text>`;
          } else if (bMod.type === "cajones_cocina") {
            for (let d = 1; d < bMod.count; d++) {
              inner += `<line x1="${bx + 2}" y1="${by + (bajosH / bMod.count) * d}" x2="${bx + mPx - 2}" y2="${by + (bajosH / bMod.count) * d}" stroke="${pal.svgAccent}" stroke-width="1.2"/>`;
            }
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.54}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle">${bMod.count === 3 ? "2 MED + 1 GDE" : bMod.count + " CAJONES"}</text>`;
          } else {
            for (let s = 1; s <= bMod.count; s++) {
              inner += `<line x1="${bx + 4}" y1="${by + (bajosH / (bMod.count + 1)) * s}" x2="${bx + mPx - 4}" y2="${by + (bajosH / (bMod.count + 1)) * s}" stroke="${pal.svgMuted}" stroke-width="1" stroke-dasharray="4,3"/>`;
            }
            inner += `<text x="${bx + mPx / 2}" y="${by + bajosH * 0.54}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">${bMod.count} ENT (2 PTAS)</text>`;
          }
        }
        inner += `<text x="${bx + mPx / 2}" y="${y0 + hPx + 22}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">${mCm} cm</text>`;
      }

      inner += `<rect x="${x0 - 3}" y="${y0 + alacenaTotalH + huecoH - 7}" width="${runPx + 4}" height="7" fill="${pal.svgAccent}"/>`;
      inner += `<rect x="${x0}" y="${y0 + hPx - zPx}" width="${runPx}" height="${zPx}" fill="none" stroke="${pal.svgMuted}" stroke-width="1.1"/>`;

      const tx = x0 + runPx + 2;
      const tMod = currentModulesCatalog.find((m) => m.id === "cocina_torre");
      inner += `<rect x="${tx}" y="${y0}" width="${towerPx - 2}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgAccent}" stroke-width="1.8"/>`;
      const tLbl = tMod
        ? tMod.type === "torre_hornos" ? "HORNOS" : tMod.type === "torre_blum" ? "BLUM TOWER" : tMod.type === "torre_refri" ? "NICHO REFRI" : `TORRE ${tMod.count}E`
        : "TORRE";
      inner += `<text x="${tx + towerPx / 2}" y="${y0 + hPx * 0.48}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="8.5" font-weight="700" text-anchor="middle">${tLbl}</text>`;
      inner += `<text x="${tx + towerPx / 2}" y="${y0 + hPx + 22}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">72 cm</text>`;
    } else if (p.categoria === "TV_ROOM") {
      inner += `<rect x="${x0}" y="${y0}" width="${wPx}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.8"/>`;
      const nLines = Math.max(10, Math.round(wPx / 18));
      for (let i = 1; i < nLines; i++) {
        if (i < nLines * 0.25 || i > nLines * 0.78) {
          const lx = x0 + (wPx / nLines) * i;
          inner += `<line x1="${lx}" y1="${y0}" x2="${lx}" y2="${y0 + hPx}" stroke="${pal.svgMuted}" stroke-width="0.9"/>`;
        }
      }
      const tvW = wPx * 0.48, tvH = hPx * 0.36;
      const tvX = x0 + (wPx - tvW) / 2, tvY = y0 + hPx * 0.24;
      inner += `<rect x="${tvX}" y="${tvY}" width="${tvW}" height="${tvH}" fill="none" stroke="${pal.svgAccent}" stroke-width="1.8"/>`;
      inner += `<text x="${tvX + tvW / 2}" y="${tvY + tvH / 2 + 4}" fill="${pal.svgStroke}" font-family="JetBrains Mono" font-size="11" text-anchor="middle">PANTALLA + PASACABLES</text>`;
      const cY = y0 + hPx * 0.7;
      inner += `<rect x="${x0 + wPx * 0.06}" y="${cY}" width="${wPx * 0.88}" height="${hPx * 0.14}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.8"/>`;
    } else {
      // CLOSET / WALKIN — lee la configuración REAL de cada bahía del muro principal
      const wallMods = currentModulesCatalog.filter((m) =>
        m.id.startsWith("closet_bay_") || m.id.startsWith("walkin_wall_")
      );
      const nB = Math.max(2, wallMods.length);
      const bayPx = wPx / nB;
      const bayCm = Math.round(Lcm / nB);
      const zPx = hPx * 0.05;
      const malPx = hPx * 0.18;

      inner += `<rect x="${x0}" y="${y0}" width="${wPx}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="2"/>`;
      inner += `<line x1="${x0}" y1="${y0 + malPx}" x2="${x0 + wPx}" y2="${y0 + malPx}" stroke="${pal.svgStroke}" stroke-width="1.6"/>`;
      inner += `<text x="${x0 + wPx / 2}" y="${y0 + malPx * 0.6}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">MALETERO SUPERIOR CONTINUO</text>`;
      inner += `<line x1="${x0}" y1="${y0 + hPx - zPx}" x2="${x0 + wPx}" y2="${y0 + hPx - zPx}" stroke="${pal.svgStroke}" stroke-width="1.4"/>`;

      for (let i = 0; i < nB; i++) {
        const bx = x0 + i * bayPx;
        if (i > 0) inner += `<line x1="${bx}" y1="${y0}" x2="${bx}" y2="${y0 + hPx - zPx}" stroke="${pal.svgStroke}" stroke-width="1.5"/>`;
        const bodyTop = y0 + malPx;
        const bodyH = hPx - malPx - zPx;
        const mod = wallMods[i] || { type: "colgador_doble", count: 2 };

        if (mod.type === "corner_hanging") {
          inner += `<line x1="${bx + 8}" y1="${bodyTop + 20}" x2="${bx + bayPx - 8}" y2="${bodyTop + 20}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
          inner += `<line x1="${bx + 8}" y1="${bodyTop + bodyH * 0.52}" x2="${bx + bayPx - 8}" y2="${bodyTop + bodyH * 0.52}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
          inner += `<text x="${bx + bayPx / 2}" y="${bodyTop + bodyH * 0.45}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">ESQUINERO</text>`;
          inner += `<text x="${bx + bayPx / 2}" y="${bodyTop + bodyH * 0.58}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">DOBLE TUBO</text>`;
        } else if (mod.type === "cajones" || mod.type === "mixto_cajon_tubo") {
          const nC = mod.count || 4;
          const slotH = Math.min(bodyH * 0.11, (bodyH * 0.52) / nC);
          for (let c = 1; c <= nC; c++) {
            const cy = bodyTop + bodyH - slotH * 1.15 * c;
            inner += `<rect x="${bx + 6}" y="${cy}" width="${bayPx - 12}" height="${slotH}" fill="none" stroke="${pal.svgAccent}" stroke-width="1.2"/>`;
          }
          if (mod.type === "mixto_cajon_tubo") {
            inner += `<line x1="${bx + 8}" y1="${bodyTop + 18}" x2="${bx + bayPx - 8}" y2="${bodyTop + 18}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
          }
          inner += `<text x="${bx + bayPx / 2}" y="${bodyTop + bodyH * 0.34}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">${nC} CAJONES</text>`;
        } else if (mod.type === "entrepanos" || mod.type === "zapatera") {
          const nS = mod.count || 4;
          for (let s = 1; s <= nS; s++) {
            const sy = bodyTop + (bodyH / (nS + 1)) * s;
            inner += `<line x1="${bx + 4}" y1="${sy}" x2="${bx + bayPx - 4}" y2="${sy}" stroke="${mod.type === "zapatera" ? pal.svgAccent : pal.svgStroke}" stroke-width="1.2"/>`;
          }
          inner += `<text x="${bx + bayPx / 2}" y="${bodyTop + 15}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">${nS} ${mod.type === "zapatera" ? "ZAP." : "ENT."}</text>`;
        } else if (mod.type === "colgador_largo") {
          inner += `<line x1="${bx + 8}" y1="${bodyTop + 20}" x2="${bx + bayPx - 8}" y2="${bodyTop + 20}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
          inner += `<text x="${bx + bayPx / 2}" y="${bodyTop + bodyH * 0.55}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">VESTIDOS</text>`;
        } else {
          inner += `<line x1="${bx + 8}" y1="${bodyTop + 20}" x2="${bx + bayPx - 8}" y2="${bodyTop + 20}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
          inner += `<line x1="${bx + 8}" y1="${bodyTop + bodyH * 0.52}" x2="${bx + bayPx - 8}" y2="${bodyTop + bodyH * 0.52}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
          inner += `<text x="${bx + bayPx / 2}" y="${bodyTop + bodyH * 0.45}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="8" text-anchor="middle">DOBLE TUBO</text>`;
        }

        // Cota de bahía
        inner += `<line x1="${bx + 2}" y1="${y0 + hPx + 20}" x2="${bx + bayPx - 2}" y2="${y0 + hPx + 20}" stroke="${pal.svgMuted}" stroke-width="1"/>`;
        inner += `<text x="${bx + bayPx / 2}" y="${y0 + hPx + 35}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10" text-anchor="middle">${bayCm} cm</text>`;
      }
    }

    const dimTopY = y0 - 24;
    const dimLeftX = x0 - 26;
    const dims = `
      <line x1="${x0}" y1="${dimTopY}" x2="${x0 + wPx}" y2="${dimTopY}" stroke="${pal.svgAccent}" stroke-width="1.5"/>
      <line x1="${x0}" y1="${dimTopY - 6}" x2="${x0}" y2="${dimTopY + 6}" stroke="${pal.svgAccent}" stroke-width="1.5"/>
      <line x1="${x0 + wPx}" y1="${dimTopY - 6}" x2="${x0 + wPx}" y2="${dimTopY + 6}" stroke="${pal.svgAccent}" stroke-width="1.5"/>
      <text x="${x0 + wPx / 2}" y="${dimTopY - 8}" fill="${pal.svgStroke}" font-family="JetBrains Mono" font-size="13" font-weight="600" text-anchor="middle">ANCHO TOTAL: ${Lcm} cm  (FONDO: ${Dcm} cm)</text>

      <line x1="${dimLeftX}" y1="${y0}" x2="${dimLeftX}" y2="${y0 + hPx}" stroke="${pal.svgAccent}" stroke-width="1.5"/>
      <line x1="${dimLeftX - 6}" y1="${y0}" x2="${dimLeftX + 6}" y2="${y0}" stroke="${pal.svgAccent}" stroke-width="1.5"/>
      <line x1="${dimLeftX - 6}" y1="${y0 + hPx}" x2="${dimLeftX + 6}" y2="${y0 + hPx}" stroke="${pal.svgAccent}" stroke-width="1.5"/>
      <text x="${dimLeftX - 10}" y="${y0 + hPx / 2}" fill="${pal.svgStroke}" font-family="JetBrains Mono" font-size="12" font-weight="600" text-anchor="middle" transform="rotate(-90 ${dimLeftX - 10} ${y0 + hPx / 2})">ALTURA: ${Hcm} cm</text>
    `;

    const gamaTxt = p.gama === "boutique_spgg" ? "LÍNEA BOUTIQUE SAN PEDRO" : "LÍNEA TALLER MTY";
    const cajetin = `
      <rect x="20" y="458" width="880" height="66" fill="none" stroke="${pal.svgStroke}" stroke-width="1.4"/>
      <line x1="360" y1="458" x2="360" y2="524" stroke="${pal.svgStroke}" stroke-width="1"/>
      <line x1="650" y1="458" x2="650" y2="524" stroke="${pal.svgStroke}" stroke-width="1"/>
      <text x="34" y="480" fill="${pal.svgStroke}" font-family="JetBrains Mono" font-size="11" font-weight="700">CLOSETS-CLOSETS DESIGN &amp; MORE · MONTERREY, N.L.</text>
      <text x="34" y="498" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10">SISTEMA 32 MM | WA: 81 3457 5939</text>
      <text x="34" y="514" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="10">FOLIO: ${p.folio || "CCDM-CAD"}</text>
      <text x="374" y="480" fill="${pal.svgStroke}" font-family="JetBrains Mono" font-size="10">PROYECTO: ${p.categoriaNombre || p.categoria}</text>
      <text x="374" y="498" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10">GAMA: ${gamaTxt}</text>
      <text x="374" y="514" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10">MEDIDAS: ${Lcm} × ${Hcm} × ${Dcm} cm</text>
      <text x="664" y="480" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="10">ANTEPROYECTO CONCEPTUAL</text>
      <text x="664" y="498" fill="${pal.svgStroke}" font-family="JetBrains Mono" font-size="10">ESCALA: PARAMÉTRICA</text>
      <text x="664" y="514" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10">SUJETO A RECTIFICACIÓN</text>
    `;

    svgWrap.innerHTML = `<svg id="planoSvgActivo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 540" style="background:${pal.svgBg};border:1px solid ${pal.svgMuted}">
      <rect x="8" y="8" width="904" height="524" fill="none" stroke="${pal.svgMuted}" stroke-width="0.8"/>
      ${inner}
      ${dims}
      ${cajetin}
    </svg>`;
  }

  // -------------------------------------------------------------
  // EXPORTADOR DE LÁMINA TÉCNICA PNG
  // -------------------------------------------------------------
  async function generarLaminaCombinadaPNG(params, rangeInfo) {
    highlightModule3D(null);
    renderer.render(scene, camera);
    const outCanvas = document.createElement("canvas");
    outCanvas.width = 1600;
    outCanvas.height = 940;
    const ctx = outCanvas.getContext("2d");

    ctx.fillStyle = "#F5F2EB";
    ctx.fillRect(0, 0, 1600, 940);

    ctx.strokeStyle = "#1B365D";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 1560, 900);

    ctx.fillStyle = "#161513";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("CLOSETS-CLOSETS DESIGN & MORE — LÁMINA CONCEPTUAL DE ANTEPROYECTO", 44, 62);
    ctx.fillStyle = "#B48327";
    ctx.font = "600 16px monospace";
    ctx.fillText(`FOLIO: ${params.folio}   |   MONTERREY, N.L.   |   WHATSAPP TALLER: 81 3457 5939`, 44, 88);

    const pal = palette();

    ctx.fillStyle = pal.svgBg;
    ctx.fillRect(44, 112, 740, 480);
    ctx.drawImage(canvas, 44, 142, 740, 450);
    ctx.fillStyle = "#1B365D";
    ctx.fillRect(44, 112, 740, 30);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 13px monospace";
    ctx.fillText("VISTA 01 / PERSPECTIVA CONCEPTUAL EN TRAZOS (3D CAD)", 58, 132);
    ctx.strokeStyle = "#161513";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(44, 112, 740, 480);

    ctx.fillStyle = pal.svgBg;
    ctx.fillRect(816, 112, 740, 480);
    ctx.fillStyle = "#1B365D";
    ctx.fillRect(816, 112, 740, 30);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 13px monospace";
    ctx.fillText("VISTA 02 / ALZADO FRONTAL ACOTADO EN CENTÍMETROS", 830, 132);
    const svgEl = document.getElementById("planoSvgActivo");
    if (svgEl) {
      const xml = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 818, 148, 736, 434);
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = () => { URL.revokeObjectURL(url); resolve(); };
        img.src = url;
      });
    }
    ctx.strokeStyle = "#161513";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(816, 112, 740, 480);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(44, 616, 1512, 280);
    ctx.strokeStyle = "#161513";
    ctx.strokeRect(44, 616, 1512, 280);

    ctx.fillStyle = "#1B365D";
    ctx.font = "bold 16px monospace";
    ctx.fillText("ESPECIFICACIONES Y DESPIECE MODULAR PARA COTIZACIÓN EN TALLER", 66, 650);

    const modSummary = currentModulesCatalog
      .slice(0, 5)
      .map((m) => `${m.zone}: ${m.title}`)
      .join(" | ");

    const muroTxt = (params.muroB_activo || params.muroC_activo)
      ? `Muro A: ${(Number(params.muroA_L || params.largo) * 100).toFixed(0)}cm${params.muroB_activo ? " | Muro B: " + (Number(params.muroB_L || 2.4) * 100).toFixed(0) + "cm" : ""}${params.muroC_activo ? " | Muro C: " + (Number(params.muroC_L || 2.4) * 100).toFixed(0) + "cm" : ""} (Total: ${(rangeInfo.totalML || params.largo).toFixed(2)} ML)`
      : `${(params.largo * 100).toFixed(0)} cm`;

    ctx.fillStyle = "#161513";
    ctx.font = "14.5px monospace";
    const acabadoTxt = params.acabadoNombre
      ? `${params.acabadoNombre} (${params.acabadoMarca || "Certificado"}) — ${params.temporadaTitulo || "Tendencia Invierno 2027"}`
      : "Por confirmar en taller";
    const piedraSel = (params.categoria === "COCINA" || params.categoria === "BANIO") && params.piedraNombre
      ? ` | Piedra: ${params.piedraNombre}`
      : "";
    const lines = [
      `Cliente: ${params.clienteNombre || "Por confirmar"} (${params.clienteTel || "Por confirmar"}) | Zona: ${params.zona}`,
      `Proyecto: ${params.categoriaNombre} — ${params.subtipoNombre}`,
      `Gama: ${rangeInfo.gamaNombre} | Medidas: ${muroTxt} × ${(params.alto * 100).toFixed(0)} × ${(params.fondo * 100).toFixed(0)} cm`,
      `Acabado: ${(acabadoTxt + piedraSel).slice(0, 94)}`,
      `Adicionales: ${(rangeInfo.extrasDetalle.length ? rangeInfo.extrasDetalle.join(" • ") : "Configuración base").slice(0, 92)}`,
      `Módulos: ${modSummary.slice(0, 96)}`,
      `Notas: ${(params.notas || "Sin observaciones adicionales").slice(0, 98)}`
    ];
    lines.forEach((ln, idx) => {
      ctx.fillText(ln, 66, 680 + idx * 26);
    });

    ctx.fillStyle = "#161513";
    ctx.fillRect(1080, 642, 450, 190);
    ctx.fillStyle = "#F2D28B";
    ctx.font = "bold 15px monospace";
    ctx.fillText("PRECIO ESTIMADO DE CONFIGURACIÓN", 1106, 676);
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(`$${(rangeInfo.totalMXN || rangeInfo.minMXN).toLocaleString("es-MX")} MXN`, 1106, 718);
    ctx.font = "13px monospace";
    ctx.fillStyle = "#FBBF24";
    ctx.fillText(`Base: $${(rangeInfo.precioBaseMXN || 0).toLocaleString("es-MX")} + Adicionales: $${(rangeInfo.extrasMXN || 0).toLocaleString("es-MX")}`, 1106, 742);
    ctx.fillStyle = "#D7D1C6";
    ctx.font = "13px monospace";
    ctx.fillText(`60% Anticipo / 40% Finiquito contra entrega`, 1106, 762);
    ctx.fillText(`*Sujeto a rectificación milimétrica en sitio`, 1106, 790);
    ctx.fillText(` (+ IVA en caso de requerir factura fiscal)`, 1106, 812);

    // Sello de protección de ingeniería (la lámina gratis NO sirve para fabricar)
    ctx.save();
    ctx.translate(800, 470);
    ctx.rotate(-0.32);
    ctx.globalAlpha = 0.10;
    ctx.fillStyle = "#B91C1C";
    ctx.font = "bold 64px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ANTEPROYECTO CONCEPTUAL", 0, -20);
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("NO APTO PARA FABRICACIÓN", 0, 46);
    ctx.restore();

    ctx.fillStyle = "#B91C1C";
    ctx.font = "bold 13px monospace";
    ctx.fillText("ANTEPROYECTO CONCEPTUAL · NO APTO PARA FABRICACIÓN · Ingeniería de fabricación a medida: WhatsApp 81 3457 5939", 66, 880);

    return new Promise((resolve) => {
      outCanvas.toBlob((blob) => resolve({ blob, dataUrl: outCanvas.toDataURL("image/png") }), "image/png");
    });
  }

  // -------------------------------------------------------------
  // INTERACCIÓN RAYCASTER 3D (HOVER CARD + POPOVER LIVE UNIVERSAL)
  // -------------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function showHoverCard(relX, relY, info) {
    if (!hoverCard || (popover && popover.classList.contains("active"))) return;
    const rect = container.getBoundingClientRect();
    const cardW = 290;
    const cardH = 128;
    const x = Math.max(12, Math.min(rect.width - cardW - 12, relX + 18));
    const y = relY - cardH - 14 > 12 ? relY - cardH - 14 : Math.min(rect.height - cardH - 12, relY + 18);

    hoverCard.style.left = x + "px";
    hoverCard.style.top = y + "px";

    const doorLbl = info.configurable && info.door ? getDoorLabel(info.schemaKey, info.door) : "";
    hoverCard.innerHTML = `
      <div class="hover-badge">${info.configurable ? "🛠️ MÓDULO CONFIGURABLE" : "📐 ESPECIFICACIÓN DE INGENIERÍA"}</div>
      <div class="hover-zone">${info.zone || ""}</div>
      <div class="hover-title">${info.title}</div>
      <div class="hover-spec">${info.desc}</div>
      ${doorLbl ? `<div class="hover-pills"><span class="hover-pill">🚪 ${doorLbl}</span></div>` : ""}
      <div class="hover-action">${info.configurable ? "👆 Clic para cambiar cajones, entrepaños o puertas" : "👆 Clic para ver ficha técnica de este espacio"}</div>
    `;
    hoverCard.classList.add("visible");
  }

  function hideHoverCard() {
    if (hoverCard) hoverCard.classList.remove("visible");
  }

  function openModulePopover(relX, relY, info) {
    if (!popover || !info) return;
    hideHoverCard();
    activePopoverModuleId = info.id;
    highlightModule3D(info.id);

    const rect = container.getBoundingClientRect();
    const popW = 320;
    const popH = info.configurable ? 290 : 195;
    const x = Math.max(12, Math.min(rect.width - popW - 12, relX - popW / 2));
    const y = Math.max(12, Math.min(rect.height - popH - 12, relY - popH / 2));

    popover.style.left = x + "px";
    popover.style.top = y + "px";

    // Módulo de función técnica fija (Tarja, Lavavajillas, Campana, Esquinero L)
    if (!info.configurable || !MODULE_SCHEMAS[info.schemaKey]) {
      popover.innerHTML = `
        <div class="pop-head">
          <div>
            <div class="pop-zone">${info.zone || "Ingeniería Fija"}</div>
            <div class="pop-title">${info.title}</div>
          </div>
          <button type="button" class="pop-close" id="btnPopClose">✕</button>
        </div>
        <div class="pop-spec-box">
          <strong>Función específica de taller:</strong><br>
          ${info.desc}
        </div>
        <button type="button" class="pop-apply-btn" id="btnPopDone">Entendido ✓</button>
      `;
      document.getElementById("btnPopClose").addEventListener("click", closeModulePopover);
      document.getElementById("btnPopDone").addEventListener("click", closeModulePopover);
      popover.classList.add("active");
      return;
    }

    const schema = MODULE_SCHEMAS[info.schemaKey];
    const saved = bayCustomizations[info.id] || {};
    let curType = saved.type || info.type || schema.types[0].id;
    let curCount = Number(saved.count !== undefined ? saved.count : (info.count || 3));
    let curDoor = saved.door !== undefined ? saved.door : (info.door || "none");

    const typeOptsHtml = schema.types
      .map((t) => `<option value="${t.id}"${t.id === curType ? " selected" : ""}>${t.label}</option>`)
      .join("");

    popover.innerHTML = `
      <div class="pop-head">
        <div>
          <div class="pop-zone">${info.zone || schema.label}</div>
          <div class="pop-title" id="popLiveTitle">${info.title}</div>
        </div>
        <button type="button" class="pop-close" id="btnPopClose">✕</button>
      </div>
      ${schema.types.length > 1 ? `
      <div class="pop-field">
        <label for="popSelectType">Función / Interior del Módulo:</label>
        <select id="popSelectType">${typeOptsHtml}</select>
      </div>` : `<input type="hidden" id="popSelectType" value="${curType}">`}
      <div class="pop-field" id="popCountField">
        <label id="popCountLabel" for="popSelectCount">Cantidad:</label>
        <select id="popSelectCount"></select>
      </div>
      <div class="pop-field" id="popDoorField">
        <label for="popSelectDoor">Puertas del Módulo:</label>
        <select id="popSelectDoor"></select>
      </div>
      <button type="button" class="pop-apply-btn" id="btnPopDone">✓ Listo (Cambios aplicados en vivo)</button>
    `;

    const selType = document.getElementById("popSelectType");
    const cntField = document.getElementById("popCountField");
    const cntLabel = document.getElementById("popCountLabel");
    const selCount = document.getElementById("popSelectCount");
    const doorField = document.getElementById("popDoorField");
    const selDoor = document.getElementById("popSelectDoor");

    function populateDependentSelects(typeId, keepCurrentValues) {
      const tDef = schema.types.find((t) => t.id === typeId) || schema.types[0];

      // Cantidad (cajones / entrepaños / niveles)
      if (tDef.counts && tDef.counts.length > 0) {
        cntField.style.display = "block";
        cntLabel.textContent = tDef.countLabel || "Cantidad:";
        const targetVal = keepCurrentValues && tDef.counts.some((c) => c.val === curCount)
          ? curCount
          : (tDef.defaultCount || tDef.counts[0].val);
        curCount = targetVal;
        selCount.innerHTML = tDef.counts
          .map((c) => `<option value="${c.val}"${c.val === targetVal ? " selected" : ""}>${c.txt}</option>`)
          .join("");
      } else {
        cntField.style.display = "none";
      }

      // Puertas (agregar / quitar / cambiar estilo)
      if (tDef.allowDoors && schema.doors && schema.doors.length > 0) {
        doorField.style.display = "block";
        const targetDoor = schema.doors.some((d) => d.id === curDoor) ? curDoor : schema.doors[0].id;
        curDoor = targetDoor;
        selDoor.innerHTML = schema.doors
          .map((d) => `<option value="${d.id}"${d.id === targetDoor ? " selected" : ""}>${d.label}</option>`)
          .join("");
      } else {
        doorField.style.display = "none";
        curDoor = "none";
      }
    }

    function applyLive() {
      if (info.schemaKey === "cocina_bajo") {
        applyKitchenSingletonRules(info.id, {
          type: curType,
          count: curCount,
          door: curDoor
        });
      } else {
        bayCustomizations[info.id] = {
          type: curType,
          count: curCount,
          door: curDoor
        };
      }
      if (stateRef) rebuild3D(stateRef);
      const refreshed = currentModulesCatalog.find((m) => m.id === info.id);
      const titleEl = document.getElementById("popLiveTitle");
      if (refreshed && titleEl) titleEl.textContent = refreshed.title;
      highlightModule3D(info.id);
    }

    populateDependentSelects(curType, true);

    selType.addEventListener("change", () => {
      curType = selType.value;
      populateDependentSelects(curType, false);
      applyLive();
    });
    selCount.addEventListener("change", () => {
      curCount = parseInt(selCount.value, 10) || 3;
      applyLive();
    });
    selDoor.addEventListener("change", () => {
      curDoor = selDoor.value;
      applyLive();
    });

    document.getElementById("btnPopClose").addEventListener("click", closeModulePopover);
    document.getElementById("btnPopDone").addEventListener("click", closeModulePopover);
    popover.classList.add("active");
  }

  function closeModulePopover() {
    activePopoverModuleId = null;
    if (popover) popover.classList.remove("active");
    highlightModule3D(null);
  }

  renderer.domElement.addEventListener("pointermove", (e) => {
    if (activeView !== "3d" || interactiveMeshes.length === 0) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactiveMeshes, false);
    if (hits.length > 0) {
      const hitObj = hits[0].object;
      if (hitObj.userData && hitObj.userData.moduleInfo) {
        hoveredInfo = hitObj.userData.moduleInfo;
        if (!activePopoverModuleId) {
          highlightModule3D(hoveredInfo.id);
        }
        showHoverCard(e.clientX - rect.left, e.clientY - rect.top, hoveredInfo);
        container.style.cursor = "pointer";
        return;
      }
    }
    hoveredInfo = null;
    hideHoverCard();
    if (!activePopoverModuleId) highlightModule3D(null);
    container.style.cursor = "default";
  });

  renderer.domElement.addEventListener("pointerdown", (e) => {
    mouseDownPos = { x: e.clientX, y: e.clientY };
  });

  renderer.domElement.addEventListener("pointerup", (e) => {
    const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
    if (dist > 8) return;
    if (hoveredInfo) {
      const rect = renderer.domElement.getBoundingClientRect();
      openModulePopover(e.clientX - rect.left, e.clientY - rect.top, hoveredInfo);
    } else {
      closeModulePopover();
    }
  });

  renderer.domElement.addEventListener("mouseleave", () => {
    hoveredInfo = null;
    hideHoverCard();
    if (!activePopoverModuleId) highlightModule3D(null);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (autoRotate && activeView === "3d") {
      rootGroup.rotation.y += 0.004;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.CAD_ENGINE = {
    rebuild: rebuild3D,
    setBlueprintMode: function (on) {
      blueprintMode = Boolean(on);
      if (stateRef) rebuild3D(stateRef);
    },
    setExplosion: applyExplosion,
    setAutoRotate: function (on) {
      autoRotate = Boolean(on);
      if (!on) rootGroup.rotation.y = 0;
    },
    setViewMode: function (mode) {
      activeView = mode === "2d" ? "2d" : "3d";
      container.classList.toggle("is-2d", activeView === "2d");
      svgWrap.classList.toggle("active", activeView === "2d");
      if (activeView === "3d") resize();
    },
    setCameraPreset: setCameraPreset,
    exportLaminaPNG: generarLaminaCombinadaPNG,
    getActiveModules: function () {
      return currentModulesCatalog;
    },
    getModuleSchemas: function () {
      return MODULE_SCHEMAS;
    },
    setModuleCustomization: function (id, config) {
      if (stateRef && stateRef.categoria === "COCINA" && (id.startsWith("cocina_bajo_") || id.startsWith("cocina_isla_") || id.startsWith("cocina_peninsula_") || id.startsWith("cocina_u_"))) {
        applyKitchenSingletonRules(id, config);
      } else {
        bayCustomizations[id] = Object.assign({}, bayCustomizations[id] || {}, config);
      }
      if (stateRef) rebuild3D(stateRef);
    },
    onModulesUpdated: function (cb) {
      onModulesUpdatedCallback = cb;
    },
    onModuleHover: function (cb) {
      onModuleHoverCallback = cb;
    },
    highlightModule: highlightModule3D,
    openModuleEditor: function (id) {
      const mod = currentModulesCatalog.find((m) => m.id === id);
      if (mod) {
        const rect = container.getBoundingClientRect();
        openModulePopover(rect.width / 2, rect.height / 2, mod);
      }
    },
    resetCustomizations: function () {
      bayCustomizations = {};
      kitchenCookBayId = null;
      kitchenSinkBayId = null;
    },
    getKitchenFixtures: function () {
      return { cookBayId: kitchenCookBayId, sinkBayId: kitchenSinkBayId };
    }
  };
})();
