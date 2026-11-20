/**
 * Motor CAD Conceptual en Líneas y Trazos (3D EdgesGeometry + Alzado 2D SVG + Exportador de Lámina PNG)
 * Cero texturas PNG pesadas: corre fluido a 60 FPS en móvil y genera planos técnicos para el equipo de taller.
 */
(function () {
  const container = document.getElementById("cadViewport");
  const canvas = document.getElementById("cadCanvas3D");
  const svgWrap = document.getElementById("svgElevationWrap");
  if (!canvas || typeof THREE === "undefined") return;

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
      opacity: opts.glass ? 0.25 : pal.fillOpacity,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y, z);

    const edges = new THREE.EdgesGeometry(geom, 15);
    const lineMat = new THREE.LineBasicMaterial({
      color: isAccent ? pal.accentEdge : pal.edge
    });
    const wire = new THREE.LineSegments(edges, lineMat);
    mesh.add(wire);

    const parent = opts.parent || rootGroup;
    parent.add(mesh);

    if (opts.explode) {
      mesh.userData.basePos = new THREE.Vector3(x, y, z);
      mesh.userData.explodeVec = new THREE.Vector3(opts.explode[0], opts.explode[1], opts.explode[2]);
      explodables.push(mesh);
    }
    return mesh;
  }

  function addCadLine(points, isAccent = true) {
    const pal = palette();
    const geom = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
    );
    const mat = new THREE.LineBasicMaterial({
      color: isAccent ? pal.accentEdge : pal.edge
    });
    const line = new THREE.Line(geom, mat);
    rootGroup.add(line);
    return line;
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
  }

  function buildClosetCAD(p) {
    const L = Number(p.largo || 2.0);
    const H = Number(p.alto || 2.4);
    const D = Number(p.fondo || 0.6);
    const t = 0.018;
    const zoclo = 0.08;
    const maleteroY = H - 0.44;
    const nBays = Math.max(2, Math.min(6, Math.round(L / 0.85)));
    const bayW = (L - (nBays + 1) * t) / nBays;

    // Zócalo y piso/techo/fondo
    addCadBox(L - 0.02, zoclo, D - 0.04, 0, zoclo / 2, -0.02, { accent: true, explode: [0, -0.15, 0] });
    addCadBox(L, t, D, 0, zoclo + t / 2, 0);
    addCadBox(L, t, D, 0, H - t / 2, 0, { explode: [0, 0.25, 0] });
    addCadBox(L, H - zoclo, 0.01, 0, zoclo + (H - zoclo) / 2, -D / 2 + 0.005, { explode: [0, 0, -0.25] });

    // Maletero horizontal corrido
    addCadBox(L - 2 * t, t, D - 0.02, 0, maleteroY, -0.01, { accent: true });

    // Divisores verticales + interiores por bahía
    for (let i = 0; i <= nBays; i++) {
      const x = -L / 2 + t / 2 + i * (bayW + t);
      const isOuter = i === 0 || i === nBays;
      addCadBox(t, H - zoclo - t, D, x, zoclo + (H - zoclo) / 2, 0, {
        explode: [isOuter ? (i === 0 ? -0.25 : 0.25) : 0, 0, 0]
      });
    }

    const tieneEspejo = (p.extras || []).includes("espejo");
    const sub = p.subtipo || "CLOSET_ABATIBLE";

    for (let b = 0; b < nBays; b++) {
      const cx = -L / 2 + t + bayW / 2 + b * (bayW + t);
      if (b === Math.floor(nBays / 2)) {
        // Bahía central con cajonera (4 cajones) + entrepaños superiores
        for (let c = 0; c < 4; c++) {
          const cy = zoclo + 0.12 + c * 0.21;
          addCadBox(bayW - 0.01, 0.19, D - 0.08, cx, cy, 0.02, { accent: true, explode: [0, 0, 0.25 + c * 0.06] });
        }
        addCadBox(bayW - 0.01, t, D - 0.05, cx, zoclo + 0.96, 0);
        addCadBox(bayW - 0.01, t, D - 0.05, cx, zoclo + 1.32, 0);
      } else if (b === nBays - 1) {
        // Entrepaños / zapatera
        for (let r = 1; r <= 4; r++) {
          const ry = zoclo + r * ((maleteroY - zoclo) / 5);
          addCadBox(bayW - 0.01, t, D - 0.06, cx, ry, 0);
        }
      } else {
        // Tubo de colgado superior e inferior
        addCadBox(bayW - 0.02, 0.02, 0.02, cx, maleteroY - 0.12, 0.02, { accent: true });
        addCadBox(bayW - 0.02, 0.02, 0.02, cx, zoclo + 0.95, 0.02, { accent: true });
      }

      // Puertas exteriores (salvo abierto o cajones vistos)
      if (sub !== "CLOSET_ABIERTO" && !(sub === "CLOSET_MIXTO" && b === Math.floor(nBays / 2))) {
        const doorH = maleteroY - zoclo - 0.04;
        const offsetZ = D / 2 + 0.025 + (sub === "CLOSET_CORREDIZO" ? (b % 2) * 0.024 : 0);
        addCadBox(bayW - 0.01, doorH, 0.018, cx, zoclo + doorH / 2 + 0.02, offsetZ, {
          glass: tieneEspejo,
          accent: tieneEspejo,
          explode: [0, 0, 0.45]
        });
        // Puerta maletero
        const malH = H - maleteroY - 0.03;
        addCadBox(bayW - 0.01, malH, 0.018, cx, maleteroY + malH / 2 + 0.015, D / 2 + 0.025, {
          explode: [0, 0.15, 0.35]
        });
      }
    }
  }

  function buildWalkinCAD(p) {
    const L = Math.min(Number(p.largo || 3.6), 5.6);
    const H = Number(p.alto || 2.4);
    const D = 0.55;
    const sub = p.subtipo || "WALKIN_LINEAL_DOBLE";
    const t = 0.018;

    // Muro posterior principal
    const wallW = Math.max(2.2, L * 0.72);
    const nBays = Math.max(3, Math.round(wallW / 0.8));
    const bayW = (wallW - (nBays + 1) * t) / nBays;

    for (let i = 0; i <= nBays; i++) {
      addCadBox(t, H, D, -wallW / 2 + t / 2 + i * (bayW + t), H / 2, -1.0, { explode: [0, 0, -0.2] });
    }
    addCadBox(wallW, t, D, 0, H - t / 2, -1.0);
    addCadBox(wallW, 0.08, D, 0, 0.04, -1.0, { accent: true });

    for (let b = 0; b < nBays; b++) {
      const cx = -wallW / 2 + t + bayW / 2 + b * (bayW + t);
      addCadBox(bayW - 0.01, t, D - 0.03, cx, H - 0.45, -1.0);
      if (b % 2 === 0) {
        addCadBox(bayW - 0.02, 0.02, 0.02, cx, H - 0.58, -0.95, { accent: true });
        for (let c = 0; c < 3; c++) {
          addCadBox(bayW - 0.02, 0.18, D - 0.08, cx, 0.18 + c * 0.2, -0.98, { accent: true, explode: [0, 0, 0.22] });
        }
      } else {
        for (let s = 1; s <= 5; s++) {
          addCadBox(bayW - 0.01, t, D - 0.06, cx, 0.28 + s * 0.3, -1.0);
        }
      }
    }

    // Ala lateral si es L o U o paralelo
    if (sub === "WALKIN_L" || sub === "WALKIN_ISLA" || sub === "WALKIN_CRISTAL") {
      const wingL = 1.8;
      addCadBox(D, H, wingL, -wallW / 2 + D / 2, H / 2, -1.0 + D / 2 + wingL / 2, {
        glass: sub === "WALKIN_CRISTAL",
        explode: [-0.25, 0, 0]
      });
    }
    if (sub === "WALKIN_LINEAL_DOBLE" || sub === "WALKIN_ISLA") {
      // Muro opuesto / paralelo
      addCadBox(wallW * 0.8, H, D, 0, H / 2, 1.0, { explode: [0, 0, 0.25] });
    }
    // Isla Joyera central si aplica
    if (sub === "WALKIN_ISLA" || (p.extras || []).includes("isla")) {
      addCadBox(1.3, 0.88, 0.65, 0, 0.44, 0, { accent: true, explode: [0, 0.2, 0] });
      addCadBox(1.34, 0.03, 0.69, 0, 0.90, 0, { glass: true, accent: true, explode: [0, 0.35, 0] });
    }
  }

  function buildCocinaCAD(p) {
    const L = Math.min(Number(p.largo || 3.6), 6.0);
    const H = Number(p.alto || 2.4);
    const sub = p.subtipo || "COCINA_L_PENINSULA";
    const extras = p.extras || [];
    const bajosL = Math.max(1.8, L * 0.72);
    const nMod = Math.max(2, Math.round(bajosL / 0.75));
    const modW = bajosL / nMod;

    // Zócalo + Bajos + Cubierta (h=0.90)
    addCadBox(bajosL, 0.1, 0.56, -0.35, 0.05, -0.95);
    for (let i = 0; i < nMod; i++) {
      const mx = -0.35 - bajosL / 2 + modW / 2 + i * modW;
      
      // Si seleccionó cubiertero / caceroleros en primer módulo
      if (i === 0 && extras.includes("cubiertero_cacerolero")) {
        addCadBox(modW - 0.008, 0.18, 0.58, mx, 0.74, -0.95, { accent: true, explode: [0, 0, 0.32] });
        addCadBox(modW - 0.008, 0.27, 0.58, mx, 0.49, -0.95, { explode: [0, 0, 0.26] });
        addCadBox(modW - 0.008, 0.27, 0.58, mx, 0.20, -0.95, { explode: [0, 0, 0.20] });
      } else if (i === 1 && extras.includes("lavavajillas")) {
        // Lavavajillas 60cm con jaladera horizontal de acero
        addCadBox(modW - 0.008, 0.76, 0.58, mx, 0.48, -0.95, { accent: true, explode: [0, 0, 0.18] });
        addCadBox(modW * 0.7, 0.03, 0.03, mx, 0.82, -0.63, { accent: true, explode: [0, 0, 0.25] });
      } else {
        addCadBox(modW - 0.008, 0.76, 0.58, mx, 0.48, -0.95, { explode: [0, 0, 0.18] });
      }

      // Alacena superior
      addCadBox(modW - 0.008, 0.75, 0.34, mx, 1.85, -1.07, { explode: [0, 0.15, 0.18] });
    }
    // Cubierta continua 4cm
    addCadBox(bajosL + 0.04, 0.04, 0.62, -0.35, 0.88, -0.93, { accent: true, explode: [0, 0.25, 0] });

    // Tarja doble submontar y monomando si seleccionada
    if (extras.includes("tarja_doble")) {
      const sinkX = -0.35 - bajosL / 2 + modW * 1.5;
      addCadBox(0.74, 0.02, 0.44, sinkX, 0.90, -0.93, { accent: true, explode: [0, 0.28, 0] });
      addCadBox(0.03, 0.30, 0.03, sinkX, 1.07, -1.10, { accent: true });
      addCadBox(0.12, 0.03, 0.03, sinkX, 1.22, -1.06, { accent: true });
    }

    // Parrilla de 5 quemadores + campana
    if (extras.includes("parrilla_campana")) {
      const cookX = -0.35 - bajosL / 2 + modW * 0.5;
      addCadBox(0.76, 0.02, 0.50, cookX, 0.90, -0.93, { accent: true, explode: [0, 0.28, 0] });
      addCadBox(0.80, 0.12, 0.48, cookX, 1.62, -1.00, { accent: true, explode: [0, 0.15, 0] });
      addCadBox(0.28, 0.45, 0.28, cookX, 1.90, -1.10, { accent: true });
    }

    // Torre lateral (Alacena Blum o Torre de hornos)
    const towerX = -0.35 + bajosL / 2 + 0.36;
    if (extras.includes("alacena_torre_blum")) {
      addCadBox(0.7, H, 0.62, towerX, H / 2, -0.93, { accent: true, explode: [0.25, 0, 0] });
      for (let g = 1; g <= 4; g++) {
        addCadBox(0.62, 0.16, 0.52, towerX, 0.25 + g * 0.38, -0.93, { explode: [0.25, 0, 0.28] });
      }
    } else {
      addCadBox(0.7, H, 0.62, towerX, H / 2, -0.93, { accent: true, explode: [0.25, 0, 0] });
      if (extras.includes("torre_hornos")) {
        addCadBox(0.58, 0.36, 0.03, towerX, 1.55, -0.61, { glass: true, accent: true, explode: [0.25, 0, 0.12] });
        addCadBox(0.58, 0.54, 0.03, towerX, 1.05, -0.61, { glass: true, accent: true, explode: [0.25, 0, 0.12] });
      }
    }

    // Disposición Inteligente de Isla y Península
    const hasIsland = sub === "COCINA_ISLA" || extras.includes("isla_central");
    const hasPeninsula = sub === "COCINA_L_PENINSULA" && !extras.includes("isla_central");

    if (hasPeninsula) {
      addCadBox(0.65, 0.86, 1.8, -0.35 - bajosL / 2 + 0.325, 0.43, 0.26, { explode: [-0.2, 0, 0.2] });
      addCadBox(0.75, 0.04, 1.84, -0.35 - bajosL / 2 + 0.375, 0.88, 0.26, { accent: true, explode: [-0.2, 0.2, 0.2] });
    } else if (hasIsland) {
      const islandX = -0.15;
      const islandZ = 0.55;
      const islandW = Math.min(2.2, Math.max(1.6, bajosL * 0.65));
      const islandD = 0.90;
      addCadBox(islandW, 0.86, islandD, islandX, 0.43, islandZ, { explode: [0, 0, 0.32] });
      addCadBox(islandW + 0.08, 0.04, islandD + 0.08, islandX, 0.88, islandZ, { accent: true, explode: [0, 0.25, 0.32] });
      addCadBox(0.04, 0.88, islandD + 0.08, islandX - islandW / 2 - 0.02, 0.44, islandZ, { accent: true, explode: [-0.15, 0, 0.32] });
    } else if (sub === "COCINA_U") {
      addCadBox(0.62, 0.86, 1.8, -0.35 - bajosL / 2 + 0.31, 0.43, 0.26);
      addCadBox(0.62, 0.86, 1.8, -0.35 + bajosL / 2 - 0.31, 0.43, 0.26);
      addCadBox(0.66, 0.04, 1.84, -0.35 - bajosL / 2 + 0.31, 0.88, 0.26, { accent: true });
      addCadBox(0.66, 0.04, 1.84, -0.35 + bajosL / 2 - 0.31, 0.88, 0.26, { accent: true });
    }
  }

  function buildVanityCAD(p) {
    const L = Math.min(Number(p.largo || 1.2), 2.8);
    const H = Number(p.alto || 0.65);
    const D = Number(p.fondo || 0.5);
    const sub = p.subtipo || "VANITY_1_SENO";
    const yBase = 0.28 + H / 2;

    // Mueble suspendido RH
    addCadBox(L, H, D, 0, yBase, -0.3, { explode: [0, 0, 0.2] });
    // Frentes de gaveta
    const cols = sub === "VANITY_DOBLE" || L >= 1.5 ? 2 : 1;
    for (let c = 0; c < cols; c++) {
      const gx = cols === 1 ? 0 : (-L / 4 + c * (L / 2));
      const gw = L / cols - 0.02;
      addCadBox(gw, H * 0.45, 0.02, gx, yBase + H * 0.22, -0.3 + D / 2 + 0.015, { accent: true, explode: [0, 0, 0.35] });
      addCadBox(gw, H * 0.42, 0.02, gx, yBase - H * 0.22, -0.3 + D / 2 + 0.015, { glass: sub === "VANITY_REPISA", explode: [0, 0, 0.3] });
      // Ovalín cerámico conceptual
      addCadBox(0.46, 0.12, 0.34, gx, yBase + H / 2 + 0.1, -0.3, { accent: true, explode: [0, 0.25, 0] });
    }
    // Cubierta piedra
    addCadBox(L + 0.04, 0.04, D + 0.03, 0, yBase + H / 2 + 0.02, -0.29, { accent: true, explode: [0, 0.15, 0] });
    // Espejo superior suspendido
    addCadBox(L * 0.88, 0.9, 0.02, 0, yBase + H / 2 + 0.72, -0.52, { glass: true, accent: true });
  }

  function buildTvRoomCAD(p) {
    const L = Math.min(Number(p.largo || 2.6), 5.5);
    const H = Number(p.alto || 2.4);
    const sub = p.subtipo || "TV_LAMBRIN";

    if (sub === "CELOSIA") {
      const nSlats = Math.max(8, Math.round(L / 0.16));
      addCadBox(L, 0.04, 0.14, 0, H - 0.02, 0, { accent: true });
      addCadBox(L, 0.04, 0.14, 0, 0.02, 0, { accent: true });
      for (let i = 0; i < nSlats; i++) {
        const sx = -L / 2 + 0.08 + i * ((L - 0.16) / (nSlats - 1));
        addCadBox(0.045, H - 0.08, 0.12, sx, H / 2, 0, { explode: [0, 0, (i % 2 ? 0.12 : -0.12)] });
      }
      return;
    }

    // Panel trasero piso a techo + listones de lambrín
    addCadBox(L, H, 0.03, 0, H / 2, -0.45);
    const leftSlats = 6;
    for (let i = 0; i < leftSlats; i++) {
      addCadBox(0.035, H - 0.04, 0.03, -L / 2 + 0.05 + i * 0.075, H / 2, -0.42, { accent: true });
    }

    if (sub === "BAR_CAVA") {
      addCadBox(L, 0.86, 0.52, 0, 0.43, -0.18, { explode: [0, 0, 0.2] });
      addCadBox(L + 0.04, 0.04, 0.56, 0, 0.88, -0.16, { accent: true });
      addCadBox(L * 0.4, 1.35, 0.36, L * 0.25, 1.58, -0.25, { glass: true, accent: true });
    } else {
      // Consola flotante + Pantalla TV
      addCadBox(L * 0.92, 0.32, 0.38, 0, 0.48, -0.25, { accent: true, explode: [0, 0, 0.28] });
      addCadBox(Math.min(1.7, L * 0.62), 0.95, 0.04, 0.1, 1.32, -0.39, { accent: true });
      if (sub === "TV_VITRINA") {
        addCadBox(0.5, H - 0.1, 0.34, L / 2 - 0.26, H / 2, -0.28, { glass: true, accent: true, explode: [0.22, 0, 0] });
      }
    }
  }

  function buildPuertasCAD(p) {
    const L = Math.min(Number(p.largo || 1.0), 2.4);
    const H = Number(p.alto || 2.2);
    const sub = p.subtipo || "PUERTA_GRANERO_Z";
    const railL = L * 2.1;
    const yTrack = H + 0.08;

    // Riel superior de acero forjado negro
    addCadBox(railL, 0.05, 0.015, (railL - L) / 2 - 0.15, yTrack, 0.06, { accent: true });
    // Anclajes espaciadores a muro
    const nSpacers = 5;
    for (let i = 0; i < nSpacers; i++) {
      const sx = ((railL - L) / 2 - 0.15) - railL / 2 + 0.12 + i * ((railL - 0.24) / (nSpacers - 1));
      addCadBox(0.03, 0.03, 0.045, sx, yTrack, 0.035, { accent: true });
    }

    function buildSingleDoorLeaf(w, h, posX, style, explodeVec) {
      addCadBox(w, h, 0.045, posX, h / 2, 0.03, { explode: explodeVec });

      // Ruedas y herrajes superiores de suspensión
      const hangerW = 0.045, hangerH = 0.26;
      [-w / 2 + 0.14, w / 2 - 0.14].forEach((hx) => {
        addCadBox(hangerW, hangerH, 0.012, posX + hx, h + 0.04, 0.065, { accent: true, explode: explodeVec });
        addCadBox(0.08, 0.08, 0.02, posX + hx, yTrack, 0.065, { accent: true, explode: explodeVec });
      });

      const frameW = 0.10;
      if (style === "PUERTA_GRANERO_Z") {
        addCadBox(w, frameW, 0.018, posX, frameW / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(w, frameW, 0.018, posX, h - frameW / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(w, frameW * 0.8, 0.018, posX, h / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(frameW, h, 0.018, posX - w / 2 + frameW / 2, h / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(frameW, h, 0.018, posX + w / 2 - frameW / 2, h / 2, 0.055, { accent: true, explode: explodeVec });
        const nDuelas = Math.max(4, Math.round(w / 0.14));
        for (let d = 0; d < nDuelas; d++) {
          const dx = posX - w / 2 + (w / nDuelas) * (d + 0.5);
          addCadBox(w / nDuelas - 0.006, h - frameW * 2, 0.012, dx, h / 2, 0.035, { explode: explodeVec });
        }
        addCadBox(0.08, (h / 2) * 1.12, 0.018, posX, (h / 4) * 1.05, 0.056, { accent: true, explode: explodeVec });
        addCadBox(0.08, (h / 2) * 1.12, 0.018, posX, (h * 0.75) * 0.98, 0.056, { accent: true, explode: explodeVec });
      } else if (style === "PUERTA_GRANERO_X") {
        addCadBox(w, frameW, 0.018, posX, frameW / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(w, frameW, 0.018, posX, h - frameW / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(frameW, h, 0.018, posX - w / 2 + frameW / 2, h / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(frameW, h, 0.018, posX + w / 2 - frameW / 2, h / 2, 0.055, { accent: true, explode: explodeVec });
        addCadBox(0.09, h * 1.04, 0.018, posX, h / 2, 0.056, { accent: true, explode: explodeVec });
      } else {
        addCadBox(w - 0.04, h - 0.04, 0.02, posX, h / 2, 0.04, { accent: true, explode: explodeVec });
        const nLines = Math.max(5, Math.round(w / 0.14));
        for (let l = 1; l < nLines; l++) {
          const lx = posX - w / 2 + (w / nLines) * l;
          addCadBox(0.008, h - 0.08, 0.022, lx, h / 2, 0.042, { explode: explodeVec });
        }
      }

      // Jaladera de barra tubular 60cm
      addCadBox(0.025, 0.60, 0.025, posX + w / 2 - 0.09, 1.05, 0.075, { accent: true, explode: explodeVec });
      addCadBox(0.02, 0.02, 0.035, posX + w / 2 - 0.09, 1.30, 0.055, { accent: true, explode: explodeVec });
      addCadBox(0.02, 0.02, 0.035, posX + w / 2 - 0.09, 0.80, 0.055, { accent: true, explode: explodeVec });
    }

    if (sub === "PUERTA_DOBLE_GRANERO") {
      const doorW = L / 2 - 0.02;
      buildSingleDoorLeaf(doorW, H, -L / 4, "PUERTA_GRANERO_Z", [-0.35, 0, 0]);
      buildSingleDoorLeaf(doorW, H, L / 4, "PUERTA_GRANERO_Z", [0.35, 0, 0]);
    } else {
      buildSingleDoorLeaf(L, H, 0, sub, [0.75 * L, 0, 0]);
    }
  }

  function rebuild3D(params) {
    stateRef = params;
    refreshSceneTheme();
    clearFurniture();

    const builders = {
      CLOSET: buildClosetCAD,
      WALKIN: buildWalkinCAD,
      COCINA: buildCocinaCAD,
      BANIO: buildVanityCAD,
      TV_ROOM: buildTvRoomCAD,
      PUERTAS: buildPuertasCAD
    };
    (builders[params.categoria] || buildClosetCAD)(params);
    applyExplosion(explosionPct);
    render2DElevation(params);
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
    const targetY = stateRef.categoria === "BANIO" ? 0.8 : (stateRef.categoria === "PUERTAS" ? 1.1 : 1.2);
    controls.target.set(0, targetY, 0);
    if (preset === "front") {
      camera.position.set(0, targetY, 4.6);
    } else if (preset === "top") {
      camera.position.set(0, 5.2, 0.8);
    } else {
      camera.position.set(3.2, 2.2, 4.0);
    }
    controls.update();
  }

  function render2DElevation(p) {
    if (!svgWrap) return;
    const pal = palette();
    const Lcm = Math.round(Number(p.largo || 2.0) * 100);
    const Hcm = Math.round(Number(p.alto || 2.4) * 100);
    const Dcm = Math.round(Number(p.fondo || 0.6) * 100);

    // Área útil de dibujo dentro del viewBox (920x540)
    const drawX = 130, drawY = 75, maxW = 660, maxH = 310;
    const scale = Math.min(maxW / Math.max(Lcm, 80), maxH / Math.max(Hcm, 60));
    const wPx = Lcm * scale;
    const hPx = Hcm * scale;
    const x0 = drawX + (maxW - wPx) / 2;
    const y0 = drawY + (maxH - hPx) / 2 + 12;

    let inner = "";
    const bays = Math.max(2, Math.min(6, Math.round((Lcm / 100) / 0.85)));
    const bayPx = wPx / bays;
    const bayCm = Math.round(Lcm / bays);
    const extras = p.extras || [];

    if (p.categoria === "PUERTAS") {
      const railOverhang = wPx * 0.55;
      const rX1 = x0 - 20;
      const rX2 = x0 + wPx + railOverhang;
      const rY = y0 - 18;
      // Riel superior
      inner += `<line x1="${rX1}" y1="${rY}" x2="${rX2}" y2="${rY}" stroke="${pal.svgStroke}" stroke-width="4"/>`;
      inner += `<circle cx="${x0 + wPx * 0.2}" cy="${rY}" r="7" fill="${pal.svgAccent}"/>`;
      inner += `<circle cx="${x0 + wPx * 0.8}" cy="${rY}" r="7" fill="${pal.svgAccent}"/>`;
      inner += `<line x1="${x0 + wPx * 0.2}" y1="${rY}" x2="${x0 + wPx * 0.2}" y2="${y0}" stroke="${pal.svgAccent}" stroke-width="2.5"/>`;
      inner += `<line x1="${x0 + wPx * 0.8}" y1="${rY}" x2="${x0 + wPx * 0.8}" y2="${y0}" stroke="${pal.svgAccent}" stroke-width="2.5"/>`;
      // Hoja
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
      inner += `<rect x="${x0 + wPx - fPx - 10}" y="${y0 + hPx * 0.42}" width="5" height="${hPx * 0.22}" fill="${pal.svgStroke}"/>`;
      inner += `<text x="${x0 + wPx / 2}" y="${y0 + hPx + 24}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10" text-anchor="middle">SISTEMA CORREDIZO GRANERO · FRENO SOFT-CLOSE</text>`;
    } else if (p.categoria === "BANIO") {
      // Espejo arriba + vanity flotante abajo
      const mirrorH = Math.min(130, hPx * 0.72);
      const mirrorY = Math.max(drawY, y0 - mirrorH - 18);
      inner += `<rect x="${x0 + wPx * 0.08}" y="${mirrorY}" width="${wPx * 0.84}" height="${mirrorH}" fill="none" stroke="${pal.svgAccent}" stroke-width="1.5" stroke-dasharray="6,4"/>`;
      inner += `<text x="${x0 + wPx / 2}" y="${mirrorY + mirrorH / 2}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="11" text-anchor="middle">ESPEJO RETROILUMINADO</text>`;
      inner += `<rect x="${x0}" y="${y0}" width="${wPx}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="2"/>`;
      inner += `<line x1="${x0}" y1="${y0 + 12}" x2="${x0 + wPx}" y2="${y0 + 12}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
      inner += `<line x1="${x0}" y1="${y0 + hPx * 0.52}" x2="${x0 + wPx}" y2="${y0 + hPx * 0.52}" stroke="${pal.svgStroke}" stroke-width="1.2"/>`;
      inner += `<text x="${x0 + wPx / 2}" y="${y0 + hPx * 0.34}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10" text-anchor="middle">CAJÓN EN 'U' P/ CÉSPOL</text>`;
    } else if (p.categoria === "COCINA") {
      const zPx = hPx * 0.06;
      const bajosH = hPx * 0.34;
      const huecoH = hPx * 0.25;
      const alacenaH = hPx - zPx - bajosH - huecoH;
      // Alacenas arriba
      for (let i = 0; i < bays; i++) {
        const bx = x0 + i * bayPx;
        inner += `<rect x="${bx}" y="${y0}" width="${bayPx}" height="${alacenaH}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.6"/>`;
        inner += `<line x1="${bx + 6}" y1="${y0 + alacenaH - 6}" x2="${bx + bayPx / 2}" y2="${y0 + 6}" stroke="${pal.svgAccent}" stroke-width="1" stroke-dasharray="4,3"/>`;
        inner += `<line x1="${bx + bayPx - 6}" y1="${y0 + alacenaH - 6}" x2="${bx + bayPx / 2}" y2="${y0 + 6}" stroke="${pal.svgAccent}" stroke-width="1" stroke-dasharray="4,3"/>`;
        // Bajos
        const by = y0 + alacenaH + huecoH;
        inner += `<rect x="${bx}" y="${by}" width="${bayPx}" height="${bajosH}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.6"/>`;
        if (i === 0) {
          for (let d = 1; d <= 2; d++) {
            inner += `<line x1="${bx}" y1="${by + (bajosH / 3) * d}" x2="${bx + bayPx}" y2="${by + (bajosH / 3) * d}" stroke="${pal.svgStroke}" stroke-width="1"/>`;
          }
        }
      }
      // Llamadas a electrodomésticos y herrajes Blum
      if (extras.includes("parrilla_campana")) {
        inner += `<text x="${x0 + bayPx * 0.5}" y="${y0 + alacenaH - 12}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">CAMPANA</text>`;
        inner += `<text x="${x0 + bayPx * 0.5}" y="${y0 + alacenaH + huecoH + 18}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">PARRILLA 5Q</text>`;
      }
      if (extras.includes("tarja_doble")) {
        inner += `<text x="${x0 + bayPx * 1.5}" y="${y0 + alacenaH + huecoH + 18}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">TARJA DOBLE</text>`;
      }
      if (extras.includes("lavavajillas")) {
        inner += `<text x="${x0 + bayPx * 1.5}" y="${y0 + alacenaH + huecoH + bajosH * 0.58}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">LAVAVAJILLAS 60</text>`;
      }
      if (extras.includes("alacena_torre_blum")) {
        inner += `<text x="${x0 + wPx - bayPx * 0.5}" y="${y0 + hPx * 0.42}" fill="${pal.svgAccent}" font-family="JetBrains Mono" font-size="9" text-anchor="middle">BLUM TOWER</text>`;
      }
      // Cubierta
      inner += `<rect x="${x0 - 4}" y="${y0 + alacenaH + huecoH - 7}" width="${wPx + 8}" height="7" fill="${pal.svgAccent}"/>`;
      // Zócalo
      inner += `<rect x="${x0}" y="${y0 + hPx - zPx}" width="${wPx}" height="${zPx}" fill="none" stroke="${pal.svgMuted}" stroke-width="1.2"/>`;
    } else if (p.categoria === "TV_ROOM") {
      inner += `<rect x="${x0}" y="${y0}" width="${wPx}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.8"/>`;
      // Listones verticales de lambrín
      const nLines = Math.max(10, Math.round(wPx / 18));
      for (let i = 1; i < nLines; i++) {
        if (i < nLines * 0.25 || i > nLines * 0.78) {
          const lx = x0 + (wPx / nLines) * i;
          inner += `<line x1="${lx}" y1="${y0}" x2="${lx}" y2="${y0 + hPx}" stroke="${pal.svgMuted}" stroke-width="0.9"/>`;
        }
      }
      // TV silhouette
      const tvW = wPx * 0.48, tvH = hPx * 0.36;
      const tvX = x0 + (wPx - tvW) / 2, tvY = y0 + hPx * 0.24;
      inner += `<rect x="${tvX}" y="${tvY}" width="${tvW}" height="${tvH}" fill="none" stroke="${pal.svgAccent}" stroke-width="1.8"/>`;
      inner += `<line x1="${tvX}" y1="${tvY}" x2="${tvX + tvW}" y2="${tvY + tvH}" stroke="${pal.svgMuted}" stroke-width="0.8" stroke-dasharray="4,4"/>`;
      inner += `<text x="${tvX + tvW / 2}" y="${tvY + tvH / 2 + 4}" fill="${pal.svgStroke}" font-family="JetBrains Mono" font-size="11" text-anchor="middle">PANTALLA + PASACABLES</text>`;
      // Consola flotante inferior
      const cY = y0 + hPx * 0.7;
      inner += `<rect x="${x0 + wPx * 0.06}" y="${cY}" width="${wPx * 0.88}" height="${hPx * 0.14}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="1.8"/>`;
    } else {
      // CLOSET / WALKIN
      const zPx = hPx * 0.05;
      const malPx = hPx * 0.18;
      inner += `<rect x="${x0}" y="${y0}" width="${wPx}" height="${hPx}" fill="${pal.svgFill}" stroke="${pal.svgStroke}" stroke-width="2"/>`;
      inner += `<line x1="${x0}" y1="${y0 + malPx}" x2="${x0 + wPx}" y2="${y0 + malPx}" stroke="${pal.svgStroke}" stroke-width="1.6"/>`;
      inner += `<line x1="${x0}" y1="${y0 + hPx - zPx}" x2="${x0 + wPx}" y2="${y0 + hPx - zPx}" stroke="${pal.svgStroke}" stroke-width="1.4"/>`;
      for (let i = 0; i < bays; i++) {
        const bx = x0 + i * bayPx;
        if (i > 0) {
          inner += `<line x1="${bx}" y1="${y0}" x2="${bx}" y2="${y0 + hPx - zPx}" stroke="${pal.svgStroke}" stroke-width="1.5"/>`;
        }
        // Símbolos interiores de alzado
        const bodyTop = y0 + malPx;
        const bodyH = hPx - malPx - zPx;
        if (i === Math.floor(bays / 2)) {
          for (let c = 1; c <= 4; c++) {
            const cy = bodyTop + bodyH - (bodyH * 0.12) * c;
            inner += `<rect x="${bx + 6}" y="${cy}" width="${bayPx - 12}" height="${bodyH * 0.1}" fill="none" stroke="${pal.svgAccent}" stroke-width="1.2"/>`;
          }
        } else if (i === bays - 1) {
          for (let s = 1; s <= 4; s++) {
            const sy = bodyTop + (bodyH / 5) * s;
            inner += `<line x1="${bx + 4}" y1="${sy}" x2="${bx + bayPx - 4}" y2="${sy}" stroke="${pal.svgStroke}" stroke-width="1.1"/>`;
          }
        } else {
          // Línea de tubo colgador + triángulo abatible discontinuo
          inner += `<line x1="${bx + 8}" y1="${bodyTop + 20}" x2="${bx + bayPx - 8}" y2="${bodyTop + 20}" stroke="${pal.svgAccent}" stroke-width="2"/>`;
          inner += `<polyline points="${bx + 4},${bodyTop + 4} ${bx + bayPx - 4},${bodyTop + bodyH / 2} ${bx + 4},${bodyTop + bodyH - 4}" fill="none" stroke="${pal.svgMuted}" stroke-width="0.9" stroke-dasharray="4,4"/>`;
        }
        // Cota de cada bahía abajo
        inner += `<line x1="${bx + 2}" y1="${y0 + hPx + 20}" x2="${bx + bayPx - 2}" y2="${y0 + hPx + 20}" stroke="${pal.svgMuted}" stroke-width="1"/>`;
        inner += `<text x="${bx + bayPx / 2}" y="${y0 + hPx + 35}" fill="${pal.svgMuted}" font-family="JetBrains Mono" font-size="10" text-anchor="middle">${bayCm} cm</text>`;
      }
    }

    // Cotas maestras superior (Largo total) e izquierda (Altura total)
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

    // Cajetín técnico inferior del plano
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

    const svgHtml = `<svg id="planoSvgActivo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 540" style="background:${pal.svgBg};border:1px solid ${pal.svgMuted}">
      <rect x="8" y="8" width="904" height="524" fill="none" stroke="${pal.svgMuted}" stroke-width="0.8"/>
      ${inner}
      ${dims}
      ${cajetin}
    </svg>`;
    svgWrap.innerHTML = svgHtml;
  }

  /**
   * Genera una Lámina Técnica compuesta PNG (Vista 3D en Trazos + Alzado Acotado 2D + Especificaciones)
   */
  async function generarLaminaCombinadaPNG(params, rangeInfo) {
    renderer.render(scene, camera);
    const outCanvas = document.createElement("canvas");
    outCanvas.width = 1600;
    outCanvas.height = 940;
    const ctx = outCanvas.getContext("2d");

    ctx.fillStyle = "#F5F2EB";
    ctx.fillRect(0, 0, 1600, 940);

    // Marco técnico exterior
    ctx.strokeStyle = "#1B365D";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 1560, 900);

    // Cabecera de lámina
    ctx.fillStyle = "#161513";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("CLOSETS-CLOSETS DESIGN & MORE — LÁMINA CONCEPTUAL DE ANTEPROYECTO", 44, 62);
    ctx.fillStyle = "#B48327";
    ctx.font = "600 16px monospace";
    ctx.fillText(`FOLIO: ${params.folio}   |   MONTERREY, N.L.   |   WHATSAPP TALLER: 81 3457 5939`, 44, 88);

    const pal = palette();

    // Panel Izquierdo: Perspectiva 3D CAD con barra superior legible en modo claro y Blueprint
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

    // Panel Derecho: SVG Alzado 2D Acotado rasterizado con fondo completo consistente
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

    // Ficha técnica inferior
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(44, 616, 1512, 280);
    ctx.strokeStyle = "#161513";
    ctx.strokeRect(44, 616, 1512, 280);

    ctx.fillStyle = "#1B365D";
    ctx.font = "bold 16px monospace";
    ctx.fillText("ESPECIFICACIONES BASE PARA COTIZACIÓN EN TALLER", 66, 650);

    ctx.fillStyle = "#161513";
    ctx.font = "16px monospace";
    const lines = [
      `Cliente / Contacto: ${params.clienteNombre || "Por confirmar"}  (${params.clienteTel || "Por confirmar"})   |   Zona: ${params.zona}`,
      `Categoría: ${params.categoriaNombre}   |   Tipología: ${params.subtipoNombre}`,
      `Gama Solicitada: ${rangeInfo.gamaNombre}   |   Dimensiones: ${(params.largo * 100).toFixed(0)} × ${(params.alto * 100).toFixed(0)} × ${(params.fondo * 100).toFixed(0)} cm`,
      `Adicionales: ${rangeInfo.extrasDetalle.length ? rangeInfo.extrasDetalle.join(" • ") : "Configuración base estándar"}`,
      `Notas del cliente: ${(params.notas || "Sin observaciones adicionales").slice(0, 110)}`
    ];
    lines.forEach((ln, idx) => {
      ctx.fillText(ln, 66, 690 + idx * 32);
    });

    ctx.fillStyle = "#161513";
    ctx.fillRect(1080, 642, 450, 190);
    ctx.fillStyle = "#F2D28B";
    ctx.font = "bold 15px monospace";
    ctx.fillText("RANGO PRELIMINAR ESTIMADO", 1106, 680);
    ctx.font = "bold 28px serif";
    ctx.fillText(`$${rangeInfo.minMXN.toLocaleString("es-MX")} – $${rangeInfo.maxMXN.toLocaleString("es-MX")} MXN`, 1106, 725);
    ctx.fillStyle = "#D7D1C6";
    ctx.font = "13px monospace";
    ctx.fillText(`60% Anticipo / 40% Finiquito contra entrega`, 1106, 762);
    ctx.fillText(`*Sujeto a rectificación milimétrica en sitio`, 1106, 790);
    ctx.fillText(` (+ IVA en caso de requerir factura fiscal)`, 1106, 812);

    return new Promise((resolve) => {
      outCanvas.toBlob((blob) => resolve({ blob, dataUrl: outCanvas.toDataURL("image/png") }), "image/png");
    });
  }

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
    exportLaminaPNG: generarLaminaCombinadaPNG
  };
})();
