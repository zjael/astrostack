import path = require('path');
import express = require('express');
import cms = require('cms');

if(!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
  console.error('DATABASE_URI and PAYLOAD_SECRET environment variables are required');
  process.exit(1);
};

const PORT = process.env.PORT || 3000;
const WEB_PUBLIC_DIR = path.join(process.cwd(), './build/client');

const { payload } = cms;
const app = express();

app.disable('x-powered-by');

app.get('/healthcheck', (req, res) => res.send('OK'));
app.use('/', express.static(WEB_PUBLIC_DIR));

(async () => {
  await payload.init({
    express: app,
    secret: process.env.PAYLOAD_SECRET as string,
    onInit: () => {
      payload.logger.info(`API URL: ${payload.getAPIURL()}`);
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // @ts-ignore
  const { handler } = await import('../build/server/entry.mjs');
  app.use(handler);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  });
})();