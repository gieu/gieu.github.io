import { defineConfig, passthroughImageService } from 'astro/config';
// import image from "@astrojs/image";

import tailwind from "@astrojs/tailwind";
import node from '@astrojs/node';


export default defineConfig({
  output: 'server',
  site: 'https://grupoinformaticaeducativa.uninorte.edu.co',
  // base: '/gieu', // on master
  base: 'web_staging', // on staging 
  server: {
    port: 8517,
    host: true,
    watch: { usePolling: true }
  },
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind()],
  image: {
    service: passthroughImageService(),
  },
});