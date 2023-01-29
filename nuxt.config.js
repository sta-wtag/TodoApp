export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TodoApp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~assets/scss/variables.scss', '~assets/scss/mixins.scss'],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-i18n'],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-Us.json',
      },
      {
        code: 'bn',
        file: 'bn-BN.json',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
