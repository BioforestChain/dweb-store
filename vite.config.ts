import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
            // antdv 按需导入
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: isProduction ? 'Dweb Metaverse' : 'TDweb Metaverse'
          }
        }
      }),
      legacy({
        targets: ['defaults', 'ie >= 11', 'chrome 52'], //需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
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
      })
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@media': path.join(__dirname, 'src/media')
      }
    }
  }
})
