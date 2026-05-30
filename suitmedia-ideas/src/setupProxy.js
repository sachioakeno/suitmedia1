const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://suitmedia-backend.suitdev.com',
    changeOrigin: true,
  }));

  app.use('/storage', createProxyMiddleware({
    target: 'https://assets.suitdev.com',
    changeOrigin: true,
    onProxyReq: function(proxyReq, req, res) {
      // 1. Hapus identitas localhost dari browser
      proxyReq.removeHeader('Origin');
      proxyReq.removeHeader('Referer');
      
      // 2. Paksa menyamar sebagai web resmi Suitmedia
      proxyReq.setHeader('Origin', 'https://suitmedia.com');
      proxyReq.setHeader('Referer', 'https://suitmedia.com/');
      proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    }
  }));
};