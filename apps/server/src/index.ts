import path = require('path');
import fs = require('fs');
import express = require('express');
import cms = require('cms');

if(!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
  console.error('DATABASE_URI and PAYLOAD_SECRET environment variables are required');
  process.exit(1);
};

const WEB_PUBLIC_DIR = path.join(process.cwd(), './build/client');

const PORT = process.env.PORT || 3000;

const { payload } = cms;
const app = express();

app.disable('x-powered-by');

app.get('/healthcheck', (req, res) => res.send('OK'));
app.use('/', express.static(WEB_PUBLIC_DIR));

(async () => {
  // @ts-ignore
  const { handler } = await import('../build/server/entry.mjs');
  app.use(handler);

  await payload.init({
    express: app,
    secret: process.env.PAYLOAD_SECRET as string,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  });
})();