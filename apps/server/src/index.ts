import url from 'url';
import path from 'path';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const filename = url.fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const webPublicDir = path.join(dirname, '../../web/dist/client');
const webServerDir = path.join(dirname, '../../web/dist/server');
const cmsDir = path.join(dirname, '../../cms');

const app = express();
const nextApp = next({
  dev: dev,
  dir: cmsDir
});
const nextHandler = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  app.use('/', express.static(webPublicDir)), {
    maxAge: dev ? '0' : '365d'
  };

  // @ts-ignore
  const { handler } = await import(path.join(webServerDir, 'entry.mjs'));
  app.use(handler);

  app.get('*', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    nextHandler(req, res, parsedUrl);
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });
})();