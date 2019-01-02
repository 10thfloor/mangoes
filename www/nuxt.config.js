const pkg = require('./package')
const { resolve } = require('path')

module.exports = {
  mode: 'spa',
  modulesDir: resolve(__dirname, '../node_modules/'),
  build: {
    analyze: true
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue, Ethereum, BlockStack, IPFS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Mangoes!' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/element-ui'],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/apollo'],

  /*
  ** Apollo config
  */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000/api'
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
}
