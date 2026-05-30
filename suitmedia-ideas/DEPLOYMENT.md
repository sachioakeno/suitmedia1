# Suitmedia Ideas – Deployment Guide

## Run Locally
```bash
npm install
npm start
# App runs at http://localhost:3000
# Proxy to https://suitmedia-backend.suitdev.com is auto-configured via setupProxy.js
```

## Build for Production
```bash
npm run build
# Static files go into /build folder
```

## Deploy Options

### Option A: Netlify (recommended)
1. Push source to GitLab
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add a `netlify.toml` with proxy redirect:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://suitmedia-backend.suitdev.com/api/:splat"
  status = 200
  force = true
```

### Option B: Vercel
1. Push source to GitLab
2. Connect repo to Vercel
3. Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://suitmedia-backend.suitdev.com/api/$1" }
  ]
}
```

### Option C: VPS (Nginx)
```nginx
server {
    listen 80;
    root /var/www/suitmedia-ideas/build;
    index index.html;

    location /api/ {
        proxy_pass https://suitmedia-backend.suitdev.com/api/;
        proxy_set_header Host suitmedia-backend.suitdev.com;
    }

    location / {
        try_files $uri /index.html;
    }
}
```

## Features Implemented
- ✅ Fixed header with hide-on-scroll-down / show-on-scroll-up + semi-transparent on scroll
- ✅ Active nav state for Ideas page
- ✅ Banner with diagonal SVG clip (no image editing needed via CMS)
- ✅ Parallax: image and text move at different speeds on scroll
- ✅ State (page, sort, page-size) persists in URL — survives page refresh
- ✅ Sort by Newest / Oldest
- ✅ Page size: 10, 20, 50
- ✅ Showing X - Y of Z counter updates correctly
- ✅ 16:9 consistent thumbnail ratio on all cards
- ✅ Lazy loading on images with shimmer skeleton
- ✅ Title clamped to 3 lines with ellipsis
- ✅ API proxy to suitmedia-backend.suitdev.com
- ✅ Pagination with ellipsis for large page counts
