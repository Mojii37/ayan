const express = require('express');
const fs = require('fs');
const path = require('path');
const { createServer: createViteServer } = require('vite');

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });
  app.use(vite.middlewares);

  app.get('/', async (req, res, next) => {
    try {
      let html = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );
      html = await vite.transformIndexHtml(req.url, html);
      res.send(html);
    } catch (e) {
      return next(e);
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

createServer();
