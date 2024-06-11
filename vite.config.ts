const path = require('path');

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import UnoCSS from 'unocss/vite'

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const isProduction = mode === 'production';
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: isProduction ? 'Dweb Metaverse' : 'TDweb Metaverse'
          }
        }
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      vueJsx(),
      UnoCSS(),
      legacy({
          targets: ['defaults', 'ie >= 11', 'chrome 52'],  //需要兼容的目标列表，可以设置多个
          additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
          renderLegacyChunks:true,
          polyfills:[
            'es.symbol',
            'es.array.filter',
            'es.promise',
            'es.promise.finally',
            'es/map',
            'es/set',
            'es.array.for-each',
            'es.object.define-properties',
            'es.object.define-property',
            'es.object.get-own-property-descriptor',
            'es.object.get-own-property-descriptors',
            'es.object.keys',
            'es.object.to-string',
            'web.dom-collections.for-each',
            'esnext.global-this',
            'esnext.string.match-all'
        ]
      }),
    ],
    css: {
      postcss: {
        plugins: [
          // require('autoprefixer')(),
          require('postcss-px-to-viewport')({
              viewportWidth: 390,
              exclude: /(\/|\\)(pc)(\/|\\)/
          }),
          require('postcss-px-to-viewport')({
            viewportWidth: 1440,
            exclude: /(\/|\\)(home)(\/|\\)/
          }),
          
        ]
      }
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@media': path.join(__dirname, 'src/media')
      }
    }
  }
})
