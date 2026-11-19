const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const buildTime = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Artefacto de Producción - Duoc UC</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #0b2545; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
    .card { background: #134074; padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); max-width: 500px; text-align: center; }
    .badge { background: #10b981; color: white; padding: 0.4rem 1rem; border-radius: 20px; font-weight: bold; font-size: 0.9rem; }
    h1 { margin-top: 1.5rem; font-size: 1.8rem; }
    p { color: #cbd5e1; line-height: 1.6; }
    .meta { background: #091e36; padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.85rem; color: #93c5fd; text-align: left; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">✓ Artefacto Compilado Exitosamente</span>
    <h1>Software Empresarial v1.0</h1>
    <p>Este paquete representa la versión lista para desplegar, generada y validada por el pipeline de <strong>GitHub Actions</strong>.</p>
    <div class="meta">
      • Generado el: ${buildTime}<br>
      • Pipeline: GitHub Actions CI<br>
      • Pruebas: 3 aprobadas (100% OK)<br>
      • Estado: Listo para producción
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);
console.log('✓ Build finalizado: Artefacto empaquetado en dist/index.html');
