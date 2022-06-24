const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'store-manage',
      fileName: (format) => `store-manage.${format}.js`
    },
    rollupOptions: {
      external: ["vue-demi"],
      output: {
        globals: {
          "vue-demi": "vueDemi",
        },
      },
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
 }
});
