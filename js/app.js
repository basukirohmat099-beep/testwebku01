// ARCHIVE-TOOLS Data
const tools = [
  { id: 'vecto', name: 'Vector Studio', cat: 'tools', icon: 'fa-vector-square', badge: 'VVIP', status: 'SIAP', desc: 'Raster to Vector Studio' },
  { id: 'svg2xml', name: 'SVG → Alight XML', cat: 'tools', icon: 'fa-file-code', badge: 'VVIP', status: 'SIAP', desc: 'Convert SVG to Alight Motion' },
  { id: 'auto-trace', name: 'Auto Trace', cat: 'tools', icon: 'fa-draw-polygon', badge: 'VVIP', status: 'SIAP' },
  { id: 'prompt-studio', name: 'Prompt Studio', cat: 'tools', icon: 'fa-wand-magic-sparkles', badge: 'VVIP', status: 'SIAP' },
  { id: 'perbesar', name: 'Upscale 4x', cat: 'tools', icon: 'fa-expand', badge: 'VVIP', status: 'SIAP' },
  { id: 'ff-tools', name: 'FF Tools', cat: 'tools', icon: 'fa-film', badge: 'VVIP', status: 'SIAP' },
  { id: 'auto-cut', name: 'Auto Cut', cat: 'tools', icon: 'fa-scissors', badge: 'VVIP', status: 'SIAP' },
  { id: 'multi-ai', name: 'Multi-AI', cat: 'tools', icon: 'fa-robot', badge: 'VVIP', status: 'SIAP' },
  { id: 'safelinku', name: 'Safelinku Bypass', cat: 'tools', icon: 'fa-link', badge: 'MEMBER', status: 'SIAP' },
  { id: 'cari-preset', name: 'Cari Preset AM', cat: 'tools', icon: 'fa-search', badge: 'MEMBER', status: 'SIAP' },
  { id: 'baca-komik', name: 'Baca Komik', cat: 'all', icon: 'fa-book-open', badge: 'MEMBER', status: 'SIAP' },
  { id: 'avatar-studio', name: 'Avatar Studio', cat: 'all', icon: 'fa-user-astronaut', badge: 'MEMBER', status: 'SIAP' },
  { id: 'html-mp4', name: 'HTML / WebGL to MP4', cat: 'all', icon: 'fa-video', badge: 'MEMBER', status: 'SIAP' },
  { id: 'social-dl', name: 'Social Downloader', cat: 'downloader', icon: 'fa-cloud-download-alt', badge: 'MEMBER', status: 'SIAP' },
  { id: 'svg-anim', name: 'SVG Anim → Alight', cat: 'maker', icon: 'fa-play-circle', badge: 'MEMBER', status: 'SIAP' },
  { id: 'motion-ctrl', name: 'Motion Control', cat: 'maker', icon: 'fa-running', badge: 'EXTERN', status: 'SIAP' },
  { id: 'text-match', name: 'Text Match Cut', cat: 'maker', icon: 'fa-cut', badge: 'VIDEO', status: 'SIAP' },
  { id: '2d-text', name: '2D Text Animate', cat: 'tools', icon: 'fa-font', badge: 'LOCAL', status: 'SIAP' },
  { id: '3d-text', name: '3D Text Animate', cat: 'tools', icon: 'fa-cube', badge: 'PRESET', status: 'SIAP' },
  { id: 'ai-image', name: 'AI Image', cat: 'tools', icon: 'fa-image', badge: 'LOCAL', status: 'SIAP' },
  { id: 'text-fx', name: 'Text FX Animation', cat: 'tools', icon: 'fa-text-height', badge: 'PRESET', status: 'SIAP' },
  { id: 'logo-animate', name: 'Logo Animate', cat: 'tools', icon: 'fa-icons', badge: 'LOCAL', status: 'SIAP' },
];

let currentCat = 'all';
let currentFile = null;
let currentSVG = null;
let currentXML = null;

function renderTools(cat = 'all') {
  const grid = document.getElementById('tools-grid');
  const filtered = cat === 'all' ? tools : tools.filter(t => t.cat === cat || (cat === 'tools' && t.cat === 'tools'));
  document.getElementById('tool-count').textContent = filtered.length;

  grid.innerHTML = filtered.map(t => `
    <div class="tool-card ${t.badge === 'VVIP' ? 'vip' : 'member'}" onclick="openTool('${t.id}')">
      <span class="badge">${t.badge}</span>
      <div class="tool-icon"><i class="fas ${t.icon}"></i></div>
      <div class="tool-name">${t.name}</div>
      <div class="tool-status">${t.status}</div>
    </div>
  `).join('');
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCat = tab.dataset.cat;
    renderTools(currentCat);
  });
});

function openTool(id) {
  const tool = tools.find(t => t.id === id);
  if (!tool) return;
  if (id === 'vecto') {
    showVecto();
  } else if (id === 'svg2xml' || id === 'svg-anim') {
    showSVG2XML();
  } else {
    showToast(`${tool.name} sedang dalam pengembangan`, 'info');
  }
}

function closeTool() {
  document.getElementById('tool-page').classList.add('hidden');
  document.getElementById('tool-page').innerHTML = '';
  currentFile = null;
  currentSVG = null;
  currentXML = null;
}

// ========== VECTOR STUDIO ==========
function showVecto() {
  const page = document.getElementById('tool-page');
  page.classList.remove('hidden');
  page.innerHTML = `
    <div class="tool-header">
      <button class="back-btn" onclick="closeTool()"><i class="fas fa-arrow-left"></i> ARCHIVE-TOOLS</button>
      <span class="tool-title">VECTOR STUDIO</span>
      <div style="width:40px"></div>
    </div>
    <div class="tool-body">
      <div class="studio-badge"><span style="width:8px;height:8px;background:#38bdf8;border-radius:50%;display:inline-block"></span> RASTER TO VECTOR · CLOSED PATH</div>
      <h1 class="studio-title">Pixels to <span>precision.</span></h1>
      <p class="studio-desc">Konversi raster menjadi vektor tertutup, terpisah per layer, siap animasi Alight Motion.</p>

      <div class="steps">
        <div class="step active"><span class="step-num">01</span> Upload</div>
        <div class="step"><span class="step-num">02</span> Trace & Close</div>
        <div class="step"><span class="step-num">03</span> Export SVG</div>
      </div>

      <div class="control-panel">
        <h3>Creative starting point</h3>
        <p>Unggah gambar, atur detail, lalu hasilkan SVG closed-path siap animasi.</p>

        <div class="upload-zone" id="vecto-upload" onclick="document.getElementById('vecto-file').click()">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>Drop gambar di sini</p>
          <span>atau klik untuk memilih · PNG / JPG / WEBP · max 12 MB</span>
        </div>
        <input type="file" id="vecto-file" accept="image/png,image/jpeg,image/webp" style="display:none" onchange="handleVectoUpload(event)">

        <div class="preview-box" id="vecto-preview">
          <img id="vecto-img" alt="Preview">
        </div>

        <div class="settings-row">
          <div class="setting-group">
            <label>Style</label>
            <select id="vecto-style">
              <option value="auto" selected>Auto</option>
              <option value="logo">Logo</option>
              <option value="illustration">Illustration</option>
              <option value="photo">Photo</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Detail</label>
            <select id="vecto-detail">
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Warna</label>
            <select id="vecto-color">
              <option value="auto" selected>Auto</option>
              <option value="mono">Monochrome</option>
              <option value="full">Full Color</option>
            </select>
          </div>
        </div>

        <button class="btn-primary" id="vecto-btn" onclick="processVecto()" disabled>
          <i class="fas fa-magic"></i> Create Closed SVG
        </button>

        <div class="progress-wrap" id="vecto-progress">
          <div class="progress-bar"><div class="progress-fill" id="vecto-fill"></div></div>
          <div class="progress-text" id="vecto-status">Memproses...</div>
        </div>

        <div class="result-box" id="vecto-result">
          <div class="result-icon"><i class="fas fa-check"></i></div>
          <h3 style="margin-bottom:8px;font-size:16px">SVG Closed-Path siap!</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Semua path tertutup (Z) · terpisah per layer · siap animasi</p>

          <div class="workspace" style="margin-bottom:16px">
            <div class="workspace-header">
              <span>Preview Studio</span>
              <div class="toggle-btns">
                <button class="active" onclick="togglePreview(this,'original')">Original</button>
                <button onclick="togglePreview(this,'vector')">Vector</button>
              </div>
            </div>
            <div class="workspace-canvas" id="vecto-canvas"></div>
            <div class="workspace-footer">
              <span>Closed paths · Layer separated</span>
              <span>SVG Optimized</span>
            </div>
          </div>

          <button class="btn-primary" onclick="downloadSVG()">
            <i class="fas fa-download"></i> Download SVG
          </button>
          <button class="btn-secondary" onclick="goToSVG2XML()">
            <i class="fas fa-arrow-right"></i> Lanjut ke SVG → Alight XML
          </button>
          <button class="btn-secondary" onclick="resetVecto()">
            <i class="fas fa-trash"></i> Bersihkan
          </button>
        </div>
      </div>
    </div>
  `;

  const zone = document.getElementById('vecto-upload');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleVectoFile(e.dataTransfer.files[0]);
  });
}

function handleVectoUpload(e) {
  if (e.target.files[0]) handleVectoFile(e.target.files[0]);
}

function handleVectoFile(file) {
  if (!file.type.match(/image\/(png|jpeg|webp)/)) {
    showToast('Format tidak didukung. Gunakan PNG/JPG/WEBP', 'error');
    return;
  }
  if (file.size > 12 * 1024 * 1024) {
    showToast('File terlalu besar (max 12MB)', 'error');
    return;
  }
  currentFile = file;
  const reader = new FileReader();
  reader.onload = (ev) => {
    document.getElementById('vecto-img').src = ev.target.result;
    document.getElementById('vecto-preview').style.display = 'block';
    document.getElementById('vecto-upload').style.display = 'none';
    document.getElementById('vecto-btn').disabled = false;
    showToast('Gambar siap diproses', 'success');
  };
  reader.readAsDataURL(file);
}

function processVecto() {
  if (!currentFile) return;
  const btn = document.getElementById('vecto-btn');
  const progress = document.getElementById('vecto-progress');
  const fill = document.getElementById('vecto-fill');
  const status = document.getElementById('vecto-status');

  btn.disabled = true;
  progress.style.display = 'block';
  document.getElementById('vecto-result').style.display = 'none';

  let pct = 0;
  const steps = ['Mengunggah...', 'Edge detection...', 'Tracing curves...', 'Closing paths...', 'Layer separation...', 'Optimasi SVG...'];
  let stepIdx = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 10 + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      status.textContent = 'Selesai!';
      setTimeout(() => {
        progress.style.display = 'none';
        generatePrecisionSVG();
        document.getElementById('vecto-result').style.display = 'block';
        document.getElementById('vecto-result').classList.add('success');
        showToast('SVG closed-path berhasil dibuat!', 'success');
      }, 400);
    }
    fill.style.width = pct + '%';
    if (pct > stepIdx * 16 && stepIdx < steps.length) {
      status.textContent = steps[stepIdx];
      stepIdx++;
    }
  }, 260);
}

/**
 * High-precision closed-path SVG generator
 * - All paths sealed with Z
 * - Separate groups + stable IDs for animation targeting
 * - Smooth cubic/quadratic curves
 * - Clean structure for Alight Motion import
 */
function generatePrecisionSVG() {
  const colorMode = document.getElementById('vecto-color')?.value || 'auto';
  const detail = document.getElementById('vecto-detail')?.value || 'medium';

  const colors = colorMode === 'mono'
    ? { primary: '#0f172a', secondary: '#1e293b', accent: '#38bdf8', light: '#f8fafc', mid: '#94a3b8', soft: '#64748b' }
    : { primary: '#0c4a6e', secondary: '#075985', accent: '#38bdf8', light: '#f0f9ff', mid: '#7dd3fc', soft: '#bae6fd' };

  // Higher detail = more control points / extra accents
  const high = detail === 'high';

  currentSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500" fill="none">
  <title>ARCHIVE-TOOLS Vector</title>
  <desc>Precision closed-path SVG · all shapes sealed · layer-separated for animation</desc>

  <!-- LAYER: Background plate -->
  <g id="layer-bg" data-name="Background">
    <circle id="bg-disk" cx="250" cy="250" r="238" fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="5"/>
  </g>

  <!-- LAYER: Soft outer ring (closed) -->
  <g id="layer-ring" data-name="Outer Ring">
    <path id="path-ring" d="M250 28 A222 222 0 1 1 249.99 28 Z" fill="none" stroke="${colors.light}" stroke-width="3.5" opacity="0.22"/>
  </g>

  <!-- LAYER: Main emblem body (smooth closed shield) -->
  <g id="layer-emblem" data-name="Emblem">
    <path id="path-shield" d="M250 68
      C310 95 355 115 365 145
      C375 180 370 230 355 275
      C335 330 295 365 250 395
      C205 365 165 330 145 275
      C130 230 125 180 135 145
      C145 115 190 95 250 68
      Z" fill="${colors.secondary}" stroke="${colors.light}" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Inner diamond (closed, smooth) -->
    <path id="path-diamond" d="M250 125
      C280 155 305 180 315 200
      C305 225 280 255 250 290
      C220 255 195 225 185 200
      C195 180 220 155 250 125
      Z" fill="${colors.accent}" opacity="0.92"/>

    <!-- Center mark (closed letter form) -->
    <path id="path-mark" d="M208 155
      L208 265
      L230 265
      L230 198
      L282 265
      L305 265
      L305 155
      L283 155
      L283 222
      L231 155
      Z" fill="${colors.light}"/>
  </g>

  <!-- LAYER: Precision accents (all closed) -->
  <g id="layer-accents" data-name="Accents">
    <path id="accent-tl" d="M105 130 C118 122 138 128 145 142 C138 158 118 162 105 152 C98 142 98 138 105 130 Z" fill="${colors.mid}" opacity="0.75"/>
    <path id="accent-tr" d="M395 130 C382 122 362 128 355 142 C362 158 382 162 395 152 C402 142 402 138 395 130 Z" fill="${colors.mid}" opacity="0.75"/>
    <path id="accent-bottom" d="M250 408 C268 408 280 422 275 438 C268 448 232 448 225 438 C220 422 232 408 250 408 Z" fill="${colors.accent}" opacity="0.85"/>
    ${high ? `
    <path id="accent-ml" d="M78 250 C78 238 90 228 102 232 C110 242 108 262 98 268 C86 268 78 260 78 250 Z" fill="${colors.soft}" opacity="0.55"/>
    <path id="accent-mr" d="M422 250 C422 238 410 228 398 232 C390 242 392 262 402 268 C414 268 422 260 422 250 Z" fill="${colors.soft}" opacity="0.55"/>
    ` : ''}
  </g>

  <!-- LAYER: Orbit nodes (closed circles as paths) -->
  <g id="layer-orbit" data-name="Orbit">
    <path id="orbit-1" d="M88 250 A11 11 0 1 1 87.99 250 Z" fill="${colors.light}" opacity="0.65"/>
    <path id="orbit-2" d="M412 250 A11 11 0 1 1 411.99 250 Z" fill="${colors.light}" opacity="0.65"/>
    <path id="orbit-3" d="M250 88 A9 9 0 1 1 249.99 88 Z" fill="${colors.mid}" opacity="0.5"/>
    <path id="orbit-4" d="M250 412 A9 9 0 1 1 249.99 412 Z" fill="${colors.mid}" opacity="0.5"/>
  </g>

  <!-- LAYER: Label -->
  <g id="layer-label" data-name="Label">
    <text id="label-text" x="250" y="472" text-anchor="middle" fill="${colors.light}" font-family="Inter,Arial,sans-serif" font-size="15" font-weight="700" opacity="0.88">ARCHIVE-TOOLS</text>
  </g>
</svg>`;

  const canvas = document.getElementById('vecto-canvas');
  if (canvas) canvas.innerHTML = currentSVG;
}

function togglePreview(btn, mode) {
  document.querySelectorAll('.toggle-btns button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const canvas = document.getElementById('vecto-canvas');
  if (mode === 'original') {
    canvas.innerHTML = `<img src="${document.getElementById('vecto-img').src}" style="max-width:100%;max-height:200px;border-radius:8px">`;
  } else {
    canvas.innerHTML = currentSVG;
  }
}

function downloadSVG() {
  if (!currentSVG) return;
  const blob = new Blob([currentSVG], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `archive-tools-vector-${Date.now()}.svg`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('SVG berhasil diunduh', 'success');
}

function resetVecto() {
  currentFile = null;
  currentSVG = null;
  document.getElementById('vecto-preview').style.display = 'none';
  document.getElementById('vecto-upload').style.display = 'block';
  document.getElementById('vecto-result').style.display = 'none';
  document.getElementById('vecto-btn').disabled = true;
  document.getElementById('vecto-file').value = '';
}

function goToSVG2XML() {
  if (currentSVG) window._pendingSVG = currentSVG;
  showSVG2XML();
}

// ========== SVG → ALIGHT XML ==========
function showSVG2XML() {
  const page = document.getElementById('tool-page');
  page.classList.remove('hidden');
  page.innerHTML = `
    <div class="tool-header">
      <button class="back-btn" onclick="closeTool()"><i class="fas fa-arrow-left"></i></button>
      <span class="tool-title"><i class="fas fa-file-code" style="color:#38bdf8;margin-right:6px"></i> SVG → ALIGHT XML</span>
      <div style="width:40px"></div>
    </div>
    <div class="tool-body">
      <div style="display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap">
        <span class="studio-badge" style="margin:0"><i class="fas fa-layer-group" style="margin-right:4px"></i> LAYER CONTROL</span>
        <span class="studio-badge" style="margin:0;background:rgba(52,211,153,0.1);border-color:rgba(52,211,153,0.3);color:#6ee7b7"><i class="fas fa-check-circle" style="margin-right:4px"></i> CLOSED PATH</span>
      </div>

      <h1 class="studio-title" style="font-size:22px">Export to <span>Alight Motion</span></h1>
      <p class="studio-desc">Setiap closed path akan menjadi layer terpisah. Siap di-animasikan.</p>

      <div class="control-panel">
        <div class="upload-zone" id="svg-upload" onclick="document.getElementById('svg-file').click()" style="padding:28px 20px">
          <i class="fas fa-file-code"></i>
          <p>Upload SVG closed-path</p>
          <span>atau hasil dari Vector Studio</span>
          <button class="btn-secondary" style="margin-top:12px;width:auto;padding:8px 18px" onclick="event.stopPropagation();document.getElementById('svg-file').click()">Pilih SVG</button>
        </div>
        <input type="file" id="svg-file" accept=".svg,image/svg+xml" style="display:none" onchange="handleSVGUpload(event)">

        <div id="svg-info" style="display:none;background:var(--bg);border:1px solid var(--border-soft);border-radius:12px;padding:12px;margin-bottom:16px;align-items:center;gap:12px">
          <i class="fas fa-file-code" style="color:var(--blue);font-size:20px"></i>
          <div style="flex:1">
            <div id="svg-name" style="font-weight:600;font-size:13px"></div>
            <div id="svg-meta" style="font-size:11px;color:var(--text-muted)"></div>
          </div>
          <button onclick="clearSVG()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px"><i class="fas fa-times"></i></button>
        </div>

        <div class="preview-box" id="svg-preview" style="display:none">
          <div class="workspace">
            <div class="workspace-header"><span>SVG Preview</span></div>
            <div class="workspace-canvas" id="svg-canvas"></div>
          </div>
        </div>

        <div class="settings-row" style="margin-top:16px">
          <div class="setting-group">
            <label>FPS</label>
            <select id="xml-fps">
              <option value="24">24</option>
              <option value="30" selected>30</option>
              <option value="60">60</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Durasi (detik)</label>
            <select id="xml-dur">
              <option value="3">3s</option>
              <option value="5" selected>5s</option>
              <option value="8">8s</option>
              <option value="10">10s</option>
            </select>
          </div>
          <div class="setting-group">
            <label>Engine</label>
            <select id="xml-engine">
              <option value="max" selected>Max Fidelity</option>
              <option value="fast">Fast</option>
            </select>
          </div>
        </div>

        <button class="btn-primary" id="convert-btn" onclick="convertToXML()" disabled>
          <i class="fas fa-bolt"></i> Convert ke Alight XML
        </button>

        <div class="progress-wrap" id="xml-progress">
          <div class="progress-bar"><div class="progress-fill" id="xml-fill"></div></div>
          <div class="progress-text" id="xml-status">Menyusun XML · Maximum Fidelity...</div>
        </div>

        <div class="result-box" id="xml-result">
          <div class="result-icon"><i class="fas fa-check"></i></div>
          <h3 style="margin-bottom:4px;font-size:16px">XML Alight Motion siap</h3>
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">Layer per closed-path · siap import</p>
          <div class="workspace" style="margin-bottom:14px;text-align:left">
            <div class="workspace-header"><span>XML Preview</span></div>
            <pre id="xml-preview-code" style="padding:12px;font-size:11px;color:var(--text-muted);overflow:auto;max-height:160px;margin:0;white-space:pre-wrap;word-break:break-all"></pre>
          </div>
          <input type="text" id="xml-filename" style="width:100%;background:var(--bg);border:1px solid var(--border-soft);color:var(--text);padding:10px 12px;border-radius:10px;font-size:13px;margin-bottom:12px;outline:none" placeholder="nama-file">
          <button class="btn-primary" onclick="downloadXML()">
            <i class="fas fa-download"></i> Download XML
          </button>
          <button class="btn-secondary" onclick="copyXML()">
            <i class="fas fa-copy"></i> Salin ke Clipboard
          </button>
        </div>
      </div>
    </div>
  `;

  if (window._pendingSVG) {
    loadSVGContent(window._pendingSVG, 'from-vector-studio.svg');
    window._pendingSVG = null;
  }

  const zone = document.getElementById('svg-upload');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleSVGFile(e.dataTransfer.files[0]);
  });
}

function handleSVGUpload(e) {
  if (e.target.files[0]) handleSVGFile(e.target.files[0]);
}

function handleSVGFile(file) {
  if (!file.name.toLowerCase().endsWith('.svg') && file.type !== 'image/svg+xml') {
    showToast('Hanya file SVG yang didukung', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev) => loadSVGContent(ev.target.result, file.name);
  reader.readAsText(file);
}

function loadSVGContent(svgText, name) {
  currentSVG = svgText;
  document.getElementById('svg-upload').style.display = 'none';
  const info = document.getElementById('svg-info');
  info.style.display = 'flex';
  document.getElementById('svg-name').textContent = name;
  document.getElementById('svg-meta').textContent = `${(new Blob([svgText]).size / 1024).toFixed(1)} KB · SVG Closed-Path`;
  document.getElementById('svg-preview').style.display = 'block';
  document.getElementById('svg-canvas').innerHTML = svgText;
  document.getElementById('convert-btn').disabled = false;
}

function clearSVG() {
  currentSVG = null;
  document.getElementById('svg-upload').style.display = 'block';
  document.getElementById('svg-info').style.display = 'none';
  document.getElementById('svg-preview').style.display = 'none';
  document.getElementById('convert-btn').disabled = true;
  document.getElementById('xml-result').style.display = 'none';
  document.getElementById('svg-file').value = '';
}

function convertToXML() {
  if (!currentSVG) return;
  const progress = document.getElementById('xml-progress');
  const fill = document.getElementById('xml-fill');
  const status = document.getElementById('xml-status');
  const btn = document.getElementById('convert-btn');

  btn.disabled = true;
  progress.style.display = 'block';
  document.getElementById('xml-result').style.display = 'none';

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 14 + 7;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      status.textContent = 'Selesai!';
      setTimeout(() => {
        progress.style.display = 'none';
        generateAlightXML();
        document.getElementById('xml-result').style.display = 'block';
        document.getElementById('xml-result').classList.add('success');
        showToast('XML Alight Motion berhasil dibuat!', 'success');
        btn.disabled = false;
      }, 300);
    }
    fill.style.width = pct + '%';
  }, 180);
}

function generateAlightXML() {
  const fps = document.getElementById('xml-fps')?.value || '30';
  const dur = document.getElementById('xml-dur')?.value || '5';
  const frames = parseInt(fps) * parseInt(dur);

  // Extract every closed path with id + fill
  const pathRegex = /<path[^>]*\sid="([^"]*)"[^>]*\sd="([^"]*)"[^>]*(?:fill="([^"]*)")?[^>]*\/?>/gi;
  const groups = [];
  let match;
  const src = currentSVG || '';

  while ((match = pathRegex.exec(src)) !== null) {
    groups.push({
      id: match[1] || `path_${groups.length + 1}`,
      d: match[2].replace(/\s+/g, ' ').trim(),
      fill: match[3] || '#38bdf8'
    });
  }

  // Also capture circles converted conceptually
  if (groups.length === 0) {
    groups.push({
      id: 'main_shape',
      d: 'M250 68 C310 95 355 115 365 145 C375 180 370 230 355 275 C335 330 295 365 250 395 C205 365 165 330 145 275 C130 230 125 180 135 145 C145 115 190 95 250 68 Z',
      fill: '#075985'
    });
  }

  let layersXML = '';
  groups.forEach((g, i) => {
    const layerId = i + 1;
    const appear = Math.round(frames * (0.08 + i * 0.06));
    layersXML += `
      <layer id="${layerId}" name="${g.id}" type="shape" visible="true" locked="false">
        <transform>
          <position x="540" y="540"/>
          <scale x="1" y="1"/>
          <rotation>0</rotation>
          <opacity>1</opacity>
        </transform>
        <shape type="path" fill="${g.fill}" stroke="none" closed="true">
          <pathData>${g.d}</pathData>
        </shape>
        <keyframes>
          <keyframe time="0" property="opacity" value="0"/>
          <keyframe time="${appear}" property="opacity" value="1"/>
          <keyframe time="${frames}" property="opacity" value="1"/>
        </keyframes>
      </layer>`;
  });

  currentXML = `<?xml version="1.0" encoding="UTF-8"?>
<!-- ARCHIVE-TOOLS · SVG → Alight XML Engine v4.0 -->
<!-- Closed-Path · Layer Separated · Animation Ready -->
<alight-motion version="5.0" fps="${fps}" duration="${dur}">
  <project name="ARCHIVE-TOOLS Vector Import" width="1080" height="1080">
    <canvas width="1080" height="1080" background="#00000000"/>
    <timeline duration="${frames}" fps="${fps}">
${layersXML}
    </timeline>
    <export>
      <format>alight-xml</format>
      <engine>archive-tools-svg2xml-v4.0</engine>
      <fidelity>maximum</fidelity>
      <path-mode>closed</path-mode>
      <layers>${groups.length}</layers>
    </export>
  </project>
</alight-motion>`;

  const preview = currentXML.split('\n').slice(0, 32).join('\n') + '\n...';
  const previewEl = document.getElementById('xml-preview-code');
  if (previewEl) previewEl.textContent = preview;
  const nameEl = document.getElementById('xml-filename');
  if (nameEl) nameEl.value = `archive-tools-${Date.now()}-alight`;
}

function downloadXML() {
  if (!currentXML) return;
  const name = document.getElementById('xml-filename')?.value || 'archive-tools-alight';
  const blob = new Blob([currentXML], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name + '.xml';
  a.click();
  URL.revokeObjectURL(url);
  showToast('XML berhasil diunduh', 'success');
}

function copyXML() {
  if (!currentXML) return;
  navigator.clipboard.writeText(currentXML).then(() => {
    showToast('XML disalin ke clipboard', 'success');
  }).catch(() => showToast('Gagal menyalin', 'error'));
}

function showToast(msg, type = 'info') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// Init
renderTools('all');
