module.exports = {
  mode: 'spa',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },

  // MODULES
  modules: ['@nuxtjs/apollo'],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000/api',
      },
    },
  },
};
