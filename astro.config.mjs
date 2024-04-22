import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://grupoinformaticaeducativa.uninorte.edu.co',
  base: '/gieu',
  server: { port: 8517, host: true },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()]
});