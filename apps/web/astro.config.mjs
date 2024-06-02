import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  base: '/',
  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),
});