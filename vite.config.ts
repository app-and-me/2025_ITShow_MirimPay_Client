import fs from 'fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  const isDevCommand = process.env.npm_lifecycle_event === 'dev';

  const commonConfig = {
    plugins: [react(), svgr()],
  };

  if (isDevCommand) {
    return {
      ...commonConfig,
      server: {
        https: {
          key: fs.readFileSync('./localhost-key.pem'),
          cert: fs.readFileSync('./localhost.pem'),
        },
        host: 'localhost',
        port: 5173,
      },
    };
  } else {
    return {
      ...commonConfig,
      server: {
        host: 'localhost',
        port: 5173,
        allowedHosts: ['pay.mmhs.app'],
      },
    };
  }
});
