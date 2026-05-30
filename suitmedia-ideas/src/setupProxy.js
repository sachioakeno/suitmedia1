const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://suitmedia-backend.suitdev.com',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.error('[Proxy Error]', err.message);
        res.status(500).json({ error: 'Proxy error', message: err.message });
      },
    })
  );
};
