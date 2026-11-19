const http = require('node:http');
const { URL } = require('node:url');
const { sumar, restar, multiplicar } = require('./math');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  res.setHeader('Content-Type', 'application/json');

  // Endpoint de Health Check (Observabilidad / Smoke Test)
  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      status: 'UP',
      service: 'ms-calculos-api',
      timestamp: new Date().toISOString()
    }));
  }

  // Endpoints de operaciones matemáticas
  if (req.method === 'GET' && ['/sumar', '/restar', '/multiplicar'].includes(url.pathname)) {
    const a = Number(url.searchParams.get('a'));
    const b = Number(url.searchParams.get('b'));

    if (Number.isNaN(a) || Number.isNaN(b) || url.searchParams.get('a') === null || url.searchParams.get('b') === null) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: 'Debe proporcionar parámetros numéricos válidos: ?a=numero&b=numero' }));
    }

    const operaciones = {
      '/sumar': sumar,
      '/restar': restar,
      '/multiplicar': multiplicar
    };

    const resultado = operaciones[url.pathname](a, b);
    res.writeHead(200);
    return res.end(JSON.stringify({
      operacion: url.pathname.slice(1),
      a,
      b,
      resultado
    }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`ms-calculos-api escuchando en el puerto ${PORT}`);
  });
}

module.exports = { server };
