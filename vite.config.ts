import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import MillionLint from "@million/lint";
//import VitePluginStaticCopy from 'vite-plugin-static-copy'
import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default defineConfig(({mode}: ConfigEnv)=>{
  const env = loadEnv(mode, process.cwd(), '')
  console.log('mode',mode);
  console.log('env',env);

  
  return {
/*     define: {
      __APP_VERSION__: JSON.stringify('v1.0.0'),
      __API_URL__: 'window.__backend_api_url',
    }, */

    plugins: [
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
      commonjs({})
   //   MillionLint.vite()
    ],
    resolve: {
     
       alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }]
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts', // Optional: for global test setup
    },

   /*  build: {
      assetsInlineLimit: 4096,
      rollupOptions: {
        input: {
          'hanab': path.resolve(__dirname, 'brands/hanab/*'),
        },
        output: [
          {
            name: "hanab",
            dir: "dist/hanab",
          }
        ]
      },
    }  */
/*    VitePluginStaticCopy({
      targets: [
        {
          src: 'path/to/source/folder/*',  // The folder you want to copy
          dest: 'path/to/destination/folder'  // The destination folder where the source will be copied
        }
      ]
    }) */
} as UserConfig
});
