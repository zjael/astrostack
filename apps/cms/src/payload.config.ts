import path from 'path'
import { fileURLToPath } from 'url';
import { Payload } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'

import Users from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: slateEditor({}),
  collections: [
    Users,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || ''
    }
  }),
  plugins: [],
  sharp: sharp,
  async onInit(payload: Payload) {
    payload.logger.info(`API URL: ${payload.getAPIURL()}`);
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
})