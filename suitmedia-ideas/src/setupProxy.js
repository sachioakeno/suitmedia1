const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://suitmedia-backend.suitdev.com',
    changeOrigin: true,
  }));

  app.use('/storage', createProxyMiddleware({
    target: 'https://assets.suitdev.com',
    changeOrigin: true,
    headers: { Referer: 'https://suitmedia.com' },
  }));
};