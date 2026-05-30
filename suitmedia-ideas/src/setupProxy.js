const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://suitmedia-backend.suitdev.com',
    changeOrigin: true,
  }));
};